import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  MessageSquare,
  Star,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

type QuickStatsProps = {
  monthlyPatientCount: number;
  averageRating: number;
  pendingMessageCount: number;
  weeklyCompletedAppointments: number;
};

const cards: {
  key: keyof QuickStatsProps;
  label: string;
  icon: LucideIcon;
  tone: "primary" | "emerald" | "amber" | "blue";
  href: string;
  trend?: string;
  format: (p: QuickStatsProps) => { value: string; suffix?: string };
}[] = [
  {
    key: "monthlyPatientCount",
    label: "Bu Ay Hasta",
    icon: Users,
    tone: "primary",
    href: "/dashboard/patients",
    trend: "+4 geçen aya göre",
    format: (p) => ({ value: String(p.monthlyPatientCount) }),
  },
  {
    key: "averageRating",
    label: "Ortalama Puan",
    icon: Star,
    tone: "amber",
    href: "/dashboard/profile",
    trend: "127 değerlendirme",
    format: (p) => ({ value: p.averageRating.toFixed(1), suffix: "/ 5" }),
  },
  {
    key: "pendingMessageCount",
    label: "Bekleyen Mesaj",
    icon: MessageSquare,
    tone: "blue",
    href: "/dashboard/messages",
    format: (p) => ({ value: String(p.pendingMessageCount) }),
  },
  {
    key: "weeklyCompletedAppointments",
    label: "Haftalık Tamamlanan",
    icon: CalendarCheck,
    tone: "emerald",
    href: "/dashboard/calendar",
    trend: "Bu hafta",
    format: (p) => ({ value: String(p.weeklyCompletedAppointments) }),
  },
];

const toneClasses = {
  primary: "bg-primary-light text-primary",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  blue: "bg-blue-50 text-blue-600",
} as const;

export function QuickStats(props: QuickStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      {cards.map((card) => {
        const { value, suffix } = card.format(props);
        const Icon = card.icon;

        return (
          <Link
            key={card.key}
            href={card.href}
            className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-primary/20 hover:shadow-md lg:p-5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500">{card.label}</p>
                <p className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-900">
                  {value}
                  {suffix && (
                    <span className="ml-0.5 text-sm font-medium text-slate-400">
                      {suffix}
                    </span>
                  )}
                </p>
                {card.trend && (
                  <p className="mt-2 text-[11px] font-medium text-slate-400">
                    {card.trend}
                  </p>
                )}
              </div>
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105",
                  toneClasses[card.tone]
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
