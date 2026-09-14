"use client";

import { ShieldCheck, Award, FileCheck, CheckCircle2, Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";

export function ClinicsTrustStrip() {
  const { t } = useLocale();
  const block = t.screens.clinicsTrust;
  const icons = [FileCheck, Award, Building2] as const;
  const trustBadges = block.badges.map((badge, i) => ({
    ...badge,
    icon: icons[i] ?? Building2,
  }));

  return (
    <section className="border-b border-slate-200/80 bg-gradient-to-b from-slate-50 via-slate-100/50 to-white py-16 md:py-20">
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white p-8 shadow-md sm:p-12 lg:p-14">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
              aria-hidden
            />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  {block.eyebrow}
                </span>

                <h2 className="font-display mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.35rem]">
                  {block.title}
                </h2>

                <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                  {block.body}
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-slate-100 pt-6 text-xs text-slate-500">
                  <span className="flex items-center gap-2 font-semibold text-slate-800">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    {block.check1}
                  </span>
                  <span className="flex items-center gap-2 font-semibold text-slate-800">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    {block.check2}
                  </span>
                </div>
              </div>

              {/* Trust Badges List */}
              <div className="grid gap-4 sm:grid-cols-1">
                {trustBadges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.title}
                      className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4.5 transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50/30 hover:shadow-sm"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200/60 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-sm font-bold text-slate-900">
                            {badge.title}
                          </h3>
                          <span className="rounded-full bg-emerald-100/90 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                            {badge.tag}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-500">
                          {badge.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
