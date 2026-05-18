import { ReferencesSlide as SharedReferencesSlide, Ref } from '@/components/slides/ReferencesSlide';

const refs: Ref[] = [
  {
    num: 1,
    publisher: 'ILO',
    title: 'Construction: a hazardous work',
    url: 'ilo.org/resource/construction-hazardous-work',
    href: 'https://www.ilo.org/resource/construction-hazardous-work',
    supports: 'At least 108,000 workers are killed on construction sites every year, representing approximately 30% of all occupational fatal injuries globally',
  },
  {
    num: 2,
    publisher: 'US Department of Energy / FEMP',
    title: 'Operations & Maintenance Best Practices Guide, Release 3.0',
    url: 'energy.gov/sites/prod/files/2020/04/f74/omguide_complete_w-eo-disclaimer.pdf',
    href: 'https://www.energy.gov/sites/prod/files/2020/04/f74/omguide_complete_w-eo-disclaimer.pdf',
    supports: 'Reactive maintenance costs 3-5 times more than planned preventive maintenance when all factors are counted: emergency labour at overtime rates, expedited parts at premium pricing, and production loss during unplanned stoppages',
  },
  {
    num: 3,
    publisher: 'Oxmaint',
    title: 'The State of Manufacturing Maintenance: 2025 Global Industry Report',
    url: 'oxmaint.com/industries/manufacturing-plant/manufacturing-maintenance-global-industry-report-2025',
    href: 'https://oxmaint.com/industries/manufacturing-plant/manufacturing-maintenance-global-industry-report-2025',
    supports: '80% of all equipment failures are traceable to just 20% of identifiable failure modes (citing Nolan & Heap 1978 reliability-centered maintenance study); most failures are random in nature, not age-related',
  },
  {
    num: 4,
    publisher: 'Building, Inc / Construction Industry Institute',
    title: 'Reducing Rework Between Design, Construction, and Operations',
    url: 'buildinginc.medium.com/iii-reducing-rework-between-design-construction-and-operations',
    href: 'https://buildinginc.medium.com/iii-reducing-rework-between-design-construction-and-operations-1e5a173ef6ec',
    supports: 'Rework averages 5% of total project costs and reaches 12% in industrial environments; design-related issues account for 80% of all rework costs',
  },
  {
    num: 5,
    publisher: 'Price Machinery',
    title: 'Renting vs Buying Construction Equipment: Cost Analysis',
    url: 'pricemachinery.com/renting-vs-buying-construction-equipment-cost-analysis',
    href: 'https://pricemachinery.com/renting-vs-buying-construction-equipment-cost-analysis',
    supports: 'Unplanned equipment downtime costs $1,500-$3,000 per hour in heavy construction; repair cost and standby crew cost both accrue simultaneously',
  },
  {
    num: 6,
    publisher: 'Construction Industry Institute / Resource Management',
    title: 'Resource Management: Managing Resources Effectively',
    url: 'constructionresourceutilization.com',
    href: 'https://constructionresourceutilization.com/',
    supports: 'Fifty years of data shows wrench time (direct productive work) is only 25-35% of total paid hours; idle and coordination time accounts for ~40% of every shift',
  },
  {
    num: 7,
    publisher: 'Discovery Alert',
    title: 'Key Components of Mining Project Capital Expenditure',
    url: 'discoveryalert.com.au/capital-expenditure-mining-2025-investment-costs',
    href: 'https://discoveryalert.com.au/capital-expenditure-mining-2025-investment-costs/',
    supports: 'Primary mining fleet accounts for only 15-25% of total project CAPEX; majority absorbed by processing facilities, infrastructure, and indirect costs',
  },
  {
    num: 8,
    publisher: 'Revizto / Censuswide (2026)',
    title: 'New Research Reveals Global Construction Coordination Crisis',
    url: 'prnewswire.com/news-releases/new-research-reveals-global-construction-coordination-crisis-302733618.html',
    href: 'https://www.prnewswire.com/news-releases/new-research-reveals-global-construction-coordination-crisis-302733618.html',
    supports: '41% of global AECO teams cite poor coordination and communication as a leading cause of rework',
  },
  {
    num: 9,
    publisher: 'Bronson.AI / FMI-Autodesk',
    title: 'The Hidden Costs of Poor Data Management in Construction',
    url: 'bronson.ai/resources/the-hidden-costs-of-poor-data-management-in-construction',
    href: 'https://bronson.ai/resources/the-hidden-costs-of-poor-data-management-in-construction/',
    supports: '$1.8 trillion lost globally to inaccurate and incomplete field data in a single year',
  },
  {
    num: 10,
    publisher: 'Panopto',
    title: 'Inefficient Knowledge Sharing Costs Large Businesses $47 Million Per Year',
    url: 'panopto.com/company/news/inefficient-knowledge-sharing-costs-large-businesses-47-million-per-year',
    href: 'https://www.panopto.com/company/news/inefficient-knowledge-sharing-costs-large-businesses-47-million-per-year/',
    supports: 'Large US businesses lose an average of $47M annually from inefficient knowledge sharing',
  },
  {
    num: 11,
    publisher: 'Compliance and Risks',
    title: 'The Unseen Invoice: Unpacking the True Financial Impact of Compliance Failures',
    url: 'complianceandrisks.com/blog/the-unseen-invoice-unpacking-the-true-financial-impact-of-compliance-failures',
    href: 'https://www.complianceandrisks.com/blog/the-unseen-invoice-unpacking-the-true-financial-impact-of-compliance-failures/',
    supports: 'Non-compliance costs organisations 2.71x the average cost of maintaining compliance',
  },
  {
    num: 12,
    publisher: 'OSHA Online Center',
    title: 'Construction Safety Statistics (2026)',
    url: 'blog.oshaonlinecenter.com/construction-safety-statistics',
    href: 'https://blog.oshaonlinecenter.com/construction-safety-statistics/',
    supports: 'Average cost per preventable workplace accident approximately $42,000 before legal exposure and premium increases',
  },
  {
    num: 13,
    publisher: 'GM Insights',
    title: 'Construction Equipment Telematics Market Size, Analysis Report 2034',
    url: 'gminsights.com/industry-analysis/construction-equipment-telematics-market',
    href: 'https://www.gminsights.com/industry-analysis/construction-equipment-telematics-market',
    supports: 'Construction telematics $6.92B (2024) to $20.59B (2034) at 11.5% CAGR; 85-95% penetration on new equipment',
  },
  {
    num: 14,
    publisher: 'Sandvik Annual Report 2024',
    title: 'Digital Shift - Sandvik Annual Report 2024',
    url: 'annualreport.sandvik/en/2024/strategy/value-creation/digital-shift.html',
    href: 'https://www.annualreport.sandvik/en/2024/strategy/value-creation/digital-shift.html',
    supports: '60% of Sandvik customers using automated/digital solutions as of 2024, one year ahead of target',
  },
  {
    num: 15,
    publisher: 'Grand View Research',
    title: 'Equipment as a Service Market Size, Share & Trends Analysis Report',
    url: 'grandviewresearch.com/industry-analysis/equipment-as-a-service-market',
    href: 'https://www.grandviewresearch.com/industry-analysis/equipment-as-a-service-market',
    supports: 'Global Equipment as a Service market projected to reach USD 28.0 billion by 2030, growing at 49.9% CAGR; driven by CAPEX-to-OpEx shift and demand for guaranteed operational outcomes in capital-intensive sectors',
  },
  {
    num: 16,
    publisher: 'Liberty Mutual',
    title: '4 Ways Telematics Can Drive Safety for Construction Businesses',
    url: 'business.libertymutual.com/insights/4-ways-telematics-can-drive-safety-for-construction-businesses',
    href: 'https://business.libertymutual.com/insights/4-ways-telematics-can-drive-safety-for-construction-businesses/',
    supports: '86% of construction firms use telematics, but only 23% use that data to inform decision-making',
  },
  {
    num: 17,
    publisher: 'Northland / BusinessFleet',
    title: 'Northland Survey Finds Fleets Struggle to Turn Telematics Data Into Safety Action',
    url: 'businessfleet.com/news/northland-survey-finds-fleets-struggle-to-turn-telematics-data-into-safety-action',
    href: 'https://www.businessfleet.com/news/northland-survey-finds-fleets-struggle-to-turn-telematics-data-into-safety-action',
    supports: 'Nearly half of fleet managers report they have too much data without enough clarity on how to use it effectively',
  },
  {
    num: 18,
    publisher: 'Navacord / Lloyd Sadd',
    title: 'Can Usage Based Auto Insurance Save You Money?',
    url: 'lloydsadd.navacordpartners.com/insights/can-usage-based-auto-insurance-save-you-money',
    href: 'https://lloydsadd.navacordpartners.com/insights/can-usage-based-auto-insurance-save-you-money/',
    supports: 'Full usage-based insurance programmes - covering mileage, time-of-day, and route-risk tracking - can deliver premium reductions of up to 40%',
  },
];

const REFS_PER_PAGE = 13;
const subtitle = 'Statistics cited in this presentation. Numbers correspond to superscripts throughout the deck. All sources accessed May 2026.';

export function ReferencesSlide1() {
  return (
    <SharedReferencesSlide
      refs={refs.slice(0, REFS_PER_PAGE)}
      subtitle={`${subtitle} (1 of 2)`}
      showSupports
    />
  );
}

export function ReferencesSlide2() {
  return (
    <SharedReferencesSlide
      refs={refs.slice(REFS_PER_PAGE)}
      subtitle={`${subtitle} (2 of 2)`}
      showSupports
    />
  );
}
