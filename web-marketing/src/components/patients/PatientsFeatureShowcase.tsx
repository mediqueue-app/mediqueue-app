"use client";

import { useState, type ReactNode } from "react";
import {
  Search,
  MessageSquare,
  FileText,
  Plane,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/clinics/FadeIn";
import { ComparePreview } from "@/components/patients/journey/ComparePreview";
import { BilingualChatPreview } from "@/components/patients/journey/BilingualChatPreview";
import { RequestFormPreview } from "@/components/patients/journey/RequestFormPreview";
import { TravelPreview } from "@/components/patients/journey/TravelPreview";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";

const PREVIEWS: Record<string, () => ReactNode> = {
  compare: ComparePreview,
  chat: BilingualChatPreview,
  request: RequestFormPreview,
  travel: TravelPreview,
};

export function PatientsFeatureShowcase() {
  const { locale } = useLocale();
  const tr = locale === "tr";
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const features = [
    {
      id: "compare",
      title: tr ? "Akredite Klinikleri Şeffafça Kıyaslayın" : "Compare Accredited Clinics Transparently",
      body: tr
        ? "JCI ve Sağlık Bakanlığı onaylı klinikleri fiyat, sertifika, uzman hekim ve hasta yorumlarına göre 360° inceleyin."
        : "Analyze JCI and Ministry-approved clinics 360° based on pricing, certifications, doctor credentials, and patient reviews.",
      icon: Search,
    },
    {
      id: "chat",
      title: tr ? "Komisyonsuz & Doğrudan Mesajlaşın" : "Chat Directly Without Middlemen",
      body: tr
        ? "Aracı acenteler veya komisyoncular olmadan kliniğin medikal direktörleri ile kendi dilinizde anında yazışın."
        : "Communicate instantly in your language with clinic medical coordinators with zero agent commissions.",
      icon: MessageSquare,
    },
    {
      id: "request",
      title: tr ? "Ön Ödemesiz & Ücretsiz Talep Oluşturun" : "Create Free Requests with Zero Upfront Cost",
      body: tr
        ? "Kişisel tedavi beklentilerinizi, bütçenizi ve dil tercihinizi belirterek bağlayıcı olmayan özel teklifler alın."
        : "Specify your treatment needs, budget, and language to receive tailored non-binding clinic proposals.",
      icon: FileText,
    },
    {
      id: "travel",
      title: tr ? "Bütüncül Seyahat & Tedavi Takibi" : "End-to-End Travel & Recovery Assistance",
      body: tr
        ? "Havalimanı VIP transferinden otel konaklamasına, operasyon bakımlarından iyileşme sürecine kadar tüm adımları izleyin."
        : "Track VIP transfers, hotel accommodation, operation steps, and post-op care seamlessly from one screen.",
      icon: Plane,
    },
  ];

  const currentFeature = features[active];
  const PreviewComponent = PREVIEWS[currentFeature.id];

  return (
    <section id="ozellikler" className="scroll-mt-28 border-b border-slate-200/80 bg-white py-16 md:py-20">
      <Container>
        <FadeIn>
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary-light px-3.5 py-1.5 text-xs font-bold text-primary mb-5">
            <span>
              {tr ? "Hasta Deneyimi & Platform Ekranları" : "Patient Experience & Platform Screens"}
            </span>
          </div>
          <h2 className="font-display max-w-2xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {tr ? "Tedavinizi Güvenle Yöneten Akıllı Hasta Ekranları" : "Smart Patient Tools for Safe Treatment"}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {tr
              ? "Tedavi arayışından dönüş yolculuğunuza kadar tüm aşamaları şeffaf, güvenli ve aracısız bir arayüzde kontrol edin."
              : "Control every step of your medical journey transparently and directly without intermediary agents."}
          </p>
        </FadeIn>

        <div className="mt-14 lg:mt-18 grid gap-8 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,1fr)] lg:gap-12 lg:items-center">
          <FadeIn delay={0.06} className="self-center">
            <ul className="space-y-2.5">
              {features.map((f, i) => {
                const Icon = f.icon;
                const isSelected = i === active;
                return (
                  <li key={f.id}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
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
                
                {PreviewComponent ? <PreviewComponent /> : null}
              </motion.div>
            </AnimatePresence>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
