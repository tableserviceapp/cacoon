'use client';

import { useState } from 'react';

type Tab = {
  id: string;
  label: string;
  count?: number;
  content: React.ReactNode;
};

export default function Tabs({ tabs, defaultTabId }: { tabs: Tab[]; defaultTabId?: string }) {
  const [active, setActive] = useState(defaultTabId ?? tabs[0]?.id);
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div>
      <div className="border-b border-cocoon-border">
        <div className="flex items-center gap-1 -mb-px overflow-x-auto">
          {tabs.map((t) => {
            const isActive = t.id === active;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActive(t.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap ${
                  isActive
                    ? 'border-cocoon-ink text-cocoon-ink'
                    : 'border-transparent text-cocoon-graphite hover:text-cocoon-ink'
                }`}
              >
                {t.label}
                {t.count !== undefined && (
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
                      isActive ? 'bg-cocoon-cream text-cocoon-ink' : 'bg-cocoon-bg text-cocoon-graphite'
                    }`}
                  >
                    {t.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <div className="pt-6">{activeTab?.content}</div>
    </div>
  );
}
