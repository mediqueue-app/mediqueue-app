import { redirect } from "next/navigation";

export default function TurkishEntryPage() {
  redirect("/?lang=tr");
}
