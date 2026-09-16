import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Building2,
  FileText,
  Inbox,
  LayoutGrid,
  LineChart,
  Megaphone,
  MessageCircle,
  Receipt,
  Stethoscope,
  TrendingUp,
  Zap,
} from "lucide-react";

export type NavGroup = "overview" | "crm" | "growth" | "ai" | "settings";

export type NavBadge = "pro" | "premium" | "ai";

export type NavItem = {
  href: string;
  labelKey: string;
  icon: LucideIcon;
  group: NavGroup;
  badge?: NavBadge;
};

export const NAV_ITEMS: NavItem[] = [
  {
    href: "/dashboard",
    labelKey: "nav.items.dashboard",
    icon: LayoutGrid,
    group: "overview",
  },
  {
    href: "/dashboard/requests",
    labelKey: "nav.items.requests",
    icon: Inbox,
    group: "overview",
  },
  {
    href: "/dashboard/consultations",
    labelKey: "nav.items.consultations",
    icon: FileText,
    group: "crm",
  },
  {
    href: "/dashboard/messages",
    labelKey: "nav.items.messages",
    icon: MessageCircle,
    group: "crm",
  },
  {
    href: "/dashboard/sponsorship",
    labelKey: "nav.items.sponsorship",
    icon: TrendingUp,
    group: "growth",
    badge: "premium",
  },
  {
    href: "/dashboard/campaigns",
    labelKey: "nav.items.campaigns",
    icon: Megaphone,
    group: "growth",
    badge: "pro",
  },
  {
    href: "/dashboard/forecasts",
    labelKey: "nav.items.forecasts",
    icon: LineChart,
    group: "ai",
    badge: "ai",
  },
  {
    href: "/dashboard/market-analysis",
    labelKey: "nav.items.market",
    icon: BarChart3,
    group: "ai",
    badge: "ai",
  },
  {
    href: "/dashboard/profile",
    labelKey: "nav.items.profile",
    icon: Building2,
    group: "settings",
  },
  {
    href: "/dashboard/doctors",
    labelKey: "nav.items.doctors",
    icon: Stethoscope,
    group: "settings",
  },
  {
    href: "/dashboard/finance",
    labelKey: "nav.items.finance",
    icon: Receipt,
    group: "settings",
  },
];

export const GROUP_ORDER: NavGroup[] = [
  "overview",
  "crm",
  "growth",
  "ai",
  "settings",
];

export const GROUP_LABEL: Record<NavGroup, string> = {
  overview: "nav.groups.overview",
  crm: "nav.groups.crm",
  growth: "nav.groups.growth",
  ai: "nav.groups.ai",
  settings: "nav.groups.settings",
};

type Translator = (key: string) => string;

export function getPageMeta(pathname: string, t: Translator): {
  title: string;
  description?: string;
} {
  if (pathname === "/dashboard") {
    return { title: t("pages.dashboard.title"), description: t("pages.dashboard.desc") };
  }
  if (pathname.startsWith("/dashboard/requests")) {
    return { title: t("pages.requests.title"), description: t("pages.requests.desc") };
  }
  if (pathname.startsWith("/dashboard/consultations")) {
    return { title: t("pages.consultations.title"), description: t("pages.consultations.desc") };
  }
  if (pathname.startsWith("/dashboard/messages")) {
    return { title: t("pages.messages.title"), description: t("pages.messages.desc") };
  }
  if (pathname.startsWith("/dashboard/sponsorship")) {
    return { title: t("pages.sponsorship.title"), description: t("pages.sponsorship.desc") };
  }
  if (pathname.startsWith("/dashboard/campaigns")) {
    return { title: t("pages.campaigns.title"), description: t("pages.campaigns.desc") };
  }
  if (pathname.startsWith("/dashboard/forecasts")) {
    return { title: t("pages.forecasts.title"), description: t("pages.forecasts.desc") };
  }
  if (pathname.startsWith("/dashboard/market-analysis")) {
    return { title: t("pages.market.title"), description: t("pages.market.desc") };
  }
  if (pathname.startsWith("/dashboard/profile")) {
    return { title: t("pages.profile.title"), description: t("pages.profile.desc") };
  }
  if (pathname.startsWith("/dashboard/doctors")) {
    return { title: t("pages.doctors.title"), description: t("pages.doctors.desc") };
  }
  if (pathname.startsWith("/dashboard/finance")) {
    return { title: t("pages.finance.title"), description: t("pages.finance.desc") };
  }
  return { title: t("pages.fallback.title") };
}

export const GROWTH_ENGINE_TAGLINE = {
  icon: Zap,
  labelKey: "nav.growthEngine",
};
