"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Stethoscope } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-4 py-12">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-xl shadow-primary/30">
            <Stethoscope className="h-8 w-8" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            MEDI<span className="text-primary">·</span>QUEUE
          </h1>
          <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-slate-400">
            Doctor Portal
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/50"
        >
          <h2 className="text-lg font-semibold text-slate-900">Giriş Yap</h2>
          <p className="mt-1 text-sm text-slate-500">
            Klinik yöneticiniz tarafından davet edilen hesabınızla giriş yapın.
          </p>

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
                placeholder="doktor@klinik.com"
                required
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
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
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-sm shadow-primary/25 transition-colors hover:bg-primary-hover"
          >
            Giriş Yap
          </button>

          <p className="mt-4 text-center">
            <Link
              href="#"
              className="text-sm font-medium text-primary hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              Şifremi Unuttum
            </Link>
          </p>

          <div className="mt-6 flex items-start gap-2 rounded-xl bg-slate-50 px-3.5 py-3">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <p className="text-xs leading-relaxed text-slate-500">
              Bu portal yalnızca davetli doktorlar içindir. Self-servis kayıt
              bulunmamaktadır.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
