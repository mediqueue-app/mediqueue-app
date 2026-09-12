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
      { href: "/how-it-works", label: "How It Works" },
      { href: "/team", label: "About Us" },
      { href: "/contact", label: "Contact" },
    ],
    solutionsLabel: "Solutions",
    solutions: [
      { href: "/clinics", label: "For Clinics", desc: "Risk-free patient lead management" },
      { href: "/patients", label: "For Patients", desc: "Transparent clinic comparison & direct chat" },
      { href: "/doctors", label: "For Doctors", desc: "Daily schedule & single-screen workflow" },
    ],
    clinicCta: "Add Your Clinic",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    localeEn: "EN",
    localeTr: "TR",
    skip: "Skip to content",
  },
  contact: {
    seoTitle: "Contact Us — Get in Touch",
    eyebrow: "24/7 Dedicated Support",
    title: "Leave Your Contact Details, We'll Reach Out",
    intro:
      "Whether you are a patient seeking treatment or a clinic/doctor looking to join our network — fill in your details and our team will respond within 15 minutes.",
    patientTab: "Patient & Care Inquiry",
    clinicTab: "Clinic & Doctor Onboarding",
    name: "Full Name",
    email: "Email Address",
    phone: "Phone / WhatsApp Number",
    topic: "Subject / Treatment Needed",
    message: "Message or Additional Requirements",
    submit: "Send Contact Request",
    submitting: "Sending Request...",
    successTitle: "Contact Request Received!",
    successBody:
      "Your details have reached our team. We will get in touch with you shortly (average 15 minutes) via your preferred contact channel.",
    phoneTitle: "Phone & WhatsApp",
    emailTitle: "Email Addresses",
    addressTitle: "Headquarters",
    privacyNote:
      "Your information is protected with 256-Bit SSL encryption and GDPR compliance. Never shared with third parties.",
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
      primaryCta: "Explore Clinics",
      secondaryCta: "How It Works",
      previewCaption: "Live Demo — Patient App & Clinic Comparison Screen",
    },
    clinic: {
      headline: "Pay for the patient",
      headlineAccent: "who shows up.",
      subcopy:
        "Stop burning ad budget. You are charged only when a real request lands in your panel and the patient arrives — no subscription.",
      primaryCta: "Join as a Clinic",
      secondaryCta: "See the Process",
      previewCaption: "Live Demo — Clinic Management Panel & Appointment Requests",
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
    metricCaption: "Live Demo — Clinic Management Panel & Appointment Requests",
    panelLabel: "Clinic panel",
    compareEyebrow: "Traditional vs. MediQueue",
    compareTitle: "Zero Ad Risk. Pay Only for Patients Who Show Up.",
    compareBeforeLabel: "Traditional Methods",
    compareAfterLabel: "Risk-Free Model",
    compareCriteriaLabel: "Criterion",
    compareRows: [
      {
        title: "Marketing Budget",
        before: "High ad spend with clicks that do not guarantee outcomes or real patients",
        after:
          "Zero upfront cost — charged only when a patient arrives at your clinic and treatment begins",
      },
      {
        title: "Patient Intent & Quality",
        before: "Unfiltered requests and leads with unverified budgets or intent",
        after:
          "High-intent patient candidates with verified budget, language, and treatment needs",
      },
      {
        title: "Drop-off & Risk Management",
        before: "Time and budget spent on consultation and quotes are lost when patients walk away",
        after:
          "Payment occurs only upon patient arrival — drop-off risk is fully absorbed by MediQueue",
        highlight: true,
      },
      {
        title: "Operational Load",
        before: "Tracking, translation, and travel logistics scattered across multiple unorganized channels",
        after:
          "All-in-one panel for request management, bilingual chat, appointment confirmation, and tracking",
      },
    ],
    roadmapTitle: "Your Clinic Roadmap",
    roadmapIntro:
      "Step by step after you join MediQueue — minimum effort for the clinic, maximum load carried by the platform.",
    roadmapClinicLabel: "Clinic Role",
    roadmapMqLabel: "MediQueue Guarantee",
    roadmapSteps: [
      {
        title: "Free Joining & Profile",
        clinic:
          "Upload your accreditation documents and define your medical specialties and pricing ranges.",
        mediQueue:
          "Multilingual profile optimization, institution verification, and presentation are prepared at zero cost.",
        previewHint:
          "Accreditation documents are uploaded in the digital panel; approval status is tracked in real time.",
      },
      {
        title: "Filtered Patient Leads",
        clinic:
          "Review qualified patient applications with verified budgets, language, and treatment requirements.",
        mediQueue:
          "Automated lead verification and spam filtering ensure only genuine patients reach your clinic.",
        previewHint:
          "Qualified international patient requests are delivered directly to your clinic panel.",
      },
      {
        title: "Direct Chat & Quotes",
        clinic:
          "Communicate directly with patients on-platform and deliver customized treatment plans.",
        mediQueue:
          "Bilingual real-time translation and secure messaging infrastructure power direct communication.",
        previewHint:
          "Clinic doctors and patients communicate directly through multilingual messaging.",
      },
      {
        title: "Treatment & Settlement",
        clinic:
          "Welcome the patient and deliver treatment — zero upfront financial risk until patient arrives.",
        mediQueue:
          "Service fee is collected only on delivered treatment; drop-off risk is fully backed by MediQueue.",
        previewHint:
          "Payment is processed when treatment begins; zero upfront risk beforehand.",
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
    caption: "Live Demo — Patient App & Clinic Comparison",
    whyEyebrow: "Traditional vs. MediQueue",
    whyTitle: "Forget Intermediary Agencies. Receive Care with Full Transparency.",
    whyBeforeLabel: "Traditional Agency Method",
    whyAfterLabel: "MediQueue Transparent Marketplace",
    whyCriteriaLabel: "Criterion",
    whyRows: [
      {
        title: "Transparent Pricing",
        before:
          "Hidden commissions, high agency markups, and surprise last-minute costs",
        after:
          "View clear all-inclusive treatment packages and prices side by side with zero hidden fees",
      },
      {
        title: "Accredited Clinic Selection",
        before:
          "One or two unilateral clinic options pushed by agencies without real filtering",
        after:
          "Compare hundreds of JCI-accredited clinics freely by specialty, language, and budget",
      },
      {
        title: "Direct Doctor Communication",
        before:
          "No direct contact with doctors; all questions filtered through agency reps",
        after:
          "Message clinic doctors directly with automatic translation and plan your care together",
      },
      {
        title: "Zero Upfront Payment Risk",
        before:
          "Upfront fees charged for consultation and bookings with financial loss upon cancellation",
        after:
          "Creating a request is 100% free; payment occurs only when you arrive and treatment begins",
      },
    ],
    journeyTitle: "How Your Treatment Journey Works in 4 Steps",
    journeyIntro:
      "The entire journey from search to recovery — transparent, secure, and under your control.",
    journeySteps: [
      {
        title: "Discover & Compare Clinics",
        body: "Search by treatment, location, and budget. Inspect success rates and package prices of JCI-accredited clinics.",
      },
      {
        title: "Free No-Upfront Request",
        body: "Send requests to your preferred clinics in one click. Gather quotes with zero upfront fees or obligation.",
      },
      {
        title: "Direct Doctor Consult",
        body: "Chat directly with your clinic doctor using auto-translated messaging; get medical answers first-hand.",
      },
      {
        title: "Treatment & Recovery Follow-up",
        body: "Travel to your chosen clinic. Your digital assistant stays by your side throughout treatment and recovery.",
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
    caption: "Live Demo — Doctor Panel & Daily Schedule",
    compareEyebrow: "Compare",
    compareTitle: "Leave the Old Routine. Run Your Day from One Screen.",
    compareBeforeLabel: "Traditional setup",
    compareAfterLabel: "MediQueue Model",
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
    featuresTitle: "Doctor Panel Screens",
    featuresIntro:
      "Each screen focuses on a single job — manage your entire day without scatter.",
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
    roadmapTitle: "Doctor Roadmap: From Signup to First Appointment",
    roadmapIntro:
      "Step-by-step from profile creation to your first patient — clear split between doctor's role and MediQueue's support.",
    roadmapDoctorLabel: "Doctor",
    roadmapMqLabel: "MediQueue",
    roadmapSteps: [
      {
        title: "Profile & Specialty",
        doctor:
          "Define your medical specialties, years of experience, and affiliated clinic(s) in your profile.",
        mediQueue:
          "Multilingual profile presentation, photo optimization, and patient visibility are prepared automatically.",
      },
      {
        title: "Credential Verification",
        doctor: "Upload your medical license and specialty certifications to your digital panel.",
        mediQueue:
          "Fast document verification, JCI Accredited Doctor badge approval, and verified profile status.",
      },
      {
        title: "Calendar & Schedule",
        doctor: "Set your weekly availability grid and consultation time slots in the panel.",
        mediQueue:
          "Automated conflict prevention, timezone conversion, and patient appointment reminders.",
      },
      {
        title: "Patient Request & Care",
        doctor: "Review filtered patient applications and consult directly using auto-translated chat.",
        mediQueue:
          "Bilingual real-time chat infrastructure, request tracking, and appointment confirmation system.",
      },
    ],
    trustMessage:
      "Every doctor profile on our panel is published with verified license and specialty information.",
    finalTitle: "Patients are looking for you.",
    finalBody: "Ready to reach them?",
    finalCta: "Create My Doctor Profile",
  },
  how: {
    seoTitle: "How It Works",
    eyebrow: "Transparent Platform Mechanics",
    title: "From First Search to Care: How the Process Works",
    intro:
      "Free comparison and direct requests for patients; zero upfront risk for clinics. MEDIQUEUE keeps the entire health travel journey transparent, secure, and under your control.",
    steps: [
      {
        title: "Discover & Compare",
        body: "Filter accredited clinics by treatment, city, and budget; inspect transparent package prices and JCI certifications.",
      },
      {
        title: "Free No-Upfront Request",
        body: "Send requests to your preferred clinics in one click. Gather quotes with zero upfront payment or binding risk.",
      },
      {
        title: "Direct Consult & Care",
        body: "Consult directly with clinic doctors via auto-translated messaging. Confirm your care plan and pay upon arrival at the clinic.",
      },
    ],
    techTitle: "Transparent Matching & Smart Filtering Engine",
    techBody:
      "No hidden agency commissions or behind-the-scenes markups. MEDIQUEUE's smart filtering engine delivers qualified patient requests based on budget, language, and treatment directly to the right clinic.",
    pipeline: [
      { title: "Criteria & Need Filter", body: "Patient applications are verified and filtered by language, budget, and medical need." },
      { title: "Accredited Clinic Match", body: "JCI and officially certified healthcare institutions are listed transparently." },
      { title: "Direct Doctor Communication", body: "Message clinic doctors directly without intermediaries and receive clear quotes." },
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
    seoTitle: "About Us — MediQueue",
    heroEyebrow: "About Us & Story",
    heroLeadBold: "Transparency in Healthcare.",
    heroLeadLight: "Broker-Free Future with Tech.",
    heroIntro:
      "We are setting a new global standard where middleman commissions, hidden pricing, and uncertain medical travel are replaced by complete transparency. MediQueue is an independent healthcare marketplace connecting international patients directly with accredited clinics and doctors.",
    stats: [
      { value: "301/1", label: "1st Place Winner", hint: "Entrepreneurship Marathon Champion" },
      { value: "AI-Powered", label: "Smart Matching", hint: "Proprietary algorithm & AI architecture" },
      { value: "100%", label: "Transparent Platform", hint: "Zero broker markup & direct doctor chat" },
      { value: "JCI", label: "Verified Quality", hint: "Only audited & accredited healthcare institutions" },
    ],
    missionLabel: "Our Mission",
    missionBody:
      "Completely eliminate middleman brokers and hidden commissions from healthcare travel. Enable patients worldwide to connect directly, transparently, and safely with accredited clinics in their native language.",
    visionLabel: "Our Vision",
    visionBody:
      "Free clinics from ad agencies selling unverified leads; empower them with a risk-free growth engine that wins only when matching treatment-ready patients, setting global transparency as the industry default.",
    valuesEyebrow: "Our Core Principles",
    valuesTitle: "4 Pillars Defining MediQueue Standards",
    values: [
      {
        title: "Uncompromising Transparency",
        body: "No hidden agency markups. All treatment packages, clinic credentials, and doctor licenses are 100% visible to every user.",
        icon: "ShieldCheck",
      },
      {
        title: "Direct Doctor Connection",
        body: "No sales rep filters. Communicate directly with attending physicians using real-time automated translation.",
        icon: "Stethoscope",
      },
      {
        title: "AI-Powered Matching",
        body: "Fair, unbiased algorithms matching patient budget, language, and specific medical needs with ideal accredited clinics in seconds.",
        icon: "Sparkles",
      },
      {
        title: "Zero Upfront Risk",
        body: "Free request creation for patients. Risk-free, sustainable growth for clinics with zero upfront ad waste.",
        icon: "CheckCircle2",
      },
    ],
    note: "MediQueue is a dynamic ecosystem continuously advancing international healthtech and AI innovation.",
    achievementsEyebrow: "Awards & Recognition",
    achievementsTitle: "Our Position in the Tech & Startup Ecosystem",
    achievementChips: [
      {
        label: "1st Place Winner Among 301 Ventures",
        detail: "Düzce Teknopark Entrepreneurship Marathon Championship · 2026",
      },
      {
        label: "Proprietary AI Matching Architecture",
        detail: "Proprietary AI algorithm & broker-free marketplace model",
      },
      {
        label: "Capsule Pre-Incubator Program",
        detail: "Early-stage strategic acceleration & mentorship program",
      },
    ],
    foundersEyebrow: "Founding Team",
    foundersTitle: "Architects of Healthcare Transformation",
    members: [
      {
        name: "Azra İrem Derin",
        roleTitle: "CTO / AI, Data & Web Engineering",
        bio: "Developing AI-powered matching algorithms, platform architecture, and end-to-end data infrastructure.",
        image: "/team/azra-irem-derin.jpg",
        accent: "#0d9488",
        linkedin: "https://www.linkedin.com/in/azraderin/",
      },
      {
        name: "Furkan Közkaya",
        roleTitle: "CPO / Product & Business Development",
        bio: "Shaping the product roadmap, leading clinic conversations, and driving business development opportunities.",
        image: "/team/furkan-kozkaya.jpg",
        accent: "#3a6ad6",
        linkedin: "https://www.linkedin.com/in/furkankozkaya/",
      },
      {
        name: "Sinem Özdemir",
        roleTitle: "CFO / Financial Strategy & Operations",
        bio: "Managing company budgeting, cash flow, and financial reporting — keeping internal finances disciplined.",
        image: "/team/sinem-ozdemir.jpg",
        accent: "#2f57b3",
        linkedin: "https://www.linkedin.com/in/sinem-ozdemir-/",
      },
    ],
    socialTitle: "Follow Us on Social Media",
    socialLinks: [
      {
        platform: "linkedin",
        label: "LinkedIn",
        hint: "Founding team & official company updates",
        href: "https://www.linkedin.com/company/medyqueue",
      },
      {
        platform: "instagram",
        label: "Instagram",
        hint: "Clinic stories & patient guide insights",
        href: "https://www.instagram.com/mediqueue/",
      },
    ],
    finalCtaTitle: "Step Into the Future of Healthcare",
    finalCtaBody: "Whether you are a patient seeking transparent treatment or a clinic scaling without broker risks, get started with MediQueue today.",
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
          { href: "/contact", label: "Contact" },
        ],
      },
      {
        title: "For Patients",
        links: [
          { href: "/patients", label: "Accredited Clinics" },
          { href: "/patients#ozellikler", label: "Clinic Comparison" },
          { href: "/patients#yolculuk", label: "Treatment Guide" },
        ],
      },
      {
        title: "Clinics & Doctors",
        links: [
          { href: "/clinics", label: "Clinic Portal" },
          { href: "/clinics#ozellikler", label: "Patient Requests" },
          { href: "/doctors", label: "Doctor Panel" },
        ],
      },
      {
        title: "Legal & Support",
        links: [
          { href: "/how-it-works#faq", label: "FAQ" },
          { href: "/privacy", label: "Privacy Policy" },
          { href: "/terms", label: "GDPR & Privacy" },
        ],
      },
    ],
    copyright: "MediQueue. All rights reserved.",
    privacyNote: "Built with patient privacy as a core principle.",
    medicalDisclaimer: "MediQueue is a healthcare marketplace platform. All content is for informational purposes only and does not constitute professional medical advice.",
  },
  legal: {
    updatedLabel: "Last Updated",
    privacy: {
      title: "Privacy Policy",
      intro: "At MediQueue, protecting patient privacy and medical data confidentiality is our utmost priority.",
      updated: "September 12, 2026",
      sections: [
        {
          heading: "1. Data Collection & Use",
          body: "Treatment requests and medical forms submitted through MediQueue are shared strictly with accredited clinics and physicians you explicitly approve, via encrypted protocols. Your personal contact information is never sold to third parties.",
        },
        {
          heading: "2. GDPR & HIPAA Compliance",
          body: "In accordance with European General Data Protection Regulation (GDPR) and HIPAA standards, your medical data is stored on high-security servers. You retain the right to request full data deletion at any time.",
        },
        {
          heading: "3. Cookies & Analytics",
          body: "The platform utilizes anonymous performance cookies to enhance navigation efficiency. You can manage or disable cookie preferences at any time via your browser settings.",
        },
      ],
    },
    terms: {
      title: "Terms of Service & Platform Agreement",
      intro: "Terms and conditions governing the use of MediQueue for patients, accredited clinics, and healthcare specialists.",
      updated: "September 12, 2026",
      sections: [
        {
          heading: "1. Scope of Service & Marketplace Model",
          body: "MediQueue is a transparent marketplace connecting international patients directly with accredited healthcare providers without agent markups or hidden broker fees.",
        },
        {
          heading: "2. User Obligations",
          body: "Users agree to provide accurate information when requesting treatment options. Participating clinics and doctors are responsible for maintaining up-to-date credentials and transparent package pricing.",
        },
        {
          heading: "3. Zero Upfront Payment Policy",
          body: "Patients can request non-binding treatment quotes with zero upfront deposits or mandatory credit card registration.",
        },
      ],
    },
    disclaimer: {
      title: "Medical Disclaimer",
      intro: "Important legal notification regarding content and informational materials on MediQueue.",
      updated: "September 12, 2026",
      sections: [
        {
          heading: "1. No Direct Medical Services",
          body: "MediQueue is not a medical facility, hospital, or diagnostic center. MediQueue does not diagnose or treat medical conditions. All healthcare decisions and procedures are the sole responsibility of licensed physicians and accredited clinics.",
        },
        {
          heading: "2. Informational Purpose Only",
          body: "Treatment guides, price estimates, and clinic profiles available on the platform serve informational purposes only and do not replace professional medical advice.",
        },
        {
          heading: "3. Emergency Notice",
          body: "If you are experiencing a medical emergency, please immediately call your local emergency services (112 / 911) or visit the nearest emergency care facility.",
        },
      ],
    },
  },
  previews: enPreviews,
};
