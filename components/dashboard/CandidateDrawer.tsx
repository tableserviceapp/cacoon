'use client';

import Image from 'next/image';
import Drawer from './Drawer';
import { Button } from './Buttons';
import { Pill, StageBadge, MatchScore } from './Badges';
import Tabs from './Tabs';
import { Candidate, findJob, findRecruiter } from '@/lib/sample-data';

type Props = {
  candidate: Candidate | null;
  onClose: () => void;
};

export default function CandidateDrawer({ candidate, onClose }: Props) {
  if (!candidate) return <Drawer open={false} onClose={onClose}>{null}</Drawer>;
  const job = findJob(candidate.jobId);
  const recruiter = findRecruiter(candidate.recruiterId);

  return (
    <Drawer
      open={true}
      onClose={onClose}
      width="xl"
      title={candidate.name}
      description={`${candidate.currentRole} · ${candidate.location}`}
      footer={
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button variant="danger">Reject</Button>
            <Button>Send message</Button>
          </div>
          <div className="flex items-center gap-2">
            <Button>Move stage</Button>
            <Button variant="primary">Schedule interview</Button>
          </div>
        </div>
      }
    >
      {/* Header card */}
      <div className="flex items-start gap-5 mb-6">
        {candidate.photo ? (
          <Image
            src={`/assets/photos/${candidate.photo}.jpg`}
            alt=""
            width={88}
            height={88}
            className="rounded-2xl object-cover w-22 h-22 shrink-0"
          />
        ) : (
          <div className="w-22 h-22 rounded-2xl bg-cocoon-ink text-cocoon-yellow grid place-items-center font-serif text-3xl shrink-0">
            {candidate.name[0]}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <StageBadge stage={candidate.stage} />
            <MatchScore score={candidate.matchScore} />
            <Pill tone="gray">{candidate.source}</Pill>
            <Pill tone="gray">Applied {candidate.appliedDate}</Pill>
          </div>
          <div className="text-sm text-cocoon-graphite">
            Applying for{' '}
            <strong className="text-cocoon-ink">{job?.title}</strong> · Owned by{' '}
            <strong className="text-cocoon-ink">{recruiter?.name}</strong>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div>
              <div className="text-[10px] font-semibold tracking-wider uppercase text-cocoon-mid">Notice</div>
              <div className="text-sm font-semibold text-cocoon-ink mt-0.5">{candidate.noticePeriod}</div>
            </div>
            <div>
              <div className="text-[10px] font-semibold tracking-wider uppercase text-cocoon-mid">Salary exp.</div>
              <div className="text-sm font-semibold text-cocoon-ink mt-0.5">{candidate.salaryExpectation}</div>
            </div>
            <div>
              <div className="text-[10px] font-semibold tracking-wider uppercase text-cocoon-mid">Experience</div>
              <div className="text-sm font-semibold text-cocoon-ink mt-0.5">{candidate.experienceYears} yrs</div>
            </div>
          </div>
        </div>
      </div>

      <Tabs
        tabs={[
          { id: 'profile', label: 'Profile', content: <ProfileTab candidate={candidate} /> },
          { id: 'cv', label: 'CV', content: <CVPlaceholder /> },
          { id: 'notes', label: 'Notes', count: 3, content: <NotesTab /> },
          { id: 'history', label: 'Stage history', content: <HistoryTab stage={candidate.stage} /> },
          { id: 'match', label: 'Match', content: <MatchTab candidate={candidate} /> },
        ]}
      />
    </Drawer>
  );
}

function ProfileTab({ candidate }: { candidate: Candidate }) {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cocoon-graphite mb-2">
          Summary
        </h3>
        <p className="text-sm text-cocoon-ink leading-relaxed">
          {candidate.experienceYears}-year {candidate.currentRole.split(' at ')[0].toLowerCase()} based in {candidate.location}, currently at {candidate.currentRole.split(' at ')[1] ?? 'an unnamed company'}. Strong portfolio in {candidate.skills.slice(0, 3).join(', ')}, and a track record of shipping cross-functional product work.
        </p>
      </section>

      <section>
        <h3 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cocoon-graphite mb-2">
          Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {candidate.skills.map((s) => (
            <span key={s} className="inline-flex items-center rounded-full bg-cocoon-cream border border-cocoon-border px-3 py-1 text-xs font-medium text-cocoon-ink">
              {s}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cocoon-graphite mb-3">
          Experience
        </h3>
        <ul className="space-y-3">
          {[
            { role: candidate.currentRole.split(' at ')[0], company: candidate.currentRole.split(' at ')[1] ?? 'Current company', period: '2023 — present' },
            { role: 'Designer', company: 'Foundation Studio', period: '2021 — 2023' },
            { role: 'Junior Designer', company: 'Bright & Co', period: '2019 — 2021' },
          ].map((e) => (
            <li key={e.role + e.company} className="flex items-start gap-3 pb-3 border-b border-cocoon-border last:border-b-0">
              <div className="w-9 h-9 rounded-lg bg-cocoon-cream text-cocoon-ink grid place-items-center font-serif text-sm shrink-0">
                {(e.company ?? '?')[0]}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-cocoon-ink">{e.role}</div>
                <div className="text-xs text-cocoon-graphite">{e.company}</div>
                <div className="text-[11px] text-cocoon-mid mt-0.5">{e.period}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cocoon-graphite mb-3">
          Education
        </h3>
        <div className="rounded-xl border border-cocoon-border bg-white p-4">
          <div className="text-sm font-semibold text-cocoon-ink">BA Graphic Communication Design</div>
          <div className="text-xs text-cocoon-graphite">University of the Arts London (UAL)</div>
          <div className="text-[11px] text-cocoon-mid mt-0.5">2016 — 2019</div>
        </div>
      </section>
    </div>
  );
}

function CVPlaceholder() {
  return (
    <div className="rounded-2xl border border-dashed border-cocoon-border bg-cocoon-bg p-10 text-center">
      <div className="w-12 h-12 rounded-xl bg-white border border-cocoon-border mx-auto grid place-items-center mb-3">
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-cocoon-graphite">
          <path d="M7 4h7l4 4v12H7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="text-sm font-semibold text-cocoon-ink">CV preview</p>
      <p className="text-xs text-cocoon-graphite mt-1 max-w-xs mx-auto">
        amara-okafor-cv.pdf · 412 KB. Click to open the full preview in a new tab.
      </p>
      <button type="button" className="mt-4 text-xs font-semibold text-cocoon-ink hover:underline">
        Open CV →
      </button>
    </div>
  );
}

function NotesTab() {
  const notes = [
    { who: 'Maya Patel', initial: 'M', when: '2h ago', body: 'Strong portfolio. Phone screen confirmed empathy with our user — she ran the same kind of research at Wave.' },
    { who: 'Eve Daniels', initial: 'E', when: 'Yesterday', body: 'Hiring manager round went well. Wants to bring in for a final with founders.' },
    { who: 'Cocoon AI', initial: 'AI', when: '3 days ago', body: 'Top 6% match for this role based on case studies, Figma assessment, and shipped projects in retail UX.' },
  ];
  return (
    <div className="space-y-3">
      <textarea
        placeholder="Add an internal note. Mention a teammate with @"
        className="block w-full rounded-xl border border-cocoon-border bg-white p-3 text-sm focus:border-cocoon-ink focus:ring-0 focus:outline-none min-h-[88px] resize-none"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button type="button" className="text-xs font-semibold text-cocoon-graphite hover:text-cocoon-ink">@ Mention</button>
          <button type="button" className="text-xs font-semibold text-cocoon-graphite hover:text-cocoon-ink">📎 Attach</button>
        </div>
        <Button variant="primary">Post note</Button>
      </div>
      <ul className="mt-5 space-y-3">
        {notes.map((n) => (
          <li key={n.who + n.when} className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg grid place-items-center text-xs font-semibold shrink-0 ${
              n.initial === 'AI' ? 'bg-cocoon-yellow text-cocoon-ink' : 'bg-cocoon-ink text-cocoon-yellow font-serif text-sm'
            }`}>
              {n.initial}
            </div>
            <div className="flex-1 rounded-xl bg-cocoon-bg border border-cocoon-border p-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-cocoon-ink">{n.who}</span>
                <span className="text-cocoon-mid">· {n.when}</span>
              </div>
              <p className="text-sm text-cocoon-ink mt-1">{n.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HistoryTab({ stage }: { stage: string }) {
  const order = ['Applied', 'Screening', 'Shortlisted', 'Interview', 'Offer', 'Hired'];
  const idx = order.indexOf(stage);
  const log = order.map((s, i) => ({
    stage: s,
    by: ['Cocoon AI', 'Maya Patel', 'Maya Patel', 'Eve Daniels', 'Ross Joseph', 'Ross Joseph'][i] ?? 'Maya Patel',
    when: ['7 days ago', '5 days ago', '4 days ago', '2 days ago', 'Today', 'Today'][i] ?? '—',
    done: i <= idx,
  }));
  return (
    <ol className="space-y-4">
      {log.map((l) => (
        <li key={l.stage} className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-full grid place-items-center shrink-0 ${
            l.done ? 'bg-cocoon-ink text-cocoon-yellow' : 'bg-cocoon-bg border border-cocoon-border text-cocoon-mid'
          }`}>
            {l.done ? (
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : <span className="text-[10px] font-semibold">{order.indexOf(l.stage) + 1}</span>}
          </div>
          <div className="flex-1 pb-2 border-b border-cocoon-border">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-cocoon-ink">{l.stage}</div>
              <div className="text-xs text-cocoon-mid">{l.when}</div>
            </div>
            {l.done && <div className="text-xs text-cocoon-graphite">Moved by {l.by}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}

function MatchTab({ candidate }: { candidate: Candidate }) {
  return (
    <div className="rounded-2xl border border-cocoon-yellow bg-cocoon-yellow/20 p-6">
      <div className="flex items-center gap-2 mb-3">
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-cocoon-ink">
          <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
        <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-cocoon-ink">Match explanation</span>
      </div>
      <h3 className="font-serif text-2xl text-cocoon-ink leading-tight">
        Why {candidate.name.split(' ')[0]} is a {candidate.matchScore}% match
      </h3>
      <ul className="mt-4 space-y-2.5 text-sm text-cocoon-ink">
        {[
          { label: 'Skills', pct: 96, body: 'Matches all required skills, plus Design Systems (a strong-to-have).' },
          { label: 'Experience', pct: 89, body: '5 years vs. 4–7 required. Senior-level work shipped at Wave.' },
          { label: 'Values', pct: 92, body: 'Self-described preferences align with the team — craft, autonomy, calm pace.' },
          { label: 'Stage', pct: 88, body: 'Looking for a Senior IC role in a smaller team. Direct fit.' },
        ].map((m) => (
          <li key={m.label} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-cocoon-border">
            <span className="text-xs font-semibold text-cocoon-graphite w-20">{m.label}</span>
            <div className="flex-1 h-1.5 bg-cocoon-cream rounded-full overflow-hidden">
              <div className="h-full bg-cocoon-ink rounded-full" style={{ width: `${m.pct}%` }} />
            </div>
            <span className="font-serif text-base text-cocoon-ink shrink-0">{m.pct}%</span>
            <span className="text-xs text-cocoon-graphite hidden md:inline flex-1">{m.body}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
