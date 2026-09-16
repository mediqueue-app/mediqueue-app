import {
  CalendarDays,
  FolderHeart,
  LayoutDashboard,
  UserCog,
} from "lucide-react";

export const navItems = [
  {
    href: "/dashboard",
    labelKey: "nav.alt.ops",
    descriptionKey: "nav.alt.opsDesc",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/schedule",
    labelKey: "nav.alt.schedule",
    descriptionKey: "nav.alt.scheduleDesc",
    icon: CalendarDays,
  },
  {
    href: "/dashboard/patients",
    labelKey: "nav.alt.files",
    descriptionKey: "nav.alt.filesDesc",
    icon: FolderHeart,
  },
  {
    href: "/dashboard/profile",
    labelKey: "nav.alt.showcase",
    descriptionKey: "nav.alt.showcaseDesc",
    icon: UserCog,
  },
] as const;
