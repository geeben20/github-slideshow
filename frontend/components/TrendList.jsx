export function TrendList({ trends }) {
  return (
    <div className="card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Trending topics</h2>
        <span className="text-sm text-slate-500">Updated live</span>
      </div>
      <div className="space-y-3">
        {trends.map((trend, index) => (
          <div key={trend.keyword} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800">
            <div>
              <p className="text-xs uppercase text-slate-400">#{index + 1}</p>
              <p className="font-medium capitalize">{trend.keyword}</p>
            </div>
            <span className="rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand">{trend.frequency}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
