"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/clinics/FadeIn";
import { ClinicRequestsPreview } from "@/components/product/ClinicRequestsPreview";
import { ClinicPatientAnalytics } from "@/components/clinics/ClinicPatientAnalytics";
import { BilingualChatPreview } from "@/components/patients/journey/BilingualChatPreview";
import { DoctorSchedulePreview } from "@/components/product/DoctorSchedulePreview";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";

export function ClinicsFeatureShowcase() {
  const { locale } = useLocale();
  const tr = locale === "tr";
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const features = [
    {
      id: "requests",
      title: tr ? "Canlı Talep Yönetim Paneli" : "Live Request Management Panel",
      body: tr
        ? "Bütçe, dil ve tedavi ihtiyacı doğrulanmış hasta taleplerini tek ekrandan inceleyin ve onaylayın."
        : "Review and approve patient requests verified by budget, language, and treatment need.",
      icon: LayoutDashboard,
    },
    {
      id: "analytics",
      title: tr ? "Küresel Hasta Analitiği & Harita" : "Global Patient Analytics & Map",
      body: tr
        ? "Hastalarınızın hangi ülkelerden başvurduğunu anlık küre haritası ve oran kırılımları ile izleyin."
        : "Track patient applications worldwide using real-time global mapping and conversion analytics.",
      icon: BarChart3,
    },
    {
      id: "direct",
      title: tr ? "Doğrudan & Otomatik Çevirili Mesajlaşma" : "Direct & Auto-Translated Chat",
      body: tr
        ? "Aracı acentalar olmadan hasta ile kendi dilinde doğrudan mesajlaşın, tedavi detaylarını netleştirin."
        : "Chat directly with patients in their native language using automatic translation tools.",
      icon: Users,
    },
    {
      id: "schedule",
      title: tr ? "Akıllı Takvim & Randevu Koordinasyonu" : "Smart Calendar & Scheduling",
      body: tr
        ? "Klinik hekimlerinizin ve ameliyathanelerinizin boş saatlerini uluslararası hastalarla eşleştirin."
        : "Coordinate physician schedules and operating rooms seamlessly with international arrivals.",
      icon: Calendar,
    },
  ];

  const currentFeature = features[active];

  return (
    <section id="ozellikler" className="scroll-mt-28 border-b border-slate-200/80 bg-white py-16 md:py-20">
      <Container>
        <FadeIn>
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary-light px-3.5 py-1.5 text-xs font-bold text-primary mb-5">
            <span>
              {tr ? "Klinik Yönetim Ekranları & Özellikler" : "Clinic Management Screens & Features"}
            </span>
          </div>
          <h2 className="font-display max-w-2xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {tr ? "Kliniğinizi Büyüten Akıllı Yönetim Araçları" : "Smart Tools to Scale Your Clinic"}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {tr
              ? "Uluslararası pazarlama ve operasyon süreçlerinizi karmaşık yazılımlar yerine MediQueue'nun sezgisel paneli üzerinden yönetin."
              : "Manage international marketing and operations seamlessly using MediQueue's intuitive clinic dashboard."}
          </p>
        </FadeIn>

        <div className="mt-14 lg:mt-18 grid gap-8 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,1fr)] lg:gap-12 lg:items-start">
          <FadeIn delay={0.06}>
            <ul className="space-y-2.5">
              {features.map((f, i) => {
                const Icon = f.icon;
                const isSelected = i === active;
                return (
                  <li key={f.id}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className={cn(
                        "flex w-full items-start gap-3.5 rounded-2xl border px-4 py-3.5 text-left transition-all duration-200",
                        isSelected
                          ? "border-primary/30 bg-primary-light/50 shadow-sm shadow-primary/10 ring-1 ring-primary/20"
                          : "border-slate-200/70 bg-white hover:border-slate-300 hover:bg-slate-50/80"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors mt-0.5",
                          isSelected
                            ? "bg-primary text-white shadow-xs"
                            : "bg-slate-100 text-slate-500"
                        )}
                      >
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-slate-900">
                          {f.title}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-slate-600 line-clamp-2">
                          {f.body}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </FadeIn>

          <FadeIn delay={0.12} className="lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature.id}
                initial={reduced ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="mb-3 flex items-center gap-2 lg:hidden">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                    {currentFeature.icon && <currentFeature.icon className="h-4 w-4" strokeWidth={1.75} />}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {currentFeature.title}
                  </span>
                </div>
                
                {currentFeature.id === "analytics" ? (
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
                    <ClinicPatientAnalytics />
                  </div>
                ) : currentFeature.id === "direct" ? (
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-6">
                    <BilingualChatPreview />
                  </div>
                ) : currentFeature.id === "schedule" ? (
                  <div className="flex items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
                    <DoctorSchedulePreview />
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm p-2">
                    <ClinicRequestsPreview compact />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
