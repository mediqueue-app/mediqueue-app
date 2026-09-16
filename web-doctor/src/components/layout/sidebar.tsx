"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/ui/BrandMark";
import type { DoctorProfile } from "@/types";
import { Avatar } from "@/components/ui/avatar";
import { DoctorStatusBadge } from "@/components/ui/status-badge";
import { useDoctorStatus } from "@/context/doctor-status-context";
import { navItems } from "@/lib/nav";
import { useT } from "@/lib/i18n";

export function Sidebar({ doctor }: { doctor: DoctorProfile }) {
  const pathname = usePathname();
  const t = useT();
  const { status } = useDoctorStatus();

  return (
    <aside className="hidden w-72 shrink-0 flex-col border-r border-slate-200/80 bg-white lg:flex">
      <div className="flex items-center gap-2 px-6 py-6">
        <BrandMark size={36} className="h-9 w-9" />
        <span className="text-lg font-semibold tracking-tight text-slate-900">
          Medi<span className="text-primary">Queue</span>
        </span>
      </div>

      <div className="mx-4 mb-2 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4">
        <div className="flex items-center gap-3">
          <Avatar name={doctor.fullName} size="lg" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {doctor.title} {doctor.fullName}
            </p>
            <p className="truncate text-xs text-slate-500">{doctor.specialty}</p>
          </div>
        </div>
        <div className="mt-3">
          <DoctorStatusBadge status={status} />
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-2">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon
                className={`h-[18px] w-[18px] shrink-0 ${
                  isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600"
                }`}
              />
              <span className="flex flex-col">
                <span>{t(item.labelKey)}</span>
                <span className="text-[11px] font-normal text-slate-400">
                  {t(item.descriptionKey)}
                </span>
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200/80 px-6 py-4">
        <p className="text-[11px] leading-relaxed text-slate-400">
          {doctor.roomNumber} · {doctor.clinicId}
        </p>
      </div>
    </aside>
  );
}
