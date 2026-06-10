import { CoverSlide } from './slides/CoverSlide';
import { DisconnectSlide } from './slides/DisconnectSlide';
import { ProcessAuthoritySlide } from './slides/ProcessAuthoritySlide';
import { ValueCaptureSlide } from './slides/ValueCaptureSlide';
import { CapitalIntensiveValueCaptureSlide } from './slides/CapitalIntensiveValueCaptureSlide';
import { ProblemSlide } from './slides/ProblemSlide';
import { ProcessModelSlide } from './slides/ProcessModelSlide';
import { CombineExampleSlide } from './example-slides/CombineExampleSlide';
import { SawmillExampleSlide } from './example-slides/SawmillExampleSlide';
import { HarvesterExampleSlide } from './example-slides/HarvesterExampleSlide';
import { BoomLiftExampleSlide } from './example-slides/BoomLiftExampleSlide';
import { ScaffoldingExampleSlide } from './example-slides/ScaffoldingExampleSlide';
import { FormworkExampleSlide } from './example-slides/FormworkExampleSlide';
import { HighlightsSlide } from './slides/HighlightsSlide';
import { LastPieceSlide } from './slides/LastPieceSlide';
import type { DeckConfig } from '../../../types';

export const deck: DeckConfig = {
  title: 'Merit OI: Process as a Service',
  exportFilename: 'Merit-OI-for-Toolmakers.pdf',
  variantSlots: {
    costStructure: {
      label: 'Cost structure',
      options: [
        { value: 'labour-heavy',       label: 'Labour-heavy contracting (construction, drilling, scaffolding)' },
        { value: 'capital-intensive',  label: 'Capital-intensive equipment (agricultural, HDD, ROV, forestry)' },
      ],
    },
    workedExample: {
      label: 'Worked example',
      options: [
        { value: 'combine',  label: 'Combine harvester (corn harvest, agricultural)' },
        { value: 'sawmill',    label: 'Sawmill (mixed hardwood batch, northern hardwood)' },
        { value: 'harvester', label: 'CTL harvester (clear-cut, loblolly pine)' },
        { value: 'boomlift',     label: 'Articulated boom lift (facade replacement, Chicago)' },
        { value: 'scaffolding', label: 'Tube-and-fitting scaffold (industrial turnaround, Gulf Coast)' },
        { value: 'formwork',    label: 'Heavy metallic formwork (high-rise core wall, Singapore)' },
      ],
    },
  },
  slides: (config: Record<string, string>) => [
    <CoverSlide key="cover" />,
    <DisconnectSlide key="disconnect" />,
    <ProcessAuthoritySlide key="process-authority" />,
    config.costStructure === 'capital-intensive'
      ? <CapitalIntensiveValueCaptureSlide key="value-capture" />
      : <ValueCaptureSlide key="value-capture" />,
    <ProblemSlide key="problem" />,
    <ProcessModelSlide key="process-model" />,
    <LastPieceSlide key="last-piece" />,
    config.workedExample === 'sawmill'   ? <SawmillExampleSlide key="worked-example" />
      : config.workedExample === 'harvester' ? <HarvesterExampleSlide key="worked-example" />
      : config.workedExample === 'boomlift'    ? <BoomLiftExampleSlide key="worked-example" />
      : config.workedExample === 'scaffolding' ? <ScaffoldingExampleSlide key="worked-example" />
: config.workedExample === 'formwork'    ? <FormworkExampleSlide key="worked-example" />
      : <CombineExampleSlide key="worked-example" />,
    <HighlightsSlide key="highlights" />,
  ],
};
