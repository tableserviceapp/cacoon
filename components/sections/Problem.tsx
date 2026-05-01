import Image from 'next/image';

const items = [
  { stat: '300+', label: 'applications', detail: 'sent into the void each year by the average graduate.' },
  { stat: '2%', label: 'response rate', detail: 'on most job boards. The rest? Silence.' },
  { stat: '0', label: 'feedback', detail: 'on what to fix, change, or improve next time.' },
  { stat: '6mo', label: 'average wait', detail: 'to land a first role you actually want.' },
];

export default function Problem() {
  return (
    <section className="section bg-cream" style={{ position: 'relative' }}>
      <div className="container">
        <div
          className="problem-head"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
            marginBottom: 72,
          }}
        >
          <div>
            <div className="eyebrow">The problem</div>
            <h2 className="display-2">
              The job hunt is <em>broken.</em>
              <br />
              You already know.
            </h2>
          </div>
          <div>
            <p className="lede">
              Endless applications. CVs filtered by keywords. Companies you&apos;d be perfect for that never see your name. The system asks you to perform — and tells you nothing when you don&apos;t.
            </p>
            <p className="lede" style={{ marginTop: 18, color: 'var(--cocoon-ink)', fontWeight: 500 }}>
              It&apos;s not you. It&apos;s the process.
            </p>
          </div>
        </div>

        <div
          className="problem-body"
          style={{
            display: 'grid',
            gridTemplateColumns: '0.9fr 1.1fr',
            gap: 32,
            alignItems: 'stretch',
          }}
        >
          <div
            style={{
              position: 'relative',
              borderRadius: 20,
              overflow: 'hidden',
              minHeight: 480,
              background: 'var(--cocoon-ink)',
            }}
          >
            <Image
              src="/assets/photos/user-thinking.jpg"
              alt=""
              fill
              style={{ objectFit: 'cover', filter: 'grayscale(0.3) contrast(1.05)' }}
              sizes="(max-width: 980px) 100vw, 45vw"
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 40%, rgba(31,36,33,0.85) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 28,
                left: 28,
                right: 28,
                color: 'var(--cocoon-cream)',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--cocoon-yellow)',
                  marginBottom: 8,
                }}
              >
                Tuesday, 11:47 pm
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 26,
                  lineHeight: 1.15,
                  margin: 0,
                  maxWidth: '14em',
                }}
              >
                &ldquo;I&apos;ve sent 92 applications. I&apos;ve heard back from four.&rdquo;
              </p>
              <div
                style={{
                  fontSize: 12,
                  color: 'rgba(250,250,247,0.6)',
                  marginTop: 14,
                  letterSpacing: '0.04em',
                }}
              >
                — every recent graduate, ever
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {items.map((it, i) => (
              <div
                key={i}
                style={{
                  background: '#fff',
                  border: '1px solid var(--border)',
                  borderRadius: 18,
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 56,
                    lineHeight: 1,
                    color: 'var(--cocoon-ink)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {it.stat}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--cocoon-graphite)',
                  }}
                >
                  {it.label}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: 'var(--cocoon-graphite)',
                    marginTop: 4,
                  }}
                >
                  {it.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
