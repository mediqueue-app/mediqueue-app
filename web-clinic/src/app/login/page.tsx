"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Lock, X } from "lucide-react";
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-4 py-12">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-xl shadow-primary/30">
            <Building2 className="h-8 w-8" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            MEDI<span className="text-primary">·</span>QUEUE
          </h1>
          <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-slate-400">
            Clinic Portal
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/50"
        >
          <h2 className="text-lg font-semibold text-slate-900">Giriş Yap</h2>
          <p className="mt-1 text-sm text-slate-500">
            Klinik yöneticisi hesabınızla giriş yapın.
          </p>

          {error ? (
            <p className="mt-4 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                E-posta
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yonetici@klinik.com"
                required
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
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
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-sm shadow-primary/25 transition-colors hover:bg-primary-hover disabled:opacity-60"
          >
            {loading ? "Giriş yapılıyor…" : "Giriş Yap"}
          </button>

          <button
            type="button"
            onClick={() => setForgotOpen(true)}
            className="mt-3 w-full text-center text-sm font-medium text-slate-500 hover:text-primary"
          >
            Şifremi unuttum
          </button>
        </form>
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
              seed edilmiş klinik hesabını kullanın.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
