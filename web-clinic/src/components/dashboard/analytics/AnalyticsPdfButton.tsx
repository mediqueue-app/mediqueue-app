"use client";

import { Download } from "lucide-react";
import { useDemoToast } from "@/components/ui/DemoToast";
import { ProBadge } from "@/components/ui/ProBadge";

export function AnalyticsPdfButton() {
  const { show, Toast } = useDemoToast();

  return (
    <>
      <button
        type="button"
        onClick={() => show("PDF rapor indirme Ay 2'de eklenecek.")}
        className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
      >
        <Download className="h-4 w-4" />
        İndirilebilir PDF Raporu Al
        <ProBadge className="bg-white/20 from-transparent to-transparent ring-1 ring-white/30" />
      </button>
      {Toast}
    </>
  );
}
