"use client";

import { Check } from "lucide-react";
import type { LanguageCode } from "@/types";
import { languageNames } from "@/lib/ui";

const allLanguages = Object.keys(languageNames) as LanguageCode[];

export function LanguageSelector({
  languages,
  onChange,
}: {
  languages: LanguageCode[];
  onChange: (languages: LanguageCode[]) => void;
}) {
  function toggle(lang: LanguageCode) {
    if (languages.includes(lang)) {
      onChange(languages.filter((l) => l !== lang));
    } else {
      onChange([...languages, lang]);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {allLanguages.map((lang) => {
        const isActive = languages.includes(lang);
        return (
          <button
            key={lang}
            type="button"
            onClick={() => toggle(lang)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              isActive
                ? "border-primary bg-primary/10 text-primary"
                : "border-slate-200/80 bg-white text-slate-500 hover:border-slate-300"
            }`}
          >
            {isActive && <Check className="h-3 w-3" />}
            {lang} · {languageNames[lang]}
          </button>
        );
      })}
    </div>
  );
}
