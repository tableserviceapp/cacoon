import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

const base = 'inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed no-underline';

const variants: Record<Variant, string> = {
  primary: 'bg-cocoon-ink text-cocoon-cream hover:bg-[#2C332E]',
  secondary: 'border border-cocoon-border bg-white text-cocoon-ink hover:bg-cocoon-cream',
  ghost: 'text-cocoon-graphite hover:bg-cocoon-bg hover:text-cocoon-ink',
  danger: 'border border-red-200 bg-red-50 text-red-700 hover:bg-red-100',
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({ variant = 'secondary', className = '', children, ...rest }: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

type LinkButtonProps = {
  variant?: Variant;
  href: string;
  className?: string;
  children: React.ReactNode;
};

export function LinkButton({ variant = 'secondary', href, className = '', children }: LinkButtonProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
