import { localizedMetadata } from "@/lib/seo";
import { HowPage } from "@/components/pages/HowPage";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";

export const generateMetadata = () => localizedMetadata("how");

export default function Page() {
  return (
    <>
      <FaqJsonLd />
      <HowPage />
    </>
  );
}
