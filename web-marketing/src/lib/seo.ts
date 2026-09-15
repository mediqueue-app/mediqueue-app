import type { Metadata } from "next";
import { content, type Locale } from "@/content";
import { getRequestLocale } from "@/lib/locale-server";
import { SITE_URL } from "@/lib/site";

export type SeoPage =
  | "home"
  | "clinics"
  | "patients"
  | "doctors"
  | "how"
  | "team"
  | "contact"
  | "privacy"
  | "terms"
  | "disclaimer";

const PAGE_PATHS: Record<SeoPage, string> = {
  home: "",
  clinics: "/clinics",
  patients: "/patients",
  doctors: "/doctors",
  how: "/how-it-works",
  team: "/team",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
  disclaimer: "/disclaimer",
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
    case "privacy":
      return { title: t.legal.privacy.title, description: t.legal.privacy.intro };
    case "terms":
      return { title: t.legal.terms.title, description: t.legal.terms.intro };
    case "disclaimer":
      return { title: t.legal.disclaimer.title, description: t.legal.disclaimer.intro };
    default:
      return t.seo;
  }
}

function localizedPath(locale: Locale, path: string) {
  if (locale === "en") return path === "" ? "/en" : `/en${path}`;
  return path;
}

function canonicalFor(locale: Locale, path: string) {
  return `${SITE_URL}${localizedPath(locale, path)}`;
}

export async function localizedMetadata(page: SeoPage = "home"): Promise<Metadata> {
  const locale = await getRequestLocale();
  const { title, description } = pageCopy(locale, page);
  const ogLocale = locale === "en" ? "en_US" : "tr_TR";
  const altLocale = locale === "en" ? "tr_TR" : "en_US";

  const displayTitle = page === "home" ? title : `${title} · MEDIQUEUE`;
  const path = PAGE_PATHS[page];
  const canonical = canonicalFor(locale, path);
  const keywords = content[locale].seo.keywords;

  return {
    metadataBase: new URL(SITE_URL),
    title: displayTitle,
    description,
    keywords,
    applicationName: "MEDIQUEUE",
    alternates: {
      canonical,
      languages: {
        tr: canonicalFor("tr", path),
        en: canonicalFor("en", path),
        "x-default": canonicalFor("tr", path),
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
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
