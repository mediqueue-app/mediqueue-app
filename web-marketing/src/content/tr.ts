import type { SiteContent } from "./types";
import { trPreviews } from "./previews";

export const tr: SiteContent = {
  seo: {
    title: "MEDIQUEUE — Şeffaf, aracısız sağlık turizmi",
    description:
      "Akredite klinikleri kıyaslayın, doğrudan yazışın, ön ödeme olmadan talep gönderin. Klinikler yalnızca gelen hasta için öder — abonelik yok.",
  },
  nav: {
    links: [
      { href: "/", label: "Ana Sayfa" },
      { href: "/how-it-works", label: "Nasıl Çalışır" },
      { href: "/team", label: "Hakkımızda" },
      { href: "/contact", label: "İletişim" },
    ],
    solutionsLabel: "Çözümler",
    solutions: [
      { href: "/clinics", label: "Klinikler İçin", desc: "Sıfır riskli dönüşüm & hasta yönetimi" },
      { href: "/patients", label: "Hastalar İçin", desc: "Şeffaf klinik kıyaslama & doğrudan hekim" },
      { href: "/doctors", label: "Doktorlar İçin", desc: "Bugünün programı & günlük akış yönetimi" },
    ],
    clinicCta: "Kliniğinizi Katın",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
    localeEn: "EN",
    localeTr: "TR",
    skip: "İçeriğe geç",
  },
  contact: {
    seoTitle: "İletişim — Bize Ulaşın",
    eyebrow: "7/24 Kesintisiz İletişim",
    title: "İletişim Bilgilerinizi Bırakın, Sizinle İletişime Geçelim",
    intro:
      "İster tedavi arayan bir hasta, ister platforma katılmak isteyen bir klinik veya doktor olun — formu doldurun, ekibimiz en geç 15 dakika içinde sizinle iletişime geçsin.",
    patientTab: "Hasta / Tedavi İletişimi",
    clinicTab: "Klinik & Hekim İletişimi",
    name: "Ad Soyad",
    email: "E-posta Adresi",
    phone: "Telefon / WhatsApp Numarası",
    topic: "İlgilendiğiniz Konu / Tedavi",
    message: "Mesajınız veya İstekleriniz",
    submit: "İletişim Talebini Gönder",
    submitting: "Talebiniz İletiliyor...",
    successTitle: "İletişim Talebiniz Alındı!",
    successBody:
      "Bilgileriniz ekibimize ulaştı. En kısa sürede (ortalama 15 dakika) verdiğiniz iletişim kanalı üzerinden sizinle iletişime geçeceğiz.",
    phoneTitle: "Telefon & WhatsApp",
    emailTitle: "E-posta Adreslerimiz",
    addressTitle: "Genel Merkez",
    privacyNote:
      "Bilgileriniz 256-Bit SSL şifreleme ve KVKK/GDPR standartlarında korunur. Asla 3. şahıslarla paylaşılmaz.",
  },
  home: {
    platformEyebrow:
      "Uluslararası sağlık turizminde şeffaf, aracısız pazar yeri",
    audiencePatient: "Hasta",
    audienceClinic: "Klinik",
    patient: {
      headline: "Şeffaflığa",
      headlineAccent: "emanet edin.",
      subcopy:
        "Akredite klinikleri yan yana kıyaslayın, doğrudan yazışın, ön ödeme yapmadan talep gönderin. Karar sizde — süreç görünür.",
      primaryCta: "Klinikleri Keşfedin",
      secondaryCta: "Nasıl Çalışır?",
      previewCaption: "Canlı Demo — Hasta Uygulaması & Klinik Kıyaslama Ekranı",
    },
    clinic: {
      headline: "Gelen hasta",
      headlineAccent: "için ödeyin.",
      subcopy:
        "Reklam bütçesi eritmeyin. Yalnızca panelinize düşen gerçek talep ve fiilen gelen hasta için ücretlendirilirsiniz — abonelik yok.",
      primaryCta: "Kliniğinizi Katın",
      secondaryCta: "Süreci Görün",
      previewCaption: "Canlı Demo — Klinik Yönetim Paneli & Randevu Talepleri Ekranı",
    },
    proof: [
      { kicker: "Yarışma", title: "301 girişim arasında 1." },
      { kicker: "Program", title: "Kapsül ön kuluçka" },
    ],
    match: {
      eyebrow: "Şeffaf Platform Mekaniği",
      title: "Hasta ve Klinik Doğrudan Buluşur",
      body: "Hasta talebi dil, bütçe ve tedavi ihtiyacıyla doğrulanır; doğrudan akredite kliniğin masasına ulaşır. Aracı yok — iletişim şeffaf.",
      patientLabel: "Hasta Talebi",
      clinicLabel: "Akredite Klinik",
      matchBadge: "Doğrudan Eşleşti",
      noBroker: "Aracı yok · Sıfır Komisyon",
      patientTags: ["Almanca İletişim", "€2.500–3.500 Bütçe", "Saç Ekimi (DHI)"],
      clinicTags: ["JCI Akredite", "DHI Uzmanlığı", "Müsait: Tem 2026"],
    },
    doorsEyebrow: "Üç kapı, tek platform",
    doorsTitle: "Her taraf kendi ekranında",
    doors: [
      {
        href: "/clinics",
        eyebrow: "Klinikler",
        title: "Randevu Talepleri masanızda",
        body: "Onaylayın, teklif verin, yazışın — hasta geldiğinde ödersiniz.",
        preview: "clinic",
      },
      {
        href: "/patients",
        eyebrow: "Hastalar",
        title: "Kıyaslayın, sonra talep edin",
        body: "Klinik ve doktorları filtreleyin. Talebi göndermek için ön ödeme yok.",
        preview: "patient",
      },
      {
        href: "/doctors",
        eyebrow: "Doktorlar",
        title: "Bugünün Programı",
        body: "Hastalarım, Takvim, Mesajlar, Profil — klinik günü tek yerde.",
        preview: "doctor",
      },
    ],
    trust: [
      { label: "Doğrudan İletişim", detail: "Aracı yok, gizli komisyon yok" },
      { label: "Akredite Klinikler", detail: "JCI ve uluslararası sertifikalı sağlık kuruluşları" },
      { label: "Şeffaf Fiyatlandırma", detail: "Sürpriz ücret yok, net teklifler" },
      { label: "Hasta Mahremiyeti", detail: "Uçtan uca şifreli ve güvenli iletişim" },
    ],
    trustStripLabel: "Güven ve Şeffaflık",
    globalReach: {
      eyebrow: "Klinik panelinizden bir önizleme",
      title: "Dünyanın Dört Bir Yanından Hastalar",
      subtitle:
        "Kliniğiniz MediQueue'ye katıldığında, hangi ülkelerden hasta talebi aldığınızı panelinizde anlık olarak görürsünüz.",
      panelTitle: "Hastalarınızın Geldiği Ülkeler",
      panelSubtitle:
        "{patients} uluslararası hasta, {countries} farklı ülkeden başvurdu.",
      demoCaption: "Örnek klinik paneli görünümü · demo veri",
      countryColumn: "Ülke",
      patientColumn: "Hasta",
      emptyList: "Ülke kırılımı, ilk uluslararası talepleriniz geldiğinde burada listelenecek.",
    },
    finalPatientTitle: "Tedavi yolculuğunuza siz karar verin",
    finalPatientBody:
      "Klinikleri kıyaslayın, doğrudan yazışın, ön ödeme olmadan talep gönderin.",
    finalPatientCta: "Klinikleri Keşfedin",
    finalClinicTitle: "Uluslararası hastaları sıfır riskle karşılayın",
    finalClinicBody:
      "Yalnızca gelen ve tedavisi onaylanan hasta için ödeyin. Panel aboneliği yok.",
    finalClinicCta: "Kliniğinizi Ekleyin",
  },
  clinics: {
    seoTitle: "Klinikler için",
    heroTag:
      "Reklamlara Servet Ödemeyi Bırakın. Sadece Dönüşen Hasta İçin Ödeyin.",
    heroSub:
      "Tıklamalara veya umutlara değil, gerçek sonuçlara yatırım yapın. MEDIQUEUE ile uluslararası sağlık turizminde sıfır risk, yüksek dönüşüm. Ön ödeme yok, panel aboneliği yok.",
    primaryCta: "Kliniğinizi Ücretsiz Ekleyin",
    secondaryCta: "Sistem Nasıl Çalışır?",
    requestLabel: "Yeni Randevu Talebi",
    requestBudget: "Bütçe",
    requestTreatment: "Tedavi",
    requestLanguage: "Dil",
    requestReview: "Talebi incele",
    metricCaption: "Canlı Demo — Klinik Yönetim Paneli & Randevu Talepleri Ekranı",
    panelLabel: "Klinik paneli",
    compareEyebrow: "Geleneksel Model vs. MediQueue",
    compareTitle: "Reklam Riski Yok. Yalnızca Gelen Hasta İçin Ödeyin.",
    compareBeforeLabel: "Geleneksel Yöntemler",
    compareAfterLabel: "Sıfır Riskli Model",
    compareCriteriaLabel: "Kriter",
    compareRows: [
      {
        title: "Pazarlama Bütçesi",
        before:
          "Sonucu garanti edilmeyen yüksek reklam harcamaları ve tıklama bütçesi riski",
        after:
          "Sıfır peşin maliyet — yalnızca kliniğinize fiilen gelen ve tedavisi başlayan hastadan ücretlendirme",
      },
      {
        title: "Hasta Niyeti & Kalitesi",
        before: "Niyeti belirsiz, bütçesi doğrulanmamış filtrelenmemiş telefon ve form talepleri",
        after:
          "Bütçesi, dili ve tedavi ihtiyacı önceden doğrulanmış yüksek dönüşümlü hasta adayları",
      },
      {
        title: "Cayma & Risk Yönetimi",
        before:
          "Danışmanlık ve teklif sürecine harcanan zaman; hasta caydığında bütçe boşa gider",
        after:
          "Ödeme yalnızca hasta kliniğe ulaştığında alınır — cayma ve iptal riski MediQueue'dedir",
        highlight: true,
      },
      {
        title: "Operasyonel Yük",
        before:
          "Talep takibi, çeviri ve seyahat koordinasyonu dağınık kanallarda zaman kaybettirir",
        after:
          "Tüm süreç tek panelde: talep, çift dilli mesajlaşma, randevu onayı ve otomatik takip",
      },
    ],
    roadmapTitle: "Kliniğiniz İçin Yol Haritası",
    roadmapIntro:
      "MediQueue'ye katıldıktan sonra süreç adım adım nasıl işler — kliniğin yaptığı minimum, platformun üstlendiği maksimum.",
    roadmapClinicLabel: "Kliniğin Rolü",
    roadmapMqLabel: "MediQueue Güvencesi",
    roadmapSteps: [
      {
        title: "Ücretsiz Katılım & Profil",
        clinic:
          "Akreditasyon belgelerinizi yükleyin, tıbbi uzmanlık alanlarınızı ve fiyat aralıklarınızı tanımlayın.",
        mediQueue:
          "Çok dilli profil optimizasyonu, kurum doğrulaması ve pazarlama sunumu tamamen ücretsiz hazırlanır.",
        previewHint:
          "Akreditasyon belgeleri dijital panelden yüklenir; onay durumu anlık takip edilir.",
      },
      {
        title: "Filtrelenmiş Hasta Talepleri",
        clinic:
          "Bütçesi, dili ve tedavi ihtiyacı doğrulanmış hazır hasta başvurularını panelinizde inceleyin.",
        mediQueue:
          "Otomatik talep doğrulama ve spam filtreleme ile yalnızca gerçek hastalar kliniğinize ulaştırılır.",
        previewHint:
          "Nitelikli uluslararası hasta talepleri doğrudan klinik panelinize iletilir.",
      },
      {
        title: "Birebir Görüşme & Teklif",
        clinic:
          "Platform üzerinden hastayla doğrudan görüşün, kişiselleştirilmiş tedavi planınızı sunun.",
        mediQueue:
          "Çift yönlü anlık çeviri ve güvenli iletişim altyapısı sayesinde aracı olmadan süreci yönetin.",
        previewHint:
          "Klinik hekimleri ve hastalar çok dilli mesajlaşma ile doğrudan iletişim kurar.",
      },
      {
        title: "Tedavi & Hakediş",
        clinic:
          "Hastayı karşılayın ve tedaviyi gerçekleştirin; hasta fiilen gelene kadar sıfır maliyet.",
        mediQueue:
          "Hizmet bedeli yalnızca gerçekleşen tedavi üzerinden kesilir; cayma ve kayıp riski MediQueue güvencesindedir.",
        previewHint:
          "Tedavi fiilen başladığında ödeme alınır; öncesinde peşin maliyet riski yoktur.",
      },
    ],
    performanceTitle: "Bu ayki performans",
    metrics: [
      {
        label: "Aktif Hastalar",
        value: "34",
        hint: "Tedavi sürecindeki uluslararası hastalar",
      },
      {
        label: "Bekleyen Teklifler",
        value: "8",
        hint: "Yanıt bekleyen yapılandırılmış teklifler",
      },
      {
        label: "Aylık Beklenen Gelir",
        value: "₺186k",
        hint: "Onaylı taleplerden projeksiyon",
      },
    ],
    analytics: {
      eyebrow: "Hasta Analitiği",
      title: "Hastalarınızın Nereden Geldiğini Bilin. Kararlarınızı Veriyle Alın.",
      body:
        "MediQueue paneliniz, hangi ülkelerden ne kadar talep aldığınızı anlık olarak haritalar — ayrı bir raporlama aracına veya entegrasyona ihtiyaç duymadan. Almanya'dan gelen talep hacminiz artıyorsa o pazara kapasite ayırabilir; düşüş gösteren bir ülkede ise pazarlama bütçenizi yeniden dağıtabilirsiniz. Bu veri tesadüfi bir özet değil; kliniğinizin uluslararası büyüme ve operasyon kararlarını doğrudan besleyen, panelinize düşen her taleple güncellenen bir kaynak.",
      panelTitle: "Hastalarınızın Geldiği Ülkeler",
      panelSubtitle:
        "{patients} uluslararası hasta, {countries} farklı ülkeden başvurdu.",
      demoCaption: "Örnek klinik paneli görünümü · demo veri",
      countryColumn: "Ülke",
      patientColumn: "Hasta",
      emptyList:
        "Ülke kırılımı, ilk uluslararası talepleriniz geldiğinde burada listelenecek.",
      highlights: [
        {
          title: "Ülke bazlı dağılım",
          body: "Hangi pazardan ne kadar talep geldiğini küre haritası ve sıralı listeden anlık izleyin.",
        },
        {
          title: "Trend takibi",
          body: "Ülke bazında dönemsel değişimi görün; kapasite ve pazarlama kararlarınızı önceden planlayın.",
        },
        {
          title: "Otomatik veri toplama",
          body: "Panelinize düşen talep kayıtlarından üretilir — ek araç veya manuel raporlama gerekmez.",
        },
      ],
    },
    finalTitle: "Sıfır Risk. Sınırsız Potansiyel.",
    finalBody:
      "Uluslararası hastalar kliniğinizi arıyor. Onları karşılamaya hazır mısınız?",
    finalCta: "Hemen Başlayın",
  },
  patients: {
    seoTitle: "Hastalar için",
    heroTag: "Sağlığınızı Tesadüflere Değil. Şeffaflığa Emanet Edin.",
    heroSub:
      "Aracı kurumların gizli komisyonları, belirsiz fiyatlar ve şeffaf olmayan süreçler geride kaldı. MEDIQUEUE; dünyanın dört bir yanındaki akredite klinikleri, gerçek referansları ve doğrudan iletişim imkanını tek bir platformda önünüze seriyor. Kendi tedavi yolculuğunuzun mimarı olun.",
    primaryCta: "Klinikleri Keşfedin",
    secondaryCta: "Neden MEDIQUEUE?",
    caption: "Canlı Demo — Hasta Uygulaması & Klinik Kıyaslama Ekranı",
    whyEyebrow: "Geleneksel vs. MediQueue",
    whyTitle: "Aracı Acentaları Unutun. Şeffaf Süreçle Tedavi Olun.",
    whyBeforeLabel: "Geleneksel Acenta Yöntemi",
    whyAfterLabel: "MediQueue Şeffaf Pazar Yeri",
    whyCriteriaLabel: "Kriter",
    whyRows: [
      {
        title: "Şeffaf Fiyatlandırma",
        before:
          "Gizli komisyonlar, yüksek acenta marjları ve son dakikada çıkan sürpriz maliyetler",
        after:
          "Tüm akredite kliniklerin net tedavi paketlerini ve fiyatlarını yan yana şeffafça görün",
      },
      {
        title: "Akredite Klinik Seçimi",
        before:
          "Acentanın yönlendirdiği tek taraflı 1-2 klinik seçeneği; özgür filtreleme yok",
        after:
          "JCI sertifikalı yüzlerce kliniği uzmanlık, dil ve bütçenize göre özgürce kıyaslayın",
      },
      {
        title: "Aracısız Doğrudan İletişim",
        before:
          "Hekimle görüşme imkanı yok; tüm sorular acenta temsilcisinin filtresinden geçer",
        after:
          "Otomatik çeviri desteğiyle doğrudan klinik hekimiyle birebir mesajlaşın ve plan yapın",
      },
      {
        title: "Sıfır Ön Ödeme Riski",
        before:
          "Danışmanlık ve randevu için peşin ücret talebi ve iptal durumunda para kaybı",
        after:
          "Talep oluşturmak %100 ücretsizdir; ödeme yalnızca kliniğe ulaşıp tedavi başladığında yapılır",
      },
    ],
    journeyTitle: "Tedavi Yolculuğunuz 4 Adımda Nasıl İşler?",
    journeyIntro:
      "Aramaya başladığınız andan tedavinizi tamamlayıp eve dönene kadar geçen tüm süreç — şeffaf, güvenli ve kontrolünüzde.",
    journeySteps: [
      {
        title: "Klinik Keşfi & Kıyaslama",
        body: "Tedavi türü, şehir ve bütçenize göre arama yapın. JCI akredite kliniklerin başarı oranlarını ve paket fiyatlarını inceleyin.",
      },
      {
        title: "Ön Ödemesiz Ücretsiz Talep",
        body: "Beğendiğiniz kliniklere tek tıkla talep gönderin. Hiçbir ön ödeme veya bağlayıcılık riski olmadan teklif toplayın.",
      },
      {
        title: "Birebir Hekim Görüşmesi",
        body: "Otomatik çevirili mesajlaşma sistemiyle doğrudan klinik hekiminizle yazışın; tıbbi sorularınızı ilk elden yanıtlayın.",
      },
      {
        title: "Tedavi & İyileşme Takibi",
        body: "Seçtiğiniz kliniğe seyahat edin. Tedaviniz süresince ve eve döndükten sonra dijital asistanınız takipte kalır.",
      },
    ],
    discoverPrivacyNote:
      "Klinik kimliği talep göndermeden önce gizlidir.",
    trustTitle: "Sadece En İyiler. Sadece Onaylılar.",
    trustBody:
      "Platformumuzdaki her klinik, uluslararası sağlık otoriteleri tarafından denetlenmiş, JCI akreditasyonuna sahip veya eşdeğer ulusal sağlık turizmi sertifikalarını kanıtlamış kurumlardır. Sağlığınız bizim için bir filtreleme kriterinden çok daha fazlasıdır.",
    trustJci: "JCI Akreditasyonu",
    trustNational: "Ulusal sağlık turizmi sertifikası",
    finalTitle: "Kendi yolculuğunuzun mimarı olun.",
    finalBody:
      "Akredite klinikleri keşfedin, karşılaştırın ve doğrudan iletişime geçin — şeffaflık ve kontrol sizde kalsın.",
    finalCta: "Klinikleri Keşfedin",
  },
  doctors: {
    seoTitle: "Doktorlar için",
    eyebrow: "Doktor portalı",
    title: "Bugünün Programı — dağılmadan.",
    intro:
      "Özet, Hastalarım, Takvim, Mesajlar, Profil — tek panelde. Dağınık kanallar yerine gününüzü bir ekrandan yönetin.",
    primaryCta: "Doktor Profilimi Oluştur",
    secondaryCta: "Panele Göz Atın",
    caption:
      "Canlı Demo — Hekim Yönetim Paneli & Günlük Akış Ekranı",
    compareEyebrow: "Karşılaştırma",
    compareTitle: "Eski Düzeni Unutun. Gününüzü Tek Ekrandan Yönetin.",
    compareBeforeLabel: "Geleneksel Düzen",
    compareAfterLabel: "MediQueue Modeli",
    compareCriteriaLabel: "Kriter",
    compareRows: [
      {
        title: "Randevu Takibi",
        before:
          "Kağıt takvim, telefon notları, farklı klinik sistemleri arasında dağınık kayıtlar",
        after: "Tüm randevular tek bir günlük akışta, saat saat net görünüm",
      },
      {
        title: "Hasta İletişimi",
        before:
          "WhatsApp, e-posta, telefon karışımı — hangi mesajın nerede olduğu belirsiz",
        after:
          'Tüm hasta mesajları tek bir "Mesajlar" ekranında, geçmişiyle birlikte',
      },
      {
        title: "Hasta Geçmişi",
        before:
          "Her klinik/sistemde ayrı, doktorun elinde bütünleşik bir görünüm yok",
        after: '"Hastalarım" ekranında tedavi takibi ve geçmiş tek yerde',
      },
      {
        title: "Profil / Görünürlük",
        before:
          "Doktorun uzmanlığı hastaya ancak klinik üzerinden, dolaylı yoldan ulaşır",
        after:
          "Doktor profili doğrudan hasta tarafından kıyaslanabilir, görünür",
        highlight: true,
      },
      {
        title: "Günlük Genel Bakış",
        before: "Günün nasıl geçeceğini sabah ayrı ayrı kontrol etmek gerekir",
        after: '"Özet" ekranı günü ve hasta durumunu tek bakışta özetler',
      },
    ],
    featuresTitle: "Doktor Paneli Ekranları",
    featuresIntro:
      "Her ekran tek bir işe odaklanır — gününüzü tek bir panelden dağılmadan yönetin.",
    features: [
      {
        id: "overview",
        title: "Özet",
        body: "Günün randevuları, bekleyen mesajlar ve hasta durumu tek bakışta. Sabah ayrı ayrı kontrol etmek yerine gününüz burada başlar.",
      },
      {
        id: "patients",
        title: "Hastalarım",
        body: "Tüm hastalarınız, tedavi aşamaları ve geçmiş notlar tek listede. Ahmed, Sophie ve James gibi uluslararası hastaların durumunu anında görün.",
      },
      {
        id: "calendar",
        title: "Takvim",
        body: "Müsaitlik saatlerinizi işaretleyin, randevu çakışmalarını önleyin. Haftalık ve günlük görünüm arasında geçiş yapın.",
      },
      {
        id: "messages",
        title: "Mesajlar",
        body: "WhatsApp ve e-posta karmaşası yok — tüm hasta yazışmaları tek ekranda, geçmişiyle birlikte. Gerekirse çift dilli iletişim.",
      },
      {
        id: "profile",
        title: "Profil",
        body: "Hastanın kıyaslama ekranında gördüğü tam profil budur: uzmanlık, deneyim, çalıştığınız klinikler ve hasta yorumları.",
      },
    ],
    roadmapTitle: "Hekim Yol Haritası: Kayıttan İlk Randevuya",
    roadmapIntro:
      "Profil oluşturmaktan ilk hasta kabulünüze kadar geçen 4 adımlı süreç — hekimin rolü ve MediQueue desteği.",
    roadmapDoctorLabel: "Doktor",
    roadmapMqLabel: "MediQueue",
    roadmapSteps: [
      {
        title: "Profil & Uzmanlık",
        doctor:
          "Uzmanlık alanlarınızı, deneyim yılınızı ve çalıştığınız klinik(ler)i profilinize eklersiniz.",
        mediQueue:
          "Çok dilli profil sunumu, görsel optimize etme ve hastaya ilk görünürlük otomatik hazırlanır.",
      },
      {
        title: "Belge Doğrulama",
        doctor: "Hekim lisansınızı ve uzmanlık sertifikalarınızı dijital panele yüklersiniz.",
        mediQueue:
          "Hızlı evrak denetimi, JCI Akredite Hekim rozeti onayı ve güvenli profil statüsü tanımlaması.",
      },
      {
        title: "Müsaitlik & Takvim",
        doctor: "Haftalık müsaitlik saatlerinizi ve randevu aralıklarınızı panelde belirlersiniz.",
        mediQueue:
          "Otomatik çakışma engelleme, zaman dilimi (timezone) çevirisi ve randevu hatırlatmaları.",
      },
      {
        title: "Hasta Kabulü & İletişim",
        doctor: "Panele düşen doğrulanmış hasta taleplerini inceler, otomatik çevirili chat ile görüşürsünüz.",
        mediQueue:
          "Birebir çift dilli mesajlaşma altyapısı, talep takibi ve randevu onay sistemi.",
      },
    ],
    trustMessage:
      "Panelimizdeki her doktor profili doğrulanmış lisans ve uzmanlık bilgisiyle yayındadır.",
    finalTitle: "Hastalar sizi arıyor.",
    finalBody: "Onlara ulaşmaya hazır mısınız?",
    finalCta: "Doktor Profilimi Oluştur",
  },
  how: {
    seoTitle: "Nasıl Çalışır",
    eyebrow: "Şeffaf Platform Süreci",
    title: "İlk Aramadan Tedaviye: Şeffaf Süreç Nasıl İşler?",
    intro:
      "Hastalar için ücretsiz kıyaslama ve doğrudan talep; klinikler için sıfır reklam riski. MEDIQUEUE ile sağlık seyahatinde tüm süreç şeffaf, güvenli ve kontrolünüz altında.",
    steps: [
      {
        title: "Keşfedin & Kıyaslayın",
        body: "Tedavi türü, şehir ve bütçenize göre akredite klinikleri filtreleyin; paket fiyatlarını ve JCI belgelerini şeffafça görün.",
      },
      {
        title: "Ön Ödemesiz Talep Gönderin",
        body: "Beğendiğiniz kliniklere tek tıkla talep iletin. Hiçbir bağlayıcılık veya ön ödeme riski olmadan teklif toplayın.",
      },
      {
        title: "Doğrudan İletişim & Tedavi",
        body: "Otomatik çevirili mesajlaşma ile hekiminizle birebir görüşün. Tedavinizi kararlaştırıp ödemeyi kliniğe vardığınızda yapın.",
      },
    ],
    techTitle: "Şeffaf Eşleşme & Akıllı Filtreleme Mekanizması",
    techBody:
      "Karmaşık aracı komisyonları ve kapalı kapılar arkasında dönen pazarlıklar yok. MEDIQUEUE akıllı filtreleme altyapısı, hastanın bütçe, dil ve tedavi ihtiyacını doğrudan en uygun akredite kliniğin masasına ulaştırır.",
    pipeline: [
      { title: "Kriter & İhtiyaç Filtresi", body: "Dil tercihi, tedavi türü ve bütçe aralığı doğrulanan hasta talepleri filtrelenir." },
      { title: "Akredite Klinik Eşleşmesi", body: "JCI ve Ulusal Sağlık Turizmi lisanslı klinikler şeffafça sıralanır ve sunulur." },
      { title: "Doğrudan Hekim İletişimi", body: "Aracı olmadan doğrudan klinik hekimiyle mesajlaşın, net fiyat teklifleri toplayın." },
    ],
    faqEyebrow: "Sıkça Sorulan Sorular",
    faqTitle: "Merak Edilen Her Şey",
    faqSubtitle: "MediQueue platformu, güvenlik, akreditasyon ve süreçler hakkında en çok sorulan sorular.",
    faqItems: [
      {
        q: "MediQueue hastalar için ücretsiz mi?",
        a: "Evet, MediQueue hastalar için tamamen ücretsizdir. Klinikleri özgürce kıyaslayabilir, şeffaf teklifleri inceleyebilir ve hiçbir aracı ücreti ödemeden doğrudan iletişim kurabilirsiniz.",
      },
      {
        q: "Platformdaki klinikler nasıl denetleniyor?",
        a: "Yalnızca JCI (Joint Commission International) akreditasyonuna sahip veya T.C. Sağlık Bakanlığı onaylı Uluslararası Sağlık Turizmi Yetki Belgesi bulunan akredite sağlık kuruluşları kabul edilir.",
      },
      {
        q: "Klinikler için ödeme ve komisyon modeli nasıl çalışıyor?",
        a: "MediQueue'da gizli komisyon veya hasta başı aracı payı yoktur. Klinikler yalnızca onaylanan randevu talepleri ve şeffaf platform modelimiz üzerinden güvenle işlem yapar.",
      },
      {
        q: "Hasta verilerimin ve tıbbi belgelerimin gizliliği nasıl korunuyor?",
        a: "Kişisel verileriniz ve tıbbi görselleriniz GDPR ve KVKK standartlarında uçtan uca şifrelenir. Siz seçtiğiniz kliniğe talep gönderene kadar kimlik bilgileriniz gizli tutulur.",
      },
      {
        q: "Uçuş ve konaklama organizasyonu kimin sorumluluğunda?",
        a: "MediQueue doğrudan klinik-hasta iletişimini sağlar. Konaklama, havalimanı transferi ve seyahat lojistiği isteğe bağlı olarak seçtiğiniz kliniğin paket kapsamına göre koordine edilir.",
      },
    ],
  },
  team: {
    seoTitle: "Hakkımızda — MediQueue",
    heroEyebrow: "Hakkımızda & Hikayemiz",
    heroLeadBold: "Sağlık Turizminde Şeffaflık.",
    heroLeadLight: "Teknolojiyle Aracısız Gelecek.",
    heroIntro:
      "Aracı acenta komisyonlarının, gizli fiyatların ve belirsiz tedavi süreçlerinin sona erdiği yeni bir standart kuruyoruz. MediQueue; uluslararası hastalar ile akredite klinik ve hekimleri doğrudan, güvenli ve yapay zeka destekli altyapısıyla buluşturan bağımsız bir pazar yeridir.",
    stats: [
      { value: "301/1", label: "Teknopark Birincisi", hint: "Düzce Teknopark Maraton Şampiyonu" },
      { value: "AI Destekli", label: "Akıllı Eşleşme", hint: "Özgün yapay zeka & algoritma mimarisi" },
      { value: "%100", label: "Şeffaf Pazar Yeri", hint: "Sıfır aracı komisyonu & doğrudan hekim mesajlaşması" },
      { value: "JCI", label: "Lisanslı Güvence", hint: "Yalnızca denetimden geçmiş akredite klinikler" },
    ],
    missionLabel: "Misyonumuz",
    missionBody:
      "Sağlık turizminde aracı ve gizli komisyon modelini tamamen tarihe gömmek. Dünyanın dört bir yanındaki hastaların akredite kliniklerle kendi dillerinde, doğrudan, şeffaf ve güvenli bir şekilde buluşmasını sağlamak.",
    visionLabel: "Vizyonumuz",
    visionBody:
      "Klinikleri sonucu garanti edilmeyen reklam harcamalarından kurtarmak; yalnızca tedaviye hazır hastalarla buluşturan risksiz bir büyüme altyapısı sunarak sağlık turizminde küresel şeffaflık standardı olmak.",
    valuesEyebrow: "Değerlerimiz ve Prensiplerimiz",
    valuesTitle: "MediQueue Standartlarını Şekillendiren 4 Temel İlke",
    values: [
      {
        title: "Kayıtsız Şeffaflık",
        body: "Gizli acenta marjları yok. Tüm tedavi paketleri, klinik imkanları ve hekim lisansları her kullanıcıya %100 açık sunulur.",
        icon: "ShieldCheck",
      },
      {
        title: "Doğrudan Hekim Bağlantısı",
        body: "Temsilci filtreleri olmadan, otomatik çeviri desteğiyle doğrudan tedavi edecek hekimle mesajlaşın ve plan yapın.",
        icon: "Stethoscope",
      },
      {
        title: "Yapay Zeka Destekli Eşleşme",
        body: "Hastanın bütçe, dil ve özel medikal ihtiyacına en uygun akredite kliniği saniyeler içinde tarafsızca eşleştiren algoritmalar.",
        icon: "Sparkles",
      },
      {
        title: "Sıfır Ön Ödeme Riski",
        body: "Hasta için talep oluşturmak tamamen ücretsizdir. Klinikler için peşin ajans veya reklam riski olmadan sürdürülebilir büyüme.",
        icon: "CheckCircle2",
      },
    ],
    note: "MediQueue, uluslararası sağlık teknolojileri ve yapay zeka inovasyonu alanında sürekli gelişen dinamik bir ekosistemdir.",
    achievementsEyebrow: "Ödüller ve Başarılar",
    achievementsTitle: "Girişimcilik ve İnovasyon Ekosistemindeki Yerimiz",
    achievementChips: [
      {
        label: "301 Girişim Arasında 1.lik Ödülü",
        detail: "Düzce Teknopark Girişimcilik Maratonu Şampiyonluğu · 2026",
      },
      {
        label: "Özgün Yapay Zeka Eşleşme Mimarisi",
        detail: "Özgün yapay zeka algoritması ve aracısız pazar yeri iş modeli",
      },
      {
        label: "Kapsül Ön Kuluçka Büyüme Programı",
        detail: "Erken aşama stratejik ölçeklenme ve mentörlük desteği",
      },
    ],
    foundersEyebrow: "Kurucu Ekip",
    foundersTitle: "Sağlık Teknolojisinde Değişimin Mimarları",
    members: [
      {
        name: "Azra İrem Derin",
        roleTitle: "CTO / Yapay Zeka, Veri & Web Yazılım",
        bio: "Yapay zeka destekli eşleştirme algoritmalarını, platform mimarisini ve uçtan uca veri altyapısını geliştiriyor.",
        image: "/team/azra-irem-derin.jpg",
        accent: "#0d9488",
        linkedin: "https://www.linkedin.com/in/azraderin/",
      },
      {
        name: "Furkan Közkaya",
        roleTitle: "CPO / Ürün & İş Geliştirme",
        bio: "Ürün yol haritasını şekillendiriyor; klinik görüşmelerini yürütüyor ve iş geliştirme fırsatlarını yönetiyor.",
        image: "/team/furkan-kozkaya.jpg",
        accent: "#3a6ad6",
        linkedin: "https://www.linkedin.com/in/furkankozkaya/",
      },
      {
        name: "Sinem Özdemir",
        roleTitle: "CFO / Finansal Strateji & Operasyon",
        bio: "Şirketin bütçe, nakit akışı ve mali raporlama süreçlerini yönetiyor; finansal disiplini sağlıyor.",
        image: "/team/sinem-ozdemir.jpg",
        accent: "#2f57b3",
        linkedin: "https://www.linkedin.com/in/sinem-ozdemir-/",
      },
    ],
    socialTitle: "Bizi Sosyal Medyada Takip Edin",
    socialLinks: [
      {
        platform: "linkedin",
        label: "LinkedIn",
        hint: "Kurucu ekip ve resmi şirket gelişmeleri",
        href: "https://www.linkedin.com/company/medyqueue",
      },
      {
        platform: "instagram",
        label: "Instagram",
        hint: "Klinik hikayeleri ve hasta rehberleri",
        href: "https://www.instagram.com/mediqueue/",
      },
    ],
    finalCtaTitle: "Geleceğin Sağlık Ekosistemine Adım Atın",
    finalCtaBody: "İster uluslararası tedavi arayan bir hasta, ister şeffaf büyümek isteyen bir klinik olun; MediQueue güvencesiyle hemen başlayın.",
  },
  footer: {
    tagline:
      "Hastaların özgürce kıyasladığı, akredite kliniklerin doğrudan hasta ile buluştuğu şeffaf pazar yeri platformu.",
    groups: [
      {
        title: "Kurumsal",
        links: [
          { href: "/team", label: "Hakkımızda" },
          { href: "/how-it-works", label: "Nasıl Çalışır" },
          { href: "/contact", label: "İletişim" },
        ],
      },
      {
        title: "Hastalar İçin",
        links: [
          { href: "/patients", label: "Akredite Klinikler" },
          { href: "/patients#ozellikler", label: "Klinik Kıyaslama" },
          { href: "/patients#yolculuk", label: "Tedavi Rehberi" },
        ],
      },
      {
        title: "Klinikler & Doktorlar",
        links: [
          { href: "/clinics", label: "Klinik Portalı" },
          { href: "/clinics#ozellikler", label: "Hasta Talepleri" },
          { href: "/doctors", label: "Doktor Paneli" },
        ],
      },
      {
        title: "Yasal & Destek",
        links: [
          { href: "/how-it-works#faq", label: "SSS" },
          { href: "/privacy", label: "Gizlilik Politikası" },
          { href: "/terms", label: "KVKK & GDPR" },
        ],
      },
    ],
    copyright: "MediQueue. Tüm hakları saklıdır.",
    privacyNote: "Hasta gizliliği ve veri güvenliği ilk ilkemizdir.",
    medicalDisclaimer: "MediQueue bir pazar yeri platformudur. Sunulan içerikler bilgilendirme amaçlıdır ve tıbbi teşhis/tedavi tavsiyesi yerine geçmez.",
  },
  legal: {
    updatedLabel: "Son Güncelleme",
    privacy: {
      title: "Gizlilik Politikası",
      intro: "MediQueue olarak hasta verilerinin gizliliğini ve tıbbi bilgilerin güvenliğini en üst seviyede tutmayı temel ilke edindik.",
      updated: "12 Eylül 2026",
      sections: [
        {
          heading: "1. Veri Toplama ve Kullanımı",
          body: "MediQueue üzerinden ilettiğiniz tedavi talepleri ve medikal formlar, yalnızca onay verdiğiniz akredite klinikler ve doktorlar ile şifreli kanallar üzerinden paylaşılır. Kişisel iletişim bilgileriniz üçüncü taraflara pazarlama amacıyla satılmaz.",
        },
        {
          heading: "2. KVKK ve GDPR Uyumluluğu",
          body: "6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Genel Veri Koruma Tüzüğü (GDPR) gereğince verileriniz yüksek güvenlikli sunucularda saklanır. İstediğiniz zaman verilerinizin silinmesini talep etme hakkına sahipsiniz.",
        },
        {
          heading: "3. Çerezler ve Analitik",
          body: "Platform kullanıcı deneyimini iyileştirmek için anonim performans çerezleri kullanmaktadır. Tarayıcı ayarlarınızdan çerez tercihlerinizi dilediğiniz zaman değiştirebilirsiniz.",
        },
      ],
    },
    terms: {
      title: "Kullanım Şartları & Şeffaflık Sözleşmesi",
      intro: "MediQueue pazar yeri platformunu kullanan hastalar, klinikler ve hekimler için geçerli kullanım koşulları.",
      updated: "12 Eylül 2026",
      sections: [
        {
          heading: "1. Hizmet Kapsamı ve Pazar Yeri Modeli",
          body: "MediQueue, uluslararası hastalar ile Sağlık Bakanlığı ve JCI akreditasyonuna sahip sağlık kuruluşlarını aracısız buluşturan şeffaf bir pazar yeridir. Platform komisyoncu veya acenta gibi fiyatların üstüne ek ücret eklemez.",
        },
        {
          heading: "2. Kullanıcı Yükümlülükleri",
          body: "Kullanıcılar platform üzerinden ilettikleri bilgilerin doğruluğunu kabul eder. Klinikler ve doktorlar platformda sundukları paket fiyatları ve uzmanlık belgelerinin güncelliğinden sorumludur.",
        },
        {
          heading: "3. Ön Ödemesiz Talep Sistemi",
          body: "Hastalar platform üzerinden ön ödeme yapmadan ve kredi kartı tanımlamadan bağlayıcı olmayan tedavi teklifleri alabilirler. Hizmet bedeli klinik tarafından yalnızca başarıyla tamamlanan randevularda karşılanır.",
        },
      ],
    },
    disclaimer: {
      title: "Tıbbi Sorumluluk Reddi (Medical Disclaimer)",
      intro: "MediQueue platformunda yer alan içerikler ve bilgilendirmeler hakkında yasal uyarı.",
      updated: "12 Eylül 2026",
      sections: [
        {
          heading: "1. Doğrudan Tıbbi Hizmet Verilmeyişi",
          body: "MediQueue bir hastane, klinik veya teşhis merkezi değildir. Platform teşhis koymaz veya tedavi uygulamaz. Tüm tıbbi kararlar ve uygulamalar yetkili hekimler ve akredite klinikler sorumluluğundadır.",
        },
        {
          heading: "2. Bilgilendirme Amaçlı İçerik",
          body: "Web sitesinde ve platform ekranlarında yer alan tedavi rehberleri, fiyat aralıkları ve klinik tanıtımları bilgilendirme amaçlıdır; doktor muayenesinin yerini tutmaz.",
        },
        {
          heading: "3. Acil Durum Uyarısı",
          body: "Tıbbi bir acil durum halinde lütfen derhal bulunduğunuz ülkenin acil yardım hattını (Türkiye için 112) arayınız veya en yakın sağlık kuruluşuna başvurunuz.",
        },
      ],
    },
  },
  previews: trPreviews,
};
