type Tone = 'green' | 'amber' | 'red' | 'gray' | 'blue' | 'violet' | 'yellow' | 'ink';

const toneClasses: Record<Tone, string> = {
  green: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  amber: 'bg-amber-50 text-amber-700 border-amber-100',
  red: 'bg-red-50 text-red-700 border-red-100',
  gray: 'bg-cocoon-bg text-cocoon-graphite border-cocoon-border',
  blue: 'bg-sky-50 text-sky-700 border-sky-100',
  violet: 'bg-violet-50 text-violet-700 border-violet-100',
  yellow: 'bg-cocoon-yellow text-cocoon-ink border-transparent',
  ink: 'bg-cocoon-ink text-cocoon-cream border-cocoon-ink',
};

export function Pill({
  children,
  tone = 'gray',
  dot = false,
  className = '',
}: {
  children: React.ReactNode;
  tone?: Tone;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${toneClasses[tone]} ${className}`}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

const jobStatusTone: Record<string, Tone> = {
  Open: 'green',
  Live: 'green',
  Paused: 'amber',
  Draft: 'gray',
  Closed: 'gray',
  Filled: 'blue',
  'On hold': 'amber',
};

export function JobStatusBadge({ status }: { status: string }) {
  return (
    <Pill tone={jobStatusTone[status] ?? 'gray'} dot>
      {status}
    </Pill>
  );
}

const stageTone: Record<string, Tone> = {
  Applied: 'gray',
  Screening: 'blue',
  Shortlisted: 'violet',
  Interview: 'amber',
  Offer: 'yellow',
  Hired: 'green',
  Rejected: 'red',
  Withdrawn: 'gray',
};

export function StageBadge({ stage }: { stage: string }) {
  return <Pill tone={stageTone[stage] ?? 'gray'}>{stage}</Pill>;
}

export function MatchScore({ score }: { score: number }) {
  const tone: Tone = score >= 90 ? 'green' : score >= 75 ? 'yellow' : score >= 60 ? 'amber' : 'gray';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold border ${toneClasses[tone]}`}
    >
      <svg viewBox="0 0 16 16" fill="none" className="w-2.5 h-2.5">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" />
      </svg>
      {score}%
    </span>
  );
}
