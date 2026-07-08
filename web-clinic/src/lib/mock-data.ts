import type {
  ActivityItem,
  BranchRevenueShare,
  ClinicMetrics,
  ClinicProfile,
  ContactMessage,
  Doctor,
  FunnelStage,
  OriginShare,
  PatientDocument,
  PatientLead,
  PlanFeature,
  RegionalComparison,
  TrendPoint,
  TreatmentDemand,
} from "@/types";
import { mockDateKey, mockDateTime, isMockToday } from "@/lib/mock-date";

type DocumentTemplate = Omit<PatientDocument, "uploadedAt"> & {
  uploadedDayOffset: number;
};

type LeadTemplate = Omit<
  PatientLead,
  "requestedDate" | "createdAt" | "documents" | "contactHistory"
> & {
  requestedDayOffset: number;
  createdDayOffset: number;
  createdTime: string;
  documentTemplates: DocumentTemplate[];
  contactHistory?: ContactMessage[];
};

const leadTemplates: LeadTemplate[] = [
  {
    id: "LD-1042",
    fullName: "Klaus Richter",
    country: "Almanya",
    countryCode: "DE",
    branch: "Saç Ekimi",
    requestedDayOffset: 1,
    createdDayOffset: 0,
    createdTime: "09:42",
    status: "BEKLEMEDE",
    phone: "+49 176 2231 8890",
    email: "klaus.richter@example.de",
    responseTimeHours: 3.5,
    documentTemplates: [
      { id: "DOC-1", type: "PASAPORT", fileName: "passport_klaus.pdf", uploadedDayOffset: -4, fileSizeKb: 842 },
      { id: "DOC-2", type: "TIBBI_RAPOR", fileName: "kan_tahlili_klaus.pdf", uploadedDayOffset: -4, fileSizeKb: 1203 },
    ],
  },
  {
    id: "LD-1041",
    fullName: "Fatima Al-Sayed",
    country: "Suudi Arabistan",
    countryCode: "SA",
    branch: "Estetik Cerrahi",
    requestedDayOffset: 3,
    createdDayOffset: -3,
    createdTime: "07:40",
    status: "ONAYLANDI",
    phone: "+966 50 123 4567",
    email: "fatima.alsayed@example.sa",
    assignedDoctor: "Op. Dr. Elif Yılmaz",
    documentTemplates: [
      { id: "DOC-3", type: "PASAPORT", fileName: "passport_fatima.pdf", uploadedDayOffset: -5, fileSizeKb: 765 },
      { id: "DOC-4", type: "VIZE", fileName: "vize_fatima.pdf", uploadedDayOffset: -5, fileSizeKb: 511 },
    ],
  },
  {
    id: "LD-1040",
    fullName: "Igor Petrov",
    country: "Rusya",
    countryCode: "RU",
    branch: "Diş Tedavisi",
    requestedDayOffset: -1,
    createdDayOffset: 0,
    createdTime: "08:15",
    status: "BEKLEMEDE",
    phone: "+7 916 234 5566",
    email: "igor.petrov@example.ru",
    documentTemplates: [
      { id: "DOC-5", type: "PASAPORT", fileName: "passport_igor.pdf", uploadedDayOffset: -6, fileSizeKb: 690 },
    ],
  },
  {
    id: "LD-1039",
    fullName: "James Whitfield",
    country: "Birleşik Krallık",
    countryCode: "GB",
    branch: "Göz (LASIK)",
    requestedDayOffset: -2,
    createdDayOffset: -4,
    createdTime: "21:14",
    status: "IPTAL_EDILDI",
    phone: "+44 7700 900123",
    email: "james.whitfield@example.co.uk",
    notes: "Uygun tarih bulunamadı, hasta başka klinik ile görüşüyor.",
    responseTimeHours: 18,
    documentTemplates: [
      { id: "DOC-6", type: "PASAPORT", fileName: "passport_james.pdf", uploadedDayOffset: -7, fileSizeKb: 588 },
    ],
  },
  {
    id: "LD-1038",
    fullName: "Amina Haddad",
    country: "Irak",
    countryCode: "IQ",
    branch: "Bariatrik Cerrahi",
    requestedDayOffset: 5,
    createdDayOffset: -4,
    createdTime: "18:02",
    status: "ONAYLANDI",
    phone: "+964 770 123 4567",
    email: "amina.haddad@example.iq",
    assignedDoctor: "Prof. Dr. Mehmet Kaya",
    documentTemplates: [
      { id: "DOC-7", type: "PASAPORT", fileName: "passport_amina.pdf", uploadedDayOffset: -6, fileSizeKb: 720 },
      { id: "DOC-8", type: "TIBBI_RAPOR", fileName: "rapor_amina.pdf", uploadedDayOffset: -5, fileSizeKb: 980 },
      { id: "DOC-9", type: "SIGORTA", fileName: "sigorta_amina.pdf", uploadedDayOffset: -5, fileSizeKb: 410 },
    ],
  },
  {
    id: "LD-1037",
    fullName: "Youssef Ben Ali",
    country: "Libya",
    countryCode: "LY",
    branch: "Ortopedi",
    requestedDayOffset: 2,
    createdDayOffset: -4,
    createdTime: "15:47",
    status: "ALTERNATIF_TARIH",
    phone: "+218 91 234 5678",
    email: "youssef.benali@example.ly",
    notes: "Hasta 12-15 Haziran aralığı için alternatif tarih bekliyor.",
    responseTimeHours: 6,
    documentTemplates: [
      { id: "DOC-10", type: "PASAPORT", fileName: "passport_youssef.pdf", uploadedDayOffset: -6, fileSizeKb: 655 },
    ],
  },
  {
    id: "LD-1036",
    fullName: "Sophie Bernard",
    country: "Fransa",
    countryCode: "FR",
    branch: "Estetik Cerrahi",
    requestedDayOffset: 0,
    createdDayOffset: 0,
    createdTime: "10:05",
    status: "ONAYLANDI",
    phone: "+33 6 12 34 56 78",
    email: "sophie.bernard@example.fr",
    assignedDoctor: "Op. Dr. Elif Yılmaz",
    documentTemplates: [
      { id: "DOC-11", type: "PASAPORT", fileName: "passport_sophie.pdf", uploadedDayOffset: -5, fileSizeKb: 702 },
    ],
  },
  {
    id: "LD-1035",
    fullName: "Ahmed Al-Farsi",
    country: "Katar",
    countryCode: "QA",
    branch: "Tüp Bebek (IVF)",
    requestedDayOffset: 7,
    createdDayOffset: -5,
    createdTime: "09:18",
    status: "BEKLEMEDE",
    phone: "+974 5512 3456",
    email: "ahmed.alfarsi@example.qa",
    documentTemplates: [
      { id: "DOC-12", type: "PASAPORT", fileName: "passport_ahmed.pdf", uploadedDayOffset: -8, fileSizeKb: 810 },
      { id: "DOC-13", type: "TIBBI_RAPOR", fileName: "rapor_ahmed.pdf", uploadedDayOffset: -7, fileSizeKb: 1340 },
    ],
  },
  {
    id: "LD-1034",
    fullName: "Laura van Dijk",
    country: "Hollanda",
    countryCode: "NL",
    branch: "Diş Tedavisi",
    requestedDayOffset: -1,
    createdDayOffset: -5,
    createdTime: "08:05",
    status: "TAMAMLANDI",
    phone: "+31 6 1234 5678",
    email: "laura.vandijk@example.nl",
    assignedDoctor: "Dt. Can Öztürk",
    responseTimeHours: 2,
    documentTemplates: [
      { id: "DOC-14", type: "PASAPORT", fileName: "passport_laura.pdf", uploadedDayOffset: -9, fileSizeKb: 640 },
    ],
  },
  {
    id: "LD-1033",
    fullName: "Robert Miller",
    country: "Amerika Birleşik Devletleri",
    countryCode: "US",
    branch: "Kardiyoloji",
    requestedDayOffset: 4,
    createdDayOffset: -6,
    createdTime: "14:20",
    status: "BEKLEMEDE",
    phone: "+1 305 234 5678",
    email: "robert.miller@example.com",
    documentTemplates: [
      { id: "DOC-15", type: "PASAPORT", fileName: "passport_robert.pdf", uploadedDayOffset: -10, fileSizeKb: 730 },
      { id: "DOC-16", type: "TIBBI_RAPOR", fileName: "ekg_robert.pdf", uploadedDayOffset: -9, fileSizeKb: 1580 },
    ],
  },
];

function buildLead(template: LeadTemplate): PatientLead {
  const {
    requestedDayOffset,
    createdDayOffset,
    createdTime,
    documentTemplates,
    contactHistory,
    ...lead
  } = template;
  return {
    ...lead,
    requestedDate: mockDateKey(requestedDayOffset),
    createdAt: mockDateTime(createdDayOffset, createdTime),
    documents: documentTemplates.map(({ uploadedDayOffset, ...doc }) => ({
      ...doc,
      uploadedAt: mockDateKey(uploadedDayOffset),
    })),
    contactHistory: contactHistory ?? [
      {
        id: `MSG-${lead.id}`,
        direction: "INBOUND",
        channel: "PORTAL",
        preview: "Tedavi talebi ve belgeler gönderildi.",
        sentAt: mockDateTime(createdDayOffset, createdTime),
      },
    ],
  };
}

export function getPatientLeads(): PatientLead[] {
  return leadTemplates.map(buildLead);
}

const doctorRecords: Doctor[] = [
  {
    id: "DR-01",
    fullName: "Elif Yılmaz",
    title: "Op. Dr.",
    specialty: "Estetik, Plastik ve Rekonstrüktif Cerrahi",
    languages: ["TR", "EN", "AR"],
    status: "MÜSAİT",
    workingHours: { start: "09:00", end: "17:00" },
    patientsToday: 4,
    yearsExperience: 14,
    avatarInitials: "EY",
    rating: 4.9,
    reviewCount: 48,
    isActive: true,
    assignedPatientIds: ["LD-1041", "LD-1036"],
  },
  {
    id: "DR-02",
    fullName: "Mehmet Kaya",
    title: "Prof. Dr.",
    specialty: "Genel Cerrahi (Bariatrik)",
    languages: ["TR", "EN", "RU"],
    status: "DOLU",
    workingHours: { start: "08:00", end: "16:00" },
    patientsToday: 3,
    yearsExperience: 21,
    avatarInitials: "MK",
    rating: 4.8,
    reviewCount: 36,
    isActive: true,
    assignedPatientIds: ["LD-1038"],
  },
  {
    id: "DR-03",
    fullName: "Can Öztürk",
    title: "Dt.",
    specialty: "Ağız, Diş ve Çene Cerrahisi",
    languages: ["TR", "EN", "DE"],
    status: "MÜSAİT",
    workingHours: { start: "09:30", end: "18:00" },
    patientsToday: 6,
    yearsExperience: 9,
    avatarInitials: "CÖ",
    rating: 4.7,
    reviewCount: 29,
    isActive: true,
    assignedPatientIds: ["LD-1034"],
  },
  {
    id: "DR-04",
    fullName: "Zeynep Arslan",
    title: "Doç. Dr.",
    specialty: "Göz Hastalıkları (LASIK & Kornea)",
    languages: ["TR", "EN", "FR"],
    status: "MOLADA",
    workingHours: { start: "09:00", end: "17:30" },
    patientsToday: 2,
    yearsExperience: 12,
    avatarInitials: "ZA",
    rating: 4.6,
    reviewCount: 22,
    isActive: true,
    assignedPatientIds: [],
  },
  {
    id: "DR-05",
    fullName: "Burak Demir",
    title: "Op. Dr.",
    specialty: "Saç Ekimi ve Dermatoloji",
    languages: ["TR", "EN", "AR", "RU"],
    status: "DOLU",
    workingHours: { start: "08:30", end: "16:30" },
    patientsToday: 8,
    yearsExperience: 11,
    avatarInitials: "BD",
    rating: 4.8,
    reviewCount: 41,
    isActive: true,
    assignedPatientIds: ["LD-1042"],
  },
  {
    id: "DR-06",
    fullName: "Selin Aydın",
    title: "Uzm. Dr.",
    specialty: "Kadın Hastalıkları ve Tüp Bebek (IVF)",
    languages: ["TR", "EN", "AR"],
    status: "MÜSAİT",
    workingHours: { start: "10:00", end: "18:00" },
    patientsToday: 3,
    yearsExperience: 16,
    avatarInitials: "SA",
    rating: 4.9,
    reviewCount: 33,
    isActive: true,
    assignedPatientIds: ["LD-1035"],
  },
  {
    id: "DR-07",
    fullName: "Ozan Şahin",
    title: "Prof. Dr.",
    specialty: "Ortopedi ve Travmatoloji",
    languages: ["TR", "EN", "DE", "RU"],
    status: "MÜSAİT",
    workingHours: { start: "09:00", end: "17:00" },
    patientsToday: 5,
    yearsExperience: 19,
    avatarInitials: "OŞ",
    rating: 4.5,
    reviewCount: 27,
    isActive: true,
    assignedPatientIds: [],
  },
  {
    id: "DR-08",
    fullName: "Deniz Koç",
    title: "Doç. Dr.",
    specialty: "Kardiyoloji",
    languages: ["TR", "EN"],
    status: "MOLADA",
    workingHours: { start: "08:00", end: "15:00" },
    patientsToday: 4,
    yearsExperience: 15,
    avatarInitials: "DK",
    rating: 4.4,
    reviewCount: 19,
    isActive: false,
    assignedPatientIds: ["LD-1033"],
  },
];

export function getDoctors(): Doctor[] {
  return doctorRecords.map((doctor) => ({
    ...doctor,
    languages: [...doctor.languages],
    assignedPatientIds: [...doctor.assignedPatientIds],
  }));
}

const conversionFunnelData: FunnelStage[] = [
  { label: "Görüntülenme", value: 1240 },
  { label: "Gelen Talep", value: 84 },
  { label: "Onaylanan Randevu", value: 32 },
  { label: "Tedavi Başarısı", value: 38, suffix: "%", isRate: true },
];

export function getConversionFunnel(): FunnelStage[] {
  return conversionFunnelData.map((stage) => ({ ...stage }));
}

const regionalComparisonData: RegionalComparison = {
  region: "İstanbul / Kadıköy",
  period: "Bu Ay",
  clinicForeignPatients: 50,
  regionAverageForeignPatients: 45,
  percentAboveAverage: 12,
};

export function getRegionalComparison(): RegionalComparison {
  return { ...regionalComparisonData };
}

const patientOriginDistributionData: OriginShare[] = [
  { country: "Almanya", countryCode: "DE", percentage: 28 },
  { country: "Birleşik Krallık", countryCode: "GB", percentage: 22 },
  { country: "Rusya", countryCode: "RU", percentage: 18 },
  { country: "Irak", countryCode: "IQ", percentage: 16 },
  { country: "Katar", countryCode: "QA", percentage: 10 },
  { country: "Diğer", countryCode: "UN", percentage: 6 },
];

export function getPatientOriginDistribution(): OriginShare[] {
  return patientOriginDistributionData.map((item) => ({ ...item }));
}

const branchRevenueDistributionData: BranchRevenueShare[] = [
  { branch: "Estetik Cerrahi", percentage: 34 },
  { branch: "Saç Ekimi", percentage: 26 },
  { branch: "Diş Tedavisi", percentage: 15 },
  { branch: "Tüp Bebek (IVF)", percentage: 12 },
  { branch: "Bariatrik Cerrahi", percentage: 8 },
  { branch: "Ortopedi", percentage: 5 },
];

export function getBranchRevenueDistribution(): BranchRevenueShare[] {
  return branchRevenueDistributionData.map((item) => ({ ...item }));
}

const treatmentDemandData: TreatmentDemand[] = [
  { branch: "Estetik Cerrahi", count: 24 },
  { branch: "Saç Ekimi", count: 18 },
  { branch: "Diş Tedavisi", count: 14 },
  { branch: "Tüp Bebek (IVF)", count: 11 },
  { branch: "Bariatrik Cerrahi", count: 9 },
  { branch: "Ortopedi", count: 8 },
];

export function getTreatmentDemand(): TreatmentDemand[] {
  return treatmentDemandData.map((item) => ({ ...item }));
}

const leadTrendData: TrendPoint[] = [
  { label: "Oca", value: 42 },
  { label: "Şub", value: 48 },
  { label: "Mar", value: 51 },
  { label: "Nis", value: 46 },
  { label: "May", value: 58 },
  { label: "Haz", value: 63 },
  { label: "Tem", value: 10 },
];

export function getLeadTrend(): TrendPoint[] {
  return leadTrendData.map((point) => ({ ...point }));
}

export function getRecentActivities(): ActivityItem[] {
  return [
    {
      id: "ACT-1",
      title: "Yeni talep alındı",
      description: "Klaus Richter — Saç Ekimi",
      timestamp: mockDateTime(0, "09:42"),
      tone: "primary",
    },
    {
      id: "ACT-2",
      title: "Randevu onaylandı",
      description: "Fatima Al-Sayed — Estetik Cerrahi",
      timestamp: mockDateTime(-1, "16:10"),
      tone: "success",
    },
    {
      id: "ACT-3",
      title: "Alternatif tarih önerildi",
      description: "Youssef Ben Ali — Ortopedi",
      timestamp: mockDateTime(-1, "11:25"),
      tone: "warning",
    },
    {
      id: "ACT-4",
      title: "Yeni hasta yorumu",
      description: "Sophie Bernard 5 yıldız bıraktı",
      timestamp: mockDateTime(-2, "14:20"),
      tone: "neutral",
    },
  ];
}

const planFeaturesData: PlanFeature[] = [
  {
    title: "Görünürlük Paketi",
    description:
      "Arama sonuçlarında öne çıkma ve hasta güveni kazandıran rozetler.",
    free: "Standart sıralama",
    premium: "Üst sırada \"Sponsorlu\" rozeti ile listelenme",
  },
  {
    title: "Çok Kullanıcılı Erişim",
    description: "Klinik ekibinize özel roller ve yetkiler tanımlayın.",
    free: "1 Admin kullanıcı",
    premium: "Sınırsız personel + Rol yönetimi (Resepsiyon, Muhasebe vb.)",
  },
  {
    title: "Öncelikli Destek",
    description: "Sorun yaşadığınızda size ulaşma hızımız.",
    free: "E-posta desteği",
    premium: "7/24 VIP WhatsApp & Telefon hattı",
  },
  {
    title: "Özelleştirilmiş Profil",
    description: "Kliniğinizi uluslararası hastalara en iyi şekilde tanıtın.",
    free: "Standart profil",
    premium: "Video tanıtım banner'ı + sınırsız galeri yükleme",
  },
  {
    title: "Gelir & Komisyon Arşivi",
    description: "Finansal süreçlerinizi tek yerden takip edin.",
    free: "Yok",
    premium: "Detaylı fatura ve komisyon analitikleri",
  },
  {
    title: "Gelişmiş Rekabet & AI Raporları",
    description: "Bölgesel kıyaslama ve yapay zeka destekli analizler.",
    free: "Yok",
    premium: "Analitik & Raporlar sayfasına tam erişim",
  },
];

export function getPlanFeatures(): PlanFeature[] {
  return planFeaturesData.map((feature) => ({ ...feature }));
}

export function getTodayLeads(leads: PatientLead[]): PatientLead[] {
  return leads.filter((lead) => isMockToday(lead.createdAt));
}

export function getPendingLeadCount(leads: PatientLead[]): number {
  return leads.filter(
    (lead) =>
      lead.status === "BEKLEMEDE" || lead.status === "ALTERNATIF_TARIH"
  ).length;
}

const clinicProfile: ClinicProfile = {
  name: "Anadolu Estetik Kliniği",
  shortName: "Anadolu Estetik",
  initials: "AE",
  managerRole: "Klinik Yöneticisi",
  city: "İstanbul, Türkiye",
  phone: "+90 216 555 01 42",
  address: "Caferağa Mah. Moda Cad. No:84, Kadıköy / İstanbul",
};

export function getClinicProfile(): ClinicProfile {
  return { ...clinicProfile };
}

export function getClinicMetrics(leads: PatientLead[]): ClinicMetrics {
  const monthlyLeads = leads.length;
  const approved = leads.filter(
    (l) => l.status === "ONAYLANDI" || l.status === "TAMAMLANDI"
  ).length;
  const approvalRate = monthlyLeads
    ? Math.round((approved / monthlyLeads) * 100)
    : 0;
  const responseTimes = leads
    .map((l) => l.responseTimeHours ?? 0)
    .filter((h) => h > 0);
  const avgResponseHours = responseTimes.length
    ? Math.round(
        (responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length) * 10
      ) / 10
    : 0;
  const activeDoctors = getDoctors().filter(
    (d) => d.isActive && d.status === "MÜSAİT"
  ).length;

  return {
    monthlyLeads,
    monthlyLeadsDelta: 12,
    approvalRate,
    approvalRateDelta: 4,
    avgResponseHours,
    avgResponseDelta: -1.2,
    activeDoctors,
    activeDoctorsDelta: 1,
  };
}
