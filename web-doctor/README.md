# MediQueue — Doktor Portalı (`web-doctor`)

Doktorların günlük iş akışını yönettiği web arayüzü.

**Durum:** JWT login + client-side randevu/hasta listesi. Profil `/auth/me` ile kurulur (`GET /doctors/{id}` backend’de yok). Mesajlar ve takvim müsaitlik mock. Backend’de doctor rolü + `doctor_id` seed + CORS `3001` gerekir.

## Teknolojiler

- Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 4 · lucide-react

## Hızlı Başlangıç

```powershell
cd web-doctor
copy .env.example .env.local
npm install
npm run dev
```

→ **http://localhost:3001/login**

## Demo Akışı

```
/login → Özet → Hastalarım → Takvim → Mesajlar → Profil → Çıkış
```

## Sayfalar

| Rota | Veri |
|------|------|
| `/login` | API JWT |
| `/dashboard` | Randevular API; stats/queue mock |
| `/dashboard/patients` | Appointments → patient map (API) |
| `/dashboard/calendar` | Appointments API; müsaitlik mock |
| `/dashboard/messages` | Mock |
| `/dashboard/profile` | `/auth/me` profil; kayıt yerel cache |

## Ay 2’ye ertelenenler

Mesaj API, odontogram kalıcılığı, doktor self-PATCH, cookie auth.
