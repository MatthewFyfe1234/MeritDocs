import { ReactNode } from 'react';

interface BlankSlideProps {
  notes?: ReactNode;
}

export function BlankSlide({ notes }: BlankSlideProps) {
  return (
    <div
      className="flex-1 rounded-lg p-6 flex flex-col gap-3"
      style={{ backgroundColor: 'var(--slide-bg-muted)', border: '1px dashed var(--slide-border)' }}
    >
      {notes && (
        <>
          <span
            className="text-xs font-semibold uppercase tracking-widest shrink-0"
            style={{ color: 'var(--slide-accent)', opacity: 0.7 }}
          >
            Notes
          </span>
          <div
            className="text-sm leading-relaxed overflow-y-auto"
            style={{ color: 'var(--slide-text)', opacity: 0.75 }}
          >
            {notes}
          </div>
        </>
      )}
    </div>
  );
}
