import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/dashboard/PageHeader';
import KpiCard from '@/components/dashboard/KpiCard';
import { Pill, JobStatusBadge, StageBadge, MatchScore } from '@/components/dashboard/Badges';
import { Button, LinkButton } from '@/components/dashboard/Buttons';
import Funnel from '@/components/dashboard/charts/Funnel';
import {
  jobs,
  candidates,
  interviews,
  activity,
  recruiters,
  findCandidate,
  findJob,
} from '@/lib/sample-data';

const kpis = [
  {
    label: 'Active jobs',
    value: '12',
    change: '+3',
    changeLabel: 'this month',
    spark: [4, 6, 5, 8, 9, 10, 12],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    label: 'Open requisitions',
    value: '7',
    change: '+1',
    changeLabel: 'vs last week',
    spark: [5, 5, 6, 6, 7, 7, 7],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M5 5h14v14H5z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Total applicants',
    value: '1,058',
    change: '+184',
    changeLabel: 'this week',
    spark: [60, 90, 120, 150, 170, 184, 184],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Interviews this week',
    value: '24',
    change: '+6',
    changeLabel: 'vs last week',
    spark: [12, 14, 16, 18, 20, 22, 24],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 10h16M9 3v4M15 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Offers sent',
    value: '4',
    change: '+1',
    changeLabel: 'this week',
    spark: [1, 2, 2, 3, 3, 4, 4],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M5 8l7 5 7-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <rect x="3" y="6" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    label: 'Avg. time to hire',
    value: '21d',
    change: '−4d',
    changeLabel: 'vs last quarter',
    positive: true,
    spark: [28, 27, 26, 24, 23, 22, 21],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

const funnel = [
  { label: 'Applied', count: 1058 },
  { label: 'Screening', count: 312 },
  { label: 'Shortlisted', count: 124 },
  { label: 'Interview', count: 48 },
  { label: 'Offer', count: 9 },
  { label: 'Hired', count: 4 },
];

const quickActions = [
  {
    title: 'Create job',
    description: 'Open a new requisition with AI-drafted JD.',
    href: '/dashboard/jobs/new',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 11v6M9 14h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Review applicants',
    description: '142 new since you last looked.',
    href: '/dashboard/candidates',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" />
        <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Schedule interview',
    description: '4 candidates awaiting times.',
    href: '/dashboard/interviews',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 10h16M9 3v4M15 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Draft outreach',
    description: 'AI-personalised messages.',
    href: '/dashboard/ai-tools',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function OverviewPage() {
  const upcoming = interviews
    .filter((i) => i.status === 'Scheduled')
    .slice(0, 4);

  const jobsNeedingAttention = jobs
    .filter((j) => j.priority || (j.status === 'Open' && j.shortlisted >= 18))
    .slice(0, 4);

  const recent = activity.slice(0, 6);

  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="Good morning, Ross."
        description="Here's what's happening across Cocoon today — 4 jobs need your attention and 24 interviews are scheduled this week."
        actions={
          <>
            <Button>
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Export
            </Button>
            <LinkButton href="/dashboard/jobs/new" variant="primary">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Create job
            </LinkButton>
          </>
        }
      />

      {/* Quick actions */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {quickActions.map((q) => (
          <Link
            key={q.title}
            href={q.href}
            className="group flex items-center gap-3 rounded-2xl border border-cocoon-border bg-white px-4 py-3.5 hover:border-cocoon-ink hover:shadow-cocoon-md transition no-underline"
          >
            <div className="w-10 h-10 rounded-xl bg-cocoon-cream text-cocoon-ink grid place-items-center">
              {q.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-cocoon-ink">{q.title}</div>
              <div className="text-xs text-cocoon-mid truncate">{q.description}</div>
            </div>
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-cocoon-mid group-hover:text-cocoon-ink group-hover:translate-x-0.5 transition">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ))}
      </section>

      {/* KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-3">
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </section>

      {/* Funnel + Upcoming interviews */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 rounded-2xl border border-cocoon-border bg-white p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-serif text-xl text-cocoon-ink leading-none">Hiring funnel</h2>
              <p className="text-xs text-cocoon-mid mt-1">Conversion rates across all open jobs · last 30 days.</p>
            </div>
            <Link href="/dashboard/analytics" className="text-sm font-semibold text-cocoon-ink no-underline border-b-2 border-cocoon-yellow pb-0.5">
              Analytics
            </Link>
          </div>
          <Funnel stages={funnel} />
        </div>

        <div className="rounded-2xl border border-cocoon-border bg-white">
          <div className="flex items-center justify-between px-5 py-4 border-b border-cocoon-border">
            <h2 className="font-serif text-xl text-cocoon-ink leading-none">Upcoming interviews</h2>
            <Link href="/dashboard/interviews" className="text-xs font-semibold text-cocoon-ink no-underline">
              See all →
            </Link>
          </div>
          <ul className="divide-y divide-cocoon-border">
            {upcoming.map((iv) => {
              const c = findCandidate(iv.candidateId)!;
              const j = findJob(iv.jobId)!;
              return (
                <li key={iv.id} className="flex items-start gap-3 px-5 py-3.5">
                  <div className="w-10 h-10 rounded-lg bg-cocoon-cream text-cocoon-ink grid place-items-center text-center shrink-0">
                    <div>
                      <div className="text-[9px] font-semibold uppercase tracking-wider leading-none text-cocoon-mid">
                        {new Date(iv.date).toLocaleDateString('en-GB', { month: 'short' })}
                      </div>
                      <div className="font-serif text-base leading-none mt-0.5">
                        {new Date(iv.date).getDate()}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-cocoon-ink truncate">{c.name}</div>
                    <div className="text-xs text-cocoon-graphite truncate">
                      {iv.type} · {j.title}
                    </div>
                    <div className="text-[11px] text-cocoon-mid mt-0.5">
                      {iv.time} · {iv.location}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Jobs needing attention + recent activity */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 rounded-2xl border border-cocoon-border bg-white">
          <div className="flex items-center justify-between px-6 py-4 border-b border-cocoon-border">
            <div>
              <h2 className="font-serif text-xl text-cocoon-ink leading-none">Jobs needing attention</h2>
              <p className="text-xs text-cocoon-mid mt-1">Roles with stalled pipeline, urgent priority, or overdue actions.</p>
            </div>
            <Link href="/dashboard/jobs" className="text-xs font-semibold text-cocoon-ink no-underline">
              View all jobs →
            </Link>
          </div>
          <ul className="divide-y divide-cocoon-border">
            {jobsNeedingAttention.map((j) => (
              <li key={j.id} className="px-6 py-4 hover:bg-cocoon-bg/40 transition">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Link href={`/dashboard/jobs/${j.id}`} className="text-sm font-semibold text-cocoon-ink no-underline hover:underline truncate">
                        {j.title}
                      </Link>
                      <JobStatusBadge status={j.status} />
                      {j.priority === 'urgent' && (
                        <Pill tone="red" dot>Urgent</Pill>
                      )}
                      {j.priority === 'high' && (
                        <Pill tone="amber" dot>High priority</Pill>
                      )}
                    </div>
                    <div className="text-xs text-cocoon-mid">
                      {j.team} · {j.location} · {j.salary} · Posted {j.postedDays}d ago
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-right shrink-0">
                    <div>
                      <div className="font-serif text-lg text-cocoon-ink leading-none">{j.applicants}</div>
                      <div className="text-[10px] text-cocoon-mid uppercase tracking-wider mt-1">Applicants</div>
                    </div>
                    <div>
                      <div className="font-serif text-lg text-cocoon-ink leading-none">{j.shortlisted}</div>
                      <div className="text-[10px] text-cocoon-mid uppercase tracking-wider mt-1">Shortlisted</div>
                    </div>
                    <div>
                      <div className="font-serif text-lg text-cocoon-ink leading-none">{j.interviewing}</div>
                      <div className="text-[10px] text-cocoon-mid uppercase tracking-wider mt-1">Interviewing</div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-cocoon-border bg-white">
          <div className="px-5 py-4 border-b border-cocoon-border flex items-center justify-between">
            <h2 className="font-serif text-xl text-cocoon-ink leading-none">Recent activity</h2>
            <Link href="#" className="text-xs font-semibold text-cocoon-ink no-underline">
              View log →
            </Link>
          </div>
          <ul className="divide-y divide-cocoon-border">
            {recent.map((a) => (
              <li key={a.id} className="flex items-start gap-3 px-5 py-3.5">
                <div className={`w-8 h-8 rounded-lg grid place-items-center text-xs font-semibold shrink-0 ${
                  a.initial === 'AI' ? 'bg-cocoon-yellow text-cocoon-ink' : 'bg-cocoon-ink text-cocoon-yellow font-serif text-sm'
                }`}>
                  {a.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-cocoon-ink leading-snug">
                    <strong className="font-semibold">{a.who}</strong>{' '}
                    <span className="text-cocoon-graphite">{a.action}</span>{' '}
                    <strong className="font-semibold">{a.subject}</strong>
                  </div>
                  {a.context && <div className="text-xs text-cocoon-mid mt-0.5">{a.context}</div>}
                  <div className="text-[11px] text-cocoon-mid mt-0.5">{a.when}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recruiter workload + top candidates */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-cocoon-border bg-white p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-serif text-xl text-cocoon-ink leading-none">Recruiter workload</h2>
              <p className="text-xs text-cocoon-mid mt-1">Active candidates per recruiter vs. capacity.</p>
            </div>
            <Link href="/dashboard/team" className="text-xs font-semibold text-cocoon-ink no-underline">
              Team →
            </Link>
          </div>
          <ul className="space-y-4">
            {recruiters.slice(0, 4).map((r) => {
              const pct = Math.min(100, (r.workload / r.capacity) * 100);
              const overloaded = r.workload >= r.capacity * 0.85;
              return (
                <li key={r.id}>
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className="w-9 h-9 rounded-full bg-cocoon-ink text-cocoon-yellow grid place-items-center font-serif text-base shrink-0">
                      {r.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-cocoon-ink truncate">{r.name}</div>
                      <div className="text-xs text-cocoon-mid">{r.role}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-serif text-base text-cocoon-ink leading-none">
                        {r.workload}
                        <span className="text-xs text-cocoon-mid font-sans">/{r.capacity}</span>
                      </div>
                      <div className={`text-[10px] font-semibold uppercase tracking-wider mt-0.5 ${
                        overloaded ? 'text-red-600' : 'text-cocoon-mid'
                      }`}>
                        {overloaded ? 'At capacity' : 'OK'}
                      </div>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-cocoon-cream overflow-hidden">
                    <div
                      className={`h-full rounded-full ${overloaded ? 'bg-red-400' : 'bg-cocoon-ink'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-2xl border border-cocoon-border bg-white">
          <div className="flex items-center justify-between px-6 py-4 border-b border-cocoon-border">
            <div>
              <h2 className="font-serif text-xl text-cocoon-ink leading-none">Top candidates this week</h2>
              <p className="text-xs text-cocoon-mid mt-1">Highest match scores across active roles.</p>
            </div>
            <Link href="/dashboard/candidates" className="text-xs font-semibold text-cocoon-ink no-underline">
              All candidates →
            </Link>
          </div>
          <ul className="divide-y divide-cocoon-border">
            {candidates
              .filter((c) => c.matchScore >= 85)
              .slice(0, 5)
              .map((c) => {
                const j = findJob(c.jobId);
                return (
                  <li key={c.id} className="flex items-center gap-3 px-6 py-3">
                    {c.photo ? (
                      <Image
                        src={`/assets/photos/${c.photo}.jpg`}
                        alt=""
                        width={40}
                        height={40}
                        className="rounded-full object-cover w-10 h-10 shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-cocoon-ink text-cocoon-yellow grid place-items-center font-serif text-base shrink-0">
                        {c.name[0]}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-cocoon-ink truncate">{c.name}</div>
                      <div className="text-xs text-cocoon-mid truncate">{c.currentRole}</div>
                    </div>
                    <div className="hidden sm:block text-right shrink-0">
                      <div className="text-xs text-cocoon-graphite truncate max-w-[140px]">{j?.title}</div>
                      <div className="mt-0.5">
                        <StageBadge stage={c.stage} />
                      </div>
                    </div>
                    <div className="shrink-0">
                      <MatchScore score={c.matchScore} />
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </section>
    </>
  );
}
