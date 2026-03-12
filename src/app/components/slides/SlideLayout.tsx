import { ReactNode } from 'react';

interface SlideLayoutProps {
  title: string;
  subtitle?: string;
  headerContent?: ReactNode;
  children: ReactNode;
}

export function SlideLayout({ title, subtitle, headerContent, children }: SlideLayoutProps) {
  return (
    <div className="w-full h-full p-8 flex flex-col relative">
      <div className="mb-4 shrink-0">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--slide-primary)' }}>
          {title}
        </h2>
        <div className="w-20 h-1" style={{ backgroundColor: 'var(--slide-accent)' }} />
        {subtitle && (
          <p className="text-xs mt-2" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
            {subtitle}
          </p>
        )}
        {headerContent}
      </div>
      {children}
    </div>
  );
}
