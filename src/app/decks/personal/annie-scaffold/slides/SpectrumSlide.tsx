import { SlideLayout } from '@/components/slides/SlideLayout';
import type { Burden } from '../data';
import { BURDEN_STYLE, ConsensusTag } from '../components';

interface Item { label: string; contested?: boolean }

const bands: { level: Burden; title: string; items: Item[] }[] = [
  {
    level: 'none',
    title: 'None / antibiotic-free',
    items: [
      { label: 'MCAS / histamine management' },
      { label: 'Thyroid' },
      { label: 'Candida (nystatin)' },
      { label: 'Reactivated viruses (adjuncts)' },
      { label: 'Powassan / TBE' },
      { label: 'Plasmodium (antimalarial)' },
      { label: 'SIBO via elemental diet' },
    ],
  },
  {
    level: 'low',
    title: 'Low / gut-sparing',
    items: [
      { label: 'Rifaximin (SIBO)' },
      { label: 'Short-course doxycycline (Anaplasma / Ehrlichia / Rickettsia)' },
      { label: 'Nitazoxanide (parasites)' },
      { label: 'H. pylori dual therapy + probiotic' },
    ],
  },
  {
    level: 'high',
    title: 'Heavy',
    items: [
      { label: 'Classic H. pylori triple / quad' },
      { label: 'Babesia combinations' },
      { label: 'Bartonella combinations' },
      { label: 'Neuroborreliosis IV' },
      { label: 'ILADS long-course Lyme', contested: true },
      { label: 'Chlamydia CAP', contested: true },
    ],
  },
];

export function SpectrumSlide() {
  return (
    <SlideLayout
      title="Antibiotic-Burden Spectrum"
      subtitle="Every option ranked along Annie's key axis."
    >
      <div className="flex-1 min-h-0 flex gap-4">
        {/* Axis */}
        <div className="flex flex-col items-center w-6 shrink-0">
          <span className="text-[8px] font-bold uppercase" style={{ color: BURDEN_STYLE.none.fg }}>Favour</span>
          <div className="flex-1 w-1.5 rounded-full my-1"
            style={{ background: `linear-gradient(${BURDEN_STYLE.none.fg}, ${BURDEN_STYLE.moderate.fg}, ${BURDEN_STYLE.high.fg})` }} />
          <span className="text-[8px] font-bold uppercase text-center leading-tight" style={{ color: BURDEN_STYLE.high.fg }}>Sequence carefully</span>
        </div>

        <div className="flex-1 min-h-0 flex flex-col gap-3">
          {bands.map(b => {
            const st = BURDEN_STYLE[b.level];
            return (
              <div key={b.level} className="flex-1 rounded-lg px-4 py-3 flex gap-4 items-center"
                style={{ backgroundColor: `${st.bg}80`, border: `1px solid ${st.fg}40` }}>
                <div className="w-[160px] shrink-0">
                  <span className="inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                    style={{ backgroundColor: st.bg, color: st.fg, border: `1px solid ${st.fg}50` }}>
                    {b.title}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {b.items.map(it => (
                    <span key={it.label} className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10.5px]"
                      style={{ backgroundColor: 'var(--slide-bg-card)', border: '1px solid var(--slide-border)', color: 'var(--slide-text)' }}>
                      {it.label}
                      {it.contested && <ConsensusTag consensus="contested" />}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-[11px] font-semibold mt-3 shrink-0" style={{ color: 'var(--slide-primary)' }}>
        For Annie, this spectrum is the prioritisation logic: favour the top, sequence the bottom carefully.
      </p>
    </SlideLayout>
  );
}
