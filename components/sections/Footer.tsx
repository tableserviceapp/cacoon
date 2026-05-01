import Image from 'next/image';

export default function Footer() {
  return (
    <footer
      style={{
        padding: '40px 40px 32px',
        borderTop: '1px solid var(--border)',
        background: 'var(--cocoon-bg)',
        color: 'var(--cocoon-graphite)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 24,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Image
            src="/assets/logo-wordmark-black.png"
            alt="Cocoon"
            width={100}
            height={18}
            style={{ height: 18, width: 'auto' }}
          />
          <span style={{ fontSize: 12, color: 'var(--cocoon-mid)' }}>© 2026 · Made in London</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 13 }}>
          <a
            href="mailto:hello@cocoonai.co.uk"
            style={{ color: 'var(--cocoon-graphite)', textDecoration: 'none' }}
          >
            hello@cocoonai.co.uk
          </a>
          <a href="#privacy" style={{ color: 'var(--cocoon-graphite)', textDecoration: 'none' }}>
            Privacy
          </a>
          <a href="#terms" style={{ color: 'var(--cocoon-graphite)', textDecoration: 'none' }}>
            Terms
          </a>
          <a
            href="https://www.linkedin.com"
            style={{
              color: 'var(--cocoon-graphite)',
              display: 'inline-grid',
              placeItems: 'center',
              width: 32,
              height: 32,
              borderRadius: '50%',
              border: '1px solid var(--border)',
            }}
            aria-label="LinkedIn"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4v11H3v-11zm6.5 0h3.83v1.5h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.14v5.42h-4v-4.81c0-1.15-.02-2.62-1.6-2.62-1.6 0-1.85 1.25-1.85 2.54v4.89h-4v-11z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
