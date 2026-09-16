"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearSession, isAuthenticated } from "@/lib/auth";
import { ApiError } from "@/lib/api/client";
import { loginRedirect } from "@/lib/history-layer";
import { useT } from "@/lib/i18n";
import { fetchCurrentDoctor } from "@/lib/services/doctor";

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
          fetchCurrentDoctor(),
          new Promise<void>((resolve) => {
            timer = setTimeout(resolve, 8_000);
          }),
        ]);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          clearSession();
          if (!cancelled) router.replace(loginRedirect("/login"));
          return;
        }
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
