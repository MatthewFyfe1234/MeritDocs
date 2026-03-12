import { CoverSlide } from './slides/CoverSlide';
import { WorkflowSlide } from './slides/WorkflowSlide';
import { BuyerPersonasSlide } from './slides/BuyerPersonasSlide';
import { GroundTruthSlide } from './slides/GroundTruthSlide';
import { BeforeAfterSlide } from './slides/BeforeAfterSlide';
import { ValuePropositionSlide } from './slides/ValuePropositionSlide';
import { ReferencesSlide } from './slides/ReferencesSlide';

export const deck = {
  title: 'Merit OI: General Contractor',
  exportFilename: 'Merit-OI-General-Contractor.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <WorkflowSlide key="workflow" />,
    <BuyerPersonasSlide key="buyer-personas" />,
    <GroundTruthSlide key="ground-truth" />,
    <BeforeAfterSlide key="before-after" />,
    <ValuePropositionSlide key="value-proposition" />,
    <ReferencesSlide key="references" />,
  ],
};
