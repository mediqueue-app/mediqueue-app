import Link from "next/link";
import {
  Calendar,
  MessageSquare,
  UserCircle,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  {
    href: "/dashboard/patients",
    label: "Hastalarım",
    desc: "Liste & detay",
    icon: Users,
    tone: "bg-primary-light text-primary",
  },
  {
    href: "/dashboard/calendar",
    label: "Takvim",
    desc: "Program & müsaitlik",
    icon: Calendar,
    tone: "bg-emerald-50 text-emerald-600",
  },
  {
    href: "/dashboard/messages",
    label: "Mesajlar",
    desc: "Hasta iletişimi",
    icon: MessageSquare,
    tone: "bg-blue-50 text-blue-600",
  },
  {
    href: "/dashboard/profile",
    label: "Profil",
    desc: "Ayarlar & biyografi",
    icon: UserCircle,
    tone: "bg-violet-50 text-violet-600",
  },
] as const;

export function QuickActions() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-900">Hızlı Erişim</h2>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className="group flex flex-col rounded-xl border border-slate-100 p-3 transition-all hover:border-primary/20 hover:shadow-sm"
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg transition-transform group-hover:scale-105",
                  action.tone
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <p className="mt-2 text-xs font-semibold text-slate-800">{action.label}</p>
              <p className="text-[10px] text-slate-400">{action.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
