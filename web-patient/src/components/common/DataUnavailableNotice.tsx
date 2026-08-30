import { AlertTriangle } from "lucide-react";

/**
 * Canlı API başarısız olduğunda (yalnızca "live" data mode — bkz.
 * lib/config.ts) mock veriye düşmek YERİNE gösterilen, dürüst ve
 * kontrollü bir boş/error state. Gerçek klinik/doktor gibi görünen
 * hiçbir sahte içerik üretmez.
 */
export function DataUnavailableNotice({
  message = "Bu bilgiler şu anda görüntülenemiyor. Lütfen daha sonra tekrar deneyin.",
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center ${className ?? ""}`}
    >
      <AlertTriangle className="mx-auto h-8 w-8 text-slate-400" />
      <p className="mt-3 text-sm font-medium text-slate-600">{message}</p>
    </div>
  );
}
