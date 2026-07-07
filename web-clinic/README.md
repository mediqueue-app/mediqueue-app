# MediQueue — Klinik Dashboard (`web-clinic`)

Klinik yöneticilerinin operasyonel iş akışını yönettiği web arayüzü. **Ay 1 kapsamında gösterilebilir bir prototiptir:** mock veriyle çalışır, backend'e bağlı değildir.

Amaç; lead yönetimi, doktor kadrosu, analitik ve billing ekranlarını klinik görüşmelerinde ve Demo Day provalarında göstermektir.

## Teknolojiler

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- lucide-react

## Hızlı Başlangıç

```powershell
cd web-clinic
npm install
npm run dev
```

Uygulama **http://localhost:3000** adresinde açılır.

Production build:

```powershell
npm run build
npm run start
```

## Demo Akışı

Önerilen sunum sırası:

```
/dashboard → Hasta & Lead → Doktorlar → Analitik → Ayarlar → Abonelik
```

- Ana sayfa (`/`) otomatik olarak `/dashboard`'a yönlendirir.
- **Login ekranı yok** — klinik yöneticisi doğrudan dashboard'a girer (Ay 1 bilinçli tercih; web-doctor'da dekoratif login vardır).
- Lead onay/red işlemleri **local state**'tedir; sayfa yenilenince sıfırlanır.

## Sayfalar

| Rota | Açıklama |
|------|----------|
| `/dashboard` | KPI özeti, hızlı lead tablosu |
| `/dashboard/patients` | Lead listesi — filtre, onay/red, belge drawer |
| `/dashboard/doctors` | Doktor grid — müsaitlik toggle (local state) |
| `/dashboard/analytics` | Dönüşüm hunisi, bölgesel kıyaslama, AI yorum özeti |
| `/dashboard/settings` | Klinik profil formu (mock kaydet) |
| `/dashboard/billing` | Abonelik plan karşılaştırması |

## Ay 1 Kapsamı

### Dahil

- 6 sayfa, tıklanabilir navigasyon, mock veri
- Lead yönetimi, doktor müsaitlik UI, analitik kartları
- `lib/services/` katmanı — Ay 2 API geçişi için hazır
- Mock tarihler her yüklemede **bugüne göre** üretilir

### Bilinçli olarak dahil değil

- Gerçek backend / JWT auth
- Kalıcı lead/doktor/ayar kaydı
- Gerçek ödeme / fatura entegrasyonu
- PDF rapor indirme (buton dekoratif)

## Veri Katmanı

Sayfalar mock veriye **`lib/services/`** üzerinden erişir:

- `clinic.ts` — `fetchDashboardOverview`
- `leads.ts` — `fetchPatientLeads`
- `doctors.ts` — `fetchDoctors`
- `analytics.ts` — `fetchAnalyticsData`
- `billing.ts` — `fetchPlanFeatures`

Yardımcılar: `lib/country.ts`, `lib/branches.ts`, `lib/mock-date.ts`

## web-doctor ile farklar

| | web-clinic | web-doctor |
|--|------------|------------|
| Port | 3000 | 3001 |
| Auth | Yok (açık dashboard) | Dekoratif login + demo guard |
| Branş etiketleri | Türkçe (`Diş Tedavisi`) | İngilizce kod (`dentistry`) |
| Odak | Lead, analitik, billing | Hasta detay, takvim, mesaj |

Branş eşlemesi: `lib/branches.ts` → `BRANCH_DOCTOR_CODE_MAP`

## Ay 2 Planı (özet)

- Backend auth + klinik API entegrasyonu
- `lib/services/*` → gerçek `fetch` çağrıları
- Ortak branş enum'u (clinic + doctor app)

## İlgili Dokümantasyon

- Monorepo: [`../README.md`](../README.md)
- Doktor portalı: [`../web-doctor/README.md`](../web-doctor/README.md)
