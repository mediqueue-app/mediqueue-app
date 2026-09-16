"use client";

import { Hero } from "@/components/home/Hero";
import { TreatmentGrid } from "@/components/home/TreatmentGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ClinicCard } from "@/components/clinics/ClinicCard";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clinics, doctors } from "@/lib/mock-data";
import { useT } from "@/lib/i18n";

export default function HomePage() {
  const t = useT();
  const seedClinic = clinics.find((c) => c.apiId === 1) ?? clinics[0];
  const featuredClinics = [
    seedClinic,
    ...clinics.filter((c) => c.id !== seedClinic.id),
  ].slice(0, 3);
  const featuredDoctors = doctors.slice(0, 4);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("home.treatmentsEyebrow")}
          title={t("home.treatmentsTitle")}
          description={t("home.treatmentsDesc")}
          linkHref="/treatments"
          linkLabel={t("home.seeAll")}
        />
        <TreatmentGrid />
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t("home.clinicsEyebrow")}
            title={t("home.clinicsTitle")}
            description={t("home.clinicsDesc")}
            linkHref="/clinics"
            linkLabel={t("home.allClinics")}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredClinics.map((clinic) => (
              <ClinicCard
                key={clinic.id}
                clinic={clinic}
                featured={clinic.id === seedClinic.id}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("home.doctorsEyebrow")}
          title={t("home.doctorsTitle")}
          description={t("home.doctorsDesc")}
          linkHref="/doctors"
          linkLabel={t("home.allDoctors")}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t("home.howEyebrow")}
            title={t("home.howTitle")}
          />
          <HowItWorks />
        </div>
      </section>
    </>
  );
}
