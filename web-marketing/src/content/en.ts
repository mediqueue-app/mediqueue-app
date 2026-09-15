import type { SiteContent } from "./types";
import { enPreviews } from "./previews";
import { enScreens } from "./screens";

export const en: SiteContent = {
  seo: {
    title: "MEDIQUEUE — Official site | Transparent health travel, no middleman",
    description:
      "Official MEDIQUEUE website. Compare accredited clinics, message directly, and leave a request with no upfront payment on this site. Live booking and clinic software do not run here.",
    keywords: [
      "MEDIQUEUE",
      "MediQueue",
      "MEDI QUEUE",
      "MediQueue official",
      "health tourism",
      "medical travel marketplace",
      "JCI clinics",
      "international patients",
      "direct clinic marketplace",
    ],
  },
  notFound: {
    title: "Page not found",
    body: "This address is gone or never existed. You can continue from the home page.",
    cta: "Back to home",
  },
  lead: {
    close: "Close",
    patientTab: "Patient Request",
    clinicTab: "Clinic / Doctor Registration",
    patientTitle: "Create Free Healthcare Request",
    clinicTitle: "Add Your Clinic to MediQueue",
    patientBody: "Enter your request. The MediQueue team will follow up. This form is not a booking or a card charge.",
    clinicBody: "Register your clinic or practice. There is no subscription checkout on this site; onboarding is confirmed by email.",
    successTitle: "Request received",
    successBody: "The MediQueue team will review your message and reply by email or phone. A live clinic network does not run on this marketing site.",
    name: "Full Name",
    namePlaceholder: "e.g. John Doe",
    email: "Email Address",
    emailPlaceholder: "example@email.com",
    phone: "Phone / WhatsApp Number",
    phonePlaceholder: "+44 7XXX XXXXXX",
    country: "Country of Residence",
    countryPlaceholder: "e.g. United Kingdom / Germany",
    treatment: "Requested Treatment",
    selectTreatment: "Select treatment...",
    treatmentOptions: [
      "Hair Transplant (DHI / FUE)",
      "Aesthetics & Plastic Surgery",
      "Eye Surgery & LASIK",
      "Dental Care & Smile Design",
      "Bariatric & Weight Loss Surgery",
      "Orthopedics & Physical Therapy",
      "Other",
    ],
    clinicName: "Clinic / Hospital Name",
    clinicNamePlaceholder: "e.g. London Health Clinic",
    city: "City / Country",
    cityPlaceholder: "e.g. London, UK",
    website: "Website (Optional)",
    websitePlaceholder: "https://yourclinic.com",
    role: "Your Role",
    roleClinic: "Clinic Manager / Representative",
    roleDoctor: "Physician / Doctor",
    message: "Symptoms or Special Requests",
    messagePlaceholder: "Write any medical details or specific preferences...",
    consent: "I accept the processing of my personal data and the privacy policy.",
    privacyLink: "Privacy Policy",
    error: "An error occurred. Please fill in the required fields and try again.",
    submitting: "Submitting...",
    submit: "Submit Request",
    required: "This field is required.",
    dataNote: "We do not sell your contact details. See the privacy policy for how we handle data.",
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
      { href: "/clinics", label: "For Clinics", desc: "International demand and panel preview" },
      { href: "/patients", label: "For Patients", desc: "Transparent clinic comparison & direct chat" },
      { href: "/doctors", label: "For Doctors", desc: "Daily schedule & single-screen workflow" },
    ],
    clinicCta: "Add Your Clinic",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    localeEn: "EN",
    localeTr: "TR",
    skip: "Skip to content",
    getStarted: "Get Started",
    menu: "Menu",
    pages: "PAGES",
    language: "Language",
    languageAria: "Language",
  },
  contact: {
    seoTitle: "Contact Us — Get in Touch",
    eyebrow: "Get in touch",
    title: "Leave Your Contact Details, We'll Reach Out",
    intro:
      "Whether you are a patient or a clinic/doctor exploring MediQueue — leave your details and our team will reply during business hours. A live network does not run on this site.",
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
      "Your details have reached our team. We will get in touch via your preferred channel during business hours.",
    phoneTitle: "Phone & WhatsApp",
    emailTitle: "Email Addresses",
    addressTitle: "Headquarters",
    privacyNote:
      "Your request is sent to our team. We do not sell your contact details. See our privacy policy for how we handle data.",
    sendAnother: "Send Another Message",
    namePlaceholder: "e.g. John Doe",
    emailPlaceholder: "example@email.com",
    phonePlaceholder: "+44 7XXX XXXXXX",
    channelsTitle: "Direct Contact Channels",
    teamInbox: "Direct Team Inbox",
    avgResponse: "Average Response Time",
    topicPlaceholderPatient: "e.g. Hair Transplant, Rhinoplasty...",
    topicPlaceholderClinic: "e.g. Clinic Onboarding, Doctor Profile...",
    messagePlaceholder: "Write any details or questions you have...",
    responseNote: "Contact requests are reviewed by our team during business hours.",
  },
  home: {
    platformEyebrow:
      "MEDIQUEUE — official site · transparent health travel, no middleman",
    audiencePatient: "Patient",
    audienceClinic: "Clinic",
    patient: {
      headline: "MEDIQUEUE",
      headlineAccent: "transparent care, no middleman.",
      subcopy:
        "Compare accredited clinics side by side, message directly, and send a request with no upfront payment. You decide — the process stays visible.",
      primaryCta: "Explore Clinics",
      secondaryCta: "How It Works",
      previewCaption: "Live Demo — Patient App & Clinic Comparison Screen",
    },
    clinic: {
      headline: "MEDIQUEUE",
      headlineAccent: "pay when the patient arrives.",
      subcopy:
        "Skip the agency retainer on this site. Commercial terms are confirmed in writing. No subscription checkout here.",
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
      { label: "Direct Communication", detail: "No agency-commission markup model" },
      { label: "Accredited Clinics", detail: "JCI or equivalent evidence is requested at join" },
      { label: "Transparent Pricing", detail: "Package fields shown on sample cards" },
      { label: "Patient Privacy", detail: "Form data is not sold; submitted over HTTPS" },
    ],
    trustStripLabel: "Trust & Transparency",
    globalReach: {
      eyebrow: "A preview from your clinic panel",
      title: "Patients from every corner of the world",
      subtitle:
        "When your clinic joins MediQueue, request countries are designed to appear in the panel. The globe below is sample data.",
      panelTitle: "Countries your patients come from",
      panelSubtitle:
        "{patients} international patients applied from {countries} different countries.",
      demoCaption: "Sample clinic panel view · demo data",
      countryColumn: "Country",
      patientColumn: "Patients",
      emptyList:
        "Country breakdown will appear here once your first international requests arrive.",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      patientsNoun: "patients",
      mostFrom: "Most from",
      emptyTitle: "No international patients yet",
      emptyBody:
        "When your first international request arrives, origin countries will map here.",
      globeAria: "Rotatable globe showing {count} countries",
      scrollUp: "Scroll list up",
      scrollDown: "Scroll list down",
    },
    finalPatientTitle: "You decide your treatment journey",
    finalPatientBody:
      "Compare clinics, message directly, send a request with no upfront payment.",
    finalPatientCta: "Explore clinics",
    finalClinicTitle: "International patients, without an agency retainer",
    finalClinicBody:
      "Pay only when the patient arrives and treatment is confirmed. No panel subscription.",
    finalClinicCta: "Add your clinic",
  },
  clinics: {
    seoTitle: "For clinics",
    heroTag:
      "Stop pouring a fortune into ads. Pay only for the patient who converts.",
    heroSub:
      "Instead of retainers and unverified ad spend, join a request-and-panel model for international patients. This site does not collect a subscription fee.",
    primaryCta: "Add Your Clinic",
    secondaryCta: "How the system works",
    requestLabel: "New appointment request",
    requestBudget: "Budget",
    requestTreatment: "Treatment",
    requestLanguage: "Language",
    requestReview: "Review request",
    metricCaption: "Live Demo — Clinic Management Panel & Appointment Requests",
    panelLabel: "Clinic panel",
    compareEyebrow: "Traditional vs. MediQueue",
    compareTitle: "No agency retainer. Fees are agreed with the clinic.",
    compareBeforeLabel: "Traditional Methods",
    compareAfterLabel: "Intended model",
    compareCriteriaLabel: "Criterion",
    compareIntro:
      "Built so clinics can see requests tagged with language, budget, and treatment — instead of paying a fixed agency retainer or ads with no outcome guarantee.",
    compareBeforeTitle: "Traditional Health Tourism Agencies",
    compareBeforeFoot:
      "Ad budgets carry zero conversion guarantee; financial risk rests on the clinic.",
    compareRecommended: "Recommended transparent model",
    compareAfterTitle: "MediQueue marketplace model",
    compareAfterFoot: "No subscription checkout on this site — commercial terms are confirmed in writing.",
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
          "Payment, treatment, and cancellation terms are agreed with the clinic in writing. MediQueue does not charge cards or sell drop-off insurance on this site.",
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
    roadmapMqLabel: "MediQueue side",
    roadmapSteps: [
      {
        title: "Joining & profile",
        clinic:
          "Upload accreditation documents and define specialties and price ranges.",
        mediQueue:
          "Multilingual profile presentation and document review are designed at no listing fee on this site.",
        previewHint:
          "Documents are uploaded in the panel preview; approval status is illustrative.",
      },
      {
        title: "Filtered patient requests",
        clinic:
          "Review applications tagged with budget, language, and treatment notes.",
        mediQueue:
          "Structured request fields are the product. Live spam scanning is not running on this marketing site.",
        previewHint:
          "International request cards appear in the clinic-panel preview.",
      },
      {
        title: "Direct chat & quotes",
        clinic:
          "The model is unmediated chat; the clinic issues the quote.",
        mediQueue:
          "Messaging is designed to run over HTTPS. Translation lines here are demo copy.",
        previewHint:
          "Doctor–patient chat is shown as a bilingual preview.",
      },
      {
        title: "Treatment & settlement",
        clinic:
          "The clinic delivers care. This site does not collect an agency retainer.",
        mediQueue:
          "Platform fees, if any, are set in a written agreement. MediQueue does not charge cards or sell drop-off insurance here.",
        previewHint:
          "Payment and cancellation are agreed with the clinic; this form does not take payment.",
      },
    ],
    performanceTitle: "Sample month (demo)",
    metrics: [
      {
        label: "Active patients (sample)",
        value: "34",
        hint: "Demo figure — not live panel data",
      },
      {
        label: "Pending quotes (sample)",
        value: "8",
        hint: "Sample list",
      },
      {
        label: "Monthly projection (sample)",
        value: "₺186k",
        hint: "Scenario number, not a revenue promise",
      },
    ],
    analytics: {
      eyebrow: "Patient analytics (preview)",
      title: "How request countries appear in the panel",
      body:
        "The globe is designed to show country breakdown for joined clinics. The numbers below are sample data.",
      panelTitle: "Countries of origin",
      panelSubtitle:
        "{patients} international patients requested care from {countries} countries.",
      demoCaption: "Sample clinic panel view · demo data",
      countryColumn: "Country",
      patientColumn: "Patients",
      emptyList:
        "Country breakdown will appear here when your first international requests arrive.",
      highlights: [
        {
          title: "Country breakdown",
          body: "The map shows a sample scenario.",
        },
        {
          title: "Trend tracking",
          body: "Period-over-period views are a product goal.",
        },
        {
          title: "Automated data",
          body: "Figures on this site are not a live synced feed.",
        },
      ],
    },
    finalTitle: "International visibility without an agency retainer.",
    finalBody: "International patients are looking for your clinic. Ready to receive them?",
    finalCta: "Get started",
  },
  patients: {
    seoTitle: "For patients",
    heroTag: "Entrust your health to transparency, not chance.",
    heroSub:
      "Leave hidden agency commissions and opaque prices behind. MEDIQUEUE is the official site designed so you can compare clinics that submit documents and message them directly. Lists on this site are marketing previews.",
    primaryCta: "Explore clinics",
    secondaryCta: "Why MEDIQUEUE?",
    caption: "Live Demo — Patient App & Clinic Comparison",
    whyEyebrow: "Traditional vs. MediQueue",
    whyTitle: "Forget Intermediary Agencies. Receive Care with Full Transparency.",
    whyBeforeLabel: "Traditional Agency Method",
    whyAfterLabel: "MediQueue Transparent Marketplace",
    whyCriteriaLabel: "Criterion",
    whyIntro:
      "A free treatment platform where you compare accredited clinics openly — instead of being steered by commission-driven agents.",
    whyBeforeTitle: "Traditional Health Tourism Agencies",
    whyBeforeFoot: "Hidden cost risk and limited options define the experience.",
    whyRecommended: "Recommended Transparent Model",
    whyAfterTitle: "MediQueue Transparent Marketplace",
    whyAfterFoot: "Discovery and the request form on this site are free — no hidden agency-commission model.",
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
          "Compare accredited clinics freely by specialty, language, and budget",
      },
      {
        title: "Direct Doctor Communication",
        before:
          "No direct contact with doctors; all questions filtered through agency reps",
        after:
          "Message clinic doctors directly. Translation on this site is demo copy. Plan care with the clinic.",
      },
      {
        title: "Zero Upfront Payment Risk",
        before:
          "Upfront fees charged for consultation and bookings with financial loss upon cancellation",
        after:
          "Requesting quotes and messaging from this site is free. Surgery deposits, if any, are agreed with the clinic — MediQueue does not charge cards.",
      },
      {
        title: "Photo privacy",
        before:
          "Unencrypted patient photos passed around agency sales teams with risk of public leaks",
        after:
          "Share photos only when you choose to request a clinic; we do not run automated face-masking as a live product feature",
      },
    ],
    journeyTitle: "How Your Treatment Journey Works in 4 Steps",
    journeyIntro:
      "The entire journey from search to recovery — transparent, secure, and under your control.",
    journeySteps: [
      {
        title: "Discover & Compare Clinics",
        body: "Search by treatment, location, and budget. Package and credential fields appear on sample clinic cards.",
      },
      {
        title: "Free No-Obligation Quotes",
        body: "Send requests to your preferred clinics in one click. Gather personalized quotes with zero upfront fees or card registration.",
      },
      {
        title: "Direct Doctor Consult & Booking",
        body: "The goal is to message the treating doctor directly. Auto-translation on this site is demo copy. Dates and payment are agreed with the clinic.",
      },
      {
        title: "Treatment & Recovery Follow-up",
        body: "Travel to your chosen clinic. Recovery follow-up is planned with the clinic; there is no live assistant panel on this site.",
      },
    ],
    discoverPrivacyNote:
      "Clinic identity stays hidden until you send a request.",
    trustTitle: "Clinics listed with submitted documents",
    trustBody:
      "Joining clinics are asked for JCI (or equivalent) and health-tourism evidence. That is a listing rule, not a live government census or a claim of zero fraud.",
    trustJci: "JCI accreditation",
    trustNational: "National health-tourism certificate",
    trustEyebrow: "Clinics that submit documents",
    trustCheck1: "Listing rules — not a claim of zero fraud",
    trustCheck2: "Verified Medical Expertise",
    trustBadges: [
      {
        title: "JCI International Accreditation",
        subtitle: "Document type requested at onboarding",
        tag: "Criterion",
      },
      {
        title: "Official Health Tourism License",
        subtitle: "Authorization asked for when a clinic joins",
        tag: "Criterion",
      },
      {
        title: "Privacy as a first principle",
        subtitle: "Identity is not listed publicly until you request a clinic",
        tag: "Privacy",
      },
    ],
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
    compareIntro:
      "Manage your entire daily appointment flow and patient communication from a single screen instead of scattered tools.",
    compareBeforeTitle: "Traditional Doctor Workflows",
    compareBeforeFoot: "Process chaos and inefficient appointment tracking.",
    compareRecommended: "Featured Doctor Panel",
    compareAfterTitle: "MediQueue Doctor Dashboard",
    compareAfterFoot: "All patients, calendar, and medical notes organized on one screen.",
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
    featuresEyebrow: "Panel Screens & Features",
    liveDemo: "Live Demo",
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
          "Fast document review and badge status — a sample process, not a live registry scan.",
      },
      {
        title: "Calendar & Schedule",
        doctor: "Set your weekly availability grid and consultation time slots in the panel.",
        mediQueue:
          "Conflict checks and timezone design; reminders are a product goal.",
      },
      {
        title: "Patient Request & Care",
        doctor: "Review incoming patient requests. Translation lines in previews are demo copy.",
        mediQueue:
          "Bilingual messaging is the model; translation lines on this site are demo copy.",
      },
    ],
    trustMessage:
      "Doctor profiles are based on uploaded licenses and specialty documents. That is not instant government-registry verification.",
    finalTitle: "Patients are looking for you.",
    finalBody: "Ready to reach them?",
    finalCta: "Create My Doctor Profile",
  },
  how: {
    seoTitle: "How It Works",
    eyebrow: "Transparent Platform Mechanics",
    title: "From First Search to Care: How the Process Works",
    intro:
      "Free comparison and a non-binding request on this site for patients; no agency retainer checkout for clinics. Live booking and payments do not run here.",
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
        body: "Consult directly with clinic doctors. Auto-translated messaging on this site is a preview, not a live engine. Pay according to the clinic’s terms.",
      },
    ],
    techTitle: "Transparent comparison and rule-based filtering",
    techBody:
      "No agency-commission markup model. Requests are structured by language, budget, and treatment notes — not a black-box recommendation engine.",
    pipeline: [
      { title: "Criteria & Need Filter", body: "Patient applications are verified and filtered by language, budget, and medical need." },
      { title: "Accredited clinic list", body: "Clinics that submit JCI or equivalent evidence are designed to appear in a transparent list." },
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
        a: "Joining clinics are asked for JCI (or equivalent) and an international health-tourism permit. That is not instant government-registry scanning of every application.",
      },
      {
        q: "How does the pricing and clinic fee model work?",
        a: "There is no hidden agency-commission model. If a platform fee applies, it is stated in a written agreement. This site does not charge cards.",
      },
      {
        q: "How is my personal data and medical privacy protected?",
        a: "We collect contact details on the request form and share them with clinics you choose. Your identity is not listed publicly on the marketplace until you submit a request. See the privacy policy for details.",
      },
      {
        q: "Who handles flight and accommodation arrangements?",
        a: "MediQueue facilitates direct clinic-patient communication. Accommodation, airport transfers, and travel logistics are coordinated as part of your chosen clinic's optional package.",
      },
    ],
    patientCta: "Explore clinics",
    clinicCta: "Add your clinic",
    stepsKicker: "3-step transparent journey",
    stepsTitle: "Process map",
    marketplaceBadge: "Direct & transparent marketplace",
    faqExtraTitle: "Have a specific question?",
    faqExtraBody: "Our team can help you with the next step.",
    faqExtraCta: "Ask us",
  },
  team: {
    seoTitle: "About Us — MediQueue",
    heroEyebrow: "About Us & Story",
    heroLeadBold: "Transparency in Healthcare.",
    heroLeadLight: "Broker-Free Future with Tech.",
    heroIntro:
      "We are setting a new global standard where middleman commissions, hidden pricing, and uncertain medical travel are replaced by complete transparency. MediQueue is an independent healthcare marketplace connecting international patients directly with accredited clinics and doctors.",
    heroChip1: "Clinics that submit documents",
    heroChip2: "No-broker communication model",
    stats: [
      { value: "301/1", label: "1st Place Winner", hint: "Entrepreneurship Marathon Champion" },
      { value: "Filter", label: "Structured ranking", hint: "Rule-based filter by language, budget, and need" },
      { value: "Open", label: "Transparent platform", hint: "No broker markup in the model" },
      { value: "JCI", label: "Verified Quality", hint: "Only audited & accredited healthcare institutions" },
    ],
    missionLabel: "Our Mission",
    missionBody:
      "Completely eliminate middleman brokers and hidden commissions from healthcare travel. Enable patients worldwide to connect directly, transparently, and safely with accredited clinics in their native language.",
    visionLabel: "Our Vision",
    visionBody:
      "Free clinics from ad spend with no outcome guarantee; set a transparent marketplace standard that connects treatment-ready patients with clinics that submit documents.",
    valuesEyebrow: "Our Core Principles",
    valuesTitle: "4 Pillars Defining MediQueue Standards",
    values: [
      {
        title: "Uncompromising Transparency",
        body: "No hidden agency-markup model. Package and license fields appear on sample cards; live prices are confirmed with the clinic.",
        icon: "ShieldCheck",
      },
      {
        title: "Direct Doctor Connection",
        body: "No sales-rep filter is the goal. Direct doctor chat is the product model; translation lines on this site are demo copy.",
        icon: "Stethoscope",
      },
      {
        title: "Rule-based filtering",
        body: "We filter and rank clinics by language, budget, and treatment need — structured comparison, not a black-box recommendation.",
        icon: "Sparkles",
      },
      {
        title: "Zero Upfront Risk",
        body: "Free request creation for patients. Risk-free, sustainable growth for clinics with zero upfront ad waste.",
        icon: "CheckCircle2",
      },
    ],
    note: "MediQueue is a growing team building a broker-free marketplace for international health travel.",
    achievementsEyebrow: "Awards & Recognition",
    achievementsTitle: "Our Position in the Tech & Startup Ecosystem",
    achievementChips: [
      {
        label: "1st Place Winner Among 301 Ventures",
        detail: "Düzce Teknopark Entrepreneurship Marathon Championship · 2026",
      },
      {
        label: "Rule-based ranking",
        detail: "Filter by language, budget, and need — plus a broker-free marketplace model",
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
        roleTitle: "CTO / Software, data & matching infrastructure",
        bio: "Building the platform architecture, data layer, and rule-based clinic filtering service.",
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
    socialEyebrow: "Community & social",
    socialIntro: "Official announcements and team news — clinic success stories are not live case studies yet.",
    visitPage: "Visit page",
    exploreAsPatient: "Explore as a patient",
    addClinicCta: "Add your clinic",
    achievementsAside: "Awards",
    socialLinks: [
      {
        platform: "linkedin",
        label: "LinkedIn",
        hint: "Founding team & official company updates",
        href: "https://www.linkedin.com/company/mediqueue",
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
          { href: "/terms", label: "Terms of Use" },
        ],
      },
    ],
    copyright: "MediQueue. All rights reserved.",
    sendEmail: "Send email",
    privacyNote: "Built with patient privacy as a core principle.",
    medicalDisclaimer: "MediQueue is a healthcare marketplace platform. All content is for informational purposes only and does not constitute professional medical advice.",
  },
  cookie: {
    message:
      "Google Analytics loads only if you accept. If you decline, the site works the same way.",
    accept: "Accept",
    reject: "Decline",
    privacy: "Privacy policy",
  },
  legal: {
    updatedLabel: "Last Updated",
    backHome: "Back to Home",
    privacy: {
      title: "Privacy Policy",
      intro: "This notice covers forms and cookies on the getmediqueue.com marketing site. Live clinic software does not run here.",
      updated: "September 15, 2026",
      sections: [
        {
          heading: "1. Data Collection & Use",
          body: "Name, email, phone, and message from contact forms go to the MediQueue team. We do not sell your details. Sharing with a clinic happens after your choice and our team follow-up, typically by email. End-to-end encrypted clinic software does not run on this site.",
        },
        {
          heading: "2. Personal data",
          body: "We process contact details from request forms so we can connect you with clinics you choose. You may ask us to delete your data. This page is not a certification of GDPR or HIPAA compliance.",
        },
        {
          heading: "3. Cookies & Analytics",
          body: "Google Analytics loads only if you accept the cookie bar. If you decline, the analytics script does not run. Your choice is stored for one year.",
        },
        {
          heading: "4. Controller and contact",
          body: "Marketing-site forms go to the MediQueue team. Email mediqueue.tech@gmail.com for access or deletion requests.",
        },
        {
          heading: "5. Retention and processors",
          body: "We keep form data to handle your request and to share it with clinics you choose. If email automation is configured, the same payload may be forwarded. This page is not a KVKK, GDPR, or HIPAA certification.",
        },
        {
          heading: "6. Scope of this site",
          body: "getmediqueue.com is a marketing and lead site. Live booking, payments, and clinic software do not run here.",
        },
      ],
    },
    terms: {
      title: "Terms of Service & Platform Agreement",
      intro: "These terms cover getmediqueue.com. Live clinic software, booking, and payments do not run here.",
      updated: "September 15, 2026",
      sections: [
        {
          heading: "1. Scope of Service & Marketplace Model",
          body: "MEDIQUEUE is designed as a marketplace that connects international patients with clinics that submit documents, without an agency markup on this site. Joining criteria include JCI or equivalent evidence — not a claim that every clinic is state-certified.",
        },
        {
          heading: "2. User Obligations",
          body: "Users agree to provide accurate information when requesting treatment options. Participating clinics and doctors are responsible for maintaining up-to-date credentials and transparent package pricing.",
        },
        {
          heading: "3. Zero Upfront Payment Policy",
          body: "Patients can leave non-binding requests on this site with no card on file. Clinic appointments and fees are agreed with the clinic; MediQueue does not collect treatment payments.",
        },
      ],
    },
    disclaimer: {
      title: "Medical Disclaimer",
      intro: "Important legal notification regarding content and informational materials on MediQueue.",
      updated: "September 15, 2026",
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
  screens: enScreens,
};
