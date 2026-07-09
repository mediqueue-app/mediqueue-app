import { Suspense } from "react";
import { DoctorsExplorer } from "@/components/doctors/DoctorsExplorer";

export const metadata = {
  title: "Doktorlar | MediQueue",
};

export default function DoctorsPage() {
  return (
    <Suspense fallback={<ExplorerFallback />}>
      <DoctorsExplorer />
    </Suspense>
  );
}

function ExplorerFallback() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-slate-50" />
    </div>
  );
}
