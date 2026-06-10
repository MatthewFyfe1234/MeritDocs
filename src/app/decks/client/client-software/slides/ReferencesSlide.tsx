import { ReferencesSlide as SharedReferencesSlide, Ref } from '@/components/slides/ReferencesSlide';

const refs: Ref[] = [
  // [1-5] first cited in DisconnectSlide
  {
    num: 1,
    publisher: 'Jus Mundi',
    title: 'Timing Is Everything: When Is the Best Time to Resolve a Construction Defect Case?',
    url: 'jusmundi.com/en/document/publication/en-timing-is-everything-when-is-the-best-time-to-resolve-a-construction-defect-case',
    href: 'https://jusmundi.com/en/document/publication/en-timing-is-everything-when-is-the-best-time-to-resolve-a-construction-defect-case',
    supports: 'Defense of a construction defect case costs 3-5× the settlement amount; first-year defense and expert fees approximately $250,000 per party',
  },
  {
    num: 2,
    publisher: 'Sompo International',
    title: 'Preparing for the EU Product Liability Directive (EU) 2024/2853',
    url: 'sompo-intl.com/media-center/insights/preparing-for-the-eu-product-liability-directive',
    href: 'https://www.sompo-intl.com/media-center/insights/preparing-for-the-eu-product-liability-directive/',
    supports: 'Software classified as a product under revised PLD; strict liability with reversed burden of proof for complex/AI systems; latent injury window extended from 10 to 25 years; effective December 2026',
  },
  {
    num: 3,
    publisher: 'FMI / Autodesk / Symetri',
    title: 'Beyond the Buzz: Harnessing the Power of Data Analytics in Construction',
    url: 'fmicorp.com/insights/thought-leadership/beyond-the-buzz-harnessing-the-power-of-data-analytics-in-construction',
    href: 'https://fmicorp.com/insights/thought-leadership/beyond-the-buzz-harnessing-the-power-of-data-analytics-in-construction',
    supports: '96% of all engineering and construction data goes completely unused; only 12% of organisations systematically integrate project performance data back into design',
  },
  {
    num: 4,
    publisher: 'Insura.ai',
    title: 'Engineering Firms Insurance: Professional Liability & E&O Guide (2026)',
    url: 'insura.ai/articles/engineering-firms-insurance-guide',
    href: 'https://insura.ai/articles/engineering-firms-insurance-guide',
    supports: 'Structural/civil E&O premiums $30,000-$42,000 annually for structural software providers; verified installation records unlock 10-30% underwriting discounts for builders',
  },
  {
    num: 5,
    publisher: 'Warranty Week',
    title: '23rd Annual Product Warranty Report (2026)',
    url: 'warrantyweek.com/archive/ww20260416.html',
    href: 'https://www.warrantyweek.com/archive/ww20260416.html',
    supports: 'Building materials manufacturers accrued $868M in warranty reserves in 2025; typical warranty cost 0.5-5.0% of product sales revenue for structural manufacturers',
  },
  // [6-8] first cited in ValueCaptureSlide
  {
    num: 6,
    publisher: 'RSMeans / Gordian',
    title: 'Construction Cost Data — Coordination and Overhead',
    url: 'gordian.com/rsmeans',
    href: 'https://www.gordian.com/rsmeans',
    supports: 'Coordination and overhead estimated at 8-12% of total project cost across construction subsectors',
  },
  {
    num: 7,
    publisher: 'McKinsey Global Institute',
    title: 'Reinventing Construction: A Route to Higher Productivity',
    url: 'mckinsey.com/business-functions/operations/our-insights/reinventing-construction',
    href: 'https://www.mckinsey.com/business-functions/operations/our-insights/reinventing-construction',
    supports: 'Labour productivity and rework cost benchmarks in construction; rework averages 4-10% of project budgets',
  },
  {
    num: 8,
    publisher: 'KPMG',
    title: 'Global Construction Survey 2019',
    url: 'kpmg.com/xx/en/home/insights/2019/05/global-construction-survey.html',
    href: 'https://kpmg.com/xx/en/home/insights/2019/05/global-construction-survey.html',
    supports: 'Insurance and compliance costs as a proportion of project budget in global construction and engineering',
  },
  // [9-13] first cited in ProblemSlide
  {
    num: 9,
    publisher: 'Revizto / Censuswide (2026)',
    title: 'New Research Reveals Global Construction Coordination Crisis',
    url: 'prnewswire.com/news-releases/new-research-reveals-global-construction-coordination-crisis-302733618.html',
    href: 'https://www.prnewswire.com/news-releases/new-research-reveals-global-construction-coordination-crisis-302733618.html',
    supports: '41% of global AECO teams cite poor coordination and communication as a leading cause of rework',
  },
  {
    num: 10,
    publisher: 'Bronson.AI / FMI-Autodesk',
    title: 'The Hidden Costs of Poor Data Management in Construction',
    url: 'bronson.ai/resources/the-hidden-costs-of-poor-data-management-in-construction',
    href: 'https://bronson.ai/resources/the-hidden-costs-of-poor-data-management-in-construction/',
    supports: '$1.8 trillion lost globally to inaccurate and incomplete field data in a single year',
  },
  {
    num: 11,
    publisher: 'Panopto',
    title: 'Inefficient Knowledge Sharing Costs Large Businesses $47 Million Per Year',
    url: 'panopto.com/company/news/inefficient-knowledge-sharing-costs-large-businesses-47-million-per-year',
    href: 'https://www.panopto.com/company/news/inefficient-knowledge-sharing-costs-large-businesses-47-million-per-year/',
    supports: 'Large US businesses lose an average of $47M annually from inefficient knowledge sharing',
  },
  {
    num: 12,
    publisher: 'Compliance and Risks',
    title: 'The Unseen Invoice: Unpacking the True Financial Impact of Compliance Failures',
    url: 'complianceandrisks.com/blog/the-unseen-invoice-unpacking-the-true-financial-impact-of-compliance-failures',
    href: 'https://www.complianceandrisks.com/blog/the-unseen-invoice-unpacking-the-true-financial-impact-of-compliance-failures/',
    supports: 'Non-compliance costs organisations 2.71× the average cost of maintaining compliance',
  },
  {
    num: 13,
    publisher: 'OSHA Online Center',
    title: 'Construction Safety Statistics (2026)',
    url: 'blog.oshaonlinecenter.com/construction-safety-statistics',
    href: 'https://blog.oshaonlinecenter.com/construction-safety-statistics/',
    supports: 'Average cost per preventable workplace accident approximately $42,000 before legal exposure and premium increases',
  },
  // [14-18] first cited in LastPieceSlide
  {
    num: 14,
    publisher: 'Autodesk / Dodge Data & Analytics',
    title: 'BIM SmartMarket Report 2023',
    url: 'autodesk.com/solutions/bim/bim-smartmarket-report',
    href: 'https://www.autodesk.com/solutions/bim/bim-smartmarket-report',
    supports: '87% of AEC firms using digital design or specification software as a primary delivery tool',
  },
  {
    num: 15,
    publisher: 'Grand View Research',
    title: 'Construction Software Market Size & Trends Analysis Report',
    url: 'grandviewresearch.com/industry-analysis/construction-software-market',
    href: 'https://www.grandviewresearch.com/industry-analysis/construction-software-market',
    supports: 'Global construction software market projected to reach $18.4B by 2030 at 22.5% CAGR',
  },
  {
    num: 16,
    publisher: 'IoT Tech News',
    title: 'IoT Takes the Wheel: Telematics Is Transforming Construction',
    url: 'iottechnews.com/news/iot-takes-wheel-telematics-transforming-construction',
    href: 'https://iottechnews.com/news/iot-takes-wheel-telematics-transforming-construction/',
    supports: '72% of contractors use IoT-enabled equipment telematics',
  },
  {
    num: 17,
    publisher: 'Berg Insight / ResearchAndMarkets',
    title: 'Construction Equipment OEM Telematics Market Report, 7th Edition (2024)',
    url: 'businesswire.com/news/home/20241218282885/en/Global-Construction-Equipment-OEM-Telematics-Market-Report-2024',
    href: 'https://www.businesswire.com/news/home/20241218282885/en/Global-Construction-Equipment-OEM-Telematics-Market-Report-2024-12.1-Million-Active-Construction-Equipment-OEM-Telematics-Systems-Forecast-by-2028---ResearchAndMarkets.com',
    supports: '6.8 million active construction equipment OEM telematics systems at end of 2023; 12% CAGR; forecast to reach 12.1 million units worldwide by 2028',
  },
  {
    num: 18,
    publisher: 'BSI / ISO 19650',
    title: 'Information Management in Construction — ISO 19650 Series',
    url: 'bsigroup.com/en-GB/standards/iso-19650',
    href: 'https://www.bsigroup.com/en-GB/standards/iso-19650',
    supports: 'Audit findings on design-to-as-built record gaps at project handover and commissioning',
  },
];

const REFS_PER_PAGE = 14;
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
