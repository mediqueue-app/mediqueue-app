import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const FOOTER_LINKS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Hizmetler",
    links: [
      { label: "Tedaviler", href: "/treatments" },
      { label: "Klinikler", href: "/clinics" },
      { label: "Doktorlar", href: "/doctors" },
      { label: "Nasıl Çalışır?", href: "/how-it-works" },
    ],
  },
  {
    title: "Kurumsal",
    links: [
      { label: "Hakkımızda", href: "/how-it-works" },
      { label: "Kliniğinizi Ekleyin", href: "/clinics" },
      { label: "Kariyer", href: "/how-it-works" },
      { label: "İletişim", href: "/how-it-works" },
    ],
  },
  {
    title: "Yasal",
    links: [
      { label: "Gizlilik Politikası", href: "/how-it-works" },
      { label: "Kullanım Koşulları", href: "/how-it-works" },
      { label: "KVKK", href: "/how-it-works" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/mediqueue-logo.png"
                alt="MEDI·QUEUE"
                width={380}
                height={80}
                className="h-[4.375rem] w-auto object-contain object-left sm:h-20"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
              Türkiye&apos;nin akredite klinik ve doktorlarını tek çatı altında
              buluşturan sağlık pazaryeri. Şeffaf fiyatlarla güvenle randevu alın.
            </p>
            <div className="mt-5 space-y-2 text-sm text-slate-500">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#3a6ad6]" /> +90 850 000 00 00
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#3a6ad6]" /> destek@mediqueue.com
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#3a6ad6]" /> Levent, İstanbul
              </p>
            </div>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-slate-900">
                {group.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-[#3a6ad6]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} MEDI·QUEUE. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
