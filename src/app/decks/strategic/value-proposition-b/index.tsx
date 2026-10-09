import { CoverSlide } from './slides/CoverSlide';
import { ValuePropositionSlide } from './slides/ValuePropositionSlide';
import { SilosSlide } from './slides/SilosSlide';
import { EcosystemSlide } from './slides/EcosystemSlide';
import { GenericRequirementsSlide } from './slides/GenericRequirementsSlide';
import { PayoffVennSlide } from './slides/PayoffVennSlide';
import { AcademicFieldsSlide } from './slides/AcademicFieldsSlide';
import { BeyondOperationsSlide } from './slides/BeyondOperationsSlide';
import { TechnologiesSlide } from './slides/TechnologiesSlide';
import { IndustriesSlide } from './slides/IndustriesSlide';

export const deck = {
  title: 'MeritOI: Process-Centric Production',
  exportFilename: 'MeritOI-Process-Centric-Production.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <ValuePropositionSlide key="value-proposition" />,
    <SilosSlide key="silos" />,
    <EcosystemSlide key="ecosystem" />,
    <GenericRequirementsSlide key="generic-requirements" />,
    <PayoffVennSlide key="payoff-venn" />,
    <IndustriesSlide key="industries" />,
    <TechnologiesSlide key="technologies" />,
    <BeyondOperationsSlide key="beyond-operations" />,
    <AcademicFieldsSlide key="academic-fields" />,
  ],
};
