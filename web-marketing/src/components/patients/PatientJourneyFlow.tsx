"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { UserCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BilingualChatPreview } from "@/components/patients/journey/BilingualChatPreview";
import { DiscoverPreview } from "@/components/patients/journey/DiscoverPreview";
import { RecoveryPreview } from "@/components/patients/journey/RecoveryPreview";
import { RequestFormPreview } from "@/components/patients/journey/RequestFormPreview";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";

function JourneyPreview({ step }: { step: number }) {
  switch (step) {
    case 0:
      return <DiscoverPreview />;
    case 1:
      return <RequestFormPreview />;
    case 2:
      return <BilingualChatPreview />;
    case 3:
      return <RecoveryPreview />;
    default:
      return <DiscoverPreview />;
  }
}

export function PatientJourneyFlow() {
  const { locale, t } = useLocale();
  const tr = locale === "tr";
  const p = t.patients;
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const steps = p.journeySteps;
  const progress = ((active + 1) / steps.length) * 100;

  const stepDetails = [
    {
      patientRole: tr ? "Özgür Seçim" : "Free Selection",
      patientText: tr
        ? "Acenta yönlendirmesi olmadan, bütçe ve konumunuza uygun JCI akredite klinikleri özgürce kıyaslayın."
        : "Compare JCI-accredited clinics freely by budget and location without agency bias.",
      mqRole: tr ? "MediQueue Şeffaflığı" : "MediQueue Transparency",
      mqText: tr
        ? "Gerçek hasta değerlendirmeleri, onaylı lisanslar ve gizli maliyetsiz net paket fiyatları sunulur."
        : "Verified patient reviews, certified licenses, and clear all-inclusive package prices.",
    },
    {
      patientRole: tr ? "Sıfır Riskli Başvuru" : "Zero-Risk Request",
      patientText: tr
        ? "Kredi kartı veya ön ödeme gerekmeden beğendiğiniz kliniklere tek tıkla resmi talep iletin."
        : "Submit official requests to preferred clinics in one click with zero upfront fees or deposits.",
      mqRole: tr ? "Veri Gizliliği & Güvenlik" : "Data Privacy & Safety",
      mqText: tr
        ? "Siz onay verene kadar kişisel iletişim bilgileriniz gizli tutulur; yalnızca doğrulanmış teklifler toplanır."
        : "Personal contact info stays private until you approve; only verified offers are collected.",
    },
    {
      patientRole: tr ? "Aracısız Doğrudan Mesajlaşma" : "Direct Doctor Chat",
      patientText: tr
        ? "Tedavi planınızı doğrudan sorumlu hekiminizle konuşun, aklınızdaki tüm soruları ilk elden yanıtlayın."
        : "Discuss your treatment plan directly with your doctor and get first-hand medical answers.",
      mqRole: tr ? "Anlık Otomatik Çeviri" : "Instant Auto-Translation",
      mqText: tr
        ? "Çift yönlü otomatik çeviri altyapısı sayesinde yabancı dildeki doktorlarla dil engeli yaşamadan yazışın."
        : "Bilingual auto-translation enables seamless messaging with international doctors without language barriers.",
    },
    {
      patientRole: tr ? "Güvenli Tedavi & Seyahat" : "Safe Care & Travel",
      patientText: tr
        ? "Klinik kapısında karşılanın, tedavinizi tamamlayıp huzurla eve dönün."
        : "Receive warm arrival welcome, complete treatment, and return home with full peace of mind.",
      mqRole: tr ? "Kesintisiz İyileşme Takibi" : "Continuous Recovery Support",
      mqText: tr
        ? "Operasyon sonrasında da iyileşme kontrolleri ve hatırlatmalar dijital asistan üzerinden devam eder."
        : "Post-op check-ups and recovery reminders continue through your digital assistant even after returning home.",
    },
  ];

  const currentDetail = stepDetails[active] || stepDetails[0];

  return (
    <section id="yolculuk" className="scroll-mt-28 bg-white pt-6 md:pt-8 pb-20 md:pb-28 lg:pb-32">
      <Container>
        <FadeIn>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-3.5 py-1.5 text-xs font-bold text-primary mb-5">
            <Sparkles className="h-4 w-4" />
            <span>{tr ? "Adım Adım Hasta Rehberi" : "Step-by-Step Patient Guide"}</span>
          </div>
          <h2 className="font-display max-w-2xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {p.journeyTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {p.journeyIntro}
          </p>
        </FadeIn>

        {/* Timeline Desktop Navigation */}
        <div className="relative mt-16 lg:mt-20 hidden lg:block">
          {/* Continuous background track line behind circle centers */}
          <div
            className="absolute top-5 left-[12.5%] right-[12.5%] h-0.5 -translate-y-1/2 bg-slate-200"
            aria-hidden
          />
          {/* Continuous active progress blue line */}
          <div
            className="absolute top-5 left-[12.5%] right-[12.5%] h-0.5 -translate-y-1/2 pointer-events-none"
            aria-hidden
          >
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${(active / (steps.length - 1)) * 100}%` }}
            />
          </div>

          <ol className="relative grid grid-cols-4 gap-4">
            {steps.map((step, i) => {
              const current = i === active;
              const isPast = i < active;
              return (
                <li key={step.title} className="relative">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      "group relative z-10 flex w-full flex-col items-center text-center transition-colors focus-visible:outline-none",
                      current
                        ? "text-primary"
                        : "text-slate-500 hover:text-slate-800"
                    )}
                  >
                    <span
                      className={cn(
                        "mb-3 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white text-sm font-bold transition-all shadow-xs",
                        current
                          ? "border-primary text-primary ring-4 ring-primary/10"
                          : isPast
                          ? "border-primary bg-primary-light text-primary"
                          : "border-slate-300 text-slate-400 group-hover:border-slate-400"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="block text-sm font-semibold leading-snug text-slate-900 text-center max-w-[180px]">
                      {step.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Mobile Horizontal Pill Scroll */}
        <div className="mt-10 flex gap-2 overflow-x-auto pb-2 lg:hidden">
          {steps.map((step, i) => (
            <button
              key={step.title}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                i === active
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-white text-slate-600"
              )}
            >
              {String(i + 1).padStart(2, "0")} · {step.title}
            </button>
          ))}
        </div>

        {/* Main Content Grid (Balanced Heights) */}
        <div className="mt-14 lg:mt-18 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white text-base font-bold shadow-md shadow-primary/25">
                    0{active + 1}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {steps[active]?.title}
                  </h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                  {steps[active]?.body}
                </p>
              </div>

              {/* Action & Guarantee Detail Cards */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 shadow-2xs">
                  <div className="mb-2.5 flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-200/80 text-slate-700">
                      <UserCheck className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      {currentDetail.patientRole}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-600 font-medium">
                    {currentDetail.patientText}
                  </p>
                </div>

                <div className="rounded-2xl border border-teal-200 bg-teal-50/50 p-5 shadow-2xs">
                  <div className="mb-2.5 flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-100 text-teal-800">
                      <Sparkles className="h-4 w-4 text-teal-700" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                      {currentDetail.mqRole}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-700 font-semibold">
                    {currentDetail.mqText}
                  </p>
                </div>
              </div>

              {/* Key Benefit Highlights */}
              <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                <p className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  {tr ? "Öne Çıkan Güven Unsuru" : "Key Safety Highlight"}
                </p>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  {tr
                    ? "Tüm tıbbi görüşmeler ve teklifler KVKK/GDPR uyumlu şifreli altyapı üzerinden yürütülür."
                    : "All medical consultations and quotes are handled via HIPAA/GDPR encrypted infrastructure."}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`preview-${active}`}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-3.5 sm:p-5 shadow-sm"
            >
              <JourneyPreview step={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
