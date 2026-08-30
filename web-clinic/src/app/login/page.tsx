"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { ApiError } from "@/lib/api/client";
import { isAuthenticated, login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
      <div className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative grid w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
        <div className="hidden flex-col justify-between border-r border-white/10 bg-gradient-to-br from-primary to-primary-hover p-10 lg:flex">
          <div className="flex items-center gap-3">
            <Image
              src="/mediqueue-logo.png"
              alt="MEDI·QUEUE"
              width={248}
              height={52}
              className="h-[52px] w-auto rounded-lg"
              priority
            />
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/60">
              Klinik
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold leading-snug text-white">
              Pazar Yeri
              <br />
              Ev Sahibi Paneli
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Yurt dışından ve yurt içinden gelen hasta taleplerini yönetin,
              vitrininizi güncelleyin ve doktor kadronuzu platformda öne çıkarın.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-white/80">
              {[
                "Gelen randevu talepleri kutusu",
                "Vitrin & akreditasyon yönetimi",
                "Doktor kadrosu ve görünürlük",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <Sparkles className="h-4 w-4 text-white/70" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-white/50">
            © 2026 MEDI·QUEUE · Yalnızca yetkili klinik hesapları
          </p>
        </div>

        <div className="bg-white p-8 sm:p-10">
          <div className="mb-8">
            <Image
              src="/mediqueue-logo.png"
              alt="MEDI·QUEUE"
              width={248}
              height={52}
              className="mb-5 h-[52px] w-auto rounded-lg lg:hidden"
              priority
            />
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Klinik Girişi
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Klinik yöneticisi hesabınızla oturum açın.
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
                placeholder="clinic@mediqueue.com"
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

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-sm shadow-primary/25 transition-colors hover:bg-primary-hover disabled:opacity-60"
            >
              {loading ? "Giriş yapılıyor…" : "Panele Giriş Yap"}
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-500">
            <span className="font-semibold text-slate-600">Demo giriş:</span>{" "}
            <code className="rounded bg-slate-200/60 px-1 py-0.5">clinic@mediqueue.com</code>{" "}
            / <code className="rounded bg-slate-200/60 px-1 py-0.5">Demo1234!</code>
            <br />
            <span className="mt-2 inline-block">
              Backend ayaktaysa gerçek JWT oturumu açılır; kapalıysa panel demo verisiyle
              çalışır.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
