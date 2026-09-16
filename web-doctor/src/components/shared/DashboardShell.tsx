"use client";

import { useState } from "react";
import { Sidebar } from "@/components/shared/Sidebar";
import { TopBar } from "@/components/shared/TopBar";
import { SidebarProvider } from "@/components/shared/SidebarContext";
import { useHistoryLayer } from "@/lib/history-layer";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const closeNav = useHistoryLayer(mobileNavOpen, () => setMobileNavOpen(false));

  return (
    <SidebarProvider>
      <div className="mesh-bg flex min-h-screen w-full">
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

        <div className="relative flex min-w-0 flex-1 flex-col">
          <TopBar onMenuClick={() => setMobileNavOpen(true)} />
          <main className="relative flex-1 px-5 py-6 sm:px-8 lg:py-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-72 overflow-hidden">
              <div className="absolute -left-16 top-8 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
            </div>
            <div className="relative mx-auto w-full max-w-[1440px]">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
