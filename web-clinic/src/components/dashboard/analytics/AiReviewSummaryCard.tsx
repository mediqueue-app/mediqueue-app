import { MessageSquareQuote } from "lucide-react";
import { ProBadge } from "@/components/ui/ProBadge";
import type { AiReviewSummary } from "@/types";

export function AiReviewSummaryCard({ data }: { data: AiReviewSummary }) {
  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="absolute right-6 top-6">
        <ProBadge label="PRO · BETA" />
      </div>

      <h2 className="text-sm font-semibold text-slate-900">
        Yapay Zeka Hasta Geri Bildirim Analizi
      </h2>
      <p className="mt-1 max-w-[calc(100%-5rem)] text-xs text-slate-500">
        {data.sampleSize} anonimleştirilmiş hasta yorumunun otomatik analizi.
      </p>

      <div className="mt-5 flex items-center gap-4">
        <p className="text-4xl font-semibold tracking-tight text-slate-900">
          %{data.positivePercentage}
        </p>
        <p className="text-sm leading-relaxed text-slate-600">
          Hastaların <span className="font-semibold text-slate-900">%{data.positivePercentage}&apos;ü</span>{" "}
          iletişimi mükemmel buldu.
        </p>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl bg-primary-light/60 px-3 py-2.5">
        <MessageSquareQuote className="h-4 w-4 shrink-0 text-primary" />
        <p className="text-xs text-slate-700">
          En sık bahsedilen olumlu kelime:{" "}
          <span className="font-semibold text-primary">{data.topKeyword}</span>
        </p>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-slate-400">
        Bu analiz, KVKK&apos;ya uygun şekilde anonimleştirilmiş yorum
        verileriyle üretilmiştir. Kişisel veri içermez.
      </p>
    </div>
  );
}
