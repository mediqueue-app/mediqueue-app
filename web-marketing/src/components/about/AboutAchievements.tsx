"use client";

import { Trophy, Award, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";

const ACHIEVEMENT_ICONS = [Trophy, Award, ShieldCheck];

export function AboutAchievements() {
  const { t, locale } = useLocale();
  const tr = locale === "tr";
  const copy = t.team;
  const chips = copy.achievementChips;

  if (!chips || chips.length === 0) return null;

  return (
    <section className="bg-slate-50/50 py-16 md:py-20 border-b border-slate-200/80">
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-slate-900 via-ink to-slate-950 p-8 sm:p-12 lg:p-14 shadow-2xl text-white">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
              aria-hidden
            />

            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 pb-8 border-b border-white/10 gap-4">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                    <Trophy className="h-4 w-4 text-amber-400" />
                    <span>{copy.achievementsEyebrow || (tr ? "Ödüller ve Başarılar" : "Awards & Recognition")}</span>
                  </span>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                    {copy.achievementsTitle || (tr ? "Girişimcilik ve İnovasyon Ekosistemindeki Yerimiz" : "Our Position in the Tech Ecosystem")}
                  </h2>
                </div>

                <div className="hidden lg:flex items-center text-xs font-semibold text-white/50">
                  <span>Tescilli Başarılar</span>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                {chips.map((chip, idx) => {
                  const Icon = ACHIEVEMENT_ICONS[idx] ?? Trophy;
                  return (
                    <div
                      key={chip.label}
                      className="rounded-2xl bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur-xs transition-all duration-300 hover:bg-white/15"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/20 text-amber-400 ring-1 ring-amber-400/30 mb-5">
                        <Icon className="h-5.5 w-5.5" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-white">
                        {chip.label}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-300">
                        {chip.detail}
                      </p>
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
