import logo from '@/assets/Logo_secondary.webp';
import heroImage from './flyer.jpg';
import { SITE_URL } from '@/constants';

function ProcessStep({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div style={{ backgroundColor: 'rgba(255,255,255,0.95)', padding: '0.5cqh 1.2cqw', borderRadius: '0.4cqh' }}>
      <div style={{ fontSize: '1.2cqh', marginBottom: '0.15cqh', color: '#eddc6d' }}>{number}</div>
      <div style={{ fontWeight: 600, fontSize: '0.85cqh', marginBottom: '0.15cqh', color: '#335d57' }}>{title}</div>
      <div style={{ fontSize: '0.75cqh', color: 'rgba(73,73,75,0.8)', lineHeight: 1.4 }}>{description}</div>
    </div>
  );
}

export function FlyerFront() {
  return (
    <div
      className="w-full h-full flex flex-col relative"
      style={{ backgroundColor: '#ffffff', fontFamily: '"Inter", sans-serif', padding: '4cqh 5cqw', containerType: 'size' }}
    >
      {/* Logo — absolutely positioned top right */}
      <div style={{ position: 'absolute', top: '2cqh', right: '5cqw', zIndex: 10 }}>
        <img src={logo} alt="Merit Logo" style={{ height: '6cqh', width: 'auto' }} />
      </div>

      {/* Header bar */}
      <div style={{ marginBottom: '1.2cqh', position: 'relative', zIndex: 10 }}>
        <div style={{ backgroundColor: '#335d57', height: '0.5cqh', width: '18cqw' }} />
      </div>

      {/* Main title */}
      <div style={{ marginBottom: '1.2cqh', position: 'relative', zIndex: 10 }}>
        <h1 style={{ fontSize: '2.2cqh', lineHeight: 1.2, marginBottom: '0.6cqh', color: '#49494b' }}>
          Merit brings your entire<br />
          <span style={{ color: 'var(--slide-accent)' }}>organisation into focus</span>
        </h1>
        <p style={{ fontSize: '0.95cqh', color: '#49494b', lineHeight: 1.5 }}>
          By connecting teams, resources and processes in a single platform,
          leaders gain the clarity to act with confidence and everyone can see
          how their work contributes to the bigger picture.
        </p>
      </div>

      {/* Key stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2cqw', marginBottom: '1.2cqh', position: 'relative', zIndex: 10 }}>
        <div style={{ backgroundColor: '#e4e8e8', padding: '0.8cqh 1.2cqw', borderRadius: '0.5cqh' }}>
          <div style={{ fontSize: '2.5cqh', marginBottom: '0.3cqh', color: '#eddc6d' }}>1 in 3</div>
          <div style={{ color: '#49494b', fontSize: '0.85cqh', lineHeight: 1.4 }}>
            business leaders name organisational fragmentation their #1 strategic challenge
          </div>
        </div>
        <div style={{ backgroundColor: '#e4e8e8', padding: '0.8cqh 1.2cqw', borderRadius: '0.5cqh' }}>
          <div style={{ fontSize: '2.5cqh', marginBottom: '0.3cqh', color: '#eddc6d' }}>80%</div>
          <div style={{ color: '#49494b', fontSize: '0.85cqh', lineHeight: 1.4 }}>
            of companies struggle with process inefficiency yet lack tools that provide real, actionable insight
          </div>
        </div>
      </div>

      {/* Hero image with How Merit Works overlay */}
      <div style={{ flex: 1, position: 'relative', borderRadius: '0.5cqh', overflow: 'hidden', minHeight: 0 }}>
        <img
          src={heroImage}
          alt="Professional workspace"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)', opacity: 0.4 }}
        />
        <div style={{ position: 'absolute', inset: 0, padding: '1.2cqh 1.8cqw', maxWidth: '42%' }}>
          <h2 style={{ fontSize: '1.8cqh', marginBottom: '0.35cqh', color: '#49494b' }}>
            How <span style={{ color: 'var(--slide-accent)' }}>Merit</span> Works
          </h2>
          <div style={{ marginBottom: '0.7cqh' }}>
            <span style={{ fontSize: '0.85cqh', color: 'rgba(73,73,75,0.8)', backgroundColor: 'rgba(255,255,255,0.9)', padding: '0.2cqh 0.7cqw', borderRadius: '0.3cqh' }}>
              From specification to insight, automatically.
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5cqh', width: '100%', alignContent: 'start' }}>
            <ProcessStep number="01" title="Define Specifications" description="Configure every material, tool and resource in one place. Your single source of truth." />
            <ProcessStep number="02" title="Automated Generation" description="Merit instantly generates BOQ, material costs, labour estimates, time plans and cash flow projections." />
            <ProcessStep number="03" title="Smart Assignment" description="Each job matched to the right person based on skills, experience and availability. Automatically." />
            <ProcessStep number="04" title="Real-Time Monitoring" description="Track delivery times, resource utilisation and performance as work happens. Not after the fact." />
            <ProcessStep number="05" title="Actionable Intelligence" description="Aggregated insight across people, materials and processes gives management the clarity to act." />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: '1.2cqh', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 10 }}>
        <div style={{ color: '#49494b', fontSize: '0.75cqh' }}>
          <div style={{ marginBottom: '0.2cqh', fontWeight: 600 }}>Umar Abubakar, Co-Founder</div>
          <div>umar@meritoi.com</div>
          <div>+234 816 693 0057</div>
        </div>
        <div style={{ color: '#335d57', fontSize: '0.85cqh' }}>{SITE_URL}</div>
      </div>
    </div>
  );
}
