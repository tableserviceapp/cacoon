import Image from 'next/image';

type CompaniesProps = {
  onCompanyJoin: () => void;
};

const benefits = [
  'AI-ranked candidate shortlists',
  'Verified skills, not self-rated',
  'Faster, fairer hiring',
  'Reduced CV filtering time',
];

const candidates = [
  { name: 'Amara Okafor', role: 'UAL · Graphic Comms', pct: 94, p: 'portrait-03' },
  { name: 'Jamie Chen', role: 'UCL · HCI', pct: 89, p: 'portrait-02' },
  { name: 'Priya Shah', role: 'Goldsmiths · Design', pct: 86, p: 'portrait-01' },
  { name: 'Tom Whitford', role: 'Kingston · Product Design', pct: 81, p: 'portrait-05' },
];

export default function Companies({ onCompanyJoin }: CompaniesProps) {
  return (
    <section id="companies" className="section">
      <div className="container">
        <div
          className="companies-card"
          style={{
            background: 'var(--cocoon-cream)',
            borderRadius: 28,
            padding: '72px 64px',
            display: 'grid',
            gridTemplateColumns: '1.05fr 0.95fr',
            gap: 64,
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div>
            <div className="eyebrow">For companies</div>
            <h2 className="display-2">
              Hire the people you <em>actually</em> want to meet.
            </h2>
            <p className="lede" style={{ marginTop: 24, marginBottom: 32 }}>
              Stop sifting 400 CVs to find six people. Cocoon ranks every candidate by real fit — skills, values, potential — and shows you the reasoning. Better candidates, faster decisions, lower cost-per-hire.
            </p>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 36px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px 28px',
              }}
            >
              {benefits.map((l, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 14,
                    color: 'var(--cocoon-ink)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: 'var(--cocoon-yellow)',
                      display: 'grid',
                      placeItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                      <path d="M3.5 8.5l3 3 6-7" stroke="var(--cocoon-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {l}
                </li>
              ))}
            </ul>

            <button type="button" className="btn btn-ink btn-lg" onClick={onCompanyJoin}>
              Join as a hiring partner
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div
            style={{
              background: '#fff',
              borderRadius: 18,
              border: '1px solid var(--border)',
              boxShadow: '0 24px 60px rgba(31,36,33,0.10)',
              padding: 22,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 14,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--cocoon-mid)',
                  }}
                >
                  Junior Designer · 47 matches
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, marginTop: 2 }}>
                  Top candidates
                </div>
              </div>
              <span className="tag yellow" style={{ fontSize: 10 }}>Live</span>
            </div>

            {candidates.map((c, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr auto',
                  gap: 12,
                  alignItems: 'center',
                  padding: '12px 0',
                  borderTop: i === 0 ? 'none' : '1px solid var(--border)',
                }}
              >
                <Image
                  src={`/assets/photos/${c.p}.jpg`}
                  alt=""
                  width={40}
                  height={40}
                  style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--cocoon-mid)' }}>{c.role}</div>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 20,
                    color: 'var(--cocoon-ink)',
                  }}
                >
                  {c.pct}
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 11,
                      color: 'var(--cocoon-mid)',
                    }}
                  >
                    %
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
