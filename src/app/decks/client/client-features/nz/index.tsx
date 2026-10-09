import { CoverSlide } from './slides/CoverSlide';
import { RegulationSlide } from './slides/RegulationSlide';
import { ProjectSlide } from '../slides/ProjectSlide';
import { OrganisationSlide } from '../slides/OrganisationSlide';
import { WorkforceSlide } from '../slides/WorkforceSlide';

const projectNotes: Record<string, string> = {
  'Forecasting (time, carbon, energy)': 'ETS: model the carbon cost of a job before pricing it',
  'Embodied Carbon': "CRD: your customers' carbon reporting chain",
};

const organisationNotes: Record<string, string> = {
  'People': 'ERA good faith obligations require an objective basis for pay and performance decisions. Delivery data is that basis.',
  'Tools and Materials': 'HSWA and FSC/PEFC procurement requirements: tool maintenance records and chain of custody documentation for certified materials maintained and auditable per job.',
};

const workforceNotes: Record<string, string> = {
  'Leave': 'Employment Leave Bill (introduced 2026): proposes hours-based accrual. Leave management accommodates this requirement without structural change.',
  'Training': 'Identifies where people need support - creating a record of development, not a case for dismissal. Directly supports ERA good faith obligations around performance management.',
  'Document Management': 'HSWA Amendment Act (expected Nov 2026): critical risk governance requires auditable records of training, certification, and safety procedures for scheduled hazards.',
};

export const deck = {
  title: 'Merit: For Manufacturers (NZ)',
  exportFilename: 'Merit-For-Manufacturers-NZ.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <ProjectSlide key="project" notes={projectNotes} />,
    <OrganisationSlide key="organisation" notes={organisationNotes} />,
    <WorkforceSlide key="workforce" notes={workforceNotes} />,
    <RegulationSlide key="regulation" />,
  ],
};
