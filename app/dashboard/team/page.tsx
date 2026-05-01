import PageHeader from '@/components/dashboard/PageHeader';
import { Pill } from '@/components/dashboard/Badges';
import { Button } from '@/components/dashboard/Buttons';
import { recruiters } from '@/lib/sample-data';

const team = [
  ...recruiters.map((r) => ({
    ...r,
    accessLevel: r.role.includes('Admin') ? 'Admin' : r.role.includes('Lead') ? 'Manager' : 'Member',
    status: 'Active',
    lastActive: r.id === 'r2' ? 'Now' : ['12m ago', '34m ago', '1h ago', '3h ago'][parseInt(r.id.slice(1)) % 4],
  })),
  { id: 'h1', name: 'Eve Daniels', initial: 'E', role: 'Hiring Manager · Design', email: 'eve@cocoonai.co.uk', workload: 4, capacity: 10, accessLevel: 'Hiring manager', status: 'Active', lastActive: '2h ago' },
  { id: 'h2', name: 'Marcus Lee', initial: 'M', role: 'Hiring Manager · Engineering', email: 'marcus@cocoonai.co.uk', workload: 6, capacity: 12, accessLevel: 'Hiring manager', status: 'Active', lastActive: 'Yesterday' },
  { id: 'h3', name: 'Theo Wilkins', initial: 'T', role: 'Recruiter (pending)', email: 'theo@cocoonai.co.uk', workload: 0, capacity: 30, accessLevel: 'Member', status: 'Invited', lastActive: '—' },
];

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Team"
        title="Workspace members"
        description="Manage recruiters, hiring managers, and admin access. View workload, recent activity, and roles."
        actions={
          <>
            <Button>
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Roles & permissions
            </Button>
            <Button variant="primary">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Invite member
            </Button>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Members', value: team.length },
          { label: 'Hiring managers', value: team.filter((t) => t.accessLevel === 'Hiring manager').length },
          { label: 'Pending invites', value: team.filter((t) => t.status === 'Invited').length },
          { label: 'Seats remaining', value: 12 - team.filter((t) => t.status === 'Active').length },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-cocoon-border bg-white p-4">
            <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-cocoon-graphite">
              {s.label}
            </div>
            <div className="font-serif text-2xl text-cocoon-ink leading-none mt-2">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Performance widgets */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-cocoon-border bg-white p-6">
          <h3 className="text-sm font-semibold text-cocoon-ink mb-1">Top recruiter this quarter</h3>
          <p className="text-xs text-cocoon-mid mb-4">Hires closed × candidate satisfaction.</p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-cocoon-ink text-cocoon-yellow grid place-items-center font-serif text-xl">M</div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-cocoon-ink">Maya Patel</div>
              <div className="text-xs text-cocoon-mid">12 hires · 4.8 avg satisfaction</div>
            </div>
            <Pill tone="yellow">Top</Pill>
          </div>
        </div>
        <div className="rounded-2xl border border-cocoon-border bg-white p-6">
          <h3 className="text-sm font-semibold text-cocoon-ink mb-1">Fastest screen-to-hire</h3>
          <p className="text-xs text-cocoon-mid mb-4">Avg time from application to offer.</p>
          <div className="font-serif text-3xl text-cocoon-ink leading-none">14.2d</div>
          <div className="text-xs text-cocoon-graphite mt-2">Daniel Kim · Engineering · 18% faster than team avg.</div>
        </div>
        <div className="rounded-2xl border border-cocoon-border bg-white p-6">
          <h3 className="text-sm font-semibold text-cocoon-ink mb-1">Best feedback turnaround</h3>
          <p className="text-xs text-cocoon-mid mb-4">Hiring manager response within SLA.</p>
          <div className="font-serif text-3xl text-cocoon-ink leading-none">96%</div>
          <div className="text-xs text-cocoon-graphite mt-2">Eve Daniels · Design</div>
        </div>
      </section>

      {/* Team table */}
      <section className="rounded-2xl border border-cocoon-border bg-white overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-cocoon-border bg-cocoon-bg/40">
          <div className="text-xs text-cocoon-graphite">
            <strong className="text-cocoon-ink">{team.length}</strong> members · <strong className="text-cocoon-ink">{team.filter((t) => t.status === 'Active').length}</strong> active
          </div>
          <div className="flex items-center gap-2">
            <select className="rounded-md border border-cocoon-border bg-white px-2 py-1 text-xs">
              <option>All access levels</option>
              <option>Admin</option>
              <option>Manager</option>
              <option>Member</option>
              <option>Hiring manager</option>
            </select>
          </div>
        </div>
        <table className="min-w-full text-sm">
          <thead className="bg-white text-[11px] font-semibold tracking-[0.14em] uppercase text-cocoon-graphite border-b border-cocoon-border">
            <tr>
              <th className="text-left px-6 py-3">Member</th>
              <th className="text-left px-3 py-3">Access</th>
              <th className="text-left px-3 py-3">Status</th>
              <th className="text-left px-3 py-3">Workload</th>
              <th className="text-left px-3 py-3">Last active</th>
              <th className="px-3 py-3 w-10" />
            </tr>
          </thead>
          <tbody>
            {team.map((m, i) => (
              <tr key={m.id} className={i > 0 ? 'border-t border-cocoon-border' : ''}>
                <td className="px-6 py-3 align-middle">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-cocoon-ink text-cocoon-yellow grid place-items-center font-serif text-sm">{m.initial}</div>
                    <div>
                      <div className="text-sm font-semibold text-cocoon-ink">{m.name}</div>
                      <div className="text-xs text-cocoon-mid">{m.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 align-middle">
                  <Pill tone={m.accessLevel === 'Admin' ? 'ink' : m.accessLevel === 'Hiring manager' ? 'violet' : 'gray'}>
                    {m.accessLevel}
                  </Pill>
                </td>
                <td className="px-3 py-3 align-middle">
                  <Pill tone={m.status === 'Active' ? 'green' : 'amber'} dot>{m.status}</Pill>
                </td>
                <td className="px-3 py-3 align-middle">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-cocoon-cream rounded-full overflow-hidden">
                      <div className="h-full bg-cocoon-ink rounded-full" style={{ width: `${(m.workload / m.capacity) * 100}%` }} />
                    </div>
                    <span className="text-xs text-cocoon-graphite">{m.workload}/{m.capacity}</span>
                  </div>
                </td>
                <td className="px-3 py-3 align-middle text-sm text-cocoon-mid">{m.lastActive}</td>
                <td className="px-3 py-3 align-middle">
                  <button type="button" className="w-7 h-7 grid place-items-center rounded-md hover:bg-cocoon-bg text-cocoon-mid hover:text-cocoon-ink">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <circle cx="5" cy="12" r="1.6" />
                      <circle cx="12" cy="12" r="1.6" />
                      <circle cx="19" cy="12" r="1.6" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Roles reference */}
      <section className="rounded-2xl border border-cocoon-border bg-white p-6">
        <h3 className="font-serif text-xl text-cocoon-ink leading-none mb-4">Roles & permissions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { name: 'Admin', desc: 'Full access. Manage billing, members, integrations.', tone: 'ink' as const },
            { name: 'Manager', desc: 'Manage jobs, candidates, pipeline. Cannot manage billing.', tone: 'violet' as const },
            { name: 'Member', desc: 'Recruiter access — own jobs and candidates assigned to them.', tone: 'gray' as const },
            { name: 'Hiring manager', desc: 'See assigned roles, leave feedback, schedule interviews.', tone: 'gray' as const },
          ].map((r) => (
            <div key={r.name} className="rounded-xl border border-cocoon-border bg-cocoon-bg/50 p-4">
              <Pill tone={r.tone}>{r.name}</Pill>
              <p className="text-xs text-cocoon-graphite mt-3 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
