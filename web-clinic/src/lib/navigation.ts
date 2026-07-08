import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  LayoutGrid,
  MessageSquareText,
  Settings,
  Stethoscope,
  Users,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Özet", icon: LayoutGrid },
  { href: "/dashboard/patients", label: "Hasta Talepleri", icon: Users },
  { href: "/dashboard/doctors", label: "Doktorlar", icon: Stethoscope },
  { href: "/dashboard/analytics", label: "Analitik", icon: BarChart3 },
  { href: "/dashboard/reviews", label: "Yorumlar", icon: MessageSquareText },
  { href: "/dashboard/settings", label: "Ayarlar", icon: Settings },
];

export function getPageMeta(pathname: string): {
  title: string;
  description?: string;
} {
  if (pathname === "/dashboard") {
    return {
      title: "Özet",
      description: "Kliniğinizin aylık performans özeti",
    };
  }
  if (pathname.startsWith("/dashboard/patients")) {
    return {
      title: "Hasta Talepleri",
      description: "Gelen talepleri değerlendirin ve yönetin",
    };
  }
  if (pathname.startsWith("/dashboard/doctors")) {
    return {
      title: "Doktorlar",
      description: "Kadro, müsaitlik ve performans",
    };
  }
  if (pathname.startsWith("/dashboard/analytics")) {
    return {
      title: "Analitik",
      description: "Dönüşüm, talep ve menşei analizi",
    };
  }
  if (pathname.startsWith("/dashboard/reviews")) {
    return {
      title: "Yorumlar",
      description: "Hasta geri bildirimleri ve AI özeti",
    };
  }
  if (pathname.startsWith("/dashboard/settings")) {
    return {
      title: "Ayarlar",
      description: "Klinik profili ve bildirim tercihleri",
    };
  }
  if (pathname.startsWith("/dashboard/billing")) {
    return {
      title: "Abonelik",
      description: "Plan karşılaştırma ve yükseltme",
    };
  }
  return { title: "Dashboard" };
}
