"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale";

export default function NotFound() {
  const { locale } = useLocale();
  const tr = locale === "tr";

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
        404
      </p>
      <h1 className="font-display mt-3 text-3xl tracking-tight text-ink">
        {tr ? "Sayfa bulunamadı" : "Page not found"}
      </h1>
      <p className="mt-3 text-base text-slate-600">
        {tr
          ? "Bu adres artık yok veya hiç olmadı. Ana sayfadan devam edebilirsiniz."
          : "This address is gone or never existed. You can continue from the home page."}
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white hover:bg-primary-hover"
      >
        {tr ? "Ana sayfaya dön" : "Back to home"}
      </Link>
    </div>
  );
}
