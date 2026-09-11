import { localizedMetadata } from "@/lib/seo";
import { DoctorsPage } from "@/components/pages/DoctorsPage";

export const generateMetadata = () => localizedMetadata("doctors");

export default function Page() {
  return <DoctorsPage />;
}
