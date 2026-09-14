import { localizedMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/pages/LegalPage";

export const generateMetadata = () => localizedMetadata("disclaimer");

export default function Page() {
  return <LegalPage kind="disclaimer" />;
}
