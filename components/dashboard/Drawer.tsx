'use client';

import { useEffect } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  width?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  footer?: React.ReactNode;
};

const widths = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-2xl',
  xl: 'max-w-3xl',
};

export default function Drawer({ open, onClose, title, description, width = 'lg', children, footer }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-cocoon-ink/40 backdrop-blur-[1px]"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`absolute right-0 top-0 bottom-0 w-full ${widths[width]} bg-white shadow-cocoon-lg flex flex-col`}
      >
        {(title || description) && (
          <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-cocoon-border">
            <div>
              {title && (
                <h2 className="font-serif text-2xl text-cocoon-ink leading-none tracking-tight">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1.5 text-sm text-cocoon-graphite">{description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="w-9 h-9 grid place-items-center rounded-lg text-cocoon-graphite hover:bg-cocoon-bg"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-cocoon-border bg-cocoon-bg/50">{footer}</div>}
      </div>
    </div>
  );
}
