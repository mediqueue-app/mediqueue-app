export type TrustBlock = {
  eyebrow: string;
  title: string;
  body: string;
  check1: string;
  check2: string;
  badges: { title: string; subtitle: string; tag: string }[];
};

export type ShowcaseBlock = {
  title: string;
  intro: string;
  items: { id: string; title: string; body: string }[];
};

export type ScreensContent = {
  verified: string;
  clinicsTrust: TrustBlock;
  doctorsTrust: TrustBlock;
  clinicsShowcase: ShowcaseBlock;
  patientsShowcase: ShowcaseBlock;
  patientGuideEyebrow: string;
  patientSafetyHighlight: string;
  patientSafetyBody: string;
  patientJourneyExtra: {
    patientRole: string;
    patientText: string;
    mqRole: string;
    mqText: string;
  }[];
  clinicRoadmapEyebrow: string;
  clinicYourAction: string;
  clinicPlatform: string;
  clinicVerifyTitle: string;
  clinicVerifyBadge: string;
  clinicLicense: string;
  clinicMultilingual: string;
  clinicPrivacy: string;
  clinicPrivacyValue: string;
  doctorRoadmapEyebrow: string;
  doctorAction: string;
  doctorWorkflow: string;
  doctorVerifyTitle: string;
  doctorVerifyBadge: string;
  doctorLicense: string;
  doctorJci: string;
  doctorJciValue: string;
  doctorVisibility: string;
  doctorDemo: Record<string, string>;
  travel: Record<string, string>;
  recovery: Record<string, string>;
  discover: Record<string, string>;
  request: Record<string, string>;
  chat: Record<string, string>;
  schedule: Record<string, string>;
  discoveryCard: Record<string, string>;
};

export const trScreens: ScreensContent = {
  verified: "Doğrulandı",
  clinicsTrust: {
    eyebrow: "Belgeleyen klinikler hedeflenir",
    title: "Lisans ve akreditasyon kriterleriyle listeleme",
    body: "MediQueue’ye katılan klinikten uluslararası sağlık turizmi belgesi ve JCI (veya eşdeğer) kanıtı isteriz. Bu, her ülkedeki tüm klinikleri taradığımız veya sahteciliği sıfırladığımız anlamına gelmez — henüz kapalı bir canlı ağ yoktur.",
    check1: "Belge sunan sağlık kuruluşları",
    check2: "Açık listeleme kriteri — canlı tarama iddiası yok",
    badges: [
      {
        title: "Uluslararası sağlık turizmi belgesi",
        subtitle: "Katılım için istenen resmi yetki belgesi",
        tag: "Kriter",
      },
      {
        title: "JCI veya eşdeğer kalite belgesi",
        subtitle: "Küresel hasta güvenliği standartlarına referans",
        tag: "Kriter",
      },
      {
        title: "Kadrosu belgelenen klinik",
        subtitle: "Hekim ve tesis bilgisi klinikten gelir; biz bağımsız denetçi değiliz",
        tag: "Beyan",
      },
    ],
  },
  doctorsTrust: {
    eyebrow: "Lisans beyanı ile profil",
    title: "Onaylı lisans bilgisiyle yayınlanan hekim profilleri",
    body: "Hekim panelinde yayınlanan profiller lisans ve uzmanlık belgesi yüklemeye dayanır. Bu, her diplomanın devlet sicilinde anlık doğrulandığı anlamına gelmez.",
    check1: "Belge yükleyen uzman hekimler",
    check2: "Mesajlaşma şifreli kanallarla tasarlanır",
    badges: [
      {
        title: "Tıp lisansı ve diploma yüklemesi",
        subtitle: "Hekimden istenen resmi belgeler",
        tag: "Süreç",
      },
      {
        title: "JCI / uzmanlık belgesi",
        subtitle: "Varsa klinik veya hekim akreditasyonu gösterilir",
        tag: "Rozet",
      },
      {
        title: "Hasta yorumları (hedef)",
        subtitle: "Şeffaf puanlama planlanır; canlı skorlar demo olabilir",
        tag: "Demo",
      },
    ],
  },
  clinicsShowcase: {
    title: "Uluslararası talebi tek panelde görmek için tasarlandı",
    intro: "Aşağıdaki ekranlar ürün önizlemesidir. Canlı klinik paneli bu sitede çalışmaz.",
    items: [
      {
        id: "requests",
        title: "Talep yönetim paneli",
        body: "Bütçe, dil ve tedavi notuyla gelen talepleri incelemek için tasarlanmış demo ekran.",
      },
      {
        id: "analytics",
        title: "Ülke kırılımı ve küre",
        body: "Harita örnek veridir; gerçek hasta sayınızı göstermez.",
      },
      {
        id: "direct",
        title: "Doğrudan mesajlaşma",
        body: "Aracısız yazışma hedeflenir. Otomatik çeviri canlı ürün vaadi değil, demo metnidir.",
      },
      {
        id: "schedule",
        title: "Takvim ve randevu",
        body: "Hekim ve oda müsaitliğini uluslararası taleple eşlemek için tasarlanmış önizleme.",
      },
    ],
  },
  patientsShowcase: {
    title: "Tedavi arayışını şeffaf tutmak için tasarlanmış ekranlar",
    intro: "Keşif, talep ve takip ekranları pazarlama önizlemesidir; canlı hasta uygulaması bu sitede yoktur.",
    items: [
      {
        id: "compare",
        title: "Akredite klinikleri kıyaslayın",
        body: "Fiyat, belge ve hekim bilgisi yan yana gösterilir — örnek klinik kartları.",
      },
      {
        id: "chat",
        title: "Doğrudan mesajlaşın",
        body: "Komisyonsuz yazışma modeli. Çeviri satırı demo amaçlıdır.",
      },
      {
        id: "request",
        title: "Ön ödemesiz talep",
        body: "Bu sitedeki form bağlayıcı randevu veya kart çekimi değildir.",
      },
      {
        id: "travel",
        title: "Seyahat ve takip",
        body: "Transfer ve otel kartları örnek senaryodur; paket satışı bu sitede yok.",
      },
    ],
  },
  patientGuideEyebrow: "Adım adım hasta rehberi",
  patientSafetyHighlight: "Öne çıkan güven unsuru",
  patientSafetyBody:
    "Görüşmeler talep kaydı üzerinden yürür; kimliğiniz herkese açık listelenmez.",
  patientJourneyExtra: [
    {
      patientRole: "Özgür seçim",
      patientText: "Acenta yönlendirmesi olmadan bütçe ve konuma göre klinikleri kıyaslayın (demo listeler).",
      mqRole: "Şeffaf karşılaştırma",
      mqText: "Paket fiyatı ve belge alanları örnek klinik kartlarında gösterilir.",
    },
    {
      patientRole: "Ön ödemesiz başvuru",
      patientText: "Bu siteden talep göndermek kart veya depozito gerektirmez.",
      mqRole: "Veri gizliliği",
      mqText: "İletişim bilgisi, onayladığınız kliniklerle paylaşılmak üzere işlenir.",
    },
    {
      patientRole: "Doğrudan mesajlaşma",
      patientText: "Hedef: soruları hekime iletmek. Canlı çeviri motoru bu sitede yok.",
      mqRole: "Çift dilli demo",
      mqText: "Önizlemede örnek çeviri satırı gösterilir; üretim vaadi değildir.",
    },
    {
      patientRole: "Tedavi ve dönüş",
      patientText: "Seyahat ve iyileşme adımları klinikle planlanır; MediQueue hastane değildir.",
      mqRole: "Takip ekranı (demo)",
      mqText: "İyileşme zaman çizelgesi örnek bir hasta paneli görünümüdür.",
    },
  ],
  clinicRoadmapEyebrow: "Adım adım büyüme rehberi",
  clinicYourAction: "Sizin adımınız",
  clinicPlatform: "Platform tarafı",
  clinicVerifyTitle: "Akreditasyon ve profil doğrulama",
  clinicVerifyBadge: "Örnek onaylı profil",
  clinicLicense: "JCI ve sağlık lisansı",
  clinicMultilingual: "Çok dilli profil sunumu",
  clinicPrivacy: "Hasta mahremiyeti",
  clinicPrivacyValue: "Gizlilik öncelikli",
  doctorRoadmapEyebrow: "Hekim yol haritası",
  doctorAction: "Hekim adımı",
  doctorWorkflow: "Panel akışı",
  doctorVerifyTitle: "Belge yükleme ve rozet durumu",
  doctorVerifyBadge: "Örnek uzman profili",
  doctorLicense: "Tıp lisansı ve diploma",
  doctorJci: "JCI / uzmanlık belgesi",
  doctorJciValue: "Rozet (örnek)",
  doctorVisibility: "Uluslararası görünürlük",
  doctorDemo: {
    todayPatients: "Bugünün programı ve hastaları",
    overviewReady: "Günün özeti (demo)",
    viewFlow: "Tüm akışı gör",
    activeRecords: "4 örnek hasta kaydı",
    recordsVerified: "Kayıtlar örnek veridir",
    chatActive: "Örnek hekim–hasta mesajı",
    detailedList: "Ayrıntılı liste →",
    july: "Temmuz 2026",
    weeklyCal: "Haftalık müsaitlik (demo)",
    hair: "Saç ekimi DHI",
    consult: "Konsültasyon",
    rhino: "Rinoplasti takip",
    conflict: "Çakışma kontrolü (tasarım)",
    manageSlots: "Saatleri yönet →",
    translatedChat: "Çevirili sohbet (demo)",
    activeSession: "Örnek görüşme",
    arDe: "Arapça / Almanca",
    autoLang: "Örnek otomatik dil satırı",
    french: "Fransızca",
    jciBadge: "JCI rozeti (örnek)",
    viewSchedule: "Tüm programı gör →",
    msgPlaceholder: "Mesajınızı yazın — çeviri satırı demoda gösterilir...",
  },
  travel: {
    chrome: "Seyahat ve transfer (demo)",
    intro: "Aşağıdaki hizmetler isteğe bağlıdır — örnek senaryo.",
    flight: "Uçuş koordinasyonu",
    date: "Tarih",
    seat: "Koltuk",
    stay: "Konaklama",
    partnerHotel: "Örnek partner otel",
    stars: "4 yıldız",
    nights: "3 gece konaklama",
    vip: "VIP ulaşım",
    airport: "Havalimanı ↔ klinik",
    vehicle: "Özel transfer aracı",
    interpreter: "Tercüman",
    langs: "Almanca · Türkçe",
    escort: "Klinik görüşmelerinde eşlik (örnek)",
  },
  recovery: {
    panel: "Hasta paneli",
    title: "İyileşme takibi (demo)",
    day: "Gün 3 / 14 — örnek süreç",
    progress: "İlerleme",
    today: "Bugün: pansuman (örnek)",
    tomorrow: "Yarın: video kontrol — 14:00 (örnek)",
    done: "Tamamlandı: ilk kontrol formu",
    chat: "Asistanla sohbet (demo)",
    support: "Klinik koordinasyon metni",
  },
  discover: {
    search: "Tedavi, şehir veya tarih…",
    hair: "Saç ekimi",
    city: "İstanbul",
    month: "Eyl 2026",
  },
  request: {
    chrome: "Randevu talebi (demo)",
    profile: "Hasta profili",
    hidden: "Kimlik gizli",
    treatment: "Tedavi türü",
    treatmentVal: "Saç ekimi (DHI)",
    dates: "Tercih edilen tarih aralığı",
    datesVal: "15–30 Eyl 2026",
    budget: "Bütçe aralığı",
    lang: "Dil tercihi",
    langVal: "Almanca, İngilizce",
    send: "Talebi gönder",
  },
  chat: {
    title: "Hasta mesajları",
    translate: "Örnek çeviri",
    translated: "Örnek çevrildi satırı",
    original: "Orijinal",
  },
  schedule: {
    pending: "Bekleyen",
    approved: "Onaylanan",
    all: "Tümü",
    chrome: "Bugünün programı (demo)",
    title: "Bugünün programı",
    subtitle: "Hastalarım, takvim ve hekim paneli — önizleme.",
  },
  discoveryCard: {
    sampleC: "Örnek klinik C",
    live: "Örnek klinik kıyaslama",
    sampleA: "Örnek klinik A",
    loc: "İstanbul, Türkiye",
    treatment: "Aranan tedavi",
    rhino: "Rinoplasti (burun estetiği)",
    price: "Şeffaf paket fiyatı",
    inclusive: "(örnek, her şey dahil değil iddiası)",
    comm: "İletişim modeli",
    direct: "Aracısız · örnek hekim görüşmesi",
    cta: "Ücretsiz teklif iste (form)",
  },
};

export const enScreens: ScreensContent = {
  verified: "Verified (sample)",
  clinicsTrust: {
    eyebrow: "Listing criteria, not a live census",
    title: "Clinics are asked for licenses and accreditation evidence",
    body: "Clinics that join MediQueue are asked for an international health-tourism permit and JCI (or equivalent) evidence. That is a joining rule, not a claim that we have audited every clinic on earth or eliminated fraud.",
    check1: "Providers that submit documents",
    check2: "Open listing rules — not a live nationwide scan",
    badges: [
      {
        title: "International health tourism permit",
        subtitle: "Authorization we ask for at onboarding",
        tag: "Criterion",
      },
      {
        title: "JCI or equivalent quality certificate",
        subtitle: "Referenced patient-safety standard",
        tag: "Criterion",
      },
      {
        title: "Clinic-declared faculty",
        subtitle: "Staff and facility details come from the clinic; we are not a state inspector",
        tag: "Declaration",
      },
    ],
  },
  doctorsTrust: {
    eyebrow: "Profiles based on uploaded licenses",
    title: "Doctor profiles published with submitted credentials",
    body: "Profiles in the doctor panel are based on uploaded licenses and specialty documents. That is not the same as instant government-registry verification of every diploma.",
    check1: "Specialists who upload documents",
    check2: "Messaging designed for encrypted channels",
    badges: [
      {
        title: "Medical license and diploma upload",
        subtitle: "Documents requested from the physician",
        tag: "Process",
      },
      {
        title: "JCI / specialty certificate",
        subtitle: "Shown when the clinic or doctor provides it",
        tag: "Badge",
      },
      {
        title: "Patient reviews (planned)",
        subtitle: "Transparent ratings are the goal; scores on this site may be demo",
        tag: "Demo",
      },
    ],
  },
  clinicsShowcase: {
    title: "Designed to see international demand in one panel",
    intro: "These screens are product previews. The live clinic app does not run on this marketing site.",
    items: [
      {
        id: "requests",
        title: "Request management panel",
        body: "Demo of reviewing requests tagged with budget, language, and treatment notes.",
      },
      {
        id: "analytics",
        title: "Country breakdown and globe",
        body: "Map data is sample only; it is not your real patient count.",
      },
      {
        id: "direct",
        title: "Direct messaging",
        body: "The model is unmediated chat. Auto-translation here is demo copy, not a live engine.",
      },
      {
        id: "schedule",
        title: "Calendar and scheduling",
        body: "Preview of matching physician and room availability with incoming requests.",
      },
    ],
  },
  patientsShowcase: {
    title: "Screens designed to keep the search transparent",
    intro: "Discovery, request, and follow-up views are marketing previews. The live patient app is not hosted here.",
    items: [
      {
        id: "compare",
        title: "Compare accredited clinics",
        body: "Price, credentials, and doctor fields shown side by side on sample cards.",
      },
      {
        id: "chat",
        title: "Message directly",
        body: "Commission-free chat is the model. Translation lines are illustrative.",
      },
      {
        id: "request",
        title: "Request with no upfront payment",
        body: "The form on this site is not a binding booking or a card charge.",
      },
      {
        id: "travel",
        title: "Travel and follow-up",
        body: "Transfer and hotel cards are a scenario — this site does not sell packages.",
      },
    ],
  },
  patientGuideEyebrow: "Step-by-step patient guide",
  patientSafetyHighlight: "Key safety highlight",
  patientSafetyBody:
    "Conversations stay on the request record; your identity is not listed publicly.",
  patientJourneyExtra: [
    {
      patientRole: "Free selection",
      patientText: "Compare clinics by budget and location without an agency steering you (demo lists).",
      mqRole: "Transparent comparison",
      mqText: "Package price and credential fields appear on sample clinic cards.",
    },
    {
      patientRole: "No-upfront request",
      patientText: "Sending a request from this site does not require a card or deposit.",
      mqRole: "Data privacy",
      mqText: "Contact details are processed to reach clinics you choose.",
    },
    {
      patientRole: "Direct messaging",
      patientText: "The goal is to ask the treating doctor. There is no live translation engine on this site.",
      mqRole: "Bilingual demo",
      mqText: "The preview shows a sample translated line; it is not a production promise.",
    },
    {
      patientRole: "Care and return",
      patientText: "Travel and recovery are planned with the clinic; MediQueue is not a hospital.",
      mqRole: "Follow-up screen (demo)",
      mqText: "The recovery timeline is a sample patient-panel view.",
    },
  ],
  clinicRoadmapEyebrow: "Step-by-step growth guide",
  clinicYourAction: "Your action",
  clinicPlatform: "Platform side",
  clinicVerifyTitle: "Accreditation and profile checks",
  clinicVerifyBadge: "Sample approved profile",
  clinicLicense: "JCI and health license",
  clinicMultilingual: "Multilingual profile",
  clinicPrivacy: "Patient privacy",
  clinicPrivacyValue: "Privacy-first handling",
  doctorRoadmapEyebrow: "Doctor roadmap",
  doctorAction: "Doctor action",
  doctorWorkflow: "Panel workflow",
  doctorVerifyTitle: "Document upload and badge status",
  doctorVerifyBadge: "Sample specialist profile",
  doctorLicense: "Medical license and diploma",
  doctorJci: "JCI / specialty certificate",
  doctorJciValue: "Badge (sample)",
  doctorVisibility: "International visibility",
  doctorDemo: {
    todayPatients: "Today's schedule and patients",
    overviewReady: "Daily overview (demo)",
    viewFlow: "View full flow",
    activeRecords: "4 sample patient records",
    recordsVerified: "Records are sample data",
    chatActive: "Sample doctor–patient message",
    detailedList: "Detailed list →",
    july: "July 2026",
    weeklyCal: "Weekly availability (demo)",
    hair: "Hair transplant DHI",
    consult: "Consultation",
    rhino: "Rhinoplasty follow-up",
    conflict: "Conflict check (design)",
    manageSlots: "Manage slots →",
    translatedChat: "Translated chat (demo)",
    activeSession: "Sample session",
    arDe: "Arabic / German",
    autoLang: "Sample auto-language line",
    french: "French",
    jciBadge: "JCI badge (sample)",
    viewSchedule: "View full schedule →",
    msgPlaceholder: "Type a message — translation is demo copy...",
  },
  travel: {
    chrome: "Travel and transfer (demo)",
    intro: "The services below are optional — sample scenario.",
    flight: "Flight coordination",
    date: "Date",
    seat: "Seat",
    stay: "Accommodation",
    partnerHotel: "Sample partner hotel",
    stars: "4 stars",
    nights: "3 nights",
    vip: "VIP transfer",
    airport: "Airport ↔ clinic",
    vehicle: "Private transfer vehicle",
    interpreter: "Interpreter",
    langs: "German · Turkish",
    escort: "Support during clinic visits (sample)",
  },
  recovery: {
    panel: "Patient panel",
    title: "Recovery tracking (demo)",
    day: "Day 3 / 14 — sample timeline",
    progress: "Progress",
    today: "Today: dressing change (sample)",
    tomorrow: "Tomorrow: video check-in — 14:00 (sample)",
    done: "Done: initial check-in form",
    chat: "Chat with assistant (demo)",
    support: "Clinic coordination copy",
  },
  discover: {
    search: "Treatment, city, or date…",
    hair: "Hair transplant",
    city: "Istanbul",
    month: "Sep 2026",
  },
  request: {
    chrome: "Appointment request (demo)",
    profile: "Patient profile",
    hidden: "Identity hidden",
    treatment: "Treatment type",
    treatmentVal: "Hair transplant (DHI)",
    dates: "Preferred date range",
    datesVal: "Sep 15–30, 2026",
    budget: "Budget range",
    lang: "Language preference",
    langVal: "German, English",
    send: "Send request",
  },
  chat: {
    title: "Patient messages",
    translate: "Sample translation",
    translated: "Sample translated line",
    original: "Original",
  },
  schedule: {
    pending: "Pending",
    approved: "Approved",
    all: "All",
    chrome: "Today's schedule (demo)",
    title: "Today's schedule",
    subtitle: "My patients, calendar, and doctor panel — preview.",
  },
  discoveryCard: {
    sampleC: "Sample clinic C",
    live: "Sample clinic comparison",
    sampleA: "Sample clinic A",
    loc: "Istanbul, Turkey",
    treatment: "Treatment",
    rhino: "Rhinoplasty",
    price: "Transparent package price",
    inclusive: "(sample range, not a live quote)",
    comm: "Communication",
    direct: "Direct · sample doctor chat",
    cta: "Request a free quote (form)",
  },
};
