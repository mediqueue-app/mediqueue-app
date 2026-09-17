# MediQueue — Klinik Büyüme Paneli (`web-clinic`)

Kliniklerin MediQueue pazar yerinde hasta kazanımı, vitrin görünürlüğü ve büyüme modüllerini yönettiği **Marketplace Host Paneli**. ERP/HIS değildir.

**Durum (Ay 1):** Hybrid — JWT login + operasyonel API; büyüme/premium modüller mock.

## Teknolojiler

- Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 4
- lucide-react · Recharts
- API client: `src/lib/api/*` · hybrid services: `src/lib/services/*`

## Tasarım Sistemi

| Token | Değer |
|-------|-------|
| Marka mavisi | `#3a6ad6` |
| Sidebar | `bg-slate-900` |
| İçerik | `bg-slate-50`, beyaz kartlar |
| Başarı | `#10B981` |

## Hızlı Başlangıç

Backend (`:8000`) + demo seed gerekir.

```powershell
cd web-clinic
npm install
copy .env.example .env.local
npm run dev
```

→ **http://localhost:3000/login**

| Alan | Değer |
|------|--------|
| Email | `clinic@mediqueue.com` |
| Şifre | `Demo1234!` |

`.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/v1
```

## Veri katmanı (hybrid)

| Alan | Kaynak |
|------|--------|
| Login / `/auth/me` | Gerçek API (JWT) |
| Dashboard KPI, profil, doktorlar | Token varken API; yoksa `clinic-mock.ts` |
| Randevu talepleri (requests) | `GET/PATCH` appointments API |
| Mesajlar, kampanyalar, sponsorluk, forecast, finans | `growth-mock.ts` (backend yok) |

## Modüller

| Rota | Veri |
|------|------|
| `/dashboard` | Hybrid |
| `/dashboard/requests` | **API** (onay/red → status patch) |
| `/dashboard/profile` | Hybrid |
| `/dashboard/doctors` | Hybrid |
| `/dashboard/consultations` | Mock / kısmi |
| `/dashboard/messages` | Mock |
| `/dashboard/sponsorship` | Mock |
| `/dashboard/campaigns` | Mock |
| `/dashboard/forecasts` | Mock |
| `/dashboard/market-analysis` | Mock |
| `/dashboard/finance` | Mock |

## Demo akışı

```
Login (clinic@) → Dashboard → Randevu Talepleri → (Patient E2E sonrası) onay/red
```

Patient tarafı API’ye bağlanınca requests kutusu gerçek `pending` randevularla dolar.

Patient demoda `clinic@` inbox’u için seed kliniğine (`clinic_id`, genelde Istanbul Hair Center) randevu açılmalı.

## İlgili dokümantasyon

- Monorepo: [`../README.md`](../README.md)
- Backend seed: [`../backend/README.md`](../backend/README.md)
- Doktor: [`../web-doctor/README.md`](../web-doctor/README.md)
- Hasta: [`../web-patient/README.md`](../web-patient/README.md)
