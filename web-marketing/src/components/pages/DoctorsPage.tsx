"use client";

import { DoctorsHero } from "@/components/doctors/DoctorsHero";
import { DoctorsCompareTable } from "@/components/doctors/DoctorsCompareTable";
import { DoctorsFeatureShowcase } from "@/components/doctors/DoctorsFeatureShowcase";
import { DoctorJourneyRoadmap } from "@/components/doctors/DoctorJourneyRoadmap";
import { DoctorsTrustStrip } from "@/components/doctors/DoctorsTrustStrip";
import { DoctorsFinalCta } from "@/components/doctors/DoctorsFinalCta";

export function DoctorsPage() {
  return (
    <div className="bg-white">
      <DoctorsHero />
      <DoctorsCompareTable />
      <DoctorsFeatureShowcase />
      <DoctorJourneyRoadmap />
      <DoctorsTrustStrip />
      <DoctorsFinalCta />
    </div>
  );
}
