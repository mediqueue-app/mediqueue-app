import { MessageSquare, Shield } from "lucide-react";
import type { ChatThread } from "@/types";
import { getUnreadCount } from "@/lib/message-utils";

export function MessagesPageHeader({ threads }: { threads: ChatThread[] }) {
  const unread = getUnreadCount(threads);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between lg:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-primary">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 lg:text-2xl">
              Mesajlar
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Hastalarınızla güvenli mesajlaşma kanalı.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 text-center">
            <p className="text-lg font-semibold text-slate-900">{threads.length}</p>
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
              Sohbet
            </p>
          </div>
          {unread > 0 && (
            <div className="rounded-xl border border-primary/20 bg-primary-light px-4 py-2.5 text-center">
              <p className="text-lg font-semibold text-primary">{unread}</p>
              <p className="text-[10px] font-medium uppercase tracking-wide text-primary/70">
                Okunmamış
              </p>
            </div>
          )}
          <div className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
            <Shield className="h-3.5 w-3.5" />
            KVKK uyumlu kanal
          </div>
        </div>
      </div>
    </section>
  );
}
