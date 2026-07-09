"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "hakkinda", label: "Hakkında" },
  { id: "olanaklar", label: "Olanaklar" },
  { id: "doktorlar", label: "Doktorlar" },
  { id: "yorumlar", label: "Yorumlar" },
];

export function ClinicTabs() {
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
    TABS.forEach((tab) => {
      const el = document.getElementById(tab.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-16 z-30 -mx-4 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:mx-0 sm:px-0">
      <nav className="flex gap-1 overflow-x-auto">
        {TABS.map((tab) => (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            className={cn(
              "whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors",
              active === tab.id
                ? "border-[#3a6ad6] text-[#3a6ad6]"
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
