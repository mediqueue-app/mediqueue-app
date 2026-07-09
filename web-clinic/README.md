# MediQueue — Klinik Dashboard (`web-clinic`)

Klinik yöneticilerinin operasyonel iş akışını yönettiği SaaS web arayüzü.

**Durum:** JWT login + client-side API bağlama (randevular/doktorlar/yorumlar/ayarlar). Analytics ve billing hâlâ mock. Backend’de clinic rolü + `clinic_id` seed hesabı gerekir.

## Teknolojiler

- Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 4
- **Inter** tipografi · **Lucide** ikonlar
- **Recharts** grafikler · **Framer Motion** sayfa geçişleri

## Hızlı Başlangıç

```powershell
cd web-clinic
copy .env.example .env.local
npm install
npm run dev
```

→ **http://localhost:3000/login**

`NEXT_PUBLIC_API_BASE_URL` varsayılan: `http://localhost:8000/v1`

## Sayfalar

| Rota | Açıklama | Veri |
|------|----------|------|
| `/login` | Klinik JWT girişi | API |
| `/dashboard` | KPI, trend, bekleyen talepler | API (client fetch) |
| `/dashboard/patients` | Lead listesi, onay/red | API |
| `/dashboard/doctors` | Doktor grid | API |
| `/dashboard/reviews` | Yorum listesi | API |
| `/dashboard/settings` | Klinik profil PATCH | API |
| `/dashboard/analytics` | Huniler / grafikler | Mock |
| `/dashboard/billing` | Abonelik | Mock |

## Demo Akışı

```
/login → Özet → Hasta Talepleri → Doktorlar → Yorumlar → Ayarlar
```

## Ay 2’ye ertelenenler

PDF export, ödeme, AI yorum özeti API, belge önizleme, cookie-based auth.
