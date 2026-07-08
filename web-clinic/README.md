# MediQueue — Klinik Dashboard (`web-clinic`)

Klinik yöneticilerinin operasyonel iş akışını yönettiği SaaS düzeyinde web arayüzü. **Ay 1 prototipi:** mock veri, backend bağlantısı yok.

## Teknolojiler

- Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 4
- **Inter** tipografi · **Lucide** ikonlar
- **Recharts** grafikler · **Framer Motion** sayfa geçişleri

## Tasarım Sistemi

| Token | Değer |
|-------|-------|
| Marka mavisi | `#1E4FA8` |
| Başarı | `#10B981` |
| Uyarı | `#F59E0B` |
| Hata | `#EF4444` |

## Hızlı Başlangıç

```powershell
cd web-clinic
npm install
npm run dev
```

→ **http://localhost:3000/dashboard**

## Sayfalar

| Rota | Açıklama |
|------|----------|
| `/dashboard` | KPI, trend grafiği, bekleyen talepler, aktiviteler |
| `/dashboard/patients` | Durum sekmeleri, arama, onay/alternatif/iptal |
| `/dashboard/doctors` | Doktor grid, yıldız puanı, aktif toggle, detay paneli |
| `/dashboard/analytics` | Dönüşüm hunisi, tedavi talebi grafiği, menşei |
| `/dashboard/reviews` | AI yorum özeti + hasta yorum listesi |
| `/dashboard/settings` | Profil, diller, branşlar, bildirim tercihleri |
| `/dashboard/billing` | Abonelik (ayarlardan link) |

## Demo Akışı

```
Özet → Hasta Talepleri → Doktorlar → Analitik → Yorumlar → Ayarlar
```

## Veri Katmanı

`lib/services/` — Ay 2 API geçişi için hazır:

- `clinic.ts` · `leads.ts` · `doctors.ts` · `analytics.ts` · `reviews.ts` · `billing.ts`

Mock: `lib/mock-data.ts` · `lib/mock-reviews.ts` · `lib/mock-date.ts`

## Ay 1 / Ay 2

**Dahil:** 7 sayfa, collapsible sidebar, recharts, demo toast, genişletilmiş lead durumları  
**Ay 2:** Backend auth, kalıcı kayıt, gerçek PDF/ödeme, AI yorum özeti API
