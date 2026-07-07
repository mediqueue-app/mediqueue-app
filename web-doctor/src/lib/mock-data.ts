import type {
  ActivityItem,
  Appointment,
  AvailabilitySlot,
  ChatThread,
  DoctorProfile,
  Patient,
  QueuePatient,
  QuickStats,
  TimelineStep,
} from "@/types";
import {
  igorMedicalRecord,
  lauraMedicalRecord,
} from "@/lib/mock-dental-records";
import { mockDateKey, mockDateTime } from "@/lib/mock-date";

const TIMELINE_LABELS = [
  "Keşif ve Eşleşme",
  "Ön Görüşme / Teklif",
  "Kesinleştirme",
  "Hazırlık (belge yükleme)",
  "Fiziksel Ziyaret",
  "Tedavi",
  "Post-Op Takip",
] as const;

function buildTimeline(activeStep: number): TimelineStep[] {
  return TIMELINE_LABELS.map((label, index) => {
    const step = index + 1;
    let status: TimelineStep["status"] = "BEKLIYOR";
    if (step < activeStep) status = "TAMAMLANDI";
    else if (step === activeStep) status = "AKTIF";
    return {
      id: step,
      label,
      description:
        step === 1
          ? "Platform üzerinden eşleştirme tamamlandı"
          : step === 4
            ? "Hasta belgelerini yükledi"
            : step === 6
              ? "Tedavi planı uygulanıyor"
              : `${label} aşaması`,
      status,
      completedAt:
        step < activeStep
          ? mockDateTime(-(activeStep - step + 3), "10:00")
          : undefined,
    };
  });
}

const doctorProfile: DoctorProfile = {
  id: "DR-001",
  email: "elif.yilmaz@anadolu-klinik.com",
  fullName: "Elif Yılmaz",
  title: "Op. Dr.",
  specialty:
    "Estetik Cerrahi, Diş Tedavisi, Saç Ekimi, IVF ve Ortopedi (Çok Disiplinli Klinik)",
  languages: ["TR", "EN", "AR"],
  bio: "Anadolu Klinik bünyesinde uluslararası hasta portföyünü yönetiyorum. Estetik cerrahi, diş implantı, saç ekimi ve IVF alanlarında çok disiplinli ekip koordinasyonu sağlıyorum.",
  avatarInitials: "EY",
  rating: 4.9,
  reviewCount: 127,
};

export function getCurrentDoctor(): DoctorProfile {
  return { ...doctorProfile };
}

const quickStatsData: QuickStats = {
  monthlyPatientCount: 34,
  averageRating: 4.9,
  pendingMessageCount: 3,
  weeklyCompletedAppointments: 12,
};

export function getQuickStats(): QuickStats {
  return { ...quickStatsData };
}

export const queuePatient: QueuePatient = {
  patientId: "P-1003",
  patientName: "Klaus Richter",
  treatmentType: "Saç Ekimi",
  scheduledTime: "14:30",
  minutesUntil: 18,
};

type ActivityTemplate = Omit<ActivityItem, "timestamp"> & {
  dayOffset: number;
  time: string;
};

const activityTemplates: ActivityTemplate[] = [
  {
    id: "A1",
    message: "Yeni hasta mesajı: Ahmed Al-Farsi",
    dayOffset: 0,
    time: "11:42",
    type: "message",
  },
  {
    id: "A2",
    message: "Fatima Al-Sayed randevusu onaylandı",
    dayOffset: 0,
    time: "10:15",
    type: "appointment",
  },
  {
    id: "A3",
    message: "Igor Petrov tıbbi rapor yükledi",
    dayOffset: 0,
    time: "09:30",
    type: "document",
  },
  {
    id: "A4",
    message: "Sophie Bernard için yeni not eklendi",
    dayOffset: -1,
    time: "16:20",
    type: "note",
  },
  {
    id: "A5",
    message: "Laura van Dijk post-op takip mesajı gönderdi",
    dayOffset: -1,
    time: "14:05",
    type: "message",
  },
];

export function getRecentActivities(): ActivityItem[] {
  return activityTemplates.map(({ dayOffset, time, ...activity }) => ({
    ...activity,
    timestamp: mockDateTime(dayOffset, time),
  }));
}

type AppointmentTemplate = Omit<Appointment, "date"> & { dayOffset: number };

function buildAppointments(templates: AppointmentTemplate[]): Appointment[] {
  return templates.map(({ dayOffset, ...appointment }) => ({
    ...appointment,
    date: mockDateKey(dayOffset),
  }));
}

const appointmentTemplates: AppointmentTemplate[] = [
  {
    id: "APT-01",
    patientId: "P-1001",
    patientName: "Fatima Al-Sayed",
    dayOffset: 0,
    time: "09:00",
    treatmentType: "Rinoplasti Ön Görüşme",
    status: "TAMAMLANDI",
    durationMinutes: 45,
  },
  {
    id: "APT-02",
    patientId: "P-1002",
    patientName: "James Whitfield",
    dayOffset: 0,
    time: "11:00",
    treatmentType: "Estetik Cerrahi Konsültasyon",
    status: "TAMAMLANDI",
    durationMinutes: 30,
  },
  {
    id: "APT-03",
    patientId: "P-1003",
    patientName: "Klaus Richter",
    dayOffset: 0,
    time: "14:30",
    treatmentType: "Saç Ekimi",
    status: "ONAYLANDI",
    durationMinutes: 120,
  },
  {
    id: "APT-04",
    patientId: "P-1004",
    patientName: "Amina Haddad",
    dayOffset: 0,
    time: "16:45",
    treatmentType: "Post-Op Kontrol",
    status: "BEKLIYOR",
    durationMinutes: 20,
  },
  {
    id: "APT-05",
    patientId: "P-1005",
    patientName: "Sophie Bernard",
    dayOffset: 1,
    time: "11:00",
    treatmentType: "Yüz Germe Konsültasyon",
    status: "ONAYLANDI",
    durationMinutes: 45,
  },
  {
    id: "APT-06",
    patientId: "P-1006",
    patientName: "Ahmed Al-Farsi",
    dayOffset: 1,
    time: "15:30",
    treatmentType: "IVF Ön Değerlendirme",
    status: "BEKLIYOR",
    durationMinutes: 60,
  },
  {
    id: "APT-07",
    patientId: "P-1007",
    patientName: "Igor Petrov",
    dayOffset: 2,
    time: "10:00",
    treatmentType: "Diş İmplant Planlama",
    status: "IPTAL",
    durationMinutes: 30,
  },
  {
    id: "APT-08",
    patientId: "P-1008",
    patientName: "Laura van Dijk",
    dayOffset: 3,
    time: "13:00",
    treatmentType: "Diş İmplant Seansı",
    status: "ONAYLANDI",
    durationMinutes: 90,
  },
  {
    id: "APT-09",
    patientId: "P-1001",
    patientName: "Fatima Al-Sayed",
    dayOffset: -1,
    time: "14:00",
    treatmentType: "Rinoplasti Kontrol",
    status: "TAMAMLANDI",
    durationMinutes: 30,
  },
  {
    id: "APT-10",
    patientId: "P-1007",
    patientName: "Igor Petrov",
    dayOffset: 4,
    time: "10:30",
    treatmentType: "Diş İmplant Kontrol",
    status: "ONAYLANDI",
    durationMinutes: 45,
  },
  {
    id: "APT-11",
    patientId: "P-1002",
    patientName: "James Whitfield",
    dayOffset: 7,
    time: "09:30",
    treatmentType: "Estetik Cerrahi Takip",
    status: "BEKLIYOR",
    durationMinutes: 60,
  },
  {
    id: "APT-12",
    patientId: "P-1005",
    patientName: "Sophie Bernard",
    dayOffset: 0,
    time: "12:00",
    treatmentType: "Yüz Germe Ön Değerlendirme",
    status: "BEKLIYOR",
    durationMinutes: 45,
  },
];

export function getCalendarAppointments(): Appointment[] {
  return buildAppointments(appointmentTemplates);
}

export function getTodayAppointments(): Appointment[] {
  const today = mockDateKey(0);
  return getCalendarAppointments().filter((appointment) => appointment.date === today);
}

type AppointmentHistoryLink =
  | {
      id: string;
      aptId: string;
      outcomeNote?: string;
      time?: string;
      status?: Appointment["status"];
    }
  | {
      id: string;
      dayOffset: number;
      time: string;
      treatmentType: string;
      status: Appointment["status"];
      outcomeNote?: string;
    };

const patientHistoryLinks: Record<string, AppointmentHistoryLink[]> = {
  "P-1001": [
    {
      id: "AH1",
      aptId: "APT-01",
      outcomeNote: "Operasyon tarihi planlandı.",
    },
  ],
  "P-1002": [{ id: "AH2", aptId: "APT-02", outcomeNote: "Hasta teklif değerlendirmesi için 1 hafta süre istedi." }],
  "P-1003": [{ id: "AH3", aptId: "APT-03" }],
  "P-1004": [
    { id: "AH4", aptId: "APT-04", time: "16:45" },
    {
      id: "AH5",
      dayOffset: -17,
      time: "08:00",
      treatmentType: "Karın Germe Operasyonu",
      status: "TAMAMLANDI",
      outcomeNote: "Operasyon başarıyla tamamlandı, taburcu edildi.",
    },
  ],
  "P-1005": [{ id: "AH6", aptId: "APT-05" }],
  "P-1006": [],
  "P-1007": [
    {
      id: "AH7",
      aptId: "APT-07",
      outcomeNote: "Hasta tarihi ertelemek istedi.",
    },
  ],
  "P-1008": [{ id: "AH8", aptId: "APT-08" }],
  "P-1009": [
    {
      id: "AH9",
      dayOffset: -22,
      time: "09:30",
      treatmentType: "Diz Artroskopisi",
      status: "TAMAMLANDI",
      outcomeNote: "Başarılı operasyon, 6 hafta fizik tedavi önerildi.",
    },
  ],
  "P-1010": [],
};

function resolveAppointmentHistory(
  links: AppointmentHistoryLink[],
  apptById: Map<string, Appointment>
): NonNullable<Patient["appointmentHistory"]> {
  return links.map((link) => {
    if ("aptId" in link) {
      const apt = apptById.get(link.aptId);
      if (!apt) {
        throw new Error(`Missing appointment template: ${link.aptId}`);
      }
      return {
        id: link.id,
        date: apt.date,
        time: link.time ?? apt.time,
        treatmentType: apt.treatmentType,
        status: link.status ?? apt.status,
        outcomeNote: link.outcomeNote,
      };
    }
    return {
      id: link.id,
      date: mockDateKey(link.dayOffset),
      time: link.time,
      treatmentType: link.treatmentType,
      status: link.status,
      outcomeNote: link.outcomeNote,
    };
  });
}

function latestVisitDate(
  history: NonNullable<Patient["appointmentHistory"]>
): string {
  if (history.length === 0) return mockDateKey(-30);
  return [...history].sort((a, b) => b.date.localeCompare(a.date))[0]!.date;
}

const patientRecords: Patient[] = [
  {
    id: "P-1001",
    fullName: "Fatima Al-Sayed",
    age: 34,
    gender: "Kadın",
    branch: "aesthetic",
    nationality: "Suudi Arabistan",
    countryCode: "SA",
    languages: ["AR", "EN"],
    phone: "+966 50 123 4567",
    email: "fatima.alsayed@example.sa",
    treatmentType: "Rinoplasti",
    treatmentStatus: "AKTIF",
    lastVisitDate: "2026-07-07",
    avatarInitials: "FA",
    timeline: buildTimeline(6),
    documents: [
      {
        id: "D1",
        type: "PASAPORT",
        fileName: "passport_fatima.pdf",
        uploadedAt: "2026-06-28",
        fileSizeKb: 765,
      },
      {
        id: "D2",
        type: "TIBBI_RAPOR",
        fileName: "kan_tahlili_fatima.pdf",
        uploadedAt: "2026-07-01",
        fileSizeKb: 1100,
      },
    ],
    medicalNotes: [
      {
        id: "N1",
        content:
          "Hasta rinoplasti için uygun aday. Burun septum hafif deviasyon mevcut, operasyon öncesi görüntüleme istendi.",
        createdAt: "2026-07-05T14:00:00",
        authorName: "Op. Dr. Elif Yılmaz",
      },
    ],
    appointmentHistory: [
      {
        id: "AH1",
        date: "2026-07-07",
        time: "09:00",
        treatmentType: "Rinoplasti Ön Görüşme",
        status: "TAMAMLANDI",
        outcomeNote: "Operasyon tarihi 15 Temmuz olarak planlandı.",
      },
    ],
  },
  {
    id: "P-1002",
    fullName: "James Whitfield",
    age: 42,
    gender: "Erkek",
    branch: "aesthetic",
    nationality: "Birleşik Krallık",
    countryCode: "GB",
    languages: ["EN"],
    phone: "+44 7700 900123",
    email: "james.whitfield@example.co.uk",
    treatmentType: "Estetik Cerrahi",
    treatmentStatus: "BEKLEMEDE",
    lastVisitDate: "2026-07-07",
    avatarInitials: "JW",
    timeline: buildTimeline(3),
    documents: [
      {
        id: "D3",
        type: "PASAPORT",
        fileName: "passport_james.pdf",
        uploadedAt: "2026-06-25",
        fileSizeKb: 588,
      },
    ],
    medicalNotes: [],
    appointmentHistory: [
      {
        id: "AH2",
        date: "2026-07-07",
        time: "10:30",
        treatmentType: "Estetik Cerrahi Konsültasyon",
        status: "TAMAMLANDI",
        outcomeNote: "Hasta teklif değerlendirmesi için 1 hafta süre istedi.",
      },
    ],
  },
  {
    id: "P-1003",
    fullName: "Klaus Richter",
    age: 38,
    gender: "Erkek",
    branch: "hair_transplant",
    nationality: "Almanya",
    countryCode: "DE",
    languages: ["DE", "EN"],
    phone: "+49 176 2231 8890",
    email: "klaus.richter@example.de",
    treatmentType: "Saç Ekimi",
    treatmentStatus: "AKTIF",
    lastVisitDate: "2026-07-07",
    avatarInitials: "KR",
    timeline: buildTimeline(6),
    documents: [
      {
        id: "D4",
        type: "PASAPORT",
        fileName: "passport_klaus.pdf",
        uploadedAt: "2026-07-02",
        fileSizeKb: 842,
      },
      {
        id: "D5",
        type: "TIBBI_RAPOR",
        fileName: "sac_analizi_klaus.pdf",
        uploadedAt: "2026-07-03",
        fileSizeKb: 920,
      },
    ],
    medicalNotes: [
      {
        id: "N2",
        content: "FUE tekniği ile 4200 greft planlandı. Donör alan yoğunluğu yeterli.",
        createdAt: "2026-07-04T11:30:00",
        authorName: "Op. Dr. Elif Yılmaz",
      },
    ],
    appointmentHistory: [
      {
        id: "AH3",
        date: "2026-07-07",
        time: "14:30",
        treatmentType: "Saç Ekimi",
        status: "ONAYLANDI",
      },
    ],
  },
  {
    id: "P-1004",
    fullName: "Amina Haddad",
    age: 29,
    gender: "Kadın",
    branch: "bariatric",
    nationality: "Irak",
    countryCode: "IQ",
    languages: ["AR", "EN"],
    phone: "+964 770 123 4567",
    email: "amina.haddad@example.iq",
    treatmentType: "Post-Op Takip",
    treatmentStatus: "AKTIF",
    lastVisitDate: "2026-07-06",
    avatarInitials: "AH",
    timeline: buildTimeline(7),
    documents: [
      {
        id: "D6",
        type: "RONTGEN",
        fileName: "postop_kontrol_amina.jpg",
        uploadedAt: "2026-07-05",
        fileSizeKb: 2100,
      },
    ],
    medicalNotes: [
      {
        id: "N3",
        content: "İyileşme süreci normal seyrediyor. Ödem azalmış, hasta memnun.",
        createdAt: "2026-07-06T09:00:00",
        authorName: "Op. Dr. Elif Yılmaz",
      },
    ],
    appointmentHistory: [
      {
        id: "AH4",
        date: "2026-07-07",
        time: "16:00",
        treatmentType: "Post-Op Kontrol",
        status: "BEKLIYOR",
      },
      {
        id: "AH5",
        date: "2026-06-20",
        time: "08:00",
        treatmentType: "Karın Germe Operasyonu",
        status: "TAMAMLANDI",
        outcomeNote: "Operasyon başarıyla tamamlandı, taburcu edildi.",
      },
    ],
  },
  {
    id: "P-1005",
    fullName: "Sophie Bernard",
    age: 45,
    gender: "Kadın",
    branch: "aesthetic",
    nationality: "Fransa",
    countryCode: "FR",
    languages: ["FR", "EN"],
    phone: "+33 6 12 34 56 78",
    email: "sophie.bernard@example.fr",
    treatmentType: "Yüz Germe",
    treatmentStatus: "AKTIF",
    lastVisitDate: "2026-07-04",
    avatarInitials: "SB",
    timeline: buildTimeline(4),
    documents: [
      {
        id: "D7",
        type: "PASAPORT",
        fileName: "passport_sophie.pdf",
        uploadedAt: "2026-06-30",
        fileSizeKb: 702,
      },
    ],
    medicalNotes: [],
    appointmentHistory: [
      {
        id: "AH6",
        date: "2026-07-08",
        time: "11:00",
        treatmentType: "Yüz Germe Konsültasyon",
        status: "ONAYLANDI",
      },
    ],
  },
  {
    id: "P-1006",
    fullName: "Ahmed Al-Farsi",
    age: 36,
    gender: "Erkek",
    branch: "ivf",
    nationality: "Katar",
    countryCode: "QA",
    languages: ["AR", "EN"],
    phone: "+974 5512 3456",
    email: "ahmed.alfarsi@example.qa",
    treatmentType: "Tüp Bebek (IVF)",
    treatmentStatus: "BEKLEMEDE",
    lastVisitDate: "2026-07-03",
    avatarInitials: "AA",
    timeline: buildTimeline(2),
    documents: [
      {
        id: "D8",
        type: "TIBBI_RAPOR",
        fileName: "ivf_rapor_ahmed.pdf",
        uploadedAt: "2026-07-01",
        fileSizeKb: 1340,
      },
    ],
    medicalNotes: [],
    appointmentHistory: [],
  },
  {
    id: "P-1007",
    fullName: "Igor Petrov",
    age: 51,
    gender: "Erkek",
    branch: "dentistry",
    nationality: "Rusya",
    countryCode: "RU",
    languages: ["RU", "EN"],
    phone: "+7 916 234 5566",
    email: "igor.petrov@example.ru",
    treatmentType: "Diş İmplant ve Restoratif Tedavi",
    treatmentStatus: "BEKLEMEDE",
    lastVisitDate: "2026-07-02",
    avatarInitials: "IP",
    highlightNote: "Sol üst bölgede soğuk hassasiyeti — diş 22 takibi",
    medicalRecord: igorMedicalRecord,
    timeline: buildTimeline(3),
    documents: [
      {
        id: "D9",
        type: "RONTGEN",
        fileName: "dis_tomografi_igor.pdf",
        uploadedAt: "2026-07-02",
        fileSizeKb: 3200,
      },
    ],
    medicalNotes: [],
    appointmentHistory: [
      {
        id: "AH7",
        date: "2026-07-09",
        time: "10:00",
        treatmentType: "Diş İmplant Planlama",
        status: "IPTAL",
        outcomeNote: "Hasta tarihi ertelemek istedi.",
      },
    ],
  },
  {
    id: "P-1008",
    fullName: "Laura van Dijk",
    age: 33,
    gender: "Kadın",
    branch: "dentistry",
    nationality: "Hollanda",
    countryCode: "NL",
    languages: ["EN", "DE"],
    phone: "+31 6 1234 5678",
    email: "laura.vandijk@example.nl",
    treatmentType: "Diş İmplant ve Protez",
    treatmentStatus: "AKTIF",
    lastVisitDate: "2026-07-01",
    avatarInitials: "LD",
    highlightNote: "Ön bölgede estetik restorasyon planı devam ediyor",
    medicalRecord: lauraMedicalRecord,
    timeline: buildTimeline(5),
    documents: [
      {
        id: "D10",
        type: "PASAPORT",
        fileName: "passport_laura.pdf",
        uploadedAt: "2026-06-28",
        fileSizeKb: 640,
      },
    ],
    medicalNotes: [
      {
        id: "N4",
        content:
          "Ön bölgede implant için kemik hacmi yeterli. Lokal anestezi altında implant yerleştirme planlandı.",
        createdAt: "2026-07-01T15:00:00",
        authorName: "Op. Dr. Elif Yılmaz",
      },
    ],
    appointmentHistory: [
      {
        id: "AH8",
        date: "2026-07-10",
        time: "13:00",
        treatmentType: "Diş İmplant Seansı",
        status: "ONAYLANDI",
      },
    ],
  },
  {
    id: "P-1009",
    fullName: "Youssef Ben Ali",
    age: 47,
    gender: "Erkek",
    branch: "orthopedics",
    nationality: "Libya",
    countryCode: "LY",
    languages: ["AR", "FR"],
    phone: "+218 91 234 5678",
    email: "youssef.benali@example.ly",
    treatmentType: "Ortopedi",
    treatmentStatus: "TAMAMLANDI",
    lastVisitDate: "2026-06-15",
    avatarInitials: "YB",
    timeline: buildTimeline(7),
    documents: [],
    medicalNotes: [],
    appointmentHistory: [
      {
        id: "AH9",
        date: "2026-06-15",
        time: "09:30",
        treatmentType: "Diz Artroskopisi",
        status: "TAMAMLANDI",
        outcomeNote: "Başarılı operasyon, 6 hafta fizik tedavi önerildi.",
      },
    ],
  },
  {
    id: "P-1010",
    fullName: "Robert Miller",
    age: 55,
    gender: "Erkek",
    branch: "cardiology",
    nationality: "Amerika Birleşik Devletleri",
    countryCode: "US",
    languages: ["EN"],
    phone: "+1 305 234 5678",
    email: "robert.miller@example.com",
    treatmentType: "Kardiyoloji Check-up",
    treatmentStatus: "BEKLEMEDE",
    lastVisitDate: "2026-06-28",
    avatarInitials: "RM",
    timeline: buildTimeline(2),
    documents: [
      {
        id: "D11",
        type: "TIBBI_RAPOR",
        fileName: "ekg_robert.pdf",
        uploadedAt: "2026-06-27",
        fileSizeKb: 1580,
      },
    ],
    medicalNotes: [],
    appointmentHistory: [],
  },
];

export function getPatients(): Patient[] {
  const apptById = new Map(
    getCalendarAppointments().map((appointment) => [appointment.id, appointment])
  );

  return patientRecords.map((patient) => {
    const appointmentHistory = resolveAppointmentHistory(
      patientHistoryLinks[patient.id] ?? [],
      apptById
    );
    return {
      ...patient,
      appointmentHistory,
      lastVisitDate: latestVisitDate(appointmentHistory),
    };
  });
}

type ChatMessageTemplate = {
  id: string;
  sender: "patient" | "doctor";
  content: string;
  dayOffset: number;
  time: string;
};

type ChatThreadTemplate = Omit<ChatThread, "lastMessageAt" | "messages"> & {
  lastMessageDayOffset: number;
  lastMessageTime: string;
  messageTemplates: ChatMessageTemplate[];
};

const chatThreadTemplates: ChatThreadTemplate[] = [
  {
    id: "C1",
    patientId: "P-1006",
    patientName: "Ahmed Al-Farsi",
    countryCode: "QA",
    lastMessage: "Doktor hanım, tedavi süreci hakkında bilgi alabilir miyim?",
    lastMessageDayOffset: 0,
    lastMessageTime: "11:42",
    unreadCount: 2,
    messageTemplates: [
      {
        id: "M1",
        sender: "patient",
        content: "Merhaba, IVF tedavisi için süreç ne kadar sürer?",
        dayOffset: 0,
        time: "11:30",
      },
      {
        id: "M2",
        sender: "doctor",
        content:
          "Merhaba Ahmed Bey, ön değerlendirme sonrası genellikle 2-3 haftalık bir hazırlık süreci olur.",
        dayOffset: 0,
        time: "11:35",
      },
      {
        id: "M3",
        sender: "patient",
        content: "Doktor hanım, tedavi süreci hakkında bilgi alabilir miyim?",
        dayOffset: 0,
        time: "11:42",
      },
    ],
  },
  {
    id: "C2",
    patientId: "P-1003",
    patientName: "Klaus Richter",
    countryCode: "DE",
    lastMessage: "Teşekkürler, yarın görüşmek üzere.",
    lastMessageDayOffset: 0,
    lastMessageTime: "08:15",
    unreadCount: 0,
    messageTemplates: [
      {
        id: "M4",
        sender: "patient",
        content: "Operasyon öncesi özel bir hazırlık yapmam gerekiyor mu?",
        dayOffset: 0,
        time: "08:00",
      },
      {
        id: "M5",
        sender: "doctor",
        content:
          "Kan sulandırıcı kullanmamanızı ve operasyondan 8 saat önce aç kalmanızı rica ederim.",
        dayOffset: 0,
        time: "08:10",
      },
      {
        id: "M6",
        sender: "patient",
        content: "Teşekkürler, yarın görüşmek üzere.",
        dayOffset: 0,
        time: "08:15",
      },
    ],
  },
  {
    id: "C3",
    patientId: "P-1004",
    patientName: "Amina Haddad",
    countryCode: "IQ",
    lastMessage: "Ödem tamamen geçti, çok teşekkürler.",
    lastMessageDayOffset: -1,
    lastMessageTime: "14:05",
    unreadCount: 1,
    messageTemplates: [
      {
        id: "M7",
        sender: "patient",
        content: "Ödem tamamen geçti, çok teşekkürler.",
        dayOffset: -1,
        time: "14:05",
      },
    ],
  },
];

export function getChatThreads(): ChatThread[] {
  return chatThreadTemplates.map(
    ({ lastMessageDayOffset, lastMessageTime, messageTemplates, ...thread }) => ({
      ...thread,
      lastMessageAt: mockDateTime(lastMessageDayOffset, lastMessageTime),
      messages: messageTemplates.map(({ dayOffset, time, ...message }) => ({
        ...message,
        timestamp: mockDateTime(dayOffset, time),
      })),
    })
  );
}

const availabilitySlotsData: AvailabilitySlot[] = [
  {
    dayOfWeek: 1,
    label: "Pazartesi",
    slots: [
      { hour: "09:00", available: true },
      { hour: "10:00", available: true },
      { hour: "11:00", available: false },
      { hour: "14:00", available: true },
      { hour: "15:00", available: true },
      { hour: "16:00", available: false },
    ],
  },
  {
    dayOfWeek: 2,
    label: "Salı",
    slots: [
      { hour: "09:00", available: true },
      { hour: "10:00", available: false },
      { hour: "11:00", available: true },
      { hour: "14:00", available: true },
      { hour: "15:00", available: true },
    ],
  },
  {
    dayOfWeek: 3,
    label: "Çarşamba",
    slots: [
      { hour: "09:00", available: true },
      { hour: "10:00", available: true },
      { hour: "14:00", available: false },
      { hour: "15:00", available: true },
    ],
  },
  {
    dayOfWeek: 4,
    label: "Perşembe",
    slots: [
      { hour: "09:00", available: true },
      { hour: "10:00", available: true },
      { hour: "11:00", available: true },
      { hour: "14:00", available: true },
    ],
  },
  {
    dayOfWeek: 5,
    label: "Cuma",
    slots: [
      { hour: "09:00", available: false },
      { hour: "10:00", available: true },
      { hour: "11:00", available: true },
    ],
  },
];

export function getAvailabilitySlots(): AvailabilitySlot[] {
  return availabilitySlotsData.map((day) => ({
    ...day,
    slots: day.slots.map((slot) => ({ ...slot })),
  }));
}

export function getPatientById(id: string): Patient | undefined {
  return getPatients().find((p) => p.id === id);
}
