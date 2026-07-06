"use client";

import { useState } from "react";
import { Check, Upload } from "lucide-react";
import type { Language } from "@/types";
import { currentDoctor } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ALL_LANGUAGES: Language[] = ["TR", "EN", "AR", "RU", "DE", "FR"];

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
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          Profil Ayarları
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Platformda görünen doktor profilinizi düzenleyin.
        </p>
      </div>

      <div className="mx-auto w-full max-w-2xl space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-light text-2xl font-semibold text-primary">
              {currentDoctor.avatarInitials}
            </div>
            <div>
              <p className="text-sm text-slate-500">Profil fotoğrafı</p>
              <button
                type="button"
                className="mt-1 text-sm font-medium text-primary hover:underline"
              >
                Fotoğraf değiştir
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Unvan</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Ad Soyad</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-slate-700">
              Uzmanlık Alanı
            </label>
            <input
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-slate-700">
              Konuşulan Diller
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {ALL_LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => toggleLanguage(lang)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                    languages.includes(lang)
                      ? "bg-primary text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-slate-700">Biyografi</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </section>

        <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6">
          <h2 className="text-sm font-semibold text-slate-900">
            Sertifika / Diploma
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Yüklediğiniz belgeler klinik doğrulama sürecinde kullanılır.
          </p>
          <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-slate-200 bg-white py-8 transition-colors hover:bg-slate-50">
            <Upload className="h-8 w-8 text-slate-400" />
            <span className="mt-2 text-sm font-medium text-slate-600">
              Dosya seç veya sürükleyin
            </span>
            <input type="file" className="sr-only" aria-label="Sertifika yükle" />
          </label>
        </section>

        <div className="flex items-center justify-end gap-3">
          {saved && (
            <span className="flex items-center gap-1 text-sm font-medium text-emerald-600">
              <Check className="h-4 w-4" />
              Kaydedildi
            </span>
          )}
          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            Değişiklikleri Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}
