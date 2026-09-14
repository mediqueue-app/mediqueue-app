import { content, type Locale } from "@/content";

export function documentTitleForPath(locale: Locale, pathname: string): string {
  const t = content[locale];
  if (pathname.startsWith("/clinics")) return `${t.clinics.seoTitle} · MEDIQUEUE`;
  if (pathname.startsWith("/patients")) return `${t.patients.seoTitle} · MEDIQUEUE`;
  if (pathname.startsWith("/doctors")) return `${t.doctors.seoTitle} · MEDIQUEUE`;
  if (pathname.startsWith("/how-it-works")) return `${t.how.seoTitle} · MEDIQUEUE`;
  if (pathname.startsWith("/team")) return `${t.team.seoTitle} · MEDIQUEUE`;
  if (pathname.startsWith("/contact")) return `${t.contact.seoTitle} · MEDIQUEUE`;
  if (pathname.startsWith("/privacy")) return `${t.legal.privacy.title} · MEDIQUEUE`;
  if (pathname.startsWith("/terms")) return `${t.legal.terms.title} · MEDIQUEUE`;
  if (pathname.startsWith("/disclaimer")) return `${t.legal.disclaimer.title} · MEDIQUEUE`;
  return t.seo.title;
}
