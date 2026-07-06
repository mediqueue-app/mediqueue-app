import type { MedicalRecord, ToothRecord, ToothTreatmentRecord } from "@/types";
import { ALL_FDI_TEETH } from "@/lib/dental";

const DENTIST = "Op. Dr. Elif Yılmaz";

function healthyTooth(n: number): ToothRecord {
  return { toothNumber: n, status: "healthy", treatmentHistory: [] };
}

function withTeeth(
  patientId: string,
  overrides: Record<
    number,
    { status: ToothRecord["status"]; treatmentHistory: ToothTreatmentRecord[] }
  >,
  serviceType: MedicalRecord["serviceType"] = "medical"
): MedicalRecord {
  const teeth = ALL_FDI_TEETH.map((n) => {
    const o = overrides[n];
    if (o) {
      return { toothNumber: n, status: o.status, treatmentHistory: o.treatmentHistory };
    }
    return healthyTooth(n);
  });
  return { patientId, serviceType, teeth };
}

/** Igor Petrov — referans: diş 22, iki kayıt (May tamamlandı, Nisan bekliyor). */
export const igorMedicalRecord: MedicalRecord = withTeeth("P-1007", {
  22: {
    status: "pending_treatment",
    treatmentHistory: [
      {
        id: "TR-IP-22-1",
        date: "2026-05-03",
        condition: "Çürük",
        treatment: "Dolgu",
        dentistName: DENTIST,
        status: "completed",
        note: "İleri Derece Çürük",
      },
      {
        id: "TR-IP-22-2",
        date: "2026-04-12",
        condition: "Çürük",
        treatment: "Dolgu",
        dentistName: DENTIST,
        status: "pending",
        pendingReason: "Yeterli süre yok",
        note: "Pulpa'ya yakın lezyon — ikinci seans planlandı",
      },
    ],
  },
  36: {
    status: "treated",
    treatmentHistory: [
      {
        id: "TR-IP-36-1",
        date: "2026-06-18",
        condition: "Eksik Diş",
        treatment: "İmplant Planlama",
        dentistName: DENTIST,
        status: "completed",
        note: "Kemik yoğunluğu yeterli",
      },
    ],
  },
  46: {
    status: "pending_treatment",
    treatmentHistory: [
      {
        id: "TR-IP-46-1",
        date: "2026-07-01",
        condition: "Çürük",
        treatment: "Kanal Tedavisi",
        dentistName: DENTIST,
        status: "pending",
        pendingReason: "Anestezi ön değerlendirmesi bekleniyor",
        note: "Derin dentin çürüğü",
      },
    ],
  },
  11: {
    status: "treated",
    treatmentHistory: [
      {
        id: "TR-IP-11-1",
        date: "2026-03-20",
        condition: "Çürük",
        treatment: "Dolgu",
        dentistName: DENTIST,
        status: "completed",
      },
    ],
  },
});

/** Laura van Dijk — diş tedavisi / implant. */
export const lauraMedicalRecord: MedicalRecord = withTeeth("P-1008", {
  14: {
    status: "treated",
    treatmentHistory: [
      {
        id: "TR-LD-14-1",
        date: "2026-06-10",
        condition: "Kırık",
        treatment: "Kuron",
        dentistName: DENTIST,
        status: "completed",
        note: "Zirkonyum kuron uygulandı",
      },
    ],
  },
  26: {
    status: "pending_treatment",
    treatmentHistory: [
      {
        id: "TR-LD-26-1",
        date: "2026-06-25",
        condition: "Eksik Diş",
        treatment: "İmplant",
        dentistName: DENTIST,
        status: "pending",
        pendingReason: "İyileşme süresi tamamlanmadı",
        note: "İmplant yerleştirildi, protez aşaması bekleniyor",
      },
    ],
  },
  37: {
    status: "treated",
    treatmentHistory: [
      {
        id: "TR-LD-37-1",
        date: "2026-05-15",
        condition: "Çürük",
        treatment: "Dolgu",
        dentistName: DENTIST,
        status: "completed",
      },
    ],
  },
});

export const medicalRecordsByPatientId: Record<string, MedicalRecord> = {
  "P-1007": igorMedicalRecord,
  "P-1008": lauraMedicalRecord,
};

export function getMedicalRecordForPatient(
  patientId: string
): MedicalRecord | undefined {
  return medicalRecordsByPatientId[patientId];
}
