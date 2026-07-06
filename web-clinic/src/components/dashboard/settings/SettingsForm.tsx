"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Lock, Video, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Language } from "@/types";

const ALL_LANGUAGES: Language[] = ["TR", "EN", "AR", "RU", "DE", "FR", "ES"];

export function SettingsForm() {
  const [clinicName, setClinicName] = useState("Anadolu Estetik Kliniği");
  const [city, setCity] = useState("İstanbul, Türkiye");
  const [description, setDescription] = useState(
    "Estetik cerrahi, saç ekimi ve diş tedavisi alanlarında uluslararası hastalara hizmet veren çok disiplinli sağlık kuruluşu."
  );
  const [languages, setLanguages] = useState<Language[]>(["TR", "EN", "AR", "RU"]);
  const [saved, setSaved] = useState(false);

  function toggleLanguage(lang: Language) {
    setLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">
          Klinik Vitrin Bilgileri
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Bu bilgiler MediQueue platformunda uluslararası hastalara
          gösterilir.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-slate-500">
              Klinik Adı
            </label>
            <input
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">
              Konum
            </label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-slate-500">
              Klinik Açıklaması
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">
          Desteklenen Diller
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Hasta iletişiminde desteklenen dilleri seçin.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {ALL_LANGUAGES.map((lang) => {
            const active = languages.includes(lang);
            return (
              <button
                key={lang}
                onClick={() => toggleLanguage(lang)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset transition-colors",
                  active
                    ? "bg-primary text-white ring-primary"
                    : "bg-white text-slate-500 ring-slate-200 hover:bg-slate-50"
                )}
              >
                {active && <Check className="h-3 w-3" />}
                {lang}
              </button>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">
          Klinik Tanıtım Videosu & VIP Banner Yükle
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Profilinizde öne çıkan bir video tanıtım banner&apos;ı ve sınırsız
          galeri görseli yayınlayın.
        </p>

        <div
          aria-hidden
          className="mt-5 grid select-none grid-cols-1 gap-4 opacity-60 blur-[2px] sm:grid-cols-2"
        >
          <div className="flex h-32 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-400">
            <Video className="h-6 w-6" />
            <span className="text-xs font-medium">Tanıtım videosu yükle</span>
          </div>
          <div className="flex h-32 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-400">
            <ImageIcon className="h-6 w-6" />
            <span className="text-xs font-medium">
              Sınırsız galeri görseli
            </span>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-5 text-center shadow-lg">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
              <Lock className="h-4.5 w-4.5" />
            </div>
            <p className="text-sm font-medium text-slate-800">
              Bu özellik Premium Plan gerektirir
            </p>
            <Link
              href="/dashboard/billing"
              className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              Premium&apos;a Yükselt
            </Link>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
            <Check className="h-4 w-4" />
            Değişiklikler kaydedildi
          </span>
        )}
        <button
          onClick={handleSave}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          Değişiklikleri Kaydet
        </button>
      </div>
    </div>
  );
}
