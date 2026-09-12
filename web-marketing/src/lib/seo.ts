import type { Metadata } from "next";
import { content, type Locale } from "@/content";
import { getRequestLocale } from "@/lib/locale-server";
import { SITE_URL } from "@/lib/site";

type SeoPage = "home" | "clinics" | "patients" | "doctors" | "how" | "team" | "contact";

const PAGE_PATHS: Record<SeoPage, string> = {
  home: "",
  clinics: "/clinics",
  patients: "/patients",
  doctors: "/doctors",
  how: "/how-it-works",
  team: "/team",
  contact: "/contact",
};

function pageCopy(locale: Locale, page: SeoPage) {
  const t = content[locale];
  switch (page) {
    case "clinics":
      return { title: t.clinics.seoTitle, description: t.clinics.heroSub };
    case "patients":
      return { title: t.patients.seoTitle, description: t.patients.heroSub };
    case "doctors":
      return { title: t.doctors.seoTitle, description: t.doctors.intro };
    case "how":
      return { title: t.how.seoTitle, description: t.how.intro };
    case "team":
      return { title: t.team.seoTitle, description: t.team.heroIntro };
    case "contact":
      return { title: t.contact.seoTitle, description: t.contact.intro };
    default:
      return t.seo;
  }
}

export async function localizedMetadata(page: SeoPage = "home"): Promise<Metadata> {
  const locale = await getRequestLocale();
  const { title, description } = pageCopy(locale, page);
  const ogLocale = locale === "en" ? "en_US" : "tr_TR";
  const altLocale = locale === "en" ? "tr_TR" : "en_US";

  const displayTitle = page === "home" ? title : `${title} · MEDIQUEUE`;
  const path = PAGE_PATHS[page];

  const keywords =
    locale === "tr"
      ? [
          "MediQueue",
          "Sağlık Turizmi",
          "Klinik Karşılaştırma",
          "JCI Akredite Klinikler",
          "Saç Ekimi Fiyatları",
          "Rinoplasti Cerrahi",
          "Doktor Randevu",
          "Uluslararası Hasta",
          "Komisyonsuz Sağlık Pazar Yeri",
        ]
      : [
          "MediQueue",
          "Health Tourism",
          "Medical Travel Marketplace",
          "JCI Accredited Clinics",
          "Hair Transplant Cost",
          "Rhinoplasty Surgery",
          "Doctor Appointments",
          "International Patients",
          "Direct Clinic Marketplace",
        ];

  return {
    metadataBase: new URL(SITE_URL),
    title: displayTitle,
    description,
    keywords,
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        tr: `${SITE_URL}${path}?lang=tr`,
        en: `${SITE_URL}${path}?lang=en`,
      },
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${path}`,
      siteName: "MEDIQUEUE",
      locale: ogLocale,
      alternateLocale: altLocale,
      title: displayTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
