import { amenityIcon } from "@/components/clinics/amenity-icons";

export function AmenityList({ amenities }: { amenities: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {amenities.map((a) => {
        const Icon = amenityIcon(a);
        return (
          <div
            key={a}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 transition-colors hover:border-primary/30"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium text-slate-700">{a}</span>
          </div>
        );
      })}
    </div>
  );
}
