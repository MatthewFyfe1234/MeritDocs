
// @mui components
import { Box } from '@mui/system';
import { useTheme } from '@mui/material';

// Components
import Intro from './components/Intro';
import SectionContainer from './components/Section';
import ContentFooter from './components/ContentFooter';

// Images
import construction from '/images/industries/Construction.webp';
import manufacturing from '/images/industries/Manufacturing.webp';
import Healthcare from '/images/industries/Healthcare.webp';
import DisasterManagement from '/images/industries/DisasterManagement.webp';
import ProfessionalServices from '/images/industries/ProfessionalServices.webp';
import Mining from '/images/industries/Mining.webp';
import Agriculture from '/images/industries/Agriculture.webp';
import PublicSector from '/images/industries/PublicSector.webp';
import SupplyChain from '/images/industries/SupplyChain.webp';

import useCasesHeader from '/images/industries/UseCasesHeader.webp';

const sections = [
  {
    id: 'Manufacturing',
    title: 'Manufacturing',
    content: [`Complex processes, fragmented tools, and resource-heavy operations make visibility and coordination a daily challenge 
               in manufacturing.`,
              `Merit unifies people, materials, and workflows into one operational system giving manufacturers real-time insight into 
               process health, resource usage, and delivery performance.`,
              `From shop floor to supply chain, track every action, reveal every bottleneck, and measure every improvement in a single 
               platform. With Merit, manufacturing teams can endlessly optimise systems and align performance to both strategic goals 
               and frontline work.`],
    image: manufacturing
  },
  {
    id: 'Construction',
    title: 'Construction',
    content: [`Possibly the most complex product delivery ecosystem there is bringing together vast arrays of materials, regulations, 
               skills and environments. Yet most firms still operate with fragmented tools and disconnected workflows, making coordination 
               and visibility a constant challenge.`,
              `Merit provides a live system for planning, tracking, and improving execution across the entire project lifecycle. From 
               pre-construction coordination to on-site delivery, teams can align roles, workflows, and schedules in one platform, with 
               embedded documentation, costing, and progress tracking.`,
              `By linking planning with performance in real time, Merit helps construction firms reduce rework, control costs, and 
               deliver more predictably, even as projects evolve.`],
    image: construction
  },
  {
    id: 'Healthcare',
    title: 'Healthcare',
    content: [`Patient outcomes depend on countless nuanced factors - from complex comorbidities to social determinants - yet most 
               healthcare systems struggle to connect these patient conditions to care delivery and results in meaningful ways.`,
              `Merit captures the full complexity of patient profiles and tracks how specific conditions interact with care processes, 
               providers, and outcomes. Instead of reducing patients to basic metrics, our platform models the nuanced realities that 
               actually drive healthcare delivery.`,
              `Healthcare teams can finally see which care approaches work best for specific patient populations, understand how 
               provider actions connect to outcomes, and build systematic organizational learning from clinical experience. By linking 
               patient complexity to resource allocation and care delivery, Merit transforms institutional knowledge from intuition 
               into actionable intelligence.`,
              `The result: more personalized care decisions, better resource utilization, and continuous improvement based on what 
               actually works for your patient populations.`],
    image: Healthcare
  },
  // {
  //   id: 'Logistics and Supply Chain',
  //   title: 'Logistics and Supply Chain',
  //   content: [`When speed meets complexity, disconnected tools lead to delays, blind spots, and inefficiency.`,
  //             `Merit connects operational flow across inventory, fulfillment, and delivery, providing a real-time system for 
  //              tracking resources, managing workflows, and optimizing handoffs.`,
  //             `With performance data embedded into every step, teams can respond faster, plan smarter, and resolve issues before 
  //              they become disruptions. The result is a logistics engine that’s transparent, adaptive, and aligned from supplier 
  //              to customer.`],
  //   image: SupplyChain
  // },
  {
    id: 'Disaster Management',
    title: 'Disaster Management',
    content: [`In crisis situations, every second counts. Yet most emergency response systems rely on fragmented tools and manual 
               processes, leaving teams without real-time visibility when it matters most.`,
              `Merit provides a unified platform that enables immediate coordination of resources, tracks all response actions, and 
               manages workflows during emergencies. Every responder, asset, and task becomes visible in one system.`,
              `With complete situational awareness in one system, commanders can deploy the right teams faster, adjust tactics as
               conditions change, and validate what's working mid-crisis. Every asset, from bulldozers to field medics, becomes part
               of an intelligent response network.`,
              `Post-incident, Merit turns experience into institutional knowledge. Agencies analyze which strategies worked for
               specific disaster profiles, strengthen partnerships with asset managers, and build response systems that improve with
               every emergency.`],
    image: DisasterManagement
  },
  {
    id: 'Mining and Resources',
    title: 'Mining and Resources',
    content: [`Mining sites face complex operational challenges where safety and compliance are non-negotiable. Yet many mining teams
               rely on siloed data and outdated document processes, increasing risks and slowing decision-making.`,
              `Merit delivers a unified platform with rich analytics that provide deep insights into every aspect of mining operations. 
               Coupled with a powerful document control system, it ensures critical health and safety protocols are always current, 
               accessible, and adhered to.`,
              `By integrating real-time data and comprehensive documentation, Merit enables site managers to proactively identify 
               hazards, mitigate risks, and maintain regulatory compliance. This leads to safer working environments and minimizes 
               downtime caused by incidents and machinery stoppages.`,
              `Over time, Merit transforms operational data and documented learnings into actionable intelligence, helping mining 
               companies continuously improve safety standards, optimize workflows, and protect their most valuable asset—their 
               workforce.`],
    image: Mining
  },
  {
    id: 'Agriculture',
    title: 'Agriculture',
    content: [`Agriculture involves managing diverse resources—people, machinery, and materials—across dynamic and often unpredictable 
               environments. Yet many farms rely on disconnected systems that hinder coordination and data-driven decisions.`,
              `Merit brings together all stakeholders, tools, and inputs into a unified platform, providing a holistic view of the 
               entire agricultural operation. This integration enables seamless collaboration, real-time insights, and smarter process 
               optimization.`,
              `By enabling cross-industry leveraging of data, from soil conditions to machinery performance and weather patterns—Merit 
               empowers farmers to make informed decisions that enhance productivity, improve sustainability, and reduce risks.`,
              `With a comprehensive and connected system, agricultural teams can streamline workflows, respond swiftly to changing 
               conditions, and continuously improve outcomes across crops, livestock, and resource management.`],
    image: Agriculture
  },
  {
    id: 'Public Infrastructure',
    title: 'Public Infrastructure',
    content: [`Government infrastructure projects involve complex coordination of contractors, materials, regulatory processes, and 
               multi-year timelines - all under intense public scrutiny and accountability requirements.`,
              `Merit provides unified visibility across infrastructure delivery, from initial planning through completion. Whether 
               building roads, schools, utilities, or public facilities, agencies can track how people, processes, and resources flow 
               together to deliver critical public infrastructure.`,
              `With every contractor action, material delivery, and process milestone visible in one platform, government teams gain 
               the transparency needed for public accountability while maintaining operational control over complex, multi-stakeholder 
               projects.`,
              `Merit enables government agencies to deliver infrastructure more efficiently, demonstrate responsible stewardship of 
               public resources, and build systematic improvement into every project - regardless of the type of infrastructure being 
               delivered.`],
    image: PublicSector
  },
  {
    id: 'Consulting/Professional Services',
    title: 'Consulting / Professional Services',
    content: [`Every organization, regardless of industry, fundamentally employs processes, people, and inventory to deliver products. 
               Merit embodies this universal truth, normalizing all delivery into these core operational flows.`,
              `For professional services firms, this means true operational fluency across domains. Whether you're working with 
               healthcare systems, manufacturing plants, or financial institutions, Merit provides the same framework because you're 
               always dealing with the same fundamental organizational building blocks - just configured differently.`,
              `This eliminates the typical learning curve of understanding industry-specific nuances and terminologies. Consultants 
               can move seamlessly between client contexts because Merit abstracts away domain complexity, letting you focus on 
               optimizing the underlying operational mechanics that are consistent across all organizations.`,
              `From client scoping to execution tracking, Merit enables professional services firms to operate with the same 
               efficiency and expertise across every engagement, regardless of the client's industry or domain.`],
    image: ProfessionalServices
  }
];

const UseCases = ({ setRequestADemoOpen }) => {
  const theme = useTheme();
  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      <Intro
        id="Use Cases Intro"
        title="Where Merit Delivers"
        content={[`Every organisation is different. But the value of being able to unite around a shared perspective is universal.`,
                  `Merit is designed to adapt to complex ecosystems, bringing visibility, alignment, and insight to industries where 
                   outcomes depend on coordination, accuracy, and performance at scale.`,
                  `Explore how Merit supports smarter systems of work across key industries.`]}
        backgroundImage={useCasesHeader}/>
      <SectionContainer sections={sections} hasGap/>
      <ContentFooter setRequestADemoOpen={setRequestADemoOpen}/>
    </Box>
  );
}

export default UseCases;