import { CoverSlide } from './slides/CoverSlide';
import { OrgansOfProductionSlide } from './slides/OrgansOfProductionSlide';
import { WrongQuestionSlide } from './slides/WrongQuestionSlide';
import { StateAttenuationSlide } from './slides/StateAttenuationSlide';
import { InvisibleProcessSlide } from './slides/InvisibleProcessSlide';
import { BestProcessSlide } from './slides/BestProcessSlide';
import { DeliveryCompositionSlide } from './slides/DeliveryCompositionSlide';
import { MasterProcessSlide } from './slides/MasterProcessSlide';
import { MakingProcessExplicitSlide } from './slides/MakingProcessExplicitSlide';
import { NaturalAuthorsSlide } from './slides/NaturalAuthorsSlide';
import { WhoSetsGoalsSlide } from './slides/WhoSetsGoalsSlide';
import { IncentiveAlignmentSlide } from './slides/IncentiveAlignmentSlide';
import { TelemetrySlide } from './slides/TelemetrySlide';
import { WhatDisappearsSlide } from './slides/WhatDisappearsSlide';
import { EconomicModelSlide } from './slides/EconomicModelSlide';
import { TransitionSlide } from './slides/TransitionSlide';
import { ScaleSlide } from './slides/ScaleSlide';
import { PoliticalQuestionSlide } from './slides/PoliticalQuestionSlide';

export const deck = {
  title: 'Delivery of Desired States',
  exportFilename: 'Delivery-of-Desired-States.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <OrgansOfProductionSlide key="organs-of-production" />,
    <StateAttenuationSlide key="state-attenuation" />,
    <InvisibleProcessSlide key="invisible-process" />,
    <BestProcessSlide key="best-process" />,
    <DeliveryCompositionSlide key="delivery-composition" />,
    <MasterProcessSlide key="master-process" />,
    <MakingProcessExplicitSlide key="making-process-explicit" />,
    <WrongQuestionSlide key="wrong-question" />,
    <NaturalAuthorsSlide key="natural-authors" />,
    <WhoSetsGoalsSlide key="who-sets-goals" />,
    <IncentiveAlignmentSlide key="incentive-alignment" />,
    <TelemetrySlide key="telemetry" />,
    <WhatDisappearsSlide key="what-disappears" />,
    <EconomicModelSlide key="economic-model" />,
    <TransitionSlide key="transition" />,
    <ScaleSlide key="scale" />,
    <PoliticalQuestionSlide key="political-question" />,
  ],
};
