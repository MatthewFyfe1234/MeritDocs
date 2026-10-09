import { CoverSlide } from './slides/CoverSlide';
import { RegulationSlide } from './slides/RegulationSlide';
import { ProjectSlide } from '../slides/ProjectSlide';
import { OrganisationSlide } from '../slides/OrganisationSlide';
import { WorkforceSlide } from '../slides/WorkforceSlide';

const projectNotes: Record<string, string> = {
  'Forecasting (time, carbon, energy)': 'FHS 2026 (England): offsite components on a confirmed trajectory to mandatory carbon limits',
  'Embodied Carbon': 'BSA: component-level material and safety records',
  'Material Orders': 'UKTR: legal timber sourcing documented per order',
};

const organisationNotes: Record<string, string> = {
  'People': 'Employment Rights Act 2025: day-one unfair dismissal rights and guaranteed hours obligations - auditable delivery data as the evidential basis.',
  'Tools and Materials': 'PUWER and public sector timber procurement policy: tool maintenance schedules and chain of custody for certified materials maintained and auditable per job.',
};

const workforceNotes: Record<string, string> = {
  'Leave': 'Employment Rights Act 2025: zero-hours worker protections require clear records of hours and availability against capacity.',
  'Training': 'Growth and Skills Levy (April 2026): 12-month fund expiry - training records evidence levy utilization and workforce development per person.',
  'Document Management': 'Data (Use and Access) Act 2025: automated decision-making transparency from June 2026 - process execution records provide the evidential basis for decisions affecting workers.',
};

export const deck = {
  title: 'Merit: For Manufacturers (UK)',
  exportFilename: 'Merit-For-Manufacturers-UK.pdf',
  slides: [
    <CoverSlide key="cover" />,
    <ProjectSlide key="project" notes={projectNotes} />,
    <OrganisationSlide key="organisation" notes={organisationNotes} />,
    <WorkforceSlide key="workforce" notes={workforceNotes} />,
    <RegulationSlide key="regulation" />,
  ],
};
