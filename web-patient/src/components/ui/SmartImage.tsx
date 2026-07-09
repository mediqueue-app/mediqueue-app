"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function SmartImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-[#eaf0fc] to-slate-100 text-[#3a6ad6]",
          className
        )}
        aria-hidden
      >
        <ImageIcon className="h-8 w-8 opacity-60" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setErrored(true)}
      className={cn("object-cover", className)}
    />
  );
}
