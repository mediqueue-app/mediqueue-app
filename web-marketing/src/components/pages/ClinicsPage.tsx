"use client";

import { ClinicsHero } from "@/components/clinics/ClinicsHero";
import { ClinicsCompareTable } from "@/components/clinics/ClinicsCompareTable";
import { ClinicsFeatureShowcase } from "@/components/clinics/ClinicsFeatureShowcase";
import { ClinicJourneyRoadmap } from "@/components/clinics/ClinicJourneyRoadmap";
import { ClinicsTrustStrip } from "@/components/clinics/ClinicsTrustStrip";
import { ClinicsFinalCta } from "@/components/clinics/ClinicsFinalCta";

export function ClinicsPage() {
  return (
    <div className="overflow-x-hidden bg-white">
      <ClinicsHero />
      <ClinicsCompareTable />
      <ClinicsFeatureShowcase />
      <ClinicJourneyRoadmap />
      <ClinicsTrustStrip />
      <ClinicsFinalCta />
    </div>
  );
}
