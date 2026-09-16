import type { LucideIcon } from "lucide-react";
import {
  Building2,
  ClipboardCheck,
  LayoutGrid,
  LifeBuoy,
  Settings,
  Users,
} from "lucide-react";

export type NavGroup = "genel" | "marketplace" | "system";

export type NavItem = {
  href: string;
  labelKey: string;
  icon: LucideIcon;
  group: NavGroup;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", labelKey: "nav.items.overview", icon: LayoutGrid, group: "genel" },
  {
    href: "/dashboard/applications",
    labelKey: "nav.items.applications",
    icon: ClipboardCheck,
    group: "marketplace",
  },
  {
    href: "/dashboard/clinics",
    labelKey: "nav.items.clinics",
    icon: Building2,
    group: "marketplace",
  },
  {
    href: "/dashboard/patients",
    labelKey: "nav.items.patients",
    icon: Users,
    group: "marketplace",
  },
  {
    href: "/dashboard/feedback",
    labelKey: "nav.items.feedback",
    icon: LifeBuoy,
    group: "system",
  },
  {
    href: "/dashboard/settings",
    labelKey: "nav.items.settings",
    icon: Settings,
    group: "system",
  },
];

export const GROUP_ORDER: NavGroup[] = ["genel", "marketplace", "system"];

export const GROUP_LABEL: Record<NavGroup, string> = {
  genel: "nav.groups.genel",
  marketplace: "nav.groups.marketplace",
  system: "nav.groups.system",
};

type Translator = (key: string) => string;

export function getPageMeta(pathname: string, t: Translator): {
  title: string;
  description?: string;
} {
  if (pathname === "/dashboard") {
    return { title: t("pages.dashboard.title"), description: t("pages.dashboard.desc") };
  }
  if (pathname.startsWith("/dashboard/applications")) {
    return { title: t("pages.applications.title"), description: t("pages.applications.desc") };
  }
  if (pathname.startsWith("/dashboard/clinics")) {
    return { title: t("pages.clinics.title"), description: t("pages.clinics.desc") };
  }
  if (pathname.startsWith("/dashboard/patients")) {
    return { title: t("pages.patients.title"), description: t("pages.patients.desc") };
  }
  if (pathname.startsWith("/dashboard/feedback")) {
    return { title: t("pages.feedback.title"), description: t("pages.feedback.desc") };
  }
  if (pathname.startsWith("/dashboard/settings")) {
    return { title: t("pages.settings.title"), description: t("pages.settings.desc") };
  }
  return { title: t("pages.fallback.title") };
}
