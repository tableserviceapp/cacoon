const pairs = [
  { from: 'Applying', to: 'Getting matched', note: 'Algorithms, not arrows in the dark.' },
  { from: 'Guessing', to: 'Improving', note: 'See exactly what to fix to get hired.' },
  { from: 'Ignored', to: 'Discovered', note: 'Companies come to you, not the other way around.' },
];

export default function Solution() {
  return (
    <section
      id="solution"
      className="section bg-ink"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div className="container">
        <div style={{ maxWidth: 760, marginBottom: 72 }}>
          <div className="eyebrow">The Cocoon way</div>
          <h2 className="display-2" style={{ color: 'var(--cocoon-cream)' }}>
            We rebuilt hiring around <em>you</em>, not the inbox.
          </h2>
          <p className="lede" style={{ marginTop: 24 }}>
            Cocoon isn&apos;t a job board. It&apos;s a career platform that learns who you are, scores your fit against every role, and helps you close the gap to the ones you really want.
          </p>
        </div>

        <div
          className="solution-pairs"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            background: 'var(--cocoon-ink-2)',
            borderRadius: 20,
            overflow: 'hidden',
            border: '1px solid var(--cocoon-ink-2)',
          }}
        >
          {pairs.map((p, i) => (
            <div
              key={i}
              style={{
                background: 'var(--cocoon-ink)',
                padding: '40px 36px',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'rgba(250,250,247,0.4)',
                    textDecoration: 'line-through',
                    textDecorationColor: 'var(--cocoon-yellow)',
                    textDecorationThickness: '2px',
                  }}
                >
                  {p.from}
                </span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="var(--cocoon-yellow)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 26,
                    color: 'var(--cocoon-cream)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {p.to}
                </span>
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.5, color: 'rgba(250,250,247,0.65)' }}>
                {p.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
