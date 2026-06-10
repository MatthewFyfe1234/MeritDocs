import { WorkedExampleLayout } from '@/components/slides/WorkedExampleLayout';
import type { ExSpecRow, ExRecordRow } from '@/components/slides/WorkedExampleLayout';
import explosives from './explosives.jpg';

const specRows: ExSpecRow[] = [
  { label: 'Stope geometry',      value: 'Narrow vein, 4.2m width, 45 holes at 35m depth',                   key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Deviation risk',      value: 'High - fault zone on footwall, complex vein geometry',              key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Crew roster',         value: 'Day 13 of 14 (end-of-swing) - fatigue indicator active',            key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Vein width <6m',      value: 'Deviation survey every hole, alignment check required',                           key: false, tag: 'affects process', tagType: 'plan' },
  { label: 'Prior blast pattern', value: '2.7m prior deviation - gyro survey of first 5 holes required',                    key: false, tag: 'affects process', tagType: 'plan' },
  { label: 'Predicted tonnes',    value: '8,200t at 4.2 g/t (~$2.8M AUD)',                                   key: true,  tag: null,                  tagType: null       },
  { label: 'Predicted dilution',  value: '12%',                                                               key: true,  tag: null,                  tagType: null       },
];

const recordRows: ExRecordRow[] = [
  { label: 'Actual tonnes',       value: '7,900t at 3.7 g/t (~$2.3M AUD)',                                                                              key: true,  highlight: false },
  { label: 'Actual dilution',     value: '18%',                                                                                                          key: true,  highlight: false },
  { label: 'Deviation',           value: '-300t · +6% dilution · -$500k AUD',                                                                           key: true,  highlight: true  },
  { label: 'Cause flagged',       value: 'Holes 5-10: 1.2° avg, 0.55m toe shift. Overbreak 1.3m vs 0.5m target.',                                          key: false, highlight: true },
  { label: 'Crew',                value: 'Drill operator (12yr), shotfirer (8yr), loader (2yr) - Day 13 of 14', key: false, highlight: false },
  { label: 'Equipment',           value: 'Sandvik jumbo, electronic detonators, bulk emulsion, 1,240kg',     key: false, highlight: false },
  { label: 'Record',              value: 'Timestamped, surveys logged, explosives reconciled',                                  key: false, highlight: false },
];

export function ExplosivesExampleSlide() {
  return (
    <WorkedExampleLayout
      title="A 45-Hole Production Blast. Fully Specified."
      subtitle="What Merit knows before the first hole is drilled, and what it records when the muck pile is measured."
      image={explosives}
      imageAlt="Underground blast preparation in gold mine"
      preLabel="Pre-Drill"
      preCaption="Derived from stope design, geological model, and blast history. Deviation thresholds and survey requirements set before the rig moves to collar."
      midNote="14:30 - Blast fired"
      postLabel="Muck Pile Measured"
      specRows={specRows}
      recordRows={recordRows}
      callout="Every hole. Every deviation. Every lost tonne. Automatically."
    />
  );
}
