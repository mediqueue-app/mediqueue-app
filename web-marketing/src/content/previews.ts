export type DemoRequest = {
  id: string;
  patient: string;
  initials: string;
  age: number;
  gender: string;
  country: string;
  city: string;
  treatment: string;
  symptom: string;
  requestedDate: string;
  budget: string;
  language: string;
  createdAt: string;
};

export type PreviewsContent = {
  reviews: string;
  matchPatientDemo: string;
  clinicCode: string;
  incomingCityAge: string;
  incomingTreatment: string;
  incomingLanguages: string;
  incomingRhinoplasty: string;
  clinicCard: {
    alt: string;
    badge: string;
    name: string;
    location: string;
    specialty: string;
    price: string;
  };
  requests: {
    chromeLabel: string;
    title: string;
    subtitle: string;
    pending: string;
    approved: string;
    all: string;
    waiting: string;
    approve: string;
    reject: string;
    treatmentLabel: string;
    dateLabel: string;
    cityLabel: string;
    budgetLabel: string;
    languagesLabel: string;
    notesLabel: string;
    yearsOld: string;
    items: DemoRequest[];
  };
  compareClinics: {
    code: string;
    specialty: string;
    rating: number;
    reviews: number;
    region: string;
  }[];
  schedule: {
    kicker: string;
    title: string;
    summary: string;
    fullCalendar: string;
    items: { time: string; name: string; treatment: string }[];
  };
  optional: string;
  compareChromeLabel: string;
  compareTitle: string;
  compareSubtitle: string;
  scheduleChromeLabel: string;
  scheduleTitle: string;
  scheduleSubtitle: string;
  kpi: { label: string; value: string }[];
  doctor: {
    overviewKicker: string;
    overviewTitle: string;
    statAppointments: string;
    statMessages: string;
    statNew: string;
    patientsKicker: string;
    patientsTitle: string;
    calendarKicker: string;
    calendarTitle: string;
    days: string[];
    messagesKicker: string;
    messagesTitle: string;
    you: string;
    profileKicker: string;
    profileTitle: string;
    profileName: string;
    profileMeta: string;
    profileBio: string;
    editProfile: string;
    reviewsCount: string;
    scheduleKicker: string;
    scheduleTitle: string;
    stages: [string, string, string];
    treatments: [string, string, string];
    patientMsg1: string;
    doctorMsg1: string;
    patientMsg2: string;
  };
};

export const trPreviews: PreviewsContent = {
  reviews: "değerlendirme",
  matchPatientDemo: "Thomas M. · Münih, Almanya",
  clinicCode: "Örnek Klinik A",
  incomingCityAge: "Doha, Katar · 34",
  incomingTreatment: "Saç Ekimi (DHI)",
  incomingLanguages: "Arapça, İngilizce",
  incomingRhinoplasty: "Lyon · Rinoplasti",
  clinicCard: {
    alt: "Örnek Klinik B — hasta uygulaması kapak görseli",
    badge: "Akredite",
    name: "Örnek Klinik B",
    location: "Şişli, İstanbul",
    specialty: "Estetik & Plastik Cerrahi · Saç Ekimi",
    price: "₺12.000 – ₺45.000",
  },
  requests: {
    chromeLabel: "clinic · Randevu Talepleri",
    title: "Randevu Talepleri",
    subtitle:
      "pazar yerinden gelen hasta taleplerini değerlendirin, onaylayın veya reddedin.",
    pending: "Bekleyen",
    approved: "Onaylanan",
    all: "Tümü",
    waiting: "Bekliyor",
    approve: "Onayla",
    reject: "Reddet",
    treatmentLabel: "Talep Edilen Tedavi",
    dateLabel: "İstenen Tarih",
    cityLabel: "Şehir / Ülke",
    budgetLabel: "Bütçe Aralığı",
    languagesLabel: "Konuştuğu Diller",
    notesLabel: "Semptom / Not",
    yearsOld: "yaşında",
    items: [
      {
        id: "r1",
        patient: "Ahmed Al-Farsi",
        initials: "AA",
        age: 34,
        gender: "Erkek",
        country: "Katar",
        city: "Doha",
        treatment: "Saç Ekimi (DHI)",
        symptom:
          "Ön saç çizgisinde belirgin dökülme, 3. seviye erkek tipi kelliğe doğru ilerliyor.",
        requestedDate: "24 Tem 2026",
        budget: "€2.000 - €3.500",
        language: "Arapça, İngilizce",
        createdAt: "2 saat önce",
      },
      {
        id: "r2",
        patient: "Sophie Laurent",
        initials: "SL",
        age: 29,
        gender: "Kadın",
        country: "Fransa",
        city: "Lyon",
        treatment: "Rinoplasti",
        symptom:
          "Burun kemeri ve nefes almada zorluk; hem estetik hem fonksiyonel düzeltme talep ediyor.",
        requestedDate: "2 Ağu 2026",
        budget: "€3.000 - €5.000",
        language: "Fransızca, İngilizce",
        createdAt: "5 saat önce",
      },
    ],
  },
  compareClinics: [
    { code: "Örnek Klinik B", specialty: "Saç Ekimi (DHI)", rating: 4.9, reviews: 128, region: "İstanbul" },
    { code: "Örnek Klinik C", specialty: "Saç Ekimi (FUE)", rating: 4.8, reviews: 94, region: "İstanbul" },
    { code: "XYZ Klinik", specialty: "Saç Ekimi (Sapphire)", rating: 4.9, reviews: 211, region: "Ankara" },
  ],
  schedule: {
    kicker: "Günlük akış",
    title: "Bugünün Programı",
    summary: "3 randevu · 0 tamamlandı",
    fullCalendar: "Tam takvim",
    items: [
      { time: "09:30", name: "Ahmed Al-Farsi", treatment: "Saç Ekimi (DHI)" },
      { time: "11:00", name: "Sophie Laurent", treatment: "Rinoplasti" },
      { time: "14:15", name: "James Whitfield", treatment: "Diş İmplantı" },
    ],
  },
  compareChromeLabel: "patient · Klinik Kıyaslama",
  optional: "İsteğe bağlı",
  compareTitle: "Klinik Kıyaslama",
  compareSubtitle: "akredite klinikleri kıyaslayın ve doğrudan iletişime geçin.",
  scheduleChromeLabel: "doctor · Günlük Program",
  scheduleTitle: "Bugünün Programı",
  scheduleSubtitle: "günlük operasyonel takviminizi ve hasta akışınızı yönetin.",
  kpi: [
    { label: "Yeni Randevu Talepleri", value: "12" },
    { label: "Aktif Hastalar", value: "34" },
    { label: "Platform Görünürlüğü", value: "8.4k" },
    { label: "Aylık Beklenen Gelir", value: "₺186k" },
  ],
  doctor: {
    overviewKicker: "Günlük akış",
    overviewTitle: "Özet",
    statAppointments: "Randevu",
    statMessages: "Mesaj",
    statNew: "Yeni talep",
    patientsKicker: "Hasta listesi",
    patientsTitle: "Hastalarım",
    calendarKicker: "Müsaitlik",
    calendarTitle: "Takvim",
    days: ["Pzt", "Sal", "Çar", "Per", "Cum"],
    messagesKicker: "Hasta iletişimi",
    messagesTitle: "Mesajlar",
    you: "Siz",
    profileKicker: "Hasta görünümü",
    profileTitle: "Profil",
    profileName: "Dr. Ayşe Yılmaz",
    profileMeta: "Plastik Cerrahi · 12 yıl deneyim",
    profileBio:
      "Saç ekimi, rinoplasti ve estetik cerrahi alanlarında uluslararası hasta deneyimi.",
    editProfile: "Profili düzenle",
    reviewsCount: "4.9 (128)",
    scheduleKicker: "Günlük akış",
    scheduleTitle: "Bugünün Programı",
    stages: ["Randevu onaylandı", "Teklif gönderildi", "Yeni talep"],
    treatments: ["Saç Ekimi (DHI)", "Rinoplasti", "Diş İmplantı"],
    patientMsg1: "Merhaba doktor, DHI saç ekimi için uygun tarihleriniz neler?",
    doctorMsg1: "Hello Ahmed — I have slots on Tuesday and Thursday next week.",
    patientMsg2: "Could you share the rhinoplasty recovery timeline?",
  },
};

export const enPreviews: PreviewsContent = {
  reviews: "reviews",
  matchPatientDemo: "Demo patient · #P-4821",
  clinicCode: "Clinic #A1B2",
  incomingCityAge: "Doha, Qatar · 34",
  incomingTreatment: "Hair transplant (DHI)",
  incomingLanguages: "Arabic, English",
  incomingRhinoplasty: "Lyon · Rhinoplasty",
  clinicCard: {
    alt: "Sample Clinic B — clinic cover from the patient app mock",
    badge: "Accredited",
    name: "Sample Clinic B",
    location: "Şişli, Istanbul",
    specialty: "Aesthetic & plastic surgery · Hair transplant",
    price: "₺12,000 – ₺45,000",
  },
  requests: {
    chromeLabel: "clinic · Appointment requests",
    title: "Appointment requests",
    subtitle: "Review marketplace requests — approve, decline, or reply.",
    pending: "Pending",
    approved: "Approved",
    all: "All",
    waiting: "Waiting",
    approve: "Approve",
    reject: "Decline",
    treatmentLabel: "Requested treatment",
    dateLabel: "Preferred date",
    cityLabel: "City / country",
    budgetLabel: "Budget range",
    languagesLabel: "Languages",
    notesLabel: "Symptom / note",
    yearsOld: "years old",
    items: [
      {
        id: "r1",
        patient: "Ahmed Al-Farsi",
        initials: "AA",
        age: 34,
        gender: "Male",
        country: "Qatar",
        city: "Doha",
        treatment: "Hair transplant (DHI)",
        symptom:
          "Noticeable recession of the hairline, progressing toward stage-3 male pattern baldness.",
        requestedDate: "24 Jul 2026",
        budget: "€2,000 - €3,500",
        language: "Arabic, English",
        createdAt: "2 hours ago",
      },
      {
        id: "r2",
        patient: "Sophie Laurent",
        initials: "SL",
        age: 29,
        gender: "Female",
        country: "France",
        city: "Lyon",
        treatment: "Rhinoplasty",
        symptom:
          "Nasal hump and breathing difficulty; requesting both aesthetic and functional correction.",
        requestedDate: "2 Aug 2026",
        budget: "€3,000 - €5,000",
        language: "French, English",
        createdAt: "5 hours ago",
      },
    ],
  },
  compareClinics: [
    { code: "Sample Clinic B", specialty: "Hair Transplant (DHI)", rating: 4.9, reviews: 128, region: "Istanbul" },
    { code: "Sample Clinic C", specialty: "Hair Transplant (FUE)", rating: 4.8, reviews: 94, region: "Istanbul" },
    { code: "XYZ Clinic", specialty: "Hair Transplant (Sapphire)", rating: 4.9, reviews: 211, region: "Ankara" },
  ],
  schedule: {
    kicker: "Daily flow",
    title: "Today's schedule",
    summary: "3 appointments · 0 completed",
    fullCalendar: "Full calendar",
    items: [
      { time: "09:30", name: "Ahmed Al-Farsi", treatment: "Hair transplant (DHI)" },
      { time: "11:00", name: "Sophie Laurent", treatment: "Rhinoplasty" },
      { time: "14:15", name: "James Whitfield", treatment: "Dental implant" },
    ],
  },
  compareChromeLabel: "patient · Clinic comparison",
  optional: "Optional",
  compareTitle: "Clinic comparison",
  compareSubtitle: "compare accredited clinics and connect directly.",
  scheduleChromeLabel: "doctor · Today's schedule",
  scheduleTitle: "Today's schedule",
  scheduleSubtitle: "manage your daily calendar and patient flow.",
  kpi: [
    { label: "New appointment requests", value: "12" },
    { label: "Active patients", value: "34" },
    { label: "Platform visibility", value: "8.4k" },
    { label: "Expected monthly revenue", value: "₺186k" },
  ],
  doctor: {
    overviewKicker: "Daily flow",
    overviewTitle: "Overview",
    statAppointments: "Appointments",
    statMessages: "Messages",
    statNew: "New request",
    patientsKicker: "Patient list",
    patientsTitle: "My patients",
    calendarKicker: "Availability",
    calendarTitle: "Calendar",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    messagesKicker: "Patient communication",
    messagesTitle: "Messages",
    you: "You",
    profileKicker: "Patient view",
    profileTitle: "Profile",
    profileName: "Dr. Ayşe Yılmaz",
    profileMeta: "Plastic surgery · 12 years experience",
    profileBio:
      "International patient experience in hair transplant, rhinoplasty, and aesthetic surgery.",
    editProfile: "Edit profile",
    reviewsCount: "4.9 (128)",
    scheduleKicker: "Daily flow",
    scheduleTitle: "Today's schedule",
    stages: ["Appointment confirmed", "Quote sent", "New request"],
    treatments: ["Hair transplant (DHI)", "Rhinoplasty", "Dental implant"],
    patientMsg1: "Hello doctor, which dates work for a DHI hair transplant?",
    doctorMsg1: "Hello Ahmed — I have slots on Tuesday and Thursday next week.",
    patientMsg2: "Could you share the rhinoplasty recovery timeline?",
  },
};
