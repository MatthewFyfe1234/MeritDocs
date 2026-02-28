
// @mui components
import { Box } from '@mui/system';
import { useTheme } from '@mui/material';

// Components
import Intro from './components/Intro';
import SectionContainer from './components/Section';
import ContentFooter from './components/ContentFooter';

// Images
import businessIntelligence from '/images/capabilities/BusinessIntelligence.webp';
import cPQ from '/images/capabilities/CPQ.webp';
import documentManagment from '/images/capabilities/DocumentManagement.webp';
import hRRecognition from '/images/capabilities/HRRecognition.webp';
import processMapping from '/images/capabilities/ProcessMapping.webp';
import projectManagement from '/images/capabilities/ProjectManagement.webp';
import resourcePlanning from '/images/capabilities/ResourcePlanning.webp';

import CapabilitiesHeader from '/images/capabilities/CapabilitiesHeader.webp';

const sections = [
  {
    id: 'Business Intelligence',
    title: 'Business Intelligence',
    content: [`Merit doesn’t sit on top of your data. It works inside the flow of execution, capturing intelligence that fuels
               performance.`,
              `By connecting activity to outcomes, Merit turns fragmented reports into process-integrated business intelligence.
               See who contributed, where effort landed, and how performance trends across systems, people, and workflows.`,
              `With visibility at the source, business intelligence drives excellence, not just reflection.`],
    image: businessIntelligence
  },
  {
    id: 'Process Mapping',
    title: 'Process Mapping',
    content: [`Merit gives you the tools to model your whole product delivery eco-system, connecting organisations, jobs and processes
               into one clear operational blueprint. Unlike static maps, these maps are live, layered with execution data, and
               zoomable for more or less detail.`,
              `Processes aren’t just documented, they’re integrated into how people work. That means you can adapt faster,
               track outcomes, and design smarter systems with confidence.`],
    image: processMapping
  },
  {
    id: 'Project Management',
    title: 'Project Management',
    content: [`From idea to outcome, Merit unifies the project lifecycle across departments, contributors, and systems. Plan tasks with
               full process context, assign work based on capacity, and measure progress in real time.`,
              `Because it’s connected to the rest of the platform, project delivery is never isolated, it’s part of the bigger operational
               picture. That makes collaboration clearer, resource usage smarter, and execution more reliable.`],
    image: projectManagement
  },
  {
    id: 'Document Management',
    title: 'Document Management',
    content: [`Merit connects documentation directly to the work it supports, whether it’s project plans, compliance docs, process
               templates, or reference materials. No more disconnected folders or lost context.`,
              `Files live where decisions are made, outcomes are tracked, and collaboration happens. That means less duplication, fewer
               delays, and documentation that finally moves with your work.`],
    image: documentManagment
  },
  {
    id: 'CPQ',
    title: 'CPQ (Configure, Price, Quote)',
    content: [`Merit brings pricing and configuration into the same system as your operations, so quotes reflect not just product, but
               process, delivery, and resourcing.`,
              `With process-linked pricing logic and reliable data from your workflows, CPQ becomes a tool for operational truth.`,
              `Sales stays in sync with delivery, and the customer gets a quote that reflects what’s actually possible, without the
               back-and-forth.`],
    image: cPQ
  },
  {
    id: 'HR/Recognition',
    title: 'HR/Recognition',
    content: [`Merit makes it easy to see who’s contributing, how, and where their work creates impact. By embedding performance visibility
               into the flow of work, recognition becomes earned, not political.`,
              `Whether it's cross-functional collaboration or individual accountability, individuals are recogised based on what actually
               drives progress. The result: a system where effort is visible, contribution is valued, and culture is built on fairness and
               shared purpose.`],
    image: hRRecognition
  },
  {
    id: 'Resource Planning',
    title: 'Resource Planning',
    content: [`Merit connects peoples’ skills, experience, schedules, and deliverables in one structured view, so you always know who’s
               doing what, and who is most suitable to take on a project, or carry out a task.`,
              `Because resourcing is linked to workflows, you can forecast needs, balance workloads, and align teams with strategic
               outcomes in real time. That means fewer delays, better decisions, and higher performance across the board.`],
    image: resourcePlanning
  }
];

const Capabilities = ({ setRequestADemoOpen }) => {
  const theme = useTheme();
  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      <Intro
        title="A Unified System for Operational Intelligence"
        content={["One system. Total visibility. Endless improvement."]}
        backgroundImage={CapabilitiesHeader}/>
      <SectionContainer
        sections={sections}
        imageUnderclip={-4}
        objectFit="contain"/>
      <ContentFooter setRequestADemoOpen={setRequestADemoOpen}/>
    </Box>
  );
}

export default Capabilities;