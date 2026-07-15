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

type IconTone = "primary" | "emerald" | "amber" | "violet" | "sky";

const ICON_TONES: Record<IconTone, string> = {
  primary: "bg-gradient-to-br from-primary to-primary-hover text-white",
  emerald: "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white",
  amber: "bg-gradient-to-br from-amber-400 to-orange-500 text-white",
  violet: "bg-gradient-to-br from-violet-400 to-violet-600 text-white",
  sky: "bg-gradient-to-br from-sky-400 to-sky-600 text-white",
};

const cards: {
  key: keyof QuickStatsProps;
  label: string;
  icon: LucideIcon;
  href: string;
  iconTone: IconTone;
  format: (p: QuickStatsProps) => ReactNode;
  delay: string;
}[] = [
  {
    key: "monthlyPatientCount",
    label: "Bu Ay Hasta",
    icon: Users,
    href: "/dashboard/patients",
    iconTone: "sky",
    delay: "stagger-1",
    format: (p) => (
      <span className="text-3xl font-bold tracking-tight text-slate-900">
        {p.monthlyPatientCount}
      </span>
    ),
  },
  {
    key: "averageRating",
    label: "Ortalama Puan",
    icon: Star,
    href: "/dashboard/profile",
    iconTone: "amber",
    delay: "stagger-2",
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
    iconTone: "violet",
    delay: "stagger-3",
    format: (p) => (
      <span className="text-3xl font-bold tracking-tight text-slate-900">
        {p.pendingMessageCount}
      </span>
    ),
  },
  {
    key: "weeklyCompletedAppointments",
    label: "Haftalık Tamamlanan",
    icon: CalendarCheck,
    href: "/dashboard/calendar",
    iconTone: "emerald",
    delay: "stagger-4",
    format: (p) => (
      <span className="text-3xl font-bold tracking-tight text-slate-900">
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
            className={cn(
              "panel-lift animate-fade-in-up group relative overflow-hidden rounded-2xl border border-white/80 bg-white/95 p-6 shadow-sm backdrop-blur-sm",
              card.delay
            )}
          >
            <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-slate-100/80 transition-transform duration-500 group-hover:scale-125" />
            <div className="relative flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-500">{card.label}</p>
                <div className="mt-3">{card.format(props)}</div>
              </div>
              <div
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-sm",
                  ICON_TONES[card.iconTone]
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
