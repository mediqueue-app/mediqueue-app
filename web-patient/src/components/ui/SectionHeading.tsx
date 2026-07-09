import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  description,
  linkHref,
  linkLabel,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  linkHref?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wide text-[#3a6ad6]">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-slate-500">{description}</p>
        )}
      </div>
      {linkHref && linkLabel && (
        <Link
          href={linkHref}
          className="text-sm font-semibold text-[#3a6ad6] hover:underline"
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
