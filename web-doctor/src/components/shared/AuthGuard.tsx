"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearSession, isAuthenticated } from "@/lib/auth";
import { fetchCurrentDoctor } from "@/lib/services/doctor";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      if (!isAuthenticated()) {
        router.replace("/login");
        return;
      }
      try {
        await fetchCurrentDoctor();
        if (!cancelled) setReady(true);
      } catch {
        clearSession();
        if (!cancelled) router.replace("/login");
      }
    }

    void boot();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-slate-500">Yükleniyor…</p>
      </div>
    );
  }

  return <>{children}</>;
}
