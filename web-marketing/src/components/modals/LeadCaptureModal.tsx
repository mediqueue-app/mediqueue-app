"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { useLocale } from "@/lib/locale";
import { withLocalePath } from "@/lib/locale-path";
import { useLeadCapture, type LeadMode } from "@/lib/lead-capture";
import { cn } from "@/lib/cn";

type FormState = {
  name: string;
  email: string;
  phone: string;
  country: string;
  treatment: string;
  clinicName: string;
  city: string;
  website: string;
  role: "clinic" | "doctor";
  message: string;
  consent: boolean;
};

const emptyForm = (role: "clinic" | "doctor"): FormState => ({
  name: "",
  email: "",
  phone: "",
      country: "",
  treatment: "",
  clinicName: "",
  city: "",
  website: "",
  role,
  message: "",
  consent: false,
});

export function LeadCaptureModal() {
  const { locale, t } = useLocale();
  const copy = t.lead;
  const { open, mode, role, openLead, closeLead } = useLeadCapture();
  const titleId = useId();
  const [form, setForm] = useState<FormState>(() => emptyForm(role));
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;
    setForm(emptyForm(role));
    setStatus("idle");
    setSubmitError(null);
    setErrors({});
  }, [open, mode, role]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLead();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeLead]);

  if (!open) return null;

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = copy.required;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = copy.required;
    }
    if (!form.consent) next.consent = copy.required;
    if (mode === "patient") {
      if (!form.country.trim()) next.country = copy.required;
      if (!form.treatment) next.treatment = copy.required;
    } else {
      if (!form.clinicName.trim()) next.clinicName = copy.required;
      if (!form.city.trim()) next.city = copy.required;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    setSubmitError(null);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(12_000),
        body: JSON.stringify({
          mode,
          source: "Modal Formu (Lead Modal)",
          formType: mode === "patient" ? "Hasta Talebi Formu" : "Klinik / Doktor Kaydı Formu",
          ...form,
          locale,
        }),
      });
      if (!response.ok) {
        const message =
          response.status === 422
            ? copy.error
            : response.status >= 500
              ? copy.errorServer
              : copy.error;
        setSubmitError(message);
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setSubmitError(copy.errorNetwork);
      setStatus("error");
    }
  }

  function switchMode(next: LeadMode) {
    openLead(next, next === "clinic" ? form.role : "clinic");
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      <button
        type="button"
        className="mq-overlay fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        aria-label={copy.close}
        onClick={closeLead}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="mq-panel relative z-10 my-auto flex max-h-[calc(100vh-3rem)] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl"
      >
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between border-b border-border bg-surface px-6 py-5">
          <div className="pr-4">
            <div
              className="inline-flex rounded-full border border-slate-200 bg-slate-100 p-1 text-xs font-semibold"
              role="tablist"
            >
              <TabButton
                active={mode === "patient"}
                onClick={() => switchMode("patient")}
              >
                {copy.patientTab}
              </TabButton>
              <TabButton
                active={mode === "clinic"}
                onClick={() => switchMode("clinic")}
              >
                {copy.clinicTab}
              </TabButton>
            </div>
            <h2 id={titleId} className="mt-3 text-lg font-bold text-slate-900">
              {mode === "patient" ? copy.patientTitle : copy.clinicTitle}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              {mode === "patient" ? copy.patientBody : copy.clinicBody}
            </p>
          </div>
          <button
            type="button"
            onClick={closeLead}
            className="touch-target inline-flex shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            aria-label={copy.close}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        {status === "success" ? (
          <div className="overflow-y-auto px-6 py-10 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-7 w-7" />
            </span>
            <p className="mt-4 text-xl font-bold text-slate-900">{copy.successTitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 max-w-md mx-auto">
              {copy.successBody}
            </p>
            <button
              type="button"
              onClick={closeLead}
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-white hover:bg-primary-hover shadow-md"
            >
              {copy.close}
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="overflow-y-auto px-6 py-5 space-y-4">
            <Field
              label={copy.name}
              placeholder={copy.namePlaceholder}
              error={errors.name}
              value={form.name}
              onChange={(value) => setField("name", value)}
              autoComplete="name"
            />
            <Field
              label={copy.email}
              placeholder={copy.emailPlaceholder}
              type="email"
              error={errors.email}
              value={form.email}
              onChange={(value) => setField("email", value)}
              autoComplete="email"
            />
            <Field
              label={copy.phone}
              placeholder={copy.phonePlaceholder}
              type="tel"
              value={form.phone}
              onChange={(value) => setField("phone", value)}
              autoComplete="tel"
            />

            {mode === "patient" ? (
              <>
                <Field
                  label={copy.country}
                  placeholder={copy.countryPlaceholder}
                  error={errors.country}
                  value={form.country}
                  onChange={(value) => setField("country", value)}
                />
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    {copy.treatment} *
                  </span>
                  <select
                    value={form.treatment}
                    onChange={(event) => setField("treatment", event.target.value)}
                    className={inputClass(Boolean(errors.treatment))}
                  >
                    <option value="">{copy.selectTreatment}</option>
                    {copy.treatmentOptions.map((option: string) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.treatment ? (
                    <span className="mt-1 block text-xs text-danger">
                      {errors.treatment}
                    </span>
                  ) : null}
                </label>
              </>
            ) : (
              <>
                <Field
                  label={copy.clinicName}
                  placeholder={copy.clinicNamePlaceholder}
                  error={errors.clinicName}
                  value={form.clinicName}
                  onChange={(value) => setField("clinicName", value)}
                />
                <Field
                  label={copy.city}
                  placeholder={copy.cityPlaceholder}
                  error={errors.city}
                  value={form.city}
                  onChange={(value) => setField("city", value)}
                />
                <Field
                  label={copy.website}
                  placeholder={copy.websitePlaceholder}
                  type="url"
                  value={form.website}
                  onChange={(value) => setField("website", value)}
                />
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    {copy.role}
                  </span>
                  <select
                    value={form.role}
                    onChange={(event) =>
                      setField("role", event.target.value as "clinic" | "doctor")
                    }
                    className={inputClass(false)}
                  >
                    <option value="clinic">{copy.roleClinic}</option>
                    <option value="doctor">{copy.roleDoctor}</option>
                  </select>
                </label>
              </>
            )}

            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {copy.message}
              </span>
              <textarea
                rows={3}
                placeholder={copy.messagePlaceholder}
                value={form.message}
                onChange={(event) => setField("message", event.target.value)}
                className={inputClass(false)}
              />
            </label>

            <label className="flex min-h-12 items-start gap-3 text-xs leading-relaxed text-slate-600">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(event) => setField("consent", event.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <span>
                {copy.consent}{" "}
                <a href={withLocalePath(locale, "/privacy")} className="font-semibold text-primary hover:underline">
                  {copy.privacyLink}
                </a>
              </span>
            </label>
            {errors.consent ? (
              <p className="text-xs text-danger">{errors.consent}</p>
            ) : null}
            {status === "error" && submitError ? (
              <p className="text-xs text-danger">{submitError}</p>
            ) : null}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-primary text-sm font-bold text-white hover:bg-primary-dark shadow-md shadow-primary/20 disabled:opacity-70"
            >
              {status === "submitting" ? copy.submitting : copy.submit}
            </button>

            <p className="text-[11px] leading-relaxed text-slate-500 text-center">
              {copy.dataNote}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "min-h-12 rounded-full px-3 py-1.5 transition-colors",
        active ? "bg-ink text-white" : "text-slate-600 hover:text-slate-900"
      )}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
  autoComplete,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
        {label} {error ? "*" : ""}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass(Boolean(error))}
      />
      {error ? <span className="mt-1 block text-xs text-danger">{error}</span> : null}
    </label>
  );
}

function inputClass(error: boolean) {
  return cn(
    "mt-1 w-full rounded-xl border bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-slate-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
    error ? "border-danger" : "border-slate-200"
  );
}
