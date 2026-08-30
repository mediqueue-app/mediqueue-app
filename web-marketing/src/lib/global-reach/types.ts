export interface CountryPatientData {
  countryCode: string;
  countryName: string;
  lat: number;
  lng: number;
  patientCount: number;
  activePatientCount?: number;
  topCity?: string;
  trendPercent?: number;
}

export type OriginReachScope = "clinic" | "preview";

export const PLATFORM_HUB = {
  lat: 41.0082,
  lng: 28.9784,
  city: "İstanbul",
};
