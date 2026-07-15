import { Languages, Star } from "lucide-react";
import type { Language } from "@/types";

export function ProfilePreviewCard({
  title,
  fullName,
  specialty,
  bio,
  languages,
  avatarInitials,
  rating,
  reviewCount,
}: {
  title: string;
  fullName: string;
  specialty: string;
  bio: string;
  languages: Language[];
  avatarInitials: string;
  rating: number;
  reviewCount: number;
}) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="border-b border-slate-100 bg-gradient-to-r from-primary-light/60 via-white to-sky-50/50 px-4 py-3.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
          Canlı Önizleme
        </p>
        <p className="text-[11px] text-slate-500">Hastaların gördüğü profil kartı</p>
      </div>

      <div className="p-5">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-hover text-2xl font-bold text-white shadow-lg shadow-primary/25">
            {avatarInitials}
          </div>
          <h3 className="font-display mt-3 text-xl tracking-tight text-slate-900">
            {title} {fullName}
          </h3>
          <p className="mt-1 text-sm text-slate-500">{specialty}</p>

          <div className="mt-2 flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-slate-800">
              {rating.toFixed(1)}
            </span>
            <span className="text-xs text-slate-400">({reviewCount})</span>
          </div>

          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {languages.map((lang) => (
              <span
                key={lang}
                className="rounded-md bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        {bio.trim() && (
          <div className="mt-5 rounded-xl bg-slate-50 p-3">
            <p className="text-xs leading-relaxed text-slate-600">{bio}</p>
          </div>
        )}

        <div className="mt-4 flex items-start gap-2 rounded-xl border border-sky-100 bg-sky-50/80 px-3 py-2.5">
          <Languages className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-600" />
          <p className="text-[11px] leading-relaxed text-sky-800">
            Hasta kendi dilinde yazabilir; siz Türkçe okursunuz. Yanıtınız hastanın
            diline çevrilir.
          </p>
        </div>
      </div>
    </div>
  );
}
