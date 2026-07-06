export interface RankedShareItem {
  label: string;
  percentage: number;
  prefix?: string;
}

export function RankedShareList({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: RankedShareItem[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-xs text-slate-500">{subtitle}</p>

      <div className="mt-5 space-y-3">
        {items.map((item, i) => (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-600">
                {item.prefix && <span className="mr-1.5">{item.prefix}</span>}
                {item.label}
              </span>
              <span className="font-semibold text-slate-900">
                %{item.percentage}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-primary"
                style={{
                  width: `${item.percentage}%`,
                  opacity: Math.max(0.35, 1 - i * 0.13),
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
