"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api/client";
import { login, register } from "@/lib/auth";
import {
  Stethoscope,
  User,
  Mail,
  Lock,
  Loader2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);
    try {
      await register(form.email, form.password, form.name || undefined);
      await login(form.email, form.password);
      router.push("/clinics");
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.detail
          : err instanceof Error
            ? err.message
            : "Kayıt başarısız";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <Link href="/" className="flex items-center gap-2" aria-label="Ana sayfa">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3a6ad6] text-white shadow-lg shadow-[#3a6ad6]/25">
              <Stethoscope className="h-6 w-6" />
            </span>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Medi<span className="text-[#3a6ad6]">Queue</span>
            </span>
          </Link>
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
            Hesap oluşturun
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Dakikalar içinde randevu almaya başlayın.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Ad Soyad
              </label>
              <div className="group relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#3a6ad6]" />
                <input
                  id="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={update("name")}
                  disabled={loading}
                  placeholder="Adınız Soyadınız"
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#3a6ad6] focus:ring-2 focus:ring-[#3a6ad6]/20 disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                E-posta
              </label>
              <div className="group relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#3a6ad6]" />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={update("email")}
                  disabled={loading}
                  placeholder="ornek@eposta.com"
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#3a6ad6] focus:ring-2 focus:ring-[#3a6ad6]/20 disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Şifre
              </label>
              <div className="group relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#3a6ad6]" />
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={form.password}
                  onChange={update("password")}
                  disabled={loading}
                  placeholder="En az 8 karakter"
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#3a6ad6] focus:ring-2 focus:ring-[#3a6ad6]/20 disabled:opacity-60"
                />
              </div>
            </div>

            {error ? (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-xl bg-[#3a6ad6] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2f57b3]",
                loading && "cursor-not-allowed opacity-80"
              )}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Hesap oluşturuluyor...
                </>
              ) : (
                <>
                  Kayıt Ol
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Zaten hesabın var mı?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-[#3a6ad6] hover:underline"
            >
              Giriş Yap
            </Link>
          </p>
        </div>

        <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          Kaydolarak Kullanım Koşulları&apos;nı kabul etmiş olursunuz
        </p>
      </div>
    </div>
  );
}
