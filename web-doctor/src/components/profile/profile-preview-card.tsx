import { Award, Globe2, GraduationCap } from "lucide-react";
import type { DoctorProfile } from "@/types";
import { Avatar } from "@/components/ui/avatar";
import { languageNames } from "@/lib/ui";

export function ProfilePreviewCard({ doctor }: { doctor: DoctorProfile }) {
  const activeDays = doctor.workingHours.filter((wh) => wh.isActive);

  return (
    <div className="card-surface sticky top-6 flex flex-col gap-5 p-6">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
        <Globe2 className="h-3.5 w-3.5" />
        Küresel Vitrin Önizlemesi
      </div>

      <div className="flex flex-col items-center gap-3 text-center">
        <Avatar name={doctor.fullName} size="xl" />
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {doctor.title} {doctor.fullName}
          </h3>
          <p className="text-sm text-slate-500">{doctor.specialty}</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Award className="h-3.5 w-3.5" />
          {doctor.yearsOfExperience} yıllık deneyim
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-1.5">
        {doctor.specialties.map((s) => (
          <span
            key={s}
            className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600"
          >
            {s}
          </span>
        ))}
      </div>

      <p className="text-center text-sm leading-relaxed text-slate-500">{doctor.bio}</p>

      <div className="border-t border-slate-100 pt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Konuşulan Diller
        </p>
        <div className="flex flex-wrap gap-1.5">
          {doctor.languages.map((lang) => (
            <span
              key={lang}
              className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary"
            >
              {languageNames[lang]}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
          <GraduationCap className="h-3.5 w-3.5" />
          Eğitim
        </p>
        <ul className="space-y-1 text-xs text-slate-500">
          {doctor.education.map((edu) => (
            <li key={edu}>{edu}</li>
          ))}
        </ul>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Hasta Kabul Saatleri
        </p>
        <ul className="space-y-1 text-xs text-slate-600">
          {activeDays.map((wh) => (
            <li key={wh.day} className="flex items-center justify-between">
              <span>{wh.day}</span>
              <span className="font-medium">
                {wh.startTime} – {wh.endTime}
              </span>
            </li>
          ))}
          {activeDays.length === 0 && (
            <li className="text-slate-400">Şu anda aktif hasta kabul günü yok</li>
          )}
        </ul>
      </div>
    </div>
  );
}
