"use client";

import { useEffect, useState } from "react";
import {
  Camera,
  Clock,
  Languages,
  Plus,
  Star,
  Stethoscope,
  Tag,
  X,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Doctor } from "@/lib/clinic-mock";
import { addDoctorLocally, fetchDoctors } from "@/lib/services/doctors";
import { cn } from "@/lib/utils";

const TONES = [
  "from-sky-400 to-blue-500",
  "from-teal-400 to-emerald-500",
  "from-indigo-400 to-violet-500",
  "from-rose-400 to-pink-500",
  "from-amber-400 to-orange-500",
];

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchDoctors()
      .then((data) => {
        if (!cancelled) {
          setDoctors(data);
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

  const [form, setForm] = useState({
    name: "",
    specialty: "",
    experienceYears: "",
    startingPrice: "",
    languages: "",
  });

  function resetForm() {
    setForm({
      name: "",
      specialty: "",
      experienceYears: "",
      startingPrice: "",
      languages: "",
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const initials = form.name
      .split(" ")
      .filter(Boolean)
      .slice(-2)
      .map((p) => p[0]?.toUpperCase())
      .join("");
    const newDoctor: Doctor = {
      id: `d${Date.now()}`,
      name: form.name.trim() || "Yeni Hekim",
      initials: initials || "DR",
      specialty: form.specialty.trim() || "Uzmanlık belirtilmedi",
      experienceYears: Number(form.experienceYears) || 0,
      startingPrice: Number(form.startingPrice) || 0,
      currency: "€",
      rating: 0,
      reviewCount: 0,
      languages: form.languages
        ? form.languages.split(",").map((l) => l.trim()).filter(Boolean)
        : ["Türkçe"],
      status: "pending",
      tone: TONES[doctors.length % TONES.length],
    };
    void addDoctorLocally(newDoctor).then(setDoctors);
    resetForm();
    setModalOpen(false);
  }

  const activeCount = doctors.filter((d) => d.status === "active").length;

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
        title="Doktor Kadrosu"
        description="Platformda listelenen hekimlerinizi yönetin. Yeni eklenen hekimler admin onayından sonra vitrinde yayınlanır."
        action={
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/25 transition-colors hover:bg-primary-hover"
          >
            <Plus className="h-4 w-4" />
            Yeni Doktor Ekle
          </button>
        }
      />

      <div className="flex flex-wrap gap-3 text-sm">
        <div className="inline-flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-2 shadow-sm">
          <span className="font-bold text-slate-900">{doctors.length}</span>
          <span className="text-slate-500">toplam hekim</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-2 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-bold text-slate-900">{activeCount}</span>
          <span className="text-slate-500">yayında</span>
        </div>
      </div>

      {/* Yatay liste */}
      <div className="flex flex-col gap-3">
        {doctors.map((doc) => (
          <div
            key={doc.id}
            className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-slate-200 hover:shadow-md sm:flex-row sm:items-center"
          >
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div
                className={cn(
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-base font-bold text-white shadow-sm",
                  doc.tone
                )}
              >
                {doc.initials}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-sm font-bold text-slate-900">
                    {doc.name}
                  </h3>
                  {doc.status === "active" ? (
                    <StatusBadge label="Yayında" tone="success" />
                  ) : (
                    <StatusBadge label="Onay bekliyor" tone="warning" />
                  )}
                </div>
                <p className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-slate-500">
                  <Stethoscope className="h-3.5 w-3.5" />
                  {doc.specialty}
                </p>
                <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-slate-400">
                  <Languages className="h-3.5 w-3.5" />
                  {doc.languages.join(", ")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:flex sm:items-center sm:gap-6">
              <Metric
                icon={<Clock className="h-4 w-4" />}
                value={`${doc.experienceYears} yıl`}
                label="Deneyim"
              />
              <Metric
                icon={<Tag className="h-4 w-4" />}
                value={`${doc.currency}${doc.startingPrice}`}
                label="Başlangıç"
              />
              <Metric
                icon={<Star className="h-4 w-4 fill-amber-400 text-amber-400" />}
                value={doc.rating > 0 ? doc.rating.toFixed(1) : "—"}
                label={doc.reviewCount > 0 ? `${doc.reviewCount} yorum` : "Yeni"}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Yeni doktor modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Yeni Doktor Ekle
                </h2>
                <p className="text-xs text-slate-500">
                  Bilgiler admin onayından sonra vitrinde yayınlanır.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                aria-label="Kapat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
              {/* Fotoğraf yükleme */}
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400">
                  <Camera className="h-6 w-6" />
                </div>
                <button
                  type="button"
                  className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                >
                  Hekim Fotoğrafı Yükle
                </button>
              </div>

              <Field label="Ad Soyad">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Dr. Ayşe Yıldız"
                  className={inputClass}
                />
              </Field>

              <Field label="Uzmanlık Alanı">
                <input
                  value={form.specialty}
                  onChange={(e) =>
                    setForm({ ...form, specialty: e.target.value })
                  }
                  placeholder="Plastik & Rekonstrüktif Cerrahi"
                  className={inputClass}
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Deneyim (yıl)">
                  <input
                    type="number"
                    min={0}
                    value={form.experienceYears}
                    onChange={(e) =>
                      setForm({ ...form, experienceYears: e.target.value })
                    }
                    placeholder="10"
                    className={inputClass}
                  />
                </Field>
                <Field label="Başlangıç Fiyatı (€)">
                  <input
                    type="number"
                    min={0}
                    value={form.startingPrice}
                    onChange={(e) =>
                      setForm({ ...form, startingPrice: e.target.value })
                    }
                    placeholder="1500"
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Diller (virgülle ayırın)">
                <input
                  value={form.languages}
                  onChange={(e) =>
                    setForm({ ...form, languages: e.target.value })
                  }
                  placeholder="Türkçe, İngilizce, Arapça"
                  className={inputClass}
                />
              </Field>

              <div className="mt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/25 transition-colors hover:bg-primary-hover"
                >
                  <Plus className="h-4 w-4" />
                  Kadroya Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>
      {children}
    </label>
  );
}

function Metric({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
        <span className="text-slate-400">{icon}</span>
        {value}
      </span>
      <span className="text-[11px] text-slate-400">{label}</span>
    </div>
  );
}
