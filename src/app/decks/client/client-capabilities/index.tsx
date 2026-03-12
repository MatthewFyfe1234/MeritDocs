import { CoverSlide } from './slides/CoverSlide';
import { ProblemSlide } from './slides/ProblemSlide';
import { OrganisationSlide } from '../client-overview/slides/OrganisationSlide';
import { ConceptSlide } from '../client-overview/slides/ConceptSlide';
import { SpecificationSlide } from './slides/SpecificationSlide';
import { InventorySlide } from './slides/InventorySlide';
import { ProjectMapSlide } from './slides/ProjectMapSlide';
import { ForecastsSlide } from './slides/PredictionsSlide';
import { ExecutionSlide } from '../client-overview/slides/ExecutionSlide';
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
    <ExecutionSlide key="execution" />,
    <AdvantageSlide key="advantage" />,
    <ReferencesSlide key="references" />,
  ],
};
