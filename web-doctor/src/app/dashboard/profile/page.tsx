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
import { currentDoctor } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

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
  const [fullName, setFullName] = useState(currentDoctor.fullName);
  const [title, setTitle] = useState(currentDoctor.title);
  const [specialty, setSpecialty] = useState(currentDoctor.specialty);
  const [bio, setBio] = useState(currentDoctor.bio);
  const [languages, setLanguages] = useState<Language[]>(currentDoctor.languages);
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
    <div className="flex flex-col gap-5 lg:gap-6">
      <ProfileHero doctor={currentDoctor} />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3 xl:gap-6">
        {/* Form */}
        <div className="space-y-5 xl:col-span-2">
          {/* Kişisel bilgiler */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-light text-primary">
                <User className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Kişisel Bilgiler</h2>
                <p className="text-xs text-slate-500">Ad, unvan ve uzmanlık alanı</p>
              </div>
            </div>

            <div className="mb-5 flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-lg font-bold text-primary">
                {currentDoctor.avatarInitials}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">Profil fotoğrafı</p>
                <button
                  type="button"
                  className="mt-1 text-sm font-semibold text-primary hover:underline"
                >
                  Fotoğraf değiştir
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Unvan" value={title} onChange={setTitle} />
              <Field label="Ad Soyad" value={fullName} onChange={setFullName} />
            </div>

            <div className="mt-4">
              <Field label="Uzmanlık Alanı" value={specialty} onChange={setSpecialty} />
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-sm text-slate-500">
              <Mail className="h-4 w-4 shrink-0 text-slate-400" />
              {currentDoctor.email}
              <span className="ml-auto text-[10px] font-medium text-slate-400">
                Değiştirilemez
              </span>
            </div>
          </section>

          {/* Diller */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Globe className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Konuşulan Diller</h2>
                <p className="text-xs text-slate-500">
                  Hasta eşleştirmesinde kullanılır
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
                      "flex flex-col items-start rounded-xl border px-3 py-2.5 text-left transition-all",
                      active
                        ? "border-primary bg-primary-light/50 shadow-sm"
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
                    <span className="text-[11px] text-slate-500">{LANGUAGE_LABELS[lang]}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Biyografi */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Biyografi</h2>
                <p className="text-xs text-slate-500">Hastalara gösterilen tanıtım metni</p>
              </div>
              <span className="text-[11px] text-slate-400">{bio.length} karakter</span>
            </div>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={5}
              placeholder="Deneyiminiz, uzmanlık alanlarınız ve yaklaşımınız..."
              className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm leading-relaxed focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </section>

          {/* Sertifikalar */}
          <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-5 lg:p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Sertifika / Diploma
                </h2>
                <p className="text-xs text-slate-500">
                  Klinik doğrulama sürecinde kullanılır
                </p>
              </div>
            </div>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-slate-200 bg-white py-10 transition-colors hover:border-primary/30 hover:bg-primary-light/10">
              <Upload className="h-8 w-8 text-slate-400" />
              <span className="mt-2 text-sm font-semibold text-slate-600">
                Dosya seç veya sürükleyin
              </span>
              <span className="mt-1 text-xs text-slate-400">PDF, JPG · maks. 10 MB</span>
              <input type="file" className="sr-only" aria-label="Sertifika yükle" />
            </label>
          </section>

          {/* Kaydet — mobil */}
          <div className="flex items-center justify-end gap-3 xl:hidden">
            {saved && <SavedBadge />}
            <SaveButton onClick={handleSave} />
          </div>
        </div>

        {/* Sidebar */}
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

          <div className="hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm xl:block">
            {saved && (
              <div className="mb-3">
                <SavedBadge />
              </div>
            )}
            <SaveButton onClick={handleSave} fullWidth />
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs leading-relaxed text-slate-500">
              Profil bilgileriniz yalnızca eşleştirildiğiniz hastalar ve klinik
              yönetimi tarafından görüntülenir. KVKK kapsamında korunmaktadır.
            </p>
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
}: {
  onClick: () => void;
  fullWidth?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover",
        fullWidth ? "w-full" : "px-6"
      )}
    >
      <Save className="h-4 w-4" />
      Değişiklikleri Kaydet
    </button>
  );
}
