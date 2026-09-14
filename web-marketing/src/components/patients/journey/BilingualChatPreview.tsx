"use client";

import { Languages, Stethoscope, User } from "lucide-react";
import { useLocale } from "@/lib/locale";

const MESSAGES = [
  {
    role: "patient" as const,
    main: "Wann kann ich einen Termin bekommen?",
    translated: false,
  },
  {
    role: "doctor" as const,
    main: "Sie können nächste Woche Dienstag um 14:00 Uhr kommen. Wir senden Ihnen vorab einen detaillierten Behandlungsplan.",
    original:
      "Gelecek hafta Salı 14:00 size uygun. Tedavi planınızı önceden paylaşacağız.",
    originalLabel: "Doktor · Türkçe",
    translated: true,
  },
  {
    role: "patient" as const,
    main: "Brauche ich vorher noch weitere Untersuchungen?",
    translated: false,
  },
  {
    role: "doctor" as const,
    main: "Ja, wir empfehlen ein kurzes Online-Vorgespräch. Die Terminoptionen finden Sie in Ihrem Panel.",
    original:
      "Evet, kısa bir online ön görüşme öneriyoruz. Randevu seçeneklerini panelinizde göreceksiniz.",
    originalLabel: "Doktor · Türkçe",
    translated: true,
  },
];

export function BilingualChatPreview() {
  const { t } = useLocale();
  const x = t.screens.chat;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      <div className="border-b border-border bg-band px-4 py-3">
        <p className="text-sm font-semibold text-slate-900">{x.title}</p>
        <p className="text-xs text-slate-500">{x.translate}</p>
      </div>
      <div className="space-y-4 p-4">
        {MESSAGES.map((msg, i) => (
          <ChatBubble key={i} msg={msg} labels={{ translated: x.translated, original: x.original }} />
        ))}
      </div>
    </div>
  );
}

function ChatBubble({
  msg,
  labels,
}: {
  msg: (typeof MESSAGES)[number];
  labels: { translated: string; original: string };
}) {
  const isPatient = msg.role === "patient";
  const showOriginal = !isPatient && msg.translated && "original" in msg;

  return (
    <div
      className={`flex gap-2 ${isPatient ? "flex-row-reverse" : "flex-row"}`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isPatient ? "bg-primary-light text-primary" : "bg-slate-100 text-slate-600"
        }`}
      >
        {isPatient ? (
          <User className="h-4 w-4" strokeWidth={1.75} />
        ) : (
          <Stethoscope className="h-4 w-4" strokeWidth={1.75} />
        )}
      </span>
      <div
        className={`relative max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
          isPatient
            ? "rounded-tr-sm bg-primary text-white"
            : "rounded-tl-sm border border-border bg-white text-slate-900"
        }`}
      >
        {msg.translated ? (
          <span className="mb-1.5 inline-flex items-center gap-1 rounded-full bg-primary-light/80 px-2 py-0.5 text-[10px] font-semibold text-primary">
            <Languages className="h-3 w-3" />
            {labels.translated}
          </span>
        ) : null}
        <p className="text-sm leading-relaxed">{msg.main}</p>
        {showOriginal ? (
          <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
            {labels.original} ({msg.originalLabel}): {msg.original}
          </p>
        ) : null}
      </div>
    </div>
  );
}
