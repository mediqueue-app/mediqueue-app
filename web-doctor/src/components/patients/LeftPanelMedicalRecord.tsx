"use client";

import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import type { MedicalRecord, MedicalServiceType } from "@/types";
import { Odontogram } from "@/components/patients/Odontogram";
import { cn } from "@/lib/utils";

export function LeftPanelMedicalRecord({
  medicalRecord,
}: {
  medicalRecord: MedicalRecord;
}) {
  const [serviceType, setServiceType] = useState<MedicalServiceType>(
    medicalRecord.serviceType
  );
  const [selectedTooth, setSelectedTooth] = useState<number | null>(() => {
    const withHistory = medicalRecord.teeth.find(
      (t) => t.treatmentHistory.length > 0
    );
    return withHistory?.toothNumber ?? null;
  });

  const treatedCount = useMemo(
    () =>
      medicalRecord.teeth.filter(
        (t) => t.status === "treated" || t.status === "pending_treatment"
      ).length,
    [medicalRecord.teeth]
  );

  return (
    <div className="flex h-full flex-col">
      <button
        type="button"
        className="mb-4 flex items-center gap-1 text-sm font-semibold text-slate-800"
      >
        Tıbbi Kayıt
        <ChevronRight className="h-4 w-4 text-slate-400" />
      </button>

      <div className="mb-5 inline-flex w-fit rounded-full bg-slate-100 p-1">
        {(
          [
            { value: "medical" as const, label: "Medikal" },
            { value: "cosmetic" as const, label: "Kozmetik" },
          ] as const
        ).map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setServiceType(opt.value)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
              serviceType === opt.value
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        <Odontogram
          teeth={medicalRecord.teeth}
          selectedTooth={selectedTooth}
          onSelectTooth={setSelectedTooth}
        />
      </div>

      {selectedTooth && (
        <p className="mt-3 text-center text-xs text-slate-400">
          Seçili: {selectedTooth} numaralı diş
          {treatedCount > 0 && ` · ${treatedCount} dişte kayıt var`}
        </p>
      )}
    </div>
  );
}

export function LeftPanelPlaceholder({ title }: { title: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold text-slate-700">{title}</p>
      <p className="mt-2 max-w-xs text-xs text-slate-400">
        Bu branş için özel görünüm yakında eklenecek.
      </p>
    </div>
  );
}
