"use client";

import { HomeHero } from "@/components/home/HomeHero";
import { MatchMoment } from "@/components/home/MatchMoment";
import { HomeDoors } from "@/components/home/HomeDoors";
import { HomeTrustStrip } from "@/components/home/HomeTrustStrip";
import { HomeFinalCta } from "@/components/home/HomeFinalCta";
import { FaqSection } from "@/components/sections/FaqSection";

export function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <HomeHero />
      <MatchMoment />
      <HomeDoors />
      <HomeTrustStrip />
      <FaqSection className="border-t border-border" />
      <HomeFinalCta />
    </div>
  );
}
