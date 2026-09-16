"use client";

import { useT } from "@/lib/i18n";

export function AccountDeletionRequest() {
  const t = useT();
  return (
    <p className="mt-3 text-sm leading-relaxed text-slate-600">
      {t("confirm.accountDoctorNote")}
    </p>
  );
}
