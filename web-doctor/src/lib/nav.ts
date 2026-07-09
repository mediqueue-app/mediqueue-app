import {
  CalendarDays,
  FolderHeart,
  LayoutDashboard,
  UserCog,
} from "lucide-react";

export const navItems = [
  {
    href: "/dashboard",
    label: "Operasyon Paneli",
    description: "Bugün",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/schedule",
    label: "Randevu Takvimi",
    description: "Slot Yönetimi",
    icon: CalendarDays,
  },
  {
    href: "/dashboard/patients",
    label: "Hasta Tıbbi Dosyaları",
    description: "Uluslararası Hastalar",
    icon: FolderHeart,
  },
  {
    href: "/dashboard/profile",
    label: "Vitrin Profilim",
    description: "Küresel Görünürlük",
    icon: UserCog,
  },
] as const;
