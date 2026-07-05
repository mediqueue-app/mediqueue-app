"use client";

import { useState } from "react";
import { ShieldCheck, PlaneTakeoff, Check } from "lucide-react";
import { Toggle } from "@/components/ui/Toggle";
import { cn } from "@/lib/utils";
import type { Language } from "@/types";

const ALL_LANGUAGES: Language[] = ["TR", "EN", "AR", "RU", "DE", "FR", "ES"];

export function SettingsForm() {
  const [clinicName, setClinicName] = useState("Anadolu Estetik Kliniği");
  const [city, setCity] = useState("İstanbul, Türkiye");
  const [description, setDescription] = useState(
    "Estetik cerrahi, saç ekimi ve diş tedavisi alanlarında uluslararası hastalara hizmet veren çok disiplinli sağlık kuruluşu."
  );
  const [jciAccredited, setJciAccredited] = useState(true);
  const [airportDistance, setAirportDistance] = useState(28);
  const [languages, setLanguages] = useState<Language[]>(["TR", "EN", "AR", "RU"]);
  const [currency, setCurrency] = useState<"USD" | "EUR">("USD");
  const [startingPrice, setStartingPrice] = useState(2500);
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
          Akreditasyon ve Lojistik
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Uluslararası hasta karar sürecinde öne çıkan güven ve erişim
          bilgileri.
        </p>

        <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800">
                JCI Akreditasyon Rozeti
              </p>
              <p className="text-xs text-slate-500">
                Aktif edildiğinde klinik profilinizde JCI rozeti görüntülenir.
              </p>
            </div>
          </div>
          <Toggle
            checked={jciAccredited}
            onChange={setJciAccredited}
            label="JCI Akreditasyon Rozeti"
          />
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light text-primary">
              <PlaneTakeoff className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800">
                Havalimanına Uzaklık
              </p>
              <p className="text-xs text-slate-500">
                Hasta lojistik planlaması için kullanılır.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              value={airportDistance}
              onChange={(e) => setAirportDistance(Number(e.target.value))}
              className="w-20 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-right text-sm text-slate-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
            <span className="text-sm text-slate-500">km</span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium text-slate-800">
            Sunulan Diller
          </p>
          <p className="text-xs text-slate-500">
            Hasta iletişiminde desteklenen dilleri seçin.
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
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
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Paket Fiyatlandırması</h2>
        <p className="mt-1 text-xs text-slate-500">
          Platformda gösterilecek başlangıç paket fiyatı. Nihai fiyat, hasta
          bazlı ön değerlendirme sonrası klinik tarafından teyit edilir.
        </p>

        <div className="mt-5 flex flex-wrap items-end gap-4">
          <div>
            <label className="text-xs font-medium text-slate-500">
              Para Birimi
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as "USD" | "EUR")}
              className="mt-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">
              Başlangıç Fiyatı
            </label>
            <input
              type="number"
              min={0}
              value={startingPrice}
              onChange={(e) => setStartingPrice(Number(e.target.value))}
              className="mt-1.5 w-36 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <p className="pb-2 text-sm text-slate-400">
            Vitrinde: {currency === "USD" ? "$" : "€"}
            {startingPrice.toLocaleString("tr-TR")} itibaren
          </p>
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
