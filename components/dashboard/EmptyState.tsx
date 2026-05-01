type Props = {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  compact?: boolean;
};

export default function EmptyState({ icon, title, description, action, compact = false }: Props) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${compact ? 'py-10' : 'py-20'}`}
    >
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-cocoon-cream text-cocoon-ink grid place-items-center mb-4">
          {icon}
        </div>
      )}
      <h3 className="font-serif text-xl text-cocoon-ink">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-cocoon-graphite max-w-md">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
