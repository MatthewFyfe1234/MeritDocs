import { WorkedExampleLayout } from '@/components/slides/WorkedExampleLayout';
import type { ExSpecRow, ExRecordRow } from '@/components/slides/WorkedExampleLayout';
import steelframe from './steelstructure.jpg';

const specRows: ExSpecRow[] = [
  { label: 'Frame type',          value: '4-storey commercial, 12 bays, S355 mixed sections',               key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Cambered beams',      value: '8 long-span beams, pre-cambered 25mm',                            key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Connections',         value: 'Bolted end plate + moment connections at perimeter',               key: false, tag: 'affects process',     tagType: 'plan'     },
  { label: 'Fire protection',     value: '60-min passive required on all primary members',                   key: false, tag: 'affects process',     tagType: 'plan'     },
  { label: 'Predicted erection',  value: '14 days (2 gangs)',                                                key: true,  tag: null,                  tagType: null       },
  { label: 'Predicted bolts',     value: '4,800 (M20, grade 8.8)',                                          key: true,  tag: null,                  tagType: null       },
];

const recordRows: ExRecordRow[] = [
  { label: 'Actual erection',     value: '17 days',                                                          key: true,  highlight: false },
  { label: 'Bolts installed',     value: '4,800',                                                            key: true,  highlight: false },
  { label: 'Deviation',           value: '+3 days',                                                          key: true,  highlight: true  },
  { label: 'Cause flagged',       value: 'Column splice at C3 used superseded plate - re-drilled on site, 1.5-day delay', key: false, highlight: true },
  { label: 'Fire protection',     value: '3 members missed first coat - flagged at inspection, re-scheduled', key: false, highlight: true  },
  { label: 'Record',              value: 'Timestamped, bolt log complete, splice repair and re-coat documented', key: false, highlight: false },
];

export function SteelFrameExampleSlide() {
  return (
    <WorkedExampleLayout
      title="A Commercial Steel Frame. Fully Specified."
      subtitle="What Merit knows before the first column is lifted, and what it records when the frame is signed off."
      image={steelframe}
      imageAlt="Commercial steel frame under construction"
      preLabel="Pre-Erection"
      preCaption="Derived from structural drawings, connection schedule, and fire strategy. Stage gates and inspection triggers set before the crane arrives."
      midNote="07:00 - Erection commenced"
      postLabel="Frame Complete"
      specRows={specRows}
      recordRows={recordRows}
      callout="Every member. Every connection. Every missed coat. Automatically."
    />
  );
}
