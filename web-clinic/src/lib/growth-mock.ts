// Growth engine mock data — marketplace visibility, patient comms, analytics.
// No ERP/HIS operational data.

export type MessageThread = {
  id: string;
  patient: string;
  initials: string;
  country: string;
  flag: string;
  lastMessage: string;
  lastAt: string;
  unread: number;
  language: string;
  treatment: string;
};

export type ChatMessage = {
  id: string;
  threadId: string;
  from: "patient" | "clinic";
  text: string;
  translated?: string;
  time: string;
};

export const messageThreads: MessageThread[] = [
  {
    id: "t1",
    patient: "Ahmed Al-Farsi",
    initials: "AA",
    country: "Katar",
    flag: "🇶🇦",
    lastMessage: "Can you confirm the VIP transfer is included?",
    lastAt: "14:32",
    unread: 2,
    language: "Arapça",
    treatment: "Saç Ekimi",
  },
  {
    id: "t2",
    patient: "Sophie Laurent",
    initials: "SL",
    country: "Fransa",
    flag: "🇫🇷",
    lastMessage: "Merci pour le devis. Quand puis-je venir?",
    lastAt: "12:05",
    unread: 0,
    language: "Fransızca",
    treatment: "Rinoplasti",
  },
  {
    id: "t3",
    patient: "James Whitfield",
    initials: "JW",
    country: "İngiltere",
    flag: "🇬🇧",
    lastMessage: "I've attached my latest X-ray scan.",
    lastAt: "Dün",
    unread: 1,
    language: "İngilizce",
    treatment: "Diş İmplantı",
  },
  {
    id: "t4",
    patient: "Fatima Noor",
    initials: "FN",
    country: "BAE",
    flag: "🇦🇪",
    lastMessage: "Is the hotel package available for August?",
    lastAt: "Dün",
    unread: 0,
    language: "Arapça",
    treatment: "Meme Estetiği",
  },
  {
    id: "t5",
    patient: "Liam O'Brien",
    initials: "LO",
    country: "İrlanda",
    flag: "🇮🇪",
    lastMessage: "Perfect, I'll proceed with the booking.",
    lastAt: "2 gün önce",
    unread: 0,
    language: "İngilizce",
    treatment: "Saç Ekimi",
  },
];

export const chatMessages: ChatMessage[] = [
  {
    id: "m1",
    threadId: "t1",
    from: "patient",
    text: "Merhaba, saç ekimi için fiyat teklifinizi aldım.",
    translated: "Hello, I received your price quote for hair transplant.",
    time: "14:10",
  },
  {
    id: "m2",
    threadId: "t1",
    from: "clinic",
    text: "Merhaba Ahmed Bey, teklifimiz VIP paket kapsamında transfer ve otel dahildir.",
    time: "14:18",
  },
  {
    id: "m3",
    threadId: "t1",
    from: "patient",
    text: "Can you confirm the VIP transfer is included?",
    translated: "VIP transfer dahil mi teyit edebilir misiniz?",
    time: "14:32",
  },
  {
    id: "m4",
    threadId: "t2",
    from: "patient",
    text: "Merci pour le devis. Quand puis-je venir?",
    translated: "Teklif için teşekkürler. Ne zaman gelebilirim?",
    time: "12:05",
  },
  {
    id: "m5",
    threadId: "t3",
    from: "patient",
    text: "I've attached my latest X-ray scan.",
    translated: "Son röntgen taramamı ekledim.",
    time: "Dün 16:40",
  },
];

export const visibilityScore = {
  score: 74,
  max: 100,
  rank: "İstanbul · Estetik Cerrahi",
  position: 3,
  totalClinics: 28,
  change: +6,
};

export type SponsorshipPackage = {
  id: string;
  name: string;
  tier: "standard" | "pro" | "elite";
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export const sponsorshipPackages: SponsorshipPackage[] = [
  {
    id: "sp1",
    name: "Standart",
    tier: "standard",
    price: 990,
    period: "ay",
    description: "Kategori listelerinde görünürlük artışı",
    features: [
      "Kategori sayfasında +2 sıra yükselme",
      "Haftalık görünürlük raporu",
      "Temel vitrin rozeti",
    ],
  },
  {
    id: "sp2",
    name: "Şehir Aramalarında Üstte Çık",
    tier: "pro",
    price: 2490,
    period: "ay",
    description: "İstanbul ve hedef şehir aramalarında öncelik",
    features: [
      "Şehir bazlı arama sonuçlarında üst 3",
      "Öne çıkan vitrin rozeti (Pro)",
      "Haftalık rakip karşılaştırma",
      "Kampanya entegrasyonu",
    ],
    highlighted: true,
  },
  {
    id: "sp3",
    name: "Ülke Çapında Önerilen",
    tier: "elite",
    price: 4990,
    period: "ay",
    description: "Türkiye genelinde önerilen klinik statüsü",
    features: [
      "Ana sayfa önerilen klinik alanı",
      "Ülke çapında arama önceliği",
      "Elite vitrin rozeti + AI öngörüleri",
      "Özel hesap yöneticisi",
      "Aylık pazar analizi raporu",
    ],
  },
];

export type Campaign = {
  id: string;
  name: string;
  discount: number;
  targetCountry: string;
  flag: string;
  endDate: string;
  active: boolean;
  views: number;
  leads: number;
};

export const campaigns: Campaign[] = [
  {
    id: "cp1",
    name: "Yaz Saç Ekimi Fırsatı",
    discount: 15,
    targetCountry: "İngiltere",
    flag: "🇬🇧",
    endDate: "31 Ağu 2026",
    active: true,
    views: 4280,
    leads: 34,
  },
  {
    id: "cp2",
    name: "Diş İmplantı Yaz Paketi",
    discount: 10,
    targetCountry: "Almanya",
    flag: "🇩🇪",
    endDate: "15 Eyl 2026",
    active: true,
    views: 2150,
    leads: 18,
  },
  {
    id: "cp3",
    name: "Kış Estetik Kampanyası",
    discount: 20,
    targetCountry: "Fransa",
    flag: "🇫🇷",
    endDate: "28 Şub 2026",
    active: false,
    views: 8900,
    leads: 72,
  },
  {
    id: "cp4",
    name: "Ramazan Özel — Orta Doğu",
    discount: 12,
    targetCountry: "BAE",
    flag: "🇦🇪",
    endDate: "30 Nis 2026",
    active: false,
    views: 3100,
    leads: 41,
  },
];

export type ForecastPoint = {
  month: string;
  demand: number;
  projected: boolean;
};

export const forecastData: ForecastPoint[] = [
  { month: "Tem", demand: 42, projected: false },
  { month: "Ağu", demand: 48, projected: false },
  { month: "Eyl", demand: 55, projected: false },
  { month: "Eki", demand: 62, projected: true },
  { month: "Kas", demand: 58, projected: true },
  { month: "Ara", demand: 71, projected: true },
  { month: "Oca", demand: 68, projected: true },
  { month: "Şub", demand: 74, projected: true },
  { month: "Mar", demand: 82, projected: true },
];

export type AiInsight = {
  id: string;
  title: string;
  detail: string;
  impact: "high" | "medium";
};

export const aiInsights: AiInsight[] = [
  {
    id: "i1",
    title: "Almanya — Diş İmplantı talebi artışı",
    detail:
      "Önümüzdeki ay Almanya'dan diş implantı aramalarında %20 artış bekleniyor. Kapasitenizi ve kampanya bütçenizi gözden geçirin.",
    impact: "high",
  },
  {
    id: "i2",
    title: "İngiltere — Saç ekimi sezonu",
    detail:
      "Ağustos–Eylül döneminde İngiltere menşeli saç ekimi talepleri tarihsel ortalamanın %15 üzerinde seyrediyor.",
    impact: "high",
  },
  {
    id: "i3",
    title: "Fransa — Rinoplasti fiyat hassasiyeti",
    detail:
      "Fransız hastalar fiyat karşılaştırmasına duyarlı. %10–15 indirimli kampanya dönüşümü %8 artırabilir.",
    impact: "medium",
  },
];

export type PriceComparison = {
  category: string;
  yours: number;
  average: number;
};

export const priceComparison: PriceComparison[] = [
  { category: "Saç Ekimi", yours: 1900, average: 2100 },
  { category: "Rinoplasti", yours: 2800, average: 2650 },
  { category: "Diş İmplantı", yours: 1200, average: 1350 },
  { category: "Meme Estetiği", yours: 4200, average: 4500 },
  { category: "Yanıt Süresi (saat)", yours: 4, average: 8 },
  { category: "Profil Puanı", yours: 4.8, average: 4.5 },
];

export type CompetitorRow = {
  id: string;
  label: string;
  responseHours: number;
  rating: number;
  visibility: number;
  isYou?: boolean;
};

export const competitorTable: CompetitorRow[] = [
  { id: "you", label: "Sizin Klinik", responseHours: 4, rating: 4.8, visibility: 74, isYou: true },
  { id: "r1", label: "Rakip 1", responseHours: 6, rating: 4.6, visibility: 68 },
  { id: "r2", label: "Rakip 2", responseHours: 9, rating: 4.4, visibility: 61 },
  { id: "r3", label: "Rakip 3", responseHours: 5, rating: 4.7, visibility: 71 },
  { id: "r4", label: "Rakip 4", responseHours: 12, rating: 4.2, visibility: 55 },
];

export type FinanceSummary = {
  totalVolume: number;
  commission: number;
  netRevenue: number;
  commissionRate: number;
};

export const financeSummary: FinanceSummary = {
  totalVolume: 486000,
  commission: 72900,
  netRevenue: 413100,
  commissionRate: 15,
};

export type InvoiceRow = {
  id: string;
  period: string;
  volume: number;
  commission: number;
  net: number;
  status: "paid" | "pending";
};

export const invoices: InvoiceRow[] = [
  { id: "inv-2026-07", period: "Temmuz 2026", volume: 486000, commission: 72900, net: 413100, status: "pending" },
  { id: "inv-2026-06", period: "Haziran 2026", volume: 412000, commission: 61800, net: 350200, status: "paid" },
  { id: "inv-2026-05", period: "Mayıs 2026", volume: 378000, commission: 56700, net: 321300, status: "paid" },
  { id: "inv-2026-04", period: "Nisan 2026", volume: 345000, commission: 51750, net: 293250, status: "paid" },
  { id: "inv-2026-03", period: "Mart 2026", volume: 298000, commission: 44700, net: 253300, status: "paid" },
];
