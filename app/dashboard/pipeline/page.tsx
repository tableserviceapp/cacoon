'use client';

import Image from 'next/image';
import { useState } from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { MatchScore, Pill } from '@/components/dashboard/Badges';
import { Button } from '@/components/dashboard/Buttons';
import CandidateDrawer from '@/components/dashboard/CandidateDrawer';
import { Candidate, Stage, candidates, jobs, recruiters, findJob, findRecruiter } from '@/lib/sample-data';

const stages: Stage[] = ['Applied', 'Screening', 'Shortlisted', 'Interview', 'Offer', 'Hired', 'Rejected'];
const stageColor: Record<Stage, string> = {
  Applied: 'bg-cocoon-mist',
  Screening: 'bg-sky-300',
  Shortlisted: 'bg-violet-300',
  Interview: 'bg-amber-300',
  Offer: 'bg-cocoon-yellow',
  Hired: 'bg-emerald-400',
  Rejected: 'bg-red-300',
};

export default function PipelinePage() {
  const [jobFilter, setJobFilter] = useState<string>('all');
  const [recruiterFilter, setRecruiterFilter] = useState<string>('all');
  const [drawer, setDrawer] = useState<Candidate | null>(null);

  const filtered = candidates.filter((c) => {
    if (jobFilter !== 'all' && c.jobId !== jobFilter) return false;
    if (recruiterFilter !== 'all' && c.recruiterId !== recruiterFilter) return false;
    return true;
  });

  const grouped = stages.reduce<Record<Stage, Candidate[]>>((acc, s) => {
    acc[s] = filtered.filter((c) => c.stage === s);
    return acc;
  }, {} as Record<Stage, Candidate[]>);

  return (
    <>
      <PageHeader
        eyebrow="Pipeline"
        title="Candidate pipeline"
        description="Drag a candidate to a different stage to update their status. Filter by job, recruiter, or department."
        actions={
          <>
            <Button>
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Customise stages
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

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={jobFilter}
          onChange={(e) => setJobFilter(e.target.value)}
          className="rounded-lg border border-cocoon-border bg-white px-3 py-2 text-sm font-medium focus:border-cocoon-ink focus:ring-0"
        >
          <option value="all">All jobs ({jobs.length})</option>
          {jobs.map((j) => (
            <option key={j.id} value={j.id}>{j.title}</option>
          ))}
        </select>
        <select
          value={recruiterFilter}
          onChange={(e) => setRecruiterFilter(e.target.value)}
          className="rounded-lg border border-cocoon-border bg-white px-3 py-2 text-sm font-medium focus:border-cocoon-ink focus:ring-0"
        >
          <option value="all">All recruiters</option>
          {recruiters.map((r) => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
        <select className="rounded-lg border border-cocoon-border bg-white px-3 py-2 text-sm font-medium focus:border-cocoon-ink focus:ring-0">
          <option>All departments</option>
          <option>Design</option>
          <option>Engineering</option>
          <option>People</option>
        </select>
        <div className="flex-1" />
        <div className="flex items-center bg-white border border-cocoon-border rounded-lg overflow-hidden">
          <button type="button" className="px-3 py-1.5 text-sm font-semibold bg-cocoon-cream text-cocoon-ink">
            Board
          </button>
          <button type="button" className="px-3 py-1.5 text-sm font-medium text-cocoon-graphite hover:bg-cocoon-bg">
            Table
          </button>
        </div>
      </div>

      {/* Kanban */}
      <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        {stages.map((stage) => (
          <div
            key={stage}
            className="w-[280px] shrink-0 rounded-2xl bg-cocoon-bg border border-cocoon-border flex flex-col max-h-[78vh]"
          >
            <div className="px-3 py-3 border-b border-cocoon-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${stageColor[stage]}`} />
                <span className="text-sm font-semibold text-cocoon-ink">{stage}</span>
                <span className="text-xs text-cocoon-mid">{grouped[stage].length}</span>
              </div>
              <button type="button" className="w-6 h-6 grid place-items-center rounded text-cocoon-mid hover:bg-white hover:text-cocoon-ink">
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {grouped[stage].map((c) => {
                const j = findJob(c.jobId);
                const r = findRecruiter(c.recruiterId);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setDrawer(c)}
                    className="w-full text-left rounded-xl bg-white border border-cocoon-border p-3 hover:shadow-cocoon-md hover:border-cocoon-ink transition cursor-grab"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      {c.photo ? (
                        <Image src={`/assets/photos/${c.photo}.jpg`} alt="" width={32} height={32} className="rounded-full object-cover w-8 h-8 shrink-0" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-cocoon-ink text-cocoon-yellow grid place-items-center font-serif text-sm shrink-0">
                          {c.name[0]}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-cocoon-ink truncate">{c.name}</div>
                        <div className="text-[11px] text-cocoon-mid truncate">{c.currentRole}</div>
                      </div>
                    </div>
                    <div className="text-xs text-cocoon-graphite mb-2 truncate">{j?.title}</div>
                    <div className="flex items-center justify-between">
                      <MatchScore score={c.matchScore} />
                      <div className="flex items-center gap-1.5">
                        <Pill tone="gray" className="text-[10px]">{c.source}</Pill>
                        <div className="w-5 h-5 rounded-full bg-cocoon-ink text-cocoon-yellow grid place-items-center font-serif text-[10px]" title={r?.name}>{r?.initial}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
              {grouped[stage].length === 0 && (
                <div className="rounded-xl border-2 border-dashed border-cocoon-border bg-white/50 p-4 text-center">
                  <div className="text-xs text-cocoon-mid italic">Drop candidates here</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <CandidateDrawer candidate={drawer} onClose={() => setDrawer(null)} />
    </>
  );
}
