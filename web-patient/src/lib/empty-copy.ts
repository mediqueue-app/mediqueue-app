"use client";

import type { UiLocale } from "@/lib/ui-locale";
import { useUiLocale } from "@/lib/ui-locale";
import { translate } from "@/lib/i18n-core";

export type EmptyCopy = {
  title: string;
  description: string;
  action?: string;
};

export type EmptyCopyKey =
  | "appointments"
  | "appointmentsAuth"
  | "clinicSearch"
  | "doctorSearch"
  | "chat"
  | "clinicReviews"
  | "doctorReviews"
  | "clinicDoctors"
  | "treatments";

export function emptyCopyFor(
  key: EmptyCopyKey,
  locale: UiLocale = "tr"
): EmptyCopy {
  const action = translate(locale, `empty.${key}.action`);
  const missingAction = action.startsWith("⚠");
  return {
    title: translate(locale, `empty.${key}.title`),
    description: translate(locale, `empty.${key}.description`),
    action: missingAction ? undefined : action,
  };
}

export function useEmptyCopy(key: EmptyCopyKey): EmptyCopy {
  const locale = useUiLocale();
  return emptyCopyFor(key, locale);
}
