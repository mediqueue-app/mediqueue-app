"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, RotateCcw, Loader2 } from "lucide-react";
import {
  clearDemoFlow,
  isDemoActive,
  startDemoFlow,
  subscribeDemo,
} from "@/lib/demo/demo-script";

/**
 * Ortak demo akışını (book→confirm→message) tetikleyen küçük, sabit
 * konumlu başlatıcı. Yalnızca geliştirme ortamında görünür; sabit (fixed)
 * olduğundan sayfa mizanpajını, kaydırmayı veya mobil uyumluluğu bozmaz.
 *
 * DECOUPLED: Prodüksiyonda hiç render edilmez ve `layout.tsx` içindeki tek
 * satır kaldırılarak projeden tamamen ayrılabilir.
 */
export function DemoLauncher() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  // Demo durumu client-only (sessionStorage) bir dış depodur; hydration
  // uyumsuzluğu ve set-state-in-effect olmadan okumak için useSyncExternalStore.
  const active = useSyncExternalStore(
    subscribeDemo,
    isDemoActive,
    () => false
  );

  // Geliştirme dışında hiç gösterme.
  if (process.env.NODE_ENV === "production") return null;

  const handleStart = () => {
    setBusy(true);
    startDemoFlow(); // subscribeDemo aboneliğini tetikler → `active` güncellenir
    router.push("/appointments");
    // Küçük bir görsel geri bildirim penceresi bırak.
    setTimeout(() => setBusy(false), 600);
  };

  const handleReset = () => {
    clearDemoFlow(); // subscribeDemo aboneliğini tetikler → `active` güncellenir
    router.refresh();
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
      <button
        type="button"
        onClick={handleStart}
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-full border border-[#3a6ad6]/20 bg-white/95 px-4 py-2 text-xs font-semibold text-[#3a6ad6] shadow-lg shadow-slate-900/10 backdrop-blur transition-colors hover:bg-[#eaf0fc] disabled:cursor-not-allowed disabled:opacity-70"
        title="book → confirm → message demo akışını başlatır"
      >
        {busy ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
        {active ? "Demo Akışını Yenile" : "Demo Akışını Başlat"}
      </button>

      {active ? (
        <button
          type="button"
          onClick={handleReset}
          aria-label="Demoyu sıfırla"
          title="Demoyu sıfırla"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-400 shadow-lg shadow-slate-900/10 backdrop-blur transition-colors hover:bg-slate-100 hover:text-slate-600"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
