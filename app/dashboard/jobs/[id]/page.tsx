import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/dashboard/PageHeader';
import Tabs from '@/components/dashboard/Tabs';
import { Pill, JobStatusBadge, StageBadge, MatchScore } from '@/components/dashboard/Badges';
import { Button } from '@/components/dashboard/Buttons';
import Funnel from '@/components/dashboard/charts/Funnel';
import LineChart from '@/components/dashboard/charts/LineChart';
import {
  candidates,
  findJob,
  findRecruiter,
  interviews,
  jobs,
} from '@/lib/sample-data';

export function generateStaticParams() {
  return jobs.map((j) => ({ id: j.id }));
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = findJob(id);
  if (!job) notFound();
  const recruiter = findRecruiter(job.recruiterId);
  const jobCandidates = candidates.filter((c) => c.jobId === job.id);
  const jobInterviews = interviews.filter((iv) => iv.jobId === job.id);

  const funnel = [
    { label: 'Applied', count: job.applicants },
    { label: 'Screening', count: Math.round(job.applicants * 0.4) },
    { label: 'Shortlisted', count: job.shortlisted },
    { label: 'Interview', count: job.interviewing },
    { label: 'Offer', count: job.offers },
  ];

  return (
    <>
      <PageHeader
        eyebrow={`${job.team} · ${job.location}`}
        title={job.title}
        actions={
          <>
            <Button>
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Share link
            </Button>
            <Button>Pause</Button>
            <Button variant="primary">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Add candidate
            </Button>
          </>
        }
        meta={
          <div className="flex flex-wrap items-center gap-2">
            <JobStatusBadge status={job.status} />
            <Pill tone="gray">{job.type}</Pill>
            <Pill tone="gray">{job.salary}</Pill>
            <Pill tone="gray">Posted {job.postedDays}d ago</Pill>
            {job.priority === 'urgent' && <Pill tone="red" dot>Urgent</Pill>}
          </div>
        }
      />

      {/* Quick stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {[
          { label: 'Applicants', value: job.applicants },
          { label: 'Screening', value: Math.round(job.applicants * 0.4) },
          { label: 'Shortlisted', value: job.shortlisted },
          { label: 'Interviewing', value: job.interviewing },
          { label: 'Offers', value: job.offers },
          { label: 'Days open', value: job.postedDays },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-cocoon-border bg-white p-4">
            <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-cocoon-graphite">
              {s.label}
            </div>
            <div className="font-serif text-2xl text-cocoon-ink leading-none mt-2">
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <Tabs
        tabs={[
          {
            id: 'overview',
            label: 'Overview',
            content: <OverviewTab job={job} funnel={funnel} />,
          },
          {
            id: 'applicants',
            label: 'Applicants',
            count: jobCandidates.length,
            content: <ApplicantsTab candidates={jobCandidates} />,
          },
          {
            id: 'pipeline',
            label: 'Pipeline',
            count: job.shortlisted + job.interviewing + job.offers,
            content: <PipelineTab candidates={jobCandidates} />,
          },
          {
            id: 'interviews',
            label: 'Interviews',
            count: jobInterviews.length,
            content: <InterviewsTab interviews={jobInterviews} />,
          },
          {
            id: 'ai-insights',
            label: 'AI Insights',
            content: <AiInsightsTab />,
          },
          {
            id: 'settings',
            label: 'Settings',
            content: <SettingsTab job={job} recruiter={recruiter?.name} />,
          },
        ]}
      />
    </>
  );
}

function OverviewTab({ job, funnel }: { job: ReturnType<typeof findJob>; funnel: { label: string; count: number }[] }) {
  if (!job) return null;
  const recruiter = findRecruiter(job.recruiterId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 space-y-4">
        <div className="rounded-2xl border border-cocoon-border bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg text-cocoon-ink leading-none">Job description</h3>
            <button type="button" className="text-xs font-semibold text-cocoon-ink hover:underline">
              Edit
            </button>
          </div>
          <div className="prose prose-sm max-w-none text-cocoon-graphite">
            <p>
              We&apos;re looking for a {job.title.toLowerCase()} to join the {job.team} team at Cocoon.
              You&apos;ll partner with the founding team to shape how the platform feels — across the
              candidate web app, recruiter workspace, and our marketing surfaces.
            </p>
            <p className="font-semibold text-cocoon-ink mt-4">What you&apos;ll do</p>
            <ul>
              <li>Lead end-to-end design for new product surfaces.</li>
              <li>Run discovery research with hiring teams and candidates.</li>
              <li>Partner closely with engineering, product, and brand.</li>
              <li>Contribute to the design system and craft of the team.</li>
            </ul>
            <p className="font-semibold text-cocoon-ink mt-4">What we&apos;re looking for</p>
            <ul>
              <li>5+ years working in product design, ideally at an early-stage SaaS or marketplace.</li>
              <li>Strong systems thinking and a portfolio that shows shipped work.</li>
              <li>Comfortable owning ambiguous problems end-to-end.</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-cocoon-border bg-white p-6">
          <h3 className="font-serif text-lg text-cocoon-ink leading-none mb-4">Job performance</h3>
          <LineChart
            labels={['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6']}
            series={[
              { label: 'Applications', data: [22, 38, 41, 52, 64, 70] },
              { label: 'Shortlisted', data: [3, 6, 8, 11, 14, 18] },
            ]}
          />
          <div className="flex items-center gap-4 text-xs mt-3">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-cocoon-ink" />
              <span className="text-cocoon-graphite">Applications</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-cocoon-yellow" />
              <span className="text-cocoon-graphite">Shortlisted</span>
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-cocoon-border bg-white p-6">
          <h3 className="font-serif text-lg text-cocoon-ink leading-none mb-4">Hiring team</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-cocoon-ink text-cocoon-yellow grid place-items-center font-serif text-sm">{recruiter?.initial}</div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-cocoon-ink">{recruiter?.name}</div>
                <div className="text-xs text-cocoon-mid">Recruiter · owner</div>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-cocoon-cream text-cocoon-ink grid place-items-center font-serif text-sm">{job.hiringManager[0]}</div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-cocoon-ink">{job.hiringManager}</div>
                <div className="text-xs text-cocoon-mid">Hiring manager</div>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-cocoon-cream text-cocoon-ink grid place-items-center font-serif text-sm">R</div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-cocoon-ink">Ross Joseph</div>
                <div className="text-xs text-cocoon-mid">Approver · founder</div>
              </div>
            </li>
          </ul>
          <button type="button" className="mt-4 w-full text-sm font-semibold text-cocoon-ink border border-cocoon-border rounded-lg py-2 hover:bg-cocoon-cream">
            + Invite teammate
          </button>
        </div>

        <div className="rounded-2xl border border-cocoon-border bg-white p-6">
          <h3 className="font-serif text-lg text-cocoon-ink leading-none mb-4">Funnel</h3>
          <Funnel stages={funnel} />
        </div>

        <div className="rounded-2xl border border-cocoon-yellow bg-cocoon-yellow/30 p-5">
          <div className="flex items-center gap-2 mb-2">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-cocoon-ink">
              <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-cocoon-ink">AI helper</span>
          </div>
          <p className="text-sm text-cocoon-ink leading-snug">
            Your JD scores 87% for inclusivity. Two phrases may bias against early-career candidates.
          </p>
          <button type="button" className="mt-3 text-xs font-semibold text-cocoon-ink underline">
            Open AI rewrite
          </button>
        </div>
      </div>
    </div>
  );
}

function ApplicantsTab({ candidates }: { candidates: typeof import('@/lib/sample-data').candidates }) {
  if (candidates.length === 0) {
    return (
      <div className="rounded-2xl border border-cocoon-border bg-white p-12 text-center text-cocoon-graphite">
        No applicants yet. Share the job to start receiving applications.
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-cocoon-border bg-white overflow-hidden">
      <table className="min-w-full text-sm">
        <thead className="bg-cocoon-bg/40 text-[11px] font-semibold tracking-[0.14em] uppercase text-cocoon-graphite border-b border-cocoon-border">
          <tr>
            <th className="text-left px-5 py-3">Candidate</th>
            <th className="text-left px-3 py-3">Stage</th>
            <th className="text-right px-3 py-3">Match</th>
            <th className="text-left px-3 py-3">Source</th>
            <th className="text-left px-3 py-3">Applied</th>
            <th className="px-3 py-3" />
          </tr>
        </thead>
        <tbody>
          {candidates.map((c, i) => (
            <tr key={c.id} className={i > 0 ? 'border-t border-cocoon-border' : ''}>
              <td className="px-5 py-3 align-middle">
                <div className="flex items-center gap-3">
                  {c.photo ? (
                    <Image src={`/assets/photos/${c.photo}.jpg`} alt="" width={36} height={36} className="rounded-full object-cover w-9 h-9" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-cocoon-ink text-cocoon-yellow grid place-items-center font-serif text-sm">{c.name[0]}</div>
                  )}
                  <div>
                    <div className="text-sm font-semibold text-cocoon-ink">{c.name}</div>
                    <div className="text-xs text-cocoon-mid">{c.currentRole}</div>
                  </div>
                </div>
              </td>
              <td className="px-3 py-3 align-middle"><StageBadge stage={c.stage} /></td>
              <td className="px-3 py-3 align-middle text-right"><MatchScore score={c.matchScore} /></td>
              <td className="px-3 py-3 align-middle text-cocoon-graphite text-sm">{c.source}</td>
              <td className="px-3 py-3 align-middle text-cocoon-mid text-sm">{c.appliedDate}</td>
              <td className="px-3 py-3 align-middle text-right">
                <Link href="/dashboard/candidates" className="text-xs font-semibold text-cocoon-ink no-underline hover:underline">
                  Open →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PipelineTab({ candidates }: { candidates: typeof import('@/lib/sample-data').candidates }) {
  const stages = ['Applied', 'Screening', 'Shortlisted', 'Interview', 'Offer'] as const;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
      {stages.map((stage) => {
        const inStage = candidates.filter((c) => c.stage === stage);
        return (
          <div key={stage} className="rounded-xl bg-cocoon-bg border border-cocoon-border p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-cocoon-graphite">
                {stage}
              </div>
              <span className="text-xs font-semibold text-cocoon-ink bg-white border border-cocoon-border rounded-md px-1.5">
                {inStage.length}
              </span>
            </div>
            <div className="space-y-2">
              {inStage.map((c) => (
                <div key={c.id} className="rounded-lg bg-white border border-cocoon-border p-3">
                  <div className="text-sm font-semibold text-cocoon-ink">{c.name}</div>
                  <div className="text-xs text-cocoon-mid mb-2">{c.currentRole}</div>
                  <MatchScore score={c.matchScore} />
                </div>
              ))}
              {inStage.length === 0 && (
                <div className="text-xs text-cocoon-mid italic text-center py-4">
                  No candidates
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function InterviewsTab({ interviews }: { interviews: typeof import('@/lib/sample-data').interviews }) {
  if (interviews.length === 0) {
    return (
      <div className="rounded-2xl border border-cocoon-border bg-white p-12 text-center text-cocoon-graphite">
        No interviews scheduled for this job yet.
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-cocoon-border bg-white">
      <ul className="divide-y divide-cocoon-border">
        {interviews.map((iv) => {
          const c = candidates.find((x) => x.id === iv.candidateId);
          return (
            <li key={iv.id} className="flex items-center gap-4 px-6 py-4">
              <div className="w-12 h-12 rounded-lg bg-cocoon-cream text-cocoon-ink grid place-items-center text-center shrink-0">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider leading-none text-cocoon-mid">
                    {new Date(iv.date).toLocaleDateString('en-GB', { month: 'short' })}
                  </div>
                  <div className="font-serif text-lg leading-none mt-0.5">
                    {new Date(iv.date).getDate()}
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-semibold text-cocoon-ink">{c?.name}</div>
                  <Pill tone="gray">{iv.type}</Pill>
                </div>
                <div className="text-xs text-cocoon-mid mt-0.5">
                  {iv.time} · {iv.durationMin}min · {iv.location} · with {iv.interviewers.join(', ')}
                </div>
              </div>
              <Pill tone={iv.status === 'Completed' ? 'green' : 'blue'}>{iv.status}</Pill>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function AiInsightsTab() {
  const insights = [
    { tone: 'green' as const, title: 'JD inclusivity score: 87/100', body: 'Two gendered phrases detected. Switching them could improve diverse application rate by ~12%.' },
    { tone: 'amber' as const, title: 'Time-to-screen is +3d above team average', body: 'Maya is reviewing applicants ~2.4 days slower than the team norm. Consider auto-screening top matches.' },
    { tone: 'blue' as const, title: '14 strong matches not yet contacted', body: 'AI surfaced 14 candidates above 85% match score who haven&apos;t received outreach. Generate a draft.' },
    { tone: 'gray' as const, title: 'Salary band looks competitive', body: 'Within the 60–75th percentile for similar roles in London. No action needed.' },
  ];
  const toneClasses: Record<string, string> = {
    green: 'border-emerald-100 bg-emerald-50/50',
    amber: 'border-amber-100 bg-amber-50/50',
    blue: 'border-sky-100 bg-sky-50/50',
    gray: 'border-cocoon-border bg-cocoon-bg/50',
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {insights.map((ins) => (
        <div key={ins.title} className={`rounded-2xl border p-5 ${toneClasses[ins.tone]}`}>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-cocoon-border grid place-items-center shrink-0 text-cocoon-ink">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-cocoon-ink">{ins.title}</h4>
              <p className="text-sm text-cocoon-graphite mt-1 leading-relaxed">{ins.body}</p>
              <button type="button" className="mt-3 text-xs font-semibold text-cocoon-ink hover:underline">
                Take action →
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SettingsTab({ job, recruiter }: { job: NonNullable<ReturnType<typeof findJob>>; recruiter?: string }) {
  return (
    <div className="rounded-2xl border border-cocoon-border bg-white divide-y divide-cocoon-border">
      {[
        { label: 'Job title', value: job.title },
        { label: 'Status', value: job.status },
        { label: 'Department', value: job.team },
        { label: 'Location', value: job.location },
        { label: 'Type', value: job.type },
        { label: 'Salary band', value: job.salary },
        { label: 'Hiring manager', value: job.hiringManager },
        { label: 'Recruiter', value: recruiter ?? '—' },
        { label: 'Visibility', value: 'Public · indexed by Cocoon match' },
      ].map((row) => (
        <div key={row.label} className="grid grid-cols-3 px-6 py-4 items-center">
          <div className="text-xs font-semibold tracking-[0.14em] uppercase text-cocoon-graphite">
            {row.label}
          </div>
          <div className="col-span-2 flex items-center justify-between gap-4">
            <span className="text-sm text-cocoon-ink">{row.value}</span>
            <button type="button" className="text-xs font-semibold text-cocoon-ink hover:underline">Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
}
