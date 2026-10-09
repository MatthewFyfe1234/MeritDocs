import { CoverSlide } from './slides/CoverSlide';
import { RegulationSlide } from './slides/RegulationSlide';
import { ProjectSlide } from '../slides/ProjectSlide';
import { OrganisationSlide } from '../slides/OrganisationSlide';
import { WorkforceSlide } from '../slides/WorkforceSlide';

const projectNotes: Record<string, string> = {
  'Forecasting (time, carbon, energy)': 'CSRD: large clients need verified supply chain emissions from Irish suppliers',
  'Embodied Carbon': 'Whole Life-Cycle GHG: mandatory from June 2026',
  'Material Orders': 'EUDR Dec 2026: timber CoC through supplier documentation',
};

const organisationNotes: Record<string, string> = {
  'People': 'Irish employment law 2026: NMW rises to €14.15, auto-enrolment pension launched, EU Pay Transparency Directive transposing by June 2026 - auditable hours and pay records as the objective basis.',
  'Tools and Materials': 'SHWWA 2005 and Green Public Procurement: equipment maintenance records and chain of custody for EUDR-compliant and CE-marked materials maintained and auditable per job.',
};

const workforceNotes: Record<string, string> = {
  'Leave': 'Sick Leave Act 2022: 5 days statutory paid sick leave - planned increases to 7 then 10 days both paused April 2025 - leave managed against capacity.',
  'Training': 'SOLAS FET Strategy 2026-2030: Skills to Advance and Careers in Construction programmes provide state-funded upskilling - training records evidence participation and certification per person.',
  'Document Management': 'CPR (EU) 2024/3110 (in force January 2026, phased): EPDs will be required in Declarations of Performance once product-specific harmonised standards are adopted - material records and document management provide the data structure ahead of those obligations.',
};

export const deck = {
  title: 'Merit: For Manufacturers (IE)',
  exportFilename: 'Merit-For-Manufacturers-IE.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <ProjectSlide key="project" notes={projectNotes} />,
    <OrganisationSlide key="organisation" notes={organisationNotes} />,
    <WorkforceSlide key="workforce" notes={workforceNotes} />,
    <RegulationSlide key="regulation" />,
  ],
};
