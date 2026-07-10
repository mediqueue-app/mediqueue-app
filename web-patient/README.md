# MediQueue — Hasta Paneli (`web-patient`)

B2C sağlık pazaryeri arayüzü. Hastalar klinik/doktor keşfeder ve randevu talebi oluşturur.

**Durum (Ay 1):** UI prototip — **backend API katmanı yok**. Auth, klinik listesi ve booking `src/lib/mock-data.ts` üzerinden çalışır.

> Ay 1 kapanış P0: clinic/doctor’daki gibi `lib/api` + JWT + `POST /appointments` bağlanacak. O zamana kadar demo hesaplarla gerçek login bu uygulamada çalışmaz.

## Teknoloji

- Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS v4 · lucide-react

## Marka

- Ana renk: `#3a6ad6`
- Hover: `#2f57b3`
- Açık ton: `#eaf0fc`

## Kurulum

```powershell
cd web-patient
npm install
npm run dev
```

→ **http://localhost:3002**

API bağlandığında eklenecek:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/v1
```

Backend demo kullanıcı (entegrasyon sonrası): `patient@mediqueue.com` / `Demo1234!`

## Sayfalar

| Rota | Veri (şimdi) |
|------|----------------|
| `/` | Mock |
| `/treatments` | Mock |
| `/clinics`, `/clinics/[id]` | Mock |
| `/doctors`, `/doctors/[id]` | Mock |
| `/auth/login`, `/auth/register` | Görsel only (API yok) |
| `/how-it-works` | Statik |

## Klasör yapısı

```
src/
  app/            # rotalar
  components/     # layout, clinics, doctors, booking, ui
  lib/            # mock-data.ts, utils.ts  (api/ henüz yok)
```

## Ay 1 entegrasyon hedefi (sırada)

1. `lib/api/client.ts` + `auth.ts` (clinic/doctor pattern)
2. Login/register → `/auth/*`
3. Klinikler → `GET /clinics`
4. Booking → `POST /patients` (gerekirse) + `POST /appointments`
5. Clinic requests E2E

## İlgili

- Monorepo: [`../README.md`](../README.md)
- Backend seed: [`../backend/README.md`](../backend/README.md)
- Klinik hybrid: [`../web-clinic/README.md`](../web-clinic/README.md)
