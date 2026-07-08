"use client";

import { useEffect } from "react";
import { Users, X } from "lucide-react";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { leadStatusLabel, leadStatusTone } from "@/lib/status";
import type { Doctor, PatientLead } from "@/types";
import { cn } from "@/lib/utils";

export function DoctorDetailDrawer({
  doctor,
  leads,
  onClose,
}: {
  doctor: Doctor | null;
  leads: PatientLead[];
  onClose: () => void;
}) {
  const assignedPatients = doctor
    ? leads.filter((l) => doctor.assignedPatientIds.includes(l.id))
    : [];

  useEffect(() => {
    if (!doctor) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [doctor, onClose]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-slate-900/30 backdrop-blur-[2px]",
          doctor ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed right-0 top-0 z-40 flex h-screen w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300",
          doctor ? "translate-x-0" : "translate-x-full"
        )}
      >
        {doctor && (
          <>
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-6">
              <div>
                <p className="text-xl font-semibold text-slate-900">
                  {doctor.title} {doctor.fullName}
                </p>
                <p className="mt-1 text-sm text-slate-500">{doctor.specialty}</p>
                <div className="mt-3">
                  <StarRating value={doctor.rating} size="md" showValue />
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"
                aria-label="Kapat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Performans Özeti
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-2xl font-bold text-slate-900">
                      {doctor.patientsToday}
                    </p>
                    <p className="text-xs text-slate-500">Bugünkü hasta</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-2xl font-bold text-slate-900">
                      {doctor.reviewCount}
                    </p>
                    <p className="text-xs text-slate-500">Toplam yorum</p>
                  </div>
                </div>
              </section>

              <section className="mt-6">
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <Users className="h-4 w-4" />
                  Bağlı Hastalar ({assignedPatients.length})
                </h3>
                <div className="mt-3 space-y-2">
                  {assignedPatients.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-400">
                      Bu doktora atanmış aktif hasta yok.
                    </p>
                  ) : (
                    assignedPatients.map((patient) => (
                      <div
                        key={patient.id}
                        className="rounded-xl border border-slate-100 px-4 py-3"
                      >
                        <p className="font-medium text-slate-800">
                          {patient.fullName}
                        </p>
                        <p className="text-xs text-slate-500">{patient.branch}</p>
                        <div className="mt-2">
                          <Badge tone={leadStatusTone(patient.status)}>
                            {leadStatusLabel(patient.status)}
                          </Badge>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
