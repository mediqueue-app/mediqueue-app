const EN_COUNTRIES: Record<string, string> = {
  DE: "Germany",
  GB: "United Kingdom",
  FR: "France",
  AE: "UAE",
  QA: "Qatar",
  NL: "Netherlands",
  SA: "Saudi Arabia",
  IE: "Ireland",
  RO: "Romania",
  AZ: "Azerbaijan",
  US: "United States",
};

const EN_CITIES: Record<string, string> = {
  Londra: "London",
  Riyad: "Riyadh",
  Bükreş: "Bucharest",
  Bakü: "Baku",
};

export function formatNumber(value: number, locale: "en" | "tr" = "tr"): string {
  return value.toLocaleString(locale === "en" ? "en-US" : "tr-TR");
}

export function countryLabel(
  code: string,
  fallback: string,
  locale: "en" | "tr"
): string {
  if (locale === "en") return EN_COUNTRIES[code] ?? fallback;
  return fallback;
}

export function cityLabel(name: string | undefined, locale: "en" | "tr"): string | undefined {
  if (!name) return name;
  if (locale === "en") return EN_CITIES[name] ?? name;
  return name;
}
