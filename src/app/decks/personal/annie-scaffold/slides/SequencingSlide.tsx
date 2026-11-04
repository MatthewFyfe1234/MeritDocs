import { ChevronRight } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';
import { CaveatBanner } from '../components';

const phases = [
  {
    title: 'Stabilise first',
    when: 'Before any antimicrobial',
    items: [
      'Mast-cell stabilisation: antihistamines, cromolyn / ketotifen, quercetin',
      'Gut-barrier support',
      'Non-histamine probiotics',
    ],
  },
  {
    title: 'Gut-sparing clearance',
    when: 'Non-absorbed or low-reactivity options',
    items: [
      'Address SIBO / SIFO / parasites',
      'Rifaximin, nystatin, elemental diet',
      'Biofilm and binder support',
    ],
  },
  {
    title: 'Targeted systemic antimicrobials',
    when: 'Only if needed',
    items: [
      'Introduce slowly',
      'Watch for Jarisch-Herxheimer (die-off) flares',
      'Pulse / space courses to let the gut recover',
    ],
  },
];

export function SequencingSlide() {
  return (
    <SlideLayout
      title="Sequencing Strategy"
      subtitle="Clinician-directed. Three phases, no dosing."
      headerContent={<div className="mt-2"><CaveatBanner /></div>}
    >
      <div className="flex-1 min-h-0 flex items-stretch gap-2 py-2">
        {phases.map((p, i) => (
          <div key={p.title} className="flex-1 flex items-stretch gap-2">
            <div className="flex-1 rounded-lg p-5 flex flex-col gap-3"
              style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}>
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ backgroundColor: 'var(--slide-primary)', color: '#fff' }}>{i + 1}</span>
                <span className="text-[15px] font-bold leading-tight" style={{ color: 'var(--slide-primary)' }}>{p.title}</span>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--slide-accent)' }}>{p.when}</span>
              <ul className="flex flex-col gap-2">
                {p.items.map(it => (
                  <li key={it} className="text-[12px] leading-snug pl-3 relative" style={{ color: 'var(--slide-text)' }}>
                    <span className="absolute left-0" style={{ color: 'var(--slide-primary)' }}>•</span>{it}
                  </li>
                ))}
              </ul>
            </div>
            {i < phases.length - 1 && (
              <div className="flex items-center"><ChevronRight className="w-6 h-6" style={{ color: 'var(--slide-primary)', opacity: 0.5 }} /></div>
            )}
          </div>
        ))}
      </div>
      <p className="text-[10px] mt-2 shrink-0" style={{ color: 'var(--slide-text-muted)' }}>
        Order and specifics are a clinical decision. This is a discussion starting point.
      </p>
    </SlideLayout>
  );
}
