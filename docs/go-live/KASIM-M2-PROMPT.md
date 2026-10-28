# KASIM M2 — Veritabanı yedek / geri yükleme (yalnız backend, AWS yok)

Yalnız `backend/` ağacı + kapanış raporu. AWS hesabı, staging URL, tavan onayı yok; provisioning, billing alarm, DNS, CI/deploy, Sentry, ZAP, WAF bu sohbette yok. `web-*`, `ai/`, `.github/`, `docker/`, kök `docker-compose.yml` dokunulmaz. Belirsizlikte dur; rapora `BLOCKED — CTO` yaz. PR merge edilmez.

---

## Hedef — K8 yedek / geri yükleme

1. `backend/scripts/db_backup.py` ve `backend/scripts/db_restore.py`. Host'tan çalışır: `python -m scripts.db_backup`, `python -m scripts.db_restore <dosya>`. Yalnız stdlib (`subprocess`, `argparse`, `datetime`, `os`, `pathlib`); yeni Python bağımlılığı yok. Script kalıbı: `backend/scripts/seed_demo_users.py`.
2. Mekanizma: `backend/docker-compose.yml` içindeki `db` servisi üzerinden `docker compose exec -T db pg_dump -Fc` / `pg_restore`. Host'ta `pg_dump` kurulu olması gerekmez. Kullanıcı ve DB adı `POSTGRES_USER` / `POSTGRES_DB` env'inden (compose varsayılanları `postgres` / `mediqueue`); parola komut satırında ve çıktıda görünmez.
3. Çıktı: `backend/backups/<db>_<YYYYMMDD-HHMMSS>.dump`. `backend/.gitignore`'a `backups/` ve `*.dump` eklenir. Dump commit edilmez.
4. Restore güvenliği: `APP_ENV=production` iken `--force` olmadan çalışmaz; stderr'e mesaj, `SystemExit(1)`. Hedef DB adı ekrana yazılır, onay istenir (`--yes` ile atlanır). Restore öncesi mevcut şema `pg_restore --clean --if-exists` ile düşürülür.
5. `backend/STAGING.md`: "Backup / restore" bölümü — iki komut, çıktı dizini, production guard, "dump içinde hasta verisi vardır; repo dışı tutulur" satırı. Zamanlama, saklama süresi, fiziksel konum iddiası yazılmaz.
6. Test: `backend/tests/test_db_restore_guard.py` — `subprocess` mock'lanır, Docker çağrılmaz. Vakalar: production + `--force` yok → `SystemExit`; production + `--force` → geçer; staging → geçer; dosya yoksa → hata.
7. Kanıt (local compose): `db_backup` → `mediqueue` DB'yi düşür ve yeniden yarat → `db_restore --yes` → `GET http://localhost:8000/health` 200 `database: ok` → `POST /v1/auth/login` `clinic@mediqueue.com` / `Demo1234!` 200. Komutlar ve çıktılar rapora.

`cd backend && pytest -q` yeşil kalır (bugün 47/47 + yeni testler). Alembic head tek kalır.

---

## Kilitler

- Değişen dosyalar yalnız: `backend/scripts/db_backup.py`, `backend/scripts/db_restore.py`, `backend/tests/test_db_restore_guard.py`, `backend/.gitignore`, `backend/STAGING.md`, `docs/go-live/kasim-m2-report.md`.
- `backend/docker-compose.yml`, `Dockerfile`, `docker_entrypoint.py`, `app/`, `alembic/`, seed scriptleri değişmez.
- AWS CLI, Terraform, ECS, EC2, RDS, Route53, S3 yok. Rapor `AWS STAGING PROVISIONED: NO` kalır.
- GitHub Actions workflow eklenmez, değişmez.
- Rate limiter Redis'e taşınmaz. HttpOnly cookie yok. Auth/JWT davranışı değişmez.
- Alembic migration yok; şema değişmiyor.
- `.env`, dump dosyası, secret commit yok. Force push, `reset --hard` yok.
- Başka branch'ten commit alınmaz.

M3'e kalanlar (bu PR'de yok, raporda silinmez): billing alarm + AWS staging (`PRICE CEILING APPROVED` sonrası), Sentry (DSN sonrası), ZAP API (URL sonrası), WAF, HttpOnly. Etiket `REQUIRES SEPARATE MILESTONE (KASIM M3)`.

---

## Çalışma

```
git fetch origin
git checkout main
git pull --ff-only origin main
git checkout -b kasim/m2-db-backup
git remote -v
git branch --show-current
git status
git rev-parse HEAD
```

Oku: `backend/docker-compose.yml`, `backend/STAGING.md`, `backend/app/core/config.py` (`APP_ENV`), `backend/scripts/seed_demo_users.py`, `backend/tests/test_docker_entrypoint.py` (mock kalıbı), `backend/.gitignore`.

Stage: yalnız "Kilitler"deki altı dosya.

---

## Senaryolar

| Durum | Yap |
|---|---|
| AWS hesabı / URL isteyeyim | Hayır; bu PR local |
| CI job ekleyeyim | Hayır |
| Dump'ı S3'e koyayım | Hayır; local dizin |
| Docker yok, round trip çalışmıyor | Script ve test yine yazılır; rapora `LOCAL ROUND TRIP: NOT RUN (no Docker)` |
| pg_dump'ı host'ta isteyeyim | Hayır; `docker compose exec db` |
| Saklama politikası yazayım | Hayır; yalnız "repo dışı tutulur" |
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
K8 GUARD TESTS: N passed
K8 LOCAL ROUND TRIP (dump -> drop -> restore -> /health 200 -> login 200): PASS / FAIL / NOT RUN
FILES OUTSIDE backend/ (except report): NONE
ALEMBIC HEADS: 1
PYTEST: N passed, 0 failed
AWS STAGING PROVISIONED: NO
BILLING ALARM: NOT IN THIS PR (ceiling pending)
PUBLIC API DNS: NO
FILES THIS CHAT:
RECOMMENDED NEXT STEP: ceiling approved -> billing alarm + staging (K2/K3)
```
