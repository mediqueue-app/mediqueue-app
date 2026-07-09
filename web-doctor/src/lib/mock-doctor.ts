import type { Appointment, DoctorProfile, ScheduleSlot } from "@/types";

export const currentDoctor: DoctorProfile = {
  id: "doc-001",
  clinicId: "clinic-istanbul-est-01",
  fullName: "Emre Yalçın",
  title: "Op. Dr.",
  specialty: "Saç Ekimi ve Estetik Cerrahi",
  specialties: [
    "Saç Ekimi (FUE / DHI)",
    "Rinoplasti",
    "Yüz Germe",
    "Vücut Konturlama",
  ],
  languages: ["TR", "EN", "DE", "RU"],
  status: "MÜSAİT",
  roomNumber: "Kat 3 · Oda 312",
  bio: "15 yıllık klinik deneyimiyle uluslararası hastalara saç ekimi, rinoplasti ve vücut konturlama alanlarında doğal sonuç odaklı, kişiye özel cerrahi planlar sunuyor. Avrupa Estetik, Plastik ve Rekonstrüktif Cerrahi Derneği (EBOPRAS) üyesi.",
  avatarUrl: "/doctors/emre-yalcin.jpg",
  yearsOfExperience: 15,
  education: [
    "İstanbul Üniversitesi Tıp Fakültesi",
    "Marmara Üniversitesi Plastik, Rekonstrüktif ve Estetik Cerrahi Uzmanlığı",
  ],
  workingHours: [
    { day: "Pazartesi", startTime: "09:00", endTime: "18:00", isActive: true },
    { day: "Salı", startTime: "09:00", endTime: "18:00", isActive: true },
    { day: "Çarşamba", startTime: "09:00", endTime: "18:00", isActive: true },
    { day: "Perşembe", startTime: "09:00", endTime: "18:00", isActive: true },
    { day: "Cuma", startTime: "09:00", endTime: "16:00", isActive: true },
    { day: "Cumartesi", startTime: "10:00", endTime: "14:00", isActive: true },
    { day: "Pazar", startTime: "09:00", endTime: "13:00", isActive: false },
  ],
};

// "Bugün" bu mock veri seti için 2026-07-05 (Pazar) olarak sabitlenmiştir.
export const TODAY_ISO = "2026-07-05";

export const appointments: Appointment[] = [
  {
    id: "apt-000a",
    patientName: "Marco Weber",
    patientAge: 39,
    countryCode: "CH",
    spokenLanguage: "DE",
    branch: "Rinoplasti",
    date: "2026-07-02",
    timeSlot: "10:00",
    status: "TAMAMLANDI",
    chiefComplaint:
      "Travma sonrası burun deformitesi düzeltme ameliyatı başarıyla tamamlandı; 1. hafta kontrolü yapıldı.",
    translatorNeeded: true,
    documents: [
      { id: "doc-000a-1", title: "Ameliyat Sonrası Rapor", type: "TIBBI_RAPOR", date: "2026-07-02", thumbnailUrl: "/docs/apt-000a-rapor.jpg" },
      { id: "doc-000a-2", title: "1. Hafta Kontrol Fotoğrafları", type: "FOTOĞRAF", date: "2026-07-02", thumbnailUrl: "/docs/apt-000a-foto.jpg" },
    ],
  },
  {
    id: "apt-000b",
    patientName: "Elena Petrova",
    patientAge: 33,
    countryCode: "BG",
    spokenLanguage: "EN",
    branch: "Saç Ekimi (FUE)",
    date: "2026-07-03",
    timeSlot: "09:00",
    status: "TAMAMLANDI",
    chiefComplaint:
      "Saç ekimi operasyonu tamamlandı; greft ekim yoğunluğu planlandığı gibi uygulandı.",
    translatorNeeded: false,
    documents: [
      { id: "doc-000b-1", title: "Operasyon Raporu", type: "TIBBI_RAPOR", date: "2026-07-03", thumbnailUrl: "/docs/apt-000b-rapor.jpg" },
      { id: "doc-000b-2", title: "Operasyon Sonrası Fotoğraflar", type: "FOTOĞRAF", date: "2026-07-03", thumbnailUrl: "/docs/apt-000b-foto.jpg" },
    ],
  },
  {
    id: "apt-001",
    patientName: "Klaus Fischer",
    patientAge: 44,
    countryCode: "DE",
    spokenLanguage: "DE",
    branch: "Saç Ekimi (FUE)",
    date: "2026-07-05",
    timeSlot: "09:00",
    status: "ONAYLANDI",
    chiefComplaint:
      "Norwood 4 seviyesinde saç dökülmesi; ön saç çizgisi ve tepe bölgesinde yoğunlaştırma talebi.",
    translatorNeeded: true,
    documents: [
      { id: "doc-1-1", title: "Dermatoloji Ön Değerlendirme Raporu", type: "TIBBI_RAPOR", date: "2026-06-28", thumbnailUrl: "/docs/apt-001-rapor.jpg" },
      { id: "doc-1-2", title: "Saç Analizi - Öncesi Fotoğrafları", type: "FOTOĞRAF", date: "2026-06-28", thumbnailUrl: "/docs/apt-001-foto.jpg" },
      { id: "doc-1-3", title: "Pasaport Fotokopisi", type: "PASAPORT", date: "2026-06-25", thumbnailUrl: "/docs/apt-001-pasaport.jpg" },
    ],
  },
  {
    id: "apt-002",
    patientName: "Emily Clarke",
    patientAge: 31,
    countryCode: "GB",
    spokenLanguage: "EN",
    branch: "Rinoplasti",
    date: "2026-07-05",
    timeSlot: "11:00",
    status: "ONAYLANDI",
    chiefComplaint:
      "Burun sırtında kambur ve hafif nefes darlığı; doğal görünümlü estetik revizyon talebi.",
    translatorNeeded: false,
    documents: [
      { id: "doc-2-1", title: "Yüz Fotoğrafları - 3 Açı", type: "FOTOĞRAF", date: "2026-06-30", thumbnailUrl: "/docs/apt-002-foto.jpg" },
      { id: "doc-2-2", title: "KBB Konsültasyon Notu", type: "TIBBI_RAPOR", date: "2026-06-29", thumbnailUrl: "/docs/apt-002-rapor.jpg" },
    ],
  },
  {
    id: "apt-003",
    patientName: "Anastasia Ivanova",
    patientAge: 27,
    countryCode: "RU",
    spokenLanguage: "RU",
    branch: "Meme Estetiği (Augmentasyon)",
    date: "2026-07-05",
    timeSlot: "13:30",
    status: "BEKLEMEDE",
    chiefComplaint:
      "Meme hacminde asimetri; augmentasyon ve simetri düzeltmesi talebi.",
    translatorNeeded: true,
    documents: [
      { id: "doc-3-1", title: "Mamografi Sonuçları", type: "TIBBI_RAPOR", date: "2026-06-20", thumbnailUrl: "/docs/apt-003-mamografi.jpg" },
      { id: "doc-3-2", title: "Pasaport Fotokopisi", type: "PASAPORT", date: "2026-06-20", thumbnailUrl: "/docs/apt-003-pasaport.jpg" },
      { id: "doc-3-3", title: "Klinik Fotoğraf Seti", type: "FOTOĞRAF", date: "2026-06-22", thumbnailUrl: "/docs/apt-003-foto.jpg" },
    ],
  },
  {
    id: "apt-004",
    patientName: "Ahmed Al-Farsi",
    patientAge: 38,
    countryCode: "KW",
    spokenLanguage: "AR",
    branch: "Saç Ekimi (DHI)",
    date: "2026-07-05",
    timeSlot: "15:00",
    status: "ONAYLANDI",
    chiefComplaint:
      "Sakal ve saç bölgesinde eş zamanlı greft talebi; yoğun iş programı nedeniyle hızlı iyileşme önceliği var.",
    translatorNeeded: true,
    documents: [
      { id: "doc-4-1", title: "Genel Sağlık Raporu", type: "TIBBI_RAPOR", date: "2026-06-27", thumbnailUrl: "/docs/apt-004-rapor.jpg" },
      { id: "doc-4-2", title: "Saç ve Sakal Analizi", type: "FOTOĞRAF", date: "2026-06-27", thumbnailUrl: "/docs/apt-004-foto.jpg" },
    ],
  },
  {
    id: "apt-005",
    patientName: "Yusuf Al-Sayed",
    patientAge: 46,
    countryCode: "AE",
    spokenLanguage: "AR",
    branch: "Saç Ekimi (FUE) + Kaş Ekimi",
    date: "2026-07-05",
    timeSlot: "17:00",
    status: "BEKLEMEDE",
    chiefComplaint:
      "Yoğun saç dökülmesi ve seyrek kaşlar için kombine greft planlaması talebi.",
    translatorNeeded: true,
    documents: [
      { id: "doc-5-1", title: "Genel Sağlık Raporu", type: "TIBBI_RAPOR", date: "2026-07-01", thumbnailUrl: "/docs/apt-005-rapor.jpg" },
      { id: "doc-5-2", title: "Saç ve Kaş Analizi", type: "FOTOĞRAF", date: "2026-07-01", thumbnailUrl: "/docs/apt-005-foto.jpg" },
      { id: "doc-5-3", title: "Pasaport Fotokopisi", type: "PASAPORT", date: "2026-06-30", thumbnailUrl: "/docs/apt-005-pasaport.jpg" },
    ],
  },
  {
    id: "apt-006",
    patientName: "Liam O'Connor",
    patientAge: 29,
    countryCode: "IE",
    spokenLanguage: "EN",
    branch: "Saç Ekimi (FUE) - Kontrol",
    date: "2026-07-06",
    timeSlot: "09:30",
    status: "TAMAMLANDI",
    chiefComplaint:
      "6 ay önce yapılan ekim sonrası kontrol randevusu; greft tutunma oranı değerlendirmesi.",
    translatorNeeded: false,
    documents: [
      { id: "doc-6-1", title: "6. Ay Kontrol Fotoğrafları", type: "FOTOĞRAF", date: "2026-07-04", thumbnailUrl: "/docs/apt-006-foto.jpg" },
      { id: "doc-6-2", title: "Trikoloji Kontrol Raporu", type: "TIBBI_RAPOR", date: "2026-07-04", thumbnailUrl: "/docs/apt-006-rapor.jpg" },
    ],
  },
  {
    id: "apt-007",
    patientName: "Sophie Dubois",
    patientAge: 52,
    countryCode: "FR",
    spokenLanguage: "FR",
    branch: "Yüz Germe (Facelift)",
    date: "2026-07-06",
    timeSlot: "10:00",
    status: "BEKLEMEDE",
    chiefComplaint:
      "Çene hattında sarkma ve boyun bölgesinde gevşeklik; orta seviye yüz germe talebi.",
    translatorNeeded: true,
    documents: [
      { id: "doc-7-1", title: "Anestezi Ön Değerlendirme Raporu", type: "TIBBI_RAPOR", date: "2026-06-26", thumbnailUrl: "/docs/apt-007-rapor.jpg" },
      { id: "doc-7-2", title: "Öncesi Fotoğraf Seti", type: "FOTOĞRAF", date: "2026-06-26", thumbnailUrl: "/docs/apt-007-foto.jpg" },
      { id: "doc-7-3", title: "Pasaport Fotokopisi", type: "PASAPORT", date: "2026-06-24", thumbnailUrl: "/docs/apt-007-pasaport.jpg" },
    ],
  },
  {
    id: "apt-008",
    patientName: "Nadia Bakker",
    patientAge: 35,
    countryCode: "NL",
    spokenLanguage: "NL",
    branch: "Karın Germe (Tummy Tuck)",
    date: "2026-07-06",
    timeSlot: "14:00",
    status: "ONAYLANDI",
    chiefComplaint:
      "İki doğum sonrası karın bölgesinde deri gevşekliği ve diastasis recti; karın germe ve liposuction kombinasyonu talebi.",
    translatorNeeded: true,
    documents: [
      { id: "doc-8-1", title: "Genel Cerrahi Ön Değerlendirme", type: "TIBBI_RAPOR", date: "2026-06-29", thumbnailUrl: "/docs/apt-008-rapor1.jpg" },
      { id: "doc-8-2", title: "Kan Tahlili Sonuçları", type: "TIBBI_RAPOR", date: "2026-06-29", thumbnailUrl: "/docs/apt-008-rapor2.jpg" },
      { id: "doc-8-3", title: "Vücut Analizi Fotoğrafları", type: "FOTOĞRAF", date: "2026-06-30", thumbnailUrl: "/docs/apt-008-foto.jpg" },
    ],
  },
  {
    id: "apt-009",
    patientName: "Carlos Mendoza",
    patientAge: 41,
    countryCode: "ES",
    spokenLanguage: "ES",
    branch: "Vücut Konturlama (VASER Liposuction)",
    date: "2026-07-07",
    timeSlot: "11:30",
    status: "BEKLEMEDE",
    chiefComplaint:
      "Karın ve bel bölgesinde lokalize yağlanma; VASER liposuction ile kontur belirginleştirme talebi.",
    translatorNeeded: true,
    documents: [
      { id: "doc-9-1", title: "Vücut Fotoğrafları", type: "FOTOĞRAF", date: "2026-07-02", thumbnailUrl: "/docs/apt-009-foto.jpg" },
      { id: "doc-9-2", title: "Kardiyoloji Onayı", type: "TIBBI_RAPOR", date: "2026-07-02", thumbnailUrl: "/docs/apt-009-rapor.jpg" },
    ],
  },
  {
    id: "apt-010",
    patientName: "Isabella Romano",
    patientAge: 34,
    countryCode: "IT",
    spokenLanguage: "EN",
    branch: "Rinoplasti (Revizyon)",
    date: "2026-07-07",
    timeSlot: "13:00",
    status: "ONAYLANDI",
    chiefComplaint:
      "5 yıl önce başka bir klinikte yapılan rinoplasti sonrası burun ucunda düşüklük; revizyon cerrahisi talebi.",
    translatorNeeded: false,
    documents: [
      { id: "doc-10-1", title: "Önceki Ameliyat Raporu (İtalya)", type: "TIBBI_RAPOR", date: "2026-06-18", thumbnailUrl: "/docs/apt-010-rapor.jpg" },
      { id: "doc-10-2", title: "Burun Fotoğrafları - 5 Açı", type: "FOTOĞRAF", date: "2026-06-18", thumbnailUrl: "/docs/apt-010-foto.jpg" },
      { id: "doc-10-3", title: "Pasaport Fotokopisi", type: "PASAPORT", date: "2026-06-15", thumbnailUrl: "/docs/apt-010-pasaport.jpg" },
    ],
  },
];

export const scheduleSlots: ScheduleSlot[] = [
  // Pazar - 2026-07-05 (Bugün)
  { id: "slot-05-1", doctorId: "doc-001", date: "2026-07-05", startTime: "09:00", endTime: "09:30", type: "KONSÜLTASYON", label: "Klaus Fischer - Ön Görüşme", appointmentId: "apt-001" },
  { id: "slot-05-2", doctorId: "doc-001", date: "2026-07-05", startTime: "09:30", endTime: "11:00", type: "MÜSAİT" },
  { id: "slot-05-3", doctorId: "doc-001", date: "2026-07-05", startTime: "11:00", endTime: "11:30", type: "KONSÜLTASYON", label: "Emily Clarke - Ön Görüşme", appointmentId: "apt-002" },
  { id: "slot-05-4", doctorId: "doc-001", date: "2026-07-05", startTime: "11:30", endTime: "13:30", type: "AMELİYAT", label: "Rinoplasti - Ameliyathane 2" },
  { id: "slot-05-5", doctorId: "doc-001", date: "2026-07-05", startTime: "13:30", endTime: "14:00", type: "KONSÜLTASYON", label: "Anastasia Ivanova - Ön Görüşme", appointmentId: "apt-003" },
  { id: "slot-05-6", doctorId: "doc-001", date: "2026-07-05", startTime: "14:00", endTime: "15:00", type: "MÜSAİT" },
  { id: "slot-05-7", doctorId: "doc-001", date: "2026-07-05", startTime: "15:00", endTime: "15:30", type: "KONSÜLTASYON", label: "Ahmed Al-Farsi - Ön Görüşme", appointmentId: "apt-004" },
  { id: "slot-05-8", doctorId: "doc-001", date: "2026-07-05", startTime: "15:30", endTime: "17:00", type: "MÜSAİT" },
  { id: "slot-05-9", doctorId: "doc-001", date: "2026-07-05", startTime: "17:00", endTime: "17:30", type: "KONSÜLTASYON", label: "Yusuf Al-Sayed - Ön Görüşme", appointmentId: "apt-005" },

  // Pazartesi - 2026-07-06
  { id: "slot-06-1", doctorId: "doc-001", date: "2026-07-06", startTime: "09:00", endTime: "09:30", type: "MÜSAİT" },
  { id: "slot-06-2", doctorId: "doc-001", date: "2026-07-06", startTime: "09:30", endTime: "10:00", type: "KONSÜLTASYON", label: "Liam O'Connor - Kontrol", appointmentId: "apt-006" },
  { id: "slot-06-3", doctorId: "doc-001", date: "2026-07-06", startTime: "10:00", endTime: "10:30", type: "KONSÜLTASYON", label: "Sophie Dubois - Ön Görüşme", appointmentId: "apt-007" },
  { id: "slot-06-4", doctorId: "doc-001", date: "2026-07-06", startTime: "10:30", endTime: "14:00", type: "AMELİYAT", label: "Saç Ekimi (FUE) - Ameliyathane 1" },
  { id: "slot-06-5", doctorId: "doc-001", date: "2026-07-06", startTime: "14:00", endTime: "14:30", type: "KONSÜLTASYON", label: "Nadia Bakker - Ön Görüşme", appointmentId: "apt-008" },
  { id: "slot-06-6", doctorId: "doc-001", date: "2026-07-06", startTime: "14:30", endTime: "18:00", type: "MÜSAİT" },

  // Salı - 2026-07-07
  { id: "slot-07-1", doctorId: "doc-001", date: "2026-07-07", startTime: "09:00", endTime: "11:30", type: "AMELİYAT", label: "Karın Germe - Ameliyathane 2" },
  { id: "slot-07-2", doctorId: "doc-001", date: "2026-07-07", startTime: "11:30", endTime: "12:00", type: "KONSÜLTASYON", label: "Carlos Mendoza - Ön Görüşme", appointmentId: "apt-009" },
  { id: "slot-07-3", doctorId: "doc-001", date: "2026-07-07", startTime: "12:00", endTime: "13:00", type: "MÜSAİT" },
  { id: "slot-07-4", doctorId: "doc-001", date: "2026-07-07", startTime: "13:00", endTime: "13:30", type: "KONSÜLTASYON", label: "Isabella Romano - Ön Görüşme", appointmentId: "apt-010" },
  { id: "slot-07-5", doctorId: "doc-001", date: "2026-07-07", startTime: "13:30", endTime: "18:00", type: "MÜSAİT" },

  // Çarşamba - 2026-07-08
  { id: "slot-08-1", doctorId: "doc-001", date: "2026-07-08", startTime: "09:00", endTime: "13:00", type: "AMELİYAT", label: "Vücut Konturlama - Ameliyathane 1" },
  { id: "slot-08-2", doctorId: "doc-001", date: "2026-07-08", startTime: "13:00", endTime: "18:00", type: "MÜSAİT" },

  // Perşembe - 2026-07-09
  { id: "slot-09-1", doctorId: "doc-001", date: "2026-07-09", startTime: "09:00", endTime: "18:00", type: "MÜSAİT" },

  // Cuma - 2026-07-10
  { id: "slot-10-1", doctorId: "doc-001", date: "2026-07-10", startTime: "09:00", endTime: "12:00", type: "MÜSAİT" },
  { id: "slot-10-2", doctorId: "doc-001", date: "2026-07-10", startTime: "12:00", endTime: "16:00", type: "AMELİYAT", label: "Yüz Germe - Ameliyathane 2" },

  // Cumartesi - 2026-07-11
  { id: "slot-11-1", doctorId: "doc-001", date: "2026-07-11", startTime: "10:00", endTime: "14:00", type: "MÜSAİT" },
];

export function getAppointmentById(id: string): Appointment | undefined {
  return appointments.find((a) => a.id === id);
}

export function getTodayAppointments(): Appointment[] {
  return appointments
    .filter((a) => a.date === TODAY_ISO)
    .sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));
}

export function getUpcomingQueueAppointment(): Appointment | undefined {
  return getTodayAppointments().find((a) => a.status !== "TAMAMLANDI");
}

export function getDashboardKpis() {
  const todayCount = getTodayAppointments().length;
  const pendingPreConsults = appointments.filter(
    (a) => a.status === "BEKLEMEDE"
  ).length;
  const weeklyCompletedSurgeries = appointments.filter(
    (a) => a.status === "TAMAMLANDI"
  ).length;
  const internationalCount = appointments.filter(
    (a) => a.countryCode !== "TR"
  ).length;
  const internationalRate = Math.round(
    (internationalCount / appointments.length) * 100
  );

  return {
    todayCount,
    pendingPreConsults,
    weeklyCompletedSurgeries,
    internationalRate,
  };
}
