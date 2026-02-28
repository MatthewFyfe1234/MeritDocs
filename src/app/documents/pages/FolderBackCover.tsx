import logo from '@/decks/merit-oi/slides/Logo_secondary.webp';
import { SITE_URL, COMPANY_NAME } from '@/constants';

export function FolderBackCover() {
  return (
    <div
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{ backgroundColor: '#ffffff', fontFamily: '"Inter", sans-serif' }}
    >
      {/* Subtle grid — same pattern, primary colour at low opacity */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }}>
        <defs>
          <pattern id="grid-back" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="var(--slide-primary)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-back)" />
      </svg>

      {/* Large faint initial mark */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-40px',
          right: '-40px',
          fontSize: '320px',
          fontWeight: 900,
          lineHeight: 1,
          color: 'var(--slide-primary)',
          opacity: 0.03,
          fontFamily: '"Inter", sans-serif',
          letterSpacing: '-0.05em',
          userSelect: 'none',
        }}
      >
        OI
      </div>

      {/* Content: centred vertically */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-12 text-center">
        <img
          src={logo}
          alt="Merit OI"
          style={{ height: '56px', width: 'auto', marginBottom: '32px' }}
        />

        <div
          style={{
            width: '32px',
            height: '3px',
            backgroundColor: 'var(--slide-accent)',
            borderRadius: '2px',
            marginBottom: '28px',
          }}
        />

        <p
          className="text-sm font-light leading-relaxed"
          style={{ color: 'var(--slide-text)', opacity: 0.65, maxWidth: '240px' }}
        >
          One connected model of delivery for the project-based organisation
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 px-12 pb-12 shrink-0">
        <div
          className="flex items-center justify-between"
          style={{ borderTop: '1px solid var(--slide-border)', paddingTop: '20px' }}
        >
          <p className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.4 }}>{SITE_URL}</p>
          <p className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.4 }}>{COMPANY_NAME}</p>
        </div>
      </div>

    </div>
  );
}
