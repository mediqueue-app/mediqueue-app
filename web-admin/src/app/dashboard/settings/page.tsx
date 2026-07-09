"use client";

import { useEffect, useState } from "react";
import { Check, Percent, Settings2, Sparkles, Store } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { fetchSettingsClinics } from "@/lib/services/settings";
import type { Clinic } from "@/types";
import { cn } from "@/lib/utils";

const CATEGORY_RATES = [
  { key: "hair", label: "Saç Ekimi", rate: 12 },
  { key: "dental", label: "Diş Tedavisi", rate: 10 },
  { key: "aesthetic", label: "Estetik Cerrahi", rate: 15 },
  { key: "eye", label: "Göz (LASIK)", rate: 8 },
  { key: "ivf", label: "Tüp Bebek (IVF)", rate: 14 },
];

const PLATFORM_TOGGLES = [
  {
    key: "applications",
    label: "Yeni klinik başvurularına açık",
    desc: "Kapatıldığında “Klinik Ol” formu ziyaretçilere gösterilmez.",
    on: true,
  },
  {
    key: "autoVerify",
    label: "Evrak otomatik ön doğrulama",
    desc: "Yüklenen belgeler yapay zeka ile ön kontrolden geçirilir.",
    on: true,
  },
  {
    key: "maintenance",
    label: "Bakım modu",
    desc: "Hasta uygulaması geçici olarak bakım ekranı gösterir.",
    on: false,
  },
] as const;

export default function SettingsPage() {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [defaultRate, setDefaultRate] = useState(12);
  const [rates, setRates] = useState(CATEGORY_RATES);
  const [featured, setFeatured] = useState<Record<string, boolean>>({});
  const [toggles, setToggles] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(PLATFORM_TOGGLES.map((t) => [t.key, t.on]))
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchSettingsClinics()
      .then((data) => {
        if (!cancelled) {
          setClinics(data);
          setFeatured(Object.fromEntries(data.map((c) => [c.id, c.featured])));
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
        Yükleniyor…
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Sistem Ayarları"
        description="Platform komisyon oranları, vitrin yönetimi ve genel pazar yeri yapılandırması."
        action={
          <button
            type="button"
            onClick={save}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors",
              saved
                ? "bg-emerald-600 shadow-emerald-600/25"
                : "bg-primary shadow-primary/25 hover:bg-primary-hover"
            )}
          >
            <Check className="h-4 w-4" />
            {saved ? "Kaydedildi" : "Değişiklikleri Kaydet"}
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-light text-primary">
              <Percent className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Komisyon Oranları
              </h2>
              <p className="text-xs text-slate-500">
                Kategori bazlı platform komisyonu
              </p>
            </div>
          </div>

          <div className="mb-5 rounded-xl bg-slate-50 p-4">
            <label className="text-sm font-medium text-slate-700">
              Varsayılan oran
            </label>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={30}
                value={defaultRate}
                onChange={(e) => setDefaultRate(Number(e.target.value))}
                className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-slate-200 accent-primary"
              />
              <span className="w-14 rounded-lg bg-primary px-2 py-1 text-center text-sm font-bold text-white">
                %{defaultRate}
              </span>
            </div>
          </div>

          <ul className="space-y-2.5">
            {rates.map((cat, idx) => (
              <li
                key={cat.key}
                className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 px-4 py-2.5"
              >
                <span className="text-sm font-medium text-slate-700">
                  {cat.label}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-slate-400">%</span>
                  <input
                    type="number"
                    min={0}
                    max={30}
                    value={cat.rate}
                    onChange={(e) =>
                      setRates((prev) =>
                        prev.map((r, i) =>
                          i === idx ? { ...r, rate: Number(e.target.value) } : r
                        )
                      )
                    }
                    className="w-16 rounded-lg border border-slate-200 px-2 py-1 text-center text-sm font-semibold text-slate-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-light text-primary">
              <Store className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Vitrin Yönetimi
              </h2>
              <p className="text-xs text-slate-500">
                Ana sayfada öne çıkan klinikler
              </p>
            </div>
          </div>

          <ul className="space-y-2.5">
            {clinics.map((clinic) => {
              const isFeatured = featured[clinic.id];
              return (
                <li
                  key={clinic.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 px-4 py-2.5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500">
                    {clinic.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">
                      {clinic.name}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {clinic.city}
                    </p>
                  </div>
                  {isFeatured && (
                    <Sparkles className="h-4 w-4 text-amber-400" />
                  )}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isFeatured}
                    onClick={() =>
                      setFeatured((prev) => ({
                        ...prev,
                        [clinic.id]: !prev[clinic.id],
                      }))
                    }
                    className={cn(
                      "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                      isFeatured ? "bg-primary" : "bg-slate-300"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                        isFeatured ? "translate-x-[22px]" : "translate-x-0.5"
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-light text-primary">
            <Settings2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Platform Ayarları
            </h2>
            <p className="text-xs text-slate-500">Genel pazar yeri davranışı</p>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {PLATFORM_TOGGLES.map((toggle) => {
            const on = toggles[toggle.key];
            return (
              <li
                key={toggle.key}
                className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-800">
                    {toggle.label}
                  </p>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={on}
                    onClick={() =>
                      setToggles((prev) => ({
                        ...prev,
                        [toggle.key]: !prev[toggle.key],
                      }))
                    }
                    className={cn(
                      "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                      on ? "bg-primary" : "bg-slate-300"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                        on ? "translate-x-[22px]" : "translate-x-0.5"
                      )}
                    />
                  </button>
                </div>
                <p className="text-xs leading-relaxed text-slate-500">
                  {toggle.desc}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
