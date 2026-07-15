import {
  Activity,
  ClipboardList,
  FlaskConical,
  HeartPulse,
  Stethoscope,
} from "lucide-react";

type DemoEntry = {
  date: string;
  title: string;
  detail: string;
  type: "muayene" | "lab" | "prosedur" | "takip";
};

const BRANCH_ENTRIES: Record<string, DemoEntry[]> = {
  default: [
    {
      date: "2026-07-03",
      title: "Klinik muayene",
      detail: "Sistemik değerlendirme ve tedavi uygunluk kontrolü yapıldı.",
      type: "muayene",
    },
    {
      date: "2026-07-05",
      title: "Laboratuvar paneli",
      detail: "Kan sayımı, koagülasyon ve biyokimya sonuçları dosyaya eklendi.",
      type: "lab",
    },
    {
      date: "2026-07-10",
      title: "Tedavi planı onayı",
      detail: "Prosedür adımları, süre ve riskler hasta ile paylaşıldı.",
      type: "prosedur",
    },
    {
      date: "2026-07-14",
      title: "Kontrol takibi",
      detail: "İyileşme süreci izleniyor; bir sonraki seans planlandı.",
      type: "takip",
    },
  ],
  ivf: [
    {
      date: "2026-07-01",
      title: "IVF ön değerlendirme",
      detail: "Hormon paneli ve ultrason planı oluşturuldu.",
      type: "muayene",
    },
    {
      date: "2026-07-04",
      title: "AMH / FSH laboratuvarı",
      detail: "Sonuçlar referans aralığında; stimulasyon protokolü seçildi.",
      type: "lab",
    },
    {
      date: "2026-07-09",
      title: "Stimulasyon başlangıcı",
      detail: "İlaç protokolü başlatıldı; 48 saatlik takip planlandı.",
      type: "prosedur",
    },
    {
      date: "2026-07-13",
      title: "Folikül takibi",
      detail: "Ultrason kontrolü — gelişim beklenen aralıkta.",
      type: "takip",
    },
  ],
  hair_transplant: [
    {
      date: "2026-06-28",
      title: "Saç analizi",
      detail: "Donor alan yoğunluğu ölçüldü; greft tahmini yapıldı.",
      type: "muayene",
    },
    {
      date: "2026-07-02",
      title: "Operasyon planı",
      detail: "FUE protokolü ve greft dağılımı onaylandı.",
      type: "prosedur",
    },
    {
      date: "2026-07-11",
      title: "Post-op kontrol",
      detail: "Kızarıklık azaldı; yıkama protokolü devam.",
      type: "takip",
    },
  ],
  cardiology: [
    {
      date: "2026-07-01",
      title: "Kardiyoloji muayenesi",
      detail: "Anamnez ve dinleme bulguları kaydedildi.",
      type: "muayene",
    },
    {
      date: "2026-07-03",
      title: "EKG + efor testi",
      detail: "Efor testi sonuçları değerlendirildi; risk skoru düşük-orta.",
      type: "lab",
    },
    {
      date: "2026-07-09",
      title: "İlaç düzenlemesi",
      detail: "Antihipertansif doz ayarı yapıldı.",
      type: "prosedur",
    },
  ],
  aesthetic: [
    {
      date: "2026-07-02",
      title: "Estetik konsültasyon",
      detail: "Fotoğraf analizi ve hedef sonuç konuşuldu.",
      type: "muayene",
    },
    {
      date: "2026-07-06",
      title: "Pre-op lab paneli",
      detail: "CBC ve koagülasyon sonuçları dosyaya eklendi.",
      type: "lab",
    },
    {
      date: "2026-07-11",
      title: "Operasyon planı",
      detail: "Cerrahi yaklaşım ve anestezi tipi onaylandı.",
      type: "prosedur",
    },
    {
      date: "2026-07-14",
      title: "Hazırlık takibi",
      detail: "İlaç kesimi ve oruç talimatları hatırlatıldı.",
      type: "takip",
    },
  ],
  bariatric: [
    {
      date: "2026-06-20",
      title: "Bariatrik değerlendirme",
      detail: "BMI, komorbidite ve diyet öyküsü kaydedildi.",
      type: "muayene",
    },
    {
      date: "2026-06-25",
      title: "Metabolik panel",
      detail: "HbA1c ve lipid profili incelendi.",
      type: "lab",
    },
    {
      date: "2026-07-05",
      title: "Cerrahı planlama",
      detail: "Sleeve / by-pass seçenekleri hasta ile paylaşıldı.",
      type: "prosedur",
    },
    {
      date: "2026-07-12",
      title: "Diyetisyen takibi",
      detail: "Pre-op protein hedefi ve sıvı protokolü güncellendi.",
      type: "takip",
    },
  ],
  orthopedics: [
    {
      date: "2026-06-12",
      title: "Ortopedi muayenesi",
      detail: "Diz ROM ve ağrı skoru değerlendirildi.",
      type: "muayene",
    },
    {
      date: "2026-06-14",
      title: "MR incelemesi",
      detail: "Menisküs lezyonu doğrulandı; artroskopi endikasyonu.",
      type: "lab",
    },
    {
      date: "2026-06-15",
      title: "Diz artroskopisi",
      detail: "Prosedür tamamlandı; stabilite iyi.",
      type: "prosedur",
    },
    {
      date: "2026-07-08",
      title: "Fizik tedavi takibi",
      detail: "6. hafta programı; ev egzersizleri güncellendi.",
      type: "takip",
    },
  ],
};

const TYPE_META = {
  muayene: { label: "Muayene", icon: Stethoscope, tone: "bg-sky-50 text-sky-700" },
  lab: { label: "Lab", icon: FlaskConical, tone: "bg-amber-50 text-amber-700" },
  prosedur: {
    label: "Prosedür",
    icon: HeartPulse,
    tone: "bg-violet-50 text-violet-700",
  },
  takip: {
    label: "Takip",
    icon: Activity,
    tone: "bg-emerald-50 text-emerald-700",
  },
} as const;

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
  });
}

/** Branşa özel tıbbi kayıt — diş dışında odontogram yerine demo timeline */
export function MedicalRecordPlaceholder({
  branchLabel,
  branchKey,
}: {
  branchLabel: string;
  branchKey?: string;
}) {
  const entries =
    (branchKey && BRANCH_ENTRIES[branchKey]) || BRANCH_ENTRIES.default;

  const vitals = [
    { label: "Nabız", value: "72 bpm" },
    { label: "Tansiyon", value: "118/76" },
    { label: "SpO₂", value: "%98" },
    { label: "Ağırlık", value: "74 kg" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">Tıbbi kayıt</h3>
          <p className="mt-0.5 text-xs text-slate-500">
            {branchLabel} — klinik kayıt özeti (demo)
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white">
          <ClipboardList className="h-3.5 w-3.5" />
          {entries.length} kayıt
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {vitals.map((v) => (
          <div
            key={v.label}
            className="rounded-2xl border border-slate-100 bg-slate-50/80 px-3 py-3"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              {v.label}
            </p>
            <p className="mt-1 text-sm font-bold text-slate-900">{v.value}</p>
          </div>
        ))}
      </div>

      <ul className="space-y-3">
        {entries.map((entry) => {
          const meta = TYPE_META[entry.type];
          const Icon = meta.icon;
          return (
            <li
              key={`${entry.date}-${entry.title}`}
              className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <div className="w-12 shrink-0 text-center">
                <p className="text-lg font-bold leading-none text-slate-900">
                  {formatDate(entry.date).split(" ")[0]}
                </p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase text-slate-400">
                  {formatDate(entry.date).split(" ").slice(1).join(" ")}
                </p>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-slate-900">{entry.title}</p>
                  <span
                    className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${meta.tone}`}
                  >
                    <Icon className="h-3 w-3" />
                    {meta.label}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                  {entry.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="text-center text-[11px] text-slate-400">
        Demo tıbbi kayıt — branşa özel şablon. Diş hastalarında odontogram
        kullanılır.
      </p>
    </div>
  );
}
