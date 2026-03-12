import { ReferencesSlide as SharedReferencesSlide, Ref } from '@/components/slides/ReferencesSlide';

const refs: Ref[] = [
  {
    num: 1,
    publisher: 'Berghahn Journals: Democratic Theory',
    title: 'Worker Cooperatives for a Democratic Economy: degeneration thesis, constitutional drift, and the scaling limits of democratic governance',
    url: 'berghahnjournals.com/view/journals/democratic-theory/11/1/dt110102.xml',
    href: 'https://www.berghahnjournals.com/view/journals/democratic-theory/11/1/dt110102.xml',
    supports: 'Cooperatives that reach scale consistently drift toward managerial concentration; democratic participation declines as cognitive burden grows; degeneration is constitutional, organisational, and cultural',
  },
  {
    num: 2,
    publisher: 'EHU / Campus Magazine',
    title: 'Human resources policies influenced the failure of Fagor Electrodomésticos: absenteeism, disengagement, and the reverse dominance hierarchy',
    url: 'ehu.eus/en/web/campusa-magazine/-/human-resources-policies-influenced-the-failure-of-fagor-electrodomesticos',
    href: 'https://www.ehu.eus/en/web/campusa-magazine/-/human-resources-policies-influenced-the-failure-of-fagor-electrodomesticos',
    supports: 'Fagor absenteeism rose from 4% to 8% above the industry average; Taylorist production undermined cooperative identity; weak leadership emerged from social council pressure; $1.5B debt at collapse',
  },
  {
    num: 3,
    publisher: 'WiFiTalents / KPMG Global Construction Survey (2024)',
    title: 'Project Cost Overrun Statistics 2026 and Global Construction Benchmarks: budget overrun, schedule performance, rework data',
    url: 'wifitalents.com/project-cost-overrun-statistics/',
    href: 'https://wifitalents.com/project-cost-overrun-statistics/',
    supports: '85% of construction projects fail to stay within budget; only 25% of projects meet original schedule; 52% of rework caused by poor data and miscommunication',
  },
  {
    num: 4,
    publisher: 'AgEcon Search',
    title: 'Investment Constraints in Agricultural Cooperatives: capital constraint hypothesis, horizon problem, portfolio problem, and transferability barrier',
    url: 'ageconsearch.umn.edu/record/143259/files/105.pdf',
    href: 'https://ageconsearch.umn.edu/record/143259/files/105.pdf',
    supports: 'Horizon problem: members underinvest in long-term projects they will not see returns on; portfolio problem: wealth concentration in one firm drives conservative strategy; surplus distribution disputes accelerate both',
  },
  {
    num: 5,
    publisher: 'MDPI Buildings',
    title: 'Bridging the Construction Productivity Gap: 10% vs 50%+ productivity divergence over two decades',
    url: 'mdpi.com/2075-5309/15/16/2899',
    href: 'https://www.mdpi.com/2075-5309/15/16/2899',
    supports: 'Construction productivity grew only 10% in 20 years against 50%+ for the global economy; fragmented tools and coordination failure are primary contributors',
  },
  {
    num: 6,
    publisher: 'ResearchGate: DAO Governance: Voting Power, Participation, and Controversy',
    title: 'Empirical analysis of governance participation rates in decentralised and cooperative organisations',
    url: 'researchgate.net/publication/397728414_DAO_Governance_Voting_Power_Participation_and_Controversy',
    href: 'https://www.researchgate.net/publication/397728414_DAO_Governance_Voting_Power_Participation_and_Controversy_-_A_Review_and_an_Empirical_Analysis',
    supports: 'Participation rates in collective governance typically 1–10% once organisations scale; excessive direct democracy imposes a participation tax that most members stop paying',
  },
];

export function ReferencesSlide() {
  return (
    <SharedReferencesSlide
      refs={refs}
      subtitle="All statistics cited in this presentation. Numbers correspond to superscripts throughout the deck. Sources accessed February–March 2026."
    />
  );
}
