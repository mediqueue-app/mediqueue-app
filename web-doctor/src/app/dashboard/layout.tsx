"use client";

import { DemoAuthGuard } from "@/components/shared/DemoAuthGuard";
import { DashboardShell } from "@/components/shared/DashboardShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DemoAuthGuard>
      <DashboardShell>{children}</DashboardShell>
    </DemoAuthGuard>
  );
}
