import { Users, AlertTriangle, TrendingDown } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

const phases = [
  {
    Icon: Users,
    phase: 'Phase 1',
    title: 'The Promise',
    description: 'Democratic participation, shared ownership, member accountability. Decisions made collectively. Surplus distributed fairly. Every member has a stake in the outcome.',
    items: [
      'Collective governance and decision-making',
      'Surplus distributed by member contribution',
      'Shared accountability across the organisation',
      'Intrinsic motivation replaces management overhead',
    ],
    tone: 'positive' as const,
  },
  {
    Icon: AlertTriangle,
    phase: 'Phase 2',
    title: 'The Friction',
    description: 'As the organisation scales, the absence of a shared evidence base makes governance progressively harder. Decisions that should be straightforward become contested because nobody can point to a clear record.',
    items: [
      'Contribution visible only to those who were present',
      'Decisions made on memory, impression, and advocacy',
      '"Everybody\'s responsibility" becomes nobody\'s',
      'Informal influence networks fill the information vacuum',
    ],
    tone: 'warning' as const,
  },
  {
    Icon: TrendingDown,
    phase: 'Phase 3',
    title: 'The Drift',
    description: 'Without an objective record, power concentrates in whoever holds the most information, usually whoever accepted operational responsibility. Democratic governance loses ground not by design, but by default.',
    items: [
      'The manager becomes the information bottleneck',
      'Contribution disputes displace productive governance',
      'Member disengagement as co-owner becomes employee',
      'Fagor, 2013: "Solidarity has reached its limit"',
    ],
    tone: 'negative' as const,
  },
];

const toneStyles = {
  positive: {
    border: '#16a34a',
    bg: '#f0fdf4',
    headerBg: '#dcfce7',
    headerBorder: '#bbf7d0',
    iconBg: '#bbf7d0',
    iconColor: '#16a34a',
    titleColor: '#15803d',
    dotColor: '#16a34a',
  },
  warning: {
    border: '#d97706',
    bg: '#fffbeb',
    headerBg: '#fef3c7',
    headerBorder: '#fde68a',
    iconBg: '#fde68a',
    iconColor: '#d97706',
    titleColor: '#b45309',
    dotColor: '#d97706',
  },
  negative: {
    border: '#dc2626',
    bg: '#fef2f2',
    headerBg: '#fee2e2',
    headerBorder: '#fecaca',
    iconBg: '#fecaca',
    iconColor: '#dc2626',
    titleColor: '#b91c1c',
    dotColor: '#dc2626',
  },
};

export function DegenerationSlide() {
  return (
    <SlideLayout
      title="What Happens Without the Right Information"
      subtitle="The challenges that emerge when democratic governance operates without an adequate evidence base."
    >
      {/* Three phase cards */}
      <div className="flex-1 min-h-0 grid grid-cols-3 gap-5">
        {phases.map((p) => {
          const s = toneStyles[p.tone];
          return (
            <div
              key={p.title}
              className="min-h-0 rounded-lg border flex flex-col overflow-hidden shadow-sm"
              style={{ borderColor: s.border, borderTop: `3px solid ${s.border}`, backgroundColor: s.bg }}
            >
              {/* Card header */}
              <div
                className="p-4 pb-3 shrink-0"
                style={{ backgroundColor: s.headerBg, borderBottom: `1px solid ${s.headerBorder}` }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 rounded-md shrink-0" style={{ backgroundColor: s.iconBg }}>
                    <p.Icon className="w-4 h-4" style={{ color: s.iconColor }} />
                  </div>
                  <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: s.titleColor, opacity: 0.6 }}>
                    {p.phase}
                  </span>
                </div>
                <h3 className="text-sm font-bold leading-tight" style={{ color: s.titleColor }}>
                  {p.title}
                </h3>
              </div>

              {/* Description */}
              <p className="px-4 pt-3 pb-2 text-xs leading-relaxed shrink-0" style={{ color: '#374151', opacity: 0.75 }}>
                {p.description}
              </p>

              {/* Items */}
              <ul className="flex-1 px-4 pb-4 space-y-1.5">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-1.5 text-xs" style={{ color: '#374151' }}>
                    <span className="shrink-0 mt-0.5" style={{ color: s.dotColor }}>•</span>
                    <span className={p.tone === 'negative' && item.includes('Fagor') ? 'italic opacity-70' : ''}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Pivot callout */}
      <div
        className="shrink-0 mt-4 rounded-lg p-3"
        style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}
      >
        <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--slide-primary)' }}>
          <span style={{ color: 'var(--slide-accent)', fontWeight: 700 }}>The drift is not inevitable. </span>
          It is what happens when democratic governance operates without an evidence base. When the process model generates a live, objective record of every delivery, governance has what it has always needed. The gap closes.
        </p>
      </div>
    </SlideLayout>
  );
}
