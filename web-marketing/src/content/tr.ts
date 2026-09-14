import type { SiteContent } from "./types";
import { trPreviews } from "./previews";
import { trScreens } from "./screens";

export const tr: SiteContent = {
  seo: {
    title: "MEDIQUEUE — Şeffaf, aracısız sağlık turizmi",
    description:
      "Akredite klinikleri kıyaslayın, doğrudan yazışın, ön ödeme olmadan talep gönderin. Klinikler yalnızca gelen hasta için öder — abonelik yok.",
    keywords: [
      "MediQueue",
      "Sağlık Turizmi",
      "Klinik Karşılaştırma",
      "JCI Akredite Klinikler",
      "Saç Ekimi Fiyatları",
      "Rinoplasti Cerrahi",
      "Doktor Randevu",
      "Uluslararası Hasta",
      "Komisyonsuz Sağlık Pazar Yeri",
    ],
  },
  notFound: {
    title: "Sayfa bulunamadı",
    body: "Bu adres artık yok veya hiç olmadı. Ana sayfadan devam edebilirsiniz.",
    cta: "Ana sayfaya dön",
  },
  lead: {
    close: "Kapat",
    patientTab: "Hasta Talebi",
    clinicTab: "Klinik / Doktor Kaydı",
    patientTitle: "Ücretsiz Sağlık & Tedavi Talebi Oluşturun",
    clinicTitle: "Kliniğinizi MediQueue'ye Ekleyin",
    patientBody: "Talep kriterlerinizi girin, akredite klinikler sizden ön ödeme almadan teklif versin.",
    clinicBody: "Abonelik ücreti ödemeyin. Yalnızca panelinize düşen gerçek talepler için işlem yapın.",
    successTitle: "Talebiniz Başarıyla Alındı!",
    successBody: "Ekibimiz ve akredite klinikler talebinizi inceleyip en kısa sürede sizinle iletişime geçecektir.",
    name: "Ad Soyad",
    namePlaceholder: "Örn: Ahmet Yılmaz",
    email: "E-posta Adresi",
    emailPlaceholder: "ornek@email.com",
    phone: "Telefon Numarası",
    phonePlaceholder: "+90 5XX XXX XX XX",
    country: "İkamet Ettiğiniz Ülke",
    countryPlaceholder: "Örn: Birleşik Krallık / Almanya",
    treatment: "Talep Edilen Tedavi",
    selectTreatment: "Tedavi seçiniz...",
    treatmentOptions: [
      "Saç Ekimi (DHI / FUE)",
      "Estetik & Plastik Cerrahi",
      "Göz Cerrahisi & LASIK",
      "Diş Tedavisi & Gülüş Tasarımı",
      "Obezite & Bariatrik Cerrahi",
      "Ortopedi & Fizik Tedavi",
      "Diğer",
    ],
    clinicName: "Klinik / Hastane Adı",
    clinicNamePlaceholder: "Örn: Anadolu Sağlık Merkezi",
    city: "Şehir / Ülke",
    cityPlaceholder: "Örn: İstanbul, Türkiye",
    website: "Web Sitesi (Opsiyonel)",
    websitePlaceholder: "https://klinik-web-sitesi.com",
    role: "Rolünüz",
    roleClinic: "Klinik Yöneticisi / Temsilcisi",
    roleDoctor: "Hekim / Doktor",
    message: "Semptomlar veya Özel İstekleriniz",
    messagePlaceholder: "İletmek istediğiniz tüm tıbbi ayrıntıları yazabilirsiniz...",
    consent: "Kişisel verilerimin işlenmesini ve gizlilik politikasını kabul ediyorum.",
    privacyLink: "Gizlilik Politikası",
    error: "Bir hata oluştu. Lütfen tüm alanları doldurup tekrar deneyin.",
    submitting: "Gönderiliyor...",
    submit: "Talebi Gönder",
    required: "Bu alan zorunludur.",
    dataNote: "Kişisel verilerinizi pazarlama listelerine satmayız. Ayrıntı için gizlilik politikasına bakın.",
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
    getStarted: "Hemen Başlayın",
    menu: "Menü",
    pages: "SAYFALAR",
    language: "Dil Seçimi",
    languageAria: "Dil",
  },
  contact: {
    seoTitle: "İletişim — Bize Ulaşın",
    eyebrow: "İletişim",
    title: "İletişim Bilgilerinizi Bırakın, Sizinle İletişime Geçelim",
    intro:
      "İster tedavi arayan bir hasta, ister platforma katılmak isteyen bir klinik veya doktor olun — formu doldurun, ekibimiz mesai saatlerinde size dönüş yapsın.",
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
      "Bilgileriniz ekibimize ulaştı. Mesai saatlerinde verdiğiniz iletişim kanalı üzerinden sizinle iletişime geçeceğiz.",
    phoneTitle: "Telefon & WhatsApp",
    emailTitle: "E-posta Adreslerimiz",
    addressTitle: "Genel Merkez",
    privacyNote:
      "Talebiniz ekibimize iletilir. Kişisel verilerinizi pazarlama listelerine satmayız; gizlilik politikamızda nasıl işlediğimizi anlatırız.",
    sendAnother: "Yeni Mesaj Gönder",
    namePlaceholder: "Örn: Ahmet Yılmaz",
    emailPlaceholder: "ornek@email.com",
    phonePlaceholder: "+90 5XX XXX XX XX",
    channelsTitle: "Doğrudan İletişim Kanalları",
    teamInbox: "Hızlı Ekip Yanıtı",
    avgResponse: "Ortalama Yanıt Süresi",
    topicPlaceholderPatient: "Örn: Saç Ekimi, Rinoplasti, Diş...",
    topicPlaceholderClinic: "Örn: Klinik Kaydı, Hekim Profili...",
    messagePlaceholder: "İletmek istediğiniz sorularınızı veya notlarınızı yazın...",
    responseNote: "Bıraktığınız iletişim talepleri ekibimiz tarafından mesai saatlerinde incelenir.",
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
      zoomIn: "Yakınlaştır",
      zoomOut: "Uzaklaştır",
      patientsNoun: "hasta",
      mostFrom: "En çok",
      emptyTitle: "Henüz yurt dışı hasta kaydı yok",
      emptyBody:
        "İlk uluslararası talebiniz ulaştığında hastalarınızın geldiği ülkeler burada haritalanacak.",
      globeAria: "{count} ülkeyi gösteren döndürülebilir dünya",
      scrollUp: "Listeyi yukarı kaydır",
      scrollDown: "Listeyi aşağı kaydır",
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
    primaryCta: "Kliniğinizi Ekleyin",
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
    compareIntro:
      "Aylık sabit ajans ücretleri veya sonucu garanti edilmeyen dijital reklam harcamaları yerine; dil, bütçe ve tedavi ihtiyacı doğrulanmış hastalarla sıfır riskle büyüyün.",
    compareBeforeTitle: "Geleneksel Sağlık Turizmi Yöntemleri",
    compareBeforeFoot:
      "Harcanan bütçenin dönüşüm garantisi yoktur; risk kliniğe aittir.",
    compareRecommended: "Tavsiye Edilen Güvenli Model",
    compareAfterTitle: "MediQueue Güvenceli Pazar Yeri",
    compareAfterFoot: "Sıfır abonelik ücreti — Yalnızca gelen hasta için ödersiniz.",
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
    roadmapMqLabel: "MEDIQUEUE Güvencesi",
    roadmapSteps: [
      {
        title: "Katılım & Profil",
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
      title: "Hastalarınızın Nereden Geldiğini Görün",
      body:
        "Hangi ülkelerden ne kadar talep aldığınızı anlık küre haritasından takip edin; pazarlama ve kapasite kararlarınızı canlı veriyle alın.",
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
          title: "Ülke Bazlı Dağılım",
          body: "Pazar taleplerini küre haritasında anlık izleyin.",
        },
        {
          title: "Trend Takibi",
          body: "Ülke bazında dönemsel değişimi kolayca görün.",
        },
        {
          title: "Otomatik Veri",
          body: "Manuel raporlama gerekmeden anlık güncellenir.",
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
    whyIntro:
      "Komisyoncuların yönlendirmeleri yerine, akredite klinikleri şeffafça kıyaslayabileceğiniz özgür bir tedavi platformu.",
    whyBeforeTitle: "Geleneksel Sağlık Turizmi Acentaları",
    whyBeforeFoot: "Gizli maliyet riski ve kısıtlı seçeneklerle hareket edilir.",
    whyRecommended: "Tavsiye Edilen Şeffaf Model",
    whyAfterTitle: "MediQueue Şeffaf Pazar Yeri",
    whyAfterFoot: "Keşif ve talep formu bu sitede ücretsizdir — gizli acenta komisyonu modeli yoktur.",
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
          "Akredite klinikleri uzmanlık, dil ve bütçenize göre özgürce kıyaslayın",
      },
      {
        title: "Aracısız Doğrudan İletişim",
        before:
          "Hekimle görüşme imkanı yok; tüm sorular acenta temsilcisinin filtresinden geçer",
        after:
          "Hekimle doğrudan yazışmayı hedefleriz. Çeviri bu sitede demo metnidir.",
      },
      {
        title: "Sıfır Ön Ödeme Riski",
        before:
          "Danışmanlık ve randevu için peşin ücret talebi ve iptal durumunda para kaybı",
        after:
          "Teklif toplamak ve hekimle görüşmek bu sitede ücretsizdir. Ameliyat rezervasyonu ve depozito klinikle yapılır; MediQueue kart çekmez.",
      },
      {
        title: "Fotoğraf gizliliği",
        before:
          "Tıbbi fotoğraflarınızın acenta çalışanları arasında elden ele gezmesi veya sızma riski",
        after:
          "Fotoğrafı yalnızca talep gönderdiğinizde paylaşırsınız; canlı üründe otomatik yüz maskeleme vaadi yok",
      },
    ],
    journeyTitle: "Tedavi Yolculuğunuz 4 Adımda Nasıl İşler?",
    journeyIntro:
      "Aramaya başladığınız andan tedavinizi tamamlayıp eve dönene kadar geçen tüm süreç — şeffaf, güvenli ve kontrolünüzde.",
    journeySteps: [
      {
        title: "Klinik Keşfi & Kıyaslama",
        body: "Tedavi türü, şehir ve bütçeye göre arayın. Paket ve belge alanları örnek kartlarda gösterilir.",
      },
      {
        title: "Ön Ödemesiz Ücretsiz Teklif",
        body: "Kliniklere tek tıkla talep gönderin. Kredi kartı veya ön ödeme gerekmeden kişiselleştirilmiş tedavi tekliflerini toplayın.",
      },
      {
        title: "Birebir Hekim Görüşmesi & Rezervasyon",
        body: "Hekimle doğrudan yazışmayı hedefleriz. Otomatik çeviri bu sitede demo metnidir. Tarih ve ödeme klinikle netleşir.",
      },
      {
        title: "Tedavi & İyileşme Takibi",
        body: "Seçtiğiniz kliniğe seyahat edin. Tedaviniz süresince ve eve döndükten sonra dijital asistanınız takipte kalır.",
      },
    ],
    discoverPrivacyNote:
      "Klinik kimliği talep göndermeden önce gizlidir.",
    trustTitle: "Listeleme belgesi ile klinik",
    trustBody:
      "Katılan klinikten JCI (veya eşdeğer) ve sağlık turizmi belgesi isteriz. Bu, her kliniğin devlet tarafından anlık tarandığı veya sahteciliğin sıfırlandığı anlamına gelmez.",
    trustJci: "JCI Akreditasyonu",
    trustNational: "Ulusal sağlık turizmi sertifikası",
    trustEyebrow: "Belgeleyen klinikler",
    trustCheck1: "Sahtecilik sıfır iddiası yok — belge kriteri var",
    trustCheck2: "Doğrulanmış Tıbbi Uzmanlık",
    trustBadges: [
      {
        title: "JCI Uluslararası Akreditasyon",
        subtitle: "Katılımda istenen belge türü",
        tag: "Kriter",
      },
      {
        title: "Sağlık Turizmi Yetki Belgesi",
        subtitle: "Onboarding’de istenen resmi yetki belgesi",
        tag: "Kriter",
      },
      {
        title: "Hasta gizliliği ilkesi",
        subtitle: "Talep gönderene kadar kimlik herkese açık değil",
        tag: "Gizlilik",
      },
    ],
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
    compareIntro:
      "Dağınık kanallar ve kağıt takvimler yerine, tüm günlük randevu akışınızı ve hasta iletişimini tek ekrandan yönetin.",
    compareBeforeTitle: "Geleneksel Doktor Süreçleri",
    compareBeforeFoot: "Süreç karmaşası ve verimsiz randevu takibi yaşanır.",
    compareRecommended: "Öne Çıkan Doktor Paneli",
    compareAfterTitle: "MediQueue Hekim Paneli",
    compareAfterFoot: "Tüm hastalar, takvim ve tıbbi notlar tek ekranda organize.",
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
    featuresEyebrow: "Panel Ekranları & Özellikler",
    liveDemo: "Canlı Demo",
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
    roadmapMqLabel: "MEDIQUEUE",
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
        doctor: "Panele düşen talepleri incelersiniz. Çeviri satırı demo önizlemedir.",
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
        a: "Kişisel verilerinizi talep formunda toplarız ve seçtiğiniz kliniklere iletiriz. Kimliğiniz, bir kliniğe talep gönderene kadar pazar yerinde herkese açık listelenmez. Ayrıntı için gizlilik politikasına bakın.",
      },
      {
        q: "Uçuş ve konaklama organizasyonu kimin sorumluluğunda?",
        a: "MediQueue doğrudan klinik-hasta iletişimini sağlar. Konaklama, havalimanı transferi ve seyahat lojistiği isteğe bağlı olarak seçtiğiniz kliniğin paket kapsamına göre koordine edilir.",
      },
    ],
    patientCta: "Klinikleri Keşfedin",
    clinicCta: "Kliniğinizi Ekleyin",
    stepsKicker: "3 Adımda Şeffaf Yolculuk",
    stepsTitle: "Kapsamlı Süreç Haritası",
    marketplaceBadge: "Doğrudan & Şeffaf Pazar Yeri",
    faqExtraTitle: "Aklınıza takılan farklı bir soru mu var?",
    faqExtraBody: "Ekibimiz süreçler konusunda yardımcı olur.",
    faqExtraCta: "Bize sorun",
  },
  team: {
    seoTitle: "Hakkımızda — MediQueue",
    heroEyebrow: "Hakkımızda & Hikayemiz",
    heroLeadBold: "Sağlık Turizminde Şeffaflık.",
    heroLeadLight: "Teknolojiyle Aracısız Gelecek.",
    heroIntro:
      "Aracı acenta komisyonlarının, gizli fiyatların ve belirsiz tedavi süreçlerinin sona erdiği yeni bir standart kuruyoruz. MediQueue; uluslararası hastalar ile akredite klinik ve hekimleri doğrudan ve şeffaf biçimde buluşturan bağımsız bir pazar yeridir.",
    heroChip1: "Belgeleyen klinikler hedeflenir",
    heroChip2: "Komisyonsuz iletişim modeli",
    stats: [
      { value: "301/1", label: "Teknopark Birincisi", hint: "Girişimcilik Maratonu Şampiyonu" },
      { value: "Filtre", label: "Akıllı sıralama", hint: "Dil, bütçe ve ihtiyaca göre kural tabanlı filtre" },
      { value: "Açık", label: "Şeffaf pazar yeri", hint: "Aracı komisyonu eklemeyen model" },
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
        body: "Gizli acenta marjı modeli yok. Paket ve lisans alanları örnek kartlarda gösterilir; canlı fiyat her klinikten teyit edilir.",
        icon: "ShieldCheck",
      },
      {
        title: "Doğrudan Hekim Bağlantısı",
        body: "Temsilci olmadan hekimle yazışmayı hedefleriz. Otomatik çeviri bu sitede demo metnidir.",
        icon: "Stethoscope",
      },
      {
        title: "Kural tabanlı filtreleme",
        body: "Dil, bütçe ve tedavi ihtiyacına göre klinikleri süzüp sıralarız — öneri vaadi değil, şeffaf karşılaştırma.",
        icon: "Sparkles",
      },
      {
        title: "Sıfır Ön Ödeme Riski",
        body: "Hasta için talep oluşturmak tamamen ücretsizdir. Klinikler için peşin ajans veya reklam riski olmadan sürdürülebilir büyüme.",
        icon: "CheckCircle2",
      },
    ],
    note: "MediQueue, uluslararası sağlık turizminde aracısız bir pazar yeri olarak gelişen bir ekiptir.",
    achievementsEyebrow: "Ödüller ve Başarılar",
    achievementsTitle: "Girişimcilik ve İnovasyon Ekosistemindeki Yerimiz",
    achievementChips: [
      {
        label: "301 Girişim Arasında 1.lik Ödülü",
        detail: "Düzce Teknopark Girişimcilik Maratonu Şampiyonluğu · 2026",
      },
      {
        label: "Kural tabanlı filtreleme",
        detail: "Dil, bütçe ve ihtiyaç kriterleriyle sıralama; aracısız pazar yeri modeli",
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
        roleTitle: "CTO / Yazılım, veri ve eşleştirme altyapısı",
        bio: "Platform mimarisini, veri katmanını ve kural tabanlı klinik filtreleme servisini geliştiriyor.",
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
    socialEyebrow: "Topluluk & iletişim",
    socialIntro: "Resmi duyurular ve ekip haberleri — klinik başarı hikâyeleri henüz canlı vaka değil.",
    visitPage: "Sayfayı ziyaret et",
    exploreAsPatient: "Hasta olarak keşfedin",
    addClinicCta: "Kliniğinizi ekleyin",
    achievementsAside: "Ödüller",
    socialLinks: [
      {
        platform: "linkedin",
        label: "LinkedIn",
        hint: "Kurucu ekip ve resmi şirket gelişmeleri",
        href: "https://www.linkedin.com/company/mediqueue",
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
          { href: "/terms", label: "Kullanım Şartları" },
        ],
      },
    ],
    copyright: "MediQueue. Tüm hakları saklıdır.",
    sendEmail: "E-posta gönder",
    privacyNote: "Hasta gizliliği ve veri güvenliği ilk ilkemizdir.",
    medicalDisclaimer: "MediQueue bir pazar yeri platformudur. Sunulan içerikler bilgilendirme amaçlıdır ve tıbbi teşhis/tedavi tavsiyesi yerine geçmez.",
  },
  legal: {
    updatedLabel: "Son Güncelleme",
    backHome: "Ana Sayfa'ya Dön",
    privacy: {
      title: "Gizlilik Politikası",
      intro: "MediQueue olarak hasta verilerinin gizliliğini ve tıbbi bilgilerin güvenliğini en üst seviyede tutmayı temel ilke edindik.",
      updated: "14 Eylül 2026",
      sections: [
        {
          heading: "1. Veri Toplama ve Kullanımı",
          body: "MediQueue üzerinden ilettiğiniz tedavi talepleri ve medikal formlar, yalnızca onay verdiğiniz akredite klinikler ve doktorlar ile şifreli kanallar üzerinden paylaşılır. Kişisel iletişim bilgileriniz üçüncü taraflara pazarlama amacıyla satılmaz.",
        },
        {
          heading: "2. Kişisel veriler",
          body: "Talep formundaki bilgileri, seçtiğiniz klinikle iletişimi sağlamak için işleriz. Verilerinizin silinmesini talep edebilirsiniz. Ayrıntılı süreçler gizlilik politikasında yer alır; bu metin hukuki uygunluk belgesi değildir.",
        },
        {
          heading: "3. Çerezler ve Analitik",
          body: "Platform kullanıcı deneyimini iyileştirmek için anonim performans çerezleri kullanmaktadır. Tarayıcı ayarlarınızdan çerez tercihlerinizi dilediğiniz zaman değiştirebilirsiniz.",
        },
        {
          heading: "4. Veri sorumlusu ve iletişim",
          body: "Pazarlama sitesi formları MediQueue ekibine iletilir. Talepleriniz için mediqueue.tech@gmail.com adresine yazabilirsiniz. Silme veya düzeltme taleplerini aynı kanaldan iletebilirsiniz.",
        },
        {
          heading: "5. Saklama ve üçüncü taraflar",
          body: "Form verisi, talebinizi işlemek ve sizin seçtiğiniz kliniklere aktarmak için tutulur. E-posta otomasyonu kullanılıyorsa aynı içerik iletilebilir. Bu metin KVKK, GDPR veya HIPAA belgesi değildir.",
        },
        {
          heading: "6. Bu sitenin sınırı",
          body: "getmediqueue.com bir tanıtım ve lead sitesidir. Canlı randevu, ödeme veya klinik yazılımı burada çalışmaz.",
        },
      ],
    },
    terms: {
      title: "Kullanım Şartları & Şeffaflık Sözleşmesi",
      intro: "MediQueue pazar yeri platformunu kullanan hastalar, klinikler ve hekimler için geçerli kullanım koşulları.",
      updated: "14 Eylül 2026",
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
          body: "Hastalar bu siteden ön ödeme ve kart olmadan bağlayıcı olmayan talep bırakabilir. Klinik randevusu ve ücret klinikle kararlaşır; MediQueue tahsilat yapmaz.",
        },
      ],
    },
    disclaimer: {
      title: "Tıbbi Sorumluluk Reddi (Medical Disclaimer)",
      intro: "MediQueue platformunda yer alan içerikler ve bilgilendirmeler hakkında yasal uyarı.",
      updated: "14 Eylül 2026",
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
  screens: trScreens,
};
