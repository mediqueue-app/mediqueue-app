"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  Calendar,
  CircleOff,
  Plus,
  Stethoscope,
} from "lucide-react";
import type {
  MedicalRecord,
  MedicalServiceType,
  ToothTreatmentRecord,
} from "@/types";
import { Odontogram } from "@/components/patients/Odontogram";
import { formatToothDateLabel, getToothName } from "@/lib/dental";
import { cn } from "@/lib/utils";

function DateBadge({ date }: { date: string }) {
  const { day, month } = formatToothDateLabel(date);
  return (
    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-full border-2 border-slate-200 bg-white shadow-sm">
      <span className="text-2xl font-bold leading-none text-slate-900">{day}</span>
      <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
        {month}
      </span>
    </div>
  );
}

function TreatmentCard({
  record,
  largeDate,
}: {
  record: ToothTreatmentRecord;
  largeDate?: boolean;
}) {
  const { day, month } = formatToothDateLabel(record.date);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex gap-4">
        {largeDate ? (
          <DateBadge date={record.date} />
        ) : (
          <div className="w-14 shrink-0 text-right">
            <p className="text-2xl font-bold leading-none text-slate-900">{day}</p>
            <p className="mt-0.5 text-xs font-semibold uppercase text-slate-500">
              {month}
            </p>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-2.5 text-sm">
              <p className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-amber-500" />
                <span>
                  <span className="text-slate-400">Kondisyon: </span>
                  <span className="font-medium text-slate-800">
                    {record.condition}
                  </span>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4 shrink-0 text-primary" />
                <span>
                  <span className="text-slate-400">Tedavi: </span>
                  <span className="font-medium text-slate-800">
                    {record.treatment}
                  </span>
                </span>
              </p>
              <p className="flex items-center gap-2 pl-6 text-slate-600">
                <span className="text-slate-400">Diş Hekimi: </span>
                <span className="font-medium text-slate-800">
                  {record.dentistName}
                </span>
              </p>
            </div>
            <span
              className={cn(
                "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold",
                record.status === "completed"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              )}
            >
              {record.status === "completed" ? "✓ Tamamlandı" : "⏳ Bekliyor"}
            </span>
          </div>
          {record.status === "pending" && record.pendingReason && (
            <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
              Sebep: {record.pendingReason}
            </p>
          )}
          {record.note && (
            <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
              {record.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function TreatmentSummary({
  count,
  latestDate,
}: {
  count: number;
  latestDate: string;
}) {
  const { day, month } = formatToothDateLabel(latestDate);
  return (
    <div className="mt-5 flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3">
      <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <p className="text-sm text-slate-600">
        <span className="font-medium text-slate-800">Genel Durum Özeti: </span>
        Bu diş toplamda {count} kez tedavi edildi, son işlem{" "}
        <span className="font-semibold text-slate-800">
          {day} {month}
        </span>
        .
      </p>
    </div>
  );
}

function EmptyToothState() {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-10 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
        <CircleOff className="h-7 w-7 text-slate-300" />
      </div>
      <p className="max-w-xs text-sm font-medium text-slate-600">
        Bu diş için tedavi geçmişi bulunmuyor
      </p>
      <p className="mt-1 text-xs text-slate-400">
        Sağlıklı diş — henüz kayıt eklenmemiş
      </p>
      <button
        type="button"
        className="mt-6 rounded-lg border border-primary px-5 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary-light"
      >
        Tedavi Kaydı Ekle
      </button>
    </div>
  );
}

export function MedicalRecordTab({
  medicalRecord,
}: {
  medicalRecord: MedicalRecord;
}) {
  const [serviceType, setServiceType] = useState<MedicalServiceType>(
    medicalRecord.serviceType
  );
  const [selectedTooth, setSelectedTooth] = useState<number | null>(() => {
    const withHistory = medicalRecord.teeth.find(
      (t) => t.treatmentHistory.length > 0
    );
    return withHistory?.toothNumber ?? medicalRecord.teeth[0]?.toothNumber ?? null;
  });

  const teethMap = useMemo(
    () => new Map(medicalRecord.teeth.map((t) => [t.toothNumber, t])),
    [medicalRecord.teeth]
  );

  const selectedRecord = selectedTooth ? teethMap.get(selectedTooth) : null;

  const sortedHistory = useMemo(() => {
    if (!selectedRecord) return [];
    return [...selectedRecord.treatmentHistory].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [selectedRecord]);

  return (
    <div className="flex flex-col gap-8 pt-2">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-slate-600">Servis</span>
        <div className="flex rounded-lg border border-slate-200 p-1">
          {(
            [
              { value: "medical" as const, label: "Medikal" },
              { value: "cosmetic" as const, label: "Kozmetik" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setServiceType(opt.value)}
              className={cn(
                "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
                serviceType === opt.value
                  ? "bg-primary text-white"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
        <div>
          <Odontogram
            teeth={medicalRecord.teeth}
            selectedTooth={selectedTooth}
            onSelectTooth={setSelectedTooth}
          />
        </div>

        <div className="flex min-h-[360px] flex-col">
          {selectedTooth && selectedRecord ? (
            <>
              <div className="mb-5 border-b border-slate-100 pb-4">
                <h3 className="text-base font-semibold text-slate-900">
                  {selectedTooth} numaralı diş
                </h3>
                <p className="mt-0.5 text-sm text-slate-500">
                  {getToothName(selectedTooth)}
                </p>
              </div>

              {sortedHistory.length === 0 ? (
                <EmptyToothState />
              ) : sortedHistory.length === 1 ? (
                <div className="flex flex-1 flex-col">
                  <TreatmentCard record={sortedHistory[0]} largeDate />
                  {selectedRecord.status !== "healthy" && (
                    <TreatmentSummary
                      count={1}
                      latestDate={sortedHistory[0].date}
                    />
                  )}
                  <button
                    type="button"
                    className="mt-6 inline-flex items-center justify-center gap-2 self-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                  >
                    <Plus className="h-4 w-4" />
                    Tedavi Kaydı Ekle
                  </button>
                </div>
              ) : (
                <ol className="relative space-y-2">
                  {sortedHistory.map((record, index) => {
                    const isLast = index === sortedHistory.length - 1;

                    return (
                      <li key={record.id} className="relative flex gap-4 pb-10">
                        {!isLast && (
                          <span
                            className="absolute left-[27px] top-12 h-[calc(100%-16px)] w-0.5 bg-slate-200"
                            aria-hidden
                          />
                        )}
                        <div className="w-14 shrink-0 pt-1 text-right">
                          <p className="text-2xl font-bold leading-none text-slate-900">
                            {formatToothDateLabel(record.date).day}
                          </p>
                          <p className="mt-0.5 text-xs font-semibold uppercase text-slate-500">
                            {formatToothDateLabel(record.date).month}
                          </p>
                        </div>
                        <div className="relative mt-2 flex h-3.5 w-3.5 shrink-0 rounded-full border-2 border-primary bg-white shadow-sm" />
                        <div className="min-w-0 flex-1">
                          <TreatmentCard record={record} />
                        </div>
                      </li>
                    );
                  })}
                </ol>
              )}
            </>
          ) : (
            <p className="mt-12 text-center text-sm text-slate-400">
              Detay görmek için odontogramdan bir diş seçin.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function MedicalRecordPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
      <p className="max-w-md text-sm text-slate-600">
        Bu tedavi türü için özel tıbbi kayıt görünümü yakında eklenecek.
      </p>
      <p className="mt-2 text-xs text-slate-400">
        Odontogram görünümü yalnızca diş hekimliği branşındaki hastalar için
        kullanılabilir.
      </p>
    </div>
  );
}
