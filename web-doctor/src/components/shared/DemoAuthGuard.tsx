"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isDemoAuthenticated } from "@/lib/demo-auth";
import { loginRedirect } from "@/lib/history-layer";

export function DemoAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isDemoAuthenticated()) {
      router.replace(loginRedirect("/login"));
      return;
    }
    setReady(true);
  }, [router]);

  if (!isDemoAuthenticated()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-slate-500">Giriş sayfasına yönlendiriliyor…</p>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-slate-500">Yükleniyor…</p>
      </div>
    );
  }

  return <>{children}</>;
}
