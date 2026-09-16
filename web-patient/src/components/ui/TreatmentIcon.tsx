import {
  Stethoscope,
  Smile,
  Eye,
  Scissors,
  Sparkles,
  Bone,
  HeartPulse,
  Baby,
  Brain,
  Activity,
  type LucideIcon,
} from "lucide-react";
import type { Treatment } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

/** Lucide UI set for treatment categories — not brand chrome.
 *  Unknown names fall back to Stethoscope (generic; replace with brand pictograms). */
const ICONS: Record<Treatment["icon"], LucideIcon> = {
  Stethoscope,
  Smile,
  Eye,
  Scissors,
  Sparkles,
  Bone,
  HeartPulse,
  Baby,
  Brain,
  Activity,
};

export function TreatmentIcon({
  name,
  className,
}: {
  name: Treatment["icon"];
  className?: string;
}) {
  const Icon = ICONS[name] ?? Stethoscope;
  return <Icon className={cn("h-6 w-6", className)} />;
}
