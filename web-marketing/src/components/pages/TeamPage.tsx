"use client";

import { AboutHero } from "@/components/about/AboutHero";
import { AboutStatsStrip } from "@/components/about/AboutStatsStrip";
import { AboutLetter } from "@/components/about/AboutLetter";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutAchievements } from "@/components/about/AboutAchievements";
import { AboutFounders } from "@/components/about/AboutFounders";
import { AboutSocial } from "@/components/about/AboutSocial";

export function TeamPage() {
  return (
    <div className="overflow-x-hidden bg-white">
      <AboutHero />
      <AboutStatsStrip />
      <AboutLetter />
      <AboutValues />
      <AboutAchievements />
      <AboutFounders />
      <AboutSocial />
    </div>
  );
}
