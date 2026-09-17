# MediQueue — Doktor Portalı (`web-doctor`)

Doktorların günlük iş akışını yönettiği web arayüzü.

**Durum (Ay 2 W1):** Hybrid — JWT login + randevu/hasta API + müsaitlik API. Mesajlar mock (`Mock · Yakında`).

## Teknolojiler

- Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 4 · lucide-react

## Hızlı Başlangıç

Backend (`:8000`) + migration + `seed_demo_users` gerekir.

```powershell
cd backend
alembic upgrade head
python -m scripts.seed_demo_users
```

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
/login → Özet → Hastalarım → Takvim (müsaitlik kaydet) → Mesajlar (mock) → Profil → Çıkış
```

## Sayfalar

| Rota | Veri |
|------|------|
| `/login` | API JWT |
| `/dashboard` | Randevular API; stats/queue mock |
| `/dashboard/patients` | Appointments → patient map (API) |
| `/dashboard/calendar` | Appointments API; müsaitlik `GET/PUT /doctors/{id}/availability` |
| `/dashboard/messages` | Mock · Yakında |
| `/dashboard/profile` | `/auth/me`; kayıt yerel cache |

Randevu listesi, patient henüz `POST /appointments` yazmadıysa boş olabilir — beklenen davranış.

## Ay 2’ye / sonraya ertelenenler

Doktor mesaj API (bonus), odontogram kalıcılığı, doktor self-PATCH / `GET /doctors/{id}`, cookie auth, AI feedback DB persist (P2).
