import { CoverSlide } from './slides/CoverSlide';
import { ScopeSlide } from './slides/ScopeSlide';
import { WhyLieSlide } from './slides/WhyLieSlide';
import { AttributionSlide } from './slides/AttributionSlide';
import { IncentiveSlide } from './slides/IncentiveSlide';
import { PreferenceScaleSlide } from './slides/PreferenceScaleSlide';
import { PivotSlide } from './slides/PivotSlide';
import { GamingSlide } from './slides/GamingSlide';
import { IndivisibleEventSlide } from './slides/IndivisibleEventSlide';
import { BoundarySlide } from './slides/BoundarySlide';
import { CloseSlide } from './slides/CloseSlide';

export const deck = {
  title: 'The End of the Game',
  exportFilename: 'The-End-of-the-Game.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <ScopeSlide key="scope" />,
    <WhyLieSlide key="why-lie" />,
    <AttributionSlide key="attribution" />,
    <IncentiveSlide key="incentive" />,
    <PreferenceScaleSlide key="preference-scale" />,
    <PivotSlide key="pivot" />,
    <GamingSlide key="gaming" />,
    <IndivisibleEventSlide key="indivisible-event" />,
    <BoundarySlide key="boundary" />,
    <CloseSlide key="close" />,
  ],
};
