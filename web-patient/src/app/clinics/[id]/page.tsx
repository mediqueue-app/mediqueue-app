import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  BadgeCheck,
  ChevronRight,
  Phone,
  Stethoscope,
} from "lucide-react";
import { clinics, getClinic, getDoctorsForClinic } from "@/lib/mock-data";
import { ClinicGallery } from "@/components/clinics/ClinicGallery";
import { ClinicTabs } from "@/components/clinics/ClinicTabs";
import { AmenityList } from "@/components/clinics/AmenityList";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { StarRating } from "@/components/ui/StarRating";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { formatPriceRange } from "@/lib/utils";

export function generateStaticParams() {
  return clinics.map((c) => ({ id: c.id }));
}

export default async function ClinicDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const clinic = getClinic(id);
  if (!clinic) notFound();

  const clinicDoctors = getDoctorsForClinic(clinic.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-slate-400">
        <Link href="/" className="hover:text-[#3a6ad6]">
          Ana Sayfa
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/clinics" className="hover:text-[#3a6ad6]">
          Klinikler
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-slate-600">{clinic.name}</span>
      </nav>

      <ClinicGallery images={clinic.gallery} name={clinic.name} />

      <div className="mt-6 flex flex-col gap-8 lg:flex-row">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#eaf0fc] px-2.5 py-1 text-xs font-semibold text-[#3a6ad6]">
                <BadgeCheck className="h-3.5 w-3.5" />
                Akredite Klinik
              </span>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                {clinic.name}
              </h1>
              <p className="mt-1 flex items-center gap-1 text-slate-500">
                <MapPin className="h-4 w-4" />
                {clinic.address}
              </p>
            </div>
            <StarRating
              rating={clinic.rating}
              reviewCount={clinic.reviewCount}
              size="md"
            />
          </div>

          <ClinicTabs />

          <section id="hakkinda" className="scroll-mt-32 pt-8">
            <h2 className="text-xl font-bold text-slate-900">Klinik Hakkında</h2>
            <p className="mt-3 leading-relaxed text-slate-600">{clinic.about}</p>

            <h3 className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Stethoscope className="h-4 w-4 text-[#3a6ad6]" />
              Sunulan Hizmetler
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {clinic.specialties.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center rounded-full bg-[#eaf0fc] px-3.5 py-1.5 text-sm font-semibold text-[#3a6ad6] ring-1 ring-[#3a6ad6]/15"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          <section id="olanaklar" className="scroll-mt-32 pt-10">
            <h2 className="text-xl font-bold text-slate-900">Klinik Olanakları</h2>
            <div className="mt-4">
              <AmenityList amenities={clinic.amenities} />
            </div>
          </section>

          <section id="doktorlar" className="scroll-mt-32 pt-10">
            <h2 className="text-xl font-bold text-slate-900">
              Klinik Doktorları
            </h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {clinicDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </section>

          <section id="yorumlar" className="scroll-mt-32 pt-10 pb-4">
            <h2 className="text-xl font-bold text-slate-900">
              Hasta Yorumları
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {clinic.reviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:w-[360px] lg:shrink-0">
          <div className="lg:sticky lg:top-24 space-y-4">
            <BookingWidget
              title={`${clinic.name} — Randevu`}
              subtitle={`${clinic.district}, ${clinic.city}`}
              price={clinic.priceFrom}
              priceLabel="Fiyat aralığı"
            />
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-slate-900">
                Fiyat aralığı
              </p>
              <p className="mt-1 text-lg font-bold text-[#3a6ad6]">
                {formatPriceRange(clinic.priceFrom, clinic.priceTo)}
              </p>
              <a
                href="tel:+908500000000"
                className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-[#3a6ad6] px-4 py-2.5 text-sm font-semibold text-[#3a6ad6] transition-colors hover:bg-[#eaf0fc]"
              >
                <Phone className="h-4 w-4" />
                Kliniği Ara
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
