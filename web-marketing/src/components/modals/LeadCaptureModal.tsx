"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { X } from "lucide-react";
import { useLocale } from "@/lib/locale";
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
  country: "United Kingdom",
  treatment: "",
  clinicName: "",
  city: "",
  website: "",
  role,
  message: "",
  consent: false,
});

export function LeadCaptureModal() {
  const { t } = useLocale();
  const copy = t.lead;
  const { open, mode, role, openLead, closeLead } = useLeadCapture();
  const titleId = useId();
  const [form, setForm] = useState<FormState>(() => emptyForm(role));
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;
    setForm(emptyForm(role));
    setStatus("idle");
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
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          ...form,
          locale: t.seo.title,
        }),
      });
      if (!response.ok) throw new Error("failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function switchMode(next: LeadMode) {
    openLead(next, next === "clinic" ? form.role : "clinic");
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
        aria-label={copy.close}
        onClick={closeLead}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-border bg-white shadow-2xl sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-border bg-white px-5 py-4 sm:px-6">
          <div>
            <div
              className="inline-flex rounded-full border border-border bg-mist p-1 text-xs font-semibold"
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
            <h2 id={titleId} className="mt-3 text-lg font-semibold text-ink">
              {mode === "patient" ? copy.patientTitle : copy.clinicTitle}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {mode === "patient" ? copy.patientBody : copy.clinicBody}
            </p>
          </div>
          <button
            type="button"
            onClick={closeLead}
            className="ml-3 inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-mist"
            aria-label={copy.close}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {status === "success" ? (
          <div className="px-5 py-10 text-center sm:px-6">
            <p className="text-xl font-semibold text-ink">{copy.successTitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {copy.successBody}
            </p>
            <button
              type="button"
              onClick={closeLead}
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-hover"
            >
              {copy.close}
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 px-5 py-5 sm:px-6">
            <Field
              label={copy.name}
              error={errors.name}
              value={form.name}
              onChange={(value) => setField("name", value)}
              autoComplete="name"
            />
            <Field
              label={copy.email}
              type="email"
              error={errors.email}
              value={form.email}
              onChange={(value) => setField("email", value)}
              autoComplete="email"
            />
            <Field
              label={copy.phone}
              type="tel"
              value={form.phone}
              onChange={(value) => setField("phone", value)}
              autoComplete="tel"
            />

            {mode === "patient" ? (
              <>
                <Field
                  label={copy.country}
                  error={errors.country}
                  value={form.country}
                  onChange={(value) => setField("country", value)}
                />
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">
                    {copy.treatment}
                  </span>
                  <select
                    value={form.treatment}
                    onChange={(event) => setField("treatment", event.target.value)}
                    className={inputClass(Boolean(errors.treatment))}
                  >
                    <option value="" />
                    {copy.treatmentOptions.map((option) => (
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
                  error={errors.clinicName}
                  value={form.clinicName}
                  onChange={(value) => setField("clinicName", value)}
                />
                <Field
                  label={copy.city}
                  error={errors.city}
                  value={form.city}
                  onChange={(value) => setField("city", value)}
                />
                <Field
                  label={copy.website}
                  type="url"
                  value={form.website}
                  onChange={(value) => setField("website", value)}
                />
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">
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
              <span className="text-sm font-medium text-slate-700">
                {copy.message}
              </span>
              <textarea
                rows={3}
                value={form.message}
                onChange={(event) => setField("message", event.target.value)}
                className={inputClass(false)}
              />
            </label>

            <label className="flex items-start gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(event) => setField("consent", event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-primary"
              />
              <span>
                {copy.consent}{" "}
                <a href="/privacy" className="font-medium text-primary underline">
                  {t.legal.privacyLink}
                </a>
              </span>
            </label>
            {errors.consent ? (
              <p className="text-xs text-danger">{errors.consent}</p>
            ) : null}
            {status === "error" ? (
              <p className="text-sm text-danger">{copy.error}</p>
            ) : null}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-70"
            >
              {status === "submitting" ? copy.submitting : copy.submit}
            </button>

            <p className="text-[11px] leading-relaxed text-slate-500">
              {t.footer.medicalDisclaimer}
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
        "rounded-full px-3 py-1.5",
        active ? "bg-ink text-white" : "text-slate-500 hover:text-slate-800"
      )}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  error,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        type={type}
        value={value}
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
    "mt-1 w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-primary",
    error ? "border-danger" : "border-border"
  );
}
