"use client";

export function PageLoadError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">
      <p className="text-sm font-medium text-red-700">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 inline-flex min-h-12 items-center rounded-xl border border-red-300 bg-surface px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
      >
        Tekrar Dene
      </button>
    </div>
  );
}
