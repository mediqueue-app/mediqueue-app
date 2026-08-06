/**
 * Hasta menşei dağılımı — hybrid: JWT varsa gerçek randevu talepleri üzerinden
 * hesaplanır, yoksa clinic-mock referans dağılımına düşer.
 *
 * Backend'de ayrı bir "hasta menşei" endpoint'i yok; bu yüzden veriyi
 * /clinics/{id}/appointments yanıtındaki ülke/şehir alanlarından türetiyoruz.
 */
import {
  CLINIC_ORIGIN,
  lookupCountryGeo,
  patientOriginCountries,
  type CountryPatientData,
} from "@/lib/patient-origins";
import { fetchAppointmentRequests } from "@/lib/services/requests";
import { useApi } from "@/lib/services/shared";
import type { AppointmentRequest } from "@/lib/clinic-mock";

/** Kliniğin bulunduğu ülke — "yurt dışından gelen hasta" tablosuna girmez. */
const DOMESTIC_CODE = "TR";

function aggregate(requests: AppointmentRequest[]): CountryPatientData[] {
  const byCode = new Map<
    string,
    CountryPatientData & { cityCounts: Map<string, number> }
  >();

  for (const request of requests) {
    if (request.status === "rejected") continue;

    const geo = lookupCountryGeo(request.country);
    // Sözlükte olmayan ülkeyi haritaya basamayız; sessizce atlıyoruz.
    if (!geo || geo.code === DOMESTIC_CODE) continue;

    let entry = byCode.get(geo.code);
    if (!entry) {
      entry = {
        countryCode: geo.code,
        countryName: request.country,
        lat: geo.lat,
        lng: geo.lng,
        patientCount: 0,
        activePatientCount: 0,
        cityCounts: new Map(),
      };
      byCode.set(geo.code, entry);
    }

    entry.patientCount += 1;
    if (request.status === "approved") {
      entry.activePatientCount = (entry.activePatientCount ?? 0) + 1;
    }
    if (request.city) {
      entry.cityCounts.set(
        request.city,
        (entry.cityCounts.get(request.city) ?? 0) + 1
      );
    }
  }

  return [...byCode.values()]
    .map(({ cityCounts, ...country }) => {
      const topCity = [...cityCounts.entries()].sort((a, b) => b[1] - a[1])[0];
      return {
        ...country,
        topCity: topCity?.[0],
        // TODO: gerçek veriye bağla — trend için geçmiş dönem kırılımı gerekiyor,
        // mevcut endpoint yalnızca anlık talep listesini döndürüyor.
        trendPercent: undefined,
      };
    })
    .sort((a, b) => b.patientCount - a.patientCount);
}

export async function fetchPatientOrigins(): Promise<CountryPatientData[]> {
  if (!useApi()) {
    return patientOriginCountries;
  }

  const requests = await fetchAppointmentRequests();
  const derived = aggregate(requests);
  // Hiç eşleşen yurt dışı kaydı yoksa kartı boş bırakmak yerine referans
  // dağılımı gösteriyoruz; boş dizi dönerse bileşen empty-state'e düşer.
  return derived.length > 0 ? derived : patientOriginCountries;
}

export { CLINIC_ORIGIN };
