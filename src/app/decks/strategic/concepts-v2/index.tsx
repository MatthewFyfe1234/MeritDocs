import { CoverSlide } from './slides/CoverSlide';
import { ConglomerateProblemSlide } from './slides/ConglomerateProblemSlide';
import { ShiftInPerspectiveSlide } from './slides/ShiftInPerspectiveSlide';
import { AbstractionFoundationSlide } from './slides/AbstractionFoundationSlide';
import { MeasurementFoundationSlide } from './slides/MeasurementFoundationSlide';
import { JobProcessSlide } from './slides/JobProcessSlide';
import { ScaleSlide } from './slides/ScaleSlide';
import { StepDeliverySlide } from './slides/StepDeliverySlide';
import { GenericRequirementsSlide } from './slides/GenericRequirementsSlide';
import { ExecutionDataSlide } from './slides/ExecutionDataSlide';
import { ImplicationsSlide } from './slides/ImplicationsSlide';
import { PayoffSlide } from './slides/PayoffSlide';
import { GeneralisationSlide } from './slides/GeneralisationSlide';

export const deck = {
  title: 'Concepts v2',
  exportFilename: 'Concepts-v2.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <ConglomerateProblemSlide key="conglomerate-problem" />,
    <ShiftInPerspectiveSlide key="shift-in-perspective" />,
    <AbstractionFoundationSlide key="abstraction-foundation" />,
    <MeasurementFoundationSlide key="measurement-foundation" />,
    <JobProcessSlide key="job-process" />,
    <ScaleSlide key="scale" />,
    <StepDeliverySlide key="step-delivery" />,
    <ExecutionDataSlide key="execution-data" />,
    <ImplicationsSlide key="implications" />,
    <GenericRequirementsSlide key="generic-requirements" />,
    <PayoffSlide key="payoff" />,
    <GeneralisationSlide key="generalisation" />,
  ],
};
