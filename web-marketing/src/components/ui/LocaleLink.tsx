"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "@/lib/locale";
import { withLocalePath } from "@/lib/locale-path";

type LocaleLinkProps = ComponentProps<typeof Link>;

export function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const { locale } = useLocale();
  const localized =
    typeof href === "string" ? withLocalePath(locale, href) : href;
  return <Link href={localized} {...props} />;
}
