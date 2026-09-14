"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/lib/locale";
import { useLeadCapture } from "@/lib/lead-capture";
import { cn } from "@/lib/cn";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

const PLATFORM_CONFIG = {
  linkedin: {
    icon: LinkedinIcon,
    iconBg: "bg-[#0a66c2]/10 text-[#0a66c2] ring-1 ring-[#0a66c2]/20",
    hoverBorder: "hover:border-[#0a66c2]/40 hover:shadow-lg hover:shadow-[#0a66c2]/5",
    badgeBg: "bg-[#0a66c2]/10 text-[#0a66c2]",
    handle: "@mediqueue",
  },
  instagram: {
    icon: InstagramIcon,
    iconBg: "bg-gradient-to-tr from-[#f09433]/15 via-[#e6683c]/15 to-[#bc1888]/15 text-[#c13584] ring-1 ring-[#c13584]/20",
    hoverBorder: "hover:border-[#c13584]/40 hover:shadow-lg hover:shadow-[#c13584]/5",
    badgeBg: "bg-[#c13584]/10 text-[#c13584]",
    handle: "@mediqueue",
  },
} as const;

export function AboutSocial() {
  const { t } = useLocale();
  const s = t.team;
  const { openLead } = useLeadCapture();
  const reduced = useReducedMotion();

  return (
    <section className="bg-slate-50/60 py-16 md:py-20">
      <Container>
        {/* Social Links Cards */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="border-b border-slate-200/80 pb-20"
        >
          <div className="mx-auto max-w-2xl text-center mb-12">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary-light px-3.5 py-1.5 text-xs font-bold text-primary mb-3">
              <span>{s.socialEyebrow}</span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {s.socialTitle}
            </h2>
            <p className="mt-3 text-base text-slate-600">
              {s.socialIntro}
            </p>
          </div>

          <div className="mx-auto max-w-4xl grid gap-6 sm:grid-cols-2">
            {s.socialLinks.map((link) => {
              const cfg = PLATFORM_CONFIG[link.platform as keyof typeof PLATFORM_CONFIG] || PLATFORM_CONFIG.linkedin;
              const Icon = cfg.icon;

              return (
                <a
                  key={link.platform}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1",
                    cfg.hoverBorder
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105", cfg.iconBg)}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors group-hover:bg-primary group-hover:text-white">
                        <ArrowUpRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>

                    <div className="mt-6 flex items-center gap-2.5">
                      <h3 className="font-display text-xl font-bold text-slate-900">
                        {link.label}
                      </h3>
                      <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-semibold", cfg.badgeBg)}>
                        {cfg.handle}
                      </span>
                    </div>

                    <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                      {link.hint}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-1.5 border-t border-slate-100 pt-4 text-xs font-bold text-primary">
                    <span>{s.visitPage}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Final CTA Banner */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16"
        >
          <div className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-[2.25rem] bg-ink px-6 py-10 text-center sm:px-12 sm:py-12 shadow-2xl">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(58,106,214,0.35),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(16,185,129,0.2),_transparent_46%)]"
                aria-hidden
              />

              <div className="relative z-10 mx-auto max-w-2xl text-center">
                <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.65rem] leading-tight">
                  {s.finalCtaTitle}
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                  {s.finalCtaBody}
                </p>

                <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button onClick={() => openLead("patient")} size="lg">
                    {s.exploreAsPatient}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Button>
                  <Button
                    onClick={() => openLead("clinic", "clinic")}
                    size="lg"
                    className="border-0 bg-white text-ink hover:bg-white/90"
                  >
                    {s.addClinicCta}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
