"use client";

import { useState } from "react";
import {
  Award,
  Check,
  Globe,
  Mail,
  Save,
  Upload,
  User,
} from "lucide-react";
import type { Language } from "@/types";
import { ProfileHero } from "@/components/profile/ProfileHero";
import { ProfilePreviewCard } from "@/components/profile/ProfilePreviewCard";
import {
  getCurrentDoctorSync,
  updateCurrentDoctor,
} from "@/lib/services/doctor";
import { toUserError } from "@/lib/api/client";
import { cn } from "@/lib/utils";
import { AccountDeletionRequest } from "@/components/account/AccountDeletionRequest";
import { FilePermissionTrigger } from "@/components/ui/permission-gate";
import { useT } from "@/lib/i18n";

const ALL_LANGUAGES: Language[] = ["TR", "EN", "AR", "RU", "DE", "FR"];

const LANGUAGE_LABELS: Record<Language, string> = {
  TR: "Türkçe",
  EN: "English",
  AR: "العربية",
  RU: "Русский",
  DE: "Deutsch",
  FR: "Français",
};

export default function ProfilePage() {
  const t = useT();
  const currentDoctor = getCurrentDoctorSync();
  const [fullName, setFullName] = useState(currentDoctor.fullName);
  const [title, setTitle] = useState(currentDoctor.title);
  const [specialty, setSpecialty] = useState(currentDoctor.specialty);
  const [bio, setBio] = useState(currentDoctor.bio);
  const [languages, setLanguages] = useState<Language[]>(currentDoctor.languages);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleLanguage(lang: Language) {
    setLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      await updateCurrentDoctor({
        full_name: fullName,
        specialty,
        bio,
        languages,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(toUserError(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <ProfileHero doctor={currentDoctor} />

      <div className="animate-fade-in-up stagger-1 grid grid-cols-1 gap-5 xl:grid-cols-3 xl:gap-6">
        <div className="space-y-5 xl:col-span-2">
          <section className="rounded-[1.5rem] border border-white/80 bg-white/95 p-5 shadow-sm backdrop-blur-sm lg:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-hover text-white">
                <User className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                  Kimlik
                </p>
                <h2 className="font-display text-xl tracking-tight text-slate-900">
                  Kişisel Bilgiler
                </h2>
                <p className="text-xs text-slate-500">Ad, unvan ve uzmanlık alanı</p>
              </div>
            </div>

            <div className="mb-5 flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-hover text-lg font-bold text-white shadow-md shadow-primary/25">
                {currentDoctor.avatarInitials}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">Profil fotoğrafı</p>
                <FilePermissionTrigger
                  accept="image/*"
                  capture="environment"
                  description={t("permission.cameraId")}
                  className="mt-1 text-sm font-semibold text-primary hover:underline"
                >
                  Fotoğraf değiştir
                </FilePermissionTrigger>
                <p className="mt-0.5 text-[11px] text-slate-400">JPG, PNG · maks. 5 MB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Unvan" value={title} onChange={setTitle} />
              <Field label="Ad Soyad" value={fullName} onChange={setFullName} />
            </div>

            <div className="mt-4">
              <Field label="Uzmanlık Alanı" value={specialty} onChange={setSpecialty} />
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-500">
              <Mail className="h-4 w-4 shrink-0 text-slate-400" />
              {currentDoctor.email}
              <span className="ml-auto text-[10px] font-medium text-slate-400">
                Değiştirilemez
              </span>
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-white/80 bg-white/95 p-5 shadow-sm backdrop-blur-sm lg:p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 text-white">
                <Globe className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                  Eşleştirme + çeviri
                </p>
                <h2 className="font-display text-xl tracking-tight text-slate-900">
                  Konuşulan Diller
                </h2>
                <p className="text-xs text-slate-500">
                  Hasta eşleştirmesinde ve çeviri kanalında kullanılır
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {ALL_LANGUAGES.map((lang) => {
                const active = languages.includes(lang);
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleLanguage(lang)}
                    className={cn(
                      "flex flex-col items-start rounded-2xl border px-3.5 py-3 text-left transition-all",
                      active
                        ? "border-primary bg-primary-light/50 shadow-sm ring-1 ring-primary/20"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    )}
                  >
                    <span
                      className={cn(
                        "text-xs font-bold",
                        active ? "text-primary" : "text-slate-500"
                      )}
                    >
                      {lang}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {LANGUAGE_LABELS[lang]}
                    </span>
                    {active && (
                      <span className="mt-1.5 text-[10px] font-semibold text-primary">
                        Seçili
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-white/80 bg-white/95 p-5 shadow-sm backdrop-blur-sm lg:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                  Tanıtım
                </p>
                <h2 className="font-display text-xl tracking-tight text-slate-900">
                  Biyografi
                </h2>
                <p className="text-xs text-slate-500">Hastalara gösterilen tanıtım metni</p>
              </div>
              <span className="text-[11px] text-slate-400">{bio.length} karakter</span>
            </div>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={5}
              placeholder="Deneyiminiz, uzmanlık alanlarınız ve yaklaşımınız..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/40 px-3.5 py-3 text-sm leading-relaxed focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </section>

          <section className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white/70 p-5 backdrop-blur-sm lg:p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400 to-violet-600 text-white">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                  Belgeler
                </p>
                <h2 className="font-display text-xl tracking-tight text-slate-900">
                  Sertifika / Diploma
                </h2>
                <p className="text-xs text-slate-500">
                  Klinik doğrulama sürecinde kullanılır
                </p>
              </div>
            </div>

            <FilePermissionTrigger
              accept="image/*,.pdf,application/pdf"
              description={t("permission.cameraId")}
              ariaLabel="Sertifika yükle"
              className="flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-10 transition-colors hover:border-primary/30 hover:bg-primary-light/10"
            >
              <Upload className="h-8 w-8 text-slate-400" />
              <span className="mt-2 text-sm font-semibold text-slate-600">
                Dosya seç veya sürükleyin
              </span>
              <span className="mt-1 text-xs text-slate-400">PDF, JPG · maks. 10 MB</span>
            </FilePermissionTrigger>
          </section>

          <div className="flex flex-col items-end gap-2 xl:hidden">
            {error ? (
              <span className="mq-feedback text-sm font-medium text-red-600" role="alert">
                {error}
              </span>
            ) : null}
            {saved && <SavedBadge />}
            <SaveButton onClick={handleSave} saving={saving} />
          </div>
        </div>

        <div className="space-y-5 xl:sticky xl:top-6 xl:self-start">
          <ProfilePreviewCard
            title={title}
            fullName={fullName}
            specialty={specialty}
            bio={bio}
            languages={languages}
            avatarInitials={currentDoctor.avatarInitials}
            rating={currentDoctor.rating}
            reviewCount={currentDoctor.reviewCount}
          />

          <div className="hidden rounded-[1.5rem] border border-white/80 bg-white/95 p-4 shadow-sm backdrop-blur-sm xl:block">
            {error ? (
              <p className="mq-feedback mb-3 text-sm font-medium text-red-600" role="alert">
                {error}
              </p>
            ) : null}
            {saved && (
              <div className="mb-3">
                <SavedBadge />
              </div>
            )}
            <SaveButton onClick={handleSave} fullWidth saving={saving} />
          </div>

          <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50/80 p-4 backdrop-blur-sm">
            <p className="text-xs leading-relaxed text-slate-500">
              Profil bilgileriniz yalnızca eşleştirildiğiniz hastalar ve klinik
              yönetimi tarafından görüntülenir. KVKK kapsamında korunmaktadır.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-red-100 bg-red-50/50 p-4 backdrop-blur-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              {t("confirm.accountTitle")}
            </h2>
            <AccountDeletionRequest />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
      />
    </div>
  );
}

function SavedBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
      <Check className="h-4 w-4" />
      Kaydedildi
    </span>
  );
}

function SaveButton({
  onClick,
  fullWidth,
  saving,
}: {
  onClick: () => void;
  fullWidth?: boolean;
  saving?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={saving}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary-hover py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/25 transition hover:brightness-110 disabled:opacity-60",
        fullWidth ? "w-full" : "px-6"
      )}
    >
      <Save className="h-4 w-4" />
      {saving ? "Kaydediliyor…" : "Değişiklikleri Kaydet"}
    </button>
  );
}
