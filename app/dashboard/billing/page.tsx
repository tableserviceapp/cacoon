import PageHeader from '@/components/dashboard/PageHeader';
import { Pill } from '@/components/dashboard/Badges';
import { Button } from '@/components/dashboard/Buttons';

const invoices = [
  { id: 'INV-2026-04', date: '2026-04-01', amount: '£480.00', status: 'Paid' },
  { id: 'INV-2026-03', date: '2026-03-01', amount: '£480.00', status: 'Paid' },
  { id: 'INV-2026-02', date: '2026-02-01', amount: '£420.00', status: 'Paid' },
  { id: 'INV-2026-01', date: '2026-01-01', amount: '£420.00', status: 'Paid' },
  { id: 'INV-2025-12', date: '2025-12-01', amount: '£420.00', status: 'Paid' },
];

export default function BillingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Billing"
        title="Plan & billing"
        description="Manage your subscription, seats, AI usage and payment method."
        actions={
          <>
            <Button>Talk to sales</Button>
            <Button variant="primary">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Upgrade to Scale
            </Button>
          </>
        }
      />

      {/* Plan summary */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl border border-cocoon-border bg-cocoon-ink text-cocoon-cream p-6 relative overflow-hidden">
          <div aria-hidden className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-cocoon-yellow opacity-15 blur-md" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <Pill tone="yellow">Growth</Pill>
              <span className="text-xs text-cocoon-cream/70">· billed monthly</span>
            </div>
            <div className="font-serif text-4xl text-cocoon-cream leading-none mt-2">£480 / mo</div>
            <p className="text-sm text-cocoon-cream/70 mt-2 max-w-md">
              Up to 10 active jobs, 5 admin seats, unlimited candidates, and 10,000 AI credits per month.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-cocoon-yellow">Renewal</div>
                <div className="font-serif text-xl text-cocoon-cream mt-1">Jun 1, 2026</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-cocoon-yellow">Card</div>
                <div className="font-serif text-xl text-cocoon-cream mt-1">···· 4242</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-cocoon-yellow">Tax</div>
                <div className="font-serif text-xl text-cocoon-cream mt-1">VAT GB</div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <button type="button" className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-semibold">Update card</button>
              <button type="button" className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-semibold">Change billing email</button>
              <button type="button" className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-semibold">Cancel plan</button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-cocoon-border bg-white p-6">
          <h3 className="font-serif text-xl text-cocoon-ink leading-none">Need more?</h3>
          <p className="text-sm text-cocoon-graphite mt-2">
            Move to Scale for unlimited jobs, advanced analytics, custom roles, and priority AI capacity.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              'Unlimited active jobs',
              '15 admin seats included',
              '50,000 AI credits / mo',
              'Advanced analytics & reporting',
              'Single sign-on (SSO)',
              'Custom integrations',
            ].map((f) => (
              <li key={f} className="flex items-center gap-2 text-cocoon-ink">
                <span className="w-4 h-4 rounded-full bg-cocoon-yellow grid place-items-center shrink-0">
                  <svg viewBox="0 0 16 16" fill="none" className="w-2.5 h-2.5">
                    <path d="M3.5 8.5l3 3 6-7" stroke="var(--cocoon-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {f}
              </li>
            ))}
          </ul>
          <Button variant="primary" className="mt-5 w-full justify-center">Upgrade to Scale · £980/mo</Button>
        </div>
      </section>

      {/* Usage */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { label: 'Seats used', value: '5 / 5', pct: 100, hint: 'Purchase more to invite teammates.' },
          { label: 'Active jobs', value: '7 / 10', pct: 70, hint: '3 slots remaining this month.' },
          { label: 'AI credits', value: '2,310 / 10,000', pct: 23, hint: 'Resets June 1.' },
        ].map((u) => (
          <div key={u.label} className="rounded-2xl border border-cocoon-border bg-white p-5">
            <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-cocoon-graphite">
              {u.label}
            </div>
            <div className="font-serif text-2xl text-cocoon-ink leading-none mt-2">{u.value}</div>
            <div className="mt-3 h-1.5 rounded-full bg-cocoon-cream overflow-hidden">
              <div className={`h-full rounded-full ${u.pct >= 90 ? 'bg-red-400' : 'bg-cocoon-ink'}`} style={{ width: `${u.pct}%` }} />
            </div>
            <p className="text-xs text-cocoon-mid mt-2">{u.hint}</p>
          </div>
        ))}
      </section>

      {/* Invoices */}
      <section className="rounded-2xl border border-cocoon-border bg-white">
        <div className="flex items-center justify-between px-6 py-4 border-b border-cocoon-border">
          <h2 className="font-serif text-xl text-cocoon-ink leading-none">Invoices</h2>
          <Button>Download all</Button>
        </div>
        <table className="min-w-full text-sm">
          <thead className="bg-cocoon-bg/40 text-[11px] font-semibold tracking-[0.14em] uppercase text-cocoon-graphite border-b border-cocoon-border">
            <tr>
              <th className="text-left px-6 py-3">Invoice</th>
              <th className="text-left px-3 py-3">Date</th>
              <th className="text-right px-3 py-3">Amount</th>
              <th className="text-left px-3 py-3">Status</th>
              <th className="text-right px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, i) => (
              <tr key={inv.id} className={i > 0 ? 'border-t border-cocoon-border' : ''}>
                <td className="px-6 py-3 align-middle text-sm font-semibold text-cocoon-ink">{inv.id}</td>
                <td className="px-3 py-3 align-middle text-sm text-cocoon-graphite">{inv.date}</td>
                <td className="px-3 py-3 align-middle text-right font-serif text-base text-cocoon-ink">{inv.amount}</td>
                <td className="px-3 py-3 align-middle"><Pill tone="green" dot>{inv.status}</Pill></td>
                <td className="px-6 py-3 align-middle text-right">
                  <button type="button" className="text-xs font-semibold text-cocoon-ink hover:underline">Download PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
