"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/Topbar";
import { SidebarProvider } from "@/components/shared/SidebarContext";
import { useHistoryLayer } from "@/lib/history-layer";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const closeNav = useHistoryLayer(mobileNavOpen, () => setMobileNavOpen(false));

  return (
    <SidebarProvider>
      <div className="flex min-h-vv w-full bg-background">
        {mobileNavOpen && (
          <button
            type="button"
            aria-label="Menüyü kapat"
            className="mq-overlay fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
            onClick={closeNav}
          />
        )}

        <Sidebar
          mobileOpen={mobileNavOpen}
          onNavigate={() => setMobileNavOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar onMenuClick={() => setMobileNavOpen(true)} />
          <main className="flex-1 px-6 py-6 sm:px-8 lg:py-8">
            <div className="mx-auto w-full max-w-[1440px]">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
