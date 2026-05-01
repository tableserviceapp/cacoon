import Image from 'next/image';
import MatchRing from '../MatchRing';

export default function Features() {
  return (
    <section id="features" className="section bg-cream">
      <div className="container">
        <div style={{ maxWidth: 760, marginBottom: 80 }}>
          <div className="eyebrow">Features</div>
          <h2 className="display-2">
            A whole career platform —<br />
            not a job board with extras.
          </h2>
        </div>

        <FeatureRow
          reverse={false}
          label="01 · Match Score"
          title="Know exactly how you stack up."
          body="Every role on Cocoon shows you a live fit percentage — and the reasoning behind it. No black-box rankings, no guessing what the algorithm wants to see."
          mockup={<MatchScoreMock />}
        />

        <FeatureRow
          reverse={true}
          label="02 · Smart Profile"
          title="Your career, structured."
          body="Far richer than a CV. Skills, projects, values, ambitions — all turned into a profile that adapts as you grow. One profile, ranked against every role."
          mockup={<SmartProfileMock />}
        />

        <FeatureRow
          reverse={false}
          label="03 · AI Feedback"
          title="A coach in your pocket."
          body="See precisely what to fix, learn, or add to land the role. Personalised, actionable, and tied to real opportunities — not generic CV advice."
          mockup={<FeedbackMock />}
        />

        <div
          className="features-pair"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }}
        >
          <FeatureCard
            label="04 · Discovery"
            title="Get found, not filtered."
            body="Companies search Cocoon for talent that fits — by skills, values, and potential. You don't apply; you're discovered."
            mockup={<DiscoveryMock />}
          />
          <FeatureCard
            label="05 · Learning"
            title="Close the gap."
            body="Targeted skills, courses, and assessments — only what your match score says will move the needle. Quality over quantity."
            mockup={<LearningMock />}
          />
        </div>
      </div>
    </section>
  );
}

type FeatureRowProps = {
  reverse: boolean;
  label: string;
  title: string;
  body: string;
  mockup: React.ReactNode;
};

function FeatureRow({ reverse, label, title, body, mockup }: FeatureRowProps) {
  return (
    <div
      className="feature-row"
      style={{
        display: 'grid',
        gridTemplateColumns: '0.95fr 1.05fr',
        gap: 80,
        alignItems: 'center',
        padding: '48px 0',
        borderTop: '1px solid var(--border)',
        direction: reverse ? 'rtl' : 'ltr',
      }}
    >
      <div style={{ direction: 'ltr' }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--cocoon-graphite)',
            marginBottom: 16,
          }}
        >
          {label}
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(32px, 3.6vw, 48px)',
            lineHeight: 1.05,
            letterSpacing: '-0.015em',
            margin: '0 0 18px',
            color: 'var(--cocoon-ink)',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.55,
            color: 'var(--cocoon-graphite)',
            margin: 0,
            maxWidth: '32em',
          }}
        >
          {body}
        </p>
      </div>
      <div style={{ direction: 'ltr', display: 'flex', justifyContent: 'center' }}>{mockup}</div>
    </div>
  );
}

type FeatureCardProps = {
  label: string;
  title: string;
  body: string;
  mockup: React.ReactNode;
};

function FeatureCard({ label, title, body, mockup }: FeatureCardProps) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid var(--border)',
        borderRadius: 24,
        padding: 36,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--cocoon-graphite)',
        }}
      >
        {label}
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 32,
          lineHeight: 1.05,
          letterSpacing: '-0.015em',
          margin: 0,
          color: 'var(--cocoon-ink)',
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--cocoon-graphite)', margin: 0 }}>{body}</p>
      <div style={{ marginTop: 12 }}>{mockup}</div>
    </div>
  );
}

function MatchScoreMock() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 460,
        background: '#fff',
        borderRadius: 22,
        padding: 24,
        border: '1px solid var(--border)',
        boxShadow: '0 24px 60px rgba(31,36,33,0.08)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--cocoon-mid)',
            }}
          >
            Junior Designer · Foundation Studio
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, marginTop: 2 }}>Your fit</div>
        </div>
        <span className="tag yellow" style={{ fontSize: 10 }}>Live</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <MatchRing value={94} size={140} stroke={11} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { label: 'Skills', pct: 96 },
            { label: 'Experience', pct: 89 },
            { label: 'Values', pct: 92 },
            { label: 'Stage', pct: 88 },
          ].map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12 }}>
              <span style={{ width: 70, color: 'var(--cocoon-graphite)' }}>{m.label}</span>
              <div
                style={{
                  flex: 1,
                  height: 4,
                  background: 'var(--cocoon-cream)',
                  borderRadius: 999,
                  overflow: 'hidden',
                }}
              >
                <div style={{ width: `${m.pct}%`, height: '100%', background: 'var(--cocoon-ink)' }} />
              </div>
              <span
                style={{ width: 28, textAlign: 'right', fontFamily: 'var(--font-serif)', fontSize: 14 }}
              >
                {m.pct}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: 18,
          padding: '12px 14px',
          background: 'var(--cocoon-cream)',
          borderRadius: 12,
          fontSize: 12,
          lineHeight: 1.45,
          color: 'var(--cocoon-ink)',
        }}
      >
        <strong>Why you fit:</strong> your case studies in retail UX, plus your Figma assessment, place you in the top 6% for this role.
      </div>
    </div>
  );
}

function SmartProfileMock() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 460,
        background: '#fff',
        borderRadius: 22,
        padding: 0,
        border: '1px solid var(--border)',
        boxShadow: '0 24px 60px rgba(31,36,33,0.08)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: 96,
          background: 'linear-gradient(135deg, var(--cocoon-yellow) 0%, var(--cocoon-yellow-soft) 100%)',
          position: 'relative',
        }}
      />
      <div style={{ padding: '0 24px 24px', marginTop: -40 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 16,
            marginBottom: 16,
          }}
        >
          <Image
            src="/assets/photos/portrait-03.jpg"
            alt=""
            width={76}
            height={76}
            style={{
              width: 76,
              height: 76,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid #fff',
            }}
          />
          <span className="tag yellow" style={{ fontSize: 10, marginBottom: 4 }}>Open to work</span>
        </div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, lineHeight: 1, marginBottom: 4 }}>
          Amara Okafor
        </div>
        <div style={{ fontSize: 13, color: 'var(--cocoon-graphite)' }}>
          Product Designer · UAL Graduate · London
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
            marginTop: 18,
            padding: '14px 0',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          {[
            { v: '94%', l: 'Avg match' },
            { v: '12', l: 'Skills' },
            { v: '4', l: 'Projects' },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                textAlign: 'center',
                borderRight: i < 2 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22 }}>{s.v}</div>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--cocoon-mid)',
                  fontWeight: 600,
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 14 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--cocoon-graphite)',
              marginBottom: 8,
            }}
          >
            Verified skills
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['Figma · 92', 'Prototyping · 88', 'Research · 85', 'Brand · 80', 'UI · 91'].map((s) => (
              <span
                key={s}
                style={{
                  fontSize: 11,
                  padding: '4px 10px',
                  background: 'var(--cocoon-cream)',
                  borderRadius: 999,
                  border: '1px solid var(--border)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedbackMock() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 460,
        background: 'var(--cocoon-ink)',
        color: 'var(--cocoon-cream)',
        borderRadius: 22,
        padding: 24,
        boxShadow: '0 24px 60px rgba(31,36,33,0.16)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'var(--cocoon-yellow)',
            color: 'var(--cocoon-ink)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M8 1.5l1.6 4.4 4.4 1.6-4.4 1.6L8 13.5l-1.6-4.4L2 7.5l4.4-1.6L8 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--cocoon-yellow)',
            }}
          >
            AI Coach
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18 }}>3 ways to bump your score</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { label: 'Add 2 case studies to your portfolio', bonus: '+8%', meta: '15 min · Most impact' },
          { label: 'Take the Figma proficiency assessment', bonus: '+5%', meta: '20 min' },
          { label: 'Refine your one-line summary', bonus: '+3%', meta: '5 min' },
        ].map((x, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: '14px 16px',
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
                flexShrink: 0,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {i + 1}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, color: 'var(--cocoon-cream)', marginBottom: 2 }}>{x.label}</div>
              <div style={{ fontSize: 11, color: 'rgba(250,250,247,0.55)' }}>{x.meta}</div>
            </div>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--cocoon-yellow)' }}>
              {x.bonus}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DiscoveryMock() {
  const items = [
    { co: 'Foundation Studio', who: 'Head of Design', act: 'viewed your profile', when: '2h ago', mark: 'F', col: 'var(--cocoon-ink)' },
    { co: 'Northwind Co', who: 'Talent Lead', act: 'shortlisted you', when: 'Yesterday', mark: 'N', col: 'var(--cocoon-ink)' },
    { co: 'Loop Labs', who: 'CTO', act: 'sent you a message', when: 'Mon', mark: 'L', col: 'var(--cocoon-yellow)' },
  ];
  return (
    <div style={{ background: 'var(--cocoon-cream)', borderRadius: 14, padding: 18 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--cocoon-graphite)',
          marginBottom: 12,
        }}
      >
        This week
      </div>
      {items.map((x, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 0',
            borderTop: i === 0 ? 'none' : '1px solid var(--border)',
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: x.col,
              color: x.col === 'var(--cocoon-yellow)' ? 'var(--cocoon-ink)' : 'var(--cocoon-yellow)',
              display: 'grid',
              placeItems: 'center',
              fontFamily: 'var(--font-serif)',
              fontSize: 14,
              flexShrink: 0,
            }}
          >
            {x.mark}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, color: 'var(--cocoon-ink)' }}>
              <strong>{x.co}</strong> {x.act}
            </div>
            <div style={{ fontSize: 10, color: 'var(--cocoon-mid)' }}>
              {x.who} · {x.when}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function LearningMock() {
  const items = [
    { t: 'Advanced Figma Auto-layout', tag: 'Skill · 30 min', bonus: '+5%' },
    { t: 'Storytelling for designers', tag: 'Course · 2 hrs', bonus: '+3%' },
    { t: 'Portfolio review, weekly', tag: 'Live · Thu 6pm', bonus: 'New' },
  ];
  return (
    <div style={{ background: 'var(--cocoon-cream)', borderRadius: 14, padding: 18 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--cocoon-graphite)',
          marginBottom: 14,
        }}
      >
        Recommended for you
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((x, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: '#fff',
              borderRadius: 10,
              padding: '10px 12px',
              border: '1px solid var(--border)',
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: 'var(--cocoon-yellow)',
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12v8H2zM2 4l6 4 6-4" stroke="var(--cocoon-ink)" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, color: 'var(--cocoon-ink)', fontWeight: 500 }}>{x.t}</div>
              <div style={{ fontSize: 10.5, color: 'var(--cocoon-mid)' }}>{x.tag}</div>
            </div>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 14, color: 'var(--cocoon-ink)' }}>
              {x.bonus}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
