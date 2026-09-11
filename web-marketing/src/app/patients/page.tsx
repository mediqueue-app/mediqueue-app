import type { Metadata } from "next";
import { PatientsPage } from "@/components/pages/PatientsPage";
import { content } from "@/content";

export const metadata: Metadata = {
  title: content.en.patients.seoTitle,
  description: content.en.patients.heroSub,
};

export default function Page() {
  return <PatientsPage />;
}
