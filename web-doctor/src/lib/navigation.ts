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
  labelKey: string;
  icon: LucideIcon;
  badge?: number;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", labelKey: "nav.items.overview", icon: LayoutGrid },
  { href: "/dashboard/patients", labelKey: "nav.items.patients", icon: Users },
  { href: "/dashboard/calendar", labelKey: "nav.items.calendar", icon: Calendar },
  { href: "/dashboard/messages", labelKey: "nav.items.messages", icon: MessageSquare },
  { href: "/dashboard/profile", labelKey: "nav.items.profile", icon: UserCircle },
];

type Translator = (key: string) => string;

export function getPageMeta(pathname: string, t: Translator): {
  title: string;
  description?: string;
} {
  if (pathname === "/dashboard") {
    return { title: t("pages.dashboard.title"), description: t("pages.dashboard.desc") };
  }
  if (pathname.startsWith("/dashboard/patients/")) {
    return { title: t("pages.patientDetail.title"), description: t("pages.patientDetail.desc") };
  }
  if (pathname.startsWith("/dashboard/patients")) {
    return { title: t("pages.patients.title"), description: t("pages.patients.desc") };
  }
  if (pathname.startsWith("/dashboard/calendar")) {
    return { title: t("pages.calendar.title"), description: t("pages.calendar.desc") };
  }
  if (pathname.startsWith("/dashboard/messages")) {
    return { title: t("pages.messages.title"), description: t("pages.messages.desc") };
  }
  if (pathname.startsWith("/dashboard/profile")) {
    return { title: t("pages.profile.title"), description: t("pages.profile.desc") };
  }
  return { title: t("pages.fallback.title") };
}
