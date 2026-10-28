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
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      setRedirecting(true);
      router.replace(loginRedirect("/login"));
      return;
    }
    setReady(true);
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
