"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  BadgeCheck,
  ChevronRight,
  Phone,
  Stethoscope,
} from "lucide-react";
import {
  getClinic as getMockClinic,
  getDoctorsForClinic as getMockDoctorsForClinic,
  type Clinic,
  type Doctor,
} from "@/lib/mock-data";
import {
  fetchClinic,
  fetchClinicDoctors,
} from "@/lib/services/clinics";
import { ClinicGallery } from "@/components/clinics/ClinicGallery";
import { ClinicTabs } from "@/components/clinics/ClinicTabs";
import { AmenityList } from "@/components/clinics/AmenityList";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { StarRating } from "@/components/ui/StarRating";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { formatPriceRange } from "@/lib/utils";

function resolveClinicApiId(clinic: Clinic, routeId: string): number | null {
  if (clinic.apiId != null) return clinic.apiId;
  if (/^\d+$/.test(routeId)) return Number(routeId);
  if (/^\d+$/.test(clinic.id)) return Number(clinic.id);
  return null;
}

export function ClinicDetailView({ id }: { id: string }) {
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [clinicDoctors, setClinicDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setMissing(false);

      const numericId = /^\d+$/.test(id) ? Number(id) : null;

      if (numericId !== null) {
        const [fetchedClinic, fetchedDoctors] = await Promise.all([
          fetchClinic(numericId),
          fetchClinicDoctors(numericId),
        ]);

        if (!cancelled) {
          if (fetchedClinic) {
            setClinic(fetchedClinic);
            setClinicDoctors(fetchedDoctors);
          } else {
            setMissing(true);
          }
          setLoading(false);
        }
        return;
      }

      const mockClinic = getMockClinic(id);
      if (!cancelled) {
        if (mockClinic) {
          setClinic(mockClinic);
          setClinicDoctors(getMockDoctorsForClinic(mockClinic.id));
        } else {
          setMissing(true);
        }
        setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (!loading && missing) {
    notFound();
  }

  if (loading || !clinic) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4 h-4 w-64 animate-pulse rounded bg-slate-100" />
        <div className="aspect-[21/9] animate-pulse rounded-2xl bg-slate-100" />
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            <div className="h-8 w-2/3 animate-pulse rounded bg-slate-100" />
            <div className="h-24 animate-pulse rounded-2xl bg-slate-50" />
          </div>
          <div className="h-96 animate-pulse rounded-2xl bg-slate-50" />
        </div>
      </div>
    );
  }

  const clinicApiId = resolveClinicApiId(clinic, id);
  const defaultDoctorId = clinicDoctors[0]?.apiId;

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
              clinicId={clinicApiId ?? 0}
              doctorId={defaultDoctorId}
              branch={clinic.specialties[0] ?? "Genel Muayene"}
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
