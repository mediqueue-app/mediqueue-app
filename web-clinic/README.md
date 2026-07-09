# MediQueue — Klinik Büyüme Paneli (`web-clinic`)

Kliniklerin MediQueue pazar yerinde hasta kazanımı, vitrin görünürlüğü ve büyüme modüllerini yönettiği **Marketplace Host Paneli**. ERP/HIS değildir; iç operasyon (stok, vardiya, maaş) kapsam dışıdır.

## Teknolojiler

- Next.js 16 (App Router)
- React 19 · TypeScript 5 · Tailwind CSS 4
- lucide-react · Recharts
- Mock veri (`lib/clinic-mock.ts`, `lib/growth-mock.ts`)

## Tasarım Sistemi

| Token | Değer |
|-------|-------|
| Marka mavisi | `#3a6ad6` |
| Sidebar | `bg-slate-900` |
| İçerik | `bg-slate-50`, beyaz kartlar |
| Başarı | `#10B981` |

## Hızlı Başlangıç

```powershell
cd web-clinic
npm install
npm run dev
```

→ **http://localhost:3000/login** (demo: `clinic@mediqueue.com` / herhangi bir şifre)

## Modüller

| Rota | Açıklama |
|------|----------|
| `/dashboard` | Genel bakış, profil tamamlama, KPI, yaklaşan randevular |
| `/dashboard/requests` | Randevu talepleri gelen kutusu |
| `/dashboard/consultations` | Ön konsültasyon & fiyat teklifleri |
| `/dashboard/messages` | Hasta mesajları (otomatik çeviri) |
| `/dashboard/sponsorship` | Vitrin & sponsorluk paketleri |
| `/dashboard/campaigns` | Kampanya yönetimi |
| `/dashboard/forecasts` | AI talep öngörüleri |
| `/dashboard/market-analysis` | Rakip & pazar analizi |
| `/dashboard/profile` | Klinik profili & belgeler |
| `/dashboard/finance` | Finans & komisyonlar |
| `/dashboard/doctors` | Doktor kadrosu |

## Demo Akışı

```
Login → Dashboard → Randevu Talepleri → Ön Konsültasyon → Hasta Mesajları
→ Vitrin & Sponsorluk → Talep Öngörüleri
```

## Veri Katmanı

- `lib/clinic-mock.ts` — profil, talepler, doktorlar, konsültasyonlar
- `lib/growth-mock.ts` — mesajlar, sponsorluk, kampanyalar, AI öngörüleri, finans

Backend entegrasyonu Ay 2 planındadır.

## İlgili Dokümantasyon

- Monorepo: [`../README.md`](../README.md)
- Süperadmin: [`../web-admin/`](../web-admin/)
