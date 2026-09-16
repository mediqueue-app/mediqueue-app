"use client";

import { useCallback, useEffect, useRef } from "react";

const closers: Array<() => void> = [];
/** React unmount sonrası history.back() başka overlay kapatmasın. */
let ignorePop = 0;

function onPopState() {
  if (ignorePop > 0) {
    ignorePop -= 1;
    return;
  }
  const close = closers.pop();
  close?.();
}

function ensureListener() {
  if (typeof window === "undefined") return;
  window.removeEventListener("popstate", onPopState);
  window.addEventListener("popstate", onPopState);
}

/**
 * Overlay / form adımı açıkken history'ye bir kayıt basar.
 * Geri tuşu yalnızca bu katmanı kapatır; sayfadan çıkmaz, oturumu düşürmez.
 *
 * UI kapatışı: dönen `close()` → history.back() → popstate → onClose.
 * `open` React ile false olursa (unmount) dummy kayıt ignorePop + back ile silinir.
 *
 * App Router push vs replace:
 * - replace: login başarı, AuthGuard, filtre/query, seçili kayıt deeplink
 * - push: liste→detay, korumalı işlem için login (geri kaynak sayfaya dönsün)
 */
export function useHistoryLayer(open: boolean, onClose: () => void) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const closerRef = useRef<(() => void) | null>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!open) return;

    ensureListener();
    const hrefWhenPushed = window.location.href;
    const closer = () => {
      pushedRef.current = false;
      closerRef.current = null;
      onCloseRef.current();
    };
    closerRef.current = closer;
    closers.push(closer);
    history.pushState(
      { ...(history.state as object), mqOverlay: closers.length },
      ""
    );
    pushedRef.current = true;

    return () => {
      const index = closers.lastIndexOf(closer);
      if (index >= 0) closers.splice(index, 1);
      closerRef.current = null;
      if (!pushedRef.current) return;
      pushedRef.current = false;
      if (window.location.href !== hrefWhenPushed) return;
      ignorePop += 1;
      history.back();
    };
  }, [open]);

  return useCallback(() => {
    if (pushedRef.current) {
      history.back();
      return;
    }
    onCloseRef.current();
  }, []);
}

export function safeInternalPath(
  raw: string | null | undefined,
  fallback: string
): string {
  if (!raw) return fallback;
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.includes("://")) {
    return fallback;
  }
  return raw;
}

/** Guard yönlendirmesi: mevcut path’i `next` olarak saklar (open redirect yok). */
export function loginRedirect(loginPath: string): string {
  if (typeof window === "undefined") return loginPath;
  const next = `${window.location.pathname}${window.location.search}`;
  if (!next || next === loginPath || next.startsWith(`${loginPath}?`)) {
    return loginPath;
  }
  return `${loginPath}?next=${encodeURIComponent(next)}`;
}
