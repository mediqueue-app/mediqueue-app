"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "@/lib/locale";
import { documentTitleForPath } from "@/lib/page-title";

export function DocumentTitle() {
  const { locale } = useLocale();
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    document.title = documentTitleForPath(locale, pathname);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [locale, pathname]);

  return null;
}
