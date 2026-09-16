import { Suspense } from "react";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { AuthGuard } from "@/components/shared/AuthGuard";
import { I18nProvider } from "@/lib/i18n";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nProvider>
    <AuthGuard>
      <DashboardShell>
        <Suspense fallback={<p className="text-sm text-slate-500">Yükleniyor…</p>}>
          {children}
        </Suspense>
      </DashboardShell>
    </AuthGuard>
    </I18nProvider>
  );
}
