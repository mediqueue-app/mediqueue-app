import { Stethoscope } from "lucide-react";

export function MedicalRecordPlaceholder({
  branchLabel,
}: {
  branchLabel: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
        <Stethoscope className="h-6 w-6 text-slate-400" />
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-700">
        Bu tedavi türü için özel görünüm yakında eklenecek
      </p>
      <p className="mt-2 max-w-md text-xs leading-relaxed text-slate-500">
        <span className="font-medium text-slate-600">{branchLabel}</span> branşı
        için branşa özel tıbbi kayıt şablonu Ay 2&apos;de eklenecektir. Diş
        hastalarında odontogram ve diş bazlı tedavi geçmişi kullanılabilir.
      </p>
    </div>
  );
}
