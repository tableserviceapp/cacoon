type Slice = { label: string; value: number; color?: string };

export default function Donut({
  slices,
  size = 160,
  thickness = 24,
}: {
  slices: Slice[];
  size?: number;
  thickness?: number;
}) {
  const total = slices.reduce((acc, s) => acc + s.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const palette = ['#1F2421', '#FCD209', '#4A524D', '#C8C9C2', '#FFF090'];

  let offset = 0;

  return (
    <div className="flex items-center gap-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--cocoon-cream)" strokeWidth={thickness} />
        {slices.map((s, i) => {
          const len = (s.value / total) * c;
          const dash = `${len} ${c - len}`;
          const dashOffset = -offset;
          offset += len;
          return (
            <circle
              key={s.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color ?? palette[i % palette.length]}
              strokeWidth={thickness}
              strokeDasharray={dash}
              strokeDashoffset={dashOffset}
            />
          );
        })}
      </svg>
      <ul className="flex-1 space-y-2 min-w-0">
        {slices.map((s, i) => (
          <li key={s.label} className="flex items-center gap-2 text-sm">
            <span
              className="w-2.5 h-2.5 rounded-sm shrink-0"
              style={{ background: s.color ?? palette[i % palette.length] }}
            />
            <span className="text-cocoon-graphite truncate">{s.label}</span>
            <span className="ml-auto font-serif text-cocoon-ink">{Math.round((s.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
