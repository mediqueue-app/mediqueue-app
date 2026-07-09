import { Search, CalendarCheck, Stethoscope } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Arayın & Karşılaştırın",
    desc: "Semptom, şehir ve tarihe göre klinik ve doktorları filtreleyin, şeffaf fiyatları görün.",
  },
  {
    icon: CalendarCheck,
    title: "Randevu Alın",
    desc: "Uygun tarih ve saati seçin, saniyeler içinde ön ödemesiz randevu talebi oluşturun.",
  },
  {
    icon: Stethoscope,
    title: "Tedavi Olun",
    desc: "Kliniğe gidin, uzman hekiminizle görüşün ve ödemeyi yerinde yapın.",
  },
];

export function HowItWorks() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {STEPS.map((step, i) => (
        <div
          key={step.title}
          className="relative rounded-2xl border border-slate-200 bg-white p-6"
        >
          <span className="absolute right-5 top-5 text-4xl font-black text-slate-100">
            0{i + 1}
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf0fc] text-[#3a6ad6]">
            <step.icon className="h-6 w-6" />
          </span>
          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            {step.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
