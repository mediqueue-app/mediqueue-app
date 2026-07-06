"use client";

import { useState } from "react";
import type { Patient } from "@/types";
import { PatientTimeline } from "@/components/patients/PatientTimeline";
import { Shield } from "lucide-react";

export function NextTreatmentTab({ patient }: { patient: Patient }) {
  const [notes, setNotes] = useState(patient.medicalNotes);
  const [newNote, setNewNote] = useState("");

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
    <div className="space-y-8">
      <section>
        <h3 className="mb-4 text-sm font-semibold text-slate-900">
          Tedavi Yolculuğu
        </h3>
        <PatientTimeline steps={patient.timeline} />
      </section>

      <section>
        <h3 className="text-sm font-semibold text-slate-900">Klinik Notları</h3>
        <div className="mt-3 mb-4 flex items-start gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-800">
          <Shield className="mt-0.5 h-4 w-4 shrink-0" />
          Tıbbi notlar hasta sağlık verisi kapsamındadır ve gizlilikle saklanır.
        </div>
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          rows={3}
          placeholder="Yeni klinik notu..."
          aria-label="Yeni klinik notu"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
        />
        <button
          type="button"
          onClick={addNote}
          className="mt-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          Notu Kaydet
        </button>
        <ul className="mt-4 space-y-3">
          {notes.map((note) => (
            <li
              key={note.id}
              className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700"
            >
              <p>{note.content}</p>
              <p className="mt-2 text-xs text-slate-400">
                {note.authorName} ·{" "}
                {new Date(note.createdAt).toLocaleString("tr-TR")}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
