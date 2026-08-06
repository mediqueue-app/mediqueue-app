"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Küçük ülke bayrağı rozeti.
 *
 * Bayrak emojisi Windows'ta render edilmediği için görseli flagcdn'den
 * çekiyoruz; istek başarısız olursa (çevrimdışı / engellenmiş) ISO kodunu
 * gösteren sade bir rozete düşüyoruz. Böylece her ortamda tutarlı görünür.
 */
export function CountryFlag({
  code,
  countryName,
  className,
}: {
  code: string;
  countryName: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        aria-hidden
        className={cn(
          "flex h-4 w-6 shrink-0 items-center justify-center rounded-[3px] bg-slate-100 text-[9px] font-bold tracking-tight text-slate-500 ring-1 ring-slate-200",
          className
        )}
      >
        {code}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      alt={`${countryName} bayrağı`}
      width={24}
      height={16}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn(
        "h-4 w-6 shrink-0 rounded-[3px] object-cover ring-1 ring-slate-200",
        className
      )}
    />
  );
}
