# KASIM M2 — Yedek / geri yükleme + CI imaj doğrulama (AWS yok)

Yalnız `backend/` ve `.github/workflows/`. AWS hesabı, staging URL, tavan onayı yok; provisioning, billing alarm, DNS, Sentry, ZAP, WAF bu sohbette yok. `web-*` ve `ai/` dokunulmaz. Belirsizlikte dur; rapora `BLOCKED — CTO` yaz. PR merge edilmez.

---

## Hedef

### K8 — Yedek / geri yükleme

1. `backend/scripts/db_backup.py` ve `backend/scripts/db_restore.py`. Host'tan çalışır: `python -m scripts.db_backup`, `python -m scripts.db_restore <dosya>`. Yalnız stdlib (`subprocess`, `argparse`, `datetime`, `os`); yeni Python bağımlılığı yok.
2. Mekanizma: Compose `db` servisi üzerinden `docker compose exec -T db pg_dump -Fc` / `pg_restore`. Host'ta `pg_dump` kurulu olması gerekmez. Bağlantı bilgisi `POSTGRES_USER` / `POSTGRES_DB` env'inden (compose varsayılanları: `postgres` / `mediqueue`); parola komut satırında ve logda görünmez.
3. Çıktı `backend/backups/<db>_<YYYYMMDD-HHMMSS>.dump`. `backend/backups/` ve `*.dump` `.gitignore`'a girer. Dump commit edilmez.
4. Restore güvenliği: `APP_ENV=production` iken `--force` olmadan çalışmaz, mesaj verip `SystemExit(1)`. Hedef DB adı ekrana yazılır ve onay istenir (`--yes` ile atlanır).
5. `backend/STAGING.md`: "Backup / restore" bölümü — komutlar, zamanlama notu (manuel; cron/EventBridge AWS sonrası), saklama notu: dump içinde hasta verisi var, parolayla şifreli disk dışına çıkmaz; fiziksel konum iddiası yok, `docs/go-live/kasim-frankfurt-data-path.md`'ye atıf.
6. Kanıt (local compose): `db_backup` → `mediqueue` DB'yi düşür ve yeniden yarat → `db_restore` → `GET /health` 200 `database: ok` → `POST /v1/auth/login` `clinic@mediqueue.com` / `Demo1234!` 200. Komutlar ve çıktılar rapora.

### K9 — CI imaj doğrulama

1. `.github/workflows/backend-image.yml`. Tetik: `pull_request` ve `push` → `main`, paths `backend/**` ve bu workflow dosyası.
2. Tek job: `docker build backend/` (Dockerfile mevcut). Build başarılıysa iş biter. Registry push, SSH, deploy, secret yok. `docker run` ile ayağa kaldırma yok.
3. `.github/workflows/backend-tests.yml` değişmez.

### Testler

`cd backend && pytest -q` yeşil kalır (bugün 47/47). `db_restore` production guard'ı için `tests/test_db_restore_guard.py` — `docker` çağrılmadan, `subprocess` mock'lanarak: production + `--force` yok → `SystemExit`; staging → geçer.

---

## Kilitler

- AWS CLI, Terraform, ECS, EC2, RDS, Route53, S3 yok. Rapor `AWS STAGING PROVISIONED: NO` kalır.
- Rate limiter Redis'e taşınmaz. HttpOnly cookie yok. Auth/JWT davranışı değişmez.
- Alembic migration yok; şema değişmiyor. Alembic head tek kalır.
- Seed scriptleri ve `SEED_ON_START` kuralı değişmez. `docker_entrypoint.py` değişmez.
- `.env`, dump dosyası, secret commit yok. Force push, `reset --hard` yok.
- Başka branch'ten commit alınmaz.

M3'e kalanlar (bu PR'de yok, raporda silinmez): billing alarm + AWS staging (`PRICE CEILING APPROVED` sonrası), Sentry (DSN sonrası), ZAP API (URL sonrası), WAF, HttpOnly. Etiket `REQUIRES SEPARATE MILESTONE (KASIM M3)`.

---

## Çalışma

```
git fetch origin
git checkout main
git pull --ff-only origin main
git checkout -b kasim/m2-backup-ci
git remote -v
git branch --show-current
git status
git rev-parse HEAD
```

Oku: `backend/docker-compose.yml`, `backend/STAGING.md`, `backend/docker_entrypoint.py`, `backend/app/core/config.py`, `backend/scripts/seed_demo_users.py` (script kalıbı), `.github/workflows/backend-tests.yml`, `backend/.gitignore`, `docs/go-live/kasim-frankfurt-data-path.md`.

Stage: `backend/scripts/db_backup.py`, `backend/scripts/db_restore.py`, `backend/tests/test_db_restore_guard.py`, `backend/.gitignore`, `backend/STAGING.md`, `.github/workflows/backend-image.yml`, `docs/go-live/kasim-m2-report.md`.

---

## Senaryolar

| Durum | Yap |
|---|---|
| AWS hesabı / URL isteyeyim | Hayır; bu PR local |
| Registry / deploy adımı ekleyeyim | Hayır; yalnız build |
| Dump'ı S3'e koyayım | Hayır; local dizin + doküman |
| Docker yok, round trip çalışmıyor | Script yine yazılır; rapora `LOCAL ROUND TRIP: NOT RUN (no Docker)` |
| pg_dump'ı host'ta isteyeyim | Hayır; `docker compose exec db` |
| Spesifikasyon suskun | `BLOCKED — CTO` |

---

## Kapanış (`docs/go-live/kasim-m2-report.md`)

```
git remote -v
git branch --show-current
git rev-parse HEAD

K8 BACKUP SCRIPT: DONE / NO
K8 RESTORE SCRIPT: DONE / NO
K8 PRODUCTION RESTORE GUARD: YES / NO
K8 BACKUPS DIR GITIGNORED: YES / NO
K8 LOCAL ROUND TRIP (dump -> drop -> restore -> /health 200 -> login 200): PASS / FAIL / NOT RUN
K9 CI IMAGE BUILD WORKFLOW: DONE / NO
K9 REGISTRY PUSH / DEPLOY: NO
BACKEND-TESTS.YML UNCHANGED: YES
ALEMBIC HEADS: 1
PYTEST: N passed, 0 failed
AWS STAGING PROVISIONED: NO
BILLING ALARM: NOT IN THIS PR (ceiling pending)
PUBLIC API DNS: NO
FILES THIS CHAT:
RECOMMENDED NEXT STEP: ceiling approved -> billing alarm + staging (K2/K3)
```
