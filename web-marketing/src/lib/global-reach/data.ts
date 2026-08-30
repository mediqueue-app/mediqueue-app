import type { CountryPatientData } from "./types";

/**
 * Örnek klinik paneli demo dağılımı — web-clinic `patientOriginCountries` ile aynı ölçek.
 * Toplam 184 hasta, 11 ülke; erken aşama bir kliniğin makul göstereceği sayılar.
 */
export const previewClinicOriginCountries: CountryPatientData[] = [
  {
    countryCode: "DE",
    countryName: "Almanya",
    lat: 51.1657,
    lng: 10.4515,
    patientCount: 42,
    topCity: "Berlin",
    trendPercent: 14,
  },
  {
    countryCode: "GB",
    countryName: "İngiltere",
    lat: 54.0,
    lng: -2.0,
    patientCount: 31,
    topCity: "Londra",
    trendPercent: 9,
  },
  {
    countryCode: "FR",
    countryName: "Fransa",
    lat: 46.2276,
    lng: 2.2137,
    patientCount: 24,
    topCity: "Paris",
    trendPercent: -4,
  },
  {
    countryCode: "AE",
    countryName: "BAE",
    lat: 24.4539,
    lng: 54.3773,
    patientCount: 19,
    topCity: "Dubai",
    trendPercent: 22,
  },
  {
    countryCode: "QA",
    countryName: "Katar",
    lat: 25.2854,
    lng: 51.531,
    patientCount: 15,
    topCity: "Doha",
    trendPercent: 11,
  },
  {
    countryCode: "NL",
    countryName: "Hollanda",
    lat: 52.1326,
    lng: 5.2913,
    patientCount: 13,
    topCity: "Amsterdam",
    trendPercent: 6,
  },
  {
    countryCode: "SA",
    countryName: "Suudi Arabistan",
    lat: 24.7136,
    lng: 46.6753,
    patientCount: 11,
    topCity: "Riyad",
    trendPercent: 7,
  },
  {
    countryCode: "IE",
    countryName: "İrlanda",
    lat: 53.1424,
    lng: -7.6921,
    patientCount: 9,
    topCity: "Dublin",
    trendPercent: 3,
  },
  {
    countryCode: "RO",
    countryName: "Romanya",
    lat: 45.9432,
    lng: 24.9668,
    patientCount: 8,
    topCity: "Bükreş",
    trendPercent: -2,
  },
  {
    countryCode: "AZ",
    countryName: "Azerbaycan",
    lat: 40.1431,
    lng: 47.5769,
    patientCount: 7,
    topCity: "Bakü",
    trendPercent: 18,
  },
  {
    countryCode: "US",
    countryName: "ABD",
    lat: 39.8283,
    lng: -98.5795,
    patientCount: 5,
    topCity: "New York",
    trendPercent: 5,
  },
];

/** @deprecated Use previewClinicOriginCountries — kept for backwards compatibility */
export const platformOriginCountries = previewClinicOriginCountries;
