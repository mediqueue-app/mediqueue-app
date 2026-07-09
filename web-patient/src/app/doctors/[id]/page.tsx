import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  ChevronRight,
  GraduationCap,
  Languages,
  Stethoscope,
  BadgeCheck,
  Building2,
} from "lucide-react";
import {
  doctors,
  getDoctor,
  getClinicForDoctor,
} from "@/lib/mock-data";
import { Avatar } from "@/components/ui/Avatar";
import { StarRating } from "@/components/ui/StarRating";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { BookingWidget } from "@/components/booking/BookingWidget";

export function generateStaticParams() {
  return doctors.map((d) => ({ id: d.id }));
}

export default async function DoctorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doctor = getDoctor(id);
  if (!doctor) notFound();

  const clinic = getClinicForDoctor(doctor.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-slate-400">
        <Link href="/" className="hover:text-[#3a6ad6]">
          Ana Sayfa
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/doctors" className="hover:text-[#3a6ad6]">
          Doktorlar
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-slate-600">{doctor.name}</span>
      </nav>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="min-w-0 flex-1 space-y-8">
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <Avatar
                src={doctor.photo}
                name={doctor.name}
                className="h-24 w-24 shrink-0 rounded-2xl ring-2 ring-[#eaf0fc]"
              />
              <div className="min-w-0">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#eaf0fc] px-2.5 py-1 text-xs font-semibold text-[#3a6ad6]">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Doğrulanmış Hekim
                </span>
                <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                  {doctor.name}
                </h1>
                <p className="text-slate-500">{doctor.title}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <StarRating
                    rating={doctor.rating}
                    reviewCount={doctor.reviewCount}
                    size="md"
                  />
                  <span className="flex items-center gap-1 text-sm text-slate-500">
                    <MapPin className="h-4 w-4" />
                    {doctor.city}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 divide-x divide-slate-100 rounded-xl border border-slate-100 bg-slate-50/60 text-center">
              <div className="px-2 py-3">
                <p className="text-lg font-bold text-slate-900">
                  {doctor.experienceYears}+
                </p>
                <p className="text-xs text-slate-500">Yıl Deneyim</p>
              </div>
              <div className="px-2 py-3">
                <p className="text-lg font-bold text-slate-900">
                  {doctor.reviewCount}
                </p>
                <p className="text-xs text-slate-500">Yorum</p>
              </div>
              <div className="px-2 py-3">
                <p className="text-lg font-bold text-slate-900">
                  {doctor.rating.toFixed(1)}
                </p>
                <p className="text-xs text-slate-500">Puan</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Stethoscope className="h-5 w-5 text-[#3a6ad6]" />
              Hakkında
            </h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              {doctor.about}
            </p>
            <div className="mt-4">
              <p className="text-sm font-semibold text-slate-900">
                İlgi Alanları
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {doctor.focusAreas.map((f) => (
                  <span
                    key={f}
                    className="rounded-full bg-[#eaf0fc] px-3 py-1 text-sm font-medium text-[#3a6ad6]"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <div className="grid gap-6 sm:grid-cols-2">
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <GraduationCap className="h-5 w-5 text-[#3a6ad6]" />
                Eğitim & Deneyim
              </h2>
              <ul className="mt-3 space-y-3">
                {doctor.education.map((e) => (
                  <li key={e} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#3a6ad6]" />
                    <span className="text-sm text-slate-600">{e}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <Languages className="h-5 w-5 text-[#3a6ad6]" />
                Konuşulan Diller
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {doctor.languages.map((l) => (
                  <span
                    key={l}
                    className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-700"
                  >
                    {l}
                  </span>
                ))}
              </div>
              {clinic && (
                <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <Building2 className="h-4 w-4 text-[#3a6ad6]" />
                    Çalıştığı Klinik
                  </p>
                  <Link
                    href={`/clinics/${clinic.id}`}
                    className="mt-1 block text-sm text-[#3a6ad6] hover:underline"
                  >
                    {clinic.name} — {clinic.district}, {clinic.city}
                  </Link>
                </div>
              )}
            </section>
          </div>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">Hasta Yorumları</h2>
            <div className="mt-4 space-y-4">
              {doctor.reviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:w-[360px] lg:shrink-0">
          <div className="lg:sticky lg:top-24">
            <BookingWidget
              title={`${doctor.name}`}
              subtitle={doctor.title}
              price={doctor.priceFrom}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
