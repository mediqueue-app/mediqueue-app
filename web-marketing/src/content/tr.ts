import type { SiteContent } from "./types";
import { trPreviews } from "./previews";
import { trScreens } from "./screens";

export const tr: SiteContent = {
  seo: {
    title: "MEDIQUEUE — Resmi site | Şeffaf, aracısız sağlık turizmi",
    description:
      "MEDIQUEUE resmi web sitesi. Akredite klinikleri kıyaslayın, doğrudan yazışın, bu siteden ön ödeme olmadan talep bırakın. Klinik yazılımı ve tahsilat burada çalışmaz.",
    keywords: [
      "MEDIQUEUE",
      "MediQueue",
      "MEDI QUEUE",
      "MediQueue resmi",
      "sağlık turizmi",
      "klinik karşılaştırma",
      "JCI klinik",
      "uluslararası hasta",
      "aracısız sağlık",
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
    patientBody: "Talep ayrıntılarınızı girin. MediQueue ekibi sizinle iletişime geçer; bu form bağlayıcı randevu veya kart çekimi değildir.",
    clinicBody: "Klinik veya hekim kaydı için formu doldurun. Abonelik ücreti bu sitede alınmaz; katılım koşulları e-posta ile netleşir.",
    successTitle: "Talebiniz alındı",
    successBody: "MediQueue ekibi iletinizi inceler ve e-posta veya telefon üzerinden dönüş yapar. Canlı klinik ağı bu sitede çalışmaz.",
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
    error: "Eksik veya hatalı alan var. Formu kontrol edip tekrar dene.",
    errorNetwork: "İnternet bağlantını kontrol et ve tekrar dene.",
    errorServer: "Bu bizim tarafımızdaki bir sorun, ekibimize bildirildi. Lütfen tekrar dene.",
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
      { href: "/clinics", label: "Klinikler İçin", desc: "Uluslararası talep ve panel önizlemesi" },
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
    title: "İletişim Bilgilerinizi Bırakın, Sizinle İletişime Geçelim",
    intro:
      "Hasta, klinik veya hekim kaydı için formu doldurun. MediQueue ekibi mesai saatlerinde dönüş yapar. Canlı ağ bu sitede çalışmaz.",
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
    error: "Eksik veya hatalı alan var. Formu kontrol edip tekrar dene.",
    errorNetwork: "İnternet bağlantını kontrol et ve tekrar dene.",
    errorServer: "Bu bizim tarafımızdaki bir sorun, ekibimize bildirildi. Lütfen tekrar dene.",
  },
  home: {
    audiencePatient: "Hasta",
    audienceClinic: "Klinik",
    patient: {
      headline: "MEDIQUEUE",
      headlineAccent: "şeffaflığa emanet edin.",
      subcopy:
        "Akredite klinikleri yan yana kıyaslayın, doğrudan yazışın, ön ödeme yapmadan talep gönderin. Karar sizde — süreç görünür.",
      primaryCta: "Klinikleri Keşfedin",
      secondaryCta: "Nasıl Çalışır?",
      previewCaption: "Canlı Demo — Hasta Uygulaması & Klinik Kıyaslama Ekranı",
    },
    clinic: {
      headline: "MEDIQUEUE",
      headlineAccent: "gelen hasta için ödeyin.",
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
      { label: "Doğrudan İletişim", detail: "Aracı komisyonu eklemeyen model" },
      { label: "Akredite Klinikler", detail: "Katılımda JCI veya eşdeğer belge istenir" },
      { label: "Şeffaf Fiyatlandırma", detail: "Paket alanları örnek kartlarda gösterilir" },
      { label: "Hasta Mahremiyeti", detail: "Form verisi satılmaz; HTTPS ile iletilir" },
    ],
    trustStripLabel: "Güven ve Şeffaflık",
    globalReach: {
      eyebrow: "Klinik panelinizden bir önizleme",
      title: "Dünyanın Dört Bir Yanından Hastalar",
      subtitle:
        "Kliniğiniz MediQueue’ye katıldığında talep ülkeleri panelde listelenmek üzere tasarlanır. Aşağıdaki küre örnek veridir.",
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
    finalClinicTitle: "Uluslararası hastalar, ajans retainer’ı olmadan",
    finalClinicBody:
      "Yalnızca gelen ve tedavisi onaylanan hasta için ödeyin. Panel aboneliği yok.",
    finalClinicCta: "Kliniğinizi Ekleyin",
  },
  clinics: {
    seoTitle: "Klinikler için",
    heroTag:
      "Reklamlara Servet Ödemeyi Bırakın. Sadece Dönüşen Hasta İçin Ödeyin.",
    heroSub:
      "Ajans retainer’ı ve belirsiz tıklama bütçesi yerine, talep formu ve panel modeliyle uluslararası hastaya açılın. Bu sitede peşin abonelik tahsilatı yoktur.",
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
    compareTitle: "Ajans retainer’ı yok. Ücret klinikle netleşir.",
    compareBeforeLabel: "Geleneksel Yöntemler",
    compareAfterLabel: "Hedeflenen model",
    compareCriteriaLabel: "Kriter",
    compareIntro:
      "Sabit ajans ücreti veya sonucu garanti edilmeyen reklama alternatif olarak; dil, bütçe ve tedavi notuyla gelen talepleri panelde görmek üzere tasarlandı.",
    compareBeforeTitle: "Geleneksel Sağlık Turizmi Yöntemleri",
    compareBeforeFoot:
      "Harcanan bütçenin dönüşüm garantisi yoktur; risk kliniğe aittir.",
    compareRecommended: "Tavsiye edilen şeffaf model",
    compareAfterTitle: "MediQueue pazar yeri modeli",
    compareAfterFoot: "Bu sitede abonelik tahsilatı yok — ticari koşullar yazılı netleşir.",
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
          "Ödeme, tedavi ve cayma koşulları klinikle yazılı olarak netleşir — MediQueue bu sitede kart çekmez ve cayma sigortası satmaz",
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
    roadmapMqLabel: "MEDIQUEUE tarafı",
    roadmapSteps: [
      {
        title: "Katılım & Profil",
        clinic:
          "Akreditasyon belgelerini yükleyin, uzmanlık ve fiyat aralıklarını tanımlayın.",
        mediQueue:
          "Çok dilli profil sunumu ve belge kontrol süreci ücretsiz tasarlanır.",
        previewHint:
          "Belgeler panele yüklenir; onay durumu örnek ekranda izlenir.",
      },
      {
        title: "Filtrelenmiş Hasta Talepleri",
        clinic:
          "Bütçe, dil ve tedavi notuyla gelen başvuruları panelde inceleyin.",
        mediQueue:
          "Talep alanları yapılandırılır; spam ve gerçek hasta ayrımı ürün hedefidir, bu sitede canlı tarama yoktur.",
        previewHint:
          "Uluslararası talep kartları doğrudan klinik paneli önizlemesinde gösterilir.",
      },
      {
        title: "Birebir Görüşme & Teklif",
        clinic:
          "Platform üzerinden hastayla doğrudan yazışmayı hedefleriz; teklifi klinik verir.",
        mediQueue:
          "Mesajlaşma HTTPS ile tasarlanır. Çeviri satırı bu sitede demo metnidir.",
        previewHint:
          "Hekim ve hasta yazışması çok dilli önizlemede gösterilir.",
      },
      {
        title: "Tedavi & Hakediş",
        clinic:
          "Hastayı karşılayıp tedaviyi klinik yürütür. Peşin ajans ücreti bu sitede alınmaz.",
        mediQueue:
          "Ticari model: platform bedeli yazılı sözleşmede netleşir. Cayma sigortası veya kart tahsilatı bu sitede yoktur.",
        previewHint:
          "Ödeme ve iptal klinikle kararlaşır; MediQueue bu formdan çekim yapmaz.",
      },
    ],
    performanceTitle: "Örnek ay görünümü (demo)",
    metrics: [
      {
        label: "Aktif hastalar (örnek)",
        value: "34",
        hint: "Demo rakam — canlı panel verisi değil",
      },
      {
        label: "Bekleyen teklifler (örnek)",
        value: "8",
        hint: "Örnek liste",
      },
      {
        label: "Aylık projeksiyon (örnek)",
        value: "₺186k",
        hint: "Senaryo rakamı, gelir vaadi değil",
      },
    ],
    analytics: {
      eyebrow: "Hasta analitiği (önizleme)",
      title: "Talep ülkeleri panelde nasıl görünür",
      body:
        "Küre, katılan kliniklerin ülke kırılımını göstermek üzere tasarlanmıştır. Aşağıdaki sayılar örnek veridir.",
      panelTitle: "Hastaların geldiği ülkeler",
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
          body: "Harita örnek senaryoyu gösterir.",
        },
        {
          title: "Trend takibi",
          body: "Canlı üründe dönemsel değişim hedeflenir.",
        },
        {
          title: "Otomatik veri",
          body: "Bu sitedeki rakamlar senkron canlı feed değildir.",
        },
      ],
    },
    finalTitle: "Ajans retainer’ı olmadan uluslararası görünürlük.",
    finalBody:
      "Uluslararası hastalar kliniğinizi arıyor. Onları karşılamaya hazır mısınız?",
    finalCta: "Hemen Başlayın",
  },
  patients: {
    seoTitle: "Hastalar için",
    heroTag: "Sağlığınızı Tesadüflere Değil. Şeffaflığa Emanet Edin.",
    heroSub:
      "Aracı kurumların gizli komisyonları ve belirsiz fiyatlar geride kalsın. MEDIQUEUE; belgeleyen klinikleri kıyaslamak ve doğrudan yazışmak için tasarlanmış resmi sitedir. Bu sitedeki listeler pazarlama önizlemesidir.",
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
        body: "Seçtiğiniz kliniğe seyahat edin. İyileşme takibi klinikle planlanır; bu sitede canlı asistan paneli yoktur.",
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
          "Hızlı evrak incelemesi ve rozet durumu — örnek süreç, anlık sicil taraması değil.",
      },
      {
        title: "Müsaitlik & Takvim",
        doctor: "Haftalık müsaitlik saatlerinizi ve randevu aralıklarınızı panelde belirlersiniz.",
        mediQueue:
          "Çakışma kontrolü ve saat dilimi tasarımı; hatırlatmalar ürün hedefidir.",
      },
      {
        title: "Hasta Kabulü & İletişim",
        doctor: "Panele düşen talepleri incelersiniz. Çeviri satırı demo önizlemedir.",
        mediQueue:
          "Çift dilli mesajlaşma modeli; çeviri satırı bu sitede demodur.",
      },
    ],
    trustMessage:
      "Hekim profilleri yüklenen lisans ve uzmanlık belgelerine dayanır. Anlık devlet sicil taraması vaadi yoktur.",
    finalTitle: "Hastalar sizi arıyor.",
    finalBody: "Onlara ulaşmaya hazır mısınız?",
    finalCta: "Doktor Profilimi Oluştur",
  },
  how: {
    seoTitle: "Nasıl Çalışır",
    title: "İlk Aramadan Tedaviye: Şeffaf Süreç Nasıl İşler?",
    intro:
      "Hastalar için bu siteden ücretsiz kıyaslama ve bağlayıcı olmayan talep; klinikler için peşin ajans ücreti yok. Canlı randevu ve ödeme burada çalışmaz.",
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
        body: "Klinik hekimleriyle doğrudan yazışmayı hedefleriz. Otomatik çeviri bu sitede demo metnidir. Ödeme klinikle kararlaşır.",
      },
    ],
    techTitle: "Şeffaf karşılaştırma ve kural tabanlı filtreleme",
    techBody:
      "Aracı komisyonu eklemeyen bir model. Dil, bütçe ve tedavi notuna göre talepler yapılandırılır — kara kutu öneri motoru vaadi değil.",
    pipeline: [
      { title: "Kriter & İhtiyaç Filtresi", body: "Dil tercihi, tedavi türü ve bütçe aralığı doğrulanan hasta talepleri filtrelenir." },
      { title: "Akredite klinik listesi", body: "JCI veya eşdeğer belge sunan klinikler şeffaf sıralanmak üzere tasarlanır." },
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
        a: "Katılan klinikten JCI (veya eşdeğer) ve uluslararası sağlık turizmi belgesi isteriz. Bu, her başvurunun devlet sicilinde anlık tarandığı anlamına gelmez.",
      },
      {
        q: "Klinikler için ödeme ve komisyon modeli nasıl çalışıyor?",
        a: "Gizli acenta komisyonu modeli yoktur. Platform bedeli varsa yazılı sözleşmede belirtilir. Bu sitede kart çekimi yoktur.",
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
      "Klinikleri belirsiz reklam harcamasından kurtarmak; tedaviye hazır hastalarla şeffaf bir pazar yeri standardı kurmak.",
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
          { href: "/terms", label: "Kullanım Şartları" },
        ],
      },
    ],
    copyright: "MediQueue. Tüm hakları saklıdır.",
    sendEmail: "E-posta gönder",
    privacyNote: "Hasta gizliliği ve veri güvenliği ilk ilkemizdir.",
    medicalDisclaimer: "MediQueue bir pazar yeri platformudur. Sunulan içerikler bilgilendirme amaçlıdır ve tıbbi teşhis/tedavi tavsiyesi yerine geçmez.",
  },
  cookie: {
    message:
      "Ziyaret istatistiği için Google Analytics yalnızca siz kabul ederseniz yüklenir. Reddederseniz site aynı şekilde çalışır.",
    accept: "Kabul et",
    reject: "Reddet",
    privacy: "Gizlilik politikası",
  },
  legal: {
    updatedLabel: "Son Güncelleme",
    backHome: "Ana Sayfa'ya Dön",
    privacy: {
      title: "Gizlilik Politikası",
      intro: "Bu metin getmediqueue.com pazarlama sitesindeki formlar ve çerezler içindir. Canlı klinik yazılımı burada çalışmaz.",
      updated: "15 Eylül 2026",
      sections: [
        {
          heading: "1. Veri Toplama ve Kullanımı",
          body: "İletişim formundaki ad, e-posta, telefon ve mesaj MediQueue ekibine iletilir. Verileriniz pazarlama listelerine satılmaz. Klinik paylaşımı, sizin seçiminiz ve ekip onayı sonrası e-posta ile olur; bu sitede uçtan uca şifreli klinik yazılımı çalışmaz.",
        },
        {
          heading: "2. Kişisel veriler",
          body: "Talep formundaki bilgileri, seçtiğiniz klinikle iletişimi sağlamak için işleriz. Verilerinizin silinmesini talep edebilirsiniz. Ayrıntılı süreçler gizlilik politikasında yer alır; bu metin hukuki uygunluk belgesi değildir.",
        },
        {
          heading: "3. Çerezler ve Analitik",
          body: "Google Analytics yalnızca çerez çubuğunda kabul ederseniz yüklenir. Reddederseniz analitik betiği çalışmaz. Tercihiniz bir yıl saklanır.",
        },
        {
          heading: "4. Veri sorumlusu ve iletişim",
          body: "Pazarlama sitesi formları MediQueue ekibine iletilir. Talepleriniz için contact@getmediqueue.com adresine yazabilirsiniz. Silme veya düzeltme taleplerini aynı kanaldan iletebilirsiniz.",
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
      intro: "These terms cover the getmediqueue.com marketing site. Live clinic software, booking, and payments do not run here.",
      updated: "15 Eylül 2026",
      sections: [
        {
          heading: "1. Hizmet Kapsamı ve Pazar Yeri Modeli",
          body: "MEDIQUEUE, uluslararası hastalar ile belge sunan klinikleri aracısız buluşturmak üzere tasarlanmış bir pazar yeridir. Bu sitede acenta gibi fiyat üzerine komisyon eklenmez ve kart çekilmez. Katılım kriteri JCI veya eşdeğer belgedir; her klinik devlet onaylıdır iddiası yoktur.",
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
      updated: "15 Eylül 2026",
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
