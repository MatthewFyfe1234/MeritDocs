
// @mui components
import { Box } from '@mui/system';
import { useTheme } from '@mui/material';

// Components
import ContextSection from './components/ContextSection';
import Intro from './components/Intro';
import SectionContainer from './components/Section';
import ContentFooter from './components/ContentFooter';

// Images
import Context from '/images/teams/Context.webp';
import finance from '/images/teams/Finance.webp';
import humanResources from '/images/teams/HumanResources.webp';
import leadership from '/images/teams/Leadership.webp';
import operations from '/images/teams/Operations.webp';
import projectManagement from '/images/teams/ProjectManagement.webp';
import sales from '/images/teams/Sales.webp';

import teamsHeader from '/images/teams/TeamsHeader.webp';

const sections = [
  {
    id: 'Leadership',
    title: 'Leadership',
    content: [`Leaders need more than surface-level metrics, they need a complete view of how the business runs. Merit brings 
               together execution, performance, and resource data from across the organisation into one unified system, giving 
               leadership teams real-time perspective on the full operational landscape.`,
              `See where progress is accelerating, where friction is forming, and how teams, tools, and processes are contributing 
               to outcomes.`,
              `With Merit, strategic decisions aren’t delayed or made in the dark, they’re grounded in live operational intelligence.`],
    image: leadership
  },
  {
    id: 'Operations',
    title: 'Operations',
    content: [`Operators live at the intersection of structure and execution. Merit gives them a connected system for planning, 
               coordinating, and improving workflows across every function.`,
              `Track work in real time, resolve bottlenecks, and adapt processes as you go, all from a single, structured platform. 
               With execution and insight in one place, operations teams can scale smarter, run leaner, and keep everyone aligned 
               without chasing updates across tools.`],
    image: operations
  },
  {
    id: 'Project Management',
    title: 'Project Management',
    content: [`Project managers keep things moving, but most tools only show part of the picture. Merit connects planning, capacity, and 
               performance in one system, so every project reflects how your organization actually works.`,
              `Automated Gantt charts adapt in real time. Tasks are assigned based on live availability. Past performance informs future 
               planning, with experience tracking and historical data shaping smarter delivery.`,
              `The result? Projects that run smoother, align better, and improve over time.`],
    image: projectManagement
  },
  {
    id: 'Human Resources',
    title: 'Human Resources',
    content: [`Performance shouldn’t be invisible. Merit helps HR teams see contribution clearly,  across teams, roles, and 
               workflows.`,
              `By connecting recognition to real work, it enables fairer reviews, more meaningful rewards, and stronger engagement. 
               No more politics, no more guesswork, just a system where effort is visible, and performance is grounded in merit.`,
              `HR becomes not just a support function, but a driver of culture and accountability.`],
    image: humanResources
  },
  {
    id: 'Sales',
    title: 'Sales',
    content: [`When quoting, planning, and delivery are disconnected, sales gets stuck in the middle.`,
              `Merit integrates sales activity into the broader operational system, so teams can scope accurately, price 
               confidently, and hand over cleanly.`,
              `With live visibility into capacity, costing, and delivery timelines, sales can promise what’s real, and deliver 
               without friction.`],
    image: sales
  },
  {
    id: 'Finance',
    title: 'Finance',
    content: [`Finance leaders need accuracy, not assumptions.`,
              `Merit connects project execution to real-time performance data, giving finance teams live insight into cost, output, 
               and resource utilisation.`,
              `By tying financial outcomes directly to the systems that drive them, Merit helps finance teams monitor ROI, reduce 
               waste, and support decision-making across the business, without waiting for end-of-month reconciliation.`],
    image: finance
  }
  // {
  //   id: 'Domain Skills',
  //   title: 'Domain Skills',
  //   content: [`Every role has unique skills that drive performance. Merit helps teams map, track, and develop these skills in the 
  //              context of real work.`,
  //             `By connecting domain expertise to workflows, it enables smarter resource allocation, clearer accountability, and 
  //              continuous improvement across every function.`,
  //             `Whether it’s technical skills, process knowledge, or operational insight, Merit makes sure the right expertise is always 
  //              visible and valued.`],
  //   image: leadership
  // }
];

const Roles = ({ setRequestADemoOpen }) => {
  const theme = useTheme();
  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      <Intro
        title="Built for Every Role"
        content={[`Merit brings structure, visibility, and clarity to your entire teams. From strategy to execution, it 
                   helps leaders, operators, and contributors work with confidence,  aligning processes, tracking performance, and 
                   turning activity into measurable impact.`,
                  `See how Merit can support smarter work across your organization.`]}
        backgroundImage={teamsHeader}/>
      <ContextSection
        id="Skill Allocation"
        title="Put Skills to Work Where They Matter Most"
        content={[`Every function relies on specific expertise,  but too often, those skills are siloed or invisible.`,
                  `Merit brings domain knowledge into focus by mapping skills directly to workflows, roles, and outcomes. This makes 
                   it easy to assign the right people to the right work, track performance by expertise, and continuously develop the 
                   capabilities that drive results. Because when skill is visible, it becomes actionable,  and that’s where teams 
                   thrive.`]}
        image={
          <Box
            component="img"
            src={Context}
            alt="From Compliance to Competitive Advantage"
            sx={{
              width: '45%',
              objectFit: 'contain',
              filter: 'brightness(0) saturate(100%)', // black
              opacity: 0.08,
              background: 'transparent',
              mixBlendMode: 'multiply'
            }}/>
        }
        hasGap/>
      <SectionContainer sections={sections} hasGap/>
      <ContentFooter setRequestADemoOpen={setRequestADemoOpen}/>
    </Box>
  );
}

export default Roles;
