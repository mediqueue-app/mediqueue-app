import Link from "next/link";
import { ShieldCheck, CreditCard, Star, HeartPulse } from "lucide-react";
import { HowItWorks } from "@/components/home/HowItWorks";

export const metadata = {
  title: "Nasıl Çalışır? | MediQueue",
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Akredite Klinikler",
    desc: "Platformumuzdaki tüm klinikler titiz bir değerlendirme sürecinden geçer.",
  },
  {
    icon: CreditCard,
    title: "Şeffaf Fiyatlar",
    desc: "Gizli ücret yok. Randevu öncesi tüm fiyatları net biçimde görürsünüz.",
  },
  {
    icon: Star,
    title: "Gerçek Yorumlar",
    desc: "Sadece tedavi olan hastaların doğrulanmış değerlendirmeleri.",
  },
  {
    icon: HeartPulse,
    title: "Ön Ödemesiz Randevu",
    desc: "Randevu talebinizi ücretsiz oluşturun, ödemeyi klinikte yapın.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#3a6ad6]">
          Nasıl Çalışır?
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Sağlığınıza giden en kolay yol
        </h1>
        <p className="mt-3 text-slate-500">
          MediQueue, doğru kliniği bulmaktan randevu almaya kadar tüm süreci
          basitleştirir.
        </p>
      </header>

      <div className="mt-12">
        <HowItWorks />
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((v) => (
          <div
            key={v.title}
            className="rounded-2xl border border-slate-200 bg-white p-6"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf0fc] text-[#3a6ad6]">
              <v.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-semibold text-slate-900">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              {v.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 overflow-hidden rounded-3xl bg-[#3a6ad6] px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Bugün randevunuzu oluşturun
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-slate-100">
          Binlerce akredite klinik ve uzman hekim, sizi bekliyor.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/clinics"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#3a6ad6] transition-transform hover:scale-105"
          >
            Klinikleri Keşfet
          </Link>
          <Link
            href="/doctors"
            className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Doktorları Gör
          </Link>
        </div>
      </div>
    </div>
  );
}
