import { localizedMetadata } from "@/lib/seo";
import { PatientsPage } from "@/components/pages/PatientsPage";

export const generateMetadata = () => localizedMetadata("patients");

export default function Page() {
  return <PatientsPage />;
}
