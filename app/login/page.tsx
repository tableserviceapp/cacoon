'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password) {
      setError('Enter your email and password.');
      return;
    }
    setLoading(true);
    // Stub auth — replace with real auth call. For now, route to dashboard.
    setTimeout(() => router.push('/dashboard'), 350);
  };

  return (
    <div className="min-h-screen flex bg-cocoon-bg font-sans">
      {/* Left: form */}
      <div className="flex-1 flex flex-col px-6 sm:px-12 py-10">
        <Link href="/" className="inline-flex items-center gap-2 no-underline">
          <Image
            src="/assets/logo-wordmark-black.png"
            alt="Cocoon"
            width={110}
            height={20}
            priority
            className="h-5 w-auto"
          />
        </Link>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <h1 className="font-serif text-4xl text-cocoon-ink leading-none tracking-tight">
              Welcome back.
            </h1>
            <p className="mt-3 text-sm text-cocoon-graphite">
              Log in to your Cocoon account to continue.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold tracking-wider uppercase text-cocoon-graphite mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@work.com"
                  className="block w-full rounded-full border border-cocoon-border bg-white px-5 py-3 text-sm text-cocoon-ink placeholder:text-cocoon-mid focus:border-cocoon-ink focus:ring-0 focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-xs font-semibold tracking-wider uppercase text-cocoon-graphite">
                    Password
                  </label>
                  <Link href="#forgot" className="text-xs text-cocoon-graphite hover:text-cocoon-ink">
                    Forgot?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full rounded-full border border-cocoon-border bg-white px-5 py-3 text-sm text-cocoon-ink placeholder:text-cocoon-mid focus:border-cocoon-ink focus:ring-0 focus:outline-none"
                />
              </div>

              {error && <div className="text-sm text-red-600">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-cocoon-ink text-cocoon-cream px-6 py-3 text-sm font-semibold hover:bg-[#2C332E] transition disabled:opacity-60"
              >
                {loading ? 'Logging in…' : 'Log in'}
              </button>
            </form>

            <p className="mt-8 text-sm text-cocoon-graphite">
              Don&apos;t have an account?{' '}
              <Link href="/#join" className="text-cocoon-ink font-semibold border-b-2 border-cocoon-yellow pb-0.5">
                Join the waitlist
              </Link>
            </p>
          </div>
        </div>

        <div className="text-xs text-cocoon-mid">© 2026 Cocoon · Made in London</div>
      </div>

      {/* Right: brand panel */}
      <div className="hidden lg:flex flex-1 relative bg-cocoon-ink overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-cocoon-yellow opacity-20 blur-sm"
        />
        <div className="relative flex flex-col justify-end px-16 py-16 text-cocoon-cream">
          <div className="text-xs font-semibold tracking-[0.18em] uppercase text-cocoon-yellow mb-6">
            Cocoon · early access
          </div>
          <h2 className="font-serif text-5xl leading-tight tracking-tight">
            Stop applying.
            <br />
            Start getting matched.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-cocoon-cream/70 max-w-md">
            Your career, structured. Your fit, scored. Companies, brought to you.
          </p>
        </div>
      </div>
    </div>
  );
}
