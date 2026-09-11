import type { Metadata } from "next";
import { content, type Locale } from "@/content";
import { getRequestLocale } from "@/lib/locale-server";

type SeoPage = "home" | "clinics" | "patients" | "doctors" | "how" | "team";

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
    default:
      return t.seo;
  }
}

export async function localizedMetadata(page: SeoPage = "home"): Promise<Metadata> {
  const locale = await getRequestLocale();
  const { title, description } = pageCopy(locale, page);
  const ogLocale = locale === "en" ? "en_US" : "tr_TR";
  const altLocale = locale === "en" ? "tr_TR" : "en_US";

  if (page === "home") {
    return {
      title: { default: title, template: "%s · MEDIQUEUE" },
      description,
      openGraph: {
        locale: ogLocale,
        alternateLocale: altLocale,
        title,
        description,
      },
      twitter: { title, description },
    };
  }

  return {
    title,
    description,
    openGraph: { locale: ogLocale, alternateLocale: altLocale, title, description },
    twitter: { title, description },
  };
}
