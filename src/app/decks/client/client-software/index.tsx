import { CoverSlide } from './slides/CoverSlide';
import { DisconnectSlide } from './slides/DisconnectSlide';
import { ProcessAuthoritySlide } from '../client-toolmaker/slides/ProcessAuthoritySlide';
import { ValueCaptureSlide } from './slides/ValueCaptureSlide';
import { SoftwarePlusProductValueCaptureSlide } from './slides/SoftwarePlusProductValueCaptureSlide';
import { ProblemSlide } from './slides/ProblemSlide';
import { LastPieceSlide } from './slides/LastPieceSlide';
import { ProcessModelSlide } from './slides/ProcessModelSlide';
import { RoofTrussExampleSlide } from './example-slides/RoofTrussExampleSlide';
import { SteelFrameExampleSlide } from './example-slides/SteelFrameExampleSlide';
import { HighlightsSlide } from './slides/HighlightsSlide';
import type { DeckConfig } from '../../../types';

export const deck: DeckConfig = {
  title: 'Merit OI: Process as a Service (Software)',
  exportFilename: 'Merit-OI-for-Engineering-Software.pdf',
  variantSlots: {
    softwareModel: {
      label: 'Software model',
      options: [
        { value: 'software-only',        label: 'Standalone design software (paid product - Vertex, SEMA, Cadwork)' },
        { value: 'software-plus-product', label: 'Software + physical components (bundled - MiTek, Simpson, Boise Cascade)' },
      ],
    },
    workedExample: {
      label: 'Worked example',
      options: [
        { value: 'rooftruss',   label: 'Roof truss fabrication (housing development, North Carolina)' },
        { value: 'steelframe', label: 'Commercial steel frame (4-storey, mixed sections)' },
      ],
    },
  },
  slides: (config: Record<string, string>) => [
    <CoverSlide key="cover" />,
    <DisconnectSlide key="disconnect" />,
    <ProcessAuthoritySlide key="process-authority" />,
    config.softwareModel === 'software-plus-product'
      ? <SoftwarePlusProductValueCaptureSlide key="value-capture" />
      : <ValueCaptureSlide key="value-capture" />,
    <LastPieceSlide key="last-piece" />,
    <ProcessModelSlide key="process-model" />,
    <ProblemSlide key="problem" />,
    config.workedExample === 'steelframe'
      ? <SteelFrameExampleSlide key="worked-example" />
      : <RoofTrussExampleSlide key="worked-example" />,
    <HighlightsSlide key="highlights" />,
  ],
};
