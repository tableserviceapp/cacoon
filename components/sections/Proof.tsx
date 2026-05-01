import Image from 'next/image';

const stats = [
  { v: '20+ yrs', l: 'in recruitment' },
  { v: '500+', l: 'roles filled by the team' },
  { v: '2,400+', l: 'on the waitlist' },
];

const partners = ['Foundation', 'Northwind', 'Loop Labs', 'Bright & Co', 'Forge Studio', 'Atlas Talent'];

export default function Proof() {
  return (
    <section className="section-tight">
      <div className="container">
        <div
          className="proof-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'center',
          }}
        >
          <div>
            <div className="eyebrow">Built on real hiring experience</div>
            <h2 className="display-2">
              Backed by people who&apos;ve <em>done the hiring</em> — not theorised about it.
            </h2>
            <p className="lede" style={{ marginTop: 24 }}>
              Cocoon is built by operators who&apos;ve hired hundreds of people, run early-career programmes, and seen the broken bits of the system from the inside.
            </p>

            <div
              style={{
                marginTop: 36,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 20,
                paddingTop: 28,
                borderTop: '1px solid var(--border)',
              }}
            >
              {stats.map((s, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 32,
                      lineHeight: 1,
                      color: 'var(--cocoon-ink)',
                    }}
                  >
                    {s.v}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: 'var(--cocoon-graphite)',
                      marginTop: 6,
                      lineHeight: 1.4,
                    }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: 'var(--cocoon-ink)',
              color: 'var(--cocoon-cream)',
              borderRadius: 24,
              padding: 40,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                right: -60,
                top: -60,
                width: 220,
                height: 220,
                background: 'var(--cocoon-yellow)',
                borderRadius: '50%',
                opacity: 0.12,
                filter: 'blur(2px)',
              }}
            />
            <svg width="36" height="28" viewBox="0 0 36 28" fill="none" style={{ marginBottom: 18 }}>
              <path
                d="M0 28V18C0 8 5 2 14 0L17 5C11 7 8 11 8 16H14V28H0zM19 28V18C19 8 24 2 33 0L36 5C30 7 27 11 27 16H33V28H19z"
                fill="var(--cocoon-yellow)"
              />
            </svg>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 26,
                lineHeight: 1.25,
                margin: '0 0 28px',
                color: 'var(--cocoon-cream)',
              }}
            >
              &ldquo;We&apos;ve watched a generation of brilliant people get filtered out by ATS keyword games. Cocoon is the platform we wish had existed when we were hiring them.&rdquo;
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Image
                src="/assets/photos/founder-ross.jpg"
                alt=""
                width={48}
                height={48}
                style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontWeight: 600, color: 'var(--cocoon-cream)' }}>Ross Joseph</div>
                <div style={{ fontSize: 12, color: 'rgba(250,250,247,0.6)' }}>Founder · Cocoon</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 80, paddingTop: 36, borderTop: '1px solid var(--border)' }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--cocoon-mid)',
              textAlign: 'center',
              marginBottom: 24,
            }}
          >
            Talking with early hiring partners
          </div>
          <div
            className="logo-strip"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: 24,
              alignItems: 'center',
            }}
          >
            {partners.map((n, i) => (
              <div
                key={i}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 20,
                  color: 'var(--cocoon-graphite)',
                  textAlign: 'center',
                  opacity: 0.7,
                  letterSpacing: '-0.01em',
                }}
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
