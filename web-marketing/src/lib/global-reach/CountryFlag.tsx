"use client";

import { useState } from "react";

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Küçük ülke bayrağı rozeti — flagcdn görseli, hata durumunda ISO kodu.
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
      alt={`${countryName}`}
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
