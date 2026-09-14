import { localizedMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/pages/LegalPage";

export const generateMetadata = () => localizedMetadata("privacy");

export default function Page() {
  return <LegalPage kind="privacy" />;
}
