# Frontend manuel QA kontrol listesi + Playwright yol haritası

**Tarih:** 16 Eylül 2026  
**Kapsam:** 19 UX maddesi + kritik kullanıcı akışları + cihaz matrisi.  
**Tamamlayan:** _______________ **Build / branch:** _______________ **Ortama not:** _______________

İşaret: `[x]` geçti · `[ ]` kaldı · `N/A` bu yüzeyde yok · bug ID’sini satır sonuna yaz.

Bu liste **ürün kabulü** içindir. Otomasyon karşılığı §5. Backend dikey dilim smoke: `python -m scripts.smoke_ay1_e2e`. AI servis: `cd ai && pytest --cov=app`.

---

## 0. Ortam

| Uygulama | Port | Seed giriş |
|---|---|---|
| Hasta `web-patient` | `:3002` | `patient@mediqueue.com` / `Demo1234!` |
| Klinik `web-clinic` | `:3000` | `clinic@mediqueue.com` / `Demo1234!` |
| Doktor `web-doctor` | `:3001` | `doctor@mediqueue.com` / `Demo1234!` |
| Admin `web-admin` | `:3003` | `admin@mediqueue.com` / `Demo1234!` |
| Pazarlama | `:3004` | — |
| API | `:8000/v1` | Alembic head + seed |

- [ ] Backend ayakta; CORS’ta `3000–3003` var
- [ ] `alembic upgrade head` (hesap silme için `202609160001` dahil)
- [ ] Her portalda favicon M kiremit (globe / boş sekme yok) — `docs/brand-icons.md`

---

## 1. On dokuz UX maddesi

Her maddeyi **en az bir kez masaüstü Chrome** ve **bir kez dar viewport** (≤430px veya gerçek telefon) ile işaretle. Haptik web’de N/A.

### 1. Boş durumlar

Beklenen: `EmptyState` / `LocalizedEmpty`; “veri yok” gibi ham metin yok; CTA varsa çalışır.

- [ ] Hasta `/clinics` anlamsız arama → boş sonuç + sıfırla
- [ ] Hasta `/appointments` (yeni hesap veya boş liste)
- [ ] Klinik `/dashboard/requests` filtrede sıfır satır
- [ ] Klinik kampanya / sponsorship boş veya “yakında”
- [ ] Doktor hasta listesi boş arama
- [ ] Sohbet geçmişi yokken composer görünür, beyaz ekran yok

### 2. Renk tutarlılığı

Token: `--color-primary #3a6ad6`, `--color-surface`, `--color-border`. Referans: `docs/theme-hardcoded-colors.md`.

- [ ] Primary CTA’lar aynı mavi; kırmızı yalnızca yıkıcı eylem
- [ ] Kart / input `bg-white` light’ta OK; `.dark` açılınca kartlar leke gibi kalırsa **bilinen borç** (fail etme, bug olarak not)
- [ ] StatusBadge tonları (pending / onay / iptal) portallar arası aynı anlam
- [ ] Wordmark `mediqueue-logo.png` gri plaka dark’ta taşarsa not

### 3. Hata mesajları

`toUserError` / `user-error.ts`: kullanıcı dilinde, ham HTTP yok.

- [ ] Yanlış şifre → “e-posta veya şifre” (stack / 401 JSON yok)
- [ ] Ağ kes (DevTools offline) → ağ/timeout kopyası + tekrar dene
- [ ] `PageLoadError` klinik listesi / dashboard sayfalarında retry
- [ ] 403 doktor self-erase veya yanlış portal → yetki metni, boş sayfa değil

### 4. Loading

- [ ] Liste iskeleti veya spinner; layout zıplaması yok
- [ ] Randevu gönder / onay / sil butonu `busy` (çift tık yok)
- [ ] AuthGuard “yönlendiriliyor” kısa; takılı kalmaz (8s boot timeout klinik)
- [ ] HybridBadge canlı vs mock yanıltmaz

### 5. Klavye

Web: `visualViewport` + `--keyboard-inset`. Flutter: `docs/flutter-keyboard-avoiding.md`.

- [ ] iOS Safari: login e-posta/şifre odak → input klavyenin üstünde, `scrollIntoView`
- [ ] Hasta sohbet composer klavye açılınca görünür
- [ ] Klinik mesaj / konsultasyon alt alan aynı
- [ ] `position: fixed` chrome klavyede çift boşluk veya kayıp tap yok

### 6. Geri tuşu / history

`docs/web-navigation-history.md`. Overlay `useHistoryLayer`.

- [ ] Klinik detayda saat seçiliyken geri → sayfa çıkmaz, saat temizlenir (e2e var)
- [ ] Booking başarı ekranında geri → form, beyaz ekran yok
- [ ] ConfirmDialog / PermissionPrimer açıkken geri → katman kapanır, route aynı
- [ ] Login başarı `replace` → geri ile login formuna düşme
- [ ] Android sistem geri = tarayıcı geri (PWA standalone’da ayrıca dene)

### 7. Dark mode

`html.dark` paleti var; çoğu yüzey hâlâ `bg-white`.

- [ ] `document.documentElement.classList.add('dark')` ile smoke
- [ ] Metin kontrastı primary üzerinde beyaz CTA OK
- [ ] Bildirim / modal overlay okunur
- [ ] Bilinen `bg-white` borçları listeye yaz (kart, login panel) — `theme-hardcoded-colors.md`

### 8. Dokunma alanı

HIG/Material: en az 44×44 / `min-h-12` / `.touch-target`.

- [ ] Navbar hamburger, dil TR/EN, booking gün/saat hücreleri
- [ ] ConfirmDialog Vazgeç / onay
- [ ] Klinik/doktor sidebar satırları ve çan
- [ ] Sohbet kâğıt klipsi / gönder — bitişik ikonlar birbirine taşmaz

### 9. Safe area

`viewport-fit=cover` + `.safe-top` / `.safe-bottom`. Flutter: `docs/flutter-safe-area.md`.

- [ ] iPhone çentik / Dynamic Island: sticky header altında ezilmez
- [ ] Home indicator: sabit alt nav / composer üstünde
- [ ] Landscape + klavye birleşik inset

### 10. Placeholder / dummy kopya

- [ ] Lorem, “test”, “asdf”, “TODO user facing” yok
- [ ] Input placeholder’ları `t(...)` (ör. doktor explorer “Tüm şehirler” hardcoded → fail)
- [ ] Empty / error / loading i18n anahtarından
- [ ] Klinik growth “Yakında” ise açıkça mock

### 11. i18n (TR / EN)

`tr.json` / `en.json`; eksik EN `⚠ EN:` öneki.

- [ ] Hasta navbar EN: UK İngilizcesi, Amerikan idiom yok
- [ ] Klinik / doktor / admin dil anahtarı
- [ ] Confirm / permission / account silme metinleri iki dilde
- [ ] Sayfada `⚠ EN:` veya `⚠ key` kalırsa fail
- [ ] Pazarlama `npm test` (locale check) yeşil

### 12. Tarih formatı

`Intl` / `datetime.ts`; EN `en-GB` DD/MM/YYYY; randevu İstanbul saati.

- [ ] Hasta TR: 15 Temmuz 2026 (US `July 15, 2026` yok)
- [ ] Hasta EN: 15/07/2026 veya 15 July 2026 — `7/15/2026` yok
- [ ] Booking başarı tarihi + klinik TZ etiketi (İstanbul)
- [ ] Doktor takvim / müsaitlik aynı kural
- [ ] `toLocaleDateString` concat veya ham ISO kullanıcıya görünmez

### 13. Onay diyalogları

Yıkıcı eylem: `ConfirmDialog`; neden sorulmaz (hesap silme); geri alınamaz yazılır.

- [ ] Hasta randevu iptal
- [ ] Klinik talep red / randevu iptal
- [ ] Klinik foto/belge sil
- [ ] Mesaj sil
- [ ] Hesap silme **iki adım** (Devam et → kalıcı sil)
- [ ] Escape / overlay / geri diyaloğu kapatır; `busy` iken kapanmaz

### 14. Haptik

Web’de yok (bilinçli). Native: `docs/flutter-haptic-feedback.md`.

- [ ] Web: N/A
- [ ] Flutter build varsa: başarı `light`, hata `error`/`heavy`, yıkıcı onay sonrası — tap’te titreşim yok

### 15. Animasyon

`--mq-dur` 220ms, 150–300ms ease-out; `prefers-reduced-motion`.

- [ ] Sayfa `template` geçişi / modal açılış ~200ms, zıplama yok
- [ ] OS “Reduce motion”: overlay/page animasyon kapalı, içerik anında
- [ ] Liste ekleme spinner dönmeyi reduced-motion’da keser

### 16. İzin primer’ı

Native diyalogdan **önce** `PermissionPrimer`. `docs/flutter-permission-primer.md`.

- [ ] Kamera / dosya: Belge ekle / galeri — önce açıklama, Continue aynı jestte prompt
- [ ] Konum: “Konumumu bul” — Permissions API `granted` ise primer yok
- [ ] Bildirim: booking başarı / sohbet / çan açık — profil veya header’da toplu CTA yok
- [ ] Later / kapat primer’ı kapatır; OS prompt atlamaz

### 17. İzin zamanlaması (JIT, toplu değil)

- [ ] Login / ilk boyama / onboarding’de kamera+konum+bildirim peş peşe yok
- [ ] `Notification.requestPermission` yalnızca kullanıcı o özelliği istediğinde
- [ ] File input `capture` yalnızca kâğıt klipsi / yükle

### 18. Hesap silme (KVKK unutulma)

- [ ] Hasta `/account` + footer “Hesabımı sil”; neden alanı yok
- [ ] İkinci onay; `POST /v1/account/erasure`; logout → login
- [ ] Aynı e-posta ile tekrar kayıt açılabilir (tombstone)
- [ ] Klinik profil tehlike bölgesi; vitrin kapanır, klinik **adı** geçmişte kalır
- [ ] Doktor / admin 403; self-service yok
- [ ] Açık randevular iptal; mesaj gövdesi redakte

### 19. İkonlar / favicon / form kontrolleri

`docs/brand-icons.md`. Flutter launcher: `docs/flutter-app-icons.md`.

- [ ] Sekme ikonu M kiremit (hasta/klinik/doktor/admin)
- [ ] Nav/login logosu `BrandMark`, Lucide stetoskop/kalp/kalkan değil
- [ ] Checkbox / select OS varsayılan oku değil (primary check, chevron)
- [ ] PWA “Add to Home Screen” ikonu marka (mümkünse Android Chrome)

---

## 2. Kritik kullanıcı akışları

### A. Hasta: arama → filtre → randevu talebi

Seed: `patient@mediqueue.com`. Port `:3002`.

- [ ] `/` SearchBar: semptom + şehir (+ tarih) → `/clinics?q=&city=`
- [ ] Liste filtre (şehir select, arama); URL paylaşılabilir
- [ ] `/clinics/1` detay + `booking-submit`
- [ ] Gün `booking-day-*` + saat `booking-time-*` → “Randevu Talebi Oluştur”
- [ ] Başarı `booking-success`: pending / Bekliyor; tarih Intl
- [ ] Bildirim primer’ı (isteğe bağlı) başarı sonrası, sayfa yükünde değil
- [ ] `/appointments` yeni talep listede
- [ ] Oturumsuz booking → login `?next=` sonra geri klinik detay
- [ ] Çift submit yok; network fail kullanıcı hatası

Otomasyon bugün: `web-patient/tests/e2e/booking.spec.ts` (mock API, Chromium).

### B. Klinik panel: onay akışı

Seed: `clinic@mediqueue.com`. Port `:3000`. `/dashboard/requests`.

- [ ] Login JWT; `clinic_id` yoksa hata
- [ ] Bekleyen listesi; seçince hasta / branş / tarih
- [ ] **Onay** → status onaylandı; hasta tarafında confirmed
- [ ] **Red** → ConfirmDialog (geri alınamaz) → rejected; neden yok
- [ ] Onaylı randevu iptal → ikinci ConfirmDialog
- [ ] Mesaj gönder (patient↔clinic); çeviri varsa bozulmadan
- [ ] Geri tuşu detay overlay’i kapatır, inbox’tan düşmez
- [ ] Busy: aynı satırda çift onay yok

Karşı uç: hasta `/appointments` durum badge. Backend: `smoke_ay1_e2e`.

### C. Doktor paneli

Seed: `doctor@mediqueue.com`. Port `:3001`.

- [ ] Login → `/auth/me` `role=doctor`, `doctor_id`
- [ ] Dashboard: bugünkü / bekleyen randevular (klinik onayından sonra görünür)
- [ ] `/dashboard/calendar` veya schedule: müsaitlik değiştir → kaydet → yenile persist
- [ ] `/dashboard/patients` liste → detay drawer; geri drawer’ı kapatır
- [ ] Mesajlar: HybridBadge mock ise “yakında”; canlı ise hasta thread
- [ ] Profil: self-erase yok (403 veya UI kuyruk); hekim silme KVKK self-service değil
- [ ] Mobil alt nav tap target + safe-bottom

### D. Mesaj (MVP dikey, A+B’ye bağlı)

- [ ] Hasta randevu sohbeti → klinik Messages görür
- [ ] Kâğıt klipsi → PermissionPrimer → file/camera
- [ ] Mesaj sil ConfirmDialog; karşı tarafta kaybolur veya redakte

### E. Hesap kapatma (madde 18’in akış hali)

- [ ] Hasta A’daki randevudan sonra `/account` sil → login olamaz (eski şifre)
- [ ] Klinik sil → vitrin `is_active=false`; doktor o kliniğe yeni talep açamaz

---

## 3. Tarayıcı / cihaz matrisi

**P0 (her prova, her release adayı)**

| Cihaz | Motor | Viewport | Neden |
|---|---|---|---|
| Windows/mac masaüstü | Chrome güncel | ≥1280 | Ana QA, DevTools |
| iPhone 14/15 sınıfı | **Safari** (gerçek cihaz veya WebKit) | ~390×844 | Çentik, klavye, geri, izin, haptic N/A |
| Android Pixel / orta segment | **Chrome** | ~412×915 | Klavye, PWA ikon, bildirim, geri |

**P1 (prova-1 / freeze öncesi en az bir tur)**

| Cihaz | Motor | Not |
|---|---|---|
| iPad | Safari 768–1024 | Split view / floating keyboard |
| macOS | Safari masaüstü | `100dvh`, permission API farkı |
| Windows | Firefox | `appearance` select/checkbox |

**P2** Samsung Internet; iOS Chrome (WKWebView — Safari ile aynı kabul, bir smoke yeter).

Daraltılmış tur (30–40 dk): P0 × akış A + B + maddeler 5, 6, 8, 9, 16–19.  
Tam tur: P0 × A, B, C + 19 madde; P1 bir kez.

Playwright proje eşlemesi (hedef, §5):

```text
chromium          → Desktop Chrome P0
webkit            → iOS Safari vekili (gerçek cihazın yerini tutmaz; klavye/safe-area hâlâ elde)
Mobile Chrome     → Pixel 7
Mobile Safari     → iPhone 14
```

---

## 4. Kayıt şablonu (kopyala)

```
Tarih:
Cihaz / tarayıcı:
Akış (A/B/C):
Fail maddeler:
Ekran görüntüsü / video:
```

---

## 5. Playwright e2e yol haritası

AI microservice `pytest --cov=app` ile **satır kapsamı** ~%96 tutar; bu, eşleştirme kurallarının neredeyse tamamının birim testte olduğu anlamına gelir. Playwright aynı metriği **taklit etmemeli**: E2E yavaş ve kırılgandır. Frontend disiplini = **yolculuk kapsamı** (P0 akışların her biri en az bir spec) + CI’da kırmızı kapı; Istanbul %96 değil.

Bugün: yalnızca `web-patient` `playwright.config.ts` + `tests/e2e/booking.spec.ts` (Chromium, `/v1` mock, `data-testid`). Klinik/doktor/admin’de `test:e2e` yok.

### İlke (AI pytest ile hizalı)

| AI / backend | Frontend e2e |
|---|---|
| Matcher birim testi | Saf UI durumları: boş liste, busy, dialog (component veya e2e) |
| API contract testi | `page.route('**/v1/**')` ile aynı kontrat sahte |
| `smoke_ay1_e2e` canlı seed | Ayrı `e2e:live` job; P0 mock job’u bloke etmez |
| Coverage XML artifact | Journey listesi (bu dokümandaki A–E) ↔ spec dosya haritası |
| path-filter CI | `web-patient/**` → patient e2e; clinic spec’leri ayrı job |

### Faz 0 — kapı (1 sprint)

- [ ] Mevcut `booking.spec.ts` GitHub Actions (`paths: web-patient/**`)
- [ ] `trace: on-first-retry`, artifact upload
- [ ] `forbidOnly` CI’da
- [ ] Bu listedeki A akışı yeşil kalır (geri tuşu senaryoları dahil)

### Faz 1 — P0 yolculuklar (asıl kapsam sıçraması)

Paylaşılan `tests/e2e/helpers/{auth,api-mock}.ts` (sessionStorage token, `**/v1/**` fulfill).

| Spec | Akış | Portal |
|---|---|---|
| `booking.spec.ts` | A (var) | hasta |
| `search-filter.spec.ts` | `/` → `/clinics?q=` boş + dolu | hasta |
| `appointments-empty.spec.ts` | madde 1 | hasta |
| `i18n-en.spec.ts` | EN, `⚠ EN:` yok, tarih `en-GB` | hasta |
| `account-erasure.spec.ts` | iki ConfirmDialog + POST `/account/erasure` mock | hasta |
| `clinic-requests.spec.ts` | B onay + red dialog | klinik |
| `doctor-calendar.spec.ts` | C müsaitlik kaydet mock | doktor |

Klinik/doktor: `@playwright/test` + `playwright.config.ts` (port 3000 / 3001), `data-testid` onay/red/takvim kayıt.

Hedef ölçü: **P0 journey ≥ %100 spec’li** (A, B, C, 18), satır %96 değil.

### Faz 2 — motorlar ve UX maddeleri

- [ ] Config `projects`: Desktop Chrome + Pixel 7 + iPhone 14 (webkit)
- [ ] `prefers-reduced-motion` + dialog açıkken `page.goBack()`
- [ ] Permission: Playwright `context.grantPermissions` vs primer görünürlüğü (grant yokken primer, `granted` iken skip)
- [ ] `toHaveScreenshot` yok (Faz 3); flaky görsel borç üretme

### Faz 3 — canlı smoke (opsiyonel nightly)

Seed + gerçek `:8000`. Tag `@live`. PR’da koşma. Backend `smoke_ay1_e2e` ile çakıştırma: API’yi pytest/smoke, UI’yi Playwright.

### Yapılmayacaklar

- Tüm Lucide ikonlarına e2e
- Growth/forecast mock ekranlarına %96 satır
- Her `bg-white` için test (grep + madde 2)
- Flutter’ı Playwright ile (ayrı integration_test)

### Konvansiyon

- Kullanıcı tıklaması: `getByRole` / `getByTestId`; class/CSS yok
- `data-testid` yalnızca akış kancası (`booking-*`, `confirm-dialog`, `empty-state`)
- Bir spec = bir kullanıcı cümlesi; `beforeEach` mock’u paylaşır
- Zaman: `datetime.ts` ile aynı sabit ISO’yu mock’ta ver (booking’deki `15 Temmuz 2026`)

---

## 6. İlgili dokümanlar

| Konu | Dosya |
|---|---|
| Geri / history | `docs/web-navigation-history.md` |
| Safe area | `docs/flutter-safe-area.md` |
| Klavye | `docs/flutter-keyboard-avoiding.md` |
| Haptik | `docs/flutter-haptic-feedback.md` |
| İzin | `docs/flutter-permission-primer.md` |
| Renk / dark | `docs/theme-hardcoded-colors.md` |
| İkon / PWA | `docs/brand-icons.md`, `docs/flutter-app-icons.md` |
| AI demo smoke | `ai/docs/DEMO_DAY_CHECKLIST.md` |
| Backend RBAC manuel | `backend/MANUAL_TEST_RBAC.md` |
