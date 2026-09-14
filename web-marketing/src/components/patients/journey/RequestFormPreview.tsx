"use client";

import type { ReactNode } from "react";
import { Calendar, ChevronDown, Globe, User, Wallet } from "lucide-react";
import { useLocale } from "@/lib/locale";

export function RequestFormPreview() {
  const { t } = useLocale();
  const x = t.screens.request;

  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-border bg-band px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-slate-300" />
        <span className="h-2 w-2 rounded-full bg-slate-300" />
        <span className="ml-1 text-[11px] font-medium text-slate-500">
          patient · {x.chrome}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
            <User className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">{x.profile}</p>
            <p className="text-xs text-slate-500">{x.hidden}</p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <Field
            icon={<ChevronDown className="h-3.5 w-3.5" />}
            label={x.treatment}
            value={x.treatmentVal}
          />
          <Field
            icon={<Calendar className="h-3.5 w-3.5" />}
            label={x.dates}
            value={x.datesVal}
          />
          <Field
            icon={<Wallet className="h-3.5 w-3.5" />}
            label={x.budget}
            value="€2.000 – €3.500"
          />
          <Field
            icon={<Globe className="h-3.5 w-3.5" />}
            label={x.lang}
            value={x.langVal}
          />
        </div>

        <button
          type="button"
          className="mt-5 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white"
        >
          {x.send}
        </button>
      </div>
    </div>
  );
}

function Field({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-band/50 px-3 py-2.5">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 flex items-center justify-between gap-2 text-sm font-medium text-slate-800">
        <span>{value}</span>
        <span className="text-slate-400">{icon}</span>
      </p>
    </div>
  );
}
