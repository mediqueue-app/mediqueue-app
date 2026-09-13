"use client";

import { ShieldCheck, Award, FileCheck, CheckCircle2, Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";

export function ClinicsTrustStrip() {
  const { locale } = useLocale();
  const tr = locale === "tr";

  const trustBadges = [
    {
      icon: FileCheck,
      title: tr ? "Uluslararası Sağlık Turizmi Belgesi" : "International Health Tourism Permit",
      subtitle: tr ? "Sağlık Bakanlığı Resmi Yetki Belgesi" : "Ministry of Health Certification",
      tag: tr ? "Yasal Zorunluluk" : "Official Permit",
    },
    {
      icon: Award,
      title: tr ? "JCI & ISO Kalite Sertifikası" : "JCI & ISO Quality Certification",
      subtitle: tr ? "Küresel Hasta Hizmet ve Hijyen Standartları" : "Global Patient Service & Hygiene Standards",
      tag: tr ? "Küresel Güvence" : "Global Standard",
    },
    {
      icon: Building2,
      title: tr ? "%100 Doğrulanmış Klinik Kadrosu" : "100% Verified Clinic & Faculty",
      subtitle: tr ? "Denetimden Geçmiş Hekim ve Ameliyathane İmkânları" : "Audited Faculty & Operating Facilities",
      tag: tr ? "Denetimli Ağ" : "Audited Network",
    },
  ];

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
                  {tr ? "%100 Akredite Klinik Ağı" : "100% Verified Clinic Network"}
                </span>

                <h2 className="font-display mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.35rem]">
                  {tr ? "Sağlık Bakanlığı Onaylı Lisanslar. Küresel Güvenlik Standartları." : "Ministry Approved Licenses. Global Safety Standards."}
                </h2>

                <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                  {tr
                    ? "MediQueue pazar yerinde listelenen tüm klinikler, Uluslararası Sağlık Turizmi Yetki Belgesi ve JCI kriterlerimize göre titizlikle doğrulanır. Sahte klinikler veya merdiven altı işletmeler platforma kabul edilmez."
                    : "All clinics listed on MediQueue are strictly verified according to International Health Tourism authorization permit and JCI quality criteria."}
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-slate-100 pt-6 text-xs text-slate-500">
                  <span className="flex items-center gap-2 font-semibold text-slate-800">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    {tr ? "Lisanslı Sağlık Kuruluşları" : "Licensed Health Institutions"}
                  </span>
                  <span className="flex items-center gap-2 font-semibold text-slate-800">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    {tr ? "Sıfır Sahte Klinik Riski" : "Zero Unverified Clinic Risk"}
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
