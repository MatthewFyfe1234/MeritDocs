import { CoverSlide } from './slides/CoverSlide';
import { ConglomerateProblemSlide } from './slides/ConglomerateProblemSlide';
import { ShiftInPerspectiveSlide } from './slides/ShiftInPerspectiveSlide';
import { SiloingSlide } from './slides/SiloingSlide';
import { ResolutionSlide } from './slides/ResolutionSlide';
import { BenefitsSlide } from './slides/BenefitsSlide';
import { ValuePropositionSlide } from './slides/ValuePropositionSlide';
import { AcademicFieldsSlide } from './slides/AcademicFieldsSlide';
import { BeyondOperationsSlide } from './slides/BeyondOperationsSlide';
import { TechnologiesSlide } from './slides/TechnologiesSlide';
import { NeuralNetworkProblemsSlide } from './slides/NeuralNetworkProblemsSlide';
import { IndustriesSlide } from './slides/IndustriesSlide';

export const deck = {
  title: 'MeritOI: Value Proposition',
  exportFilename: 'MeritOI-Value-Proposition.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <ConglomerateProblemSlide key="conglomerate-problem" />,
    <ShiftInPerspectiveSlide key="shift-in-perspective" />,
    <SiloingSlide key="siloing" />,
    <BenefitsSlide key="benefits" />,
    <ResolutionSlide key="resolution" />,
    <ValuePropositionSlide key="value-proposition" />,
    <TechnologiesSlide key="technologies" />,
    <NeuralNetworkProblemsSlide key="neural-network-problems" />,
    <BeyondOperationsSlide key="beyond-operations" />,
    <IndustriesSlide key="industries" />,
    <AcademicFieldsSlide key="academic-fields" />,
  ],
};
