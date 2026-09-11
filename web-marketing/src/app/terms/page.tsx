import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/LegalPage";
import { content } from "@/content";

export const metadata: Metadata = {
  title: content.en.legal.terms.title,
  description: content.en.legal.terms.intro,
};

export default function Page() {
  return <LegalPage kind="terms" />;
}
