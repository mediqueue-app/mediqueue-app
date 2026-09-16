"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogIn, ShieldAlert } from "lucide-react";
import { AccountDeletionRequest } from "@/components/account/AccountDeletionRequest";
import { isAuthenticated } from "@/lib/auth";
import { useT } from "@/lib/i18n";

export default function AccountPage() {
  const t = useT();
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    setSignedIn(isAuthenticated());
  }, []);

  if (signedIn === null) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-sm text-slate-500">
        {t("account.loading")}
      </div>
    );
  }

  if (!signedIn) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
          <LogIn className="h-6 w-6" />
        </span>
        <h1 className="mt-6 text-2xl font-bold text-slate-900">
          {t("account.authTitle")}
        </h1>
        <p className="mt-2 text-sm text-slate-600">{t("account.authLead")}</p>
        <Link
          href="/auth/login?next=/account"
          className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          {t("nav.signIn")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 lg:px-8">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
        <ShieldAlert className="h-6 w-6" />
      </span>
      <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
        {t("account.title")}
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {t("account.lead")}
      </p>
      <section className="mt-8 rounded-2xl border border-red-100 bg-red-50/40 p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          {t("confirm.accountTitle")}
        </h2>
        <p className="mt-1 text-sm text-slate-600">{t("account.retention")}</p>
        <AccountDeletionRequest />
      </section>
    </div>
  );
}
