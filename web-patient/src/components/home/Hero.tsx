import { ShieldCheck, Users, Star } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { SearchBar } from "@/components/home/SearchBar";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <SmartImage
          src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=2000&q=80"
          alt="Modern klinik ortamı"
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/70" />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 md:py-32 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
          <ShieldCheck className="h-4 w-4" />
          Türkiye&apos;nin akredite sağlık pazaryeri
        </span>

        <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          Doğru kliniği ve doktoru
          <br className="hidden sm:block" /> saniyeler içinde bulun
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-200">
          Semptomunuza, şehrinize ve tarihinize göre en iyi uzmanları keşfedin.
          Şeffaf fiyatlar, gerçek yorumlar ve anında randevu.
        </p>

        <div className="mx-auto mt-10 max-w-4xl">
          <SearchBar />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-200">
          <span className="flex items-center gap-2">
            <Users className="h-4 w-4 text-white" /> 500.000+ mutlu hasta
          </span>
          <span className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> 4.9 / 5
            ortalama puan
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-white" /> JCI akrediteli klinikler
          </span>
        </div>
      </div>
    </section>
  );
}
