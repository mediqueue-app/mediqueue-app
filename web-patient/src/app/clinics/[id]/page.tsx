import { Suspense } from "react";
import { clinics } from "@/lib/mock-data";
import { ClinicDetailView } from "@/components/clinics/ClinicDetailView";

export const metadata = {
  title: "Klinik Detayı | MediQueue",
};

export function generateStaticParams() {
  return clinics.map((c) => ({ id: c.id }));
}

export default async function ClinicDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<DetailFallback />}>
      <ClinicDetailView id={id} />
    </Suspense>
  );
}

function DetailFallback() {
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
