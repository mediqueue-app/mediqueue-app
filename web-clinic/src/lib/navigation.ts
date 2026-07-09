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
  TrendingUp,
  Zap,
} from "lucide-react";

export type NavGroup =
  | "Genel Bakış"
  | "Hasta Yönetimi & CRM"
  | "Büyüme & Pazarlama"
  | "Veri & Yapay Zeka"
  | "Ayarlar";

export type NavBadge = "pro" | "premium" | "ai";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  group: NavGroup;
  badge?: NavBadge;
};

export const NAV_ITEMS: NavItem[] = [
  // 1. Genel Bakış
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutGrid,
    group: "Genel Bakış",
  },
  {
    href: "/dashboard/requests",
    label: "Randevu Talepleri",
    icon: Inbox,
    group: "Genel Bakış",
  },

  // 2. Hasta Yönetimi & CRM
  {
    href: "/dashboard/consultations",
    label: "Ön Konsültasyon & Teklifler",
    icon: FileText,
    group: "Hasta Yönetimi & CRM",
  },
  {
    href: "/dashboard/messages",
    label: "Hasta Mesajları",
    icon: MessageCircle,
    group: "Hasta Yönetimi & CRM",
  },

  // 3. Büyüme & Pazarlama
  {
    href: "/dashboard/sponsorship",
    label: "Vitrin & Sponsorluk",
    icon: TrendingUp,
    group: "Büyüme & Pazarlama",
    badge: "premium",
  },
  {
    href: "/dashboard/campaigns",
    label: "Kampanya Yönetimi",
    icon: Megaphone,
    group: "Büyüme & Pazarlama",
    badge: "pro",
  },

  // 4. Veri & Yapay Zeka
  {
    href: "/dashboard/forecasts",
    label: "Talep Öngörüleri",
    icon: LineChart,
    group: "Veri & Yapay Zeka",
    badge: "ai",
  },
  {
    href: "/dashboard/market-analysis",
    label: "Rakip & Pazar Analizi",
    icon: BarChart3,
    group: "Veri & Yapay Zeka",
    badge: "ai",
  },

  // 5. Ayarlar
  {
    href: "/dashboard/profile",
    label: "Klinik Profili & Belgeler",
    icon: Building2,
    group: "Ayarlar",
  },
  {
    href: "/dashboard/finance",
    label: "Finans & Komisyonlar",
    icon: Receipt,
    group: "Ayarlar",
  },
];

export const GROUP_ORDER: NavGroup[] = [
  "Genel Bakış",
  "Hasta Yönetimi & CRM",
  "Büyüme & Pazarlama",
  "Veri & Yapay Zeka",
  "Ayarlar",
];

export function getPageMeta(pathname: string): {
  title: string;
  description?: string;
} {
  if (pathname === "/dashboard") {
    return {
      title: "Dashboard",
      description: "Kliniğinizin platform üzerindeki canlı performansı",
    };
  }
  if (pathname.startsWith("/dashboard/requests")) {
    return {
      title: "Randevu Talepleri",
      description: "Platformdan gelen hasta taleplerini yönetin",
    };
  }
  if (pathname.startsWith("/dashboard/consultations")) {
    return {
      title: "Ön Konsültasyon & Teklifler",
      description: "Fotoğraf ve belgelere fiyat teklifi verin",
    };
  }
  if (pathname.startsWith("/dashboard/messages")) {
    return {
      title: "Hasta Mesajları",
      description: "Otomatik çeviri destekli hasta iletişimi",
    };
  }
  if (pathname.startsWith("/dashboard/sponsorship")) {
    return {
      title: "Vitrin & Sponsorluk",
      description: "Arama sonuçlarında üst sıralara çıkın",
    };
  }
  if (pathname.startsWith("/dashboard/campaigns")) {
    return {
      title: "Kampanya Yönetimi",
      description: "Sezonsal indirim ve promosyon kampanyaları",
    };
  }
  if (pathname.startsWith("/dashboard/forecasts")) {
    return {
      title: "Talep Öngörüleri",
      description: "Gelecek ayların talep trend analizi",
    };
  }
  if (pathname.startsWith("/dashboard/market-analysis")) {
    return {
      title: "Rakip & Pazar Analizi",
      description: "Pazardaki ortalamalarla kıyaslama",
    };
  }
  if (pathname.startsWith("/dashboard/profile")) {
    return {
      title: "Klinik Profili & Belgeler",
      description: "JCI ve diğer akreditasyon belgeleri",
    };
  }
  if (pathname.startsWith("/dashboard/finance")) {
    return {
      title: "Finans & Komisyonlar",
      description: "Platform komisyonları ve gelir özeti",
    };
  }
  // Legacy routes
  if (pathname.startsWith("/dashboard/showcase")) {
    return {
      title: "Klinik Profili & Belgeler",
      description: "JCI ve diğer akreditasyon belgeleri",
    };
  }
  if (pathname.startsWith("/dashboard/doctors")) {
    return {
      title: "Doktor Kadrosu",
      description: "Platformda listelenen hekimlerinizi yönetin",
    };
  }
  return { title: "Klinik Paneli" };
}

/** Growth engine upsell hint for premium sidebar sections */
export const GROWTH_ENGINE_TAGLINE = {
  icon: Zap,
  label: "Büyüme Motoru",
};
