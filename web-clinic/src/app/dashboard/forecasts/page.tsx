import { Sparkles } from "lucide-react";
import { DemandForecastChart } from "@/components/dashboard/growth/DemandForecastChart";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { fetchAiInsights, fetchForecastData } from "@/lib/services/growth";
import { cn } from "@/lib/utils";

export default async function ForecastsPage() {
  const [forecastData, aiInsights] = await Promise.all([
    fetchForecastData(),
    fetchAiInsights(),
  ]);

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <PageHeader
        title="Talep Öngörüleri"
        description="Yapay zeka destekli gelecek ay talep trend analizi."
        action={<StatusBadge label="Yapay Zeka" tone="primary" dot={false} />}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <DemandForecastChart data={forecastData} />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-slate-900">
              Yapay Zeka İçgörüleri
            </h2>
          </div>
          {aiInsights.map((insight) => (
            <article
              key={insight.id}
              className={cn(
                "rounded-2xl border bg-white p-5 shadow-sm transition-all hover:shadow-md",
                insight.impact === "high"
                  ? "border-primary/20 bg-primary-light/20"
                  : "border-slate-100"
              )}
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  {insight.title}
                </h3>
                <StatusBadge
                  label={insight.impact === "high" ? "Yüksek" : "Orta"}
                  tone={insight.impact === "high" ? "primary" : "info"}
                  dot={false}
                />
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
                {insight.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
