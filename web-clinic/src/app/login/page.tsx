"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import { toUserError } from "@/lib/api/client";
import { isAuthenticated, login } from "@/lib/auth";
import { safeInternalPath } from "@/lib/history-layer";
import { useT } from "@/lib/i18n";

function nextPath() {
  if (typeof window === "undefined") return "/dashboard";
  return safeInternalPath(new URLSearchParams(window.location.search).get("next"), "/dashboard");
}

export default function LoginPage() {
  const t = useT();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace(nextPath());
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.replace(nextPath());
    } catch (err) {
      setError(toUserError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-vv items-center justify-center overflow-hidden px-4 py-12">
      <HeroBackdrop withGrid />

      <div className="relative grid w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm lg:grid-cols-2">
        <div className="hidden flex-col justify-between border-r border-slate-200/80 bg-mist p-10 lg:flex">
          <div>
            <BrandLogo className="h-8 w-auto" />
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              {t("login.panel")}
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold leading-snug text-ink">
              {t("login.headline1")}
              <br />
              {t("login.headline2")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              {t("login.lead")}
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-slate-600">
              {[t("login.b1"), t("login.b2"), t("login.b3")].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <Sparkles className="h-4 w-4 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-slate-400">
            {t("login.copyright")}
          </p>
        </div>

        <div className="bg-white p-8 sm:p-10">
          <div className="mb-8">
            <BrandLogo className="mb-5 h-9 w-auto lg:hidden" />
            <h1 className="font-display text-xl font-semibold tracking-tight text-ink">
              {t("login.title")}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {t("login.subtitle")}
            </p>
          </div>

          {error ? (
            <p className="mq-feedback mb-4 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              {error}
            </p>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                {t("login.email")}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("login.emailPh")}
                required
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-slate-700">
                {t("login.password")}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 min-h-11 w-full rounded-full bg-primary py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover disabled:opacity-60"
            >
              {loading ? t("login.signingIn") : t("login.submit")}
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-slate-200/80 bg-mist px-4 py-3 text-xs text-slate-500">
            <span className="font-semibold text-slate-600">{t("login.backend")}</span>{" "}
            {t("login.backendHint")}
          </div>
        </div>
      </div>
    </div>
  );
}
