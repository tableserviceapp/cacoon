'use client';

import { useState } from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { Pill } from '@/components/dashboard/Badges';
import { Button } from '@/components/dashboard/Buttons';

const tools = [
  {
    id: 'summarise-cv',
    title: 'Summarise CV',
    description: 'Get a 2-paragraph summary of any candidate CV with strengths and red flags.',
    category: 'Read',
    iconColor: 'bg-sky-100 text-sky-700',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M7 4h7l4 4v12H7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 12h6M9 16h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'rank-applicants',
    title: 'Rank applicants',
    description: 'AI-rank shortlist for any open role using your hiring criteria.',
    category: 'Decide',
    iconColor: 'bg-violet-100 text-violet-700',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M4 18h6M4 12h10M4 6h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'interview-questions',
    title: 'Generate interview questions',
    description: 'Personalised question set based on a candidate&apos;s CV and the JD.',
    category: 'Prepare',
    iconColor: 'bg-amber-100 text-amber-700',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7v.5M12 17h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    id: 'outreach',
    title: 'Draft outreach email',
    description: 'Personalised first-touch outreach for passive candidates.',
    category: 'Write',
    iconColor: 'bg-emerald-100 text-emerald-700',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M5 8l7 5 7-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <rect x="3" y="6" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    id: 'rejection',
    title: 'Draft rejection email',
    description: 'Honest, kind rejection messages — never form-letter feeling.',
    category: 'Write',
    iconColor: 'bg-emerald-100 text-emerald-700',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M3 6l9 8 9-8M3 6h18v12H3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'compare',
    title: 'Compare shortlisted',
    description: 'Side-by-side comparison of your top candidates for one role.',
    category: 'Decide',
    iconColor: 'bg-violet-100 text-violet-700',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <rect x="3" y="4" width="8" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="13" y="4" width="8" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    id: 'risks',
    title: 'Extract candidate risks',
    description: 'Surface flight risks, red flags, gaps, or counter-offers to watch for.',
    category: 'Decide',
    iconColor: 'bg-violet-100 text-violet-700',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M12 3l9 16H3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'pipeline-summary',
    title: 'Summarise hiring pipeline',
    description: 'A weekly digest of pipeline movement, blockers, and recruiter activity.',
    category: 'Read',
    iconColor: 'bg-sky-100 text-sky-700',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M4 6h16M4 12h12M4 18h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

const recentRuns = [
  { tool: 'Rank applicants', context: 'Senior Product Designer · 18 candidates', when: '2h ago' },
  { tool: 'Summarise CV', context: 'Daniel Park · Head of Engineering', when: '4h ago' },
  { tool: 'Draft outreach email', context: '6 candidates · Frontend Engineer', when: 'Yesterday' },
  { tool: 'Compare shortlisted', context: 'Senior Product Designer · top 4', when: 'Yesterday' },
];

export default function AiToolsPage() {
  const [active, setActive] = useState(tools[0]);
  const [prompt, setPrompt] = useState('Rank the 18 shortlisted candidates for Senior Product Designer based on systems thinking, shipped work, and cultural fit with a small craft-led team.');
  const [hasResult, setHasResult] = useState(true);

  return (
    <>
      <PageHeader
        eyebrow="AI Tools"
        title="Recruiter AI workspace"
        description="Operational AI built for hiring teams. Run a tool below or write a custom prompt — every output is grounded in your workspace data."
        actions={
          <>
            <Button>
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M3 12a9 9 0 1 0 9-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              History
            </Button>
            <Button>Settings</Button>
          </>
        }
        meta={
          <div className="flex items-center gap-3 text-xs text-cocoon-graphite">
            <Pill tone="green" dot>Connected to Cocoon AI</Pill>
            <span>·</span>
            <span>2,310 / 10,000 monthly credits used</span>
            <div className="flex-1 max-w-xs h-1.5 rounded-full bg-cocoon-cream overflow-hidden">
              <div className="h-full rounded-full bg-cocoon-ink" style={{ width: '23%' }} />
            </div>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
        {/* Tool list */}
        <div className="rounded-2xl border border-cocoon-border bg-white">
          <div className="px-4 py-3 border-b border-cocoon-border">
            <h2 className="text-sm font-semibold text-cocoon-ink">Tools</h2>
          </div>
          <ul className="p-2 space-y-0.5">
            {tools.map((t) => {
              const isActive = t.id === active.id;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => { setActive(t); setHasResult(false); }}
                    className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition ${
                      isActive ? 'bg-cocoon-cream' : 'hover:bg-cocoon-bg'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-lg grid place-items-center shrink-0 ${t.iconColor}`}>
                      {t.icon}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-semibold text-cocoon-ink">{t.title}</span>
                      <span className="block text-[11px] text-cocoon-mid mt-0.5">{t.category}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Workspace */}
        <div className="rounded-2xl border border-cocoon-border bg-white p-6 space-y-5">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className={`w-9 h-9 rounded-xl grid place-items-center ${active.iconColor}`}>
                {active.icon}
              </div>
              <div>
                <h2 className="font-serif text-2xl text-cocoon-ink leading-none">{active.title}</h2>
              </div>
            </div>
            <p className="text-sm text-cocoon-graphite mt-2 max-w-2xl">{active.description}</p>
          </div>

          <div>
            <label className="text-[11px] font-semibold tracking-[0.14em] uppercase text-cocoon-graphite block mb-2">
              Context
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <select className="rounded-lg border border-cocoon-border bg-white px-3 py-2 text-sm font-medium">
                <option>Job: Senior Product Designer</option>
                <option>Job: Junior Designer</option>
                <option>Job: Head of Engineering</option>
              </select>
              <select className="rounded-lg border border-cocoon-border bg-white px-3 py-2 text-sm font-medium">
                <option>Stage: Shortlisted (18)</option>
                <option>Stage: All applicants</option>
                <option>Stage: Interview</option>
              </select>
              <select className="rounded-lg border border-cocoon-border bg-white px-3 py-2 text-sm font-medium">
                <option>Output: Ranked list</option>
                <option>Output: Email draft</option>
                <option>Output: Comparison table</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold tracking-[0.14em] uppercase text-cocoon-graphite block mb-2">
              Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="block w-full rounded-xl border border-cocoon-border bg-cocoon-bg p-3 text-sm focus:border-cocoon-ink focus:bg-white focus:ring-0 focus:outline-none min-h-[100px] resize-y"
              placeholder="Describe what you want…"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-xs text-cocoon-mid">
              Estimated cost: ~12 credits · Output cached for 10 min.
            </div>
            <div className="flex items-center gap-2">
              <Button>Save as preset</Button>
              <Button variant="primary" onClick={() => setHasResult(true)}>
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
                Run
              </Button>
            </div>
          </div>

          {/* Output */}
          {hasResult && (
            <div className="rounded-2xl border border-cocoon-yellow bg-cocoon-yellow/15 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-cocoon-yellow text-cocoon-ink grid place-items-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-cocoon-ink">Top 5 ranked candidates</div>
                    <div className="text-xs text-cocoon-graphite">Generated 2 minutes ago · 11 credits used</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button type="button" className="w-8 h-8 grid place-items-center rounded hover:bg-cocoon-yellow/30 text-cocoon-ink" aria-label="Copy">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                      <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M16 8V4H4v12h4" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </button>
                  <button type="button" className="w-8 h-8 grid place-items-center rounded hover:bg-cocoon-yellow/30 text-cocoon-ink" aria-label="Save">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                      <path d="M5 4h14v16l-7-4-7 4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button type="button" className="w-8 h-8 grid place-items-center rounded hover:bg-cocoon-yellow/30 text-cocoon-ink" aria-label="Regenerate">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                      <path d="M3 12a9 9 0 1 0 9-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M12 3l3 3-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
              <ol className="space-y-3">
                {[
                  { rank: 1, name: 'Olivia Marsh', score: 93, body: 'Strongest portfolio across the shortlist. Brand + product hybrid uniquely fits this role. Senior craft level. Available within a month.' },
                  { rank: 2, name: 'Amara Okafor', score: 94, body: 'Highest match score. Slight risk on seniority — but evidence of senior-level work in retail UX case study.' },
                  { rank: 3, name: 'Priya Shah', score: 92, body: 'Best at facilitation and workshops. Mid-strong on systems thinking. Strong cultural fit signal.' },
                  { rank: 4, name: 'Fin O’Brien', score: 79, body: 'Good range. Below the bar on shipped work. Possible reach hire if appetite for coaching.' },
                  { rank: 5, name: 'Tom Whitford', score: 81, body: 'Closer to mid-level. Recommend the Junior Designer role instead.' },
                ].map((r) => (
                  <li key={r.rank} className="flex items-start gap-3 rounded-xl bg-white border border-cocoon-border p-4">
                    <div className="w-8 h-8 rounded-full bg-cocoon-ink text-cocoon-yellow grid place-items-center font-serif text-sm shrink-0">
                      {r.rank}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-sm font-semibold text-cocoon-ink">{r.name}</div>
                        <Pill tone="yellow">{r.score}% match</Pill>
                      </div>
                      <p className="text-sm text-cocoon-graphite leading-relaxed">{r.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-4 flex items-center gap-2">
                <Button>Send to hiring manager</Button>
                <Button>Save to job</Button>
                <Button>Continue prompt →</Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent runs */}
      <section className="rounded-2xl border border-cocoon-border bg-white">
        <div className="px-6 py-4 border-b border-cocoon-border">
          <h2 className="font-serif text-xl text-cocoon-ink leading-none">Recent runs</h2>
          <p className="text-xs text-cocoon-mid mt-1">Things you and your team have asked Cocoon AI to do this week.</p>
        </div>
        <ul className="divide-y divide-cocoon-border">
          {recentRuns.map((r, i) => (
            <li key={i} className="flex items-center gap-3 px-6 py-3.5">
              <div className="w-8 h-8 rounded-lg bg-cocoon-yellow text-cocoon-ink grid place-items-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-cocoon-ink">{r.tool}</div>
                <div className="text-xs text-cocoon-mid truncate">{r.context}</div>
              </div>
              <div className="text-xs text-cocoon-mid">{r.when}</div>
              <button type="button" className="text-xs font-semibold text-cocoon-ink hover:underline">Reopen</button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
