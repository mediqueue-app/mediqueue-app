"use client";

import Link from "next/link";
import { ShieldCheck, CreditCard, Star, HeartPulse } from "lucide-react";
import { HowItWorks } from "@/components/home/HowItWorks";
import { useT } from "@/lib/i18n";

export default function HowItWorksPage() {
  const t = useT();
  const values = [
    { icon: ShieldCheck, title: t("how.v1Title"), desc: t("how.v1Desc") },
    { icon: CreditCard, title: t("how.v2Title"), desc: t("how.v2Desc") },
    { icon: Star, title: t("how.v3Title"), desc: t("how.v3Desc") },
    { icon: HeartPulse, title: t("how.v4Title"), desc: t("how.v4Desc") },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          {t("how.eyebrow")}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {t("how.headline")}
        </h1>
        <p className="mt-3 text-slate-500">{t("how.lead")}</p>
      </header>

      <div className="mt-12">
        <HowItWorks />
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((v) => (
          <div
            key={v.title}
            className="rounded-2xl border border-slate-200 bg-white p-6"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
              <v.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-semibold text-slate-900">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 overflow-hidden rounded-3xl bg-primary px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          {t("how.ctaTitle")}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-slate-100">{t("how.ctaBody")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/clinics"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition-transform hover:scale-105"
          >
            {t("how.ctaClinics")}
          </Link>
          <Link
            href="/doctors"
            className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            {t("how.ctaDoctors")}
          </Link>
        </div>
      </div>
    </div>
  );
}
