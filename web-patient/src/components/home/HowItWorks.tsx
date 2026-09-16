"use client";

import { Search, CalendarCheck, Stethoscope } from "lucide-react";
import { useT } from "@/lib/i18n";

export function HowItWorks() {
  const t = useT();
  const steps = [
    { icon: Search, title: t("how.step1Title"), desc: t("how.step1Desc") },
    { icon: CalendarCheck, title: t("how.step2Title"), desc: t("how.step2Desc") },
    { icon: Stethoscope, title: t("how.step3Title"), desc: t("how.step3Desc") },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {steps.map((step, i) => (
        <div
          key={step.title}
          className="relative rounded-2xl border border-slate-200 bg-white p-6"
        >
          <span className="absolute right-5 top-5 text-4xl font-black text-slate-100">
            0{i + 1}
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
            <step.icon className="h-6 w-6" />
          </span>
          <h3 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.desc}</p>
        </div>
      ))}
    </div>
  );
}
