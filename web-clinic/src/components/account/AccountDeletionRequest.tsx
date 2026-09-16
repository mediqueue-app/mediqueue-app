"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { toUserError } from "@/lib/api/client";
import { getToken, logout } from "@/lib/auth";
import { useT } from "@/lib/i18n";
import { requestAccountErasure } from "@/lib/services/account";

export function AccountDeletionRequest() {
  const t = useT();
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function confirmErase() {
    const token = getToken();
    if (!token) {
      setError(t("errors.session"));
      return;
    }
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      await requestAccountErasure(token);
      logout();
      router.replace("/login");
    } catch (err) {
      setError(toUserError(err));
      setBusy(false);
    }
  }

  const second = step === 2;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setError(null);
          setStep(1);
        }}
        className="mt-3 inline-flex min-h-12 items-center rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
      >
        {t("confirm.accountTrigger")}
      </button>
      <ConfirmDialog
        open={step !== null}
        title={second ? t("confirm.accountSecondTitle") : t("confirm.accountTitle")}
        description={
          second ? t("confirm.accountSecondBody") : t("confirm.accountBody")
        }
        confirmLabel={
          second ? t("confirm.accountSecondAction") : t("confirm.accountAction")
        }
        busy={busy}
        error={error}
        onClose={() => {
          if (!busy) {
            setStep(null);
            setError(null);
          }
        }}
        onConfirm={() => {
          if (step === 1) {
            setStep(2);
            return;
          }
          void confirmErase();
        }}
      />
    </>
  );
}
