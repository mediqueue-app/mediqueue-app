import { Suspense } from "react";
import { DoctorsExplorer } from "@/components/doctors/DoctorsExplorer";

export const metadata = {
  title: "Doktorlar | MediQueue",
};

export default function DoctorsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Doktorlar
        </h1>
        <p className="mt-2 text-slate-500">
          Alanında uzman hekimleri deneyim, puan ve müsaitliğe göre keşfedin.
        </p>
      </header>
      <Suspense fallback={<ExplorerFallback />}>
        <DoctorsExplorer />
      </Suspense>
    </div>
  );
}

function ExplorerFallback() {
  return (
    <div className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-slate-50" />
  );
}
