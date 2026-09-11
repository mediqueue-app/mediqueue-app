"use client";

import { PatientsHero } from "@/components/patients/PatientsHero";
import { WhyMediQueue } from "@/components/patients/WhyMediQueue";
import { PatientJourneyFlow } from "@/components/patients/PatientJourneyFlow";
import { TrustCredentials } from "@/components/patients/TrustCredentials";
import { PatientsFinalCta } from "@/components/patients/PatientsFinalCta";

export function PatientsPage() {
  return (
    <div className="overflow-x-hidden bg-white">
      <PatientsHero />
      <WhyMediQueue />
      <PatientJourneyFlow />
      <TrustCredentials />
      <PatientsFinalCta />
    </div>
  );
}
