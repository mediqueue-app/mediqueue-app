export function QuickStats({
  monthlyPatientCount,
  averageRating,
  pendingMessageCount,
  weeklyCompletedAppointments,
}: {
  monthlyPatientCount: number;
  averageRating: number;
  pendingMessageCount: number;
  weeklyCompletedAppointments: number;
}) {
  const cards = [
    { label: "Bu Ay Hasta", value: String(monthlyPatientCount) },
    {
      label: "Ortalama Puan",
      value: averageRating.toFixed(1),
      stars: true,
    },
    { label: "Bekleyen Mesaj", value: String(pendingMessageCount) },
    {
      label: "Bu Hafta Tamamlanan",
      value: String(weeklyCompletedAppointments),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {card.label}
          </p>
          <p className="mt-2 flex items-center gap-1 text-2xl font-semibold text-slate-900">
            {card.value}
            {card.stars && (
              <span className="text-lg text-amber-400" aria-hidden>
                ★
              </span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
