import type { SiteContent } from "./types";

export const en: SiteContent = {
  seo: {
    title: "MEDIQUEUE — Pay for the patient who shows up",
    description:
      "MEDIQUEUE connects international patients with Turkish clinics. Clinics pay only when a real request arrives — no subscription.",
  },
  nav: {
    links: [
      { href: "/", label: "Home" },
      { href: "/clinics", label: "For clinics" },
      { href: "/patients", label: "For patients" },
      { href: "/doctors", label: "For doctors" },
      { href: "/team", label: "About us" },
    ],
    clinicCta: "Clinic pre-register",
    patientCta: "Patient waitlist",
    localeLabel: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    localeEn: "EN",
    localeTr: "TR",
    skip: "Skip to content",
  },
  home: {
    platformEyebrow:
      "A transparent marketplace for international health travel",
    audiencePatient: "Patient",
    audienceClinic: "Clinic",
    patient: {
      headline: "Entrust your care",
      headlineAccent: "to transparency.",
      subcopy:
        "Compare accredited clinics side by side and message directly. Secure your appointment with a transparent £100 deposit — 100% refundable up to 14 days before your visit. Stripe Secured. No hidden agency commission.",
      primaryCta: "Explore clinics",
      secondaryCta: "About us",
      previewCaption: "Patient app · clinic discovery & compare · demo data",
    },
    clinic: {
      headline: "Pay for the patient",
      headlineAccent: "who shows up.",
      subcopy:
        "Stop burning ad budget. You are charged only when a real request lands in your panel and the patient arrives — no subscription.",
      primaryCta: "For my clinic",
      secondaryCta: "See the flow",
      previewCaption: "Clinic panel · appointment requests · demo data",
    },
    proof: [
      { kicker: "Competition", title: "1st among 301 startups" },
      { kicker: "Programme", title: "Kapsül pre-incubation" },
    ],
    match: {
      eyebrow: "Platform mechanics",
      title: "The match moment",
      body: "A patient request is filtered by language, budget, and need — then flows directly to the right clinic profile. No broker — matching stays transparent.",
      patientLabel: "Patient request",
      clinicLabel: "Clinic profile",
      matchBadge: "Matched",
      noBroker: "No broker · direct match",
      patientTags: ["German", "€2,500–3,500", "Hair transplant (DHI)"],
      clinicTags: ["JCI accredited", "DHI specialty", "Available: Jul 2026"],
    },
    doorsEyebrow: "Three doors, one platform",
    doorsTitle: "Each side, its own screen",
    doors: [
      {
        href: "/clinics",
        eyebrow: "Clinics",
        title: "Randevu Talepleri on your desk",
        body: "Approve, quote, message — you pay when the patient arrives.",
        preview: "clinic",
      },
      {
        href: "/patients",
        eyebrow: "Patients",
        title: "Compare, then request",
        body: "Filter clinics and doctors. Appointments are secured with a transparent £100 deposit guarantee (Stripe Secured).",
        preview: "patient",
      },
      {
        href: "/doctors",
        eyebrow: "Doctors",
        title: "Bugünün Programı",
        body: "Hastalarım, Takvim, Mesajlar, Profil — the clinical day in one place.",
        preview: "doctor",
      },
    ],
    trust: [
      { label: "JCI accreditation", detail: "Verified clinics only" },
      { label: "301 startups · 1st", detail: "Kapsül pre-incubation" },
      { label: "Patient privacy", detail: "Identity protection first" },
      { label: "Zero middleman", detail: "Direct clinic–patient contact" },
    ],
    trustStripLabel: "Trust",
    globalReach: {
      eyebrow: "A preview from your clinic panel",
      title: "Patients from every corner of the world",
      subtitle:
        "When your clinic joins MediQueue, you see in your panel — in real time — which countries patient requests come from.",
      panelTitle: "Countries your patients come from",
      panelSubtitle:
        "{patients} international patients applied from {countries} different countries.",
      demoCaption: "Sample clinic panel view · demo data",
      countryColumn: "Country",
      patientColumn: "Patients",
      emptyList:
        "Country breakdown will appear here once your first international requests arrive.",
    },
    finalPatientTitle: "You decide your treatment journey",
    finalPatientBody:
      "Secure your appointment with a transparent £100 deposit — 100% refundable up to 14 days before your visit.",
    finalPatientCta: "Explore clinics",
    finalClinicTitle: "Welcome international patients at zero risk",
    finalClinicBody:
      "Pay only when the patient arrives and treatment is confirmed. No panel subscription.",
    finalClinicCta: "Add your clinic",
  },
  clinics: {
    seoTitle: "For clinics",
    heroTag:
      "Stop pouring a fortune into ads. Pay only for the patient who converts.",
    heroSub:
      "Invest in outcomes, not clicks or hope. Zero risk, high conversion in international health travel. No panel subscription — you pay only when the patient arrives and treatment is confirmed.",
    primaryCta: "Add your clinic — free",
    secondaryCta: "How the system works",
    requestLabel: "New appointment request",
    requestBudget: "Budget",
    requestTreatment: "Treatment",
    requestLanguage: "Language",
    requestReview: "Review request",
    metricCaption: "Clinic panel view · sample data",
    panelLabel: "Clinic panel",
    compareEyebrow: "Why",
    compareTitle: "Leave the old playbook. Take your margin back.",
    compareBeforeLabel: "Traditional approach",
    compareAfterLabel: "with",
    compareCriteriaLabel: "Criterion",
    compareRows: [
      {
        title: "Marketing cost",
        before: "High ad spend with clicks that do not guarantee outcomes",
        after:
          "No panel subscription — you are charged only when a patient arrives and treatment is confirmed",
      },
      {
        title: "Patient quality",
        before: "Unfiltered requests with unclear intent",
        after:
          "Patients whose budget, language, and treatment need are already clarified",
      },
      {
        title: "Drop-off / wasted investment",
        before:
          "Time and budget spent on consultation, quotes, and communication are lost entirely when the patient walks away at the last minute",
        after:
          "Payment is taken only when the patient actually arrives — no pre-approval cost risk; drop-off does not hit your budget",
        highlight: true,
      },
      {
        title: "Operational load",
        before:
          "Request tracking, translation, and coordination scattered across email, WhatsApp, and phone",
        after:
          "One panel for requests, quotes, messaging, and approval",
      },
      {
        title: "International reach",
        before: "Limited flow, often dependent on a single market",
        after:
          "Access to a global pool of patients actively seeking accredited care",
      },
    ],
    roadmapTitle: "Your clinic roadmap",
    roadmapIntro:
      "Step by step after you join MediQueue — minimum effort for the clinic, maximum load carried by the platform.",
    roadmapClinicLabel: "Clinic",
    roadmapMqLabel: "handles",
    roadmapSteps: [
      {
        title: "Application & review",
        clinic:
          "Upload accreditation documents (JCI or equivalent) and pass a short approval process.",
        mediQueue:
          "Trust building, marketing asset preparation, and international compliance checks are handled by MediQueue.",
        previewHint:
          "Accreditation documents are uploaded in the digital panel; approval status is tracked in real time.",
      },
      {
        title: "Profile live",
        clinic:
          "Define your specialties, price ranges, and availability.",
        mediQueue:
          "Visual/copy optimization, multilingual presentation, SEO, and marketing — the clinic writes no ad copy.",
        previewHint:
          "Profile, pricing, and availability — multilingual presentation is prepared automatically.",
      },
      {
        title: "Qualified request arrives",
        clinic:
          "See a patient request in your panel with budget, language, and need already filtered.",
        mediQueue:
          "Lead filtering, language/budget matching, and spam removal are automatic — you only see real candidates.",
      },
      {
        title: "Direct contact & quote",
        clinic:
          "Speak with the patient on-platform (bilingual/auto-translated when needed) and submit your offer.",
        mediQueue:
          "Translation infrastructure, secure messaging, and process tracking — the clinic focuses on medical expertise.",
      },
      {
        title: "Patient approval & travel",
        clinic:
          "Confirm the treatment date and prepare internally.",
        mediQueue:
          "Flight/accommodation coordination and travel logistics are not the clinic's responsibility — the patient arrives ready.",
        previewHint:
          "Treatment date is confirmed; travel logistics are coordinated on the patient side.",
      },
      {
        title: "Payment when patient arrives",
        clinic:
          "Deliver treatment; MediQueue commission is deducted only at this stage, on completed treatment.",
        mediQueue:
          "Fake or lost-request risk sits with MediQueue — the clinic is charged only on completed treatment.",
        previewHint:
          "Commission applies when treatment is delivered — zero cost risk beforehand.",
      },
      {
        title: "Post-treatment follow-up",
        clinic: "Plan required medical check-ups.",
        mediQueue:
          "Recovery tracking, reminders, and satisfaction management run through the digital assistant — less operational follow-up for the clinic.",
      },
    ],
    performanceTitle: "This month's performance",
    metrics: [
      {
        label: "Active patients",
        value: "34",
        hint: "International patients in treatment",
      },
      {
        label: "Pending quotes",
        value: "8",
        hint: "Structured offers awaiting response",
      },
      {
        label: "Expected monthly revenue",
        value: "₺186k",
        hint: "Projection from confirmed requests",
      },
    ],
    analytics: {
      eyebrow: "Patient analytics",
      title: "Know where your patients come from. Decide with data.",
      body:
        "Your MediQueue panel maps how much demand you receive from each country in real time — without a separate reporting tool or integration. If volume from Germany is rising, you can reserve capacity for that market; if another country softens, you can reallocate marketing spend. This is not a random summary: it is a source that updates with every request in your panel and feeds your international growth and operations decisions directly.",
      panelTitle: "Countries your patients come from",
      panelSubtitle:
        "{patients} international patients applied from {countries} different countries.",
      demoCaption: "Sample clinic panel view · demo data",
      countryColumn: "Country",
      patientColumn: "Patients",
      emptyList:
        "Country breakdown will appear here once your first international requests arrive.",
      highlights: [
        {
          title: "Country-level distribution",
          body: "Track demand by market instantly on the globe map and ranked list.",
        },
        {
          title: "Trend tracking",
          body: "See period-over-period change by country and plan capacity and marketing ahead of time.",
        },
        {
          title: "Automatic data collection",
          body: "Built from request records in your panel — no extra tools or manual reporting.",
        },
      ],
    },
    finalTitle: "Zero risk. Open-ended potential.",
    finalBody: "International patients are looking for your clinic. Ready to receive them?",
    finalCta: "Get started",
  },
  patients: {
    seoTitle: "For patients",
    heroTag: "Entrust your health to transparency, not chance.",
    heroSub:
      "Hidden agency commissions, opaque prices, and processes you cannot see are over. MEDIQUEUE puts accredited clinics around the world, real references, and direct communication on one platform. Be the architect of your own treatment journey.",
    primaryCta: "Explore clinics",
    secondaryCta: "Why MEDIQUEUE?",
    whyEyebrow: "Why",
    whyTitle: "How we differ from the old way",
    whyBeforeLabel: "Old way",
    whyAfterLabel: "with",
    whyCriteriaLabel: "Feature / criterion",
    whyRows: [
      {
        title: "The dark agency model is over",
        before:
          "Hidden commissions, opaque prices, and one-sided options pushed by an intermediary.",
        after:
          "A transparent, auditable marketplace. See every approved clinic side by side, without hidden costs.",
      },
      {
        title: "Matching beyond borders",
        before:
          "One or two clinics offered to you — no real filtering by language, budget, or need.",
        after:
          "Filter in seconds by language, budget, and medical need. Only accredited, relevant options remain.",
      },
      {
        title: "Direct communication, no middleman",
        before:
          "A wall between you and the clinic; no clear conversation with your doctor before treatment.",
        after:
          "Message the clinic directly on the platform. Discuss your plan in advance and remove uncertainty early.",
      },
      {
        title: "End-to-end assistance",
        before:
          "Scattered coordination abroad; risk of feeling alone with unclear next steps.",
        after:
          "Your digital assistant stays with you from the clinic door until you return home well. You focus on recovery.",
      },
    ],
    journeyTitle: "Your journey: from app to treatment",
    journeyIntro:
      "The real steps from opening MediQueue to completing treatment and returning home — chronological, clear, and predictable.",
    journeySteps: [
      {
        title: "Discover",
        body: "Search by treatment, city, and date. See only accredited clinics and doctors.",
      },
      {
        title: "Compare",
        body: "Filter by specialty, language, and budget. Compare structured profiles side by side.",
      },
      {
        title: "Send a request",
        body: "Secure your appointment with a transparent £100 deposit — 100% refundable up to 14 days before your visit. The decision stays yours.",
      },
      {
        title: "Speak directly",
        body: "Message your chosen clinic on the platform and clarify the treatment plan.",
      },
      {
        title: "Travel and receive care",
        body: "Go to the clinic and meet your specialist. Optionally, you can request flight and accommodation coordination through the platform if you wish.",
      },
      {
        title: "We stay through recovery",
        body: "Your digital assistant remains with you after treatment; coordination continues.",
      },
    ],
    discoverPrivacyNote:
      "Clinic identity stays hidden until you send a request.",
    trustTitle: "Only the best. Only the verified.",
    trustBody:
      "Every clinic on our platform has been reviewed by international health authorities, and holds JCI accreditation or equivalent national health-tourism certificates. Your health is more than a filter criterion to us.",
    trustJci: "JCI accreditation",
    trustNational: "National health-tourism certificate",
    finalTitle: "Be the architect of your journey.",
    finalBody:
      "Discover accredited clinics, compare openly, and communicate directly — transparency and control stay with you.",
    finalCta: "Explore clinics",
  },
  doctors: {
    seoTitle: "For doctors",
    eyebrow: "Doctor portal",
    title: "Today's Schedule — without the scatter.",
    intro:
      "Overview, My Patients, Calendar, Messages, Profile — one panel. Run your day from a single screen instead of scattered channels.",
    primaryCta: "Create My Doctor Profile",
    secondaryCta: "Preview the Panel",
    caption: "Doctor panel — Today's Schedule preview. Demo appointments.",
    compareEyebrow: "Compare",
    compareTitle: "Leave the Old Routine. Run Your Day from One Screen.",
    compareBeforeLabel: "Traditional setup",
    compareAfterLabel: "with",
    compareCriteriaLabel: "Criteria",
    compareRows: [
      {
        title: "Appointment tracking",
        before:
          "Paper calendars, phone notes, records scattered across different clinic systems",
        after: "All appointments in one daily flow — hour by hour, clearly laid out",
      },
      {
        title: "Patient communication",
        before:
          "WhatsApp, email, phone mixed together — no clear record of where each message lives",
        after:
          'All patient messages in one "Messages" screen, with full history',
      },
      {
        title: "Patient history",
        before:
          "Separate in every clinic/system — no unified view in the doctor's hands",
        after: 'Treatment tracking and history in one "My Patients" screen',
      },
      {
        title: "Profile / visibility",
        before:
          "Expertise reaches patients only indirectly, through the clinic",
        after:
          "Doctor profile is directly visible and comparable for patients",
        highlight: true,
      },
      {
        title: "Daily overview",
        before: "You check how the day will unfold across multiple tools each morning",
        after: 'The "Overview" screen summarizes your day and patient status at a glance',
      },
    ],
    featuresTitle: "Your panel, step by step",
    featuresIntro:
      "Each screen focuses on one job — designed so you can run your day without scatter.",
    features: [
      {
        id: "overview",
        title: "Overview",
        body: "Today's appointments, pending messages, and patient status at a glance. Your day starts here — not across five separate checks.",
      },
      {
        id: "patients",
        title: "My Patients",
        body: "All your patients, treatment stages, and history notes in one list. Instantly see where international patients like Ahmed, Sophie, and James stand.",
      },
      {
        id: "calendar",
        title: "Calendar",
        body: "Mark your availability and prevent double bookings. Switch between weekly and daily views.",
      },
      {
        id: "messages",
        title: "Messages",
        body: "No WhatsApp and email chaos — all patient conversations in one screen with history. Bilingual when needed.",
      },
      {
        id: "profile",
        title: "Profile",
        body: "This is exactly what patients see when they compare: specialty, experience, clinics you work with, and patient reviews.",
      },
    ],
    roadmapTitle: "From signup to your first appointment.",
    roadmapIntro:
      "From creating your profile to your first patient appointment — clear split between what you do and what MediQueue handles.",
    roadmapDoctorLabel: "Doctor",
    roadmapMqLabel: "MediQueue",
    roadmapSteps: [
      {
        title: "Create profile",
        doctor:
          "Enter specialty, experience, and clinic(s) you work with.",
        mediQueue:
          "Profile presentation on the patient side, translation and localization.",
        previewHint:
          "Specialty, years of experience, and clinic affiliation defined in the profile form.",
      },
      {
        title: "Verification",
        doctor: "Upload license and specialty credentials.",
        mediQueue:
          "Verification process and trust badges patients can rely on.",
        previewHint:
          "Document upload and approval status tracked from the panel.",
      },
      {
        title: "Set calendar",
        doctor: "Mark your availability hours in the panel.",
        mediQueue: "Conflict detection and automatic reminders.",
        previewHint:
          "Weekly availability grid — conflicting slots flagged automatically.",
      },
      {
        title: "Patient request arrives",
        doctor:
          'See and review the new request in "My Patients".',
        mediQueue:
          "Request arrives filtered, with language and need already clarified.",
      },
      {
        title: "Direct communication",
        doctor:
          "Talk to the patient via Messages (bilingual when needed).",
        mediQueue: "Translation infrastructure and message security.",
      },
      {
        title: "Appointment day",
        doctor: 'Run the day from the "Today\'s Schedule" screen.',
        mediQueue:
          "Appointment coordination and reminders on the patient side.",
      },
    ],
    trustMessage:
      "Every doctor profile on our panel is published with verified license and specialty information.",
    finalTitle: "Patients are looking for you.",
    finalBody: "Ready to reach them?",
    finalCta: "Create My Doctor Profile",
  },
  how: {
    seoTitle: "How it works",
    eyebrow: "The loop",
    title: "From first search to care on site.",
    intro:
      "The patient product’s three steps, then the filtering service as it actually runs — not a recommendation engine.",
    steps: [
      {
        title: "Search & compare",
        body: "Filter clinics and doctors by need, city, and date — and see transparent pricing.",
      },
      {
        title: "Book your appointment",
        body: "Choose a date and time. Your booking is secured with a transparent £100 deposit guarantee (Stripe Secured), 100% refundable up to 14 days before your visit.",
      },
      {
        title: "Receive treatment",
        body: "Travel to the clinic, meet your specialist, and complete payment for care on site.",
      },
    ],
    techTitle: "Rule-based filtering. Not a recommendation engine.",
    techBody:
      "A Python microservice applies hard filters, then scores and ranks what remains — specialty, language, budget. No machine learning in this version. The list is for a person to compare.",
    pipeline: [
      { title: "Filter", body: "Hard rules first. What does not fit is out." },
      { title: "Score", body: "Survivors are scored on the preferences set." },
      { title: "Rank", body: "A list to compare. The person decides." },
    ],
  },
  team: {
    seoTitle: "About us",
    heroEyebrow: "About us",
    heroLeadBold: "Three co-founders.",
    heroLeadLight: "Building from the inside.",
    heroIntro:
      "We are not just building a marketplace — we are dismantling the closed ecosystem where patients are steered blindly and clinics burn budgets on empty ads. MEDIQUEUE is the new standard where trust, direct contact, and technology meet.",
    missionLabel: "Our mission",
    missionBody:
      "Leave behind the broker and hidden-commission model in health travel. Patients should connect directly and transparently with accredited clinics worldwide — in their own language, without intermediaries.",
    visionLabel: "Our vision",
    visionBody:
      "Free clinics from ad agencies selling hope — a risk-free growth model that wins only when matched with real, treatment-ready patients. A sector where transparency is the default, globally.",
    note: "This is what we are building today. The goal is deeper coordination — as direction, not as a dated roadmap.",
    achievementChips: [
      {
        label: "1st among 301 ventures",
        detail: "Düzce Teknopark Entrepreneurship Marathon · May 2026",
      },
      {
        label: "Patent award",
        detail: "Proprietary matching algorithm · broker-free business model",
      },
      {
        label: "Capsule pre-incubator",
        detail: "Early-stage growth program",
      },
    ],
    foundersEyebrow: "The team",
    foundersTitle: "Co-founders and team",
    members: [
      {
        name: "Furkan Közkaya",
        roleTitle: "Co-founder · CPO",
        bio: "Builds the product experience end to end; leads cross-platform mobile and web strategy.",
        image: "/team/furkan-kozkaya.svg",
        accent: "#c084fc",
        linkedin: "https://linkedin.com/in/furkan-kozkaya",
      },
      {
        name: "Azra İrem Derin",
        roleTitle: "Co-founder · CTO",
        bio: "Develops AI-powered matching algorithms and the platform data architecture.",
        image: "/team/azra-irem-derin.svg",
        accent: "#e879f9",
        linkedin: "https://linkedin.com/in/azra-irem-derin",
      },
      {
        name: "Sinem Özdemir",
        roleTitle: "Co-founder · CFO",
        bio: "Builds sustainable financial infrastructure and manages web platform integrations.",
        image: "/team/sinem-ozdemir.svg",
        accent: "#38bdf8",
        linkedin: "https://linkedin.com/in/sinem-ozdemir",
      },
      {
        name: "Kasım",
        roleTitle: "Backend Developer",
        bio: "Builds backend services, the API layer, and data flows.",
        image: "/team/kasim.svg",
        accent: "#a78bfa",
        linkedin: "https://linkedin.com/company/mediqueue",
      },
    ],
    socialTitle: "Follow us",
    socialLinks: [
      {
        platform: "linkedin",
        label: "LinkedIn",
        hint: "Founding team and company updates",
        href: "https://linkedin.com/company/mediqueue",
      },
      {
        platform: "instagram",
        label: "Instagram",
        hint: "Clinic stories and behind the scenes",
        href: "https://instagram.com/mediqueue",
      },
    ],
  },
  footer: {
    tagline: "Clinics pay when a patient arrives. Patients compare, then ask.",
    groups: [
      {
        title: "Platform",
        links: [
          { href: "/clinics", label: "For clinics" },
          { href: "/patients", label: "For patients" },
          { href: "/doctors", label: "For doctors" },
          { href: "/team", label: "About us" },
        ],
      },
      {
        title: "Company",
        links: [
          { href: "/team", label: "About us" },
          { href: "/privacy", label: "Privacy & GDPR" },
          { href: "/terms", label: "Terms of use" },
          { href: "/disclaimer", label: "Medical disclaimer" },
        ],
      },
    ],
    copyright: "MEDIQUEUE. All rights reserved.",
    privacyNote: "Patient privacy first. GDPR and KVKK aligned.",
    medicalDisclaimer:
      "MediQueue is not a healthcare provider or travel agency; it is a digital software infrastructure that connects patients with clinics. All medical diagnosis, treatment, and operational responsibility belongs to the partner clinic.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "£100 deposit guarantee and refund policy",
    items: [
      {
        question: "What is the transparent £100 deposit guarantee?",
        answer:
          "It is a fixed, disclosed deposit that secures your appointment. There is no hidden agency commission. Payment is Stripe Secured.",
      },
      {
        question: "When is the deposit refundable?",
        answer:
          "Cancel 14 days or more before your visit and the deposit is 100% refundable. In the final 7 days, deposit protection applies against no-shows and late cancellations.",
      },
      {
        question: "What does Stripe Secured mean?",
        answer:
          "The deposit is collected through Stripe. MediQueue does not store your full card details. Your refund rights remain visible on the payment record.",
      },
      {
        question: "Are there hidden commissions?",
        answer:
          "No. The only patient-side platform charge is the transparent £100 deposit. Clinics are billed only when a patient arrives and treatment is confirmed.",
      },
    ],
  },
  lead: {
    close: "Close",
    patientTab: "UK Patient Waitlist",
    clinicTab: "Clinic Pre-Register",
    patientTitle: "Join the UK patient waitlist",
    patientBody:
      "Register to discover accredited clinics and plan your visit with a transparent £100 deposit guarantee.",
    clinicTitle: "Pre-register your clinic",
    clinicBody:
      "B2B pre-registration for accredited clinics in Turkey. No panel subscription — you pay only for arriving patients.",
    name: "Full name",
    email: "Email",
    phone: "Phone (optional)",
    country: "Country",
    treatment: "Treatment of interest",
    treatmentOptions: [
      "Hair transplant",
      "Dental",
      "Cosmetic surgery",
      "Eye laser",
      "Other",
    ],
    clinicName: "Clinic name",
    city: "City",
    website: "Website (optional)",
    role: "Your role",
    roleClinic: "Clinic manager / operations",
    roleDoctor: "Doctor",
    message: "Note (optional)",
    consent:
      "I have read the privacy notice and agree to my details being processed for this pre-registration.",
    submit: "Submit pre-registration",
    submitting: "Sending…",
    successTitle: "You are on the list",
    successBody: "Thank you. Our team will contact you by email.",
    error: "Something went wrong. Please try again.",
    required: "This field is required.",
  },
  legal: {
    privacyLink: "Privacy",
    termsLink: "Terms",
    disclaimerLink: "Disclaimer",
    updatedLabel: "Last updated",
    privacy: {
      title: "Privacy Notice — GDPR & KVKK",
      updated: "11 September 2026",
      intro:
        "MediQueue is software infrastructure that connects UK and EU patients with accredited clinics in Turkey. This notice explains how we process personal data under the UK/EU GDPR and Turkey’s KVKK.",
      sections: [
        {
          heading: "Controller",
          body: "MediQueue processes your data for waitlist and clinic pre-registration, matching, and legal compliance. Contact: privacy@mediqueue.com",
        },
        {
          heading: "Data we collect",
          body: "Name, email, phone, country, treatment of interest, clinic name, city, and any note you choose to share. Card data is not stored on MediQueue servers; deposits are collected via Stripe.",
        },
        {
          heading: "Legal basis",
          body: "Your consent for waitlist/pre-registration; steps prior to a contract; legitimate interests (security and abuse prevention); and legal obligations.",
        },
        {
          heading: "Sharing",
          body: "We may share data with the relevant partner clinic once a booking process starts, and with essential processors (hosting, email, Stripe). We do not sell personal data.",
        },
        {
          heading: "Retention and rights",
          body: "We keep data only as long as needed for the purpose and applicable limitation periods. You may request access, correction, erasure, objection, and (under GDPR) portability at privacy@mediqueue.com.",
        },
      ],
    },
    terms: {
      title: "Terms of use",
      updated: "11 September 2026",
      intro:
        "By using this site and its pre-registration forms you agree to these terms.",
      sections: [
        {
          heading: "What MediQueue is",
          body: "MediQueue is not a healthcare provider or travel agency. It is digital software infrastructure that connects patients with accredited clinics.",
        },
        {
          heading: "£100 deposit guarantee",
          body: "Patient appointments are secured with a transparent £100 fixed deposit. Cancellations 14 days or more before the visit are 100% refundable. Deposit protection applies in the final 7 days against no-shows and late cancellations. Payments are Stripe Secured.",
        },
        {
          heading: "Clinics",
          body: "Clinics do not pay a panel subscription. Platform fees apply only when a patient arrives and treatment is confirmed.",
        },
        {
          heading: "Pre-registration",
          body: "Waitlist and clinic pre-registration are not a confirmed appointment or treatment. The team contacts you after an eligibility review.",
        },
      ],
    },
    disclaimer: {
      title: "Medical disclaimer",
      updated: "11 September 2026",
      intro:
        "MediQueue does not provide medical advice, diagnosis, or treatment. The following applies across the site.",
      sections: [
        {
          heading: "Our role",
          body: "MediQueue is not a healthcare provider or travel agency; it is a digital software infrastructure that connects patients with clinics. All medical diagnosis, treatment, and operational responsibility belongs to the partner clinic.",
        },
        {
          heading: "Clinic independence",
          body: "Treatment plans, quotes, indications, and complication management sit with the clinic and its clinicians. Sample or demo data on this site is for marketing illustration only.",
        },
        {
          heading: "Your decision",
          body: "Seek independent medical advice before any treatment. In an emergency, contact local emergency services.",
        },
      ],
    },
  },
};
