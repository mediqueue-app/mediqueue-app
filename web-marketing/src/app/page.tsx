import { localizedMetadata } from "@/lib/seo";
import { HomePage } from "@/components/pages/HomePage";

export const generateMetadata = () => localizedMetadata("home");

export default function Page() {
  return <HomePage />;
}
