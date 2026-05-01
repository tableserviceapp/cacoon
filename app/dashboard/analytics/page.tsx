import PageHeader from '@/components/dashboard/PageHeader';
import KpiCard from '@/components/dashboard/KpiCard';
import { Pill } from '@/components/dashboard/Badges';
import { Button } from '@/components/dashboard/Buttons';
import LineChart from '@/components/dashboard/charts/LineChart';
import BarChart from '@/components/dashboard/charts/BarChart';
import Funnel from '@/components/dashboard/charts/Funnel';
import Donut from '@/components/dashboard/charts/Donut';
import { jobs, recruiters, findRecruiter } from '@/lib/sample-data';

const kpis = [
  {
    label: 'Time to hire',
    value: '21d',
    change: '−4d',
    changeLabel: 'vs last quarter',
    spark: [28, 26, 25, 23, 22, 21, 21],
  },
  {
    label: 'Time to fill',
    value: '34d',
    change: '−3d',
    changeLabel: 'vs last quarter',
    spark: [40, 38, 37, 36, 35, 34, 34],
  },
  {
    label: 'Offer accept rate',
    value: '78%',
    change: '+6pp',
    changeLabel: 'this quarter',
    spark: [62, 65, 68, 70, 73, 76, 78],
  },
  {
    label: 'Source quality',
    value: '4.2',
    change: '+0.3',
    changeLabel: 'avg match score / hire',
    spark: [3.6, 3.8, 3.9, 4.0, 4.1, 4.2, 4.2],
  },
  {
    label: 'Recruiter activity',
    value: '142',
    change: '+18',
    changeLabel: 'actions / day',
    spark: [110, 118, 122, 130, 134, 138, 142],
  },
  {
    label: 'Interview-to-offer',
    value: '23%',
    change: '+4pp',
    changeLabel: 'this quarter',
    spark: [16, 18, 19, 20, 21, 22, 23],
  },
];

const funnel = [
  { label: 'Applied', count: 1058 },
  { label: 'Screening', count: 312 },
  { label: 'Shortlisted', count: 124 },
  { label: 'Interview', count: 48 },
  { label: 'Offer', count: 9 },
  { label: 'Hired', count: 7 },
];

const sourceDonut = [
  { label: 'Cocoon match', value: 42 },
  { label: 'LinkedIn', value: 24 },
  { label: 'Referral', value: 14 },
  { label: 'Job board', value: 12 },
  { label: 'Direct outreach', value: 8 },
];

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Analytics"
        title="Hiring analytics"
        description="Time-to-hire, source effectiveness, recruiter productivity, and funnel conversion. Drill down by role or owner."
        actions={
          <>
            <select className="rounded-lg border border-cocoon-border bg-white px-3 py-2 text-sm font-medium">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This quarter</option>
              <option>This year</option>
            </select>
            <Button>
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Export PDF
            </Button>
          </>
        }
      />

      <section className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </section>

      {/* Applications over time + funnel */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 rounded-2xl border border-cocoon-border bg-white p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-serif text-xl text-cocoon-ink leading-none">Applications over time</h2>
              <p className="text-xs text-cocoon-mid mt-1">Volume by week, all jobs · last 8 weeks.</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-2 text-cocoon-graphite">
                <span className="w-2.5 h-2.5 rounded-sm bg-cocoon-ink" />
                Total applications
              </span>
              <span className="flex items-center gap-2 text-cocoon-graphite">
                <span className="w-2.5 h-2.5 rounded-sm bg-cocoon-yellow" />
                Shortlisted
              </span>
            </div>
          </div>
          <LineChart
            labels={['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7', 'Wk 8']}
            series={[
              { label: 'Applications', data: [82, 110, 142, 166, 184, 210, 248, 276] },
              { label: 'Shortlisted', data: [9, 12, 16, 20, 24, 28, 30, 36] },
            ]}
          />
        </div>

        <div className="rounded-2xl border border-cocoon-border bg-white p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl text-cocoon-ink leading-none">Funnel</h2>
            <Pill tone="green" dot>+12% conversion</Pill>
          </div>
          <Funnel stages={funnel} />
        </div>
      </section>

      {/* Job performance */}
      <section className="rounded-2xl border border-cocoon-border bg-white">
        <div className="flex items-center justify-between px-6 py-4 border-b border-cocoon-border">
          <div>
            <h2 className="font-serif text-xl text-cocoon-ink leading-none">Jobs performance</h2>
            <p className="text-xs text-cocoon-mid mt-1">Compare time-to-fill, conversion, and offer rate by role.</p>
          </div>
          <Button>Compare roles</Button>
        </div>
        <table className="min-w-full text-sm">
          <thead className="bg-cocoon-bg/40 text-[11px] font-semibold tracking-[0.14em] uppercase text-cocoon-graphite border-b border-cocoon-border">
            <tr>
              <th className="text-left px-6 py-3">Job</th>
              <th className="text-right px-3 py-3">Applicants</th>
              <th className="text-right px-3 py-3">Shortlisted</th>
              <th className="text-right px-3 py-3">Interview</th>
              <th className="text-right px-3 py-3">Offer</th>
              <th className="text-right px-3 py-3">Time to fill</th>
              <th className="text-right px-3 py-3">Conv. (apply → offer)</th>
            </tr>
          </thead>
          <tbody>
            {jobs.filter((j) => j.applicants > 0).slice(0, 6).map((j, i) => {
              const conv = j.applicants ? ((j.offers / j.applicants) * 100).toFixed(1) : '0';
              return (
                <tr key={j.id} className={i > 0 ? 'border-t border-cocoon-border' : ''}>
                  <td className="px-6 py-3 align-middle">
                    <div className="text-sm font-semibold text-cocoon-ink">{j.title}</div>
                    <div className="text-xs text-cocoon-mid">{j.team} · {j.location}</div>
                  </td>
                  <td className="px-3 py-3 align-middle text-right font-serif text-base">{j.applicants}</td>
                  <td className="px-3 py-3 align-middle text-right font-serif text-base">{j.shortlisted}</td>
                  <td className="px-3 py-3 align-middle text-right font-serif text-base">{j.interviewing}</td>
                  <td className="px-3 py-3 align-middle text-right font-serif text-base">{j.offers}</td>
                  <td className="px-3 py-3 align-middle text-right text-sm">{j.postedDays}d</td>
                  <td className="px-3 py-3 align-middle text-right">
                    <span className="font-serif text-sm">{conv}%</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* Source breakdown + recruiter productivity */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-cocoon-border bg-white p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-serif text-xl text-cocoon-ink leading-none">Source performance</h2>
              <p className="text-xs text-cocoon-mid mt-1">Where your hires came from this quarter.</p>
            </div>
          </div>
          <Donut slices={sourceDonut} />
          <div className="mt-5 text-xs text-cocoon-graphite">
            <strong className="text-cocoon-ink">Cocoon match</strong> hires close 38% faster than other sources.
          </div>
        </div>

        <div className="rounded-2xl border border-cocoon-border bg-white p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-serif text-xl text-cocoon-ink leading-none">Recruiter productivity</h2>
              <p className="text-xs text-cocoon-mid mt-1">Hires per recruiter this quarter.</p>
            </div>
          </div>
          <BarChart
            data={recruiters.map((r) => ({ label: r.name.split(' ')[0], value: Math.round(r.workload * 0.4) }))}
          />
        </div>
      </section>

      {/* Hiring manager response */}
      <section className="rounded-2xl border border-cocoon-border bg-white">
        <div className="flex items-center justify-between px-6 py-4 border-b border-cocoon-border">
          <div>
            <h2 className="font-serif text-xl text-cocoon-ink leading-none">Hiring manager response time</h2>
            <p className="text-xs text-cocoon-mid mt-1">How quickly hiring managers act on shortlists and feedback requests.</p>
          </div>
        </div>
        <ul className="divide-y divide-cocoon-border">
          {[
            { name: 'Eve Daniels', dept: 'Design', avgHours: 4.2, slaMet: 96 },
            { name: 'Marcus Lee', dept: 'Engineering', avgHours: 12.8, slaMet: 78 },
            { name: 'Sophia Rojas', dept: 'Customer', avgHours: 6.1, slaMet: 92 },
            { name: 'Ross Joseph', dept: 'Founder', avgHours: 18.4, slaMet: 64 },
          ].map((m) => (
            <li key={m.name} className="grid grid-cols-1 sm:grid-cols-4 items-center gap-3 px-6 py-3.5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-cocoon-cream text-cocoon-ink grid place-items-center font-serif text-sm">{m.name[0]}</div>
                <div>
                  <div className="text-sm font-semibold text-cocoon-ink">{m.name}</div>
                  <div className="text-xs text-cocoon-mid">{m.dept}</div>
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-cocoon-mid">Avg response</div>
                <div className="font-serif text-base text-cocoon-ink">{m.avgHours}h</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-cocoon-mid">SLA met</div>
                <div className="font-serif text-base text-cocoon-ink">{m.slaMet}%</div>
              </div>
              <div>
                <div className="h-2 rounded-full bg-cocoon-cream overflow-hidden max-w-xs">
                  <div className={`h-full rounded-full ${m.slaMet >= 90 ? 'bg-emerald-400' : m.slaMet >= 75 ? 'bg-cocoon-yellow' : 'bg-red-400'}`} style={{ width: `${m.slaMet}%` }} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
