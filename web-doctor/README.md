# MediQueue — Doktor Portalı (`web-doctor`)

Doktorların günlük iş akışını yönettiği web arayüzü.

**Durum (Ay 1):** Hybrid — JWT login + randevu/hasta API. Profil `/auth/me` ile kurulur (`GET /doctors/{id}` yok). Mesajlar ve takvim müsaitliği mock.

## Teknolojiler

- Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 4 · lucide-react

## Hızlı Başlangıç

Backend (`:8000`) + `seed_demo_users` gerekir.

```powershell
cd web-doctor
copy .env.example .env.local
npm install
npm run dev
```

→ **http://localhost:3001/login**

| Alan | Değer |
|------|--------|
| Email | `doctor@mediqueue.com` |
| Şifre | `Demo1234!` |

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/v1
```

## Demo akışı

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
| `/dashboard/profile` | `/auth/me`; kayıt yerel cache |

Randevu listesi, patient henüz `POST /appointments` yazmadıysa boş olabilir — beklenen davranış.

## Smoke (backend)

```powershell
cd backend
python -m scripts.smoke_ay1_doctor_match
```

## Ay 2’ye ertelenenler

Mesaj API, odontogram kalıcılığı, doktor self-PATCH / `GET /doctors/{id}`, cookie auth.
