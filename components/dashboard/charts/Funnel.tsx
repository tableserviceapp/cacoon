type Stage = { label: string; count: number };

export default function Funnel({ stages }: { stages: Stage[] }) {
  const max = Math.max(...stages.map((s) => s.count));
  return (
    <div className="space-y-2.5">
      {stages.map((s, i) => {
        const pct = (s.count / max) * 100;
        const conv = i === 0 ? 100 : Math.round((s.count / stages[0].count) * 100);
        return (
          <div key={s.label}>
            <div className="flex items-center justify-between text-xs mb-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-cocoon-graphite">
                  {s.label}
                </span>
                <span className="text-cocoon-mid">·</span>
                <span className="text-cocoon-mid">{conv}% conv.</span>
              </div>
              <span className="font-serif text-base text-cocoon-ink">{s.count}</span>
            </div>
            <div className="h-2 rounded-full bg-cocoon-cream overflow-hidden">
              <div
                className="h-full rounded-full bg-cocoon-ink"
                style={{
                  width: `${pct}%`,
                  background: i === stages.length - 1 ? 'var(--cocoon-yellow)' : 'var(--cocoon-ink)',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
