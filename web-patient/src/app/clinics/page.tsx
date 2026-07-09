import { Suspense } from "react";
import { ClinicsExplorer } from "@/components/clinics/ClinicsExplorer";

export const metadata = {
  title: "Klinikler | MediQueue",
};

export default function ClinicsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Klinikler
        </h1>
        <p className="mt-2 text-slate-500">
          Akredite klinikleri şehir, uzmanlık ve fiyata göre karşılaştırın.
        </p>
      </header>
      <Suspense fallback={<ExplorerFallback />}>
        <ClinicsExplorer />
      </Suspense>
    </div>
  );
}

function ExplorerFallback() {
  return (
    <div className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-slate-50" />
  );
}
