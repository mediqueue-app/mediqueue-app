# MediQueue — Hasta Paneli (`web-patient`)

B2C sağlık pazaryeri. Hastalar klinik/doktor keşfeder ve randevu talebi oluşturur.

**Durum (Ay 1):** Hybrid — JWT auth + klinik listesi/detay + booking (`POST /appointments`). API yoksa/fail olursa `mock-data.ts` fallback.

## Teknoloji

- Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS v4 · lucide-react

## Kurulum

Backend (`:8000`) + `seed_demo_users` gerekir.

```powershell
cd web-patient
npm install
# .env.local:
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/v1
npm run dev
```

→ **http://localhost:3002**

| Alan | Değer |
|------|--------|
| Email | `patient@mediqueue.com` |
| Şifre | `Demo1234!` |

## Veri katmanı

| Alan | Kaynak |
|------|--------|
| Login / register | API (`/auth/*`) |
| Klinik listesi / detay / doktorlar | API (`/clinics...`) |
| Randevu oluşturma | `ensurePatientProfile` + `POST /appointments` |
| Tedaviler, home showcase (kısmi) | Mock fallback olabilir |

## Demo notu (E2E)

`clinic@mediqueue.com` yalnızca seed kliniğini görür (genelde **Istanbul Hair Center**, `clinic_id=1`).  
Clinic onay demosu için patient bu kliniğe randevu açmalı.

## Sayfalar

| Rota | Not |
|------|-----|
| `/auth/login`, `/auth/register` | JWT |
| `/clinics`, `/clinics/[id]` | API + BookingWidget |
| `/doctors`, `/doctors/[id]` | Liste/detay + booking |
| `/` | UI; öne çıkanlar kısmen mock |

## Klasör

```
src/lib/
  api/client.ts, types.ts
  auth.ts
  mappers.ts
  services/clinics.ts, patients.ts, appointments.ts
  mock-data.ts   # fallback
```

## İlgili

- Monorepo: [`../README.md`](../README.md)
- Klinik: [`../web-clinic/README.md`](../web-clinic/README.md)
- Backend: [`../backend/README.md`](../backend/README.md)
