import { CoverSlide } from './slides/CoverSlide';
import { InformationGapSlide } from './slides/InformationGapSlide';
import { DegenerationSlide } from './slides/DegenerationSlide';
import { BuyerPersonasSlide } from './slides/BuyerPersonasSlide';
import { GroundTruthSlide } from './slides/GroundTruthSlide';
import { BeforeAfterSlide } from './slides/BeforeAfterSlide';
import { MechanicsSlide } from './slides/MechanicsSlide';
import { ValuePropositionSlide } from './slides/ValuePropositionSlide';
import { ReferencesSlide } from './slides/ReferencesSlide';

export const deck = {
  title: 'Merit OI: Worker Cooperatives',
  exportFilename: 'Merit-OI-Worker-Cooperative.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <DegenerationSlide key="degeneration" />,
    <InformationGapSlide key="information-gap" />,
    <BuyerPersonasSlide key="buyer-personas" />,
    <GroundTruthSlide key="ground-truth" />,
    <BeforeAfterSlide key="before-after" />,
    <MechanicsSlide key="mechanics" />,
    <ValuePropositionSlide key="value-proposition" />,
    <ReferencesSlide key="references" />,
  ],
};
