'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
};

const navItems: NavItem[] = [
  {
    label: 'Overview',
    href: '/dashboard',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M3 12L12 4l9 8M5 10v10h14V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Jobs',
    href: '/dashboard/jobs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
    badge: 12,
  },
  {
    label: 'Candidates',
    href: '/dashboard/candidates',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Pipeline',
    href: '/dashboard/pipeline',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <rect x="3" y="5" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="1.6" />
        <rect x="10" y="5" width="4" height="9" rx="1" stroke="currentColor" strokeWidth="1.6" />
        <rect x="17" y="5" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    label: 'Interviews',
    href: '/dashboard/interviews',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 10h16M9 3v4M15 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    badge: 4,
  },
  {
    label: 'Messages',
    href: '/dashboard/messages',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M4 6h16v11H9l-5 4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
    badge: 7,
  },
  {
    label: 'AI Tools',
    href: '/dashboard/ai-tools',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M19 17l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Analytics',
    href: '/dashboard/analytics',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M4 20h16M7 17v-5M12 17V7M17 17v-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

const adminItems: NavItem[] = [
  {
    label: 'Team',
    href: '/dashboard/team',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5M14 19c.5-2.2 2.4-3.5 5-3.5s4.5 1.3 5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Billing',
    href: '/dashboard/billing',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M19 12a7 7 0 0 0-.1-1.3l2-1.5-2-3.4-2.3 1a7 7 0 0 0-2.2-1.3L14 3h-4l-.4 2.5a7 7 0 0 0-2.2 1.3l-2.3-1-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .9.1 1.3l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 2.2 1.3L10 21h4l.4-2.5a7 7 0 0 0 2.2-1.3l2.3 1 2-3.4-2-1.5c.1-.4.1-.9.1-1.3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium no-underline transition ${
        active
          ? 'bg-cocoon-cream text-cocoon-ink'
          : 'text-cocoon-graphite hover:bg-cocoon-bg hover:text-cocoon-ink'
      }`}
    >
      <span className={active ? 'text-cocoon-ink' : 'text-cocoon-mid'}>{item.icon}</span>
      <span className="flex-1">{item.label}</span>
      {item.badge !== undefined && (
        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
          active ? 'bg-white text-cocoon-ink' : 'bg-cocoon-bg text-cocoon-graphite'
        }`}>
          {item.badge}
        </span>
      )}
      {active && <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-cocoon-yellow" />}
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href);

  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r border-cocoon-border bg-white">
      <div className="px-5 py-4 border-b border-cocoon-border">
        <Link href="/" className="inline-flex items-center gap-2 no-underline">
          <Image
            src="/assets/logo-wordmark-black.png"
            alt="Cocoon"
            width={92}
            height={16}
            priority
            className="h-4 w-auto"
          />
        </Link>
        <div className="mt-1 text-[10px] font-semibold tracking-[0.18em] uppercase text-cocoon-mid">
          Recruit · Workspace
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-0.5">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} active={isActive(item.href)} />
          ))}
        </div>

        <div className="mt-6 mb-2 px-3 text-[10px] font-semibold tracking-[0.18em] uppercase text-cocoon-mid">
          Admin
        </div>
        <div className="space-y-0.5">
          {adminItems.map((item) => (
            <NavLink key={item.href} item={item} active={isActive(item.href)} />
          ))}
        </div>
      </nav>

      <div className="px-4 py-4 border-t border-cocoon-border">
        <div className="rounded-xl bg-cocoon-ink text-cocoon-cream p-4">
          <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-cocoon-yellow mb-1">
            New
          </div>
          <p className="text-xs leading-relaxed text-cocoon-cream/80 mb-3">
            AI shortlist ranking is live. Try it in any open job.
          </p>
          <Link
            href="/dashboard/ai-tools"
            className="inline-flex items-center gap-1 text-xs font-semibold text-cocoon-yellow no-underline"
          >
            Try it
            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
              <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </aside>
  );
}
