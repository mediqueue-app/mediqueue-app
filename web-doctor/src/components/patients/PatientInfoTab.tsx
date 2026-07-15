import type { ReactNode } from "react";
import {
  FileText,
  Globe,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
} from "lucide-react";
import type { Patient } from "@/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { countryCodeToFlagEmoji } from "@/lib/utils";

const DOC_LABELS: Record<string, string> = {
  PASAPORT: "Pasaport",
  TIBBI_RAPOR: "Tıbbi Rapor",
  RONTGEN: "Röntgen / Görüntüleme",
  VIZE: "Vize Belgesi",
};

const LANG_LABEL: Record<string, string> = {
  TR: "Türkçe",
  EN: "English",
  AR: "العربية",
  RU: "Русский",
  DE: "Deutsch",
  FR: "Français",
};

export function PatientInfoTab({ patient }: { patient: Patient }) {
  return (
    <div className="space-y-8">
      <div>
        <SectionTitle
          icon={<User className="h-4 w-4" />}
          title="Kimlik & iletişim"
          subtitle="Demo hasta kartı — klinik operasyon için temel bilgiler"
        />
        <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <InfoTile label="Ad Soyad" value={patient.fullName} />
          <InfoTile label="Yaş" value={String(patient.age)} />
          <InfoTile label="Cinsiyet" value={patient.gender} />
          <InfoTile
            label="Uyruk"
            value={`${countryCodeToFlagEmoji(patient.countryCode)} ${patient.nationality}`}
          />
          <InfoTile
            label="Telefon"
            value={patient.phone}
            icon={<Phone className="h-3.5 w-3.5" />}
          />
          <InfoTile
            label="E-posta"
            value={patient.email}
            icon={<Mail className="h-3.5 w-3.5" />}
          />
          <InfoTile label="Branş" value={patient.treatmentType} />
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Durum
            </dt>
            <dd className="mt-1.5">
              <StatusBadge status={patient.treatmentStatus} variant="treatment" />
            </dd>
          </div>
          {patient.address && (
            <InfoTile
              label="Adres"
              value={patient.address}
              icon={<MapPin className="h-3.5 w-3.5" />}
              className="sm:col-span-2 lg:col-span-3"
            />
          )}
        </dl>
      </div>

      <div>
        <SectionTitle
          icon={<Globe className="h-4 w-4" />}
          title="Diller & çeviri"
          subtitle="Hasta kendi dilinde yazar; doktor portalında Türkçe görünür"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {patient.languages.map((lang) => (
            <span
              key={lang}
              className="inline-flex items-center gap-2 rounded-xl border border-sky-100 bg-sky-50 px-3.5 py-2 text-sm font-semibold text-sky-800"
            >
              <span className="rounded-md bg-sky-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-sky-700">
                {lang}
              </span>
              {LANG_LABEL[lang] ?? lang}
            </span>
          ))}
        </div>
      </div>

      <div>
        <SectionTitle
          icon={<FileText className="h-4 w-4" />}
          title="Belgeler"
          subtitle="Klinik doğrulama ve tedavi planı için yüklenen dosyalar"
        />
        <div className="mt-3 mb-4 flex items-start gap-2 rounded-xl bg-primary-light/60 px-3.5 py-2.5 text-xs text-primary">
          <Shield className="mt-0.5 h-4 w-4 shrink-0" />
          Bu belgeler yalnızca sizinle ve klinik yönetimiyle paylaşılır. KVKK kapsamında
          korunur.
        </div>
        <ul className="space-y-2">
          {patient.documents.map((doc) => (
            <li
              key={doc.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-3.5 transition hover:border-primary/20 hover:bg-white"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800">
                  {DOC_LABELS[doc.type] ?? doc.type}
                </p>
                <p className="mt-0.5 truncate text-xs text-slate-400">
                  {doc.fileName} · {doc.fileSizeKb} KB
                </p>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-sm hover:border-primary/30 hover:text-primary"
              >
                Görüntüle
              </button>
            </li>
          ))}
          {patient.documents.length === 0 && (
            <p className="text-sm text-slate-400">Henüz belge yüklenmemiş.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

function SectionTitle({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-hover text-white">
        {icon}
      </div>
      <div>
        <h3 className="font-display text-xl tracking-tight text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

function InfoTile({
  label,
  value,
  icon,
  className,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 ${className ?? ""}`}
    >
      <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </dt>
      <dd className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-800">
        {icon && <span className="text-slate-400">{icon}</span>}
        {value}
      </dd>
    </div>
  );
}
