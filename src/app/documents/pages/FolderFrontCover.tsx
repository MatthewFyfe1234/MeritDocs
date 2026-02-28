import logo from '@/decks/merit-oi/slides/Logo_secondary.webp';
import { SITE_URL, BRAND_FULL, monthYear } from '@/constants';

export function FolderFrontCover() {
  return (
    <div
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{ backgroundColor: 'var(--slide-border)', fontFamily: '"Inter", sans-serif' }}
    >
      {/* Top-right accent panel — mirrors the CoverSlide exactly */}
      <div
        className="absolute top-0 right-0 h-full"
        style={{ width: '38%', backgroundColor: 'var(--slide-primary)', opacity: 0.07 }}
      />

      {/* Technical grid overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.06 }}>
        <defs>
          <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="var(--slide-primary)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Top: logo */}
      <div className="relative z-10 px-12 pt-12 shrink-0">
        <img
          src={logo}
          alt="Merit OI"
          style={{ height: '52px', width: 'auto' }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-12">

        <p
          className="text-xs font-semibold tracking-widest uppercase mb-8"
          style={{ color: 'var(--slide-primary)', opacity: 0.5 }}
        >
          {BRAND_FULL}
        </p>

        <h1
          className="font-bold leading-none mb-6"
          style={{ color: 'var(--slide-primary)', fontSize: '48px', letterSpacing: '-0.02em' }}
        >
          One connected<br />model of delivery
        </h1>

        <div
          style={{
            width: '48px',
            height: '4px',
            backgroundColor: 'var(--slide-accent)',
            marginBottom: '28px',
            borderRadius: '2px',
          }}
        />

        <p
          className="text-base font-light"
          style={{ color: 'var(--slide-text)', opacity: 0.7, maxWidth: '280px', lineHeight: 1.6 }}
        >
          Built for the project-based organisation
        </p>

      </div>

      {/* Footer */}
      <div className="relative z-10 px-12 pb-12 shrink-0">
        <div
          className="flex items-center justify-between"
          style={{ borderTop: '1px solid var(--slide-border-primary)', paddingTop: '20px' }}
        >
          <p className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.45 }}>{SITE_URL}</p>
          <p className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.45 }}>{monthYear()}</p>
        </div>
      </div>

    </div>
  );
}
