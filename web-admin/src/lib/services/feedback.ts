import { tickets } from "@/lib/mock-data";

export async function fetchTickets() {
  return tickets;
}

export function getOpenTicketCountSync() {
  return tickets.filter((t) => t.status === "open").length;
}
