import Link from 'next/link';
import PageHeader from '@/components/dashboard/PageHeader';
import { Pill, JobStatusBadge } from '@/components/dashboard/Badges';
import { Button, LinkButton } from '@/components/dashboard/Buttons';
import { jobs, recruiters, findRecruiter } from '@/lib/sample-data';

const statusFilters = ['All', 'Open', 'Paused', 'Draft', 'Closed', 'Filled'] as const;
const departments = ['All teams', 'Design', 'Engineering', 'People', 'Marketing', 'Customer', 'Data'];
const savedViews = [
  { name: 'My open jobs', count: 7, active: true },
  { name: 'Urgent', count: 2 },
  { name: 'Awaiting hiring manager', count: 3 },
  { name: 'Closing this month', count: 4 },
];

export default function JobsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Jobs"
        title="Open requisitions"
        description="Every active and historical role across Cocoon. Filter, sort, and drill into any job to manage applicants and pipeline."
        actions={
          <>
            <Button>
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Save view
            </Button>
            <Button>
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Import
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

      {/* Saved views */}
      <div className="flex flex-wrap items-center gap-2">
        {savedViews.map((v) => (
          <button
            key={v.name}
            type="button"
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
              v.active
                ? 'bg-cocoon-ink text-cocoon-cream border-cocoon-ink'
                : 'bg-white text-cocoon-graphite border-cocoon-border hover:border-cocoon-ink hover:text-cocoon-ink'
            }`}
          >
            {v.name}
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
              v.active ? 'bg-cocoon-yellow text-cocoon-ink' : 'bg-cocoon-bg text-cocoon-graphite'
            }`}>
              {v.count}
            </span>
          </button>
        ))}
        <button type="button" className="inline-flex items-center gap-1 text-sm text-cocoon-graphite hover:text-cocoon-ink ml-1">
          <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          New view
        </button>
      </div>

      {/* Sticky filters */}
      <div className="sticky top-16 z-10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 bg-cocoon-bg/95 backdrop-blur-sm border-y border-cocoon-border">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <svg viewBox="0 0 24 24" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cocoon-mid">
              <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" />
              <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              placeholder="Search by title, team, location…"
              className="block w-full rounded-lg border border-cocoon-border bg-white pl-10 pr-4 py-2 text-sm focus:border-cocoon-ink focus:ring-0 focus:outline-none"
            />
          </div>

          <select className="rounded-lg border border-cocoon-border bg-white px-3 py-2 text-sm font-medium focus:border-cocoon-ink focus:ring-0">
            {statusFilters.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select className="rounded-lg border border-cocoon-border bg-white px-3 py-2 text-sm font-medium focus:border-cocoon-ink focus:ring-0">
            {departments.map((d) => <option key={d}>{d}</option>)}
          </select>
          <select className="rounded-lg border border-cocoon-border bg-white px-3 py-2 text-sm font-medium focus:border-cocoon-ink focus:ring-0">
            <option>All locations</option>
            <option>London</option>
            <option>Manchester</option>
            <option>Remote</option>
          </select>
          <select className="rounded-lg border border-cocoon-border bg-white px-3 py-2 text-sm font-medium focus:border-cocoon-ink focus:ring-0">
            <option>All recruiters</option>
            {recruiters.map((r) => <option key={r.id}>{r.name}</option>)}
          </select>
          <div className="flex-1" />
          <button type="button" className="text-sm text-cocoon-graphite hover:text-cocoon-ink">
            Clear filters
          </button>
        </div>
      </div>

      {/* Jobs table */}
      <div className="rounded-2xl border border-cocoon-border bg-white overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-cocoon-border bg-cocoon-bg/40">
          <div className="text-xs text-cocoon-graphite">
            <strong className="text-cocoon-ink">{jobs.length}</strong> jobs · <strong className="text-cocoon-ink">7</strong> open · <strong className="text-cocoon-ink">{jobs.reduce((s, j) => s + j.applicants, 0).toLocaleString()}</strong> total applicants
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-cocoon-mid">Sort:</span>
            <select className="rounded-md border border-cocoon-border bg-white px-2 py-1 text-xs font-medium">
              <option>Most recent</option>
              <option>Most applicants</option>
              <option>Priority</option>
              <option>Time to fill</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-white text-[11px] font-semibold tracking-[0.14em] uppercase text-cocoon-graphite border-b border-cocoon-border">
              <tr>
                <th className="text-left px-5 py-3 font-semibold w-8">
                  <input type="checkbox" className="rounded border-cocoon-border text-cocoon-ink focus:ring-cocoon-yellow" />
                </th>
                <th className="text-left px-3 py-3 font-semibold">Job</th>
                <th className="text-left px-3 py-3 font-semibold">Team</th>
                <th className="text-left px-3 py-3 font-semibold">Status</th>
                <th className="text-right px-3 py-3 font-semibold">Applicants</th>
                <th className="text-right px-3 py-3 font-semibold">Shortlist</th>
                <th className="text-right px-3 py-3 font-semibold">Interview</th>
                <th className="text-left px-3 py-3 font-semibold">Hiring manager</th>
                <th className="text-left px-3 py-3 font-semibold">Recruiter</th>
                <th className="text-left px-3 py-3 font-semibold">Posted</th>
                <th className="px-3 py-3 w-8" />
              </tr>
            </thead>
            <tbody>
              {jobs.map((j, i) => {
                const r = findRecruiter(j.recruiterId);
                return (
                  <tr key={j.id} className={`hover:bg-cocoon-bg/40 transition ${i > 0 ? 'border-t border-cocoon-border' : ''}`}>
                    <td className="px-5 py-3.5 align-middle">
                      <input type="checkbox" className="rounded border-cocoon-border text-cocoon-ink focus:ring-cocoon-yellow" />
                    </td>
                    <td className="px-3 py-3.5 align-middle">
                      <Link href={`/dashboard/jobs/${j.id}`} className="text-sm font-semibold text-cocoon-ink no-underline hover:underline">
                        {j.title}
                      </Link>
                      <div className="text-xs text-cocoon-mid">{j.location} · {j.type} · {j.salary}</div>
                      {j.priority === 'urgent' && (
                        <div className="mt-1"><Pill tone="red" dot>Urgent</Pill></div>
                      )}
                    </td>
                    <td className="px-3 py-3.5 align-middle text-sm text-cocoon-graphite">{j.team}</td>
                    <td className="px-3 py-3.5 align-middle"><JobStatusBadge status={j.status} /></td>
                    <td className="px-3 py-3.5 align-middle text-right font-serif text-base text-cocoon-ink">{j.applicants}</td>
                    <td className="px-3 py-3.5 align-middle text-right font-serif text-base text-cocoon-ink">{j.shortlisted}</td>
                    <td className="px-3 py-3.5 align-middle text-right font-serif text-base text-cocoon-ink">{j.interviewing}</td>
                    <td className="px-3 py-3.5 align-middle text-sm text-cocoon-graphite">{j.hiringManager}</td>
                    <td className="px-3 py-3.5 align-middle">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-cocoon-ink text-cocoon-yellow grid place-items-center font-serif text-xs">{r?.initial}</div>
                        <span className="text-sm text-cocoon-graphite">{r?.name.split(' ')[0]}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3.5 align-middle text-sm text-cocoon-mid">{j.postedDays === 0 ? '—' : `${j.postedDays}d`}</td>
                    <td className="px-3 py-3.5 align-middle">
                      <button type="button" className="w-7 h-7 grid place-items-center rounded-md hover:bg-cocoon-bg text-cocoon-mid hover:text-cocoon-ink">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <circle cx="5" cy="12" r="1.6" />
                          <circle cx="12" cy="12" r="1.6" />
                          <circle cx="19" cy="12" r="1.6" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t border-cocoon-border text-xs text-cocoon-graphite">
          <div>Showing 1–{jobs.length} of {jobs.length}</div>
          <div className="flex items-center gap-1">
            <button type="button" className="px-2 py-1 rounded hover:bg-cocoon-bg disabled:opacity-40" disabled>← Prev</button>
            <button type="button" className="px-2 py-1 rounded hover:bg-cocoon-bg">Next →</button>
          </div>
        </div>
      </div>
    </>
  );
}
