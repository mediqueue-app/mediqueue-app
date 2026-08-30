"use client";

import { ClinicsHero } from "@/components/clinics/ClinicsHero";
import { ClinicsCompareTable } from "@/components/clinics/ClinicsCompareTable";
import { ClinicJourneyRoadmap } from "@/components/clinics/ClinicJourneyRoadmap";
import { ClinicPatientAnalytics } from "@/components/clinics/ClinicPatientAnalytics";
import { ClinicsFinalCta } from "@/components/clinics/ClinicsFinalCta";

export function ClinicsPage() {
  return (
    <div className="overflow-x-hidden bg-white">
      <ClinicsHero />
      <ClinicsCompareTable />
      <ClinicJourneyRoadmap />
      <ClinicPatientAnalytics />
      <ClinicsFinalCta />
    </div>
  );
}
