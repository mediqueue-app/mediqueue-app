"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { loginRedirect } from "@/lib/history-layer";
import { useT } from "@/lib/i18n";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const t = useT();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace(loginRedirect("/login"));
      return;
    }
    setReady(true);
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
