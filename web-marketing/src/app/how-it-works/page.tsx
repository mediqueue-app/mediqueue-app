import type { Metadata } from "next";
import { HowPage } from "@/components/pages/HowPage";
import { content } from "@/content";

export const metadata: Metadata = {
  title: content.en.how.seoTitle,
};

export default function Page() {
  return <HowPage />;
}
