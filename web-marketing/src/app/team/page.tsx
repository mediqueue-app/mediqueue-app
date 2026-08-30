import type { Metadata } from "next";
import { TeamPage } from "@/components/pages/TeamPage";
import { content } from "@/content";

export const metadata: Metadata = {
  title: content.en.team.seoTitle,
};

export default function Page() {
  return <TeamPage />;
}
