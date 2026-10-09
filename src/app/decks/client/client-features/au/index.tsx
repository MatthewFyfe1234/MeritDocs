import { CoverSlide } from './slides/CoverSlide';
import { RegulationSlide } from './slides/RegulationSlide';
import { ProjectSlide } from '../slides/ProjectSlide';
import { OrganisationSlide } from '../slides/OrganisationSlide';
import { WorkforceSlide } from '../slides/WorkforceSlide';

const projectNotes: Record<string, string> = {
  'Forecasting (time, carbon, energy)': 'AASB S2: large clients need verified supply chain emissions from their suppliers',
  'Embodied Carbon': 'NABERS: mandatory in NSW; national limits pending',
};

const organisationNotes: Record<string, string> = {
  'People': 'Closing Loopholes Acts (2023-24): auditable delivery records support Fair Work Act obligations around casual conversion, wage decisions, and right to disconnect.',
  'Tools and Materials': 'WHS Act and sustainable procurement requirements: equipment maintenance records and chain of custody for certified materials maintained and auditable per job.',
};

const workforceNotes: Record<string, string> = {
  'Leave': 'Fair Work Act NES: clear records of hours and capacity support casual conversion and right to disconnect obligations.',
  'Training': 'Australian Skills Guarantee (from July 2024): 10% of hours on Commonwealth contracts ($10m+) must be apprentices - Merit tracks certifications and compliance against each person.',
  'Document Management': 'WHS Act 2011 / NSW Section 26A (1 July 2026): Codes of Practice become legally binding - auditable training and procedure records are the compliance mechanism.',
};

export const deck = {
  title: 'Merit: For Manufacturers (AU)',
  exportFilename: 'Merit-For-Manufacturers-AU.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <ProjectSlide key="project" notes={projectNotes} />,
    <OrganisationSlide key="organisation" notes={organisationNotes} />,
    <WorkforceSlide key="workforce" notes={workforceNotes} />,
    <RegulationSlide key="regulation" />,
  ],
};
