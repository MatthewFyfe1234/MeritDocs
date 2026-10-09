import { CoverSlide } from './slides/CoverSlide';
import { ComponentsSlide } from './slides/ComponentsSlide';
import { SpecificationsSlide } from './slides/SpecificationsSlide';
import { StepInputsSlide } from './slides/StepInputsSlide';
import { ForecastingSlide } from './slides/ForecastingSlide';
import { ExecutionRefinesForecastSlide } from './slides/ExecutionRefinesForecastSlide';

export const deck = {
  title: 'Concepts',
  exportFilename: 'Concepts.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <ComponentsSlide key="components" />,
    <SpecificationsSlide key="specifications" />,
    <StepInputsSlide key="step-inputs" />,
    <ForecastingSlide key="forecasting" />,
    <ExecutionRefinesForecastSlide key="execution-refines-forecast" />,
  ],
};
