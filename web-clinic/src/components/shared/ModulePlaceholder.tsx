import type { LucideIcon } from "lucide-react";
import { ArrowRight, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function ModulePlaceholder({
  title,
  description,
  icon: Icon,
  tier,
  highlights,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  tier?: "pro" | "premium" | "ai";
  highlights: string[];
}) {
  const tierLabel =
    tier === "ai" ? "Yapay Zeka" : tier === "premium" ? "Premium" : tier === "pro" ? "Pro" : null;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={title}
        description={description}
        action={
          tierLabel ? (
            <StatusBadge
              label={tierLabel}
              tone={tier === "ai" ? "primary" : "warning"}
            />
          ) : undefined
        }
      />

      <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
            {tier === "ai" ? (
              <Sparkles className="h-7 w-7" strokeWidth={2} />
            ) : (
              <Icon className="h-7 w-7" strokeWidth={2} />
            )}
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Büyüme Motoru modülü hazırlanıyor
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Bu modül, kliniğinizin pazar yerinde hasta kazanımını ve görünürlüğünü
            artırmak için tasarlandı. İç operasyon (ERP/HIS) yönetimi kapsam dışıdır.
          </p>
          <ul className="mt-6 space-y-2.5 text-left">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3 text-sm text-slate-700"
              >
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
