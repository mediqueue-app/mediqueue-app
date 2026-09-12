import { localizedMetadata } from "@/lib/seo";
import { ContactPage } from "@/components/pages/ContactPage";

export const generateMetadata = () => localizedMetadata("contact");

export default function Page() {
  return <ContactPage />;
}
