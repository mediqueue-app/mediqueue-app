import { MessagesClient } from "@/components/messages/MessagesClient";
import { MessagesPageHeader } from "@/components/messages/MessagesPageHeader";
import { fetchChatThreads } from "@/lib/services/messages";

export default async function MessagesPage() {
  const threads = await fetchChatThreads();

  return (
    <div className="-mx-1 flex flex-col gap-5 lg:gap-6">
      <MessagesPageHeader threads={threads} />
      <MessagesClient threads={threads} />
    </div>
  );
}
