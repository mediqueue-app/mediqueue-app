import { localizedMetadata } from "@/lib/seo";
import { TeamPage } from "@/components/pages/TeamPage";

export const generateMetadata = () => localizedMetadata("team");

export default function Page() {
  return <TeamPage />;
}
