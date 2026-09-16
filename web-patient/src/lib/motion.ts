"use client";

import { useEffect, useState } from "react";

/** Overlay / page / list motion. Keep within 150–300ms, ease-out. */
export const MOTION_MS = 220;

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return reduced;
}

/** Keep the node mounted so CSS leave animations can finish. */
export function usePresence(show: boolean, durationMs = MOTION_MS) {
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(show);

  useEffect(() => {
    if (show) {
      setMounted(true);
      return;
    }
    if (reduced) {
      setMounted(false);
      return;
    }
    const t = window.setTimeout(() => setMounted(false), durationMs);
    return () => window.clearTimeout(t);
  }, [show, durationMs, reduced]);

  return {
    mounted: show || mounted,
    leaving: !show && mounted,
    reduced,
  };
}
