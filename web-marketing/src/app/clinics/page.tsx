import { localizedMetadata } from "@/lib/seo";
import { ClinicsPage } from "@/components/pages/ClinicsPage";

export const generateMetadata = () => localizedMetadata("clinics");

export default function Page() {
  return <ClinicsPage />;
}
