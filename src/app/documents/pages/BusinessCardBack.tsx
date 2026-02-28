import logo from '@/decks/merit-oi/slides/Logo_secondary.webp';
import mMark from '@/components/M.png';
import { SITE_URL } from '@/constants';

export function BusinessCardBack() {
  return (
    <div
      className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center"
      style={{ backgroundColor: 'var(--slide-primary)', fontFamily: '"Inter", sans-serif', containerType: 'size' }}
    >
      {/* Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.07 }}>
        <defs>
          <pattern id="bc-back-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bc-back-grid)" />
      </svg>

      {/* Accent corner */}
      <div
        className="absolute top-0 right-0 h-full"
        style={{ width: '35%', backgroundColor: '#ffffff', opacity: 0.04 }}
      />

      {/* M watermark */}
      <img
        src={mMark}
        alt=""
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) rotate(15deg)',
          height: '180%',
          width: 'auto',
          opacity: 0.06,
          filter: 'brightness(0) invert(1)',
          pointerEvents: 'none',
        }}
      />

      {/* Centred mark */}
      <div className="relative z-10 flex flex-col items-center" style={{ gap: '2cqh' }}>
        <img
          src={logo}
          alt="Merit OI"
          style={{ height: '9cqh', width: 'auto', filter: 'brightness(0) invert(1)' }}
        />
        <div style={{ width: '8cqh', height: '0.8cqh', backgroundColor: 'var(--slide-accent)', borderRadius: '0.4cqh' }} />
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '3cqh', letterSpacing: '0.18em', fontFamily: 'monospace' }}>
          {SITE_URL.toUpperCase()}
        </p>
      </div>
    </div>
  );
}
