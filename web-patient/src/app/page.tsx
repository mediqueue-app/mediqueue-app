import { Hero } from "@/components/home/Hero";
import { TreatmentGrid } from "@/components/home/TreatmentGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ClinicCard } from "@/components/clinics/ClinicCard";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clinics, doctors } from "@/lib/mock-data";

export default function HomePage() {
  // Seed/demo klinik (backend ID'si 1) her zaman öne çıksın ve ilk sırada olsun.
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
          eyebrow="Tedaviler"
          title="Aradığınız tedaviyi seçin"
          description="Diş hekimliğinden estetik cerrahiye, en çok tercih edilen tedavi kategorileri."
          linkHref="/treatments"
          linkLabel="Tümünü gör"
        />
        <TreatmentGrid />
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Öne çıkan klinikler"
            title="Popüler klinikler"
            description="Akredite, yüksek puanlı ve şeffaf fiyatlı klinikler."
            linkHref="/clinics"
            linkLabel="Tüm klinikler"
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
          eyebrow="Uzman hekimler"
          title="Alanında uzman doktorlar"
          description="Deneyim, puan ve müsaitlik durumuna göre öne çıkan hekimler."
          linkHref="/doctors"
          linkLabel="Tüm doktorlar"
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
            eyebrow="Nasıl çalışır?"
            title="3 basit adımda randevunuz hazır"
          />
          <HowItWorks />
        </div>
      </section>
    </>
  );
}
