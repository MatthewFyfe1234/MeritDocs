import { GraphSlide } from './slides/GraphSlide';
import { DataStructureSlide } from './slides/DataStructureSlide';
import { GeneralFormSlide } from './slides/GeneralFormSlide';
import { LocalContributionSlide } from './slides/LocalContributionSlide';
import { PositionSlide } from './slides/PositionSlide';
import { PositioningSlide } from './slides/PositioningSlide';
import { ReferencesSlide } from './slides/ReferencesSlide';

export const deck = {
  title: 'The Process Network',
  exportFilename: 'Process-Network.pdf',
  slides: [
    <GraphSlide key="graph" />,
    <DataStructureSlide key="data-structure" />,
    <GeneralFormSlide key="general-form" />,
    <LocalContributionSlide key="local-contribution" />,
    <PositionSlide key="position" />,
    <PositioningSlide key="positioning" />,
    <ReferencesSlide key="references" />,
  ],
};
