"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { DoctorCard } from "@/components/dashboard/doctors/DoctorCard";
import { DoctorDetailDrawer } from "@/components/dashboard/doctors/DoctorDetailDrawer";
import { useDemoToast } from "@/components/ui/DemoToast";
import type { Doctor, PatientLead } from "@/types";

export function DoctorsGrid({
  doctors: initialDoctors,
  leads,
}: {
  doctors: Doctor[];
  leads: PatientLead[];
}) {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { show, Toast } = useDemoToast();

  const selected = useMemo(
    () => doctors.find((d) => d.id === selectedId) ?? null,
    [doctors, selectedId]
  );

  return (
    <>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => show("Doktor ekleme formu Ay 2'de eklenecek.")}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
        >
          <Plus className="h-4 w-4" />
          Yeni Doktor Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onOpen={() => setSelectedId(doctor.id)}
            onStatusChange={(status) =>
              setDoctors((prev) =>
                prev.map((d) => (d.id === doctor.id ? { ...d, status } : d))
              )
            }
            onHoursChange={(hours) =>
              setDoctors((prev) =>
                prev.map((d) =>
                  d.id === doctor.id ? { ...d, workingHours: hours } : d
                )
              )
            }
            onActiveChange={(isActive) =>
              setDoctors((prev) =>
                prev.map((d) =>
                  d.id === doctor.id ? { ...d, isActive } : d
                )
              )
            }
          />
        ))}
      </div>

      <DoctorDetailDrawer
        doctor={selected}
        leads={leads}
        onClose={() => setSelectedId(null)}
      />
      {Toast}
    </>
  );
}
