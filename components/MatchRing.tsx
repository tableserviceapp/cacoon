type MatchRingProps = {
  value: number;
  size?: number;
  stroke?: number;
};

export default function MatchRing({ value, size = 140, stroke = 12 }: MatchRingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value / 100);
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--cocoon-cream)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--cocoon-yellow)"
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 800ms var(--ease-out)' }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: size * 0.34,
            lineHeight: 1,
            color: 'var(--cocoon-ink)',
          }}
        >
          {value}
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: size * 0.13,
              color: 'var(--cocoon-mid)',
              verticalAlign: 'super',
              marginLeft: 2,
            }}
          >
            %
          </span>
        </span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            color: 'var(--cocoon-mid)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginTop: 4,
            fontWeight: 600,
          }}
        >
          Match score
        </span>
      </div>
    </div>
  );
}
