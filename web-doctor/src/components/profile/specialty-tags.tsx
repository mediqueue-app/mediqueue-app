"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export function SpecialtyTags({
  specialties,
  onChange,
}: {
  specialties: string[];
  onChange: (specialties: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  function addSpecialty() {
    const value = draft.trim();
    if (!value || specialties.includes(value)) {
      setDraft("");
      return;
    }
    onChange([...specialties, value]);
    setDraft("");
  }

  function removeSpecialty(value: string) {
    onChange(specialties.filter((s) => s !== value));
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        {specialties.map((s) => (
          <span
            key={s}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
          >
            {s}
            <button
              type="button"
              onClick={() => removeSpecialty(s)}
              className="rounded-full p-0.5 hover:bg-primary/20"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSpecialty();
            }
          }}
          placeholder="Yeni uzmanlık alanı ekleyin (örn. Meme Estetiği)"
          className="flex-1 rounded-xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="button"
          onClick={addSpecialty}
          className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
        >
          <Plus className="h-4 w-4" />
          Ekle
        </button>
      </div>
    </div>
  );
}
