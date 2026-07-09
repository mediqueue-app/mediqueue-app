import { Suspense } from "react";
import { ClinicsExplorer } from "@/components/clinics/ClinicsExplorer";

export const metadata = {
  title: "Klinikler | MediQueue",
};

export default function ClinicsPage() {
  return (
    <Suspense fallback={<ExplorerFallback />}>
      <ClinicsExplorer />
    </Suspense>
  );
}

function ExplorerFallback() {
  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <div className="h-3/4 w-11/12 animate-pulse rounded-2xl border border-slate-200 bg-slate-50" />
    </div>
  );
}
