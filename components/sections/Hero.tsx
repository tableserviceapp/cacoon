import Image from 'next/image';
import MatchRing from '../MatchRing';

type HeroProps = {
  headline: React.ReactNode;
  sub: string;
  ctaLabel: string;
  onJoin: () => void;
};

export default function Hero({ headline, sub, ctaLabel, onJoin }: HeroProps) {
  return (
    <section
      id="top"
      className="section"
      style={{ paddingTop: 88, paddingBottom: 120, position: 'relative', overflow: 'hidden' }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: -180,
          top: -180,
          width: 520,
          height: 520,
          background: 'var(--cocoon-yellow)',
          borderRadius: '50%',
          opacity: 0.35,
          filter: 'blur(2px)',
          zIndex: 0,
        }}
      />

      <div
        className="container hero-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 0.95fr',
          gap: 80,
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="hero-copy">
          <div className="eyebrow" style={{ marginBottom: 28 }}>
            <span>Cocoon · early access</span>
          </div>

          <h1 className="display" style={{ marginBottom: 28 }}>
            {headline}
          </h1>

          <p className="lede" style={{ marginBottom: 36, maxWidth: '32em' }}>
            {sub}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-primary btn-lg" onClick={onJoin}>
              {ctaLabel}
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a href="#how" className="btn-link">
              See how it works
              <svg viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div
            style={{
              marginTop: 56,
              display: 'flex',
              alignItems: 'center',
              gap: 28,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {['portrait-01', 'portrait-03', 'portrait-04', 'portrait-06'].map((p, i) => (
                <Image
                  key={p}
                  src={`/assets/photos/${p}.jpg`}
                  alt=""
                  width={36}
                  height={36}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2.5px solid var(--cocoon-bg)',
                    marginLeft: i === 0 ? 0 : -10,
                    position: 'relative',
                    zIndex: 4 - i,
                  }}
                />
              ))}
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--cocoon-graphite)' }}>
              <strong style={{ color: 'var(--cocoon-ink)', fontWeight: 600 }}>2,400+</strong> on the waitlist
              <div style={{ fontSize: 12, color: 'var(--cocoon-mid)', marginTop: 2 }}>
                Be one of the first hired through Cocoon.
              </div>
            </div>
          </div>
        </div>

        <div className="hero-mockup" style={{ position: 'relative', minHeight: 560 }}>
          <HeroMockup />
        </div>
      </div>
    </section>
  );
}

function HeroMockup() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 560 }}>
      {/* Phone frame — Match Score view */}
      <div
        style={{
          position: 'absolute',
          right: 40,
          top: 0,
          width: 300,
          height: 600,
          background: '#fff',
          borderRadius: 44,
          border: '1px solid var(--border)',
          boxShadow: '0 30px 60px rgba(31,36,33,0.18), 0 8px 16px rgba(31,36,33,0.06)',
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        <div
          style={{
            padding: '14px 22px 8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--cocoon-ink)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          <span>9:41</span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor">
              <rect x="0" y="6" width="3" height="4" rx="0.5" />
              <rect x="4" y="4" width="3" height="6" rx="0.5" />
              <rect x="8" y="2" width="3" height="8" rx="0.5" />
              <rect x="12" y="0" width="3" height="10" rx="0.5" />
            </svg>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
              <path d="M7 8.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-3.5a3 3 0 0 1 2 .8l1.4-1.4A5 5 0 0 0 4 4.4L5.4 5.8A3 3 0 0 1 7 5zm0-3a6 6 0 0 1 4.2 1.7l1.4-1.4A8 8 0 0 0 1.4 1.8l1.4 1.4A6 6 0 0 1 7 1.5z" />
            </svg>
            <div
              style={{
                width: 22,
                height: 10,
                border: '1px solid currentColor',
                borderRadius: 2,
                padding: 1,
              }}
            >
              <div style={{ width: '80%', height: '100%', background: 'currentColor', borderRadius: 1 }} />
            </div>
          </div>
        </div>

        <div
          style={{
            padding: '20px 22px 22px',
            height: 'calc(100% - 40px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--cocoon-mid)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Today&apos;s match
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, marginTop: 2 }}>
                Junior Designer
              </div>
            </div>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'var(--cocoon-cream)',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="var(--cocoon-ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0 18px' }}>
            <MatchRing value={94} size={170} stroke={11} />
          </div>

          <div
            style={{
              background: 'var(--cocoon-cream)',
              borderRadius: 14,
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'var(--cocoon-ink)',
                color: 'var(--cocoon-yellow)',
                display: 'grid',
                placeItems: 'center',
                fontFamily: 'var(--font-serif)',
                fontSize: 18,
              }}
            >
              F
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--cocoon-ink)' }}>Foundation Studio</div>
              <div style={{ fontSize: 11, color: 'var(--cocoon-graphite)' }}>Design · London · Remote</div>
            </div>
            <span className="tag yellow" style={{ fontSize: 10, padding: '3px 8px' }}>Open</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div
              style={{
                fontSize: 11,
                color: 'var(--cocoon-mid)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: 2,
              }}
            >
              Why this match
            </div>
            {[
              { label: 'Skills · Figma, prototyping', pct: 96 },
              { label: 'Values · craft, autonomy', pct: 92 },
              { label: 'Stage · early-career fit', pct: 89 },
            ].map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12 }}>
                <span style={{ flex: 1, color: 'var(--cocoon-ink)' }}>{m.label}</span>
                <div
                  style={{
                    width: 68,
                    height: 4,
                    background: 'var(--cocoon-cream)',
                    borderRadius: 999,
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ width: `${m.pct}%`, height: '100%', background: 'var(--cocoon-ink)' }} />
                </div>
                <span style={{ width: 28, textAlign: 'right', fontFamily: 'var(--font-serif)', fontSize: 14 }}>
                  {m.pct}
                </span>
              </div>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          <button
            type="button"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '13px 18px', fontSize: 14 }}
          >
            See full match
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Floating mini-card 1 — Profile snapshot */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 80,
          width: 240,
          background: '#fff',
          borderRadius: 16,
          border: '1px solid var(--border)',
          boxShadow: '0 18px 40px rgba(31,36,33,0.10)',
          padding: 16,
          zIndex: 3,
          animation: 'floatA 6s var(--ease-in-out) infinite',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <Image
            src="/assets/photos/portrait-03.jpg"
            alt=""
            width={44}
            height={44}
            style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Amara Okafor</div>
            <div style={{ fontSize: 11, color: 'var(--cocoon-mid)' }}>Product Designer</div>
          </div>
          <span className="tag yellow" style={{ fontSize: 10, padding: '3px 8px' }}>94%</span>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span className="tag" style={{ fontSize: 10, padding: '3px 8px' }}>Figma</span>
          <span className="tag" style={{ fontSize: 10, padding: '3px 8px' }}>Prototyping</span>
          <span className="tag" style={{ fontSize: 10, padding: '3px 8px' }}>Research</span>
        </div>
      </div>

      {/* Floating mini-card 2 — AI Feedback toast */}
      <div
        style={{
          position: 'absolute',
          left: 30,
          bottom: 60,
          width: 260,
          background: 'var(--cocoon-ink)',
          color: 'var(--cocoon-cream)',
          borderRadius: 16,
          boxShadow: '0 18px 40px rgba(31,36,33,0.20)',
          padding: 16,
          zIndex: 3,
          animation: 'floatB 7s var(--ease-in-out) infinite',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: 'var(--cocoon-yellow)',
              color: 'var(--cocoon-ink)',
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5l1.6 4.4 4.4 1.6-4.4 1.6L8 13.5l-1.6-4.4L2 7.5l4.4-1.6L8 1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--cocoon-yellow)',
                marginBottom: 4,
              }}
            >
              AI Coach
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.4 }}>
              Add 2 case studies to bump your fit score by{' '}
              <strong style={{ color: 'var(--cocoon-yellow)' }}>+8%</strong>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
