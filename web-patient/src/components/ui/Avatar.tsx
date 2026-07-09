"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { initials } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Avatar({
  src,
  name,
  className,
}: {
  src: string;
  name: string;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-[#eaf0fc] to-[#d3e0f8] font-semibold text-[#3a6ad6]",
          className
        )}
        aria-hidden
      >
        {initials(name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setErrored(true)}
      className={cn("object-cover", className)}
    />
  );
}
