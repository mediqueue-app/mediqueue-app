export function ConsoleLocked() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16">
      <div className="max-w-md text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          403
        </p>
        <h1 className="mt-3 text-xl font-semibold text-white">
          This console is not available.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">
          MediQueue&apos;s admin console is an internal mock prototype and is not
          served publicly. Run it locally with <code>npm run dev</code>.
        </p>
      </div>
    </main>
  );
}
