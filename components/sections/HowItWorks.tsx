import Image from 'next/image';
import MatchRing from '../MatchRing';

type StepKind = 'profile' | 'score' | 'feedback' | 'hired';

const steps: { n: string; title: string; body: string; mockup: StepKind }[] = [
  {
    n: '01',
    title: 'Build your profile',
    body: 'Skills, experience, projects, ambitions. Cocoon turns them into a structured profile that goes far deeper than any CV.',
    mockup: 'profile',
  },
  {
    n: '02',
    title: 'Get your match score',
    body: 'Every role on Cocoon shows you how well you fit — and the precise reasons why. No black box.',
    mockup: 'score',
  },
  {
    n: '03',
    title: 'Improve with AI',
    body: 'Personalised coaching, skill suggestions, and content to close the gap. Your profile gets sharper with every step.',
    mockup: 'feedback',
  },
  {
    n: '04',
    title: 'Get discovered & hired',
    body: 'Companies find you through the matches that matter. No more shouting into application forms.',
    mockup: 'hired',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="section">
      <div className="container">
        <div
          className="how-head"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'flex-end',
            marginBottom: 80,
          }}
        >
          <div>
            <div className="eyebrow">How it works</div>
            <h2 className="display-2">
              Four steps. <em>That&apos;s it.</em>
            </h2>
          </div>
          <p className="lede">
            From profile to job offer — no guesswork, no inbox-stuffing, no waiting for a recruiter to notice you exist.
          </p>
        </div>

        <div
          className="how-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}
        >
          {steps.map((s, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <div
                style={{
                  background: '#fff',
                  border: '1px solid var(--border)',
                  borderRadius: 20,
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  height: '100%',
                  minHeight: 380,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 14,
                    color: 'var(--cocoon-graphite)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {s.n}
                </div>

                <StepMockup kind={s.mockup} />

                <div style={{ marginTop: 'auto' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 24,
                      lineHeight: 1.1,
                      margin: '0 0 10px',
                      color: 'var(--cocoon-ink)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 13.5,
                      lineHeight: 1.5,
                      color: 'var(--cocoon-graphite)',
                      margin: 0,
                    }}
                  >
                    {s.body}
                  </p>
                </div>
              </div>

              {i < steps.length - 1 && (
                <div
                  className="how-connector"
                  style={{
                    position: 'absolute',
                    right: -16,
                    top: 80,
                    width: 12,
                    height: 12,
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="var(--cocoon-yellow)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepMockup({ kind }: { kind: StepKind }) {
  const wrap: React.CSSProperties = {
    background: 'var(--cocoon-cream)',
    borderRadius: 14,
    padding: 16,
    minHeight: 160,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  };

  if (kind === 'profile')
    return (
      <div style={wrap}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Image
            src="/assets/photos/portrait-04.jpg"
            alt=""
            width={36}
            height={36}
            style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ height: 8, background: 'var(--cocoon-ink)', borderRadius: 999, width: '70%' }} />
            <div style={{ height: 6, background: 'var(--cocoon-mist)', borderRadius: 999, width: '50%', marginTop: 4 }} />
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
          {['Figma', 'Research', 'UI', 'Brand', 'Prototype'].map((t) => (
            <span key={t} className="tag" style={{ fontSize: 10, padding: '3px 8px', background: '#fff' }}>
              {t}
            </span>
          ))}
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 8, display: 'flex', gap: 4 }}>
          <div style={{ flex: 1, height: 28, background: '#fff', borderRadius: 6, border: '1px solid var(--border)' }} />
          <div style={{ flex: 1, height: 28, background: '#fff', borderRadius: 6, border: '1px solid var(--border)' }} />
        </div>
      </div>
    );

  if (kind === 'score')
    return (
      <div style={{ ...wrap, alignItems: 'center', justifyContent: 'center' }}>
        <MatchRing value={94} size={120} stroke={9} />
      </div>
    );

  if (kind === 'feedback')
    return (
      <div style={wrap}>
        {[
          { label: 'Add 2 case studies', bonus: '+8%' },
          { label: 'Take Figma assessment', bonus: '+5%' },
          { label: 'Refine summary', bonus: '+3%' },
        ].map((x, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: '#fff',
              borderRadius: 10,
              padding: '8px 10px',
              border: '1px solid var(--border)',
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                background: 'var(--cocoon-yellow)',
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.5l1.6 4.4 4.4 1.6-4.4 1.6L8 13.5l-1.6-4.4L2 7.5l4.4-1.6L8 1.5z" stroke="var(--cocoon-ink)" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ flex: 1, fontSize: 11, color: 'var(--cocoon-ink)' }}>{x.label}</div>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 14, color: 'var(--cocoon-ink)' }}>
              {x.bonus}
            </span>
          </div>
        ))}
      </div>
    );

  if (kind === 'hired')
    return (
      <div style={wrap}>
        <div
          style={{
            background: 'var(--cocoon-ink)',
            color: 'var(--cocoon-cream)',
            borderRadius: 10,
            padding: '12px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: 'var(--cocoon-yellow)',
              color: 'var(--cocoon-ink)',
              display: 'grid',
              placeItems: 'center',
              fontFamily: 'var(--font-serif)',
              fontSize: 14,
            }}
          >
            F
          </div>
          <div style={{ flex: 1, fontSize: 12 }}>
            <div style={{ fontWeight: 600 }}>Foundation Studio</div>
            <div style={{ fontSize: 10, opacity: 0.7 }}>wants to interview you</div>
          </div>
        </div>
        <div
          style={{
            background: '#fff',
            borderRadius: 10,
            padding: '10px 12px',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 11,
            color: 'var(--cocoon-ink)',
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-success)' }} />
          Interview confirmed · Tue 14:00
        </div>
        <div
          style={{
            marginTop: 'auto',
            background: 'var(--cocoon-yellow)',
            borderRadius: 10,
            padding: '10px 12px',
            fontFamily: 'var(--font-serif)',
            fontSize: 14,
            color: 'var(--cocoon-ink)',
            textAlign: 'center',
          }}
        >
          🎉 Offer received
        </div>
      </div>
    );

  return null;
}
