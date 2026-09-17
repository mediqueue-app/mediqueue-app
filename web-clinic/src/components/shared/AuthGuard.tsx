"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearSession, isAuthenticated } from "@/lib/auth";
import { ApiError } from "@/lib/api/client";
import { loginRedirect } from "@/lib/history-layer";
import { useT } from "@/lib/i18n";
import { fetchClinicProfile } from "@/lib/services/clinic";
import { fetchAppointmentRequests } from "@/lib/services/requests";

const BOOT_TIMEOUT_MS = 8_000;

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const t = useT();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function boot() {
      if (!isAuthenticated()) {
        router.replace(loginRedirect("/login"));
        return;
      }

      try {
        await Promise.race([
          Promise.all([fetchClinicProfile(), fetchAppointmentRequests()]),
          new Promise<void>((resolve) => {
            timer = setTimeout(resolve, BOOT_TIMEOUT_MS);
          }),
        ]);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          clearSession();
          if (!cancelled) router.replace(loginRedirect("/login"));
          return;
        }
        // Shell can render; pages show their own empty/error states.
      }

      if (!cancelled) setReady(true);
    }

    void boot();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [router]);

  if (!isAuthenticated()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-slate-500">{t("chrome.redirecting")}</p>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-slate-500">{t("chrome.loading")}</p>
      </div>
    );
  }

  return <>{children}</>;
}
