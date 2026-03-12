import logo from '@/assets/Logo_secondary.webp';
import { SITE_URL } from '@/constants';

export function FlyerBack() {
  return (
    <div
      className="w-full h-full flex flex-col"
      style={{ backgroundColor: '#ffffff', fontFamily: '"Inter", sans-serif', color: '#49494b', padding: '4cqh 5cqw', containerType: 'size' }}
    >
      {/* Headline */}
      <div style={{ marginBottom: '1.5cqh' }}>
        <h2 style={{ fontSize: '2.5cqh', lineHeight: 1.2 }}>
          One System. <span style={{ color: 'var(--slide-accent)' }}>For Everyone.</span>
        </h2>
      </div>

      {/* Feature cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2cqw', marginBottom: '1.5cqh' }}>
        {[
          { title: 'Shared Documents', body: 'All stakeholders access the same live documents, eliminating version confusion at every level.' },
          { title: 'Unified Platform', body: 'One system replacing fragmented tools: workforce, planning, process mapping and business intelligence.' },
          { title: 'Full Transparency', body: 'Clients, contractors, suppliers and teams collaborate in real time with complete visibility.' },
        ].map(({ title, body }) => (
          <div key={title} style={{ backgroundColor: '#e4e8e8', padding: '1.2cqh 1.5cqw', borderRadius: '0.5cqh' }}>
            <div style={{ fontWeight: 600, fontSize: '1cqh', marginBottom: '0.5cqh', color: '#335d57' }}>{title}</div>
            <div style={{ fontSize: '0.8cqh', color: 'rgba(73,73,75,0.8)', lineHeight: 1.5 }}>{body}</div>
          </div>
        ))}
      </div>

      {/* Tagline */}
      <div style={{ backgroundColor: '#335d57', color: '#ffffff', padding: '1.5cqh 2cqw', borderRadius: '0.5cqh', marginBottom: '1.5cqh', textAlign: 'center' }}>
        <p style={{ fontSize: '1.1cqh', fontStyle: 'italic', lineHeight: 1.6 }}>
          Merit is not just software. It is an operating model that changes how your
          organisation sees itself, plans its work and delivers results.
        </p>
      </div>

      {/* Benefits */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2cqh 4cqw', marginBottom: '1.5cqh', alignContent: 'start' }}>
        {[
          { title: 'Decisions driven by data, not instinct', body: 'Real-time visibility replaces end-of-week reporting. Leadership acts on what is happening now, not what happened last Friday.' },
          { title: 'Resources where they are needed', body: 'Automated scheduling and smart assignment eliminate guesswork and idle capacity across every project.' },
          { title: 'Every stakeholder on the same page', body: 'From the boardroom to the field, suppliers to clients, everyone works from the same live information at all times.' },
          { title: 'Problems caught before they become costly', body: 'Continuous monitoring of budgets, timelines and performance flags issues early so you can act rather than react.' },
          { title: 'A culture of accountability', body: 'When goals connect to individual tasks and everyone can see progress, ownership becomes natural and performance improves.' },
          { title: 'Continuous improvement built in', body: 'Aggregated data across every project builds an institutional knowledge base your organisation can learn from and build on.' },
        ].map(({ title, body }) => (
          <div key={title}>
            <div style={{ fontWeight: 600, fontSize: '0.95cqh', marginBottom: '0.3cqh', color: 'var(--slide-accent)' }}>{title}</div>
            <div style={{ fontSize: '0.8cqh', color: 'rgba(73,73,75,0.8)', lineHeight: 1.5 }}>{body}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #335d57', paddingTop: '1.2cqh', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '0.95cqh', color: '#335d57', marginBottom: '0.3cqh' }}>{SITE_URL}</div>
          <div style={{ fontSize: '0.75cqh' }}>
            <div style={{ marginBottom: '0.15cqh', fontWeight: 600 }}>Umar Abubakar, Co-Founder</div>
            <div>umar@meritoi.com</div>
            <div>+234 816 693 0057</div>
          </div>
        </div>
        <img src={logo} alt="Merit Logo" style={{ height: '6cqh', width: 'auto' }} />
      </div>
    </div>
  );
}
