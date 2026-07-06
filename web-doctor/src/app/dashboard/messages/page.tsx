import { MessagesClient } from "@/components/messages/MessagesClient";
import { fetchChatThreads } from "@/lib/services/messages";

export default async function MessagesPage() {
  const threads = await fetchChatThreads();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          Mesajlar
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Hastalarınızla güvenli mesajlaşma.
        </p>
      </div>
      <MessagesClient threads={threads} />
    </div>
  );
}
