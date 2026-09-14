import type { Metadata } from "next";
import Link from "next/link";
import { content } from "@/content";
import { getRequestLocale } from "@/lib/locale-server";
import { withLocalePath } from "@/lib/locale-path";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = content[locale].notFound;
  return {
    title: `${copy.title} · MEDIQUEUE`,
    robots: { index: false, follow: true },
  };
}

export default async function NotFound() {
  const locale = await getRequestLocale();
  const copy = content[locale].notFound;

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
        404
      </p>
      <h1 className="font-display mt-3 text-3xl tracking-tight text-ink">
        {copy.title}
      </h1>
      <p className="mt-3 text-base text-slate-600">
        {copy.body}
      </p>
      <Link
        href={withLocalePath(locale, "/")}
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white hover:bg-primary-hover"
      >
        {copy.cta}
      </Link>
    </div>
  );
}
