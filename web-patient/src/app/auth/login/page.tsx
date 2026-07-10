"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api/client";
import { login } from "@/lib/auth";
import {
  Stethoscope,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.push("/clinics");
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
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="Ana sayfa"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3a6ad6] text-white shadow-lg shadow-[#3a6ad6]/25">
              <Stethoscope className="h-6 w-6" />
            </span>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Medi<span className="text-[#3a6ad6]">Queue</span>
            </span>
          </Link>
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
            Tekrar hoş geldiniz
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Randevularınızı yönetmek için hesabınıza giriş yapın.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  placeholder="ornek@eposta.com"
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#3a6ad6] focus:ring-2 focus:ring-[#3a6ad6]/20 disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Şifre
                </label>
                <Link
                  href="/auth/login"
                  className="text-xs font-medium text-[#3a6ad6] hover:underline"
                >
                  Şifremi unuttum
                </Link>
              </div>
              <div className="group relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#3a6ad6]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-11 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#3a6ad6] focus:ring-2 focus:ring-[#3a6ad6]/20 disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  disabled={loading}
                  aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                disabled={loading}
                className="h-4 w-4 rounded border-slate-300 text-[#3a6ad6] accent-[#3a6ad6]"
              />
              Beni hatırla
            </label>

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
                  Giriş yapılıyor...
                </>
              ) : (
                <>
                  Giriş Yap
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Hesabın yok mu?{" "}
            <Link
              href="/auth/register"
              className="font-semibold text-[#3a6ad6] hover:underline"
            >
              Kayıt Ol
            </Link>
          </p>
        </div>

        <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          Bilgileriniz 256-bit SSL ile şifrelenerek korunur
        </p>
      </div>
    </div>
  );
}
