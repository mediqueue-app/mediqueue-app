import type { Metadata } from "next";
import { PatientsPage } from "@/components/pages/PatientsPage";
import { content } from "@/content";

export const metadata: Metadata = {
  title: content.tr.patients.seoTitle,
  description: content.tr.patients.heroSub,
};

export default function Page() {
  return <PatientsPage />;
}
