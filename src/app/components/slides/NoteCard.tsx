import { ReactNode } from 'react';

interface NoteCardProps {
  label: string;
  headline: string;
  children: ReactNode;
}

export function NoteCard({ label, headline, children }: NoteCardProps) {
  return (
    <div className="w-full min-h-full flex flex-col p-8" style={{ backgroundColor: 'var(--slide-bg-card)' }}>
      <div className="mb-6 shrink-0">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--slide-accent)' }}>
          {label}
        </p>
        <h2 className="text-2xl font-bold leading-snug mb-3" style={{ color: 'var(--slide-primary)' }}>
          {headline}
        </h2>
        <div className="w-12 h-1" style={{ backgroundColor: 'var(--slide-accent)' }} />
      </div>
      <div className="flex-1 text-base leading-relaxed space-y-3" style={{ color: 'var(--slide-text)' }}>
        {children}
      </div>
    </div>
  );
}
