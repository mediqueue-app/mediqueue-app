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

function iconFor(label: string): LucideIcon {
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

export function AmenityList({ amenities }: { amenities: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {amenities.map((a) => {
        const Icon = iconFor(a);
        return (
          <div
            key={a}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 transition-colors hover:border-[#3a6ad6]/30"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf0fc] text-[#3a6ad6]">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium text-slate-700">{a}</span>
          </div>
        );
      })}
    </div>
  );
}
