"use client";

import { useState } from "react";
import { Calendar, Shield, Sparkles } from "lucide-react";
import type { MedicalNote, Patient } from "@/types";
import { PatientTimeline } from "@/components/patients/PatientTimeline";
import { getTimelineProgress } from "@/lib/patient-utils";
import { formatDateTime } from "@/lib/datetime";

const DEMO_NOTES: MedicalNote[] = [
  {
    id: "DEMO-N1",
    content:
      "Hasta ile ön değerlendirme tamamlandı. Tedavi protokolü ve tahmini süre paylaşıldı.",
    createdAt: "2026-07-08T10:30:00",
    authorName: "Op. Dr. Elif Yılmaz",
  },
  {
    id: "DEMO-N2",
    content:
      "Laboratuvar / görüntüleme sonuçları incelendi. Bir sonraki seansta prosedür planı netleştirilecek.",
    createdAt: "2026-07-12T16:05:00",
    authorName: "Op. Dr. Elif Yılmaz",
  },
];

export function NextTreatmentTab({ patient }: { patient: Patient }) {
  const seeded =
    patient.medicalNotes.length > 0 ? patient.medicalNotes : DEMO_NOTES;
  const [notes, setNotes] = useState(seeded);
  const [newNote, setNewNote] = useState("");
  const progress = getTimelineProgress(patient);
  const nextStep =
    patient.timeline.find((s) => s.status === "AKTIF") ??
    patient.timeline.find((s) => s.status === "BEKLIYOR");

  function addNote() {
    if (!newNote.trim()) return;
    setNotes((prev) => [
      {
        id: `N-${Date.now()}`,
        content: newNote.trim(),
        createdAt: new Date().toISOString(),
        authorName: "Op. Dr. Elif Yılmaz",
      },
      ...prev,
    ]);
    setNewNote("");
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-primary-light/50 to-white p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              Sıradaki adım
            </p>
            <h3 className="mt-1 text-base font-bold text-slate-900">
              {nextStep?.label ?? "Tedavi planı"}
            </h3>
            <p className="mt-1 max-w-md text-xs leading-relaxed text-slate-500">
              {nextStep?.description ??
                `${patient.treatmentType} için bir sonraki klinik adım planlanıyor.`}
            </p>
          </div>
          <div className="rounded-xl bg-white px-3 py-2 text-center shadow-sm ring-1 ring-slate-100">
            <p className="text-lg font-bold text-slate-900">%{progress.percent}</p>
            <p className="text-[10px] font-medium text-slate-400">ilerleme</p>
          </div>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/80">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${progress.percent}%` }}
          />
        </div>
      </div>

      <section>
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-bold text-slate-900">Tedavi yolculuğu</h3>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
          <PatientTimeline steps={patient.timeline} />
        </div>
      </section>

      <section>
        <h3 className="text-sm font-bold text-slate-900">Klinik notları</h3>
        <div className="mt-3 mb-3 flex items-start gap-2 rounded-xl bg-sky-50 px-3 py-2.5 text-xs text-sky-800">
          <Shield className="mt-0.5 h-4 w-4 shrink-0" />
          Tıbbi notlar hasta sağlık verisi kapsamındadır ve gizlilikle saklanır.
        </div>

        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          rows={3}
          placeholder="Yeni klinik notu yazın…"
          aria-label="Yeni klinik notu"
          className="w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
        />
        <button
          type="button"
          onClick={addNote}
          className="mt-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/25 hover:bg-primary-hover"
        >
          Notu kaydet
        </button>

        <ul className="mt-4 space-y-2.5">
          {notes.map((note) => (
            <li
              key={note.id}
              className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm"
            >
              <p className="text-sm leading-relaxed text-slate-700">
                {note.content}
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
                <Calendar className="h-3 w-3" />
                {note.authorName} · {formatDateTime(note.createdAt)}
              </p>
            </li>
          ))}
        </ul>

        {patient.medicalNotes.length === 0 && (
          <p className="mt-3 text-center text-[11px] text-slate-400">
            Demo notlar gösteriliyor — kaydettiğiniz notlar bu oturumda tutulur.
          </p>
        )}
      </section>
    </div>
  );
}
