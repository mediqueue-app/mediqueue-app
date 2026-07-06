"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Stethoscope } from "lucide-react";
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
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30">
            <Stethoscope className="h-7 w-7" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            MEDI<span className="text-primary">·</span>QUEUE
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500">Doktor Portalı</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
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
                className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
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
                className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            Giriş Yap
          </button>

          <p className="mt-4 text-center">
            <Link
              href="#"
              className="text-sm text-primary hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              Şifremi Unuttum
            </Link>
          </p>

          <p className="mt-6 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
            Bu portal yalnızca davetli doktorlar içindir. Self-servis kayıt
            bulunmamaktadır.
          </p>
        </form>
      </div>
    </div>
  );
}
