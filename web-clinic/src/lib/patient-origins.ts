/**
 * Hastaların geldiği ülkeler — coğrafi kayıt + demo dağılım.
 *
 * Talep kayıtlarında ülke yalnızca Türkçe adıyla tutuluyor (bkz. clinic-mock ve
 * /clinics/{id}/appointments yanıtı). Dünya üzerinde nokta basabilmek için bu
 * adı ISO alpha-2 koda ve koordinata çeviren bir sözlüğe ihtiyacımız var.
 */

export interface CountryPatientData {
  countryCode: string; // ISO alpha-2, örn "DE"
  countryName: string; // "Almanya"
  lat: number;
  lng: number;
  patientCount: number;
  activePatientCount?: number;
  topCity?: string; // "Berlin"
  trendPercent?: number; // geçen aya göre değişim
}

type CountryGeo = { code: string; lat: number; lng: number };

/**
 * Türkçe ülke adı → ISO alpha-2 + ülke merkez koordinatı.
 * Anahtarlar `normalizeCountryName` ile karşılaştırıldığı için büyük/küçük harf
 * ve baştaki/sondaki boşluk farkları sorun çıkarmaz.
 */
const COUNTRY_GEO: Record<string, CountryGeo> = {
  almanya: { code: "DE", lat: 51.1657, lng: 10.4515 },
  fransa: { code: "FR", lat: 46.2276, lng: 2.2137 },
  ingiltere: { code: "GB", lat: 54.0, lng: -2.0 },
  "birlesik krallik": { code: "GB", lat: 54.0, lng: -2.0 },
  hollanda: { code: "NL", lat: 52.1326, lng: 5.2913 },
  belcika: { code: "BE", lat: 50.5039, lng: 4.4699 },
  isvicre: { code: "CH", lat: 46.8182, lng: 8.2275 },
  avusturya: { code: "AT", lat: 47.5162, lng: 14.5501 },
  italya: { code: "IT", lat: 41.8719, lng: 12.5674 },
  ispanya: { code: "ES", lat: 40.4637, lng: -3.7492 },
  portekiz: { code: "PT", lat: 39.3999, lng: -8.2245 },
  irlanda: { code: "IE", lat: 53.1424, lng: -7.6921 },
  isvec: { code: "SE", lat: 60.1282, lng: 18.6435 },
  norvec: { code: "NO", lat: 60.472, lng: 8.4689 },
  danimarka: { code: "DK", lat: 56.2639, lng: 9.5018 },
  finlandiya: { code: "FI", lat: 61.9241, lng: 25.7482 },
  polonya: { code: "PL", lat: 51.9194, lng: 19.1451 },
  romanya: { code: "RO", lat: 45.9432, lng: 24.9668 },
  bulgaristan: { code: "BG", lat: 42.7339, lng: 25.4858 },
  yunanistan: { code: "GR", lat: 39.0742, lng: 21.8243 },
  kosova: { code: "XK", lat: 42.6026, lng: 20.903 },
  arnavutluk: { code: "AL", lat: 41.1533, lng: 20.1683 },
  "kuzey makedonya": { code: "MK", lat: 41.6086, lng: 21.7453 },
  ukrayna: { code: "UA", lat: 48.3794, lng: 31.1656 },
  rusya: { code: "RU", lat: 55.7558, lng: 37.6173 },
  azerbaycan: { code: "AZ", lat: 40.1431, lng: 47.5769 },
  gurcistan: { code: "GE", lat: 42.3154, lng: 43.3569 },
  kazakistan: { code: "KZ", lat: 48.0196, lng: 66.9237 },
  ozbekistan: { code: "UZ", lat: 41.3775, lng: 64.5853 },
  turkmenistan: { code: "TM", lat: 38.9697, lng: 59.5563 },
  bae: { code: "AE", lat: 24.4539, lng: 54.3773 },
  "birlesik arap emirlikleri": { code: "AE", lat: 24.4539, lng: 54.3773 },
  katar: { code: "QA", lat: 25.2854, lng: 51.531 },
  kuveyt: { code: "KW", lat: 29.3117, lng: 47.4818 },
  "suudi arabistan": { code: "SA", lat: 24.7136, lng: 46.6753 },
  umman: { code: "OM", lat: 21.4735, lng: 55.9754 },
  bahreyn: { code: "BH", lat: 26.0667, lng: 50.5577 },
  irak: { code: "IQ", lat: 33.2232, lng: 43.6793 },
  iran: { code: "IR", lat: 32.4279, lng: 53.688 },
  urdun: { code: "JO", lat: 30.5852, lng: 36.2384 },
  lubnan: { code: "LB", lat: 33.8547, lng: 35.8623 },
  israil: { code: "IL", lat: 31.0461, lng: 34.8516 },
  misir: { code: "EG", lat: 26.8206, lng: 30.8025 },
  libya: { code: "LY", lat: 26.3351, lng: 17.2283 },
  tunus: { code: "TN", lat: 33.8869, lng: 9.5375 },
  cezayir: { code: "DZ", lat: 28.0339, lng: 1.6596 },
  fas: { code: "MA", lat: 31.7917, lng: -7.0926 },
  nijerya: { code: "NG", lat: 9.082, lng: 8.6753 },
  senegal: { code: "SN", lat: 14.4974, lng: -14.4524 },
  somali: { code: "SO", lat: 5.1521, lng: 46.1996 },
  abd: { code: "US", lat: 39.8283, lng: -98.5795 },
  "amerika birlesik devletleri": { code: "US", lat: 39.8283, lng: -98.5795 },
  kanada: { code: "CA", lat: 56.1304, lng: -106.3468 },
  meksika: { code: "MX", lat: 23.6345, lng: -102.5528 },
  brezilya: { code: "BR", lat: -14.235, lng: -51.9253 },
  avustralya: { code: "AU", lat: -25.2744, lng: 133.7751 },
  turkiye: { code: "TR", lat: 38.9637, lng: 35.2433 },
};

/** Türkçe karakterleri sadeleştirip anahtar biçimine indirger. */
function normalizeCountryName(name: string): string {
  return name
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/\s+/g, " ");
}

export function lookupCountryGeo(countryName: string): CountryGeo | undefined {
  return COUNTRY_GEO[normalizeCountryName(countryName)];
}

/** Kliniğin merkezi — bağlantı yaylarının çıkış noktası. */
export const CLINIC_ORIGIN = { lat: 41.0082, lng: 28.9784, city: "İstanbul" };

/**
 * Demo dağılım. Backend henüz "hasta menşei" endpoint'i sunmadığı için API
 * modunda talep kayıtlarından türetiyoruz (bkz. services/patient-origins.ts);
 * hiç kayıt yoksa buradaki referans veri gösteriliyor.
 */
export const patientOriginCountries: CountryPatientData[] = [
  {
    countryCode: "DE",
    countryName: "Almanya",
    lat: 51.1657,
    lng: 10.4515,
    patientCount: 42,
    activePatientCount: 18,
    topCity: "Berlin",
    trendPercent: 14,
  },
  {
    countryCode: "GB",
    countryName: "İngiltere",
    lat: 54.0,
    lng: -2.0,
    patientCount: 31,
    activePatientCount: 12,
    topCity: "Londra",
    trendPercent: 9,
  },
  {
    countryCode: "FR",
    countryName: "Fransa",
    lat: 46.2276,
    lng: 2.2137,
    patientCount: 24,
    activePatientCount: 9,
    topCity: "Paris",
    trendPercent: -4,
  },
  {
    countryCode: "AE",
    countryName: "BAE",
    lat: 24.4539,
    lng: 54.3773,
    patientCount: 19,
    activePatientCount: 8,
    topCity: "Dubai",
    trendPercent: 22,
  },
  {
    countryCode: "QA",
    countryName: "Katar",
    lat: 25.2854,
    lng: 51.531,
    patientCount: 15,
    activePatientCount: 6,
    topCity: "Doha",
    trendPercent: 11,
  },
  {
    countryCode: "NL",
    countryName: "Hollanda",
    lat: 52.1326,
    lng: 5.2913,
    patientCount: 13,
    activePatientCount: 5,
    topCity: "Amsterdam",
    trendPercent: 6,
  },
  {
    countryCode: "SA",
    countryName: "Suudi Arabistan",
    lat: 24.7136,
    lng: 46.6753,
    patientCount: 11,
    activePatientCount: 4,
    topCity: "Riyad",
    trendPercent: 7,
  },
  {
    countryCode: "IE",
    countryName: "İrlanda",
    lat: 53.1424,
    lng: -7.6921,
    patientCount: 9,
    activePatientCount: 3,
    topCity: "Dublin",
    trendPercent: 3,
  },
  {
    countryCode: "RO",
    countryName: "Romanya",
    lat: 45.9432,
    lng: 24.9668,
    patientCount: 8,
    activePatientCount: 2,
    topCity: "Bükreş",
    trendPercent: -2,
  },
  {
    countryCode: "AZ",
    countryName: "Azerbaycan",
    lat: 40.1431,
    lng: 47.5769,
    patientCount: 7,
    activePatientCount: 3,
    topCity: "Bakü",
    trendPercent: 18,
  },
  {
    countryCode: "US",
    countryName: "ABD",
    lat: 39.8283,
    lng: -98.5795,
    patientCount: 5,
    activePatientCount: 2,
    topCity: "New York",
    trendPercent: 5,
  },
];
