import { Layers } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function CurrentPlanCard({
  leadsUsed,
  leadsLimit,
}: {
  leadsUsed: number;
  leadsLimit: number;
}) {
  const usageRatio = Math.min(leadsUsed / leadsLimit, 1);
  const isNearLimit = usageRatio >= 0.7;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Şu anki planınız</p>
            <p className="text-base font-semibold text-slate-900">
              Ücretsiz (Temel) Plan
            </p>
          </div>
        </div>
        <Badge tone="slate">Aylık 15 Lead Limiti</Badge>
      </div>

      <div className="mt-5">
        <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-slate-500">
          <span>Bu ayki lead kullanımı</span>
          <span className={isNearLimit ? "text-amber-600" : "text-slate-600"}>
            {leadsUsed} / {leadsLimit}
          </span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={
              isNearLimit
                ? "h-full rounded-full bg-amber-500 transition-all"
                : "h-full rounded-full bg-primary transition-all"
            }
            style={{ width: `${usageRatio * 100}%` }}
          />
        </div>
        {isNearLimit && (
          <p className="mt-2 text-xs text-amber-600">
            Limitinizin %{Math.round(usageRatio * 100)}&apos;ine ulaştınız —
            Premium ile kesintisiz büyümeye devam edin.
          </p>
        )}
      </div>
    </div>
  );
}
