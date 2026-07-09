"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { fetchClinicProfile } from "@/lib/services/clinic";

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
        await fetchClinicProfile();
      } catch {
        // Profile fetch failure should not block shell; pages handle errors.
      }
      if (!cancelled) setReady(true);
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
