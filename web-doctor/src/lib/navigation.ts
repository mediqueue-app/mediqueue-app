import type { LucideIcon } from "lucide-react";
import {
  Calendar,
  LayoutGrid,
  MessageSquare,
  UserCircle,
  Users,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Özet", icon: LayoutGrid },
  { href: "/dashboard/patients", label: "Hastalarım", icon: Users },
  { href: "/dashboard/calendar", label: "Takvim", icon: Calendar },
  { href: "/dashboard/messages", label: "Mesajlar", icon: MessageSquare },
  { href: "/dashboard/profile", label: "Profil", icon: UserCircle },
];

export function getPageMeta(pathname: string): {
  title: string;
  description?: string;
} {
  if (pathname === "/dashboard") {
    return { title: "Özet", description: "Günlük program ve hasta özeti" };
  }
  if (pathname.startsWith("/dashboard/patients/")) {
    return { title: "Hasta Detayı", description: "Tedavi süreci ve kayıtlar" };
  }
  if (pathname.startsWith("/dashboard/patients")) {
    return { title: "Hastalarım", description: "Hasta listesi ve tedavi takibi" };
  }
  if (pathname.startsWith("/dashboard/calendar")) {
    return { title: "Takvim", description: "Randevu programı ve müsaitlik" };
  }
  if (pathname.startsWith("/dashboard/messages")) {
    return { title: "Mesajlar", description: "Hasta iletişimi" };
  }
  if (pathname.startsWith("/dashboard/profile")) {
    return { title: "Profil", description: "Doktor profil ayarları" };
  }
  return { title: "Dashboard" };
}
