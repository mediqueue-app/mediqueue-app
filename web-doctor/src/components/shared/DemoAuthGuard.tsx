"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isDemoAuthenticated } from "@/lib/demo-auth";

export function DemoAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isDemoAuthenticated()) {
      router.replace("/login");
      return;
    }
    setReady(true);
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
