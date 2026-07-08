import { Sparkles } from "lucide-react";
import type { AiReviewSummary } from "@/types";

export function AiReviewSummaryCard({
  data,
  showDisclaimer = false,
}: {
  data: AiReviewSummary;
  showDisclaimer?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary-light/80 to-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Yapay Zeka Yorum Özeti
          </h2>
          <p className="text-xs text-slate-500">
            Son {data.sampleSize} hasta yorumundan özet
          </p>
        </div>
      </div>

      <p className="mt-5 text-2xl font-bold text-slate-900">
        Hastaların %{data.positivePercentage}&apos;i deneyimi olumlu buldu
      </p>
      <p className="mt-2 text-sm text-slate-600">
        En sık geçen ifade:{" "}
        <span className="font-semibold text-primary">{data.topKeyword}</span>
      </p>

      <ul className="mt-5 space-y-2">
        {data.themes.map((theme) => (
          <li
            key={theme}
            className="rounded-xl border border-slate-100 bg-white/80 px-3 py-2 text-sm text-slate-600"
          >
            {theme}
          </li>
        ))}
      </ul>

      {showDisclaimer && (
        <div
          role="note"
          className="mt-5 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-3"
        >
          <span className="mt-0.5 text-xs font-bold uppercase tracking-wide text-amber-700">
            Demo
          </span>
          <p className="text-xs leading-relaxed text-amber-900">
            Bu özet <strong>örnek verilerle</strong> oluşturulmuştur. Canlı hasta
            yorumlarından üretim Ay 2&apos;de backend entegrasyonu ile
            etkinleştirilecektir.
          </p>
        </div>
      )}
    </div>
  );
}
