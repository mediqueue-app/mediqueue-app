/** Klinik UI — Türkçe branş etiketleri (mock veri). */

export const BRANCHES = [
  "Saç Ekimi",
  "Estetik Cerrahi",
  "Diş Tedavisi",
  "Göz (LASIK)",
  "Bariatrik Cerrahi",
  "Ortopedi",
  "Tüp Bebek (IVF)",
  "Kardiyoloji",
] as const;

/**
 * web-doctor mock verisi İngilizce branch kodları kullanır.
 * Ay 2 API entegrasyonunda ortak enum'a taşınacak.
 */
export const BRANCH_DOCTOR_CODE_MAP: Record<(typeof BRANCHES)[number], string> =
  {
    "Saç Ekimi": "hair_transplant",
    "Estetik Cerrahi": "aesthetic",
    "Diş Tedavisi": "dentistry",
    "Göz (LASIK)": "ophthalmology",
    "Bariatrik Cerrahi": "bariatric",
    Ortopedi: "orthopedics",
    "Tüp Bebek (IVF)": "ivf",
    Kardiyoloji: "cardiology",
  };
