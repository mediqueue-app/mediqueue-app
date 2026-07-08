import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  MessageSquare,
  Star,
  Users,
} from "lucide-react";
import { StarRating } from "@/components/ui/StarRating";
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
  href: string;
  format: (p: QuickStatsProps) => ReactNode;
}[] = [
  {
    key: "monthlyPatientCount",
    label: "Bu Ay Hasta",
    icon: Users,
    href: "/dashboard/patients",
    format: (p) => (
      <span className="text-2xl font-bold text-slate-900">
        {p.monthlyPatientCount}
      </span>
    ),
  },
  {
    key: "averageRating",
    label: "Ortalama Puan",
    icon: Star,
    href: "/dashboard/profile",
    format: (p) => (
      <div className="flex flex-col gap-1">
        <StarRating value={p.averageRating} size="md" showValue />
        <span className="text-[11px] text-slate-400">127 değerlendirme</span>
      </div>
    ),
  },
  {
    key: "pendingMessageCount",
    label: "Bekleyen Mesaj",
    icon: MessageSquare,
    href: "/dashboard/messages",
    format: (p) => (
      <span className="text-2xl font-bold text-slate-900">
        {p.pendingMessageCount}
      </span>
    ),
  },
  {
    key: "weeklyCompletedAppointments",
    label: "Haftalık Tamamlanan",
    icon: CalendarCheck,
    href: "/dashboard/calendar",
    format: (p) => (
      <span className="text-2xl font-bold text-slate-900">
        {p.weeklyCompletedAppointments}
      </span>
    ),
  },
];

export function QuickStats(props: QuickStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Link
            key={card.key}
            href={card.href}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-150 hover:border-slate-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500">{card.label}</p>
                <div className="mt-2">{card.format(props)}</div>
              </div>
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary"
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
