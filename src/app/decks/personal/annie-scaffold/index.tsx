import { OverviewSlide } from './slides/OverviewSlide';
import { SystemSlide } from './slides/SystemSlide';
import { SpectrumSlide } from './slides/SpectrumSlide';
import { SequencingSlide } from './slides/SequencingSlide';

// Vector-borne has 11 candidates, too many for one readable table
const vectorChronic = ['borrelia', 'miyamotoi', 'babesia', 'bartonella', 'anaplasma', 'ehrlichia'];
const vectorOther = ['rickettsia', 'tularemia', 'powassan', 'tbe', 'plasmodium'];

export const deck = {
  title: 'Annie: Strategy Scaffold',
  exportFilename: 'Annie-Strategy-Scaffold.pdf',
  slides: [
    <OverviewSlide key="overview" />,
    <SystemSlide key="vector-1" system="vector" ids={vectorChronic} part="1 of 2" />,
    <SystemSlide key="vector-2" system="vector" ids={vectorOther} part="2 of 2" />,
    <SystemSlide key="gut" system="gut" />,
    <SystemSlide key="intracellular" system="intracellular" />,
    <SystemSlide key="viral" system="viral" />,
    <SystemSlide key="immune" system="immune" />,
    <SystemSlide key="endocrine" system="endocrine" />,
    <SystemSlide key="nervous" system="nervous" />,
    <SpectrumSlide key="spectrum" />,
    <SequencingSlide key="sequencing" />,
  ],
};
