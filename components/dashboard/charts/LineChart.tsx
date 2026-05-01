type Series = { label: string; data: number[]; color?: string };
type Props = {
  series: Series[];
  labels: string[];
  height?: number;
};

export default function LineChart({ series, labels, height = 220 }: Props) {
  const width = 720;
  const padding = { top: 16, right: 12, bottom: 28, left: 36 };
  const w = width - padding.left - padding.right;
  const h = height - padding.top - padding.bottom;

  const all = series.flatMap((s) => s.data);
  const max = Math.ceil(Math.max(...all, 1) / 10) * 10;
  const min = 0;
  const xs = (i: number) => padding.left + (i / (labels.length - 1)) * w;
  const ys = (v: number) => padding.top + h - ((v - min) / (max - min)) * h;

  const yTicks = 4;
  const tickValues = Array.from({ length: yTicks + 1 }, (_, i) => Math.round((max / yTicks) * i));

  const palette = ['#1F2421', '#FCD209', '#7A8079'];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      {tickValues.map((v) => (
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

      {labels.map((l, i) => (
        <text
          key={l}
          x={xs(i)}
          y={height - 8}
          textAnchor="middle"
          className="text-[10px] fill-cocoon-mid"
        >
          {l}
        </text>
      ))}

      {series.map((s, si) => {
        const color = s.color ?? palette[si % palette.length];
        const path = s.data
          .map((v, i) => `${i === 0 ? 'M' : 'L'} ${xs(i)} ${ys(v)}`)
          .join(' ');
        return (
          <g key={s.label}>
            <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {s.data.map((v, i) => (
              <circle key={i} cx={xs(i)} cy={ys(v)} r="3" fill={color} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}
