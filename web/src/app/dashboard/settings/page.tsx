import { SettingsForm } from "@/components/dashboard/settings/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          Klinik Profil & Uluslararası Vitrin Ayarları
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Kliniğinizin MediQueue platformunda uluslararası hastalara nasıl
          göründüğünü yönetin.
        </p>
      </div>

      <SettingsForm />
    </div>
  );
}
