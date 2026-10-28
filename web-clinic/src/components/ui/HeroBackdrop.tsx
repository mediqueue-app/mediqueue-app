export function HeroBackdrop({ withGrid = false }: { withGrid?: boolean }) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(58,106,214,0.12),transparent_55%),linear-gradient(180deg,var(--color-mist)_0%,#ffffff_72%)]"
        aria-hidden
      />
      {withGrid ? (
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_top,black_18%,transparent_72%)]"
          aria-hidden
        />
      ) : null}
    </>
  );
}
