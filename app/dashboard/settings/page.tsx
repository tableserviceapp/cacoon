'use client';

import { useState } from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { Pill } from '@/components/dashboard/Badges';
import { Button } from '@/components/dashboard/Buttons';

const sections = [
  { id: 'company', label: 'Company profile', desc: 'Public info, careers page, logo.' },
  { id: 'hiring', label: 'Hiring preferences', desc: 'Defaults for new jobs.' },
  { id: 'pipeline', label: 'Pipeline configuration', desc: 'Stages, automations, SLAs.' },
  { id: 'interviews', label: 'Interview templates', desc: 'Scorecards, durations, kits.' },
  { id: 'email', label: 'Email templates', desc: 'Outreach, rejections, offers.' },
  { id: 'integrations', label: 'Integrations', desc: 'Calendar, ATS, Slack, SSO.' },
  { id: 'notifications', label: 'Notifications', desc: 'Email, in-app, digest preferences.' },
  { id: 'security', label: 'Security', desc: '2FA, sessions, audit log, GDPR.' },
  { id: 'ai', label: 'AI settings', desc: 'Model choice, redaction, opt-outs.' },
];

export default function SettingsPage() {
  const [active, setActive] = useState(sections[0].id);
  const activeSection = sections.find((s) => s.id === active)!;

  return (
    <>
      <PageHeader
        eyebrow="Settings"
        title="Workspace settings"
        description="Configure how your hiring team uses Cocoon — defaults, templates, integrations, and security."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">
        {/* Settings nav */}
        <nav className="rounded-2xl border border-cocoon-border bg-white p-2 h-fit lg:sticky lg:top-20">
          {sections.map((s) => {
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                className={`w-full text-left rounded-lg px-3 py-2 transition ${
                  isActive ? 'bg-cocoon-cream' : 'hover:bg-cocoon-bg'
                }`}
              >
                <div className="text-sm font-semibold text-cocoon-ink">{s.label}</div>
                <div className="text-[11px] text-cocoon-mid mt-0.5">{s.desc}</div>
              </button>
            );
          })}
        </nav>

        {/* Settings content */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-cocoon-border bg-white p-6">
            <h2 className="font-serif text-2xl text-cocoon-ink leading-none">{activeSection.label}</h2>
            <p className="text-sm text-cocoon-graphite mt-2">{activeSection.desc}</p>
          </div>

          {active === 'company' && <CompanySettings />}
          {active === 'hiring' && <HiringSettings />}
          {active === 'pipeline' && <PipelineSettings />}
          {active === 'interviews' && <InterviewSettings />}
          {active === 'email' && <EmailSettings />}
          {active === 'integrations' && <IntegrationsSettings />}
          {active === 'notifications' && <NotificationsSettings />}
          {active === 'security' && <SecuritySettings />}
          {active === 'ai' && <AiSettings />}
        </div>
      </div>
    </>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-4 border-b border-cocoon-border last:border-b-0">
      <div>
        <div className="text-sm font-semibold text-cocoon-ink">{label}</div>
        {hint && <div className="text-xs text-cocoon-mid mt-0.5">{hint}</div>}
      </div>
      <div className="md:col-span-2">{children}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-cocoon-border bg-white p-6">
      <h3 className="text-sm font-semibold tracking-[0.14em] uppercase text-cocoon-graphite mb-2">{title}</h3>
      <div>{children}</div>
    </div>
  );
}

function CompanySettings() {
  return (
    <Section title="Company">
      <Field label="Company name" hint="Shown on your careers page and on candidate emails.">
        <input className="w-full rounded-lg border border-cocoon-border px-3 py-2 text-sm" defaultValue="Cocoon Ltd" />
      </Field>
      <Field label="Careers URL" hint="cocoonai.co.uk/careers">
        <input className="w-full rounded-lg border border-cocoon-border px-3 py-2 text-sm" defaultValue="https://cocoonai.co.uk/careers" />
      </Field>
      <Field label="Brand colour">
        <div className="flex items-center gap-2">
          <input type="color" defaultValue="#FCD209" className="w-10 h-10 rounded-lg border border-cocoon-border" />
          <input className="rounded-lg border border-cocoon-border px-3 py-2 text-sm font-mono" defaultValue="#FCD209" />
        </div>
      </Field>
      <Field label="Logo">
        <button type="button" className="rounded-lg border border-dashed border-cocoon-border px-4 py-3 text-sm text-cocoon-graphite hover:border-cocoon-ink hover:text-cocoon-ink">
          Upload logo (PNG or SVG)
        </button>
      </Field>
      <div className="pt-4 flex justify-end gap-2">
        <Button>Cancel</Button>
        <Button variant="primary">Save changes</Button>
      </div>
    </Section>
  );
}

function HiringSettings() {
  return (
    <Section title="Defaults for new jobs">
      <Field label="Default location"><input className="w-full rounded-lg border border-cocoon-border px-3 py-2 text-sm" defaultValue="London · Hybrid" /></Field>
      <Field label="Default salary band"><input className="w-full rounded-lg border border-cocoon-border px-3 py-2 text-sm" defaultValue="£60–80k" /></Field>
      <Field label="Default recruiter"><select className="w-full rounded-lg border border-cocoon-border px-3 py-2 text-sm"><option>Maya Patel</option><option>Daniel Kim</option></select></Field>
      <Field label="Auto-screening"><label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="rounded text-cocoon-ink" /> Auto-screen candidates over 80% match</label></Field>
    </Section>
  );
}

function PipelineSettings() {
  const stages = ['Applied', 'Screening', 'Shortlisted', 'Interview', 'Offer', 'Hired', 'Rejected'];
  return (
    <Section title="Pipeline stages">
      <p className="text-sm text-cocoon-graphite mb-4">Drag to reorder. Add custom stages or rename existing ones to fit your team&apos;s process.</p>
      <ul className="space-y-2">
        {stages.map((s) => (
          <li key={s} className="flex items-center gap-3 rounded-lg border border-cocoon-border bg-cocoon-bg/50 px-3 py-2">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-cocoon-mid cursor-grab">
              <circle cx="9" cy="6" r="1.5" /><circle cx="15" cy="6" r="1.5" /><circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" /><circle cx="9" cy="18" r="1.5" /><circle cx="15" cy="18" r="1.5" />
            </svg>
            <span className="text-sm font-semibold text-cocoon-ink flex-1">{s}</span>
            <span className="text-xs text-cocoon-mid">{Math.floor(Math.random() * 200) + 20} candidates</span>
            <button type="button" className="text-xs font-semibold text-cocoon-graphite hover:text-cocoon-ink">Edit</button>
          </li>
        ))}
      </ul>
      <button type="button" className="mt-4 text-sm font-semibold text-cocoon-ink border border-dashed border-cocoon-border rounded-lg px-4 py-2 hover:border-cocoon-ink w-full">
        + Add stage
      </button>
    </Section>
  );
}

function InterviewSettings() {
  const templates = [
    { name: 'Screening call', duration: '30 min', scorecards: 3 },
    { name: 'Hiring manager', duration: '45 min', scorecards: 4 },
    { name: 'Technical (engineering)', duration: '90 min', scorecards: 6 },
    { name: 'Final round', duration: '60 min', scorecards: 5 },
  ];
  return (
    <Section title="Interview templates">
      <ul className="divide-y divide-cocoon-border">
        {templates.map((t) => (
          <li key={t.name} className="flex items-center justify-between py-3">
            <div>
              <div className="text-sm font-semibold text-cocoon-ink">{t.name}</div>
              <div className="text-xs text-cocoon-mid">{t.duration} · {t.scorecards} scorecard items</div>
            </div>
            <Button>Edit template</Button>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function EmailSettings() {
  const templates = [
    { name: 'Interview confirmation', subject: 'Your interview with {{company}} on {{date}}', uses: 142 },
    { name: 'Offer letter intro', subject: 'An offer from {{company}}', uses: 6 },
    { name: 'Polite rejection', subject: 'Update on your application to {{job}}', uses: 412 },
    { name: 'Outreach (passive)', subject: '{{first_name}}, would {{job}} interest you?', uses: 88 },
  ];
  return (
    <Section title="Email templates">
      <ul className="divide-y divide-cocoon-border">
        {templates.map((t) => (
          <li key={t.name} className="flex items-center gap-3 py-3">
            <div className="flex-1">
              <div className="text-sm font-semibold text-cocoon-ink">{t.name}</div>
              <div className="text-xs text-cocoon-mid font-mono">{t.subject}</div>
            </div>
            <Pill tone="gray">{t.uses} sent</Pill>
            <Button>Edit</Button>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function IntegrationsSettings() {
  const integrations = [
    { name: 'Google Calendar', status: 'Connected', tone: 'green' as const, desc: 'Two-way sync for interview scheduling.' },
    { name: 'Slack', status: 'Connected', tone: 'green' as const, desc: 'Notifications and pipeline alerts.' },
    { name: 'Greenhouse', status: 'Not connected', tone: 'gray' as const, desc: 'Sync candidates and jobs both ways.' },
    { name: 'Workable', status: 'Not connected', tone: 'gray' as const, desc: 'Import existing jobs and candidates.' },
    { name: 'LinkedIn', status: 'Beta', tone: 'amber' as const, desc: 'InMail and applicant sync.' },
    { name: 'Slack alerts', status: 'Connected', tone: 'green' as const, desc: 'Daily digest at 9am.' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {integrations.map((it) => (
        <div key={it.name} className="rounded-2xl border border-cocoon-border bg-white p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-cocoon-ink">{it.name}</div>
            <Pill tone={it.tone}>{it.status}</Pill>
          </div>
          <p className="text-sm text-cocoon-graphite">{it.desc}</p>
          <div className="mt-3"><Button>{it.status === 'Connected' ? 'Manage' : 'Connect'}</Button></div>
        </div>
      ))}
    </div>
  );
}

function NotificationsSettings() {
  const items = [
    { label: 'New applicant', email: true, slack: true, digest: true },
    { label: 'Interview scheduled', email: true, slack: false, digest: false },
    { label: 'Hiring manager feedback received', email: true, slack: true, digest: false },
    { label: 'Candidate replied to message', email: false, slack: true, digest: true },
    { label: 'Offer accepted', email: true, slack: true, digest: false },
    { label: 'Weekly hiring digest', email: true, slack: false, digest: true },
  ];
  return (
    <Section title="Choose how you want to be notified">
      <table className="min-w-full text-sm">
        <thead className="text-[11px] font-semibold tracking-[0.14em] uppercase text-cocoon-graphite border-b border-cocoon-border">
          <tr>
            <th className="text-left py-3">Event</th>
            <th className="py-3 w-20 text-center">Email</th>
            <th className="py-3 w-20 text-center">Slack</th>
            <th className="py-3 w-20 text-center">Digest</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row) => (
            <tr key={row.label} className="border-b border-cocoon-border last:border-b-0">
              <td className="py-3 text-cocoon-ink">{row.label}</td>
              <td className="py-3 text-center"><input type="checkbox" defaultChecked={row.email} className="rounded text-cocoon-ink" /></td>
              <td className="py-3 text-center"><input type="checkbox" defaultChecked={row.slack} className="rounded text-cocoon-ink" /></td>
              <td className="py-3 text-center"><input type="checkbox" defaultChecked={row.digest} className="rounded text-cocoon-ink" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}

function SecuritySettings() {
  return (
    <Section title="Security & privacy">
      <Field label="Two-factor authentication" hint="Required for admin accounts.">
        <Pill tone="green" dot>Enabled for all admins</Pill>
      </Field>
      <Field label="SSO" hint="Single sign-on via Google or Okta.">
        <Button>Configure SSO</Button>
      </Field>
      <Field label="Audit log" hint="Track sensitive actions across the workspace.">
        <Button>View log</Button>
      </Field>
      <Field label="GDPR & data retention" hint="How long to keep candidate data after rejection.">
        <select className="rounded-lg border border-cocoon-border px-3 py-2 text-sm">
          <option>6 months</option>
          <option>12 months</option>
          <option>24 months</option>
        </select>
      </Field>
    </Section>
  );
}

function AiSettings() {
  return (
    <Section title="AI configuration">
      <Field label="Model" hint="Default model for recruiter AI tools.">
        <select className="w-full rounded-lg border border-cocoon-border px-3 py-2 text-sm">
          <option>Cocoon AI · balanced</option>
          <option>Cocoon AI · fast</option>
          <option>Cocoon AI · careful</option>
        </select>
      </Field>
      <Field label="PII redaction" hint="Strip personal info from prompts before sending to model.">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="rounded text-cocoon-ink" /> Redact names, emails, addresses by default</label>
      </Field>
      <Field label="Candidate opt-outs" hint="Respect candidate preference to not be processed by AI.">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="rounded text-cocoon-ink" /> Honour Cocoon AI opt-out flag</label>
      </Field>
      <Field label="Output review" hint="Require manual review before AI-drafted messages are sent.">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="rounded text-cocoon-ink" /> Always require review before send</label>
      </Field>
    </Section>
  );
}
