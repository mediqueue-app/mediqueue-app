import Link from "next/link";
import {
  Calendar,
  FileText,
  MessageSquare,
  StickyNote,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ActivityItem } from "@/types";
import { formatTimeAgo } from "@/lib/utils";

const typeConfig: Record<
  ActivityItem["type"],
  { icon: LucideIcon; label: string; well: string }
> = {
  message: {
    icon: MessageSquare,
    label: "Mesaj",
    well: "bg-violet-50 text-violet-600",
  },
  appointment: {
    icon: Calendar,
    label: "Randevu",
    well: "bg-primary-light text-primary",
  },
  document: {
    icon: FileText,
    label: "Belge",
    well: "bg-sky-50 text-sky-600",
  },
  note: {
    icon: StickyNote,
    label: "Not",
    well: "bg-amber-50 text-amber-600",
  },
};

export function RecentActivity({
  activities,
}: {
  activities: ActivityItem[];
}) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 lg:px-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            Canlı akış
          </p>
          <h2 className="font-display mt-1 text-2xl tracking-tight text-slate-900">
            Son Aktiviteler
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Klinik akışındaki son hareketler
          </p>
        </div>
        <Link
          href="/dashboard/messages"
          className="text-xs font-semibold text-primary hover:underline"
        >
          Tümünü gör
        </Link>
      </div>

      <ul className="divide-y divide-slate-50">
        {activities.map((item) => {
          const config = typeConfig[item.type];
          const Icon = config.icon;

          return (
            <li
              key={item.id}
              className="flex gap-3 px-5 py-4 transition-colors hover:bg-primary-light/35 lg:px-6"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.well}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                    {config.label}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {formatTimeAgo(item.timestamp)}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                  {item.message}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
