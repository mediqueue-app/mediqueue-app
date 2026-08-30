# MEDIQUEUE — AI Search Visibility Baseline v1

> AŞAMA 1.5. Bu doküman AŞAMA 0 (kod audit'i) ve AŞAMA 1'den (`master-query-database.md`, `top-100-priority-queries.md`) sonra üretilmiştir. **Bu turda kod değiştirilmedi.** Amaç: MEDIQUEUE'nun bugünkü (2026-08-21) AI/generative search görünürlüğünü objektif olarak ölçmek ve gelecekteki ilerlemeyi karşılaştıracağımız bir referans noktası (baseline) oluşturmak.

## 0. En Kritik Bulgu — Önce Bunu Oku

**MEDIQUEUE'nun bugün hiçbir canlı public domain'i yok** (`mediqueue.tech` aranıp doğrulandı — kayıtlı/canlı bir siteye çıkmıyor; proje sadece GitHub'da kod olarak var, arama motorlarında bulunamadı). Bu, aşağıdaki tüm "0 mention" sonuçlarının **beklenen ve doğal** bir sonucu olduğu anlamına gelir — bu bir "başarısızlık" değil, "henüz başlamamış" durumudur. Baseline'ın amacı bunu netleştirmek.

**İkinci ve daha ciddi bulgu — marka çakışması:** "MEDIQUEUE" / "MediQueue" ismi bugün **birden fazla alakasız sağlık-teknolojisi ürünü tarafından zaten kullanılıyor**:
- Mediqueue (Hindistan) — hastane sırası/randevu takip mobil uygulaması (Google Play'de canlı)
- MediQueue Solutions (İskandinavya) — hastane hasta akışı görselleştirme sistemi
- `mediqueue.net` — acil servis bekleme süresi/hastane verimliliği ürünü
- `medi-queue.vercel.app`, `github.com/sagorteasc/MediQueue`, EducCorp/MediQueue — öğrenci/hackathon projeleri
- Akademik bir preprint: "MediQueue: An ML-Driven Hospital [Queue System]"

Bu ürünlerin **hiçbiri** sağlık turizmi/klinik pazaryeri değil — hepsi "hastane sırası yönetimi" temalı. Ama isim benzerliği yüzünden, MEDIQUEUE canlıya çıktığında AI sistemlerinin (ve arama motorlarının) markayı bu alakasız ürünlerle karıştırma riski **somut ve yüksek**. Bu, AŞAMA 0 §12'deki "canonical brand information" ihtiyacını doğrudan doğruluyor ve muhtemelen mevcut best-practice'in ötesinde ekstra bir disambiguation stratejisi gerektiriyor (bkz. §5).

## 1. Metodoloji ve Sınırlar

**Kullanılan araçlar:** `WebSearch` (genel web araması — organik sonuçlar) ve `WebFetch` (belirli URL'leri doğrudan çekme).

**Neyi ölçebildim:** Genel web arama görünürlüğü — hangi domainlerin, hangi sayfa tiplerinin, hangi içeriklerin bu sorgular için organik olarak öne çıktığı. Bu, RAG-tabanlı AI sistemlerinin (Perplexity, ChatGPT'nin web-browsing modu, Google AI Overview) büyük ölçüde **aynı web indeksinden** beslendiği için makul bir proxy'dir — bir sayfa organik aramada hiç görünmüyorsa, generative bir sistemin onu kaynak göstermesi de son derece düşük ihtimaldir.

**Neyi ölçemedim (dürüstçe belirtmek gerekiyor):**
- ChatGPT, Gemini, Claude veya Perplexity'nin canlı konuşma arayüzüne bu araçlarla **doğrudan erişimim yok** — bu ürünlerin kendi API/UI'larını sorgulayamıyorum. Aşağıdaki bulgular bu ürünlerin "ne söylediği" değil, **bu ürünlerin muhtemelen hangi kaynaklardan beslendiğidir**.
- Google'ın canlı "AI Overview" kutusunu da doğrudan göremiyorum — Google'ın arama sayfası bot erişimini engelliyor.
- Bing'i `WebFetch` ile doğrudan çekmeyi denedim; sonuç **kullanılamaz çıktı** (sorguyla alakasız sözlük tanımları döndü — muhtemelen JS-render edilmeyen bir consent/redirect sayfası yakalandı). Bu nedenle "Bing" sütununu ayrı bir kaynak olarak **raporlayamıyorum** — bu bir metodoloji sınırı olarak burada açıkça not ediliyor, veri uydurmadım.
- Bu sınırlar nedeniyle **AŞAMA 13'teki AI Query Test Lab hâlâ gerekli**: gerçek ChatGPT/Gemini/Claude/Perplexity konuşma çıktılarını görmek için bir insanın bu sorguları o arayüzlere elle girmesi gerekiyor. Bu baseline, o testin **öncesinde** durumu netleştiren bir "zemin ölçümü"dür, onun yerine geçmez.

**Sorgu seçimi:** Kullanıcının verdiği 10 sabit kategori + `top-100-priority-queries.md`'den Trust/Decision/Provider stage'lerinden 5 sorgu + `master-query-database.md`'nin Stage 5/6 genel sorgularından 2 + 5 marka/entity doğrulama sorgusu = **22 sorgu** test edildi. Bu, 630 sorgunun tamamını değil, temsili bir örneklemi test eder — amaç kapsamlı değil, yönü doğru gösteren bir ilk ölçümdür.

## 2. Sorgu Bazlı Bulgular

### Sabit Kategori Sorguları (kullanıcı tarafından verilen 10)

#### 1. "hair transplant Turkey"
- **Search intent:** Stage 2/3 — tedavi + destinasyon araştırması
- **MEDIQUEUE mentioned?** No
- **MEDIQUEUE URL mentioned?** No
- **Rakipler:** Cosmedica (Dr. Levent Acar), Dr. Serkan Aygin Clinic, Vera Clinic, Smile Hair Clinic
- **Tekrarlayan siteler:** smilehairclinic.com, cosmedica.com, drserkanaygin.com, veraclinic.net
- **Content type:** Bireysel klinik marka siteleri (hepsi kendi fiyat/teknik/cerrah sayfalarını sunuyor)
- **Domainler:** Tümü `.com` bireysel klinik markaları, hiçbir marketplace/aggregator yok
- **Kanıt türü:** Fiyat aralığı ($2,000-$5,000), cerrah deneyimi ("20,000+ procedures", "16+ years"), 3. taraf basın atıfları (Reuters, LA Times, USA Today — Vera Clinic'in kendi sitesinde alıntılanmış)

#### 2. "best hair transplant clinics Turkey"
- **Search intent:** Stage 4 — Provider Discovery
- **MEDIQUEUE mentioned?** No / **URL?** No
- **Rakipler:** Sule Hair Transplant, Dr. Serkan Aygin, Hermest Hair Clinic, EsteFavor
- **Tekrarlayan siteler:** hermestclinic.com, bookimed.com (us-uk.bookimed.com)
- **Content type:** "Top 10" liste makaleleri (bazıları **native advertising/PR syndication** — `barchart.com` ve `africa.time.com/partner-content` gibi düşük-editoryal-bağımsızlığa sahip "partner content" formatında, üç ayrı `barchart.com` URL'si aynı sorguda çıktı) + bir marketplace listing sayfası (Bookimed)
- **Domainler:** barchart.com (3x, PR syndication), bookimed.com
- **Kanıt türü:** Ödüller ("Forbes'a göre en iyi", "Europe's Best Hair Transplant Center 2018"), işlem sayısı, "500+ klinik, %60-80 daha ucuz" gibi pazar-geneli istatistikler

#### 3. "hair transplant Istanbul"
- **Search intent:** Stage 3/4
- **MEDIQUEUE mentioned?** No / **URL?** No
- **Rakipler:** Cosmedica, Clinicana, Vera Clinic, Smile Hair Clinic, Asli Tarcan Clinic
- **Tekrarlayan siteler:** cosmedica.com, veraclinic.net, smilehairclinic.com (üçü de 3+ farklı sorguda tekrar çıktı)
- **Content type:** Klinik marka siteleri + bir "partner content" haber makalesi (barchart.com)
- **Domainler:** Yine ağırlıklı bireysel klinik `.com`ları
- **Kanıt türü:** Süreç/teknik açıklaması (DHI, FUE), fiyat aralığı, süre bilgisi (3-5 gün)

#### 4. "dental tourism Turkey"
- **Search intent:** Stage 3
- **MEDIQUEUE mentioned?** No / **URL?** No
- **Rakipler:** Clinics on Call, DentSpa Istanbul, Dental Centre Turkey, SohoDent
- **Tekrarlayan siteler:** medicaltourismco.com, dentalcentreturkey.com
- **Content type:** Editöryal "guide" makaleleri (çoğu klinik zincirlerinin kendi blogları), bir seyahat-planlama sitesi (turkeytravelplanner.com)
- **Domainler:** dentalcentreturkey.com, dentspa.com, sohodent.com
- **Kanıt türü:** Pazar büyüklüğü istatistikleri ("2 milyon sağlık turisti, $10 milyar gelir"), resmi kurum adı ("Turkish Dental Association / TDB" — düzenleyici otorite referansı), fiyat karşılaştırması (€ bazında)

#### 5. "best dental clinics Turkey"
- **Search intent:** Stage 4
- **MEDIQUEUE mentioned?** No / **URL?** No
- **Rakipler:** WestDent Clinic, Adaport Dental Clinic, Dentapoint International, DentaFly, Suave Dental Clinic, Attelia Dental
- **Tekrarlayan siteler:** bookimed.com (şehir bazlı filtrelenmiş: `city=izmir`), whatclinic.com, dentaldepartures.com
- **Content type:** Marketplace/directory listing sayfaları (Bookimed, WhatClinic, Dental Departures — üçü de bu sorguda **aynı anda** çıktı, bu kategori için aggregator hakimiyeti diğer kategorilere göre daha güçlü)
- **Domainler:** bookimed.com, whatclinic.com, dentaldepartures.com — **bu üçü MEDIQUEUE'nun doğrudan marketplace rakipleri**
- **Kanıt türü:** İşlem sayısı ("15,000+ surgeries, %99 success rate"), sertifikasyon (ISO), profesyonel birlik akreditasyonu (EDAD, Turkish Medical Association)

#### 6. "medical tourism Turkey"
- **Search intent:** Stage 3 (genel)
- **MEDIQUEUE mentioned?** No / **URL?** No
- **Rakipler:** Globalmedik, Better by MTA
- **Tekrarlayan siteler:** health-tourism.com, better.medicaltourism.com
- **Content type:** Karma — bir gazetecilik parçası (Forbes), bir akademik vaka çalışması (Kellogg/Northwestern), marketplace siteleri, bir YouTube videosu
- **Domainler:** health-tourism.com, forbes.com, kellogg.northwestern.edu
- **Kanıt türü:** JCI akreditasyon sayısı ("43 JCI-accredited facilities — en fazla akreditasyona sahip ülke"), hasta hacmi istatistikleri (1.8M+ hasta/yıl), demografi verisi

#### 7. "how to choose a medical tourism clinic"
- **Search intent:** Stage 8 — Decision (rehber/how-to formatı)
- **MEDIQUEUE mentioned?** No / **URL?** No
- **Rakipler:** (Doğrudan klinik değil, rehber yayıncıları) MedicalTourismCo, TravellerMD, HealthTourismClinics, FindHospital, ExploreMedicalTourism
- **Tekrarlayan siteler:** medicaltourismco.com
- **Content type:** **Saf "how-to guide" makaleleri** — MEDIQUEUE'nun `page-architecture.md`'deki `/guides/*` sayfa tipiyle birebir örtüşen bir format
- **Domainler:** medicaltourismco.com, travellermd.com, healthtourismclinics.com
- **Kanıt türü:** Checklist formatı (akreditasyon, fiyat şeffaflığı, review, lojistik, aftercare — MEDIQUEUE'nun kendi "How MEDIQUEUE Verifies Clinics" sayfası için doğrudan içerik iskeleti niteliğinde)

#### 8. "trustworthy medical tourism platform"
- **Search intent:** Stage 6 — Trust (MEDIQUEUE için en kritik kategori)
- **MEDIQUEUE mentioned?** No / **URL?** No
- **Rakipler:** **PlacidWay, Bookimed, CureMeAbroad** — bunlar MEDIQUEUE'nun en doğrudan pazaryeri rakipleri
- **Tekrarlayan siteler:** placidway.com, bookimed.com
- **Content type:** Kendi platformunu öven "top platform" makaleleri (bazıları platformların kendi PR'ı olabilir — örn. `ocnjdaily.com`'daki "Beyond Borders" makalesi bir yerel haber sitesinde native-content gibi duruyor)
- **Domainler:** placidway.com, bookimed.com, medicaltourism.com
- **Kanıt türü:** **Somut, doğrulanabilir sayı** — "Bookimed: 900+ Trustpilot reviews, 4.6 ortalama" — bu, MEDIQUEUE'nun da hedeflemesi gereken türde bir ölçülebilir güven sinyali

#### 9. "compare hair transplant clinics"
- **Search intent:** Stage 5 — Comparison
- **MEDIQUEUE mentioned?** No / **URL?** No
- **Not:** Bu sorgu beklenmedik şekilde **ABD merkezli** klinikleri öne çıkardı (Bosley, Bernstein Medical) — Türkiye bağlamı sorguda yoksa arama motoru varsayılan olarak kullanıcının (test ortamının) muhtemel konumuna göre sonuç veriyor. **Bu, MEDIQUEUE için önemli bir gözlem:** "compare hair transplant clinics" gibi ülke belirtilmeyen sorgularda Türkiye'nin otomatik olarak öne çıkmadığını gösteriyor — `/compare/*` sayfalarının başlık ve içeriğinde "Turkey" kelimesini query'siz varyantlarda bile güçlü tutmak gerekecek.
- **Content type:** Karşılaştırma kriterleri makalesi (cerrah deneyimi, teknik, before/after foto kalitesi)
- **Kanıt türü:** Before/after foto analizi, video testimonial güvenilirliği, fiyat aralığı

#### 10. "medical tourism booking platform"
- **Search intent:** Stage 9 — Transactional
- **MEDIQUEUE mentioned?** No / **URL?** No
- **Rakipler:** Bookimed, Better by MTA, MedicalTourism.com
- **Tekrarlayan siteler:** bookimed.com (3. kez bu oturumda), better.medicaltourism.com
- **Content type:** CRS (Computer Reservation System) B2B ürün sayfaları + tüketici-yönlü marketplace sayfaları karışık
- **Domainler:** trawex.com, flightslogic.com (bunlar B2B yazılım satıcıları, MEDIQUEUE'nun tüketici tarafı rakibi değil — ayrı bir segment)
- **Kanıt türü:** Ülke kapsamı (Türkiye, Güney Kore, Tayland, Çek Cumhuriyeti, Polonya), uçtan-uca hizmet listesi

### AŞAMA 1 Öncelikli Sorgularından Test Edilenler

#### 11. "How can I verify a hair transplant clinic in Istanbul is legitimate" (top-100 #6 civarı, Stage 6)
- **MEDIQUEUE mentioned?** No / **URL?** No
- **Rakipler:** EsteFavor (doğrudan "How Americans Can Verify a Turkish Hair Transplant Clinic" başlıklı bir sayfayla bu sorguyu **hedef almış**), Wimpole (bir UK klinik, "red flags" içerikli)
- **Tekrarlayan siteler:** trustpilot.com (istanbul-care.com ve rehairistanbul.com review sayfaları organik sonuçlarda çıktı)
- **Content type:** "Nasıl doğrularsınız" rehberi + 3. parti review platformu sayfaları
- **Kanıt türü:** Ministry of Health kayıt numarası doğrulama talimatı, cerrah sertifikasyonu sorgulama önerisi, "red flag" listesi (agresif satış taktikleri, ulaşılamayan klinikler)
- **Not:** Bu, MEDIQUEUE'nun `/trust/clinic-verification` sayfası için **doğrudan rakip içerik** — EsteFavor bu tam intent'i zaten hedeflemiş durumda.

#### 12. "Help me choose a hair transplant clinic in Istanbul" (top-100 #14, Stage 8)
- **MEDIQUEUE mentioned?** No / **URL?** No
- **Rakipler:** Vera Clinic, Dr. Serkan Aygin, Cosmedica, Dr. Özlem Biçer, Estepera — hepsi kendi "neden bizi seçmelisiniz" sayfalarıyla bu sorguya cevap veriyor
- **Tekrarlayan siteler:** Aynı klinik kümesi (#1, #3 ile büyük örtüşme) — bu, hair-transplant vertical'inde **çok az sayıda domain'in tüm Stage 3/4/8 sorgularını domine ettiğini** gösteriyor
- **Content type:** Klinik marka siteleri
- **Kanıt türü:** Hasta sayısı, ödül/basın atfı, "lifetime guarantee" gibi garanti iddiaları

#### 13. "Best dental treatment clinics in Izmir" (top-100 #28, Stage 4)
- **MEDIQUEUE mentioned?** No / **URL?** No
- **Rakipler:** WestDent, Dentapoint International, DentaGlobal, Denta Perla Diamond
- **Tekrarlayan siteler:** placidway.com, bookimed.com, whatclinic.com, dentaldepartures.com — **dördü birden** aynı sorguda; şehir-spesifik dental sorgularda aggregator hakimiyeti hair-transplant'a göre belirgin şekilde daha güçlü
- **Content type:** Şehir-filtrelenmiş marketplace listing sayfaları
- **Kanıt türü:** İşlem sayısı, sertifikasyon, "digital dentistry" gibi teknoloji iddiaları

#### 14. "Türkiye'de en iyi saç ekimi klinikleri" (top-100 #27, Türkçe)
- **MEDIQUEUE mentioned?** No / **URL?** No
- **Rakipler:** Dr. Terziler Exclusive Clinic (AACI akreditasyonu vurgusu), Smile Hair Clinic, Hermest Hair Clinic, Asmed
- **Tekrarlayan siteler:** t24.com.tr (ana akım Türk haber sitesi, "advertorial" etiketli — yani sponsorlu içerik), medikalakademi.com.tr
- **Content type:** **Türkçe pazarda "advertorial" (sponsorlu içerik) baskın** — t24.com.tr'deki sonuç açıkça `/advertorial/` URL yolunda; bu, Türkçe sorgularda native-advertising'in İngilizce sorgulara göre daha görünür olduğunu gösteriyor
- **Kanıt türü:** Akreditasyon adı (AACI), teknik detay (Sequential FUE), "kalıcılık oranı" gibi sonuç istatistikleri

#### 15. "how do I know if a medical tourism agency is trustworthy" (master-db Stage 6 genel)
- **MEDIQUEUE mentioned?** No / **URL?** No
- **Rakipler:** CureMeAbroad (bu sorgu için 3 farklı makalesiyle baskın), MedTravel.ai, MedicusUnion
- **Tekrarlayan siteler:** curemeabroad.com (aynı domain'den 3 farklı blog makalesi tek sorguda çıktı — **güçlü bir topical authority sinyali**, tek bir kapsamlı sayfa yerine cluster stratejisi kullanıyorlar)
- **Content type:** Checklist/rehber makaleleri
- **Kanıt türü:** JCI/ISQua akreditasyon kontrolü, bağımsız review varlığı (Google/Trustpilot), yazılı sözleşme talebi, doktor kimlik doğrulama ("medical council registers")

#### 16. "FUE vs DHI hair transplant" (master-db Stage 5 special)
- **MEDIQUEUE mentioned?** No / **URL?** No
- **Rakipler:** Dr. Serkan Aygin (kendi blog'unda bu karşılaştırmayı doğrudan hedeflemiş), SolveClinics, Civas & Akpınar
- **Tekrarlayan siteler:** drserkanaygin.com
- **Content type:** Teknik karşılaştırma makalesi + **bilimsel/akademik kaynak** (NCBI/PMC iki farklı makale) — bu sorgu tipi tek başına akademik otorite gerektiriyor
- **Kanıt türü:** Klinik prosedür açıklaması, NCBI hakemli makale referansı — bu, MEDIQUEUE'nun `/compare/fue-vs-dhi` sayfasının **hakemli/bilimsel kaynak referans vermesi gerektiğini** gösteriyor, salt pazarlama diliyle yetinilemez

#### 17. "is it safe to get surgery in Turkey" (master-db Stage 6 genel)
- **MEDIQUEUE mentioned?** No / **URL?** No
- **Rakipler:** Acibadem Hospitals Group (**büyük, gerçek, çok-uluslu bir hastane zinciri** — MEDIQUEUE'nun karşılaştığı en "kurumsal ağırlıklı" rakip), Avicenna International Hospital, SkyCare (UK)
- **Tekrarlayan siteler:** Yok (bu sorguda domain tekrarı zayıf, kaynaklar dağınık)
- **Content type:** Hem olumlu hem **eleştirel** gazetecilik içeriği (SkyCare: "25 UK vatandaşı 2019'dan beri Türkiye'de ameliyat sonrası öldü" istatistiği) — bu sorgu tipinde nötr olmayan, riskleri de içeren dengeli içerik öne çıkıyor
- **Kanıt türü:** Lisans/ruhsat doğrulama tavsiyesi, olumsuz vaka istatistikleri (şeffaflık sinyali), "ülke itibarına değil, sağlayıcıya güven" mesajı — **bu, MEDIQUEUE'nun trust content'inin riskleri de dürüstçe ele alması gerektiğini gösteriyor**, sadece pozitif pazarlama yeterli değil

### Marka / Entity Doğrulama Sorguları

#### 18. "MEDIQUEUE"
- **MEDIQUEUE (bu proje) mentioned?** No
- **Bulunanlar:** Mediqueue (Hindistan, Google Play'de canlı hastane sırası uygulaması), MediQueue akademik preprint (ML-driven hastane sırası sistemi), Devpost hackathon projesi, `mediqueue.hara-xy.com` (klinik sıra yönetimi), `mediqueue.in`, `mediqueue.net`
- **Kritik:** Bunların **hiçbiri sağlık turizmi değil** — hepsi "hastane/klinik sıra yönetimi" temalı, isim çakışması tesadüfi değil (muhtemelen "medi-" + "queue" kelime kombinasyonunun doğal bir sonucu, iki farklı ürün kategorisi bu ismi bağımsız olarak bulmuş)

#### 19. "MEDIQUEUE medical tourism"
- **Mentioned?** No — arama motoru bu sorguyu genel "medical tourism nedir" tanımlarına yönlendirdi (Wikipedia, CDC, EBSCO), MEDIQUEUE'yu hiç tanımadı

#### 20. ""MEDIQUEUE" Turkey hair transplant clinic marketplace"
- **Mentioned?** No — arama motoru bunun yerine gerçek Türkiye klinik sitelerini döndürdü ve açıkça "MEDIQUEUE'ya dair özel bir sonuç bulunamadı" notunu üretti

#### 21. "mediqueue-app github" / "github.com mediqueue-app"
- **Proje deposu (`github.com/mediqueue-app/mediqueue-app`) bulundu mu?** **Hayır** — hiçbir sorguda görünmedi. Bunun yerine alakasız `sagorteasc/MediQueue` ve `EducCorp/MediQueue` depoları çıktı. Bu, deponun ya private olduğu, ya da henüz hiç indexlenmediği (yeni/az yıldızlı) anlamına gelir.

#### 22. ""MEDIQUEUE" reviews trustpilot"
- **Mentioned?** No — Trustpilot'ta MEDIQUEUE adına bir profil bulunamadı (beklenen, domain henüz yok)

## 3. Sentez — Sorgu Kategorileri Arası Örüntüler

- **Hair-transplant vertical'i çok yoğun ve marka-tekrarlayan:** Cosmedica, Vera Clinic, Dr. Serkan Aygin, Smile Hair Clinic — bu 4 domain neredeyse her hair-transplant sorgusunda tekrar tekrar çıktı. Bu vertical'de "yeni bir isim"in görünürlük kazanması dental'e göre daha zor olacak.
- **Dental ve "trustworthy platform" sorgularında aggregator'lar (Bookimed, PlacidWay, WhatClinic, Dental Departures) çok daha güçlü** — bu MEDIQUEUE'nun doğrudan iş modeli rakipleri, hair-transplant'taki bireysel klinik markalarından farklı bir rekabet katmanı.
- **Türkçe sorgularda sponsorlu/advertorial içerik (t24.com.tr) organik sonuçlarla yan yana çıkıyor** — Türkçe pazarda PR/advertorial stratejisinin İngilizce pazara göre daha etkili görünüyor.
- **"Neden Türkiye"** çerçevesi olmayan jenerik sorgularda (`"compare hair transplant clinics"`) Türkiye hiç öne çıkmıyor — bağlamsız sorgularda ülke sinyalinin güçlü tutulması gerekiyor.
- **Akademik/hakemli kaynaklar sadece teknik/klinik karşılaştırma sorgularında (FUE vs DHI) devreye giriyor** — ticari sorgularda hiç görünmüyor.
- **Trust sorgularında somut, doğrulanabilir sayılar kazanıyor** (Trustpilot yıldızı, JCI akreditasyon sayısı, Ministry of Health kayıt no) — soyut "güvenilir platform" iddiaları değil.

## 4. "MEDIQUEUE Henüz Domain'e Bağlı Değil" — Baseline Notu

Bu baseline'ın sıfır-mention sonucu bir ölçüm hatası değildir; MEDIQUEUE'nun **henüz yayında bir web varlığı olmamasının** doğrudan ve beklenen sonucudur (bkz. AŞAMA 0 audit: `web-patient`'ta `public/` klasörü yok, robots/sitemap yok, hiç deploy edilmiş bir prod URL referansı repo içinde bulunamadı). Bu doküman, **MEDIQUEUE canlıya çıktıktan sonra** yapılacak `baseline-v2` karşılaştırması için "sıfır noktası" görevi görür.

## 5. Baseline'ın İşaret Ettiği Ek Stratejik Konu: Marka Disambiguation

§0'daki marka çakışması nedeniyle, sadece AŞAMA 0'daki "canonical brand information" tavsiyesi yeterli olmayabilir. Öneri (henüz uygulanmadı, sadece not): tüm structured data, meta description ve dış PR içeriğinde MEDIQUEUE'yu **her zaman** "MEDIQUEUE — Turkey medical tourism / healthcare marketplace" gibi bir nitelemeyle birlikte anmak; sadece "MEDIQUEUE" tek başına marka adıyla yetinmemek. Bu, hem arama motorlarının hem AI sistemlerinin doğru entity'yi ayırt etmesine yardımcı olur.
