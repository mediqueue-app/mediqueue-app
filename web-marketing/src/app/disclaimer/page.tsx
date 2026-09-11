import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/LegalPage";
import { content } from "@/content";

export const metadata: Metadata = {
  title: content.en.legal.disclaimer.title,
  description: content.en.legal.disclaimer.intro,
};

export default function Page() {
  return <LegalPage kind="disclaimer" />;
}
