import type { SiteContent } from "./types";
import { enPreviews } from "./previews";

export const en: SiteContent = {
  seo: {
    title: "MEDIQUEUE — Transparent health travel, no middleman",
    description:
      "Compare accredited clinics, message directly, and send a request with no upfront payment. Clinics pay only when a patient arrives — no subscription.",
  },
  nav: {
    links: [
      { href: "/", label: "Home" },
      { href: "/clinics", label: "For clinics" },
      { href: "/patients", label: "For patients" },
      { href: "/doctors", label: "For doctors" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/team", label: "About us" },
    ],
    clinicCta: "For my clinic",
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
        "Compare accredited clinics side by side, message directly, and send a request with no upfront payment. You decide — the process stays visible.",
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
        title: "Appointment requests on your desk",
        body: "Approve, quote, message — you pay when the patient arrives.",
        preview: "clinic",
      },
      {
        href: "/patients",
        eyebrow: "Patients",
        title: "Compare, then request",
        body: "Filter clinics and doctors. No prepayment to send the ask.",
        preview: "patient",
      },
      {
        href: "/doctors",
        eyebrow: "Doctors",
        title: "Today's schedule",
        body: "My patients, Calendar, Messages, Profile — the clinical day in one place.",
        preview: "doctor",
      },
    ],
    trust: [
      { label: "Direct Communication", detail: "No middlemen, zero hidden fees" },
      { label: "Accredited Clinics", detail: "JCI and international certified healthcare institutions" },
      { label: "Transparent Pricing", detail: "Clear quotes, no unexpected charges" },
      { label: "Patient Privacy", detail: "End-to-end encrypted and secure communication" },
    ],
    trustStripLabel: "Trust & Transparency",
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
      "Compare clinics, message directly, send a request with no upfront payment.",
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
      "Invest in outcomes, not clicks or hope. Zero risk, high conversion in international health travel. No upfront fee. No panel subscription.",
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
          "Zero upfront cost — you are charged only when a patient arrives and treatment is confirmed",
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
          "Upfront payment risk and fake/lost-lead risk sit entirely with MediQueue — the clinic operates at zero risk.",
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
        body: "Request an appointment with no upfront payment. The decision stays yours.",
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
        body: "Filter clinics and doctors by symptom, city, and date — and see transparent prices.",
      },
      {
        title: "Request an appointment",
        body: "Pick a date and time, then send a request with no upfront payment.",
      },
      {
        title: "Get treated",
        body: "Go to the clinic, meet your specialist, and pay on site.",
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
    faqEyebrow: "Frequently Asked Questions",
    faqTitle: "Everything You Need to Know",
    faqSubtitle: "Common questions about the MediQueue platform, safety, accreditation, and how it works.",
    faqItems: [
      {
        q: "Is MediQueue free for patients?",
        a: "Yes, MediQueue is completely free for patients. You can freely compare accredited clinics, review transparent offers, and communicate directly with zero middleman fees.",
      },
      {
        q: "How are clinics verified on the platform?",
        a: "We only partner with healthcare providers that hold JCI (Joint Commission International) accreditation or official International Health Tourism Certification from health authorities.",
      },
      {
        q: "How does the pricing and clinic fee model work?",
        a: "There are zero middleman markups or hidden commissions on MediQueue. Clinics operate on a transparent, direct platform model with clear terms.",
      },
      {
        q: "How is my personal data and medical privacy protected?",
        a: "Your personal data and medical documents are end-to-end encrypted under GDPR and privacy standards. Your identity remains private until you explicitly submit a request to a clinic.",
      },
      {
        q: "Who handles flight and accommodation arrangements?",
        a: "MediQueue facilitates direct clinic-patient communication. Accommodation, airport transfers, and travel logistics are coordinated as part of your chosen clinic's optional package.",
      },
    ],
  },
  team: {
    seoTitle: "About us",
    heroEyebrow: "About us",
    heroLeadBold: "Four founders.",
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
    foundersEyebrow: "Founding team",
    foundersTitle: "Architects of change",
    members: [
      {
        name: "Furkan Közkaya",
        roleTitle: "CPO / Mobile + Web",
        bio: "Builds the product experience end to end; leads cross-platform mobile strategy.",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        accent: "#3a6ad6",
        linkedin: "https://linkedin.com/in/furkan-kozkaya",
      },
      {
        name: "Azra İrem Derin",
        roleTitle: "CTO / AI",
        bio: "Develops AI-powered matching algorithms and the platform data architecture.",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
        accent: "#0d9488",
        linkedin: "https://linkedin.com/in/azra-irem-derin",
      },
      {
        name: "Sinem Özdemir",
        roleTitle: "CFO / Web",
        bio: "Builds sustainable financial infrastructure and manages web platform integrations.",
        image:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
        accent: "#2f57b3",
        linkedin: "https://linkedin.com/in/sinem-ozdemir",
      },
      {
        name: "Kevser Eken",
        roleTitle: "CMO / Operations",
        bio: "Expands the international clinic network and leads operational excellence in the field.",
        image:
          "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=80",
        accent: "#1e3a5f",
        linkedin: "https://linkedin.com/in/kevser-eken",
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
      {
        platform: "x",
        label: "X",
        hint: "Short updates",
        href: "https://x.com/mediqueue",
      },
    ],
  },
  footer: {
    tagline:
      "The transparent marketplace platform where patients compare freely and accredited clinics connect directly.",
    groups: [
      {
        title: "Company",
        links: [
          { href: "/team", label: "About Us" },
          { href: "/how-it-works", label: "How It Works" },
          { href: "/team#contact", label: "Contact" },
        ],
      },
      {
        title: "For Patients",
        links: [
          { href: "/patients", label: "Accredited Clinics" },
          { href: "/patients#compare", label: "Clinic Comparison" },
          { href: "/patients", label: "Treatment Guide" },
        ],
      },
      {
        title: "Clinics & Doctors",
        links: [
          { href: "/clinics", label: "Clinic Portal" },
          { href: "/clinics#requests", label: "Patient Requests" },
          { href: "/doctors", label: "Doctor Panel" },
        ],
      },
      {
        title: "Legal & Support",
        links: [
          { href: "/how-it-works#faq", label: "FAQ" },
          { href: "/patients#privacy", label: "Privacy Policy" },
          { href: "/patients#kvkk", label: "GDPR & Privacy" },
        ],
      },
    ],
    copyright: "MediQueue. All rights reserved.",
    privacyNote: "Built with patient privacy as a core principle.",
  },
  previews: enPreviews,
};
