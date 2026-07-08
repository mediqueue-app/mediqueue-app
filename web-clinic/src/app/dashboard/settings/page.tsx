import { SettingsForm } from "@/components/dashboard/settings/SettingsForm";
import { PageHeader } from "@/components/shared/PageHeader";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Klinik Profil & Vitrin Ayarları"
        description="Kliniğinizin MediQueue platformunda uluslararası hastalara nasıl göründüğünü yönetin."
      />

      <SettingsForm />
    </div>
  );
}
