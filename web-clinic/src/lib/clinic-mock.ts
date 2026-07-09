// Self-contained mock data for the MediQueue clinic host panel.
// This panel is a marketplace "host" console: it manages inbound platform
// patients, the clinic's public storefront, and the doctors it lists.

export type VerificationStatus = "approved" | "pending" | "missing";

export type Accreditation = {
  id: string;
  name: string;
  authority: string;
  status: VerificationStatus;
  updatedAt?: string;
};

export type Amenity = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};

export type GalleryPhoto = {
  id: string;
  title: string;
  tone: string;
};

export type ClinicProfile = {
  name: string;
  tagline: string;
  city: string;
  country: string;
  about: string;
  completion: number;
  missingItems: string[];
  accreditations: Accreditation[];
  amenities: Amenity[];
  gallery: GalleryPhoto[];
};

export const clinicProfile: ClinicProfile = {
  name: "Estetik International Hospital",
  tagline: "Saç ekimi, estetik cerrahi ve diş tedavilerinde uluslararası merkez",
  city: "İstanbul",
  country: "Türkiye",
  about:
    "2011'den bu yana 60'tan fazla ülkeden hastayı ağırlayan, JCI standartlarında hizmet veren tam donanımlı bir sağlık kuruluşuyuz. Uçtan uca hasta yolculuğunu; karşılama, tedavi ve takip süreçleriyle birlikte yönetiyoruz.",
  completion: 80,
  missingItems: [
    "JCI akreditasyon belgesi yükleyin",
    "En az 2 ameliyathane fotoğrafı ekleyin",
  ],
  accreditations: [
    {
      id: "moh",
      name: "Sağlık Bakanlığı Ruhsatı",
      authority: "T.C. Sağlık Bakanlığı",
      status: "approved",
      updatedAt: "2026-05-12",
    },
    {
      id: "tursab",
      name: "Sağlık Turizmi Yetki Belgesi",
      authority: "USHAŞ",
      status: "approved",
      updatedAt: "2026-04-02",
    },
    {
      id: "jci",
      name: "JCI Akreditasyonu",
      authority: "Joint Commission International",
      status: "pending",
      updatedAt: "2026-07-06",
    },
    {
      id: "iso",
      name: "ISO 9001 Kalite Belgesi",
      authority: "ISO",
      status: "missing",
    },
  ],
  amenities: [
    {
      id: "lang",
      label: "40+ Dil Desteği",
      description: "Çok dilli hasta danışmanları ve tercümanlar",
      enabled: true,
    },
    {
      id: "transfer",
      label: "VIP Havalimanı Transferi",
      description: "Özel şoför ile kapıdan kapıya ulaşım",
      enabled: true,
    },
    {
      id: "teleconsult",
      label: "Online Konsültasyon",
      description: "Tedavi öncesi ücretsiz video görüşme",
      enabled: true,
    },
    {
      id: "hotel",
      label: "Konaklama Paketi",
      description: "Anlaşmalı 5 yıldızlı otellerde konaklama",
      enabled: true,
    },
    {
      id: "aftercare",
      label: "Uçuş Sonrası Takip",
      description: "Ülkenize döndükten sonra dijital kontrol",
      enabled: false,
    },
    {
      id: "interpreter",
      label: "7/24 Hasta Hattı",
      description: "Kesintisiz çok dilli destek hattı",
      enabled: true,
    },
  ],
  gallery: [
    { id: "g1", title: "Resepsiyon", tone: "from-sky-400 to-blue-500" },
    { id: "g2", title: "Muayene Odası", tone: "from-teal-400 to-emerald-500" },
    { id: "g3", title: "Bekleme Salonu", tone: "from-indigo-400 to-violet-500" },
    { id: "g4", title: "Ameliyathane", tone: "from-slate-400 to-slate-600" },
    { id: "g5", title: "Hasta Odası", tone: "from-amber-400 to-orange-500" },
  ],
};

export type DashboardSummary = {
  newRequests: number;
  newRequestsDelta: number;
  activePatients: number;
  activePatientsDelta: number;
  profileViews: number;
  profileViewsDelta: number;
  expectedRevenue: number;
  expectedRevenueDelta: number;
};

export const dashboardSummary: DashboardSummary = {
  newRequests: 14,
  newRequestsDelta: 22,
  activePatients: 38,
  activePatientsDelta: 9,
  profileViews: 6420,
  profileViewsDelta: 17,
  expectedRevenue: 486000,
  expectedRevenueDelta: 12,
};

export type UpcomingAppointment = {
  id: string;
  time: string;
  dateLabel: string;
  patient: string;
  country: string;
  treatment: string;
  doctor: string;
  mode: "Yüz yüze" | "Online";
};

export const upcomingAppointments: UpcomingAppointment[] = [
  {
    id: "u1",
    time: "09:30",
    dateLabel: "Bugün",
    patient: "Ahmed Al-Farsi",
    country: "Katar",
    treatment: "Saç Ekimi Konsültasyonu",
    doctor: "Dr. Kerem Aksoy",
    mode: "Yüz yüze",
  },
  {
    id: "u2",
    time: "11:00",
    dateLabel: "Bugün",
    patient: "Sophie Laurent",
    country: "Fransa",
    treatment: "Rinoplasti Ön Görüşme",
    doctor: "Dr. Elif Demir",
    mode: "Online",
  },
  {
    id: "u3",
    time: "14:15",
    dateLabel: "Bugün",
    patient: "James Whitfield",
    country: "İngiltere",
    treatment: "Diş İmplantı Planlama",
    doctor: "Dr. Mert Yılmaz",
    mode: "Yüz yüze",
  },
  {
    id: "u4",
    time: "10:00",
    dateLabel: "Yarın",
    patient: "Fatima Noor",
    country: "BAE",
    treatment: "Meme Estetiği Değerlendirme",
    doctor: "Dr. Elif Demir",
    mode: "Online",
  },
  {
    id: "u5",
    time: "16:30",
    dateLabel: "Yarın",
    patient: "Liam O'Brien",
    country: "İrlanda",
    treatment: "Saç Ekimi Operasyonu",
    doctor: "Dr. Kerem Aksoy",
    mode: "Yüz yüze",
  },
];

export type RequestStatus = "pending" | "approved" | "rejected";

export type AppointmentRequest = {
  id: string;
  patient: string;
  initials: string;
  age: number;
  gender: "Kadın" | "Erkek";
  country: string;
  city: string;
  treatment: string;
  symptom: string;
  requestedDate: string;
  budget: string;
  language: string;
  status: RequestStatus;
  createdAt: string;
};

export const appointmentRequests: AppointmentRequest[] = [
  {
    id: "r1",
    patient: "Ahmed Al-Farsi",
    initials: "AA",
    age: 34,
    gender: "Erkek",
    country: "Katar",
    city: "Doha",
    treatment: "Saç Ekimi (DHI)",
    symptom: "Ön saç çizgisinde belirgin dökülme, 3. seviye erkek tipi kelliğe doğru ilerliyor.",
    requestedDate: "24 Tem 2026",
    budget: "€2.000 - €3.500",
    language: "Arapça, İngilizce",
    status: "pending",
    createdAt: "2 saat önce",
  },
  {
    id: "r2",
    patient: "Sophie Laurent",
    initials: "SL",
    age: 29,
    gender: "Kadın",
    country: "Fransa",
    city: "Lyon",
    treatment: "Rinoplasti",
    symptom: "Burun kemeri ve nefes almada zorluk; hem estetik hem fonksiyonel düzeltme talep ediyor.",
    requestedDate: "2 Ağu 2026",
    budget: "€3.000 - €5.000",
    language: "Fransızca, İngilizce",
    status: "pending",
    createdAt: "5 saat önce",
  },
  {
    id: "r3",
    patient: "James Whitfield",
    initials: "JW",
    age: 47,
    gender: "Erkek",
    country: "İngiltere",
    city: "Manchester",
    treatment: "Diş İmplantı (All-on-4)",
    symptom: "Üst çenede birden fazla eksik diş; sabit protez çözümü arıyor.",
    requestedDate: "18 Tem 2026",
    budget: "£4.000 - £6.000",
    language: "İngilizce",
    status: "pending",
    createdAt: "1 gün önce",
  },
  {
    id: "r4",
    patient: "Fatima Noor",
    initials: "FN",
    age: 38,
    gender: "Kadın",
    country: "BAE",
    city: "Dubai",
    treatment: "Meme Estetiği",
    symptom: "Doğum sonrası şekil kaybı; kombine dikleştirme ve büyütme değerlendirmesi istiyor.",
    requestedDate: "9 Ağu 2026",
    budget: "$5.000 - $7.500",
    language: "Arapça, İngilizce",
    status: "approved",
    createdAt: "2 gün önce",
  },
  {
    id: "r5",
    patient: "Liam O'Brien",
    initials: "LO",
    age: 41,
    gender: "Erkek",
    country: "İrlanda",
    city: "Dublin",
    treatment: "Saç Ekimi (Safir FUE)",
    symptom: "Tepe bölgesinde seyrelme; doğal görünümlü yoğunlaştırma istiyor.",
    requestedDate: "28 Tem 2026",
    budget: "€2.500 - €4.000",
    language: "İngilizce",
    status: "approved",
    createdAt: "3 gün önce",
  },
  {
    id: "r6",
    patient: "Elena Popescu",
    initials: "EP",
    age: 52,
    gender: "Kadın",
    country: "Romanya",
    city: "Bükreş",
    treatment: "Yüz Germe",
    symptom: "Orta yüz sarkması; minimal iz bırakan cerrahi yöntem araştırıyor.",
    requestedDate: "14 Ağu 2026",
    budget: "€4.000 - €6.500",
    language: "Romence, İngilizce",
    status: "rejected",
    createdAt: "4 gün önce",
  },
];

export type DoctorStatus = "active" | "pending";

export type Doctor = {
  id: string;
  name: string;
  initials: string;
  specialty: string;
  experienceYears: number;
  startingPrice: number;
  currency: "€" | "$" | "₺";
  rating: number;
  reviewCount: number;
  languages: string[];
  status: DoctorStatus;
  tone: string;
};

export const doctors: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Kerem Aksoy",
    initials: "KA",
    specialty: "Saç Ekimi & Estetik",
    experienceYears: 14,
    startingPrice: 1900,
    currency: "€",
    rating: 4.9,
    reviewCount: 212,
    languages: ["Türkçe", "İngilizce", "Arapça"],
    status: "active",
    tone: "from-sky-400 to-blue-500",
  },
  {
    id: "d2",
    name: "Dr. Elif Demir",
    initials: "ED",
    specialty: "Plastik & Rekonstrüktif Cerrahi",
    experienceYears: 18,
    startingPrice: 2800,
    currency: "€",
    rating: 4.8,
    reviewCount: 176,
    languages: ["Türkçe", "İngilizce", "Fransızca"],
    status: "active",
    tone: "from-teal-400 to-emerald-500",
  },
  {
    id: "d3",
    name: "Dr. Mert Yılmaz",
    initials: "MY",
    specialty: "Ağız & Diş Sağlığı, İmplantoloji",
    experienceYears: 11,
    startingPrice: 1200,
    currency: "€",
    rating: 4.7,
    reviewCount: 143,
    languages: ["Türkçe", "İngilizce"],
    status: "active",
    tone: "from-indigo-400 to-violet-500",
  },
  {
    id: "d4",
    name: "Dr. Selin Kaya",
    initials: "SK",
    specialty: "Dermatoloji & Medikal Estetik",
    experienceYears: 9,
    startingPrice: 900,
    currency: "€",
    rating: 4.9,
    reviewCount: 98,
    languages: ["Türkçe", "İngilizce", "Almanca"],
    status: "pending",
    tone: "from-rose-400 to-pink-500",
  },
];

export type ConsultationStatus = "new" | "quoted" | "accepted" | "expired";

export type ConsultationAttachment = {
  id: string;
  label: string;
  type: "photo" | "document";
  tone: string;
};

export type ConsultationRequest = {
  id: string;
  patient: string;
  initials: string;
  country: string;
  treatment: string;
  note: string;
  attachments: ConsultationAttachment[];
  status: ConsultationStatus;
  createdAt: string;
  quotedPrice?: number;
  currency: "€" | "$" | "£";
  packageName?: string;
};

export const consultationRequests: ConsultationRequest[] = [
  {
    id: "c1",
    patient: "Ahmed Al-Farsi",
    initials: "AA",
    country: "Katar",
    treatment: "Saç Ekimi (DHI)",
    note: "Ön saç çizgisi ve tepe bölgesi fotoğrafları eklendi. 3500 greft civarı tahmin ediyorum, VIP paket fiyatı istiyor.",
    attachments: [
      { id: "a1", label: "Ön görünüm", type: "photo", tone: "from-slate-500 to-slate-700" },
      { id: "a2", label: "Tepe bölgesi", type: "photo", tone: "from-slate-600 to-slate-800" },
      { id: "a3", label: "Yan profil", type: "photo", tone: "from-slate-400 to-slate-600" },
    ],
    status: "new",
    createdAt: "3 saat önce",
    currency: "€",
  },
  {
    id: "c2",
    patient: "Sophie Laurent",
    initials: "SL",
    country: "Fransa",
    treatment: "Rinoplasti",
    note: "Burun profil fotoğrafları ve önceki MR raporu yüklendi. Fonksiyonel + estetik kombine paket teklifi bekliyor.",
    attachments: [
      { id: "a4", label: "Profil fotoğrafı", type: "photo", tone: "from-rose-400 to-pink-500" },
      { id: "a5", label: "MR Raporu", type: "document", tone: "from-sky-400 to-blue-500" },
    ],
    status: "new",
    createdAt: "6 saat önce",
    currency: "€",
  },
  {
    id: "c3",
    patient: "James Whitfield",
    initials: "JW",
    country: "İngiltere",
    treatment: "Diş İmplantı (All-on-4)",
    note: "Panoramik röntgen ve ağız içi fotoğraflar eklendi. Üst çene tam protez için fiyat teklifi isteniyor.",
    attachments: [
      { id: "a6", label: "Panoramik röntgen", type: "document", tone: "from-indigo-400 to-violet-500" },
      { id: "a7", label: "Ağız içi", type: "photo", tone: "from-teal-400 to-emerald-500" },
    ],
    status: "quoted",
    createdAt: "1 gün önce",
    quotedPrice: 5200,
    currency: "£",
    packageName: "All-on-4 Premium Paket",
  },
  {
    id: "c4",
    patient: "Fatima Noor",
    initials: "FN",
    country: "BAE",
    treatment: "Meme Estetiği",
    note: "Referans fotoğraflar ve vücut ölçüleri paylaşıldı. Kombine dikleştirme + implant teklifi.",
    attachments: [
      { id: "a8", label: "Referans 1", type: "photo", tone: "from-amber-400 to-orange-500" },
      { id: "a9", label: "Referans 2", type: "photo", tone: "from-amber-500 to-orange-600" },
    ],
    status: "accepted",
    createdAt: "2 gün önce",
    quotedPrice: 6800,
    currency: "$",
    packageName: "Kombine Estetik Paketi",
  },
  {
    id: "c5",
    patient: "Elena Popescu",
    initials: "EP",
    country: "Romanya",
    treatment: "Yüz Germe",
    note: "Orta yüz sarkması için minimal iz bırakan yöntem araştırıyor. Teklif süresi doldu.",
    attachments: [
      { id: "a10", label: "Yüz fotoğrafı", type: "photo", tone: "from-violet-400 to-purple-500" },
    ],
    status: "expired",
    createdAt: "5 gün önce",
    quotedPrice: 4500,
    currency: "€",
    packageName: "Mini Yüz Germe",
  },
];
