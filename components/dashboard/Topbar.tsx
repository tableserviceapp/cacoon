'use client';

import Link from 'next/link';
import { useState } from 'react';

const workspaces = [
  { name: 'Cocoon', plan: 'Growth', initial: 'C', current: true },
  { name: 'Foundation Studio', plan: 'Starter', initial: 'F', current: false },
  { name: 'Northwind Co', plan: 'Enterprise', initial: 'N', current: false },
];

export default function Topbar() {
  const [wsOpen, setWsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const current = workspaces.find((w) => w.current)!;

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 px-4 lg:px-6 h-16 border-b border-cocoon-border bg-white/85 backdrop-blur-md">
      {/* Workspace switcher */}
      <div className="relative">
        <button
          type="button"
          onClick={() => { setWsOpen((o) => !o); setUserOpen(false); }}
          className="flex items-center gap-2.5 rounded-lg border border-cocoon-border bg-white px-2.5 py-1.5 hover:bg-cocoon-cream transition"
        >
          <span className="w-7 h-7 rounded-md bg-cocoon-ink text-cocoon-yellow grid place-items-center font-serif text-sm">
            {current.initial}
          </span>
          <span className="text-left">
            <span className="block text-sm font-semibold text-cocoon-ink leading-none">{current.name}</span>
            <span className="block text-[10px] text-cocoon-mid mt-0.5">{current.plan} plan</span>
          </span>
          <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-cocoon-mid">
            <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {wsOpen && (
          <div className="absolute left-0 top-full mt-2 w-72 rounded-xl border border-cocoon-border bg-white shadow-cocoon-lg p-1.5 z-40">
            <div className="px-3 py-2 text-[10px] font-semibold tracking-[0.18em] uppercase text-cocoon-mid">
              Switch workspace
            </div>
            {workspaces.map((w) => (
              <button
                key={w.name}
                type="button"
                className={`w-full flex items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-cocoon-bg ${w.current ? 'bg-cocoon-cream' : ''}`}
              >
                <span className="w-8 h-8 rounded-md bg-cocoon-ink text-cocoon-yellow grid place-items-center font-serif text-sm">
                  {w.initial}
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-cocoon-ink">{w.name}</span>
                  <span className="block text-[11px] text-cocoon-mid">{w.plan} plan</span>
                </span>
                {w.current && (
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-cocoon-ink">
                    <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            ))}
            <div className="border-t border-cocoon-border mt-1 pt-1">
              <button type="button" className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-cocoon-graphite hover:bg-cocoon-bg">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                Create workspace
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="relative flex-1 max-w-xl">
        <svg viewBox="0 0 24 24" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cocoon-mid">
          <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          placeholder="Search jobs, candidates, interviews…"
          className="block w-full rounded-lg border border-cocoon-border bg-cocoon-bg pl-10 pr-16 py-2 text-sm text-cocoon-ink placeholder:text-cocoon-mid focus:border-cocoon-ink focus:bg-white focus:ring-0 focus:outline-none"
        />
        <kbd className="hidden md:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-cocoon-mid bg-white border border-cocoon-border rounded px-1.5 py-0.5">
          ⌘K
        </kbd>
      </div>

      <div className="flex items-center gap-1">
        {/* Help */}
        <button
          type="button"
          aria-label="Help"
          className="w-9 h-9 grid place-items-center rounded-lg text-cocoon-graphite hover:bg-cocoon-bg hover:text-cocoon-ink transition"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7v.5M12 17h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative w-9 h-9 grid place-items-center rounded-lg text-cocoon-graphite hover:bg-cocoon-bg hover:text-cocoon-ink transition"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
            <path d="M6 9a6 6 0 0 1 12 0v4l1.5 3h-15L6 13z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cocoon-yellow border-2 border-white" />
        </button>

        <div className="w-px h-6 bg-cocoon-border mx-1" />

        {/* User menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setUserOpen((o) => !o); setWsOpen(false); }}
            className="flex items-center gap-2.5 rounded-lg pl-1.5 pr-2 py-1 hover:bg-cocoon-bg transition"
          >
            <div className="w-8 h-8 rounded-full bg-cocoon-ink text-cocoon-yellow grid place-items-center font-serif text-sm">
              R
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-sm font-semibold text-cocoon-ink leading-none">Ross Joseph</div>
              <div className="text-[10px] text-cocoon-mid mt-0.5">Admin · Cocoon</div>
            </div>
            <svg viewBox="0 0 24 24" fill="none" className="hidden sm:block w-3.5 h-3.5 text-cocoon-mid">
              <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {userOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-cocoon-border bg-white shadow-cocoon-lg p-1.5 z-40">
              <div className="px-3 py-2">
                <div className="text-sm font-semibold text-cocoon-ink">Ross Joseph</div>
                <div className="text-xs text-cocoon-mid">ross@cocoonai.co.uk</div>
              </div>
              <div className="border-t border-cocoon-border my-1" />
              <Link href="/dashboard/settings" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-cocoon-ink hover:bg-cocoon-bg no-underline">
                Account settings
              </Link>
              <Link href="/dashboard/team" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-cocoon-ink hover:bg-cocoon-bg no-underline">
                Manage team
              </Link>
              <Link href="/dashboard/billing" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-cocoon-ink hover:bg-cocoon-bg no-underline">
                Billing & plan
              </Link>
              <div className="border-t border-cocoon-border my-1" />
              <Link href="/" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-cocoon-graphite hover:bg-cocoon-bg no-underline">
                Log out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
