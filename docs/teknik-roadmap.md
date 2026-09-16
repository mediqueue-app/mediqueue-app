# MEDIQUEUE — Teknik Roadmap

**Bugün:** 11 Temmuz 2026 | **Hedef:** Aralık 2026  
**İlke:** Hız varsa kapsam şişirme; derinlik + pilot + prova.  
**MVP Done (4 Ay Sonu):** Hasta gerçek hesapla klinik bulur → randevu ister → klinik onaylar/reddeder → iki taraf mesajlaşır → doktor takvimde görür. Hepsi gerçek API + seed/demo ile tekrarlanabilir. Mock ekran yok — varsa açıkça "Yakında".

---

## Bölüm 1 — Genel Teknik Roadmap

### Büyük Resim — Sıkılaştırılmış
*Neden sıkılaştırıldı:* Ay 1 planlanan 4 hafta yerine 1.5–2 haftada bitti — gerçek hız planlanandan ~2 kat yüksek. Takvim buna göre yeniden kalibre edildi. Kapsam artmıyor, tempo artıyor ve kontrol noktaları sıklaşıyor.

| Dönem | Tema | Yeni Özellik? |
|---|---|---|
| **14–25 Tem** (1.5 hafta) | MVP dikey dilim (randevu + patient↔clinic mesaj) | **Evet** — sadece bu |
| **28 Tem–8 Ağu** (2 hafta) | Pilot + sertleştirme + 2. pilot klinik derinliği | **Hayır** |
| **11 Ağu–5 Eyl** (4 hafta) | Doctor mesaj (karar sonrası), S3, staging — kontrollü | Tek tek, sırayla |
| **8 Eyl–3 Eki** (4 hafta) | UX polish, mobil doküman, demo prova | **Yok** |
| **6–31 Eki** (4 hafta) | Feature freeze, prova, failover testi | **Yok** |
| **Kas–Ara** | Buffer + canlı demo penceresi (5+ hafta buffer) | **Yok** |

*Kazanılan zaman:* Eski takvime göre ~7 hafta erken freeze'e giriliyor. Bu süre yeni kapsam için **DEĞİL** — buffer, ikinci pilot klinik, daha derin test ve prova tekrarı için kullanılıyor.

### Hız Kuralı — Salı ve Cuma Uygulanır
Haftada iki kontrol noktası — tek Cuma yetmiyor, Salı günü de kısa bir ara kontrol yapılır:
- **Salı — Ara Kontrol (10 dk):** Hafta başındaki plan hâlâ geçerli mi, bir blocker var mı erken görülsün. Sorun varsa Çarşamba'ya kadar çözülür, Cuma'ya taşınmaz.
- **Cuma — Tam Kontrol (15 dk):** Üç durumdan biri:
  1. *Plandaysan* devam et.
  2. *Plan gerisindeysen* blocker'ı tek cümleyle yaz, Pazartesi ilk iş o olsun.
  3. *Plandan ilerideysen* bir **SONRAKİ FAZDAN** belirli bir görevi öne çek.

> **Kural:** "Öndeyiz, o zaman şunu da ekleyelim" cümlesi yasak.  
> "Öndeyiz, o zaman sıradakini erken başlatalım" cümlesi serbest.  
> *Fark:* Kapsam sabit kalıyor, sadece sıra öne çekiliyor.

---

### Temmuz W1 — Günlük Kırılım (Yoğunluk Örneği)
| Gün | Milestone |
|---|---|
| **Pzt 14 Tem** | Görev dağılımı netleşir, herkes kendi P0'ına başlar (appointment edge, demo klinik, hybrid gösterge, müsaitlik) |
| **Sal 15 Tem** | Ara kontrol (10 dk) — herkes dünden bugüne ne bitirdi, blocker var mı |
| **Çar–Per** | P0 görevlere devam, ilk kod review'lar başlar |
| **Cum 18 Tem** | Tam kontrol (15 dk) — W1 P0'ları bitti mi, W2'ye hazır mıyız |

---

### Temmuz — Haftalık Detay (En Kritik Faz)
| Hafta | Tarih | Milestone |
|---|---|---|
| **W1** | 14–20 Tem | **Furkan:** demo klinik + Randevularım.<br>**Kasım:** appointment edge + mesaj API taslağı.<br>**Sinem:** requests UX + growth placeholder.<br>**Azra:** müsaitlik + smoke negatif senaryo. |
| **W2** | 21–25 Tem | Mesaj API tamam, UI bağlama biter, hybrid gösterge yayılır. MVP-0 freeze adayı: `smoke_ay2_messaging` yeşil — 4 gün hedefleniyor, hafta sonu değil. |

- **Salı Checkpoint (22 Temmuz):** MVP-0'a ne kadar kaldığı netleşir, gerekirse Perşembe'ye sıkıştırılır.
- **Cuma Checkpoint (25 Temmuz):** MVP-0 gerçekten bitti mi. Bittiyse Ağustos'un pilot klinik seed hazırlığına hemen geçilir, boş beklenmez, hafta sonuna kadar sarkmaz.

---

### Ağustos — Haftalık Detay (Sıkıştırılmış — 2 Hafta)
| Hafta | Milestone |
|---|---|
| **W3** | Pilot klinik netleşir + pilot ile ilk 3 senaryo aynı hafta içinde koşulur (randevu, iptal/red, mesaj). Bug listesi çıkar. |
| **W4** | P0 bugfix — auth, CORS, yanlış klinik, çift onay, boş state. Hafta ortasında 2. pilot klinik için ön temas başlar. |

- **Salı + Cuma Checkpoint (Her Hafta):** Plandaysan devam, gerideysen blocker'ı çöz, öndeysen Eylül'ün ilk görevini (doctor mesaj kararı) erken tartışmaya aç.
- **8 Ağustos Exit Kriteri:** Pilot "kullanılabilir" dedi ve 5 kritik bug kapatıldı. 2 haftada bitmesi hedefleniyor, 3. haftaya taşarsa nedeni Pazartesi ilk iş olarak konuşulur.

---

### Eylül–Ekim — Haftalık Checkpoint (Aylık Görev, Haftalık Takip)
| Ay | Odak | Haftalık Takip | Yasak |
|---|---|---|---|
| **Eylül** | Doctor mesaj (karar sonrası), belge yükleme, staging — tek tek | Her Cuma: hangi epik açık, hangisi kapandı | Aynı anda 2 epik açmak |
| **Ekim** | UX polish, mobil geçiş dokümanı, demo prova #1 | Her Cuma: polish listesi daralıyor mu | Yeni dashboard modülü, AI review özeti |

### Flutter native backlog (web-first; native geçişte)

Web’de çentik/Dynamic Island `viewport-fit=cover` + `env(safe-area-inset-*)` ile
karşılanır. Native kabukta CSS inset yoktur.

- `[P2]` **SafeArea her ekranda:** login, tab kökleri, detay, modal/sheet/drawer,
  harita, sohbet composer, FAB/toast. Checklist: `docs/flutter-safe-area.md`.
  AppBar varsa `SafeArea(top: false)`; özel üst bar varsa `top: true`.
  `SafeArea` + `MediaQuery.padding` çift uygulanmaz. Test: Dynamic Island,
  çentik, Android cutout, home indicator.

- `[P2]` **HapticFeedback (light / medium / heavy):** web’de API yok (iOS
  Safari). Native’de yalnızca sonuç anı: randevu oluşturma başarısı,
  form submit, hata/uyarı, yıkıcı onay. Checklist + plan:
  `docs/flutter-haptic-feedback.md`. Buton tap’inde değil; scroll/disabled/
  dialog açılışında yok. WebView diliminde çalma.

- `[P2]` **İzin primer’ı (rationale-first):** web’de native tarayıcı
  diyaloğundan önce `PermissionPrimer` (kamera/belge, konum, bildirim).
  Flutter’da `permission_handler.request()` aynı kural: önce neden,
  sonra OS prompt; splash/login’de istek yok. Checklist:
  `docs/flutter-permission-primer.md`. Android `shouldShowRequestRationale`
  primer’ın yerine geçmez.

- `[P2]` **Uygulama ikonu (launcher / splash):** `flutter create` varsayılan
  ikonu yok. Kaynak `mediqueue-icon.png` (M kiremit). Checklist:
  `docs/flutter-app-icons.md`. Web favicon/PWA envanteri: `docs/brand-icons.md`.

- **Manuel QA + Playwright:** 19 UX maddesi, hasta arama→randevu, klinik onay,
  doktor paneli, cihaz matrisi ve e2e yol haritası:
  `docs/frontend-qa-checklist.md`. AI `pytest --cov` satır kapsamının e2e
  karşılığı journey kapısıdır; Istanbul %96 hedefi Playwright’a taşınmaz.

---

### Kasım–Aralık — Freeze ve Buffer
| Dönem | Odak | Yasak |
|---|---|---|
| **Kasım** | Feature freeze — blocker bug, demo script, prova #2, failover testi | Her türlü yeni özellik |
| **Aralık** | Buffer (5+ hafta) + canlı demo, showstopper hotfix | Her türlü yeni özellik |

**Buffer'ın Kullanımı:** Sıkılaştırılmış takvim sayesinde Kasım ortasından Aralık'a kadar 5+ hafta boş görünüyor. Bu süre showstopper olmayan bug'lara, ekstra prova turlarına, sunum netliğine ayrılır — yeni özelliğe değil.

---

### Checkpoint Özeti
- **Her Salı:** Ara kontrol (10 dk)
- **Her Cuma:** Tam hız kontrolü (15 dk)
- **~25 Temmuz:** MVP-0 (randevu + patient↔clinic mesaj E2E yeşil)
- **~8 Ağustos:** Pilot-1 (gerçek klinik senaryosu + doctor mesaj kararı)
- **~5 Eylül:** Genişleme-1 (en fazla 1 ekstra epik oturmuş)
- **~3 Ekim:** Prova-1 (dört portal demo kaydı)
- **~31 Ekim:** Freeze başlangıcı
- **Kasım ortası–Aralık:** Buffer + Showtime

---

### Kim Neye Kilitli
| Kişi | Tem (1.5h) | Ağu (2h) | Eyl–Eki | Kas–Ara |
|---|---|---|---|---|
| **Furkan** | Patient + mesaj UI + admin küçült | Pilot bugfix | Doküman + polish | Freeze + buffer |
| **Sinem** | Clinic + mesaj UI + placeholder | Pilot bugfix | Clinic polish | Freeze + buffer |
| **Azra** | Müsaitlik + smoke | Bugfix desteği | Doctor mesaj + demo prova | Freeze + prova |
| **Kasım** | Appointments + mesaj API | Bugfix + staging | S3/staging | Freeze |

---

### Boş Zaman Tuzağı — Yapılmayacaklar
Hız Kuralı'ndaki "öndeysen sıradakini öne çek" prensibi bunun istisnası değil. Bu liste hâlâ geçerlidir:
- ❌ Flutter'a erken dalmak
- ❌ Admin'i "tam ürün" yapmak
- ❌ Growth/forecast'i gerçekmiş gibi doldurmak
- ❌ Dört portalda aynı anda mesajlaşma
- ❌ ML / review özeti (KVKK netleşmeden)
- ❌ Freeze döneminde "küçük bir özellik"
- ❌ "Öndeyiz" bahanesiyle bu listedeki herhangi birine başlamak

**İzinli boş zaman kullanımı:** Test, dokümantasyon, prova, performans, erişilebilirlik, sıradaki fazın görevini öne çekmek.

---

## Bölüm 2 — Ay 2 Ekip Roadmap

**Sahiplik:**
- **Furkan:** `web-patient` (ağırlıklı) + `web-admin` (hafif)
- **Sinem:** `web-clinic` (tek dashboard)
- **Azra:** `web-doctor` + AI
- **Kasım:** `backend`

**Ay 2 Tek Teması:** Randevu + mesaj dikey dilimini sertleştir.  
**Asıl başarı kriteri:** `patient`↔`clinic` randevu ve mesajlaşmanın uçtan uca gerçek çalışması.  
**Kapsam Dışı:** S3, Flutter, ML, admin domain API (tam), growth gerçek veri, dört portalda mesajlaşma, AI feedback kalıcılığı.

---

### Sprint 3 — Hafta 1-2

#### Kasım — Backend
- `[P0]` Appointments edge case'leri — çakışma, iptal, no-show
- `[P0]` Mesajlaşma API taslağı (patient↔clinic) — thread + send + list
- `[P1]` Admin domain API — taslak yeterli
- `[P1]` Staging ortamı kurulumu (best effort)

#### Furkan — web-patient + web-admin
- `[P0]` Demo sertleştirme — seed klinik varsayılan olsun
- `[P0]` Patient journey — Randevularım, boş/hata durumu
- `[P0]` Hybrid gösterge component'i — kodla, web-patient'a uygula
- `[P1]` Admin panelini küçült — mock kısımlar "Yakında" etiketli

#### Sinem — web-clinic
- `[P0]` Hybrid gösterge component'ini web-clinic'e uygula
- `[P1]` Clinic requests UX — edge case'ler
- `[P1]` Growth modüllerini placeholder'a çevir

#### Azra — web-doctor + AI
- `[P0]` Doktor portalı — müsaitlik editörünü kalıcı yap
- `[P0]` E2E smoke script'lerine hata senaryoları ekle
- `[P1]` Hybrid gösterge component'ini web-doctor'a uygula
- `[P2]` AI feedback endpoint kalıcılığı — Kasım'la koordinasyon

---

### Sprint 4 — Hafta 3-4
*Kapsam Netliği:* Mesajlaşma sadece `patient`↔`clinic` dikey diliminde. S3 bu sprint'te kapsam dışı.

#### Kasım — Backend
- `[P0]` Mesajlaşma backend'ini tamamla (patient↔clinic)
- `[P0]` Mesajlaşma testleri (`smoke_ay2_messaging`)
- `[P1]` CORS ve auth — tüm portallar için doğrulama
- `[P1]` CI'a yeni endpoint testleri ekle

#### Furkan — web-patient + web-admin
- `[P0]` Mesajlaşma UI'ını backend'e bağla (patient tarafı)
- `[P0]` Ortak demo script — book→confirm→message→doctor sees (patient kısmı)
- `[P1]` Booking E2E test
- `[P2]` Mobil geçiş hazırlık notu — zaman kalırsa
- `[P2]` Admin'de kalan API'leri entegre et

#### Sinem — web-clinic
- `[P0]` Mesajlaşma UI'ını backend'e bağla (clinic tarafı)
- `[P0]` Ortak demo script — clinic kısmı (onay/red)
- `[P2]` Growth: hasta menşei — net endpoint varsa, yoksa P2

#### Azra — web-doctor + AI
- `[P0]` Confirmed randevu görünürlüğü + müsaitlik sağlamlaştır
- `[P0]` Ortak demo script — doctor sees kısmı, script'i birleştir
- `[P1]` Doktor mesajlaşmasını backend'e bağla — bonus, zorunlu değil
- `[P1]` Sprint 4 sonunda kısa demo provası organize et
- `[P2]` Review özetleme (Faz 2 — KVKK netleşmeden aktifleşmez)

---

### Ay 2 Sonu Başarı Kriterleri

| # | Kriter | Sorumlu | Not |
|---|---|---|---|
| **1** | **Patient:** login → seed klinik → randevu → Randevularım | Furkan | `P0` |
| **2** | **Clinic:** talep gör → onay/red → patient'a mesaj | Sinem | `P0` |
| **3** | **Patient↔clinic mesaj E2E** (API smoke + UI demo) | Kasım + Furkan + Sinem | `P0` |
| **4** | **Doctor:** confirmed randevuyu görür + müsaitlik kaydı | Azra | `P0`, mesaj bonus |
| **5** | **Admin/growth:** mock yok veya "Yakında" | Furkan | `P1` |
| **6** | `smoke_ay1_e2e` + `smoke_ay2_messaging` yeşil | Kasım | `P0` |
| **7** | Staging best effort | Kasım | `P1`, fail sebebi olmaz |

**Kaldırılan Sert Kriterler:** Dört portalda mesaj, S3 zorunluluğu, mobil hazırlık zorunluluğu, AI feedback kalıcılığı — Ay 2 kriteri değil, Ay 3-4'e erteleniyor.

> **MEDIQUEUE** — *Sağlık turizmi büyüyor. Altyapı hazır değil. Biz hazırız.*
