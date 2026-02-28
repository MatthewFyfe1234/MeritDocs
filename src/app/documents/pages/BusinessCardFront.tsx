import logo from '@/decks/merit-oi/slides/Logo_secondary.webp';
import mMark from '@/components/M.png';
import { SITE_URL, COMPANY_NAME, COMPANY_ADDRESS } from '@/constants';

export function BusinessCardFront() {
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{
        backgroundColor: 'var(--slide-border)',
        fontFamily: '"Inter", sans-serif',
        containerType: 'size',
      }}>
      {/* Right panel */}
      <div
        className="absolute top-0 right-0 h-full"
        style={{ width: '38%', backgroundColor: 'var(--slide-primary)' }}
      />

      {/* M watermark — full card, sits in right area */}
      <img
        src={mMark}
        alt=""
        aria-hidden
        style={{
          position: 'absolute',
          right: '-10%',
          top: '50%',
          transform: 'translateY(-50%) rotate(15deg)',
          height: '140%',
          width: 'auto',
          opacity: 0.08,
          filter: 'brightness(0) invert(1)',
          pointerEvents: 'none',
        }}
      />

      {/* Contact info — over right panel */}
      <div
        className="absolute top-0 right-0 h-full flex flex-col justify-center"
        style={{ width: '38%', padding: '0 4cqw', zIndex: 1 }}
      >
        <div style={{ lineHeight: 1.9 }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '3.2cqh', fontFamily: 'monospace' }}>+234 816 693 0057</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '3.2cqh', fontFamily: 'monospace' }}>umar@meritoi.com</p>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '3.2cqh', fontFamily: 'monospace' }}>{SITE_URL}</p>

          <div style={{ width: '100%', height: '0.5cqh', backgroundColor: 'rgba(255,255,255,0.3)', margin: '2cqh 0' }} />
          {/* Company address, wrapped by commas */}
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '3.2cqh', fontFamily: 'monospace' }}>{COMPANY_ADDRESS}</p>
        </div>
      </div>

      {/* Logo — top left */}
      <div className="absolute" style={{ top: '8%', left: '5%', zIndex: 1 }}>
        <img src={logo} alt="Merit OI" style={{ height: '6cqh', width: 'auto' }} />
      </div>

      {/* Name + title */}
      <div
        className="absolute flex flex-col"
        style={{ left: '5%', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
      >
        <p style={{ color: 'var(--slide-primary)', fontSize: '9cqh', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          Umar Abubakar
        </p>
        <p style={{ color: 'var(--slide-text)', fontSize: '3.5cqh', opacity: 0.55, marginTop: '2cqh', letterSpacing: '0.02em' }}>
          Co-Founder, {COMPANY_NAME}
        </p>
        <div style={{ width: '8cqh', height: '0.8cqh', backgroundColor: 'var(--slide-accent)', borderRadius: '0.4cqh', marginTop: '3cqh' }} />
      </div>
    </div>
  );
}
