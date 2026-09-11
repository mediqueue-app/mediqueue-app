import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/LegalPage";
import { content } from "@/content";

export const metadata: Metadata = {
  title: content.en.legal.privacy.title,
  description: content.en.legal.privacy.intro,
};

export default function Page() {
  return <LegalPage kind="privacy" />;
}
