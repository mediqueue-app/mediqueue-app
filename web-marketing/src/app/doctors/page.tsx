import type { Metadata } from "next";
import { DoctorsPage } from "@/components/pages/DoctorsPage";
import { content } from "@/content";

export const metadata: Metadata = {
  title: content.en.doctors.seoTitle,
};

export default function Page() {
  return <DoctorsPage />;
}
