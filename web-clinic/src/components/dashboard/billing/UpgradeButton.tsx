"use client";

import { ArrowRight } from "lucide-react";
import { useDemoToast } from "@/components/ui/DemoToast";

export function UpgradeButton() {
  const { show, Toast } = useDemoToast();

  return (
    <>
      <button
        type="button"
        onClick={() => show("Ödeme entegrasyonu Ay 2'de eklenecek.")}
        className="mt-2 flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-hover"
      >
        Premium&apos;a Yükselt — ₺6.990/ay
        <ArrowRight className="h-4.5 w-4.5" />
      </button>
      {Toast}
    </>
  );
}
