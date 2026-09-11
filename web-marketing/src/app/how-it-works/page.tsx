import { localizedMetadata } from "@/lib/seo";
import { HowPage } from "@/components/pages/HowPage";

export const generateMetadata = () => localizedMetadata("how");

export default function Page() {
  return <HowPage />;
}
