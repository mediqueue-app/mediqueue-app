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
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function boot() {
      if (!isAuthenticated()) {
        setRedirecting(true);
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
          if (!cancelled) {
            setRedirecting(true);
            router.replace(loginRedirect("/login"));
          }
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

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-slate-500">
          {redirecting ? t("chrome.redirecting") : t("chrome.loading")}
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
