import { CoverSlide } from './slides/CoverSlide';
import { DisconnectSlide } from './slides/DisconnectSlide';
import { ProcessAuthoritySlide } from './slides/ProcessAuthoritySlide';
import { OriginGapSlide } from '../OriginGapSlide';
import { ValueCaptureSlide } from './slides/ValueCaptureSlide';
import { CapitalIntensiveValueCaptureSlide } from './slides/CapitalIntensiveValueCaptureSlide';
import { ProblemSlide } from './slides/ProblemSlide';
import { ProcessModelSlide } from './slides/ProcessModelSlide';
import { WorkedExampleSlide } from './slides/WorkedExampleSlide';
import { HighlightsSlide } from './slides/HighlightsSlide';
import { AuditableRecordSlide } from './slides/AuditableRecordSlide';
import { CompetitiveLandscapeSlide } from './slides/CompetitiveLandscapeSlide';
import { LastPieceSlide } from './slides/LastPieceSlide';
import { ReferencesSlide1, ReferencesSlide2 } from './slides/ReferencesSlide';
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
  },
  slides: (config: Record<string, string>) => [
    <CoverSlide key="cover" />,
    <DisconnectSlide key="disconnect" />,
    <ProcessAuthoritySlide key="process-authority" />,
    <OriginGapSlide key="origin-gap" />,
    config.costStructure === 'capital-intensive'
      ? <CapitalIntensiveValueCaptureSlide key="value-capture" />
      : <ValueCaptureSlide key="value-capture" />,
    <ProblemSlide key="problem" />,
    <CompetitiveLandscapeSlide key="competitive-landscape" />,
    <LastPieceSlide key="last-piece" />,
    <ProcessModelSlide key="process-model" />,
    <WorkedExampleSlide key="worked-example" />,
    <AuditableRecordSlide key="auditable-record" />,
    <HighlightsSlide key="highlights" />,
    <ReferencesSlide1 key="references-1" />,
    <ReferencesSlide2 key="references-2" />,
  ],
};
