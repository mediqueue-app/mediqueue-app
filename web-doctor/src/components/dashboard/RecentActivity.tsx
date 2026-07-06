export function RecentActivity({
  activities,
}: {
  activities: { id: string; message: string; timestamp: string }[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-4">
        <h2 className="text-base font-semibold text-slate-900">Son Aktiviteler</h2>
      </div>
      <ul className="divide-y divide-slate-50">
        {activities.map((item) => (
          <li key={item.id} className="px-6 py-3">
            <p className="text-sm text-slate-700">{item.message}</p>
            <p className="mt-0.5 text-xs text-slate-400">
              {new Date(item.timestamp).toLocaleString("tr-TR", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
