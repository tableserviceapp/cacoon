'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const labels: Record<string, string> = {
  dashboard: 'Workspace',
  jobs: 'Jobs',
  candidates: 'Candidates',
  pipeline: 'Pipeline',
  interviews: 'Interviews',
  messages: 'Messages',
  'ai-tools': 'AI Tools',
  analytics: 'Analytics',
  team: 'Team',
  billing: 'Billing',
  settings: 'Settings',
  detail: 'Detail',
};

function pretty(slug: string) {
  if (labels[slug]) return labels[slug];
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs">
      {parts.map((part, i) => {
        const href = '/' + parts.slice(0, i + 1).join('/');
        const isLast = i === parts.length - 1;
        return (
          <span key={href} className="flex items-center gap-1.5">
            {i > 0 && (
              <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3 text-cocoon-mist">
                <path d="M4.5 2.5L8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {isLast ? (
              <span className="font-semibold text-cocoon-ink">{pretty(part)}</span>
            ) : (
              <Link href={href} className="text-cocoon-graphite hover:text-cocoon-ink no-underline">
                {pretty(part)}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
