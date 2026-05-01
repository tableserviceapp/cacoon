'use client';

import Link from 'next/link';
import { useState } from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { Pill } from '@/components/dashboard/Badges';
import { Button } from '@/components/dashboard/Buttons';
import { recruiters } from '@/lib/sample-data';

const departments = ['Design', 'Engineering', 'Product', 'Marketing', 'People', 'Customer', 'Data', 'Operations', 'Finance'];
const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'] as const;
const seniorityLevels = ['Junior', 'Mid', 'Senior', 'Lead', 'Manager', 'Director'] as const;
const benefits = ['Healthcare', 'Pension match', 'Learning budget', 'Remote-first', 'Equity', 'Flexible hours', 'Parental leave', 'Mental-health days'];
const defaultStages = ['Applied', 'Screening', 'Shortlisted', 'Interview', 'Offer', 'Hired'];
const channels = [
  { id: 'cocoon', label: 'Cocoon Match', desc: 'Surface to candidates with 75%+ fit.', defaultOn: true },
  { id: 'careers', label: 'Careers page', desc: 'Publish to cocoonai.co.uk/careers.', defaultOn: true },
  { id: 'linkedin', label: 'LinkedIn', desc: 'Cross-post to your company page.', defaultOn: false },
  { id: 'indeed', label: 'Indeed', desc: 'Free posting via your connected account.', defaultOn: false },
  { id: 'referrals', label: 'Internal referrals', desc: 'Invite your team to refer.', defaultOn: true },
];

export default function CreateJobPage() {
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Design');
  const [type, setType] = useState<typeof employmentTypes[number]>('Full-time');
  const [seniority, setSeniority] = useState<typeof seniorityLevels[number]>('Senior');
  const [location, setLocation] = useState('');
  const [remote, setRemote] = useState<'Onsite' | 'Hybrid' | 'Remote'>('Hybrid');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [showSalary, setShowSalary] = useState(true);
  const [description, setDescription] = useState('');
  const [recruiterId, setRecruiterId] = useState(recruiters[0].id);
  const [draftingJd, setDraftingJd] = useState(false);

  const owner = recruiters.find((r) => r.id === recruiterId);

  const generateJd = () => {
    setDraftingJd(true);
    setTimeout(() => {
      setDescription(
        `About the role\n\nWe&apos;re hiring a ${seniority} ${title || '[role]'} to join the ${department} team at Cocoon. You&apos;ll partner closely with founders, engineering, and operators to ship product surfaces that hiring teams use daily.\n\nWhat you&apos;ll do\n\n• Lead end-to-end work across discovery, design, build, and iteration.\n• Partner with hiring managers and recruiters to understand real workflows.\n• Contribute to our craft bar — design system, prototypes, code reviews where relevant.\n• Help shape how Cocoon thinks about hiring as an operational practice.\n\nWhat we&apos;re looking for\n\n• 5+ years working in ${department.toLowerCase()} at an early-stage SaaS or marketplace.\n• A track record of shipped, owned work — bonus if you&apos;ve done 0→1.\n• Strong systems thinking and a clear point of view on craft.\n• Comfortable working in ambiguity and writing clearly.\n\nNice-to-haves\n\n• Recruitment, ATS, or hiring-tech background.\n• Experience working with hiring managers as primary users.`
      );
      setDraftingJd(false);
    }, 900);
  };

  const completion = (() => {
    const checks = [title, department, location, salaryMin, salaryMax, description, recruiterId];
    const filled = checks.filter(Boolean).length;
    return Math.round((filled / checks.length) * 100);
  })();

  return (
    <>
      <PageHeader
        eyebrow="New job"
        title="Create a new job"
        description="Open a requisition. Cocoon will match candidates as soon as it&apos;s live."
        actions={
          <>
            <Link
              href="/dashboard/jobs"
              className="inline-flex items-center gap-2 rounded-lg border border-cocoon-border bg-white px-3.5 py-2 text-sm font-semibold text-cocoon-graphite hover:text-cocoon-ink hover:bg-cocoon-cream no-underline"
            >
              Cancel
            </Link>
            <Button>Save draft</Button>
            <Button variant="primary">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Publish job
            </Button>
          </>
        }
        meta={
          <div className="flex items-center gap-3">
            <div className="flex-1 max-w-sm">
              <div className="flex items-center justify-between text-xs text-cocoon-graphite mb-1">
                <span>Setup progress</span>
                <span className="font-semibold">{completion}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-cocoon-cream overflow-hidden">
                <div className="h-full rounded-full bg-cocoon-yellow" style={{ width: `${completion}%` }} />
              </div>
            </div>
            <Pill tone="gray">Auto-saving · 2s ago</Pill>
          </div>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4 xl:gap-6">
        {/* Form column */}
        <div className="space-y-4 min-w-0">
          {/* Basics */}
          <Card title="Basics" subtitle="The essentials a candidate sees first.">
            <Field label="Job title" hint="The single most important field for matching.">
              <div className="relative">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Product Designer"
                  className="block w-full rounded-lg border border-cocoon-border px-3 py-2 text-sm focus:border-cocoon-ink focus:ring-0 focus:outline-none"
                />
                {!title && (
                  <button
                    type="button"
                    onClick={() => setTitle('Senior Product Designer')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 text-[11px] font-semibold text-cocoon-ink bg-cocoon-yellow rounded-md px-2 py-1 hover:bg-cocoon-yellow-hover"
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
                      <path d="M8 1.5l1.6 4.4 4.4 1.6-4.4 1.6L8 13.5l-1.6-4.4L2 7.5l4.4-1.6L8 1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                    </svg>
                    Suggest
                  </button>
                )}
              </div>
            </Field>

            <Field label="Department">
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="block w-full rounded-lg border border-cocoon-border px-3 py-2 text-sm font-medium focus:border-cocoon-ink focus:ring-0"
              >
                {departments.map((d) => <option key={d}>{d}</option>)}
              </select>
            </Field>

            <Field label="Employment type">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {employmentTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                      type === t
                        ? 'border-cocoon-ink bg-cocoon-cream text-cocoon-ink'
                        : 'border-cocoon-border bg-white text-cocoon-graphite hover:border-cocoon-ink hover:text-cocoon-ink'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Seniority">
              <div className="flex flex-wrap gap-2">
                {seniorityLevels.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSeniority(s)}
                    className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                      seniority === s
                        ? 'border-cocoon-ink bg-cocoon-ink text-cocoon-cream'
                        : 'border-cocoon-border bg-white text-cocoon-graphite hover:border-cocoon-ink hover:text-cocoon-ink'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Location" hint="City, country, or 'Remote'.">
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="London, UK"
                className="block w-full rounded-lg border border-cocoon-border px-3 py-2 text-sm focus:border-cocoon-ink focus:ring-0 focus:outline-none"
              />
            </Field>

            <Field label="Work setup">
              <div className="grid grid-cols-3 gap-2">
                {(['Onsite', 'Hybrid', 'Remote'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setRemote(opt)}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                      remote === opt
                        ? 'border-cocoon-ink bg-cocoon-cream text-cocoon-ink'
                        : 'border-cocoon-border bg-white text-cocoon-graphite hover:border-cocoon-ink hover:text-cocoon-ink'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </Field>
          </Card>

          {/* Description */}
          <Card
            title="Job description"
            subtitle="Markdown supported. Cocoon AI will check inclusivity and clarity as you type."
            action={
              <button
                type="button"
                onClick={generateJd}
                disabled={draftingJd || !title}
                className="inline-flex items-center gap-2 rounded-lg bg-cocoon-yellow text-cocoon-ink px-3 py-1.5 text-sm font-semibold hover:bg-cocoon-yellow-hover transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
                {draftingJd ? 'Drafting…' : 'Draft with AI'}
              </button>
            }
          >
            <div className="flex items-center gap-2 mb-3 border-b border-cocoon-border -mx-6 px-6 pb-2">
              <button type="button" className="text-xs font-semibold text-cocoon-ink border-b-2 border-cocoon-ink pb-1.5 -mb-2">Write</button>
              <button type="button" className="text-xs font-semibold text-cocoon-graphite hover:text-cocoon-ink pb-1.5">Preview</button>
              <div className="flex-1" />
              <span className="text-xs text-cocoon-mid">{description.length} chars</span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={`# About the role\n\nWhat will this person do? What does success look like in 90 days?\n\n# What you&apos;ll do\n\n• …\n\n# What we&apos;re looking for\n\n• …\n\n# Nice-to-haves\n\n• …`}
              className="block w-full rounded-lg border border-cocoon-border bg-cocoon-bg px-3 py-3 text-sm font-mono leading-relaxed focus:border-cocoon-ink focus:bg-white focus:ring-0 focus:outline-none min-h-[260px] resize-y"
            />
            {description && (
              <div className="mt-3 rounded-xl bg-emerald-50 border border-emerald-100 p-3 flex items-start gap-2">
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0">
                  <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="text-xs text-emerald-900 leading-relaxed">
                  <strong>Looking good.</strong> Inclusivity score 92/100. Clarity score 88/100. Cocoon AI suggests adding 1–2 measurable outcomes for the 90-day mark.
                </div>
              </div>
            )}
          </Card>

          {/* Compensation */}
          <Card title="Compensation" subtitle="Showing salary increases application rate by ~30%.">
            <Field label="Salary band">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <select className="rounded-lg border border-cocoon-border px-3 py-2 text-sm font-medium">
                  <option>GBP £</option>
                  <option>USD $</option>
                  <option>EUR €</option>
                </select>
                <input
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  type="number"
                  placeholder="Min, e.g. 75000"
                  className="rounded-lg border border-cocoon-border px-3 py-2 text-sm focus:border-cocoon-ink focus:ring-0 focus:outline-none"
                />
                <input
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value)}
                  type="number"
                  placeholder="Max, e.g. 95000"
                  className="rounded-lg border border-cocoon-border px-3 py-2 text-sm focus:border-cocoon-ink focus:ring-0 focus:outline-none"
                />
              </div>
              <label className="flex items-center gap-2 mt-3 text-sm text-cocoon-ink">
                <input
                  type="checkbox"
                  checked={showSalary}
                  onChange={(e) => setShowSalary(e.target.checked)}
                  className="rounded border-cocoon-border text-cocoon-ink focus:ring-cocoon-yellow"
                />
                Show salary publicly on the job listing
              </label>
            </Field>

            <Field label="Equity" hint="Optional. Shown as a range.">
              <div className="grid grid-cols-2 gap-2">
                <input placeholder="0.05%" className="rounded-lg border border-cocoon-border px-3 py-2 text-sm focus:border-cocoon-ink focus:ring-0" />
                <input placeholder="0.20%" className="rounded-lg border border-cocoon-border px-3 py-2 text-sm focus:border-cocoon-ink focus:ring-0" />
              </div>
            </Field>

            <Field label="Benefits">
              <div className="flex flex-wrap gap-2">
                {benefits.map((b) => <BenefitChip key={b} label={b} />)}
              </div>
            </Field>
          </Card>

          {/* Hiring team */}
          <Card title="Hiring team" subtitle="Who&apos;s involved. The recruiter owns the day-to-day.">
            <Field label="Recruiter (owner)">
              <select
                value={recruiterId}
                onChange={(e) => setRecruiterId(e.target.value)}
                className="block w-full rounded-lg border border-cocoon-border px-3 py-2 text-sm font-medium focus:border-cocoon-ink focus:ring-0"
              >
                {recruiters.map((r) => <option key={r.id} value={r.id}>{r.name} · {r.role}</option>)}
              </select>
            </Field>
            <Field label="Hiring manager">
              <input placeholder="Type a name…" className="block w-full rounded-lg border border-cocoon-border px-3 py-2 text-sm focus:border-cocoon-ink focus:ring-0" />
            </Field>
            <Field label="Approvers" hint="Sign-off required before publishing.">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-cocoon-cream border border-cocoon-border px-2 py-1 text-xs text-cocoon-ink">
                  <span className="w-5 h-5 rounded-full bg-cocoon-ink text-cocoon-yellow grid place-items-center font-serif text-[10px]">R</span>
                  Ross Joseph
                  <button type="button" className="text-cocoon-mid hover:text-cocoon-ink ml-1">×</button>
                </span>
                <button type="button" className="text-xs font-semibold text-cocoon-graphite hover:text-cocoon-ink">+ Add approver</button>
              </div>
            </Field>
            <Field label="Interview panel" hint="Suggestions based on similar past roles.">
              <ul className="space-y-2">
                {[
                  { name: 'Eve Daniels', role: 'Hiring manager · Design', initial: 'E' },
                  { name: 'Maya Patel', role: 'Senior Recruiter', initial: 'M' },
                  { name: 'Ross Joseph', role: 'Founder · Final round', initial: 'R' },
                ].map((p) => (
                  <li key={p.name} className="flex items-center gap-3 rounded-lg border border-cocoon-border bg-cocoon-bg/50 p-2 px-3">
                    <span className="w-7 h-7 rounded-full bg-cocoon-ink text-cocoon-yellow grid place-items-center font-serif text-sm">{p.initial}</span>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-cocoon-ink">{p.name}</div>
                      <div className="text-xs text-cocoon-mid">{p.role}</div>
                    </div>
                    <button type="button" className="text-xs font-semibold text-cocoon-graphite hover:text-cocoon-ink">Remove</button>
                  </li>
                ))}
              </ul>
              <button type="button" className="mt-2 text-xs font-semibold text-cocoon-ink hover:underline">+ Add interviewer</button>
            </Field>
          </Card>

          {/* Pipeline */}
          <Card title="Pipeline" subtitle="Use the workspace default or customise stages for this role.">
            <div className="rounded-lg bg-cocoon-bg border border-cocoon-border p-3 mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-cocoon-ink">Use workspace default</div>
                <div className="text-xs text-cocoon-mid">6 stages · Applied → Hired</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-10 h-5 bg-cocoon-mist rounded-full peer-checked:bg-cocoon-ink relative transition">
                  <span className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white peer-checked:translate-x-5 transition" />
                </div>
              </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {defaultStages.map((s, i) => (
                <div key={s} className="rounded-lg bg-white border border-cocoon-border p-3">
                  <div className="text-[10px] font-semibold tracking-wider uppercase text-cocoon-mid mb-1">Stage {i + 1}</div>
                  <div className="text-sm font-semibold text-cocoon-ink">{s}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <Toggle
                title="Auto-screen high matches"
                desc="Move 80%+ matches automatically to Screening."
                defaultOn
              />
              <Toggle
                title="SLA reminders"
                desc="Nudge owners after 48h with no movement."
                defaultOn
              />
              <Toggle
                title="Auto-reject after 21 days"
                desc="Send a polite rejection if a candidate stalls in Applied."
              />
              <Toggle
                title="Notify hiring manager on shortlist"
                desc="Email + Slack when a candidate moves to Shortlisted."
                defaultOn
              />
            </div>
          </Card>

          {/* Visibility */}
          <Card title="Visibility & publishing" subtitle="Where this job lives once it&apos;s live.">
            <Field label="Channels">
              <ul className="space-y-2">
                {channels.map((ch) => (
                  <li key={ch.id} className="flex items-center justify-between rounded-lg border border-cocoon-border bg-white p-3">
                    <div>
                      <div className="text-sm font-semibold text-cocoon-ink">{ch.label}</div>
                      <div className="text-xs text-cocoon-mid">{ch.desc}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={ch.defaultOn} className="sr-only peer" />
                      <div className="w-10 h-5 bg-cocoon-mist rounded-full peer-checked:bg-cocoon-ink relative transition">
                        <span className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white peer-checked:translate-x-5 transition" />
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            </Field>

            <Field label="Application form">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-cocoon-ink">
                  <input type="checkbox" defaultChecked className="rounded text-cocoon-ink" />
                  Require CV upload
                </label>
                <label className="flex items-center gap-2 text-sm text-cocoon-ink">
                  <input type="checkbox" defaultChecked className="rounded text-cocoon-ink" />
                  Ask &ldquo;Why this role?&rdquo; (200 word max)
                </label>
                <label className="flex items-center gap-2 text-sm text-cocoon-ink">
                  <input type="checkbox" className="rounded text-cocoon-ink" />
                  Ask for portfolio link
                </label>
                <label className="flex items-center gap-2 text-sm text-cocoon-ink">
                  <input type="checkbox" className="rounded text-cocoon-ink" />
                  Add custom screening questions
                </label>
              </div>
            </Field>

            <Field label="Publish">
              <div className="flex flex-wrap gap-2">
                <button type="button" className="rounded-lg border-2 border-cocoon-ink bg-cocoon-cream px-3 py-2 text-sm font-semibold text-cocoon-ink">Now</button>
                <button type="button" className="rounded-lg border border-cocoon-border bg-white px-3 py-2 text-sm font-medium text-cocoon-graphite hover:border-cocoon-ink hover:text-cocoon-ink">Schedule</button>
                <button type="button" className="rounded-lg border border-cocoon-border bg-white px-3 py-2 text-sm font-medium text-cocoon-graphite hover:border-cocoon-ink hover:text-cocoon-ink">Save as draft</button>
              </div>
            </Field>
          </Card>
        </div>

        {/* Right rail */}
        <aside className="space-y-4 xl:sticky xl:top-20 self-start">
          {/* Live preview */}
          <div className="rounded-2xl border border-cocoon-border bg-white p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cocoon-graphite">Live preview</h3>
              <Pill tone="gray" dot>Draft</Pill>
            </div>
            <div className="rounded-xl bg-cocoon-bg border border-cocoon-border p-4">
              <div className="text-[10px] font-semibold tracking-[0.16em] uppercase text-cocoon-mid">
                {department} · {seniority}
              </div>
              <div className="font-serif text-xl text-cocoon-ink leading-tight mt-1">
                {title || 'Untitled role'}
              </div>
              <div className="text-xs text-cocoon-graphite mt-1">
                {location || 'Set a location'} · {remote} · {type}
              </div>
              {(salaryMin || salaryMax) && (
                <div className="font-serif text-sm text-cocoon-ink mt-3">
                  £{salaryMin || '—'} – £{salaryMax || '—'}
                </div>
              )}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-cocoon-border">
                <span className="w-7 h-7 rounded-full bg-cocoon-ink text-cocoon-yellow grid place-items-center font-serif text-xs">{owner?.initial}</span>
                <span className="text-xs text-cocoon-graphite">
                  Owned by <strong className="text-cocoon-ink">{owner?.name}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* AI assistant */}
          <div className="rounded-2xl border border-cocoon-yellow bg-cocoon-yellow/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-cocoon-yellow text-cocoon-ink grid place-items-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                  <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <div className="text-sm font-semibold text-cocoon-ink leading-none">Cocoon AI</div>
                <div className="text-[10px] text-cocoon-graphite mt-0.5">Helping you write a great brief</div>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-cocoon-ink">
              <Tip done={!!title}>Set a clear job title</Tip>
              <Tip done={!!description}>Add 4+ paragraphs of context</Tip>
              <Tip done={!!salaryMin && !!salaryMax}>Show a salary band</Tip>
              <Tip done={!!location}>Confirm location</Tip>
              <Tip done={false}>Add 2–3 measurable outcomes</Tip>
              <Tip done={false}>Review for inclusive language</Tip>
            </ul>
            <button type="button" className="mt-4 w-full rounded-lg bg-cocoon-ink text-cocoon-cream px-3 py-2 text-sm font-semibold hover:bg-[#2C332E]">
              Ask AI for a review
            </button>
          </div>

          {/* Match estimate */}
          <div className="rounded-2xl border border-cocoon-border bg-white p-5">
            <h3 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cocoon-graphite mb-3">
              Estimated reach
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-cocoon-graphite">Candidates in network</span>
                <span className="font-serif text-base text-cocoon-ink">~3,400</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-cocoon-graphite">75%+ match estimate</span>
                <span className="font-serif text-base text-cocoon-ink">~64</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-cocoon-graphite">Avg. time to first 10 apps</span>
                <span className="font-serif text-base text-cocoon-ink">3.2 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-cocoon-graphite">Similar role time-to-hire</span>
                <span className="font-serif text-base text-cocoon-ink">28 days</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-cocoon-border text-[11px] text-cocoon-mid">
              Updated as you fill in the form.
            </div>
          </div>
        </aside>
      </div>

      {/* Sticky footer actions on small screens */}
      <div className="xl:hidden sticky bottom-0 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-white border-t border-cocoon-border flex items-center justify-between gap-2">
        <span className="text-xs text-cocoon-mid">{completion}% complete</span>
        <div className="flex items-center gap-2">
          <Button>Save draft</Button>
          <Button variant="primary">Publish</Button>
        </div>
      </div>
    </>
  );
}

function Card({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-cocoon-border bg-white">
      <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-cocoon-border">
        <div>
          <h2 className="font-serif text-xl text-cocoon-ink leading-none">{title}</h2>
          {subtitle && <p className="text-xs text-cocoon-mid mt-1">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </section>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div>
        <label className="text-sm font-semibold text-cocoon-ink">{label}</label>
        {hint && <div className="text-xs text-cocoon-mid mt-0.5">{hint}</div>}
      </div>
      <div className="md:col-span-2">{children}</div>
    </div>
  );
}

function BenefitChip({ label }: { label: string }) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOn(!on)}
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
        on
          ? 'border-cocoon-ink bg-cocoon-cream text-cocoon-ink'
          : 'border-cocoon-border bg-white text-cocoon-graphite hover:border-cocoon-ink hover:text-cocoon-ink'
      }`}
    >
      {on && (
        <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
          <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {label}
    </button>
  );
}

function Toggle({ title, desc, defaultOn }: { title: string; desc: string; defaultOn?: boolean }) {
  return (
    <label className="flex items-start justify-between gap-3 rounded-lg border border-cocoon-border bg-white p-3 cursor-pointer">
      <div>
        <div className="text-sm font-semibold text-cocoon-ink">{title}</div>
        <div className="text-xs text-cocoon-mid mt-0.5">{desc}</div>
      </div>
      <span className="relative inline-flex items-center pt-1 shrink-0">
        <input type="checkbox" defaultChecked={defaultOn} className="sr-only peer" />
        <span className="w-10 h-5 bg-cocoon-mist rounded-full peer-checked:bg-cocoon-ink relative transition">
          <span className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white peer-checked:translate-x-5 transition" />
        </span>
      </span>
    </label>
  );
}

function Tip({ done, children }: { done: boolean; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm">
      <span className={`w-4 h-4 rounded-full grid place-items-center mt-0.5 shrink-0 ${
        done ? 'bg-cocoon-ink text-cocoon-yellow' : 'bg-white border border-cocoon-border'
      }`}>
        {done && (
          <svg viewBox="0 0 16 16" fill="none" className="w-2.5 h-2.5">
            <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className={done ? 'text-cocoon-graphite line-through' : 'text-cocoon-ink'}>{children}</span>
    </li>
  );
}
