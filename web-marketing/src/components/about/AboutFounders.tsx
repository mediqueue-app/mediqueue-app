"use client";

import { useState } from "react";
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

function FounderCard({
  member,
  index,
  reduced,
}: {
  member: Founder;
  index: number;
  reduced: boolean | null;
}) {
  const [imgError, setImgError] = useState(false);

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col"
    >
      {/* Portrait Photo Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
        {!imgError ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 1024px) 50vw, 25vw"
            onError={() => setImgError(true)}
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-200 p-6 text-center text-slate-700">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary mb-2">
              {initials}
            </span>
            <span className="text-xs font-semibold">{member.name}</span>
          </div>
        )}

        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-primary"
          aria-label={`LinkedIn — ${member.name}`}
        >
          <LinkedinIcon className="h-3 w-3" />
          <span>LinkedIn</span>
          <ExternalLink className="h-2.5 w-2.5 opacity-70" />
        </a>
      </div>

      {/* Info Below Image */}
      <div className="mt-4 flex flex-col">
        <span
          className="text-[11px] font-bold uppercase tracking-wider text-primary"
          style={{ color: member.accent }}
        >
          {member.roleTitle}
        </span>
        <h3 className="mt-1 text-lg font-bold text-slate-900">
          {member.name}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
          {member.bio}
        </p>
      </div>
    </motion.div>
  );
}

export function AboutFounders() {
  const { t } = useLocale();
  const copy = t.team;
  const reduced = useReducedMotion();

  return (
    <section className="bg-white py-20 md:py-28 border-b border-slate-200/80">
      <Container>
        <motion.header
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 lg:mb-18 max-w-2xl text-center mx-auto"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            {copy.foundersEyebrow}
          </span>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {copy.foundersTitle}
          </h2>
        </motion.header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 max-w-5xl mx-auto">
          {copy.members.map((member, i) => (
            <FounderCard
              key={member.name}
              member={member}
              index={i}
              reduced={reduced}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
