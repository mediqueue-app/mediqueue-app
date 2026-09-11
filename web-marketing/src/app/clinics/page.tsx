import type { Metadata } from "next";
import { ClinicsPage } from "@/components/pages/ClinicsPage";
import { content } from "@/content";

export const metadata: Metadata = {
  title: content.en.clinics.seoTitle,
  description: content.en.clinics.heroSub,
};

export default function Page() {
  return <ClinicsPage />;
}
