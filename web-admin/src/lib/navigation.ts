import type { LucideIcon } from "lucide-react";
import {
  Building2,
  ClipboardCheck,
  LayoutGrid,
  LifeBuoy,
  Settings,
  Users,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  group: "Genel" | "Pazar Yeri" | "Sistem";
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Genel Bakış", icon: LayoutGrid, group: "Genel" },
  {
    href: "/dashboard/applications",
    label: "Başvurular",
    icon: ClipboardCheck,
    group: "Pazar Yeri",
  },
  {
    href: "/dashboard/clinics",
    label: "Klinikler",
    icon: Building2,
    group: "Pazar Yeri",
  },
  {
    href: "/dashboard/patients",
    label: "Hastalar",
    icon: Users,
    group: "Pazar Yeri",
  },
  {
    href: "/dashboard/feedback",
    label: "Destek Talepleri",
    icon: LifeBuoy,
    group: "Sistem",
  },
  {
    href: "/dashboard/settings",
    label: "Ayarlar",
    icon: Settings,
    group: "Sistem",
  },
];

export function getPageMeta(pathname: string): {
  title: string;
  description?: string;
} {
  if (pathname === "/dashboard") {
    return {
      title: "Genel Bakış",
      description: "Platformun canlı pazar yeri özeti",
    };
  }
  if (pathname.startsWith("/dashboard/applications")) {
    return {
      title: "Başvuru Yönetimi",
      description: "Klinik onay merkezi ve evrak incelemesi",
    };
  }
  if (pathname.startsWith("/dashboard/clinics")) {
    return {
      title: "Klinik Yönetimi",
      description: "Onaylı klinikler, görünürlük ve doktor kadrosu",
    };
  }
  if (pathname.startsWith("/dashboard/patients")) {
    return {
      title: "Hasta Yönetimi",
      description: "Platformdaki tüm hastalar ve durumları",
    };
  }
  if (pathname.startsWith("/dashboard/feedback")) {
    return {
      title: "Destek Talepleri",
      description: "Hasta ve kliniklerden gelen geri bildirimler",
    };
  }
  if (pathname.startsWith("/dashboard/settings")) {
    return {
      title: "Sistem Ayarları",
      description: "Komisyon oranları, vitrin ve platform yapılandırması",
    };
  }
  return { title: "Yönetim Paneli" };
}
