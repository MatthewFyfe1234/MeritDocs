import { WorkedExampleLayout } from '@/components/slides/WorkedExampleLayout';
import type { ExSpecRow, ExRecordRow } from '@/components/slides/WorkedExampleLayout';
import scaffolding from './scaffolding.jpg';

const specRows: ExSpecRow[] = [
  { label: 'Project type',       value: 'Industrial turnaround, 14-day window, multi-trade use',              key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Crew composition',   value: '2 senior (8+ yrs), 4 junior (<2 yrs)',                               key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Wind forecast',      value: 'Gusts 25+ mph on days 3-4',                                          key: false, tag: 'affects forecasting', tagType: 'forecast' },
  { label: 'Scaffold height',    value: '120ft - engineered design, tie-ins every 30ft',                            key: false, tag: 'affects process', tagType: 'plan' },
  { label: 'Soil conditions',    value: 'Gravel + recent rain - mud sills, load test required',                     key: false, tag: 'affects process', tagType: 'plan' },
  { label: 'Predicted erection time', value: '3.5 days',                                                     key: true,  tag: null,                  tagType: null       },
  { label: 'Predicted inspections',   value: '11 (1 pre-use, 7 daily, 3 event-driven)',                      key: true,  tag: null,                  tagType: null       },
];

const recordRows: ExRecordRow[] = [
  { label: 'Actual erection time', value: '4.5 days',                                                                                            key: true,  highlight: false },
  { label: 'Inspections completed', value: '11 of 11',                                                                                           key: true,  highlight: false },
  { label: 'Deviation',            value: '+1 day (+28%) · 2 failed inspections · 1 red tag event',                                              key: true,  highlight: true  },
  { label: 'Cause flagged',        value: 'Tie-ins missing at 60ft and 90ft - stop-work issued, rework before resumption',                               key: false, highlight: true },
  { label: 'Crew',                 value: '6 certified scaffolders, competent person assigned',                                                   key: false, highlight: false },
  { label: 'Structure',            value: 'Tube-and-fitting, 120ft, 75 psf rated, 4 catwalks',                                                   key: false, highlight: false },
  { label: 'Record',               value: 'Timestamped, tag log complete, green tag at handover',                                                  key: false, highlight: false },
];

export function ScaffoldingExampleSlide() {
  return (
    <WorkedExampleLayout
      title="A 120-Foot Industrial Scaffold. Fully Specified."
      subtitle="What Merit knows before the first tube goes up, and what it records when the scaffold is handed over."
      image={scaffolding}
      imageAlt="Industrial scaffolding on process vessel"
      preLabel="Pre-Erection"
      preCaption="Derived from design drawings, site survey, and personnel records. Stage gates and inspection triggers set before erection begins."
      midNote="07:00 - Erection commenced"
      postLabel="Handed Over"
      specRows={specRows}
      recordRows={recordRows}
      callout="Every lift. Every tie-in. Every inspection. Automatically."
    />
  );
}
