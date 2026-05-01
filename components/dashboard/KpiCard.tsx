import Sparkline from './charts/Sparkline';

type KpiCardProps = {
  label: string;
  value: string;
  change?: string;
  changeLabel?: string;
  positive?: boolean;
  icon?: React.ReactNode;
  spark?: number[];
};

export default function KpiCard({
  label,
  value,
  change,
  changeLabel,
  positive = true,
  icon,
  spark,
}: KpiCardProps) {
  return (
    <div className="rounded-2xl border border-cocoon-border bg-white p-5 hover:shadow-cocoon-md transition">
      <div className="flex items-start justify-between">
        <div className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cocoon-graphite">
          {label}
        </div>
        {icon && (
          <div className="w-9 h-9 rounded-xl bg-cocoon-cream text-cocoon-ink grid place-items-center">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div className="font-serif text-[34px] text-cocoon-ink leading-none tracking-tight">
          {value}
        </div>
        {spark && (
          <div className="opacity-80">
            <Sparkline data={spark} />
          </div>
        )}
      </div>

      {change && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold ${
              positive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
            }`}
          >
            <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
              <path
                d={positive ? 'M3 11l5-6 5 6' : 'M3 5l5 6 5-6'}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {change}
          </span>
          {changeLabel && <span className="text-cocoon-mid">{changeLabel}</span>}
        </div>
      )}
    </div>
  );
}
