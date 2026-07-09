"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Lock, Video, Image as ImageIcon } from "lucide-react";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { BRANCHES } from "@/lib/branches";
import {
  getClinicProfileSync,
  updateClinicProfile,
} from "@/lib/services/clinic";
import { cn } from "@/lib/utils";
import type { Language, NotificationPreferences, Specialty } from "@/types";

const ALL_LANGUAGES: Language[] = ["TR", "EN", "AR", "RU", "DE", "FR", "ES"];

export function SettingsForm() {
  const clinic = getClinicProfileSync();
  const [clinicName, setClinicName] = useState(clinic.name);
  const [address, setAddress] = useState(clinic.address);
  const [phone, setPhone] = useState(clinic.phone);
  const [city, setCity] = useState(clinic.city);
  const [description, setDescription] = useState(
    "Estetik cerrahi, saç ekimi ve diş tedavisi alanlarında uluslararası hastalara hizmet veren çok disiplinli sağlık kuruluşu."
  );
  const [languages, setLanguages] = useState<Language[]>(["TR", "EN", "AR", "RU"]);
  const [specialties, setSpecialties] = useState<Specialty[]>([
    "Estetik Cerrahi",
    "Saç Ekimi",
    "Diş Tedavisi",
    "Tüp Bebek (IVF)",
  ]);
  const [notifications, setNotifications] = useState<NotificationPreferences>({
    emailLeads: true,
    emailReviews: true,
    inAppLeads: true,
    inAppReviews: false,
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleLanguage(lang: Language) {
    setLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  }

  function toggleSpecialty(branch: Specialty) {
    setSpecialties((prev) =>
      prev.includes(branch)
        ? prev.filter((b) => b !== branch)
        : [...prev, branch]
    );
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      await updateClinicProfile({
        name: clinicName,
        address,
        phone,
        city,
        description,
        languages,
      });
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kayıt başarısız");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">
          Klinik Profil Bilgileri
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Bu bilgiler MediQueue platformunda uluslararası hastalara gösterilir.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="clinic-name" className="text-xs font-medium text-slate-500">
              Klinik Adı
            </label>
            <input
              id="clinic-name"
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <div>
            <label htmlFor="clinic-phone" className="text-xs font-medium text-slate-500">
              Telefon
            </label>
            <input
              id="clinic-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="clinic-address" className="text-xs font-medium text-slate-500">
              Adres
            </label>
            <input
              id="clinic-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <div>
            <label htmlFor="clinic-city" className="text-xs font-medium text-slate-500">
              Şehir
            </label>
            <input
              id="clinic-city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="clinic-description" className="text-xs font-medium text-slate-500">
              Klinik Açıklaması
            </label>
            <textarea
              id="clinic-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">
          Desteklenen Diller
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {ALL_LANGUAGES.map((lang) => {
            const active = languages.includes(lang);
            return (
              <button
                key={lang}
                type="button"
                onClick={() => toggleLanguage(lang)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
                  active
                    ? "bg-primary text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                )}
              >
                {active && <Check className="mr-1 inline h-3 w-3" />}
                {lang}
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">
          Uzmanlık Alanları
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Kliniğinizin sunduğu tedavi branşlarını seçin.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {BRANCHES.map((branch) => {
            const active = specialties.includes(branch as Specialty);
            return (
              <button
                key={branch}
                type="button"
                onClick={() => toggleSpecialty(branch as Specialty)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
                  active
                    ? "bg-primary text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                )}
              >
                {branch}
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">
          Bildirim Tercihleri
        </h2>
        <div className="mt-2 divide-y divide-slate-100">
          <ToggleSwitch
            id="email-leads"
            checked={notifications.emailLeads}
            onChange={(v) => setNotifications((n) => ({ ...n, emailLeads: v }))}
            label="E-posta — yeni hasta talepleri"
          />
          <ToggleSwitch
            id="email-reviews"
            checked={notifications.emailReviews}
            onChange={(v) => setNotifications((n) => ({ ...n, emailReviews: v }))}
            label="E-posta — yeni yorumlar"
          />
          <ToggleSwitch
            id="inapp-leads"
            checked={notifications.inAppLeads}
            onChange={(v) => setNotifications((n) => ({ ...n, inAppLeads: v }))}
            label="Uygulama içi — hasta talepleri"
          />
          <ToggleSwitch
            id="inapp-reviews"
            checked={notifications.inAppReviews}
            onChange={(v) =>
              setNotifications((n) => ({ ...n, inAppReviews: v }))
            }
            label="Uygulama içi — yorumlar"
          />
        </div>
      </section>

      <section className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">
          Klinik Tanıtım Videosu
        </h2>
        <div
          aria-hidden
          className="mt-5 grid select-none grid-cols-1 gap-4 opacity-60 blur-[2px] sm:grid-cols-2"
        >
          <div className="flex h-32 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 bg-slate-50 text-slate-400">
            <Video className="h-6 w-6" />
            <span className="text-xs font-medium">Tanıtım videosu yükle</span>
          </div>
          <div className="flex h-32 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 bg-slate-50 text-slate-400">
            <ImageIcon className="h-6 w-6" />
            <span className="text-xs font-medium">Galeri görselleri</span>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-white/70">
          <div className="rounded-2xl border border-slate-100 bg-white px-6 py-5 text-center shadow-lg">
            <Lock className="mx-auto h-5 w-5 text-primary" />
            <p className="mt-2 text-sm font-medium text-slate-800">
              Premium plan ile video ve galeri yükleyin
            </p>
            <Link
              href="/dashboard/billing"
              className="mt-3 inline-block rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-hover"
            >
              Planları İncele
            </Link>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-end gap-3">
        {error ? (
          <span className="text-sm font-medium text-red-600">{error}</span>
        ) : null}
        {saved && (
          <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
            <Check className="h-4 w-4" />
            Değişiklikler kaydedildi
          </span>
        )}
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-60"
        >
          {saving ? "Kaydediliyor…" : "Değişiklikleri Kaydet"}
        </button>
      </div>
    </div>
  );
}
