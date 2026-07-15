import Image from "next/image";
import type { ReactNode } from "react";
import { Languages, MessageSquare } from "lucide-react";
import type { ChatThread } from "@/types";
import { HybridSourceBadge } from "@/components/shared/HybridSourceBadge";
import { getUnreadCount } from "@/lib/message-utils";

const HERO =
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1800&q=80";

export function MessagesPageHeader({ threads }: { threads: ChatThread[] }) {
  const unread = getUnreadCount(threads);

  return (
    <section className="relative isolate min-h-[160px] overflow-hidden rounded-[1.75rem] sm:min-h-[180px]">
      <Image
        src={HERO}
        alt=""
        fill
        className="object-cover object-center"
        sizes="(max-width: 1440px) 100vw, 1440px"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-primary/45" />

      <div className="relative flex h-full min-h-[160px] flex-col justify-between gap-5 p-6 sm:min-h-[180px] sm:p-8 lg:flex-row lg:items-end">
        <div className="max-w-xl">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 ring-1 ring-white/20 backdrop-blur">
              <Languages className="h-3.5 w-3.5 text-sky-300" />
              Hasta iletişimi
            </span>
            <HybridSourceBadge source="mock" />
          </div>
          <h1 className="font-display text-4xl tracking-tight text-white sm:text-5xl">
            Mesajlar
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/75">
            Onaylı hastalarla güvenli kanal — çeviri açıkken orijinal dil balonun
            altında görünür.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <StatPill
            icon={<MessageSquare className="h-4 w-4" />}
            label="Sohbet"
            value={String(threads.length)}
          />
          <StatPill
            label="Okunmamış"
            value={String(unread)}
            accent={unread > 0}
          />
        </div>
      </div>
    </section>
  );
}

function StatPill({
  icon,
  label,
  value,
  accent,
}: {
  icon?: ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={
        accent
          ? "rounded-2xl border border-white/20 bg-primary px-5 py-3 text-white shadow-lg shadow-primary/30 backdrop-blur"
          : "rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-white backdrop-blur-md"
      }
    >
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">
          {label}
        </p>
      </div>
      <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
    </div>
  );
}
