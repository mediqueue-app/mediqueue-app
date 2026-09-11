"use client";

import { AboutHero } from "@/components/about/AboutHero";
import { AboutLetter } from "@/components/about/AboutLetter";
import { AboutFounders } from "@/components/about/AboutFounders";
import { AboutSocial } from "@/components/about/AboutSocial";

export function TeamPage() {
  return (
    <div className="overflow-x-hidden bg-white">
      <AboutHero />
      <AboutLetter />
      <AboutFounders />
      <AboutSocial />
    </div>
  );
}
