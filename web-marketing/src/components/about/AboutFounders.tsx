"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";
import type { SiteContent } from "@/content/types";

type Founder = SiteContent["team"]["members"][number];

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FounderPortraitCard({
  member,
  index,
  reduced,
}: {
  member: Founder;
  index: number;
  reduced: boolean | null;
}) {
  return (
    <motion.li
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group/card min-w-[15.5rem] flex-1 snap-start sm:min-w-[17rem] lg:min-w-0"
    >
      <article
        className={cn(
          "relative aspect-[3/4] overflow-hidden rounded-[1.75rem]",
          "border border-white/10",
          "transition-transform duration-500 group-hover/card:scale-[1.015]"
        )}
      >
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 1024px) 70vw, 20vw"
          className="object-cover object-top transition-transform duration-700 group-hover/card:scale-105"
        />

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/10"
          aria-hidden
        />

        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "absolute right-4 top-4 inline-flex items-center gap-2 rounded-full",
            "border border-white/10 bg-black/45 px-3 py-1.5 backdrop-blur-md",
            "font-medium text-white/90 opacity-0 transition-all duration-300",
            "group-hover/card:opacity-100 hover:border-white/25 hover:bg-black/65",
            "focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
          )}
          aria-label={`LinkedIn — ${member.name}`}
        >
          <LinkedinIcon className="h-3.5 w-3.5" />
          LinkedIn
          <ExternalLink className="h-3 w-3 opacity-70" strokeWidth={2} />
        </a>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: member.accent }}
          >
            {member.roleTitle}
          </p>
          <h3 className="mt-2 text-xl font-semibold leading-tight tracking-tight text-white sm:text-[1.35rem]">
            {member.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-white/55">
            {member.bio}
          </p>
          <div
            className="mt-4 h-px w-10 bg-white/20 transition-all duration-300 group-hover/card:w-16"
            aria-hidden
          />
        </div>
      </article>
    </motion.li>
  );
}

export function AboutFounders() {
  const { t } = useLocale();
  const copy = t.team;
  const reduced = useReducedMotion();

  return (
    <section className="bg-ink py-20 md:py-28">
      <Container>
        <motion.header
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-14"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-light">
            {copy.foundersEyebrow}
          </p>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-white sm:text-4xl">
            {copy.foundersTitle}
          </h2>
        </motion.header>

        <ul
          className={cn(
            "flex gap-4 overflow-x-auto pb-2",
            "snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0"
          )}
        >
          {copy.members.map((member, i) => (
            <FounderPortraitCard
              key={member.name}
              member={member}
              index={i}
              reduced={reduced}
            />
          ))}
        </ul>
      </Container>
    </section>
  );
}
