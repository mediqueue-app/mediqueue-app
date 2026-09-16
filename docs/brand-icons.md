# Brand icons and default-asset inventory

Kaynak marka seti (kullanılacak):

- `web-marketing/public/mediqueue-icon.png` — 512×512 “M” kiremit (`#3A6AD6` / `#EEF2FF`)
- `web-marketing/public/mediqueue-logo.png` — MEDI·QUEUE wordmark (açık gri plaka; dark mode için SVG bekleniyor, `docs/theme-hardcoded-colors.md`)
- Chrome bileşeni: `BrandMark` (`/brand/mediqueue-icon.png`)
- Pazarlama wordmark: `BrandLogo`

Lucide UI seti (Search, Chevron, Bell…) tek kütüphane olarak **kalır**. Aşağıdaki tablo yalnızca **jenerik / varsayılan / marka yerine geçen** parçaları işaretler.

Durum: **REPLACE** = marka setiyle değiştirilecek veya değiştirildi. **KEEP** = tutarlı Lucide UI, marka kiremiti değil.

## Favicon / PWA / tarayıcı

| Varlık | Önce | Şimdi | Durum |
|---|---|---|---|
| `web-patient` favicon | Yok → tarayıcı varsayılanı | `src/app/{favicon.ico,icon.png,apple-icon.png}` + `manifest.ts` | REPLACE ✓ |
| `web-admin` favicon | Yok → tarayıcı varsayılanı | aynı | REPLACE ✓ |
| `web-clinic` / `web-doctor` `favicon.ico` | create-next-app globe (~26 KB) | marka ico (~62 KB) | REPLACE ✓ |
| `web-marketing` icon / apple-icon | Marka M | aynı + `manifest.ts` | KEEP |
| PWA ikonları | Yok | 512 PNG, `theme_color #3a6ad6` | REPLACE ✓ |
| `web-clinic/public/{next,vercel,file,window,globe}.svg` | create-next-app, kullanılmıyordu | silindi | REPLACE ✓ |
| `web-doctor/public/{next,vercel,file,window,globe}.svg` | aynı | silindi | REPLACE ✓ |

## Chrome logoları (Lucide stand-in)

| Yer | Eski | Yeni | Durum |
|---|---|---|---|
| Hasta navbar / footer / login / register | `Stethoscope` | `BrandMark` | REPLACE ✓ |
| Klinik sidebar / login | `HeartPulse` | `BrandMark` | REPLACE ✓ |
| Doktor sidebar (layout + shared) / login | `Stethoscope` | `BrandMark` | REPLACE ✓ |
| Admin sidebar / login | `ShieldCheck` | `BrandMark` | REPLACE ✓ |
| Pazarlama navbar / footer | `BrandLogo` wordmark | aynı | KEEP |

## Lucide UI (tutarlı set — marka kiremiti değil)

| Yer | Not | Durum |
|---|---|---|
| Nav item ikonları (LayoutGrid, Inbox, Calendar…) | Tek set; portal içi tutarlı | KEEP |
| `TreatmentIcon` fallback `Stethoscope` | Kategori piktogramı yoksa jenerik | REPLACE (brand pictogram seti) |
| `SmartImage` `ImageIcon` | Bozuk görsel placeholder | REPLACE (brand illustration) |
| Klinik/doktor/hasta işlev ikonları (MapPin, Search, Bell) | Lucide stroke 2 | KEEP |

## Form kontrolleri

| Kontrol | Önce | Şimdi | Durum |
|---|---|---|---|
| `input[type=checkbox]` hasta login, marketing consent | OS native (+ kısmi `accent-primary`) | `globals.css` kare + primary check | REPLACE ✓ |
| `select` klinik explorer, konsultasyon, lead, doktor hasta listesi | OS ok | `appearance:none` + brand chevron | REPLACE ✓ |
| `input[type=radio]` | Kullanılmıyor | aynı CSS hazır | KEEP (hazır) |
| `ToggleSwitch` (klinik) | Custom, native değil | aynı | KEEP |
| `input[type=range]` admin settings | `appearance-none` + `accent-primary` | aynı | KEEP |

## Flutter (henüz repo yok)

`flutter create` varsayılan `ic_launcher` / `AppIcon` **kullanılmaz**. Checklist: `docs/flutter-app-icons.md`.
