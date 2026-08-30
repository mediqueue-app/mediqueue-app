import Image from "next/image";
import { BadgeCheck } from "lucide-react";

/** Mirrors web-patient ClinicListCard structure. */
export function PatientClinicCardPreview() {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white sm:flex-row">
      <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-56">
        <Image
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
          alt="Anadolu Estetik & Cerrahi Merkezi — clinic cover from the patient app mock"
          fill
          className="object-cover"
          sizes="(min-width: 640px) 224px, 100vw"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-sm">
          <BadgeCheck className="h-3.5 w-3.5 text-primary" />
          Akredite
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="font-semibold text-slate-900">
          Anadolu Estetik & Cerrahi Merkezi
        </p>
        <p className="text-sm text-slate-500">Şişli, İstanbul</p>
        <p className="text-sm text-slate-600">Estetik & Plastik Cerrahi · Saç Ekimi</p>
        <p className="mt-auto text-sm font-semibold text-primary">
          ₺12.000 – ₺45.000
        </p>
      </div>
    </article>
  );
}
