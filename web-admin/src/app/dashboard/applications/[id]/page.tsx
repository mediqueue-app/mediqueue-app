"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  Eye,
  FileCheck2,
  FileText,
  Globe,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  X,
  XCircle,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getApplicationById } from "@/lib/mock-data";
import type { ClinicDocument } from "@/types";
import { formatDateTr } from "@/lib/utils";

type Decision = "pending" | "approved" | "rejected";

export default function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const application = getApplicationById(id);

  const [decision, setDecision] = useState<Decision>(
    application?.status ?? "pending"
  );
  const [preview, setPreview] = useState<ClinicDocument | null>(null);
  const [modal, setModal] = useState<"approve" | "reject" | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  if (!application) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <p className="text-lg font-semibold text-slate-900">
          Başvuru bulunamadı
        </p>
        <Link
          href="/dashboard/applications"
          className="text-sm font-semibold text-primary hover:text-primary-hover"
        >
          Başvuru listesine dön
        </Link>
      </div>
    );
  }

  function confirmApprove() {
    setDecision("approved");
    setModal(null);
  }

  function confirmReject() {
    setDecision("rejected");
    setModal(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/dashboard/applications"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Başvurular
        </Link>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-primary">
            <Building2 className="h-7 w-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {application.clinicName}
              </h1>
              {decision === "pending" && (
                <StatusBadge label="İnceleniyor" tone="warning" />
              )}
              {decision === "approved" && (
                <StatusBadge label="Onaylandı" tone="success" />
              )}
              {decision === "rejected" && (
                <StatusBadge label="Reddedildi" tone="danger" />
              )}
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {application.id} · {formatDateTr(application.submittedAt)} tarihinde
              başvurdu
            </p>
          </div>
        </div>

        {decision === "pending" && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setModal("reject")}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
            >
              <XCircle className="h-4 w-4" />
              Reddet
            </button>
            <button
              type="button"
              onClick={() => setModal("approve")}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/25 transition-colors hover:bg-primary-hover"
            >
              <CheckCircle2 className="h-4 w-4" />
              Onayla ve Giriş Bilgisi Gönder
            </button>
          </div>
        )}
      </div>

      {decision === "approved" && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
          <FileCheck2 className="h-5 w-5 shrink-0" />
          <span>
            <strong>{application.clinicName}</strong> onaylandı. Giriş bilgileri{" "}
            <strong>{application.email}</strong> adresine gönderildi ve klinik
            pazar yerinde yayınlandı.
          </span>
        </div>
      )}
      {decision === "rejected" && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">
          <XCircle className="h-5 w-5 shrink-0" />
          <span>
            Bu başvuru reddedildi. Başvuru sahibine bilgilendirme e-postası
            iletildi.
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-slate-900">
                Yüklenen Evraklar
              </h2>
            </div>
            <ul className="space-y-3">
              {application.documents.map((doc) => (
                <li
                  key={doc.id}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 p-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                    {doc.type === "accreditation" ? (
                      <Award className="h-5 w-5" />
                    ) : (
                      <FileText className="h-5 w-5" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {doc.label}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {doc.fileName} · {doc.fileSizeKb} KB
                    </p>
                  </div>
                  <StatusBadge
                    label={doc.status === "verified" ? "Doğrulandı" : "Bekliyor"}
                    tone={doc.status === "verified" ? "success" : "neutral"}
                  />
                  <button
                    type="button"
                    onClick={() => setPreview(doc)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    İncele
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-slate-900">
              Klinik Hakkında
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              {application.about}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {application.specialties.map((sp) => (
                <span
                  key={sp}
                  className="rounded-lg bg-primary-light px-3 py-1 text-xs font-semibold text-primary"
                >
                  {sp}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-6">
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Başvuru Bilgileri
            </h2>
            <dl className="space-y-4 text-sm">
              <InfoRow icon={ShieldCheck} label="Yetkili" value={`${application.contactName} · ${application.contactRole}`} />
              <InfoRow icon={Mail} label="E-posta" value={application.email} />
              <InfoRow icon={Phone} label="Telefon" value={application.phone} />
              <InfoRow icon={MapPin} label="Konum" value={`${application.city}, ${application.country}`} />
              <InfoRow icon={Globe} label="Web Sitesi" value={application.website} />
              <InfoRow icon={FileText} label="Vergi No" value={application.taxId} />
              <InfoRow icon={Calendar} label="Kuruluş" value={`${application.foundedYear} · ${application.bedCount} yatak`} />
            </dl>
          </section>

          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Kalite Kontrol Listesi
            </h2>
            <ul className="space-y-2.5 text-sm">
              {[
                "Yasal evraklar eksiksiz",
                "Akreditasyon geçerli",
                "İletişim bilgileri doğrulandı",
                "Uzmanlık alanları uygun",
              ].map((item, i) => (
                <li key={item} className="flex items-center gap-2.5 text-slate-600">
                  <CheckCircle2
                    className={
                      i < 3 ? "h-4 w-4 text-emerald-500" : "h-4 w-4 text-slate-300"
                    }
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {preview && (
        <Modal onClose={() => setPreview(null)}>
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-slate-900">{preview.label}</h3>
            </div>
            <button type="button" onClick={() => setPreview(null)} aria-label="Kapat">
              <X className="h-5 w-5 text-slate-400 hover:text-slate-600" />
            </button>
          </div>
          <div className="flex h-80 flex-col items-center justify-center gap-3 bg-slate-50 text-slate-400">
            <FileText className="h-16 w-16" strokeWidth={1.25} />
            <p className="text-sm font-medium">{preview.fileName}</p>
            <p className="text-xs">Belge önizlemesi (demo)</p>
          </div>
          <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-4">
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Kapat
            </button>
          </div>
        </Modal>
      )}

      {modal === "approve" && (
        <Modal onClose={() => setModal(null)}>
          <div className="p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Send className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Başvuruyu onayla
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              <strong>{application.clinicName}</strong> onaylanacak ve{" "}
              <strong>{application.email}</strong> adresine otomatik oluşturulan
              yönetici giriş bilgileri gönderilecek. Klinik pazar yerinde
              yayınlanacak.
            </p>
          </div>
          <div className="flex justify-end gap-2 border-t border-slate-100 px-6 py-4">
            <button
              type="button"
              onClick={() => setModal(null)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Vazgeç
            </button>
            <button
              type="button"
              onClick={confirmApprove}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-primary/25 hover:bg-primary-hover"
            >
              <CheckCircle2 className="h-4 w-4" />
              Onayla ve Gönder
            </button>
          </div>
        </Modal>
      )}

      {modal === "reject" && (
        <Modal onClose={() => setModal(null)}>
          <div className="p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <XCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Başvuruyu reddet
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Ret gerekçesi başvuru sahibine e-posta ile iletilecektir.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
              placeholder="Örn. JCI akreditasyon belgesi güncel değil..."
              className="mt-4 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <div className="flex justify-end gap-2 border-t border-slate-100 px-6 py-4">
            <button
              type="button"
              onClick={() => setModal(null)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Vazgeç
            </button>
            <button
              type="button"
              onClick={confirmReject}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-red-600/25 hover:bg-red-700"
            >
              <XCircle className="h-4 w-4" />
              Reddet
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
      <div className="min-w-0">
        <dt className="text-xs text-slate-400">{label}</dt>
        <dd className="truncate font-medium text-slate-700">{value}</dd>
      </div>
    </div>
  );
}

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="Kapat"
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        {children}
      </div>
    </div>
  );
}
