'use client';

import { useState } from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { Pill } from '@/components/dashboard/Badges';
import { Button } from '@/components/dashboard/Buttons';
import {
  candidates,
  findCandidate,
  findJob,
  interviews as allInterviews,
} from '@/lib/sample-data';

const weekStart = new Date('2026-04-27'); // Monday

function buildWeek() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });
}

const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8am to 6pm

const typeTone: Record<string, 'gray' | 'blue' | 'amber' | 'green' | 'violet'> = {
  'Screening call': 'blue',
  'Hiring manager': 'amber',
  Technical: 'violet',
  'Take-home review': 'gray',
  'Final round': 'green',
  Culture: 'gray',
};

export default function InterviewsPage() {
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const week = buildWeek();
  const upcoming = allInterviews.filter((iv) => iv.status === 'Scheduled');

  return (
    <>
      <PageHeader
        eyebrow="Interviews"
        title="This week's interviews"
        description="24 interviews scheduled across 7 jobs and 12 interviewers."
        actions={
          <>
            <Button>
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M16 2v4M8 2v4M4 10h16" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              Sync to calendar
            </Button>
            <Button variant="primary" onClick={() => setDrawerOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Schedule interview
            </Button>
          </>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Scheduled', value: upcoming.length, tone: 'blue' },
          { label: 'Completed (7d)', value: 11, tone: 'green' },
          { label: 'No-shows', value: 1, tone: 'red' },
          { label: 'Awaiting feedback', value: 5, tone: 'amber' },
        ].map((k) => (
          <div key={k.label} className="rounded-xl border border-cocoon-border bg-white p-4">
            <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-cocoon-graphite">
              {k.label}
            </div>
            <div className="font-serif text-2xl text-cocoon-ink leading-none mt-2">
              {k.value}
            </div>
          </div>
        ))}
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center bg-white border border-cocoon-border rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setView('calendar')}
            className={`px-4 py-1.5 text-sm font-semibold ${view === 'calendar' ? 'bg-cocoon-cream text-cocoon-ink' : 'text-cocoon-graphite hover:bg-cocoon-bg'}`}
          >
            Calendar
          </button>
          <button
            type="button"
            onClick={() => setView('list')}
            className={`px-4 py-1.5 text-sm font-semibold ${view === 'list' ? 'bg-cocoon-cream text-cocoon-ink' : 'text-cocoon-graphite hover:bg-cocoon-bg'}`}
          >
            List
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="px-2 py-1 rounded hover:bg-cocoon-bg text-cocoon-graphite">←</button>
          <span className="text-sm font-semibold text-cocoon-ink">
            {weekStart.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
          </span>
          <button type="button" className="px-2 py-1 rounded hover:bg-cocoon-bg text-cocoon-graphite">→</button>
          <span className="ml-2 text-xs text-cocoon-mid">Week of {weekStart.toLocaleDateString('en-GB')}</span>
        </div>
      </div>

      {view === 'calendar' ? (
        <div className="rounded-2xl border border-cocoon-border bg-white overflow-hidden">
          <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-cocoon-border bg-cocoon-bg/40">
            <div />
            {week.map((d) => (
              <div key={d.toISOString()} className="px-2 py-3 text-center border-l border-cocoon-border">
                <div className="text-[10px] font-semibold tracking-wider uppercase text-cocoon-mid">
                  {d.toLocaleDateString('en-GB', { weekday: 'short' })}
                </div>
                <div className="font-serif text-xl text-cocoon-ink mt-0.5">{d.getDate()}</div>
              </div>
            ))}
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: 540 }}>
            {hours.map((h) => (
              <div key={h} className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-cocoon-border h-16">
                <div className="px-2 py-1 text-[11px] text-cocoon-mid text-right">
                  {h.toString().padStart(2, '0')}:00
                </div>
                {week.map((d) => {
                  const dateStr = d.toISOString().slice(0, 10);
                  const slotIvs = upcoming.filter((iv) => {
                    if (iv.date !== dateStr) return false;
                    const [hr] = iv.time.split(':');
                    return parseInt(hr, 10) === h;
                  });
                  return (
                    <div key={d.toISOString() + h} className="border-l border-cocoon-border relative">
                      {slotIvs.map((iv) => {
                        const c = findCandidate(iv.candidateId)!;
                        return (
                          <button
                            type="button"
                            key={iv.id}
                            className="absolute inset-x-1 top-0.5 rounded-md bg-cocoon-yellow border border-cocoon-yellow text-cocoon-ink p-1.5 text-left hover:shadow-cocoon-md transition overflow-hidden"
                            style={{ height: `${(iv.durationMin / 60) * 64 - 4}px` }}
                          >
                            <div className="text-[11px] font-semibold truncate">{c.name}</div>
                            <div className="text-[10px] truncate">{iv.type}</div>
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-cocoon-border bg-white">
          <ul className="divide-y divide-cocoon-border">
            {upcoming.map((iv) => {
              const c = findCandidate(iv.candidateId)!;
              const j = findJob(iv.jobId)!;
              return (
                <li key={iv.id} className="flex items-center gap-4 px-6 py-4 hover:bg-cocoon-bg/40 transition">
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
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="text-sm font-semibold text-cocoon-ink">{c.name}</div>
                      <Pill tone={typeTone[iv.type] ?? 'gray'}>{iv.type}</Pill>
                      <Pill tone="gray">{iv.location}</Pill>
                    </div>
                    <div className="text-xs text-cocoon-mid mt-0.5">
                      {iv.time} · {iv.durationMin} min · {j.title} · with {iv.interviewers.join(', ')}
                    </div>
                  </div>
                  <Button>View</Button>
                  <button type="button" className="text-xs font-semibold text-cocoon-graphite hover:text-cocoon-ink">
                    Reschedule
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Awaiting feedback */}
      <section className="rounded-2xl border border-cocoon-border bg-white">
        <div className="flex items-center justify-between px-6 py-4 border-b border-cocoon-border">
          <div>
            <h2 className="font-serif text-xl text-cocoon-ink leading-none">Awaiting feedback</h2>
            <p className="text-xs text-cocoon-mid mt-1">Interviews completed but with no scorecard submitted yet.</p>
          </div>
          <Button>Send reminder</Button>
        </div>
        <ul className="divide-y divide-cocoon-border">
          {[allInterviews.find((i) => i.status === 'Completed')!].filter(Boolean).concat(
            // synth a couple more
            allInterviews.slice(0, 2)
          ).slice(0, 3).map((iv, i) => {
            const c = findCandidate(iv.candidateId)!;
            const j = findJob(iv.jobId)!;
            return (
              <li key={iv.id + i} className="flex items-center gap-3 px-6 py-3.5">
                <div className="w-9 h-9 rounded-full bg-cocoon-cream text-cocoon-ink grid place-items-center font-serif text-sm shrink-0">
                  {c.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-cocoon-ink">{c.name}</div>
                  <div className="text-xs text-cocoon-mid">
                    {iv.type} · {j.title} · interviewed by {iv.interviewers[0]}
                  </div>
                </div>
                <Pill tone="amber">{['1d', '2d', '3d'][i] ?? '1d'} overdue</Pill>
                <Button>Add scorecard</Button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Schedule modal */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cocoon-ink/40" onClick={() => setDrawerOpen(false)}>
          <div className="bg-white rounded-2xl shadow-cocoon-lg w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-serif text-2xl text-cocoon-ink">Schedule interview</h3>
              <button type="button" onClick={() => setDrawerOpen(false)} className="w-9 h-9 grid place-items-center rounded-lg hover:bg-cocoon-bg text-cocoon-graphite">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold tracking-wider uppercase text-cocoon-graphite block mb-1">Candidate</label>
                <select className="w-full rounded-lg border border-cocoon-border px-3 py-2 text-sm">
                  {candidates.slice(0, 6).map((c) => <option key={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold tracking-wider uppercase text-cocoon-graphite block mb-1">Type</label>
                <select className="w-full rounded-lg border border-cocoon-border px-3 py-2 text-sm">
                  <option>Screening call · 30min</option>
                  <option>Hiring manager · 45min</option>
                  <option>Technical · 90min</option>
                  <option>Final round · 60min</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold tracking-wider uppercase text-cocoon-graphite block mb-1">Date</label>
                  <input type="date" className="w-full rounded-lg border border-cocoon-border px-3 py-2 text-sm" defaultValue="2026-05-05" />
                </div>
                <div>
                  <label className="text-xs font-semibold tracking-wider uppercase text-cocoon-graphite block mb-1">Time</label>
                  <input type="time" className="w-full rounded-lg border border-cocoon-border px-3 py-2 text-sm" defaultValue="14:00" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold tracking-wider uppercase text-cocoon-graphite block mb-1">Interviewers</label>
                <input type="text" placeholder="Type a name…" className="w-full rounded-lg border border-cocoon-border px-3 py-2 text-sm" />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-2">
              <Button onClick={() => setDrawerOpen(false)}>Cancel</Button>
              <Button variant="primary">Send invites</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
