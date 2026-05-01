'use client';

import { useState } from 'react';

type FinalCTAProps = {
  onJoin?: (email: string) => void;
};

export default function FinalCTA({ onJoin }: FinalCTAProps) {
  return (
    <section id="join" className="section bg-yellow">
      <div className="container-narrow" style={{ textAlign: 'center' }}>
        <div className="eyebrow">Early access</div>
        <h2 className="display" style={{ marginTop: 8 }}>
          Be one of the first
          <br />
          hired through Cocoon.
        </h2>
        <p
          className="lede"
          style={{
            margin: '28px auto 36px',
            maxWidth: 560,
            color: 'var(--cocoon-ink)',
            opacity: 0.8,
          }}
        >
          Join the waitlist now. Be first in when the platform launches. Help shape what we build.
        </p>

        <FinalForm onJoin={onJoin} />

        <div
          style={{
            marginTop: 24,
            fontSize: 12,
            color: 'var(--cocoon-ink)',
            opacity: 0.65,
            letterSpacing: '0.04em',
          }}
        >
          UK only · Takes 30 seconds · Unsubscribe any time
        </div>
      </div>
    </section>
  );
}

function FinalForm({ onJoin }: { onJoin?: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'error' | 'success'>('idle');

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = email.trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    if (!ok) {
      setState('error');
      return;
    }
    setState('success');
    onJoin?.(v);
  };

  if (state === 'success') {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 14,
          padding: '16px 26px',
          background: 'var(--cocoon-ink)',
          color: 'var(--cocoon-cream)',
          borderRadius: 999,
          fontSize: 16,
        }}
      >
        <span
          style={{
            width: 26,
            height: 26,
            borderRadius: '50%',
            background: 'var(--cocoon-yellow)',
            color: 'var(--cocoon-ink)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span>
          <strong>You&apos;re in.</strong> <span style={{ opacity: 0.7 }}>We&apos;ll be in touch.</span>
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: 'inline-block', width: '100%', maxWidth: 520 }}>
      <div
        className="final-field"
        style={{
          display: 'flex',
          background: '#fff',
          border:
            state === 'error' ? '1.5px solid var(--color-error)' : '1.5px solid var(--cocoon-ink)',
          borderRadius: 999,
          padding: 4,
          alignItems: 'stretch',
        }}
      >
        <input
          type="email"
          placeholder="you@work.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === 'error') setState('idle');
          }}
          style={{
            flex: 1,
            border: 0,
            outline: 0,
            background: 'transparent',
            padding: '10px 22px',
            fontSize: 15,
            fontFamily: 'var(--font-sans)',
            color: 'var(--cocoon-ink)',
            minWidth: 0,
          }}
        />
        <button type="submit" className="btn btn-ink" style={{ padding: '12px 22px', fontSize: 14 }}>
          Join the waitlist
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      {state === 'error' && (
        <div style={{ marginTop: 10, fontSize: 13, color: 'var(--color-error)' }}>
          Please enter a valid email address.
        </div>
      )}
    </form>
  );
}
