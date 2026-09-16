"use client";

import { useEffect } from "react";

const FIELD_SELECTOR =
  "input:not([type=hidden]):not([type=button]):not([type=submit]):not([type=reset]):not([type=checkbox]):not([type=radio]):not([type=file]), textarea, select";

const EXTRA_GAP_PX = 20;

function isField(el: EventTarget | null): el is HTMLElement {
  return el instanceof HTMLElement && el.matches(FIELD_SELECTOR);
}

function applyViewportCss() {
  const root = document.documentElement;
  const vv = window.visualViewport;
  if (!vv) {
    root.style.setProperty("--keyboard-inset", "0px");
    root.style.setProperty("--vv-offset-top", "0px");
    root.style.setProperty("--vv-height", "100dvh");
    return 0;
  }
  const inset = Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop));
  root.style.setProperty("--keyboard-inset", `${inset}px`);
  root.style.setProperty("--vv-offset-top", `${Math.round(vv.offsetTop)}px`);
  root.style.setProperty("--vv-height", `${Math.round(vv.height)}px`);
  return inset;
}

function visibleBand(): { top: number; bottom: number } {
  const vv = window.visualViewport;
  if (!vv) {
    return { top: 0, bottom: window.innerHeight };
  }
  return {
    top: vv.offsetTop,
    bottom: vv.offsetTop + vv.height,
  };
}

function scrollOverflowParents(el: HTMLElement) {
  const { bottom: visBottom, top: visTop } = visibleBand();
  let node: HTMLElement | null = el.parentElement;
  while (node && node !== document.body) {
    const style = getComputedStyle(node);
    const canScroll =
      /(auto|scroll|overlay)/.test(style.overflowY) &&
      node.scrollHeight > node.clientHeight + 1;
    if (canScroll) {
      const rect = el.getBoundingClientRect();
      if (rect.bottom > visBottom - EXTRA_GAP_PX) {
        node.scrollTop += rect.bottom - visBottom + EXTRA_GAP_PX;
      } else if (rect.top < visTop + EXTRA_GAP_PX) {
        node.scrollTop -= visTop + EXTRA_GAP_PX - rect.top;
      }
    }
    node = node.parentElement;
  }
}

function revealFocusedField() {
  const el = document.activeElement;
  if (!isField(el)) return;

  scrollOverflowParents(el);

  const rect = el.getBoundingClientRect();
  const { top, bottom } = visibleBand();
  if (rect.bottom <= bottom - EXTRA_GAP_PX && rect.top >= top + EXTRA_GAP_PX) {
    return;
  }

  el.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" });

  requestAnimationFrame(() => {
    const next = el.getBoundingClientRect();
    const band = visibleBand();
    const overflow = next.bottom - (band.bottom - EXTRA_GAP_PX);
    if (overflow > 0) {
      window.scrollBy({ top: overflow, behavior: "smooth" });
    } else if (next.top < band.top + EXTRA_GAP_PX) {
      window.scrollBy({ top: next.top - band.top - EXTRA_GAP_PX, behavior: "smooth" });
    }
  });
}

function ensureViewportMeta() {
  const meta = document.querySelector('meta[name="viewport"]');
  if (!meta) return;
  let content = meta.getAttribute("content") ?? "";
  if (!content.includes("viewport-fit")) {
    content = `${content}, viewport-fit=cover`;
  }
  if (!content.includes("interactive-widget")) {
    content = `${content}, interactive-widget=resizes-content`;
  }
  meta.setAttribute("content", content.replace(/^,\s*/, ""));
}

/**
 * iOS Safari klavyesi layout viewport'u küçültmez; visualViewport küçülür.
 * Android Chrome `interactive-widget=resizes-content` ile içeriği yeniden boyutlar.
 * Odaklanan alanı her iki durumda da görünür bantta tutar.
 */
export function useKeepFocusedFieldVisible() {
  useEffect(() => {
    ensureViewportMeta();
    applyViewportCss();

    let frame = 0;
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        applyViewportCss();
        revealFocusedField();
      });
    };

    const onFocusIn = (event: FocusEvent) => {
      if (!isField(event.target)) return;
      applyViewportCss();
      revealFocusedField();
      window.setTimeout(revealFocusedField, 320);
    };

    window.visualViewport?.addEventListener("resize", sync);
    window.visualViewport?.addEventListener("scroll", sync);
    window.addEventListener("resize", sync);
    document.addEventListener("focusin", onFocusIn);

    return () => {
      cancelAnimationFrame(frame);
      window.visualViewport?.removeEventListener("resize", sync);
      window.visualViewport?.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      document.removeEventListener("focusin", onFocusIn);
      const root = document.documentElement;
      root.style.removeProperty("--keyboard-inset");
      root.style.removeProperty("--vv-offset-top");
      root.style.removeProperty("--vv-height");
    };
  }, []);
}

export function KeyboardInsets() {
  useKeepFocusedFieldVisible();
  return null;
}
