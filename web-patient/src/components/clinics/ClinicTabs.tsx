"use client";

import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const TAB_IDS = ["hakkinda", "olanaklar", "doktorlar", "yorumlar"] as const;

export function ClinicTabs() {
  const t = useT();
  const tabs = [
    { id: "hakkinda", label: t("clinic.tabAbout") },
    { id: "olanaklar", label: t("clinic.tabAmenities") },
    { id: "doktorlar", label: t("clinic.tabDoctors") },
    { id: "yorumlar", label: t("clinic.tabReviews") },
  ];
  const [active, setActive] = useState("hakkinda");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-120px 0px -70% 0px" }
    );
    TAB_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-16 z-30 -mx-4 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:mx-0 sm:px-0">
      <nav className="flex gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            className={cn(
              "whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors",
              active === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-slate-500 hover:text-slate-900"
            )}
          >
            {tab.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
