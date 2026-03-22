export function StatsGrid({ stats }) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="card">
          <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
          <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
