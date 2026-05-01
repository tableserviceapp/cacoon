'use client';

import Image from 'next/image';
import { useState } from 'react';
import PageHeader from '@/components/dashboard/PageHeader';
import { Pill } from '@/components/dashboard/Badges';
import { Button } from '@/components/dashboard/Buttons';
import { conversations, candidates, findCandidate } from '@/lib/sample-data';

const filters = [
  { label: 'All', count: conversations.length, active: true },
  { label: 'Unread', count: conversations.filter((c) => c.unread).length },
  { label: 'Flagged', count: conversations.filter((c) => c.flagged).length },
  { label: 'Interview-related', count: 3 },
  { label: 'Job-specific', count: 4 },
];

export default function MessagesPage() {
  const [activeId, setActiveId] = useState(conversations[0].id);
  const active = conversations.find((c) => c.id === activeId)!;
  const candidate = findCandidate(active.candidateId)!;

  return (
    <>
      <PageHeader
        eyebrow="Messages"
        title="Inbox"
        description="Candidate replies, hiring manager threads, and internal collaboration — all in one place."
        actions={
          <>
            <Button>Mark all read</Button>
            <Button variant="primary">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Compose
            </Button>
          </>
        }
      />

      <div className="rounded-2xl border border-cocoon-border bg-white overflow-hidden h-[calc(100vh-260px)] min-h-[600px] flex">
        {/* Filters + list */}
        <div className="w-80 shrink-0 border-r border-cocoon-border flex flex-col">
          <div className="p-3 border-b border-cocoon-border space-y-2">
            <div className="relative">
              <svg viewBox="0 0 24 24" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cocoon-mid">
                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" />
                <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                placeholder="Search messages…"
                className="block w-full rounded-lg border border-cocoon-border bg-cocoon-bg pl-10 pr-3 py-1.5 text-sm focus:border-cocoon-ink focus:bg-white focus:ring-0 focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-1">
              {filters.map((f) => (
                <button
                  key={f.label}
                  type="button"
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold transition ${
                    f.active ? 'bg-cocoon-ink text-cocoon-cream' : 'bg-cocoon-bg text-cocoon-graphite hover:bg-cocoon-cream hover:text-cocoon-ink'
                  }`}
                >
                  {f.label}
                  <span className={f.active ? 'text-cocoon-yellow' : 'text-cocoon-mid'}>{f.count}</span>
                </button>
              ))}
            </div>
          </div>
          <ul className="flex-1 overflow-y-auto">
            {conversations.map((conv) => {
              const c = findCandidate(conv.candidateId)!;
              const isActive = conv.id === activeId;
              return (
                <li key={conv.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(conv.id)}
                    className={`w-full text-left px-4 py-3 border-b border-cocoon-border transition ${
                      isActive ? 'bg-cocoon-cream' : 'hover:bg-cocoon-bg/60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {c.photo ? (
                        <Image src={`/assets/photos/${c.photo}.jpg`} alt="" width={36} height={36} className="rounded-full object-cover w-9 h-9 shrink-0" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-cocoon-ink text-cocoon-yellow grid place-items-center font-serif text-sm shrink-0">{c.name[0]}</div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-sm truncate ${conv.unread ? 'font-bold text-cocoon-ink' : 'font-semibold text-cocoon-ink'}`}>
                            {c.name}
                          </span>
                          {conv.flagged && (
                            <svg viewBox="0 0 16 16" fill="var(--cocoon-yellow)" className="w-3 h-3 shrink-0">
                              <path d="M3 1v14M3 1l8 3-2 3 2 3-8 1z" />
                            </svg>
                          )}
                          <span className="ml-auto text-[10px] text-cocoon-mid shrink-0">{conv.lastMessageAt}</span>
                        </div>
                        <div className={`text-xs mt-0.5 truncate ${conv.unread ? 'text-cocoon-ink font-semibold' : 'text-cocoon-graphite'}`}>
                          {conv.subject}
                        </div>
                        <div className="text-xs text-cocoon-mid mt-0.5 truncate">{conv.preview}</div>
                        <div className="mt-1.5">
                          <Pill tone="gray" className="text-[10px]">{conv.jobTitle}</Pill>
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Thread */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="px-6 py-4 border-b border-cocoon-border flex items-center justify-between">
            <div className="min-w-0">
              <h3 className="font-serif text-xl text-cocoon-ink leading-none truncate">{active.subject}</h3>
              <div className="text-xs text-cocoon-mid mt-1">
                {candidate.name} · {active.jobTitle} · last reply {active.lastMessageAt}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className="w-9 h-9 grid place-items-center rounded-lg hover:bg-cocoon-bg text-cocoon-graphite hover:text-cocoon-ink" aria-label="Flag">
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                  <path d="M3 1v14M3 1l8 3-2 3 2 3-8 1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
              </button>
              <Button>Open profile</Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
            {[
              { from: 'them', who: candidate.name, body: active.preview, when: active.lastMessageAt },
              { from: 'me', who: 'Maya Patel', body: 'Great — Tuesday 10am works. I’ll send through the case study brief beforehand. Looking forward to it.', when: '8m ago' },
              { from: 'them', who: candidate.name, body: 'Thanks Maya. Should I include the unfinished mobile concept too, or just the launched work?', when: '4m ago' },
            ].map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.from === 'me' ? 'justify-end' : ''}`}>
                {m.from === 'them' && (
                  <div className="w-8 h-8 rounded-full bg-cocoon-ink text-cocoon-yellow grid place-items-center font-serif text-sm shrink-0">
                    {m.who[0]}
                  </div>
                )}
                <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  m.from === 'me'
                    ? 'bg-cocoon-ink text-cocoon-cream rounded-br-sm'
                    : 'bg-cocoon-cream text-cocoon-ink rounded-bl-sm'
                }`}>
                  <div className="text-xs font-semibold opacity-70 mb-1">{m.who} · {m.when}</div>
                  <p className="text-sm leading-relaxed">{m.body}</p>
                </div>
                {m.from === 'me' && (
                  <div className="w-8 h-8 rounded-full bg-cocoon-cream text-cocoon-ink grid place-items-center font-serif text-sm shrink-0">M</div>
                )}
              </div>
            ))}

            {/* Internal note divider */}
            <div className="relative py-2">
              <div className="absolute inset-x-0 top-1/2 h-px bg-cocoon-border" />
              <span className="relative bg-white px-3 text-[10px] font-semibold tracking-[0.18em] uppercase text-cocoon-mid">
                Internal note
              </span>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-100 p-4">
              <div className="flex items-center gap-2 mb-1.5 text-xs">
                <span className="w-6 h-6 rounded-full bg-cocoon-ink text-cocoon-yellow grid place-items-center font-serif text-xs">E</span>
                <span className="font-semibold text-cocoon-ink">Eve Daniels</span>
                <span className="text-cocoon-mid">@maya — flagging this is a fast-mover, let&apos;s move quickly.</span>
              </div>
            </div>
          </div>

          {/* Composer */}
          <div className="border-t border-cocoon-border p-4 space-y-3">
            <div className="rounded-xl border border-cocoon-yellow bg-cocoon-yellow/30 px-3 py-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-cocoon-ink">
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                  <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
                <span className="font-semibold">AI suggestion:</span>
                <span>“Both, please — we&apos;d love to see in-progress thinking.”</span>
              </div>
              <button type="button" className="text-xs font-semibold text-cocoon-ink underline shrink-0">Use</button>
            </div>
            <textarea
              placeholder="Type your reply…"
              className="block w-full rounded-xl border border-cocoon-border bg-white p-3 text-sm focus:border-cocoon-ink focus:ring-0 focus:outline-none min-h-[88px] resize-none"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button type="button" className="px-2 py-1 rounded text-cocoon-graphite hover:bg-cocoon-bg text-xs">📎</button>
                <button type="button" className="px-2 py-1 rounded text-cocoon-graphite hover:bg-cocoon-bg text-xs">@</button>
                <select className="rounded-md border border-cocoon-border px-2 py-1 text-xs">
                  <option>Use template…</option>
                  <option>Interview confirmation</option>
                  <option>Offer letter intro</option>
                  <option>Polite rejection</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Button>Save draft</Button>
                <Button variant="primary">Send reply</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
