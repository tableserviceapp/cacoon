type Props = {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
};

export default function BarChart({ data, height = 220, color = '#1F2421' }: Props) {
  const width = 720;
  const padding = { top: 16, right: 12, bottom: 28, left: 36 };
  const w = width - padding.left - padding.right;
  const h = height - padding.top - padding.bottom;

  const max = Math.ceil(Math.max(...data.map((d) => d.value), 1) / 10) * 10;
  const barW = (w / data.length) * 0.6;
  const gap = (w / data.length) * 0.4;

  const yTicks = 4;
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => Math.round((max / yTicks) * i));
  const ys = (v: number) => padding.top + h - (v / max) * h;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      {ticks.map((v) => (
        <g key={v}>
          <line
            x1={padding.left}
            x2={padding.left + w}
            y1={ys(v)}
            y2={ys(v)}
            stroke="var(--cocoon-border)"
            strokeWidth="1"
            strokeDasharray={v === 0 ? '0' : '3 3'}
          />
          <text x={padding.left - 6} y={ys(v) + 4} textAnchor="end" className="text-[10px] fill-cocoon-mid">
            {v}
          </text>
        </g>
      ))}
      {data.map((d, i) => {
        const x = padding.left + i * (barW + gap) + gap / 2;
        const y = ys(d.value);
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={barW} height={padding.top + h - y} rx="4" fill={color} />
            <text
              x={x + barW / 2}
              y={height - 8}
              textAnchor="middle"
              className="text-[10px] fill-cocoon-mid"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
