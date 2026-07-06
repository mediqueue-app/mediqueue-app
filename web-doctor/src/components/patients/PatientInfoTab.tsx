import { Mail, Phone, Shield } from "lucide-react";
import type { Patient } from "@/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { countryCodeToFlagEmoji } from "@/lib/utils";

const DOC_LABELS: Record<string, string> = {
  PASAPORT: "Pasaport",
  TIBBI_RAPOR: "Tıbbi Rapor",
  RONTGEN: "Röntgen / Görüntüleme",
  VIZE: "Vize Belgesi",
};

export function PatientInfoTab({ patient }: { patient: Patient }) {
  return (
    <div className="space-y-8">
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium uppercase text-slate-400">Ad Soyad</dt>
          <dd className="mt-1 text-sm font-medium text-slate-900">{patient.fullName}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-slate-400">Yaş</dt>
          <dd className="mt-1 text-sm text-slate-800">{patient.age}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-slate-400">Cinsiyet</dt>
          <dd className="mt-1 text-sm text-slate-800">{patient.gender}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-slate-400">Uyruk</dt>
          <dd className="mt-1 text-sm text-slate-800">
            {countryCodeToFlagEmoji(patient.countryCode)} {patient.nationality}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-slate-400">Telefon</dt>
          <dd className="mt-1 flex items-center gap-1.5 text-sm text-slate-800">
            <Phone className="h-3.5 w-3.5 text-slate-400" />
            {patient.phone}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-slate-400">E-posta</dt>
          <dd className="mt-1 flex items-center gap-1.5 text-sm text-slate-800">
            <Mail className="h-3.5 w-3.5 text-slate-400" />
            {patient.email}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-slate-400">Branş</dt>
          <dd className="mt-1 text-sm text-slate-800">{patient.treatmentType}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase text-slate-400">Durum</dt>
          <dd className="mt-1">
            <StatusBadge status={patient.treatmentStatus} variant="treatment" />
          </dd>
        </div>
        {patient.address && (
          <div className="sm:col-span-2">
            <dt className="text-xs font-medium uppercase text-slate-400">Adres</dt>
            <dd className="mt-1 text-sm text-slate-800">{patient.address}</dd>
          </div>
        )}
        <div className="sm:col-span-2">
          <dt className="text-xs font-medium uppercase text-slate-400">Konuşulan Diller</dt>
          <dd className="mt-1 text-sm text-slate-800">{patient.languages.join(", ")}</dd>
        </div>
      </dl>

      <section>
        <h3 className="text-sm font-semibold text-slate-900">Belgeler</h3>
        <div className="mt-3 mb-3 flex items-start gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-800">
          <Shield className="mt-0.5 h-4 w-4 shrink-0" />
          Bu belgeler yalnızca sizinle ve klinik yönetimiyle paylaşılmaktadır. KVKK
          kapsamında korunmaktadır.
        </div>
        <ul className="space-y-2">
          {patient.documents.map((doc) => (
            <li
              key={doc.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-slate-800">
                  {DOC_LABELS[doc.type] ?? doc.type}
                </p>
                <p className="text-xs text-slate-400">
                  {doc.fileName} · {doc.fileSizeKb} KB
                </p>
              </div>
              <button
                type="button"
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Görüntüle
              </button>
            </li>
          ))}
          {patient.documents.length === 0 && (
            <p className="text-sm text-slate-400">Henüz belge yüklenmemiş.</p>
          )}
        </ul>
      </section>
    </div>
  );
}
