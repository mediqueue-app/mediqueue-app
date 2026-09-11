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
      { href: "/clinics", label: "Klinikler için" },
      { href: "/patients", label: "Hastalar için" },
      { href: "/doctors", label: "Doktorlar için" },
      { href: "/how-it-works", label: "Nasıl çalışır" },
      { href: "/team", label: "Hakkımızda" },
    ],
    clinicCta: "Kliniğim için",
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
        "Akredite klinikleri yan yana kıyaslayın, doğrudan yazışın, ön ödeme yapmadan talep gönderin. Karar sizde — süreç görünür.",
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
          "Sıfır peşin maliyet — yalnızca gelen ve tedavisi onaylanan hastadan ücretlendirme",
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
          "Ön ödeme riski ve sahte/kayıp talep riski tamamen MediQueue'nin taşıdığı risk — klinik sıfır riskle çalışır.",
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
        body: "Ön ödeme yapmadan randevu talebinde bulunun. Karar sizin, baskı yok.",
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
        body: "Uygun tarih ve saati seçin, ön ödemesiz randevu talebi oluşturun.",
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
    seoTitle: "Hakkımızda",
    heroEyebrow: "Hakkımızda",
    heroLeadBold: "Dört kurucu.",
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
    foundersEyebrow: "Kurucu ekip",
    foundersTitle: "Değişimin mimarları",
    members: [
      {
        name: "Furkan Közkaya",
        roleTitle: "CPO / Mobil + Web",
        bio: "Ürün deneyimini uçtan uca kuruyor; çapraz platform mobil stratejisini yönetiyor.",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        accent: "#3a6ad6",
        linkedin: "https://linkedin.com/in/furkan-kozkaya",
      },
      {
        name: "Azra İrem Derin",
        roleTitle: "CTO / Yapay Zeka",
        bio: "Yapay zeka destekli eşleştirme algoritmalarını ve veri mimarisini geliştiriyor.",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
        accent: "#0d9488",
        linkedin: "https://linkedin.com/in/azra-irem-derin",
      },
      {
        name: "Sinem Özdemir",
        roleTitle: "CFO / Web",
        bio: "Sürdürülebilir finansal altyapıyı kuruyor; web platform entegrasyonlarını yönetiyor.",
        image:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
        accent: "#2f57b3",
        linkedin: "https://linkedin.com/in/sinem-ozdemir",
      },
      {
        name: "Kevser Eken",
        roleTitle: "CMO / Operasyon",
        bio: "Uluslararası klinik ağını genişletiyor; operasyonel kusursuzluğu sahada yönetiyor.",
        image:
          "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=80",
        accent: "#1e3a5f",
        linkedin: "https://linkedin.com/in/kevser-eken",
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
      {
        platform: "x",
        label: "X",
        hint: "Kısa güncellemeler",
        href: "https://x.com/mediqueue",
      },
    ],
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
          { href: "/team#contact", label: "İletişim" },
        ],
      },
      {
        title: "Hastalar İçin",
        links: [
          { href: "/patients", label: "Akredite Klinikler" },
          { href: "/patients#compare", label: "Klinik Kıyaslama" },
          { href: "/patients", label: "Tedavi Rehberi" },
        ],
      },
      {
        title: "Klinikler & Doktorlar",
        links: [
          { href: "/clinics", label: "Klinik Portalı" },
          { href: "/clinics#requests", label: "Hasta Talepleri" },
          { href: "/doctors", label: "Doktor Paneli" },
        ],
      },
      {
        title: "Yasal & Destek",
        links: [
          { href: "/how-it-works#faq", label: "SSS" },
          { href: "/patients#privacy", label: "Gizlilik Politikası" },
          { href: "/patients#kvkk", label: "KVKK & GDPR" },
        ],
      },
    ],
    copyright: "MediQueue. Tüm hakları saklıdır.",
    privacyNote: "Hasta gizliliği ve veri güvenliği ilk ilkemizdir.",
  },
  previews: trPreviews,
};
