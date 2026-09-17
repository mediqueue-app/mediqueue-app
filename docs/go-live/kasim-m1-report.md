# KASIM M1 — Closeout Report

Implementation commit: **`edb9c8d`** (branch `kasim/m1-staging-readiness`,
based on `main` @ `16e57ed`). This report itself lands in a follow-up commit
on the same branch, per the repo's established convention (see
`534b1a9 docs(go-live): record browser-proven Azra M1 commit SHA`).

## Before / after

| Item | Before | After | Status |
|---|---|---|---|
| Price List | missing | `docs/go-live/kasim-price-list.md` | DONE |
| Frankfurt note | missing | `docs/go-live/kasim-frankfurt-data-path.md` | DONE |
| Auth 429 | missing | 10 login / 8 register per 60s, process-local sliding window | DONE |
| Docs lock | open (`/docs`, `/redoc`, `/openapi.json` always on) | locked by default in staging/production, `ENABLE_API_DOCS=true` override | DONE |
| Health DB | `/health` returned static `{"status":"ok"}` with no DB check | `/health` runs `SELECT 1`, 503 + `database:error` on failure; `/` is DB-independent liveness | DONE |
| Prod seed | `SEED_ON_START=true` + `APP_ENV=production` would silently seed | entrypoint exits (`SystemExit(1)`) before `uvicorn` starts; staging warns to stderr | DONE |
| AWS staging | absent | absent | NOT PROVISIONED (see Section D — prerequisites not met) |

## Factual answers

1. **Is the raw Local Zone USD table complete according to available authoritative sources?** Yes for the required rows (m7i.large, m7i.xlarge, c7i.large On-Demand; gp3 and io1 EBS; ALB base + LCU) — all pulled directly from the official AWS Price List Bulk API for `eu-central-1-ist-1`, with SKU/rateCode/effectiveDate citations. One informational (not required) parent-region EC2 comparison was explicitly *not* asserted as authoritative because it wasn't independently re-verified against the same bulk API in this session (documented as a caveat in the price list file itself, not silently omitted).
2. **Does the regional-service table distinguish UNKNOWN from parent-region placement?** Yes. `kasim-frankfurt-data-path.md` uses the fixed `LZ_ONLY` / `PARENT_REGION_FRANKFURT` / `MIXED` / `UNKNOWN` vocabulary throughout, and reserves `UNKNOWN` for the one row (GitHub Actions runner) where the resource isn't AWS infrastructure at all rather than defaulting it to a placement guess.
3. **Is the API technically staging-ready according to pytest?** Yes — 47/47 backend tests pass, including new coverage for every K5–K7 and seed-safety behavior required by this milestone. "Staging-ready" here means the code paths are implemented and tested; it does not mean staging infrastructure exists (it doesn't — see below).
4. **Was AWS actually provisioned in this milestone?** No.
5. **Was public API DNS opened?** No.
6. **What technical work remains for KASIM M2?** See Section H below.

---

## A. Starting state

- Remote: `origin` → `https://github.com/mediqueue-app/mediqueue-app.git`
- Branch at session start: `main`
- Starting HEAD: `16e57edbadccb47f58aa8c766799bb5fe064cf63`
- Initial `git status`: clean except one untracked entry, `mediqueue-app/`
- Pre-existing dirty/untracked files: only `mediqueue-app/`, confirmed to be
  its **own separate git repository** (has its own `.git/`), predating this
  session (files dated 2026-08-03 to 2026-08-05). Not touched, not staged,
  not deleted.

## B. Implementation

**K5 — Auth rate limit**
- `backend/app/core/rate_limit.py` (new): `SlidingWindowRateLimiter`
  (process-local, `threading.Lock`-protected deque per key, no Redis) and
  `client_identity(request)` (X-Forwarded-For first hop, else
  `request.client.host`, else `"unknown"`).
- `backend/app/api/v1/auth.py`: added `LOGIN_RATE_LIMIT` (10/60s) and
  `REGISTER_RATE_LIMIT` (8/60s) module-level limiters; `_enforce_rate_limit`
  raises `HTTPException(429, headers={"Retry-After": ...})` before any
  credential check, keyed on `client_identity + normalized(email)`.
- `backend/app/core/error_handlers.py`: **fixed a pre-existing bug** — the
  global `StarletteHTTPException` handler built a fresh `JSONResponse`
  without forwarding `exc.headers`, silently dropping `WWW-Authenticate` on
  every 401 today, and would have dropped `Retry-After` on the new 429s.
  `build_error_response` now accepts and forwards `headers`.
- Why a shared helper instead of purely inline code: `app/api/v1/account.py`
  already has an equivalent `_client_ip` (X-Forwarded-For-first-hop /
  `request.client` fallback) helper, establishing that pattern as this
  repo's convention; `rate_limit.py` mirrors it for auth without editing the
  unrelated `account.py` file.

**K6 — API docs lock**
- `backend/app/core/config.py`: added `ENABLE_API_DOCS: bool = False`.
- `backend/app/main.py`: refactored the module-level `app = FastAPI(...)`
  into `create_app(app_settings: Settings = settings) -> FastAPI`, with a
  pure `_docs_urls(app_env, enable_api_docs)` helper that returns
  `(None, None, None)` for `docs_url`/`redoc_url`/`openapi_url` whenever
  `app_env` is in `PROTECTED_ENVIRONMENTS` ({staging, production}) and
  `ENABLE_API_DOCS` is not set — enforced through FastAPI's own
  `docs_url`/`redoc_url`/`openapi_url` constructor args (routes never exist),
  not via an after-the-fact auth check. `app = create_app()` preserves prior
  behavior exactly for the default (development) case.
- Why the factory refactor: it was the only way to test all four
  environment/override combinations without reloading Python modules
  process-wide (which would have risked destabilizing every other test file
  that does `from app.main import app`).

**K7 — Health check**
- `backend/app/main.py`: `/` is unchanged in spirit — still a static
  dict, no DB dependency, still 200. `/health` now takes
  `db: Session = Depends(get_db)`, runs `db.execute(text("SELECT 1"))`,
  returns `{"status": "ok", "database": "ok", ...}` (200) on success or
  catches `SQLAlchemyError` and returns `{"status": "error",
  "database": "error", ...}` (503) — the failure is never swallowed into a
  200.

**Production seed safety**
- `backend/docker_entrypoint.py`: before migrations or `os.execvp`, if the
  command is `uvicorn` and `APP_ENV=production` and `SEED_ON_START=true`,
  prints a `FATAL:` message to stderr and `raise SystemExit(1)` —
  `uvicorn` never starts. If `APP_ENV=staging` and `SEED_ON_START=true`,
  prints a `WARNING:` to stderr and proceeds (unchanged functional
  behavior, added visibility). Development is unaffected.
- `backend/STAGING.md`: documented the above, plus the "set
  `SEED_ON_START=false` after the first staging seed" operational rule, and
  updated the health-check section to reflect the new `/health` response
  shape.
- No secrets, tokens, or patient data are logged by any of the new code —
  verified by reading every new `print`/`logger` call added.

## C. Test evidence

Command: `cd backend && .venv/Scripts/python.exe -m pytest -v`

Result: **47 passed, 0 failed, 0 skipped, 3 pre-existing deprecation
warnings** (Starlette's `HTTP_422_UNPROCESSABLE_ENTITY` rename and an
`httpx`-with-`starlette.testclient` notice — both pre-date this milestone
and are unrelated to it; not modified).

Focused evidence for every required scenario:

- `test_auth.py::TestLoginRateLimit::test_ten_attempts_allowed_then_429_on_eleventh` — PASSED (attempts 1–10 → 200, 11th → 429 with `Retry-After` present and `>0`)
- `test_auth.py::TestLoginRateLimit::test_x_forwarded_for_first_hop_is_used_as_client_identity` — PASSED (X-Forwarded-For branch)
- `test_auth.py::TestLoginRateLimit::test_falls_back_to_request_client_without_x_forwarded_for` — PASSED (`request.client` fallback branch)
- `test_auth.py::TestLoginRateLimit::test_limit_is_scoped_per_email_for_the_same_client` — PASSED (key isolation)
- `test_auth.py::TestRegisterRateLimit::test_eight_attempts_allowed_then_429_on_ninth` — PASSED
- `test_auth.py::TestAuthErrorHeaders::*` — PASSED (`WWW-Authenticate` preserved on both `/auth/me` and `/auth/login` 401s)
- `test_auth.py::TestLogin::test_login_success_returns_access_token` — PASSED (single isolated login → 200, pre-existing test, still green)
- `test_docs_lock.py::TestDevelopmentDocsOpen::*` — PASSED (development → docs available)
- `test_docs_lock.py::TestProtectedEnvironmentsLockDocsByDefault::*` — PASSED (staging/production → docs absent, 404)
- `test_docs_lock.py::TestEnableApiDocsOverride::*` — PASSED (override works in both protected environments)
- `test_health.py::TestReadiness::test_health_returns_200_when_db_reachable` — PASSED
- `test_health.py::TestReadiness::test_health_returns_503_when_db_unreachable` — PASSED (body includes `"database": "error"`)
- `test_health.py::TestLiveness::test_root_does_not_require_db` — PASSED (`/` returns 200 with no DB override/dependency at all)
- `test_docker_entrypoint.py::TestProductionSeedGuard::test_production_with_seed_on_start_exits_before_uvicorn` — PASSED (`SystemExit` raised, `os.execvp` and `_run` never called)
- `test_docker_entrypoint.py::TestStagingSeedWarning::test_staging_with_seed_on_start_warns_but_boots` — PASSED
- `test_appointments_api.py` (all 22) — PASSED, unmodified, confirming no regression from the error-handler header fix or anything else in this milestone

No test failures were observed at any point in this milestone — there is no
pre-existing-failure list to report separately.

## D. AWS / infra state

- Cost ceiling from Sinem/authorized owner: **not available in this
  session** — no such document, message, or approval was provided or found.
- Billing alarm established: **no** — not created, no AWS credentials were
  used or available in this session.
- Provisioned: **NO.**
- Staging URL: **NONE.**
- Public API DNS: **NO.**

Per the explicit hard gate in the task spec, this means: **INFRA NOT YET
PROVISIONED.** K1/K4 research and all K5–K7 + seed-safety code/tests were
completed independently of this gate, as instructed.

## E. Deliverables

- `docs/go-live/kasim-price-list.md` — exists, committed in `edb9c8d`.
- `docs/go-live/kasim-frankfurt-data-path.md` — exists, committed in `edb9c8d`.
- `docs/go-live/kasim-m1-report.md` — this file, committed in the
  follow-up commit on this branch.

## F. Scope protection

- **web-\* files changed:** none. `git diff --stat` for `edb9c8d` touches
  only `backend/**`, `docs/go-live/**` — verified via `git diff
  16e57ed..edb9c8d --stat` before writing this report.
- **Unrelated dirty files preserved:** yes — the untracked `mediqueue-app/`
  directory (a separate git repo) was never staged, modified, or deleted.
- **Destructive git commands used:** none. No `reset --hard`, no
  `clean -fd`, no forced checkout/restore, no force-push.
- **Secrets committed:** none. `backend/.env` (real, gitignored, contains a
  real-looking DB password) was read for context only, never staged, never
  modified. No `.env` file appears in `edb9c8d`'s diff.

## G. Git result

- Final commit (implementation + K1/K4 docs): `edb9c8d` on branch
  `kasim/m1-staging-readiness`
- Push performed: **NO** — this branch has not been pushed to `origin`.
  Direct pushes to `main` are not this repo's convention (see merged PR
  history, e.g. `#5`); pushing a new branch/opening a PR is a
  visible, shared-state action this report defers to an explicit
  go-ahead rather than performing unprompted.
- Remote: `origin` (`https://github.com/mediqueue-app/mediqueue-app.git`) — unchanged, not pushed to.
- Branch: `kasim/m1-staging-readiness` (local only as of this report)
- Final git status: clean on this branch aside from the untracked,
  pre-existing `mediqueue-app/` directory.

## H. Remaining KASIM M2 items

Explicitly deferred, per the M2 boundary in the task spec:

- Backup/restore
- CI deploy
- Sentry
- ZAP API (dynamic security scanning)
- ECS on EC2
- WAF
- HttpOnly cookie migration
- Redis-backed rate limiter (if the API is ever scaled to multiple
  replicas — the current limiter is correct and sufficient for a single
  process, but is explicitly not shared across replicas)

Also outstanding, blocking AWS provisioning specifically (not M2 work,
but a precondition this milestone could not satisfy):

- Written cost ceiling from Sinem/authorized owner
- Billing alarm setup

## I. Final verdict

**M1 CODE/DOCUMENTATION COMPLETE. INFRA NOT YET PROVISIONED.**

All non-AWS M1 deliverables (K1, K4, K5, K6, K7, production seed safety,
tests, documentation) are implemented and committed; the full backend test
suite is green (47/47). AWS staging was correctly **not** provisioned
because the two explicit prerequisites (written cost ceiling, billing
alarm) were not available in this session — this is not an oversight, it is
the hard gate in the task spec working as intended. Nothing here should be
read as "staging is live."

---

PRICE LIST DELIVERED: YES
FRANKFURT NOTE DELIVERED: YES
CLAIM DATA STAYS IN TURKEY: NO
AUTH RATE LIMIT: DONE
DOCS LOCKED IN PROTECTED ENV: DONE
HEALTH CHECKS DB: DONE
PRODUCTION SEED FORBIDDEN: DONE
AWS STAGING PROVISIONED: NO
NEXT CONTAINERS ON THIS HOST: NO
PUBLIC API DNS: NO
PYTEST: 47 passed, 0 failed, 0 skipped
READY FOR KASIM M2: YES (pending AWS prerequisites for K2/K3 specifically)
RECOMMENDED NEXT STEP: obtain written cost ceiling + set up a billing alarm, then provision AWS staging (K2/K3); in parallel, open a PR from `kasim/m1-staging-readiness` for review

REPOSITORY: https://github.com/mediqueue-app/mediqueue-app.git
BRANCH: kasim/m1-staging-readiness
STARTING HEAD: 16e57edbadccb47f58aa8c766799bb5fe064cf63
FINAL COMMIT: edb9c8d (implementation + K1/K4 docs); this report follows in one more commit on the same branch
PUSH PERFORMED: NO
PUSHED REMOTE: N/A
PUSHED BRANCH: N/A
AWS STAGING URL (or NONE): NONE
FINAL GIT STATUS: clean on kasim/m1-staging-readiness aside from the pre-existing untracked mediqueue-app/ directory (untouched, separate git repo)
