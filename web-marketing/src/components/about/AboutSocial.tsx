"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/lib/locale";
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

const PLATFORM = {
  linkedin: {
    icon: LinkedinIcon,
    hoverText: "group-hover:text-[#0a66c2]",
    underline: "group-hover:bg-[#0a66c2]",
  },
  instagram: {
    icon: InstagramIcon,
    hoverText: "group-hover:text-[#c13584]",
    underline:
      "group-hover:bg-gradient-to-r group-hover:from-[#f09433] group-hover:via-[#dc2743] group-hover:to-[#bc1888]",
  },
} as const;

export function AboutSocial() {
  const { t } = useLocale();
  const s = t.team;
  const reduced = useReducedMotion();

  return (
    <section className="border-t border-border bg-white py-16 md:py-20">
      <Container>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            {s.socialTitle}
          </p>

          <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-0">
            {s.socialLinks.map((link, i) => {
              const cfg = PLATFORM[link.platform];
              const Icon = cfg.icon;

              return (
                <div key={link.platform} className="flex items-center sm:flex-1">
                  {i > 0 && (
                    <div
                      className="mx-8 hidden h-10 w-px bg-border sm:block"
                      aria-hidden
                    />
                  )}

                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group flex min-w-0 flex-1 items-center gap-4 text-slate-500 transition-colors duration-300",
                      cfg.hoverText,
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0 transition-colors duration-300" />
                    <span className="min-w-0">
                      <span className="font-inter block text-sm font-semibold text-inherit">
                        {link.label}
                      </span>
                      <span className="font-inter mt-0.5 block text-xs text-slate-400 transition-colors duration-300 group-hover:text-inherit/70">
                        {link.hint}
                      </span>
                      <span
                        className={cn(
                          "mt-2 block h-px w-0 max-w-full bg-transparent transition-all duration-300 group-hover:w-full",
                          cfg.underline
                        )}
                        aria-hidden
                      />
                    </span>
                  </a>
                </div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
