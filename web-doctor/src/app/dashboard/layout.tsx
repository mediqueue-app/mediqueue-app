import { DashboardShell } from "@/components/shared/DashboardShell";
import { AuthGuard } from "@/components/shared/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <DashboardShell>{children}</DashboardShell>
    </AuthGuard>
  );
}
