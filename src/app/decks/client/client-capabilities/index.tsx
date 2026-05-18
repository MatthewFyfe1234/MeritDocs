import { CoverSlide } from './slides/CoverSlide';
import { ProblemSlide } from './slides/ProblemSlide';
import { OrganisationSlide } from './slides/OrganisationSlide';
import { ConceptSlide } from '../client-overview/slides/ConceptSlide';
import { SpecificationSlide } from './slides/SpecificationSlide';
import { InventorySlide } from './slides/InventorySlide';
import { ProjectMapSlide } from './slides/ProjectMapSlide';
import { ForecastsSlide } from './slides/ForecastsSlide';
import { MechanicsSlide } from '../client-overview/slides/MechanicsSlide';
import { AdvantageSlide } from './slides/AdvantageSlide';
import { ReferencesSlide } from './slides/ReferencesSlide';

export const deck = {
  title: 'Merit OI: Platform Capabilities',
  exportFilename: 'Merit-OI-Platform-Capabilities.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <ProblemSlide key="problem" />,
    <OrganisationSlide key="organisation" />,
    <ConceptSlide key="concept" />,
    <SpecificationSlide key="specification" />,
    <InventorySlide key="inventory" />,
    <ProjectMapSlide key="project-map" />,
    <ForecastsSlide key="forecasts" />,
    <MechanicsSlide key="mechanics" />,
    <AdvantageSlide key="advantage" />,
    <ReferencesSlide key="references" />,
  ],
};
