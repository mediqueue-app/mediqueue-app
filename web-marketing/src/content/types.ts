export type Locale = "en" | "tr";

export type NavLink = { href: string; label: string };

export type SiteContent = {
  seo: { title: string; description: string };
  nav: {
    links: NavLink[];
    clinicCta: string;
    patientCta: string;
    localeLabel: string;
    openMenu: string;
    closeMenu: string;
    localeEn: string;
    localeTr: string;
    skip: string;
  };
  home: {
    platformEyebrow: string;
    audiencePatient: string;
    audienceClinic: string;
    patient: {
      headline: string;
      headlineAccent: string;
      subcopy: string;
      primaryCta: string;
      secondaryCta: string;
      previewCaption: string;
    };
    clinic: {
      headline: string;
      headlineAccent: string;
      subcopy: string;
      primaryCta: string;
      secondaryCta: string;
      previewCaption: string;
    };
    proof: { kicker: string; title: string }[];
    match: {
      eyebrow: string;
      title: string;
      body: string;
      patientLabel: string;
      clinicLabel: string;
      matchBadge: string;
      noBroker: string;
      patientTags: string[];
      clinicTags: string[];
    };
    doorsEyebrow: string;
    doorsTitle: string;
    doors: {
      href: string;
      eyebrow: string;
      title: string;
      body: string;
      preview: "clinic" | "patient" | "doctor";
    }[];
    trust: { label: string; detail: string }[];
    trustStripLabel: string;
    globalReach: {
      eyebrow: string;
      title: string;
      subtitle: string;
      panelTitle: string;
      panelSubtitle: string;
      demoCaption: string;
      countryColumn: string;
      patientColumn: string;
      emptyList: string;
    };
    finalPatientTitle: string;
    finalPatientBody: string;
    finalPatientCta: string;
    finalClinicTitle: string;
    finalClinicBody: string;
    finalClinicCta: string;
  };
  clinics: {
    seoTitle: string;
    heroTag: string;
    heroSub: string;
    primaryCta: string;
    secondaryCta: string;
    requestLabel: string;
    requestBudget: string;
    requestTreatment: string;
    requestLanguage: string;
    requestReview: string;
    metricCaption: string;
    panelLabel: string;
    compareEyebrow: string;
    compareTitle: string;
    compareBeforeLabel: string;
    compareAfterLabel: string;
    compareCriteriaLabel: string;
    compareRows: {
      title: string;
      before: string;
      after: string;
      highlight?: boolean;
    }[];
    roadmapTitle: string;
    roadmapIntro: string;
    roadmapClinicLabel: string;
    roadmapMqLabel: string;
    roadmapSteps: {
      title: string;
      clinic: string;
      mediQueue: string;
      previewHint?: string;
    }[];
    performanceTitle: string;
    metrics: { label: string; value: string; hint: string }[];
    analytics: {
      eyebrow: string;
      title: string;
      body: string;
      panelTitle: string;
      panelSubtitle: string;
      demoCaption: string;
      countryColumn: string;
      patientColumn: string;
      emptyList: string;
      highlights: { title: string; body: string }[];
    };
    finalTitle: string;
    finalBody: string;
    finalCta: string;
  };
  patients: {
    seoTitle: string;
    heroTag: string;
    heroSub: string;
    primaryCta: string;
    secondaryCta: string;
    whyEyebrow: string;
    whyTitle: string;
    whyBeforeLabel: string;
    whyAfterLabel: string;
    whyCriteriaLabel: string;
    whyRows: { title: string; before: string; after: string }[];
    journeyTitle: string;
    journeyIntro: string;
    journeySteps: { title: string; body: string }[];
    discoverPrivacyNote: string;
    trustTitle: string;
    trustBody: string;
    trustJci: string;
    trustNational: string;
    finalTitle: string;
    finalBody: string;
    finalCta: string;
  };
  doctors: {
    seoTitle: string;
    eyebrow: string;
    title: string;
    intro: string;
    primaryCta: string;
    secondaryCta: string;
    caption: string;
    compareEyebrow: string;
    compareTitle: string;
    compareBeforeLabel: string;
    compareAfterLabel: string;
    compareCriteriaLabel: string;
    compareRows: {
      title: string;
      before: string;
      after: string;
      highlight?: boolean;
    }[];
    featuresTitle: string;
    featuresIntro: string;
    features: { id: string; title: string; body: string }[];
    roadmapTitle: string;
    roadmapIntro: string;
    roadmapDoctorLabel: string;
    roadmapMqLabel: string;
    roadmapSteps: {
      title: string;
      doctor: string;
      mediQueue: string;
      previewHint?: string;
    }[];
    trustMessage: string;
    finalTitle: string;
    finalBody: string;
    finalCta: string;
  };
  how: {
    seoTitle: string;
    eyebrow: string;
    title: string;
    intro: string;
    steps: { title: string; body: string }[];
    techTitle: string;
    techBody: string;
    pipeline: { title: string; body: string }[];
  };
  team: {
    seoTitle: string;
    heroEyebrow: string;
    heroLeadBold: string;
    heroLeadLight: string;
    heroIntro: string;
    missionLabel: string;
    missionBody: string;
    visionLabel: string;
    visionBody: string;
    note: string;
    achievementChips: { label: string; detail: string }[];
    foundersEyebrow: string;
    foundersTitle: string;
    members: {
      name: string;
      roleTitle: string;
      bio: string;
      image: string;
      accent: string;
      linkedin: string;
    }[];
    socialTitle: string;
    socialLinks: {
      platform: "linkedin" | "instagram";
      label: string;
      hint: string;
      href: string;
    }[];
  };
  footer: {
    tagline: string;
    groups: { title: string; links: NavLink[] }[];
    copyright: string;
    privacyNote: string;
    medicalDisclaimer: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { question: string; answer: string }[];
  };
  lead: {
    close: string;
    patientTab: string;
    clinicTab: string;
    patientTitle: string;
    patientBody: string;
    clinicTitle: string;
    clinicBody: string;
    name: string;
    email: string;
    phone: string;
    country: string;
    treatment: string;
    treatmentOptions: string[];
    clinicName: string;
    city: string;
    website: string;
    role: string;
    roleClinic: string;
    roleDoctor: string;
    message: string;
    consent: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    error: string;
    required: string;
  };
  legal: {
    privacyLink: string;
    termsLink: string;
    disclaimerLink: string;
    updatedLabel: string;
    privacy: {
      title: string;
      updated: string;
      intro: string;
      sections: { heading: string; body: string }[];
    };
    terms: {
      title: string;
      updated: string;
      intro: string;
      sections: { heading: string; body: string }[];
    };
    disclaimer: {
      title: string;
      updated: string;
      intro: string;
      sections: { heading: string; body: string }[];
    };
  };
};
