import { ReferencesSlide as SharedReferencesSlide, Ref } from '@/components/slides/ReferencesSlide';

const refs: Ref[] = [
  {
    num: 1,
    publisher: 'City of Scottsdale Office of the City Auditor',
    title: 'Fleet Maintenance Audit 2603',
    url: 'scottsdaleaz.gov/docs/default-source/scottsdaleaz/auditor/2026-reports/fleet-maintenance-audit-2603.pdf',
    href: 'https://www.scottsdaleaz.gov/docs/default-source/scottsdaleaz/auditor/2026-reports/fleet-maintenance-audit-2603.pdf?sfvrsn=c5047a62_1',
    supports: '44% increase in vehicle wait times and 33% increase in shop time duration over three years; vehicles idle awaiting mechanic assignment while SLA obligations continue',
  },
  {
    num: 2,
    publisher: 'RDK Truck Sales (Richard Kemner)',
    title: 'Refuse Truck Operating Costs and Emission System Failure Modes',
    url: 'rdk.com/blog/author/emkemner/page/2/',
    href: 'https://www.rdk.com/blog/author/emkemner/page/2/',
    supports: 'Diesel in DEF tank: $8,000-$15,000 for total system replacement. Catalyst poisoning from non-dedicated funnels: $3,000-$5,000 per incident. Hydraulic pump failure and seal cracking from cold-weather misuse: thousands per incident, routinely disputed as manufacturing defect',
  },
  {
    num: 3,
    publisher: 'IAARC',
    title: 'Data Mining and Statistical Analysis of Construction Equipment Failure',
    url: 'iaarc.org/publications/fulltext/Data_mining_and_statistical_analysis_of_construction_equipment_failure.pdf',
    href: 'http://www.iaarc.org/publications/fulltext/Data_mining_and_statistical_analysis_of_construction_equipment_failure.pdf',
    supports: '46% of major equipment repairs result from unexpected failures rather than scheduled maintenance; operator non-compliance and misuse identified as primary contributing factors',
  },
  {
    num: 4,
    publisher: 'Oxmaint',
    title: 'Municipal Fleet Cuts Maintenance Costs 35% in 18 Months',
    url: 'oxmaint.com/case-study/post/case-study-municipal-fleet-cuts-maintenance-costs-35-percent',
    href: 'https://oxmaint.com/case-study/post/case-study-municipal-fleet-cuts-maintenance-costs-35-percent',
    supports: '41% PM compliance floor in some municipalities; shop time reduced from 4.7 to 1.4 days with digital records; 2,314% ROI ($3.09M benefit) from $128k implementation over 18 months',
  },
  {
    num: 5,
    publisher: 'BCG',
    title: 'Beyond the Black Box in Pricing',
    url: 'bcg.com/publications/2021/smart-pricing-authority-benefits',
    href: 'https://www.bcg.com/publications/2021/smart-pricing-authority-benefits',
    supports: '400-800 basis points of revenue leakage recoverable through tighter pricing discipline (analogous industrials and telco data)',
  },
  {
    num: 6,
    publisher: 'Compliance and Risks',
    title: 'The Unseen Invoice: Unpacking the True Financial Impact of Compliance Failures',
    url: 'complianceandrisks.com/blog/the-unseen-invoice-unpacking-the-true-financial-impact-of-compliance-failures',
    href: 'https://www.complianceandrisks.com/blog/the-unseen-invoice-unpacking-the-true-financial-impact-of-compliance-failures/',
    supports: 'Non-compliance costs organisations 2.71x the average cost of maintaining compliance',
  },
  {
    num: 7,
    publisher: 'US Department of Energy / FEMP',
    title: 'Operations & Maintenance Best Practices Guide, Release 3.0',
    url: 'energy.gov/sites/prod/files/2020/04/f74/omguide_complete_w-eo-disclaimer.pdf',
    href: 'https://www.energy.gov/sites/prod/files/2020/04/f74/omguide_complete_w-eo-disclaimer.pdf',
    supports: 'Reactive maintenance costs 3-5 times more than planned preventive maintenance when all factors are counted: emergency labour at overtime rates, expedited parts at premium pricing, and production loss during unplanned stoppages',
  },
  {
    num: 8,
    publisher: 'Rocketlane',
    title: 'Margin Erosion in PS: Causes, Metrics & How to Fix It',
    url: 'rocketlane.com/blogs/margin-erosion',
    href: 'https://www.rocketlane.com/blogs/margin-erosion',
    supports: 'Approximately 15-20% of planned margin is lost before erosion is detected by leadership; resource mismatching alone causes projects to close 10-15 percentage points below planned margin',
  },
  {
    num: 9,
    publisher: 'Oxmaint',
    title: 'Downtime Cost Calculator: Real Numbers for 2026',
    url: 'oxmaint.com/article/downtime-cost-calculator-manufacturing',
    href: 'https://oxmaint.com/article/downtime-cost-calculator-manufacturing',
    supports: 'Skilled maintenance technician wages in North America rose 28% between 2019 and 2024, a rate that frequently outpaces fixed price escalators in long-term service agreements',
  },
  {
    num: 10,
    publisher: 'Oxmaint',
    title: 'Maintenance Cost Reduction: 20 Proven Strategies to Cut Spending Without Sacrificing Reliability',
    url: 'oxmaint.com/blog/post/maintenance-cost-reduction-20-proven-strategies',
    href: 'https://www.oxmaint.com/blog/post/maintenance-cost-reduction-20-proven-strategies',
    supports: 'Emergency parts procurement commands a premium of 200-300% above standard contract price, compounded by expedited shipping fees up 60% since 2019',
  },
  {
    num: 11,
    publisher: 'Hancock et al. / PHM Society',
    title: 'Pricing Full-Service Maintenance Contracts: A Data Analytics Approach',
    url: 'papers.phmsociety.org/index.php/phme/article/download/437/phmec_18_437',
    href: 'https://papers.phmsociety.org/index.php/phme/article/download/437/phmec_18_437',
    supports: 'Only 50% of service contracts achieve their planned benefits; 25% are loss-making for the provider, driven by mispriced assumptions and adverse selection of high-risk customers',
  },
  {
    num: 12,
    publisher: 'Government Fleet',
    title: 'AI, Electrification Driving Oshkosh\'s New Refuse, Emergency, and Airport Fleet Technologies',
    url: 'government-fleet.com/news/ai-electrification-driving-oshkoshs-new-refuse-emergency-and-airport-fleet-techn',
    href: 'https://www.government-fleet.com/news/ai-electrification-driving-oshkoshs-new-refuse-emergency-and-airport-fleet-techn',
    supports: 'McNeilus ClearSky integrates predictive diagnostics into new refuse vehicles; OEM telematics factory-standard on the Volterra electric line',
  },
  {
    num: 13,
    publisher: 'Dennis Eagle / Terberg (Eagle Eye, Issue 3, 2024)',
    title: 'Terberg Connect: Remote Diagnostics Platform for Municipal RCVs',
    url: 'issuu.com/terbergrosroca/docs/6074_eagle_eye_magazine_2024_issue_3_final_web',
    href: 'https://issuu.com/terbergrosroca/docs/6074_eagle_eye_magazine_2024_issue_3_final_web',
    supports: 'Terberg Connect fitted as standard on all new Dennis Eagle UK vehicles; remotely replicates the RCV interface so engineers can diagnose faults before arriving at the vehicle',
  },
  {
    num: 14,
    publisher: 'MarketsandMarkets',
    title: 'Fleet Management Market Report 2025-2030',
    url: 'marketsandmarkets.com/Market-Reports/fleet-management-systems-market-1020.html',
    href: 'https://www.marketsandmarkets.com/Market-Reports/fleet-management-systems-market-1020.html',
    supports: 'Global fleet management market $37.71B in 2025, projected $70.26B by 2030 at 13.3% CAGR overall; managed services segment growing fastest at 15.3% CAGR',
  },
  {
    num: 15,
    publisher: 'Automotive Fleet',
    title: 'Survey: Fleets Take Grounded Approach Heading Into 2025',
    url: 'automotive-fleet.com/news/survey-fleets-take-grounded-approach-heading-into-2025',
    href: 'https://www.automotive-fleet.com/news/survey-fleets-take-grounded-approach-heading-into-2025',
    supports: '61% of fleet operators rank TCO reduction as their top priority heading into 2025, citing inflation and rising maintenance costs',
  },
  {
    num: 16,
    publisher: 'City of Berkeley Office of the City Auditor',
    title: 'Fleet Vehicle Management Audit',
    url: 'berkeleyca.gov/sites/default/files/2022-01/Fleet-Vehicle-%20Management-%20Audit.pdf',
    href: 'https://berkeleyca.gov/sites/default/files/2022-01/Fleet-Vehicle-%20Management-%20Audit.pdf',
    supports: 'Vehicle use policies found not diligently enforced; maintenance costs unsupported by usage analysis - documented gap between policy existence and verified compliance',
  },
];

const REFS_PER_PAGE = 13;
const subtitle = 'Statistics cited in this presentation. Numbers correspond to superscripts throughout the deck. All sources accessed May 2026.';

export function MunicipalReferencesSlide1() {
  return (
    <SharedReferencesSlide
      refs={refs.slice(0, REFS_PER_PAGE)}
      subtitle={`${subtitle} (1 of 2)`}
      showSupports
    />
  );
}

export function MunicipalReferencesSlide2() {
  return (
    <SharedReferencesSlide
      refs={refs.slice(REFS_PER_PAGE)}
      subtitle={`${subtitle} (2 of 2)`}
      showSupports
    />
  );
}
