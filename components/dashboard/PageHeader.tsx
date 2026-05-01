import Breadcrumbs from './Breadcrumbs';

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  meta?: React.ReactNode;
  showBreadcrumbs?: boolean;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  meta,
  showBreadcrumbs = true,
}: PageHeaderProps) {
  return (
    <header className="space-y-3">
      {showBreadcrumbs && <Breadcrumbs />}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          {eyebrow && (
            <div className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cocoon-graphite mb-1">
              {eyebrow}
            </div>
          )}
          <h1 className="font-serif text-3xl sm:text-[34px] text-cocoon-ink leading-none tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-sm text-cocoon-graphite max-w-2xl">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {meta && <div>{meta}</div>}
    </header>
  );
}
