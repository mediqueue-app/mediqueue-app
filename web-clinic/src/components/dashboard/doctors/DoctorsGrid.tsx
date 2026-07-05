"use client";

import { useState } from "react";
import { DoctorCard } from "@/components/dashboard/doctors/DoctorCard";
import type { Doctor, DoctorStatus, WorkingHours } from "@/types";

export function DoctorsGrid({ doctors: initialDoctors }: { doctors: Doctor[] }) {
  const [doctors, setDoctors] = useState(initialDoctors);

  function updateDoctor(id: string, patch: Partial<Doctor>) {
    setDoctors((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, ...patch } : doc))
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
          onStatusChange={(status: DoctorStatus) =>
            updateDoctor(doctor.id, { status })
          }
          onHoursChange={(workingHours: WorkingHours) =>
            updateDoctor(doctor.id, { workingHours })
          }
        />
      ))}
    </div>
  );
}
