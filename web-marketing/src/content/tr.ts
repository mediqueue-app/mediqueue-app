import type { SiteContent } from "./types";

export const tr: SiteContent = {
  seo: {
    title: "MEDIQUEUE — Gelen hasta için ödeyin",
    description:
      "MEDIQUEUE, uluslararası hastaları Türkiye'deki kliniklerle buluşturur. Klinikler yalnızca gerçek bir talep geldiğinde öder — abonelik yok.",
  },
  nav: {
    links: [
      { href: "/", label: "Ana Sayfa" },
      { href: "/clinics", label: "Klinikler için" },
      { href: "/patients", label: "Hastalar için" },
      { href: "/doctors", label: "Doktorlar için" },
      { href: "/team", label: "Hakkımızda" },
    ],
    clinicCta: "Klinik ön kayıt",
    patientCta: "Hasta bekleme listesi",
    localeLabel: "Dil",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
    localeEn: "EN",
    localeTr: "TR",
    skip: "İçeriğe geç",
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
        "Akredite klinikleri yan yana kıyaslayın, doğrudan yazışın. Şeffaf £100 Sabit Güvence Kaporası ile randevunuzu garantiye alın — gizli acente komisyonu yok, Stripe Koruması altında.",
      primaryCta: "Klinikleri Keşfedin",
      secondaryCta: "Hakkımızda",
      previewCaption: "Hasta uygulaması · klinik keşfi ve kıyaslama · demo veri",
    },
    clinic: {
      headline: "Gelen hasta",
      headlineAccent: "için ödeyin.",
      subcopy:
        "Reklam bütçesi eritmeyin. Yalnızca panelinize düşen gerçek talep ve fiilen gelen hasta için ücretlendirilirsiniz — abonelik yok.",
      primaryCta: "Kliniğim için",
      secondaryCta: "Süreci görün",
      previewCaption: "Klinik paneli · Randevu Talepleri · demo veri",
    },
    proof: [
      { kicker: "Yarışma", title: "301 girişim arasında 1." },
      { kicker: "Program", title: "Kapsül ön kuluçka" },
    ],
    match: {
      eyebrow: "Platform mekaniği",
      title: "Eşleşme anı",
      body: "Hasta talebi dil, bütçe ve tedavi ihtiyacıyla filtrelenir; uygun klinik profiline doğrudan akar. Aracı yok — eşleşme şeffaf.",
      patientLabel: "Hasta talebi",
      clinicLabel: "Klinik profili",
      matchBadge: "Eşleşti",
      noBroker: "Aracı yok · doğrudan eşleşme",
      patientTags: ["Almanca", "€2.500–3.500", "Saç Ekimi (DHI)"],
      clinicTags: ["JCI akredite", "DHI uzmanlığı", "Müsait: Tem 2026"],
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
        body: "Klinik ve doktorları filtreleyin. Randevu, şeffaf £100 Sabit Güvence Kaporası ve Stripe Koruması ile güvence altına alınır.",
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
      { label: "JCI akreditasyonu", detail: "Yalnızca doğrulanmış klinikler" },
      { label: "301 girişim · 1.", detail: "Kapsül ön kuluçka programı" },
      { label: "Hasta gizliliği", detail: "Kimlik koruma ilk ilke" },
      { label: "Sıfır aracı", detail: "Doğrudan klinik–hasta iletişimi" },
    ],
    trustStripLabel: "Güven",
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
      "Şeffaf £100 Sabit Güvence Kaporası ile randevunuzu garantiye alın — gizli acente komisyonu yok.",
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
      "Tıklamalara veya umutlara değil, gerçek sonuçlara yatırım yapın. MEDIQUEUE ile uluslararası sağlık turizminde sıfır risk, yüksek dönüşüm. Panel aboneliği yok — yalnızca gelen ve tedavisi onaylanan hasta için ödersiniz.",
    primaryCta: "Kliniğinizi Ücretsiz Ekleyin",
    secondaryCta: "Sistem Nasıl Çalışır?",
    requestLabel: "Yeni Randevu Talebi",
    requestBudget: "Bütçe",
    requestTreatment: "Tedavi",
    requestLanguage: "Dil",
    requestReview: "Talebi incele",
    metricCaption: "Klinik paneli görünümü · örnek veriler",
    panelLabel: "Klinik paneli",
    compareEyebrow: "Neden",
    compareTitle: "Eski Yöntemleri Unutun. Karlılığınızı Geri Kazanın.",
    compareBeforeLabel: "Geleneksel Yöntem",
    compareAfterLabel: "ile",
    compareCriteriaLabel: "Kriter",
    compareRows: [
      {
        title: "Pazarlama Maliyeti",
        before:
          "Yüksek reklam bütçesi, sonucu garanti edilmeyen tıklamalar",
        after:
          "Panel aboneliği yok — yalnızca gelen ve tedavisi onaylanan hastadan ücretlendirme",
      },
      {
        title: "Hasta Kalitesi",
        before: "Niyeti belirsiz, filtrelenmemiş talepler",
        after:
          "Bütçesi, dili ve tedavi ihtiyacı önceden netleşmiş hastalar",
      },
      {
        title: "Cayma / Kayıp Yatırım",
        before:
          "Danışmanlık, teklif hazırlama ve iletişim için harcanan emek ve bütçe; hasta son anda vazgeçtiğinde tamamen boşa gider",
        after:
          "Ödeme yalnızca hasta fiilen geldiğinde alınır — onay öncesi maliyet riski yok, cayma kliniğin bütçesini etkilemez",
        highlight: true,
      },
      {
        title: "Operasyonel Yük",
        before:
          "Talep takibi, çeviri ve koordinasyon dağınık kanallarda (e-posta, WhatsApp, telefon)",
        after:
          "Tüm süreç tek panelde: talep, teklif, mesajlaşma, onay",
      },
      {
        title: "Uluslararası Erişim",
        before: "Sınırlı, genelde tek pazara bağımlı hasta akışı",
        after:
          "Dünya genelinden akredite arayışında olan hasta havuzuna erişim",
      },
    ],
    roadmapTitle: "Kliniğiniz İçin Yol Haritası",
    roadmapIntro:
      "MediQueue'ye katıldıktan sonra süreç adım adım nasıl işler — kliniğin yaptığı minimum, platformun üstlendiği maksimum.",
    roadmapClinicLabel: "Klinik",
    roadmapMqLabel: "üstlenir",
    roadmapSteps: [
      {
        title: "Başvuru & Denetim",
        clinic:
          "Akreditasyon belgelerinizi (JCI veya eşdeğer) platforma yüklersiniz ve kısa bir onay sürecinden geçersiniz.",
        mediQueue:
          "Güven inşası, pazarlama materyali hazırlığı ve uluslararası standartlara uygunluk kontrolünü MediQueue üstlenir.",
        previewHint:
          "Akreditasyon belgeleri dijital panelden yüklenir; onay durumu anlık takip edilir.",
      },
      {
        title: "Profilin Yayında",
        clinic:
          "Uzmanlık alanlarınızı, fiyat aralıklarınızı ve müsaitlik durumunuzu tanımlarsınız.",
        mediQueue:
          "Görsel/metin optimizasyonu, çok dilli sunum, SEO ve pazarlama tamamen MediQueue'de — klinik tek satır reklam yazmaz.",
        previewHint:
          "Profil, fiyat aralığı ve müsaitlik — çok dilli sunum otomatik hazırlanır.",
      },
      {
        title: "Nitelikli Talep Gelir",
        clinic:
          "Bütçesi, dili ve tedavi ihtiyacı önceden filtrelenmiş bir hasta talebini panelde görürsünüz.",
        mediQueue:
          "Lead filtreleme, dil/bütçe eşleştirmesi ve spam ayıklama otomatik — klinik yalnızca gerçek adayları görür.",
      },
      {
        title: "Doğrudan İletişim & Teklif",
        clinic:
          "Platform üzerinden hastayla doğrudan (gerekirse çift dilli/otomatik çevirili) görüşür, teklifinizi sunarsınız.",
        mediQueue:
          "Çeviri altyapısı, mesajlaşma güvenliği ve süreç takibi — klinik yalnızca tıbbi uzmanlığına odaklanır.",
      },
      {
        title: "Hasta Onayı & Seyahat Planı",
        clinic:
          "Tedavi tarihini netleştirir, klinik içi hazırlığınızı yaparsınız.",
        mediQueue:
          "Uçuş/konaklama koordinasyonu ve seyahat lojistiği kliniğin sorumluluğunda değildir — hasta hazır şekilde gelir.",
        previewHint:
          "Tedavi tarihi netleşir; seyahat lojistiği hasta tarafında koordine edilir.",
      },
      {
        title: "Hasta Geldiğinde Ödeme",
        clinic:
          "Tedaviyi gerçekleştirirsiniz; MediQueue komisyonu yalnızca bu aşamada, gerçekleşen tedavi üzerinden kesilir.",
        mediQueue:
          "Sahte veya kayıp talep riski MediQueue'dedir — klinik yalnızca gerçekleşen tedavi üzerinden çalışır.",
        previewHint:
          "Tedavi gerçekleştiğinde komisyon kesilir — öncesinde sıfır maliyet riski.",
      },
      {
        title: "Tedavi Sonrası Takip",
        clinic: "Gerekli tıbbi kontrolleri planlarsınız.",
        mediQueue:
          "İyileşme takibi, hatırlatmalar ve hasta memnuniyeti yönetimi dijital asistan üzerinden yürütülür — klinik operasyonel takip yükünden kurtulur.",
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
    heroTag: "Sağlığınızı Tesadüflere Değil, Şeffaflığa Emanet Edin.",
    heroSub:
      "Aracı kurumların gizli komisyonları, belirsiz fiyatlar ve şeffaf olmayan süreçler geride kaldı. MEDIQUEUE; dünyanın dört bir yanındaki akredite klinikleri, gerçek referansları ve doğrudan iletişim imkanını tek bir platformda önünüze seriyor. Kendi tedavi yolculuğunuzun mimarı olun.",
    primaryCta: "Klinikleri Keşfedin",
    secondaryCta: "Neden MEDIQUEUE?",
    whyEyebrow: "Neden",
    whyTitle: "Eski yöntemden farkımız",
    whyBeforeLabel: "Eski Yöntem",
    whyAfterLabel: "ile",
    whyCriteriaLabel: "Özellik / Kriter",
    whyRows: [
      {
        title: "Karanlık acenta modeli bitiyor",
        before:
          "Gizli komisyonlar, belirsiz fiyatlar ve aracının yönlendirdiği tek taraflı seçenekler.",
        after:
          "Şeffaf, denetlenebilir bir pazar yeri. Tüm onaylı klinikleri gizli maliyetler olmadan yan yana görün.",
      },
      {
        title: "Sınırları aşan eşleştirme",
        before:
          "Size sunulan bir veya iki klinik; dil, bütçe ve ihtiyacınıza göre gerçek filtreleme yok.",
        after:
          "Dile, bütçeye ve tıbbi ihtiyaca göre saniyeler içinde filtreleme. Yalnızca akredite ve size uygun seçenekler kalır.",
      },
      {
        title: "Aracısız, doğrudan iletişim",
        before:
          "Klinikle aranızda aracı duvarı; tedavi öncesi doktorunuzla net bir görüşme imkânı yok.",
        after:
          "Platform üzerinden klinikle birebir mesajlaşma. Tedavi planınızı önceden tartışın, soru işaretlerini süreç başlamadan giderin.",
      },
      {
        title: "Uçtan uca asistanlık",
        before:
          "Yabancı bir ülkede koordinasyon dağınık; yalnız kalma riski ve belirsiz adımlar.",
        after:
          "Klinik kapısından eve sağlıklı dönene kadar dijital asistanınız yanınızda. Siz iyileşmeye odaklanın.",
      },
    ],
    journeyTitle: "Yolculuğunuz: Uygulamadan Tedaviye",
    journeyIntro:
      "MediQueue'yu açtığınız andan tedaviyi tamamlayıp eve dönene kadar geçen gerçek adımlar — kronolojik, net ve öngörülebilir.",
    journeySteps: [
      {
        title: "Keşfedin",
        body: "Tedavi türü, şehir ve tarihe göre arama yapın. Yalnızca akredite klinik ve doktorları görün.",
      },
      {
        title: "Karşılaştırın",
        body: "Uzmanlık, dil ve bütçenize göre filtreleyin. Yapılandırılmış profillerle net kıyaslama yapın.",
      },
      {
        title: "Talep gönderin",
        body: "Şeffaf £100 Sabit Güvence Kaporası ile randevunuzu garantiye alın — gizli acente komisyonu yok. Karar sizin, baskı yok.",
      },
      {
        title: "Doğrudan görüşün",
        body: "Seçtiğiniz klinikle platform üzerinden birebir mesajlaşın; tedavi planını netleştirin.",
      },
      {
        title: "Seyahat edin ve tedavi olun",
        body: "Kliniğe gidin, uzman hekiminizle görüşün. Dilerseniz uçuş ve konaklama koordinasyonunu da platform üzerinden isteğe bağlı olarak talep edebilirsiniz.",
      },
      {
        title: "İyileşme sürecinde yanınızdayız",
        body: "Tedavi sonrasında da dijital asistanınız yanınızda kalır; süreç boyunca koordinasyon devam eder.",
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
      "Doktor paneli — Bugünün Programı önizlemesi. Demo randevular.",
    compareEyebrow: "Karşılaştırma",
    compareTitle: "Eski Düzeni Unutun. Gününüzü Tek Ekrandan Yönetin.",
    compareBeforeLabel: "Geleneksel Düzen",
    compareAfterLabel: "ile",
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
    featuresTitle: "Paneliniz, adım adım",
    featuresIntro:
      "Her ekran tek bir işe odaklanır — dağılmadan gününüzü yönetmek için tasarlandı.",
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
    roadmapTitle: "Katılımdan İlk Randevunuza.",
    roadmapIntro:
      "Profil oluşturmaktan ilk hasta randevusuna — her adımda ne sizin, ne MediQueue'nun sorumluluğu olduğu net.",
    roadmapDoctorLabel: "Doktor",
    roadmapMqLabel: "MediQueue",
    roadmapSteps: [
      {
        title: "Profil Oluşturma",
        doctor:
          "Uzmanlık, deneyim ve çalıştığınız klinik(ler) bilgisini girersiniz.",
        mediQueue:
          "Profilin hasta tarafında doğru sunulması, çeviri ve lokalizasyon.",
        previewHint:
          "Uzmanlık alanı, deneyim yılı ve klinik bağlantısı profil formunda tanımlanır.",
      },
      {
        title: "Doğrulama",
        doctor: "Lisans ve uzmanlık belgelerinizi yüklersiniz.",
        mediQueue:
          "Doğrulama süreci ve hastaya güven verecek rozetlendirme.",
        previewHint:
          "Belge yükleme ve onay durumu panelden takip edilir.",
      },
      {
        title: "Takvim Tanımlama",
        doctor: "Müsaitlik saatlerinizi panelde işaretlersiniz.",
        mediQueue: "Randevu çakışma kontrolü ve otomatik hatırlatmalar.",
        previewHint:
          "Haftalık müsaitlik grid'i — çakışan slotlar otomatik işaretlenir.",
      },
      {
        title: "Hasta Talebi Gelir",
        doctor:
          '"Hastalarım" ekranında yeni talebi görür, incelersiniz.',
        mediQueue:
          "Talebin filtrelenmiş, dili ve ihtiyacı netleşmiş şekilde gelmesi.",
      },
      {
        title: "Doğrudan İletişim",
        doctor:
          "Hastayla mesajlar üzerinden görüşürsünüz (gerekirse çift dilli).",
        mediQueue: "Çeviri altyapısı ve mesaj güvenliği.",
      },
      {
        title: "Randevu Günü",
        doctor: '"Bugünün Programı" ekranından günü yönetirsiniz.',
        mediQueue:
          "Randevu koordinasyonu ve hasta tarafında hatırlatmalar.",
      },
    ],
    trustMessage:
      "Panelimizdeki her doktor profili doğrulanmış lisans ve uzmanlık bilgisiyle yayındadır.",
    finalTitle: "Hastalar sizi arıyor.",
    finalBody: "Onlara ulaşmaya hazır mısınız?",
    finalCta: "Doktor Profilimi Oluştur",
  },
  how: {
    seoTitle: "Nasıl çalışır",
    eyebrow: "Döngü",
    title: "İlk aramadan yerinde bakıma.",
    intro:
      "Hasta ürününün üç adımı, ardından filtreleme servisinin gerçek hali — bir öneri motoru değil.",
    steps: [
      {
        title: "Arayın & Karşılaştırın",
        body: "Semptom, şehir ve tarihe göre klinik ve doktorları filtreleyin, şeffaf fiyatları görün.",
      },
      {
        title: "Randevu Alın",
        body: "Uygun tarih ve saati seçin; randevunuz şeffaf £100 Sabit Güvence Kaporası ve Stripe Koruması ile güvence altına alınır.",
      },
      {
        title: "Tedavi Olun",
        body: "Kliniğe gidin, uzman hekiminizle görüşün ve ödemeyi yerinde yapın.",
      },
    ],
    techTitle: "Kural tabanlı filtreleme. Bir öneri motoru değil.",
    techBody:
      "Bir Python mikroservisi katı filtreleri uygular, sonra kalanı skorlar ve sıralar — uzmanlık, dil, bütçe. Bu sürümde makine öğrenmesi yok. Liste, bir insanın kıyaslaması içindir.",
    pipeline: [
      { title: "Filtrele", body: "Önce katı kurallar. Uymayan elenir." },
      { title: "Skorla", body: "Kalan, belirlenen tercihlere göre skorlanır." },
      { title: "Sırala", body: "Kıyaslanacak bir liste. Karar insanda." },
    ],
  },
  team: {
    seoTitle: "Hakkımızda",
    heroEyebrow: "Hakkımızda",
    heroLeadBold: "Üç kurucu ortak.",
    heroLeadLight: "İçeride inşa ediyoruz.",
    heroIntro:
      "Biz sadece bir pazar yeri inşa etmiyoruz; hastaların körü körüne yönlendirildiği, kliniklerin boş reklamlara bütçe yaktığı o eski, kapalı ekosistemi yıkıyoruz. MEDIQUEUE; güvenin, doğrudan iletişimin ve teknolojinin buluştuğu yeni standarttır.",
    missionLabel: "Misyonumuz",
    missionBody:
      "Sağlık turizminde aracı ve gizli komisyon modelini geride bırakmak. Hastalar aracılar olmadan, dünyadaki akredite kliniklerle kendi dillerinde, doğrudan ve şeffafça iletişim kurabilsin.",
    visionLabel: "Vizyonumuz",
    visionBody:
      "Klinikleri umut satan reklam ajanslarından kurtarmak; yalnızca gerçek ve tedaviye hazır hastalarla eşleştiğinde kazandığı, risksiz bir büyüme modeli sunmak. Dünya genelinde şeffaflığın varsayılan olduğu bir sektör.",
    note: "Bugün inşa edilen bu. Hedef daha derin koordinasyon — yön olarak, tarihli yol haritası olarak değil.",
    achievementChips: [
      {
        label: "301 girişim arasında 1.",
        detail: "Düzce Teknopark Girişimcilik Maratonu · Mayıs 2026",
      },
      {
        label: "Patent Ödülü",
        detail: "Özgün eşleştirme algoritması · aracısız iş modeli",
      },
      {
        label: "Kapsül ön kuluçka",
        detail: "Erken aşama büyüme programı",
      },
    ],
    foundersEyebrow: "Ekip",
    foundersTitle: "Kurucu ortaklar ve ekip",
    members: [
      {
        name: "Furkan Közkaya",
        roleTitle: "Kurucu Ortak · CPO",
        bio: "Ürün deneyimini uçtan uca kuruyor; çapraz platform mobil ve web stratejisini yönetiyor.",
        image: "/team/furkan-kozkaya.svg",
        accent: "#c084fc",
        linkedin: "https://linkedin.com/in/furkan-kozkaya",
      },
      {
        name: "Azra İrem Derin",
        roleTitle: "Kurucu Ortak · CTO",
        bio: "Yapay zeka destekli eşleştirme algoritmalarını ve veri mimarisini geliştiriyor.",
        image: "/team/azra-irem-derin.svg",
        accent: "#e879f9",
        linkedin: "https://linkedin.com/in/azra-irem-derin",
      },
      {
        name: "Sinem Özdemir",
        roleTitle: "Kurucu Ortak · CFO",
        bio: "Sürdürülebilir finansal altyapıyı kuruyor; web platform entegrasyonlarını yönetiyor.",
        image: "/team/sinem-ozdemir.svg",
        accent: "#38bdf8",
        linkedin: "https://linkedin.com/in/sinem-ozdemir",
      },
      {
        name: "Kasım",
        roleTitle: "Backend Developer",
        bio: "Backend servislerini, API katmanını ve veri akışlarını geliştiriyor.",
        image: "/team/kasim.svg",
        accent: "#a78bfa",
        linkedin: "https://linkedin.com/company/mediqueue",
      },
    ],
    socialTitle: "Bizi takip edin",
    socialLinks: [
      {
        platform: "linkedin",
        label: "LinkedIn",
        hint: "Kurucu ekibi ve şirket güncellemeleri",
        href: "https://linkedin.com/company/mediqueue",
      },
      {
        platform: "instagram",
        label: "Instagram",
        hint: "Klinik hikayeleri ve kulis",
        href: "https://instagram.com/mediqueue",
      },
    ],
  },
  footer: {
    tagline: "Klinikler hasta geldiğinde öder. Hastalar kıyaslar, sonra sorar.",
    groups: [
      {
        title: "Platform",
        links: [
          { href: "/clinics", label: "Klinikler için" },
          { href: "/patients", label: "Hastalar için" },
          { href: "/doctors", label: "Doktorlar için" },
          { href: "/team", label: "Hakkımızda" },
        ],
      },
      {
        title: "Şirket",
        links: [
          { href: "/team", label: "Hakkımızda" },
          { href: "/privacy", label: "Gizlilik ve KVKK" },
          { href: "/terms", label: "Kullanım Koşulları" },
          { href: "/disclaimer", label: "Tıbbi Sorumluluk Reddi" },
        ],
      },
    ],
    copyright: "MEDIQUEUE. Tüm hakları saklıdır.",
    privacyNote: "Hasta gizliliği ilk ilke olarak ele alınır. GDPR ve KVKK uyumlu.",
    medicalDisclaimer:
      "MediQueue bir sağlık kuruluşu veya seyahat acentesi değildir; kliniklerle hastaları buluşturan dijital yazılım altyapı sağlayıcısıdır. Tüm tıbbi teşhis, tedavi ve operasyonel sorumluluk anlaşmalı kliniğe aittir.",
  },
  faq: {
    eyebrow: "SSS",
    title: "£100 güvence kaporası ve iade politikası",
    items: [
      {
        question: "£100 Sabit Güvence Kaporası nedir?",
        answer:
          "Randevunuzu rezervasyon anında güvence altına alan şeffaf, sabit bir depozitodur. Gizli acente komisyonu yoktur. Ödeme Stripe Koruması altındadır.",
      },
      {
        question: "Kapora ne zaman iade edilir?",
        answer:
          "Ziyaretinizden 14 gün veya daha önce iptal ederseniz kapora %100 iade edilir. Son 7 günde no-show ve geç iptallere karşı depozito koruması uygulanır.",
      },
      {
        question: "Stripe Koruması ne anlama gelir?",
        answer:
          "Kapora, kart bilgilerinizi MediQueue'nun saklamadığı Stripe altyapısı üzerinden tahsil edilir. İade haklarınız ödeme kaydında şeffaf şekilde görünür.",
      },
      {
        question: "Gizli komisyon var mı?",
        answer:
          "Hayır. Hastadan alınan tek platform ücreti şeffaf £100 sabit kaporadır. Klinik tarafında ücretlendirme yalnızca gelen ve tedavisi onaylanan hasta üzerinden yapılır.",
      },
    ],
  },
  lead: {
    close: "Kapat",
    patientTab: "UK Hasta Bekleme Listesi",
    clinicTab: "Klinik Ön Kayıt",
    patientTitle: "UK hasta bekleme listesine katılın",
    patientBody:
      "Akredite klinikleri keşfetmek ve £100 şeffaf güvence kaporası ile randevunuzu planlamak için listenize kaydolun.",
    clinicTitle: "Kliniğinizi ön kayda alın",
    clinicBody:
      "Türkiye'deki akredite klinikler için B2B ön kayıt. Panel aboneliği yoktur; yalnızca gelen hasta için ödersiniz.",
    name: "Ad soyad",
    email: "E-posta",
    phone: "Telefon (isteğe bağlı)",
    country: "Ülke",
    treatment: "İlgilendiğiniz tedavi",
    treatmentOptions: [
      "Saç ekimi",
      "Diş tedavisi",
      "Estetik cerrahi",
      "Göz lazer",
      "Diğer",
    ],
    clinicName: "Klinik adı",
    city: "Şehir",
    website: "Web sitesi (isteğe bağlı)",
    role: "Rolünüz",
    roleClinic: "Klinik yöneticisi / operasyon",
    roleDoctor: "Doktor",
    message: "Notunuz (isteğe bağlı)",
    consent:
      "KVKK/GDPR aydınlatma metnini okudum; ön kayıt için iletişim bilgilerimin işlenmesini kabul ediyorum.",
    submit: "Ön kaydı gönder",
    submitting: "Gönderiliyor…",
    successTitle: "Kaydınız alındı",
    successBody:
      "Teşekkürler. Ekibimiz sizinle e-posta üzerinden iletişime geçecek.",
    error: "Gönderim başarısız. Lütfen tekrar deneyin.",
    required: "Bu alan zorunludur.",
  },
  legal: {
    privacyLink: "Gizlilik",
    termsLink: "Koşullar",
    disclaimerLink: "Sorumluluk reddi",
    updatedLabel: "Son güncelleme",
    privacy: {
      title: "Gizlilik, KVKK ve GDPR Aydınlatma Metni",
      updated: "11 Eylül 2026",
      intro:
        "MediQueue, İngiltere ve AB hastaları ile Türkiye'deki akredite klinikleri buluşturan bir yazılım altyapısıdır. Bu metin, 6698 sayılı KVKK ve AB Genel Veri Koruma Tüzüğü (GDPR) kapsamında kişisel verilerinizin nasıl işlendiğini açıklar.",
      sections: [
        {
          heading: "Veri sorumlusu",
          body: "Kişisel verileriniz MediQueue tarafından, ön kayıt, bekleme listesi, klinik eşleştirme ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlenir. İletişim: privacy@mediqueue.com",
        },
        {
          heading: "Toplanan veriler",
          body: "Ad soyad, e-posta, telefon, ülke, ilgilendiğiniz tedavi, klinik adı, şehir ve gönüllü olarak paylaştığınız notlar. Kart verileri MediQueue sunucularında saklanmaz; kapora tahsilatı Stripe üzerinden yapılır.",
        },
        {
          heading: "Hukuki dayanak",
          body: "Ön kayıt ve bekleme listesi için açık rızanız; sözleşmenin kurulması ve ifası; meşru menfaat (güvenlik, kötüye kullanımın önlenmesi); ve yasal yükümlülükler.",
        },
        {
          heading: "Paylaşım",
          body: "Verileriniz, yalnızca randevu sürecinin ilerlemesi için ilgili anlaşmalı klinik ve zorunlu hizmet sağlayıcılarla (barındırma, e-posta, Stripe) paylaşılabilir. Verileriniz satılmaz.",
        },
        {
          heading: "Saklama ve haklarınız",
          body: "Veriler, amacın gerektirdiği süre ve yasal zamanaşımı boyunca saklanır. Erişim, düzeltme, silme, itiraz ve (GDPR kapsamında) taşınabilirlik haklarınız için privacy@mediqueue.com adresine yazabilirsiniz.",
        },
      ],
    },
    terms: {
      title: "Kullanım Koşulları",
      updated: "11 Eylül 2026",
      intro:
        "Bu siteyi ve ön kayıt formlarını kullanarak aşağıdaki koşulları kabul etmiş olursunuz.",
      sections: [
        {
          heading: "Hizmetin niteliği",
          body: "MediQueue bir sağlık kuruluşu veya seyahat acentesi değildir. Platform, hastaları akredite kliniklerle buluşturan dijital yazılım altyapısıdır.",
        },
        {
          heading: "£100 güvence kaporası",
          body: "Hasta randevusu, şeffaf £100 sabit güvence kaporası ile rezervasyon altına alınır. Ziyaretten 14 gün veya daha önce yapılan iptallerde kapora %100 iade edilir. Son 7 günde no-show ve geç iptale karşı depozito koruması uygulanır. Tahsilat Stripe Koruması altındadır.",
        },
        {
          heading: "Klinikler",
          body: "Klinikler panel aboneliği ödemez. Platform ücreti, gelen ve tedavisi onaylanan hasta üzerinden alınır.",
        },
        {
          heading: "Ön kayıt",
          body: "Bekleme listesi ve klinik ön kayıt, canlı randevu veya tedavi taahhüdü değildir. Ekip, uygunluk kontrolünden sonra sizinle iletişime geçer.",
        },
      ],
    },
    disclaimer: {
      title: "Tıbbi Sorumluluk Reddi",
      updated: "11 Eylül 2026",
      intro:
        "MediQueue tıbbi tavsiye, teşhis veya tedavi sunmaz. Aşağıdaki metin site genelinde geçerlidir.",
      sections: [
        {
          heading: "Rolümüz",
          body: "MediQueue bir sağlık kuruluşu veya seyahat acentesi değildir; kliniklerle hastaları buluşturan dijital yazılım altyapı sağlayıcısıdır. Tüm tıbbi teşhis, tedavi ve operasyonel sorumluluk anlaşmalı kliniğe aittir.",
        },
        {
          heading: "Klinik bağımsızlığı",
          body: "Tedavi planı, fiyat teklifi, endikasyon ve komplikasyon yönetimi ilgili kliniğin ve hekimin sorumluluğundadır. Platformdaki örnek veya demo veriler pazarlama amaçlıdır.",
        },
        {
          heading: "Kararınız",
          body: "Herhangi bir tedaviye karar vermeden önce bağımsız tıbbi görüş almanızı öneririz. Acil sağlık durumunda yerel acil servise başvurun.",
        },
      ],
    },
  },
};
