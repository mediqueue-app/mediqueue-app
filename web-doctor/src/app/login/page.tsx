"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Sparkles, Stethoscope, X } from "lucide-react";
import { ApiError } from "@/lib/api/client";
import { isAuthenticated, login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/dashboard");
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.detail
          : err instanceof Error
            ? err.message
            : "Giriş başarısız";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">
      <div className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
        {/* Sol panel — dış görsele bağımlı değil */}
        <div className="relative hidden min-h-[560px] overflow-hidden bg-slate-950 lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-slate-900 to-slate-950" />
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.22) 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="pointer-events-none absolute -right-16 top-20 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-10 left-10 h-48 w-48 rounded-full bg-primary/40 blur-3xl" />

          <div className="relative flex h-full min-h-[560px] flex-col justify-between p-10">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur">
                <Stethoscope className="h-5 w-5" strokeWidth={2.25} />
              </div>
              <div>
                <p className="text-[15px] font-bold tracking-tight text-white">
                  MEDI<span className="text-sky-300">·</span>QUEUE
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
                  Doktor Portalı
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-display text-4xl leading-tight text-white">
                Klinik gününüzü
                <br />
                net görün.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
                Onaylı randevular, müsaitlik ve hasta akışı — tek panelde, gerçek
                API ile.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-white/90">
                {[
                  "Günlük program ve takvim",
                  "Hasta listesi ve dosya özeti",
                  "Müsaitlik ve mesaj kutusu",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <Sparkles className="h-4 w-4 text-sky-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-white/50">
              © 2026 MediQueue · Yetkili doktor hesapları
            </p>
          </div>
        </div>

        <div className="bg-white p-8 sm:p-10">
          <div className="mb-8">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30 lg:hidden">
              <Stethoscope className="h-7 w-7" strokeWidth={2.5} />
            </div>
            <h1 className="font-display text-3xl tracking-tight text-slate-900">
              Doktor Girişi
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Klinik yöneticiniz tarafından davet edilen hesabınızla giriş yapın.
            </p>
          </div>

          {error ? (
            <p className="mb-4 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                E-posta
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doktor@klinik.com"
                required
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-slate-700">
                Şifre
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-white shadow-sm shadow-primary/25 transition-colors hover:bg-primary-hover disabled:opacity-60"
            >
              {loading ? "Giriş yapılıyor…" : "Panele Giriş Yap"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setForgotOpen(true)}
            className="mt-4 w-full text-center text-sm font-medium text-slate-500 hover:text-primary"
          >
            Şifremi unuttum
          </button>

          <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-500">
            <span className="font-semibold text-slate-600">Demo:</span>{" "}
            <code className="rounded bg-slate-200/60 px-1 py-0.5">
              doctor@mediqueue.com
            </code>{" "}
            /{" "}
            <code className="rounded bg-slate-200/60 px-1 py-0.5">Demo1234!</code>
          </div>
        </div>
      </div>

      {forgotOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 text-slate-900">
                <Lock className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Şifre sıfırlama</h3>
              </div>
              <button
                type="button"
                onClick={() => setForgotOpen(false)}
                aria-label="Kapat"
              >
                <X className="h-4 w-4 text-slate-400" />
              </button>
            </div>
            <p className="text-sm text-slate-600">
              Şifre sıfırlama özelliği sonraki sprintte eklenecek. Demo için
              seed edilmiş doktor hesabını kullanın.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
