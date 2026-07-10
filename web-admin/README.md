# MediQueue — Süperadmin Paneli (`web-admin`)

Platform sahibi için pazar yeri kontrol paneli (başvurular, klinikler, hastalar, destek, ayarlar).

**Durum (Ay 1):** UI prototip — **mock veri**. Backend’de yalnızca `GET /v1/admin/summary` var; applications/onboarding API’si yok. Ay 1 E2E için zorunlu değil.

## Teknoloji

- Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 4 · lucide-react · Recharts

## Kurulum

```powershell
cd web-admin
npm install
npm run dev
```

→ **http://localhost:3003**

Demo UI login herhangi bir non-empty credential kabul edebilir (mock auth). Backend seed hesabı: `admin@mediqueue.com` / `Demo1234!` — bu panel henüz JWT’ye bağlı değil.

## Modüller (mock)

| Rota | Açıklama |
|------|----------|
| `/login` | Demo giriş |
| `/dashboard` | KPI / özet |
| `/dashboard/applications` | Klinik başvuruları |
| `/dashboard/clinics` | Klinik yönetimi |
| `/dashboard/patients` | Hasta listesi |
| `/dashboard/feedback` | Destek talepleri |
| `/dashboard/settings` | Komisyon / platform ayarları |

Veri: `src/lib/mock-data.ts`

## Ay 2

- JWT + admin role
- Applications / moderation API
- `GET /admin/summary` dashboard’a bağlama

## İlgili

- Monorepo: [`../README.md`](../README.md)
- Backend: [`../backend/README.md`](../backend/README.md)
