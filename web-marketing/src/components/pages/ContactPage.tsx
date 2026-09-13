"use client";

import { useState, type FormEvent } from "react";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Send,
  CheckCircle2,
  Clock,
  User,
  Building2,
  Stethoscope,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";

export function ContactPage() {
  const { t, locale } = useLocale();
  const tr = locale === "tr";
  const c = t.contact;

  const [activeTab, setActiveTab] = useState<"patient" | "clinic">("patient");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
    consent: false,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.consent) return;
    setStatus("submitting");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: activeTab === "patient" ? "patient" : "clinic",
          source: "İletişim Sayfası (/contact)",
          formType: activeTab === "patient" ? "İletişim — Hasta Mesajı" : "İletişim — Klinik Başvurusu",
          name: form.name,
          email: form.email,
          phone: form.phone,
          topic: form.topic,
          message: form.message,
          consent: form.consent,
          role: activeTab === "patient" ? "patient" : "clinic",
        }),
      });
      if (!response.ok) throw new Error("Failed to submit contact form");
      setStatus("success");
    } catch {
      setStatus("idle");
    }
  };

  return (
    <div className="overflow-x-hidden bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-slate-50/50">
        <HeroBackdrop />
        <Container className="relative pt-8 pb-8 sm:pt-10 sm:pb-10 lg:pt-12 lg:pb-12">
          <FadeIn className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary-light px-3.5 py-1.5 text-xs font-bold text-primary">
              <span>{c.eyebrow}</span>
            </div>
            <h1 className="font-display mt-4 text-[2.35rem] leading-[1.12] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.2rem]">
              {c.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              {c.intro}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Main Form & Contact Info Section */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            {/* Left Column — Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <FadeIn>
                <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
                  {/* Tab Selector */}
                  <div className="flex rounded-2xl border border-slate-200/80 bg-slate-100/70 p-1.5 mb-8">
                    <button
                      type="button"
                      onClick={() => setActiveTab("patient")}
                      className={cn(
                        "flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition-all sm:text-sm",
                        activeTab === "patient"
                          ? "bg-white text-primary shadow-sm ring-1 ring-slate-200"
                          : "text-slate-600 hover:text-slate-900"
                      )}
                    >
                      <User className="h-4 w-4" />
                      {c.patientTab}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("clinic")}
                      className={cn(
                        "flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition-all sm:text-sm",
                        activeTab === "clinic"
                          ? "bg-white text-primary shadow-sm ring-1 ring-slate-200"
                          : "text-slate-600 hover:text-slate-900"
                      )}
                    >
                      <Building2 className="h-4 w-4" />
                      {c.clinicTab}
                    </button>
                  </div>

                  {status === "success" ? (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-8 text-center">
                      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
                        <CheckCircle2 className="h-7 w-7" />
                      </span>
                      <h3 className="font-display mt-5 text-2xl font-bold text-slate-900">
                        {c.successTitle}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600 max-w-md mx-auto">
                        {c.successBody}
                      </p>
                      <div className="mt-6">
                        <Button
                          onClick={() => {
                            setStatus("idle");
                            setForm({
                              name: "",
                              email: "",
                              phone: "",
                              topic: "",
                              message: "",
                              consent: false,
                            });
                          }}
                          variant="ink"
                          size="md"
                        >
                          {tr ? "Yeni Mesaj Gönder" : "Send Another Message"}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                          {c.name} *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder={tr ? "Örn: Ahmet Yılmaz" : "e.g. John Doe"}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                            {c.email} *
                          </label>
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="ornek@email.com"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                            {c.phone}
                          </label>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="+90 5XX XXX XX XX"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                          {c.topic}
                        </label>
                        <input
                          type="text"
                          value={form.topic}
                          onChange={(e) => setForm({ ...form, topic: e.target.value })}
                          placeholder={
                            activeTab === "patient"
                              ? tr
                                ? "Örn: Saç Ekimi, Rinoplasti, Diş..."
                                : "e.g. Hair Transplant, Rhinoplasty..."
                              : tr
                              ? "Örn: Klinik Kaydı, Hekim Profili..."
                              : "e.g. Clinic Onboarding, Doctor Profile..."
                          }
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                          {c.message}
                        </label>
                        <textarea
                          rows={4}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder={
                            tr
                              ? "İletmek istediğiniz sorularınızı veya notlarınızı yazın..."
                              : "Write any details or questions you have..."
                          }
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div className="flex items-start gap-3 pt-2">
                        <input
                          type="checkbox"
                          id="consent"
                          required
                          checked={form.consent}
                          onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                          className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="consent" className="text-xs leading-relaxed text-slate-600">
                          {c.privacyNote}
                        </label>
                      </div>

                      <div className="pt-2">
                        <Button
                          type="submit"
                          size="lg"
                          disabled={status === "submitting"}
                          className="w-full justify-center shadow-lg shadow-primary/20"
                        >
                          {status === "submitting" ? c.submitting : c.submit}
                          <Send className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </FadeIn>
            </div>

            {/* Right Column — Contact Info Cards (5 cols) */}
            <div className="space-y-6 lg:col-span-5">
              <FadeIn delay={0.08}>
                <div className="rounded-3xl border border-slate-200/80 bg-slate-50/70 p-7 shadow-sm space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200/80 pb-4">
                    {tr ? "Doğrudan İletişim Kanalları" : "Direct Contact Channels"}
                  </h3>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-primary">
                      <Mail className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        {c.emailTitle}
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-900">
                        mediqueue.tech@gmail.com
                      </p>
                      <p className="text-xs font-medium text-slate-600">
                        {tr ? "Hızlı Ekip Yanıtı" : "Direct Team Inbox"}
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-200/80 text-slate-700">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        {c.addressTitle}
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-900">
                        Düzce Teknopark Ön Kuluçka Merkezi
                      </p>
                      <p className="mt-0.5 text-xs text-slate-600">
                        Düzce, Türkiye
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.14}>
                <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-6 shadow-2xs">
                  <div className="flex items-center gap-2.5 text-emerald-800 font-bold text-sm">
                    <Clock className="h-4.5 w-4.5 text-emerald-600" />
                    <span>{tr ? "Ortalama Yanıt Süresi" : "Average Response Time"}</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-700 font-medium">
                    {tr
                      ? "Bıraktığınız iletişim talepleri ekibimiz tarafından öncelikle değerlendirilir ve mesai saatlerinde ortalama 15 dakika içinde dönüş sağlanır."
                      : "Contact requests are reviewed immediately and our team responds within 15 minutes during working hours."}
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.18}>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
                  <ShieldCheck className="h-8 w-8 text-primary shrink-0" />
                  <p className="text-xs leading-relaxed text-slate-600 font-medium">
                    {tr
                      ? "Verileriniz 256-Bit SSL şifreleme ve KVKK/GDPR standartlarında korunur."
                      : "Your data is encrypted with 256-Bit SSL and GDPR standards."}
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
