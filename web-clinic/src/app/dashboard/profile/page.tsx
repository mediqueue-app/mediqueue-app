"use client";

import { useState } from "react";
import {
  BadgeCheck,
  Clock3,
  Eye,
  ImagePlus,
  MapPin,
  Plus,
  ShieldCheck,
  Trash2,
  Upload,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge, type BadgeTone } from "@/components/ui/StatusBadge";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import {
  clinicProfile,
  type Amenity,
  type VerificationStatus,
} from "@/lib/clinic-mock";
import { cn } from "@/lib/utils";

const VERIFICATION_META: Record<
  VerificationStatus,
  { label: string; tone: BadgeTone }
> = {
  approved: { label: "Onaylandı", tone: "success" },
  pending: { label: "Admin onayında", tone: "warning" },
  missing: { label: "Yüklenmedi", tone: "neutral" },
};

export default function ProfilePage() {
  const [amenities, setAmenities] = useState<Amenity[]>(clinicProfile.amenities);

  function toggleAmenity(id: string) {
    setAmenities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Klinik Profili & Belgeler"
        description="JCI ve diğer akreditasyon belgelerinizi yönetin; kliniğinizin platformdaki görünümünü düzenleyin."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          >
            <Eye className="h-4 w-4" />
            Vitrini Önizle
          </button>
        }
      />

      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-xl font-bold text-primary">
            {clinicProfile.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold text-slate-900">
              {clinicProfile.name}
            </h2>
            <p className="text-sm text-slate-500">{clinicProfile.tagline}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
              <MapPin className="h-3.5 w-3.5" />
              {clinicProfile.city}, {clinicProfile.country}
            </p>
          </div>
          <StatusBadge
            label={`Profil %${clinicProfile.completion}`}
            tone="primary"
            dot={false}
          />
        </div>
        <div className="mt-5">
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Klinik Tanıtım Metni
          </label>
          <textarea
            defaultValue={clinicProfile.about}
            rows={3}
            className="w-full resize-none rounded-xl border border-slate-200 px-3.5 py-3 text-sm text-slate-700 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Fotoğraf Galerisi
            </h2>
            <p className="text-sm text-slate-500">
              Hastalarınıza kliniğinizin ortamını gösterin.
            </p>
          </div>
          <span className="text-xs font-medium text-slate-400">
            {clinicProfile.gallery.length} fotoğraf
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {clinicProfile.gallery.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl"
            >
              <div
                className={cn("h-full w-full bg-gradient-to-br", photo.tone)}
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-3">
                <span className="text-xs font-semibold text-white">
                  {photo.title}
                </span>
              </div>
              <button
                type="button"
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 text-slate-600 opacity-0 shadow-sm transition-opacity hover:text-red-600 group-hover:opacity-100"
                aria-label="Fotoğrafı sil"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}

          <button
            type="button"
            className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400 transition-colors hover:border-primary/40 hover:bg-primary-light/40 hover:text-primary"
          >
            <ImagePlus className="h-6 w-6" />
            <span className="text-xs font-medium">Fotoğraf Ekle</span>
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-slate-900">
            Akreditasyon & Belgeler
          </h2>
        </div>
        <p className="mt-1 text-sm text-slate-500">
          Yüklenen belgeler MediQueue ekibi tarafından doğrulanır.
        </p>

        <ul className="mt-5 flex flex-col gap-3">
          {clinicProfile.accreditations.map((doc) => {
            const meta = VERIFICATION_META[doc.status];
            return (
              <li
                key={doc.id}
                className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                      doc.status === "approved"
                        ? "bg-emerald-50 text-emerald-600"
                        : doc.status === "pending"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-slate-100 text-slate-400"
                    )}
                  >
                    {doc.status === "approved" ? (
                      <BadgeCheck className="h-5 w-5" />
                    ) : doc.status === "pending" ? (
                      <Clock3 className="h-5 w-5" />
                    ) : (
                      <Upload className="h-5 w-5" />
                    )}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {doc.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {doc.authority}
                      {doc.updatedAt && doc.status !== "missing" && (
                        <span className="text-slate-400">
                          {" "}
                          · {doc.updatedAt}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:justify-end">
                  <StatusBadge label={meta.label} tone={meta.tone} />
                  {doc.status === "missing" ? (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-white shadow-sm shadow-primary/25 transition-colors hover:bg-primary-hover"
                    >
                      <Upload className="h-3.5 w-3.5" />
                      Yükle
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                    >
                      Güncelle
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Sunulan Olanaklar
            </h2>
            <p className="text-sm text-slate-500">
              Hastalara sunduğunuz hizmetleri vitrininizde vurgulayın.
            </p>
          </div>
          <button
            type="button"
            className="hidden items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-hover sm:inline-flex"
          >
            <Plus className="h-3.5 w-3.5" />
            Olanak Ekle
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          {amenities.map((a) => (
            <div
              key={a.id}
              className={cn(
                "flex items-center justify-between gap-4 rounded-xl border p-4 transition-colors",
                a.enabled
                  ? "border-primary/30 bg-primary-light/40"
                  : "border-slate-100 bg-white"
              )}
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">
                  {a.label}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {a.description}
                </p>
              </div>
              <ToggleSwitch
                checked={a.enabled}
                onChange={() => toggleAmenity(a.id)}
                label={a.label}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
