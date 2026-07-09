import {
  Plane,
  Car,
  Video,
  Languages,
  BedDouble,
  Microscope,
  CalendarCheck,
  UserRound,
  Sparkles,
  Baby,
  ScanLine,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export function amenityIcon(label: string): LucideIcon {
  const l = label.toLocaleLowerCase("tr");
  if (l.includes("havaalanı") || l.includes("transfer")) return Plane;
  if (l.includes("otopark")) return Car;
  if (l.includes("online") || l.includes("konsült")) return Video;
  if (l.includes("dil") || l.includes("çok dilli")) return Languages;
  if (l.includes("konaklama")) return BedDouble;
  if (l.includes("laboratuvar")) return Microscope;
  if (l.includes("randevu") || l.includes("aynı gün")) return CalendarCheck;
  if (l.includes("danışman")) return UserRound;
  if (l.includes("gülüş") || l.includes("dijital")) return Sparkles;
  if (l.includes("4d") || l.includes("ultrason") || l.includes("tüp bebek"))
    return Baby;
  if (l.includes("mr") || l.includes("görüntüleme") || l.includes("cilt"))
    return ScanLine;
  return ShieldCheck;
}
