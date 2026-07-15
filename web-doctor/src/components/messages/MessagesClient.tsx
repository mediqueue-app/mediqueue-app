"use client";

import { useMemo, useState } from "react";
import {
  Inbox,
  MessageSquare,
  Search,
  Zap,
} from "lucide-react";
import type { ChatThread } from "@/types";
import { ChatList } from "@/components/messages/ChatList";
import { ChatWindow } from "@/components/messages/ChatWindow";
import { filterThreads, getUnreadCount, sortThreads } from "@/lib/message-utils";
import { cn } from "@/lib/utils";

export function MessagesClient({ threads }: { threads: ChatThread[] }) {
  const sorted = useMemo(() => sortThreads(threads), [threads]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [selectedId, setSelectedId] = useState<string | null>(
    sorted[0]?.id ?? null
  );

  const filtered = useMemo(() => {
    let list = filterThreads(sorted, search);
    if (filter === "unread") {
      list = list.filter((t) => t.unreadCount > 0);
    }
    return list;
  }, [sorted, search, filter]);

  const selected =
    filtered.find((t) => t.id === selectedId) ?? filtered[0] ?? null;

  const unreadTotal = getUnreadCount(threads);

  return (
    <div className="animate-fade-in-up stagger-1 relative flex h-[calc(100vh-14rem)] min-h-[520px] overflow-hidden rounded-[1.75rem] border border-slate-800/40 shadow-2xl shadow-slate-900/20">
      {/* Sol — koyu inbox */}
      <div
        className={cn(
          "relative flex w-full shrink-0 flex-col bg-slate-950 lg:w-[340px] xl:w-[380px]",
          selectedId ? "hidden lg:flex" : "flex"
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(58,106,214,0.22),transparent_55%)]" />

        <div className="relative border-b border-white/10 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Gelen kutusu
              </p>
              <h2 className="font-display text-2xl text-white">Sohbetler</h2>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary ring-1 ring-primary/30">
              <Inbox className="h-5 w-5" />
            </div>
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Hasta veya mesaj ara..."
              aria-label="Sohbet ara"
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-primary/50 focus:bg-white/10 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="mt-3 flex gap-2">
            <FilterChip
              active={filter === "all"}
              onClick={() => setFilter("all")}
              label="Tümü"
            />
            <FilterChip
              active={filter === "unread"}
              onClick={() => setFilter("unread")}
              label={`Okunmamış${unreadTotal ? ` · ${unreadTotal}` : ""}`}
            />
          </div>
        </div>

        <div className="relative flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center px-6 py-20 text-center">
              <MessageSquare className="h-10 w-10 text-slate-600" />
              <p className="mt-4 text-sm font-semibold text-slate-300">
                Sohbet bulunamadı
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Aramayı veya filtreyi değiştirmeyi deneyin.
              </p>
            </div>
          ) : (
            <ChatList
              threads={filtered}
              selectedId={selected?.id ?? null}
              onSelect={setSelectedId}
            />
          )}
        </div>
      </div>

      {/* Sağ — chat stage */}
      <div
        className={cn(
          "relative min-w-0 flex-1",
          !selectedId ? "hidden lg:block" : "block"
        )}
      >
        {selected ? (
          <ChatWindow
            key={`${selected.id}-${selected.messages.length}-${selected.lastMessageAt}`}
            thread={selected}
            onBack={() => setSelectedId(null)}
          />
        ) : (
          <EmptyChatState />
        )}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg px-3 py-1.5 text-xs font-semibold transition",
        active
          ? "bg-primary text-white shadow-sm shadow-primary/40"
          : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
      )}
    >
      {label}
    </button>
  );
}

function EmptyChatState() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-slate-100 px-6 text-center">
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.35) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="animate-soft-float relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-primary-hover text-white shadow-xl shadow-primary/30">
        <Zap className="h-8 w-8" />
      </div>
      <p className="relative mt-6 font-display text-2xl text-slate-900">
        Bir sohbet seçin
      </p>
      <p className="relative mt-2 max-w-sm text-sm text-slate-500">
        Soldaki listeden bir hastaya tıklayın — konuşma buraya açılır.
      </p>
    </div>
  );
}
