import type { PatientReview, AiReviewSummary } from "@/types";
import { mockDateTime } from "@/lib/mock-date";

const reviewRecords: PatientReview[] = [
  {
    id: "RV-301",
    patientName: "Fatima Al-Sayed",
    countryCode: "SA",
    rating: 5,
    comment:
      "Klinik ekibi uçuştan karşılamaya kadar her adımda yanımızdaydı. Op. Dr. Elif Yılmaz süreci çok net anlattı.",
    createdAt: mockDateTime(-2, "14:20"),
    doctorName: "Op. Dr. Elif Yılmaz",
    service: "Estetik Cerrahi",
  },
  {
    id: "RV-300",
    patientName: "Klaus Richter",
    countryCode: "DE",
    rating: 4,
    comment:
      "Saç ekimi sonuçlarından memnunum. Transfer ve otel koordinasyonu iyi organize edilmişti.",
    createdAt: mockDateTime(-4, "09:15"),
    doctorName: "Op. Dr. Burak Demir",
    service: "Saç Ekimi",
  },
  {
    id: "RV-299",
    patientName: "Laura van Dijk",
    countryCode: "NL",
    rating: 5,
    comment:
      "Diş tedavisi planı şeffaftı, fiyatlandırma baştan netleştirildi. Dt. Can Öztürk çok ilgiliydi.",
    createdAt: mockDateTime(-5, "16:40"),
    doctorName: "Dt. Can Öztürk",
    service: "Diş Tedavisi",
  },
  {
    id: "RV-298",
    patientName: "Ahmed Al-Farsi",
    countryCode: "QA",
    rating: 4,
    comment:
      "IVF danışmanlığı profesyoneldi. İletişim kanalları hızlı yanıt verdi, sadece bekleme süresi biraz uzundu.",
    createdAt: mockDateTime(-6, "11:05"),
    doctorName: "Uzm. Dr. Selin Aydın",
    service: "Tüp Bebek (IVF)",
  },
  {
    id: "RV-297",
    patientName: "Sophie Bernard",
    countryCode: "FR",
    rating: 5,
    comment:
      "VIP karşılama ve tercüman desteği beklentimizin üzerindeydi. Klinik ortamı çok temiz ve modern.",
    createdAt: mockDateTime(-8, "18:30"),
    doctorName: "Op. Dr. Elif Yılmaz",
    service: "Estetik Cerrahi",
  },
  {
    id: "RV-296",
    patientName: "Robert Miller",
    countryCode: "US",
    rating: 3,
    comment:
      "Kardiyoloji konsültasyonu faydalıydı ancak randevu saatinde 25 dakika gecikme yaşandı.",
    createdAt: mockDateTime(-10, "08:50"),
    doctorName: "Doç. Dr. Deniz Koç",
    service: "Kardiyoloji",
  },
];

const aiReviewSummaryData: AiReviewSummary = {
  positivePercentage: 74,
  topKeyword: "VIP Karşılama",
  sampleSize: 116,
  themes: [
    "İletişim ve koordinasyon olumlu bulunuyor",
    "Doktor ilgisi en sık övülen konu",
    "Bekleme süresi iyileştirme alanı olarak öne çıkıyor",
  ],
};

export function getPatientReviews(): PatientReview[] {
  return reviewRecords.map((review) => ({ ...review }));
}

export function getAiReviewSummary(): AiReviewSummary {
  return { ...aiReviewSummaryData, themes: [...aiReviewSummaryData.themes] };
}
