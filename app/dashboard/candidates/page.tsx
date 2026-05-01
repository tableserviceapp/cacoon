'use client';

import Image from 'next/image';
import { useState } from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { StageBadge, MatchScore, Pill } from '@/components/dashboard/Badges';
import { Button } from '@/components/dashboard/Buttons';
import CandidateDrawer from '@/components/dashboard/CandidateDrawer';
import { Candidate, candidates, findJob, findRecruiter, recruiters } from '@/lib/sample-data';

const stageFilters = ['All', 'Applied', 'Screening', 'Shortlisted', 'Interview', 'Offer', 'Hired', 'Rejected'];
const sourceFilters = ['All sources', 'Cocoon match', 'LinkedIn', 'Referral', 'Job board', 'Direct outreach'];

const savedViews = [
  { name: 'Top matches (90%+)', count: candidates.filter((c) => c.matchScore >= 90).length, active: true },
  { name: 'Awaiting screen', count: candidates.filter((c) => c.stage === 'Applied').length },
  { name: 'In interview', count: candidates.filter((c) => c.stage === 'Interview').length },
  { name: 'Offers out', count: candidates.filter((c) => c.stage === 'Offer').length },
];

export default function CandidatesPage() {
  const [open, setOpen] = useState<Candidate | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  return (
    <>
      <PageHeader
        eyebrow="Candidates"
        title="All candidates"
        description="Search, filter, and triage every candidate across active and historical roles. Open a profile in the side panel."
        actions={
          <>
            <Button>
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Import CSV
            </Button>
            <Button variant="primary">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Add candidate
            </Button>
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
              placeholder="Search by name, role, skill…"
              className="block w-full rounded-lg border border-cocoon-border bg-white pl-10 pr-4 py-2 text-sm focus:border-cocoon-ink focus:ring-0 focus:outline-none"
            />
          </div>
          <select className="rounded-lg border border-cocoon-border bg-white px-3 py-2 text-sm font-medium focus:border-cocoon-ink focus:ring-0">
            {stageFilters.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select className="rounded-lg border border-cocoon-border bg-white px-3 py-2 text-sm font-medium focus:border-cocoon-ink focus:ring-0">
            {sourceFilters.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select className="rounded-lg border border-cocoon-border bg-white px-3 py-2 text-sm font-medium focus:border-cocoon-ink focus:ring-0">
            <option>All locations</option>
            <option>London</option>
            <option>Manchester</option>
            <option>Edinburgh</option>
            <option>Remote</option>
          </select>
          <select className="rounded-lg border border-cocoon-border bg-white px-3 py-2 text-sm font-medium focus:border-cocoon-ink focus:ring-0">
            <option>All notice periods</option>
            <option>Immediate</option>
            <option>Up to 1 month</option>
            <option>1–3 months</option>
            <option>3 months+</option>
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

      {/* Bulk actions bar */}
      {selected.size > 0 && (
        <div className="rounded-xl bg-cocoon-ink text-cocoon-cream px-4 py-2.5 flex items-center justify-between">
          <div className="text-sm">
            <strong>{selected.size}</strong> candidate{selected.size === 1 ? '' : 's'} selected
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-semibold">
              Move stage
            </button>
            <button type="button" className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-semibold">
              Assign owner
            </button>
            <button type="button" className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-semibold">
              Bulk message
            </button>
            <button type="button" className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-semibold">
              Reject
            </button>
            <button
              type="button"
              onClick={() => setSelected(new Set())}
              className="text-xs text-cocoon-cream/70 hover:text-cocoon-cream ml-2"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl border border-cocoon-border bg-white overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-cocoon-border bg-cocoon-bg/40">
          <div className="text-xs text-cocoon-graphite">
            <strong className="text-cocoon-ink">{candidates.length}</strong> candidates · sorted by match score
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-cocoon-mid">Sort:</span>
            <select className="rounded-md border border-cocoon-border bg-white px-2 py-1 text-xs font-medium">
              <option>Match score · high to low</option>
              <option>Most recently applied</option>
              <option>Stage</option>
              <option>Recruiter</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-white text-[11px] font-semibold tracking-[0.14em] uppercase text-cocoon-graphite border-b border-cocoon-border">
              <tr>
                <th className="text-left px-5 py-3 w-8">
                  <input
                    type="checkbox"
                    checked={selected.size === candidates.length}
                    onChange={() => setSelected(selected.size === candidates.length ? new Set() : new Set(candidates.map((c) => c.id)))}
                    className="rounded border-cocoon-border text-cocoon-ink focus:ring-cocoon-yellow"
                  />
                </th>
                <th className="text-left px-3 py-3">Candidate</th>
                <th className="text-left px-3 py-3">Role / job</th>
                <th className="text-left px-3 py-3">Stage</th>
                <th className="text-right px-3 py-3">Match</th>
                <th className="text-left px-3 py-3">Source</th>
                <th className="text-left px-3 py-3">Recruiter</th>
                <th className="text-left px-3 py-3">Applied</th>
                <th className="px-3 py-3 w-10" />
              </tr>
            </thead>
            <tbody>
              {[...candidates]
                .sort((a, b) => b.matchScore - a.matchScore)
                .map((c, i) => {
                  const j = findJob(c.jobId);
                  const r = findRecruiter(c.recruiterId);
                  return (
                    <tr
                      key={c.id}
                      className={`hover:bg-cocoon-bg/40 transition cursor-pointer ${i > 0 ? 'border-t border-cocoon-border' : ''}`}
                      onClick={() => setOpen(c)}
                    >
                      <td className="px-5 py-3.5 align-middle" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selected.has(c.id)}
                          onChange={() => toggle(c.id)}
                          className="rounded border-cocoon-border text-cocoon-ink focus:ring-cocoon-yellow"
                        />
                      </td>
                      <td className="px-3 py-3.5 align-middle">
                        <div className="flex items-center gap-3">
                          {c.photo ? (
                            <Image src={`/assets/photos/${c.photo}.jpg`} alt="" width={36} height={36} className="rounded-full object-cover w-9 h-9" />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-cocoon-ink text-cocoon-yellow grid place-items-center font-serif text-sm">
                              {c.name[0]}
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-cocoon-ink">{c.name}</div>
                            <div className="text-xs text-cocoon-mid truncate">{c.location} · {c.experienceYears} yrs</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3.5 align-middle">
                        <div className="text-sm text-cocoon-ink">{j?.title}</div>
                        <div className="text-xs text-cocoon-mid">{c.currentRole}</div>
                      </td>
                      <td className="px-3 py-3.5 align-middle"><StageBadge stage={c.stage} /></td>
                      <td className="px-3 py-3.5 align-middle text-right"><MatchScore score={c.matchScore} /></td>
                      <td className="px-3 py-3.5 align-middle">
                        <Pill tone="gray">{c.source}</Pill>
                      </td>
                      <td className="px-3 py-3.5 align-middle">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-cocoon-ink text-cocoon-yellow grid place-items-center font-serif text-[11px]">{r?.initial}</div>
                          <span className="text-sm text-cocoon-graphite">{r?.name.split(' ')[0]}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3.5 align-middle text-sm text-cocoon-mid">{c.appliedDate}</td>
                      <td className="px-3 py-3.5 align-middle">
                        <button
                          type="button"
                          className="w-7 h-7 grid place-items-center rounded-md hover:bg-cocoon-bg text-cocoon-mid hover:text-cocoon-ink"
                          onClick={(e) => { e.stopPropagation(); }}
                        >
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
      </div>

      <CandidateDrawer candidate={open} onClose={() => setOpen(null)} />
    </>
  );
}
