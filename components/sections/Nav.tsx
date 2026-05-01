'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type NavProps = {
  onJoin: () => void;
};

const linkBase: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: 14,
  fontWeight: 500,
  color: 'var(--cocoon-graphite)',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'color 150ms ease',
};

export default function Nav({ onJoin }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    background: scrolled ? 'rgba(250,250,247,0.85)' : 'transparent',
    backdropFilter: scrolled ? 'saturate(180%) blur(12px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(12px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
    transition: 'all 200ms var(--ease-out)',
  };

  return (
    <nav style={navStyle}>
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 40px',
        }}
      >
        <a
          href="#top"
          style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
        >
          <Image
            src="/assets/logo-wordmark-black.png"
            alt="Cocoon"
            width={120}
            height={22}
            priority
            style={{ height: 22, width: 'auto' }}
          />
        </a>

        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <a href="#how" style={linkBase}>How it works</a>
          <a href="#features" style={linkBase}>Features</a>
          <a href="#companies" style={linkBase}>For companies</a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a
            href="/dashboard"
            className="nav-login"
            style={{
              ...linkBase,
              padding: '10px 14px',
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--cocoon-ink)',
            }}
          >
            Dashboard
          </a>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onJoin}
            style={{ padding: '10px 18px', fontSize: 14 }}
          >
            Join the waitlist
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            className="nav-burger"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 0,
              padding: 8,
              cursor: 'pointer',
            }}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 7h18M3 17h18" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          style={{
            padding: '0 22px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            borderTop: '1px solid var(--border)',
            background: 'var(--cocoon-bg)',
          }}
        >
          <a href="#how" style={{ ...linkBase, padding: '10px 0' }} onClick={() => setOpen(false)}>How it works</a>
          <a href="#features" style={{ ...linkBase, padding: '10px 0' }} onClick={() => setOpen(false)}>Features</a>
          <a href="#companies" style={{ ...linkBase, padding: '10px 0' }} onClick={() => setOpen(false)}>For companies</a>
        </div>
      )}
    </nav>
  );
}
