import { ReferencesSlide as SharedReferencesSlide, Ref } from '@/components/slides/ReferencesSlide';

const refs: Ref[] = [
  {
    num: 1,
    publisher: 'WOAH : Situation Report 80, April 2026',
    title: 'Highly Pathogenic Avian Influenza: Global Situation Update',
    url: 'woah.org/app/uploads/2026/04/hpai-report-80.pdf',
    href: 'https://www.woah.org/app/uploads/2026/04/hpai-report-80.pdf',
    supports: '633 million poultry lost globally from HPAI between 2005 and 2024; 146 million lost in 2022 across 84 countries; 13.6 million culled in the Americas in February 2026 alone; 781 poultry outbreaks in 30 countries by December 2025, above historical baselines',
  },
  {
    num: 2,
    publisher: 'EPIC Scotland : Research Brief',
    title: 'Modelling the Within-Herd Spread of ASF and Implications for the British Industry',
    url: 'epicscotland.org/resources/research-brief-modelling-the-within-herd-spread-of-asf-and-implication-for-the-british-industry/',
    href: 'https://www.epicscotland.org/resources/research-brief-modelling-the-within-herd-spread-of-asf-and-implication-for-the-british-industry/',
    supports: 'UK-specific stochastic modelling: mean time from ASF introduction to detection 32 days, range 20-43 days. Basic reproduction number 1.4-7.6 across premises. Note: reflects UK herd structures; US peer-reviewed literature supports detection lags of 2+ weeks for moderately virulent strains, directionally consistent but not directly equivalent.',
  },
  {
    num: 3,
    publisher: 'USDA APHIS : FAD PReP Response Plans (primary); Washington State Department of Agriculture (illustrative)',
    title: 'FAD PReP HPAI and ASF Response Plans; HPAI Response Cross-sector Playbook',
    url: 'aphis.usda.gov/fadprep',
    href: 'https://www.aphis.usda.gov/fadprep',
    supports: 'Five-stage FAD PReP response framework: notification, quarantine, appraisal, depopulation, C&D. Regulatory target: depopulation within 24 hours of presumptive positive result : a federal USDA APHIS FAD PReP standard. The Washington State cross-sector playbook is cited as a published implementation of that federal framework.',
  },
  {
    num: 4,
    publisher: 'National Hog Farmer / Epidemiology & Economics',
    title: 'ASF Outbreak in US Could Cost Industry $50 Billion Over 10 Years',
    url: 'nationalhogfarmer.com/biosecurity/asf-outbreak-in-u-s-could-cost-industry-50-billion-over-10-years',
    href: 'https://www.nationalhogfarmer.com/biosecurity/asf-outbreak-in-u-s-could-cost-industry-50-billion-over-10-years',
    supports: 'Failure to eradicate ASF within a two-year window versus endemic establishment represents $35 billion in additional losses to the US swine industry over ten years; driven by permanent industry downsizing as export markets do not reopen. 140,000 jobs at risk in the worst-case endemic scenario',
  },
  {
    num: 5,
    publisher: 'USDA APHIS : Federal Register, December 2024',
    title: 'Payment of Indemnity and Compensation for Highly Pathogenic Avian Influenza',
    url: 'federalregister.gov/documents/2024/12/31/2024-31384/payment-of-indemnity-and-compensation-for-highly-pathogenic-avian-influenza',
    href: 'https://www.federalregister.gov/documents/2024/12/31/2024-31384/payment-of-indemnity-and-compensation-for-highly-pathogenic-avian-influenza',
    supports: 'Interim final rule (December 2024) conditioning indemnity payments on successful biosecurity audits. Since 2022: 67 commercial poultry premises infected at least twice; 19 infected three or more times. Repeat infections accounted for $296 million of $1.1 billion in total indemnity payments',
  },
  {
    num: 6,
    publisher: 'Swine Health Information Center',
    title: 'Lessons Learned from SHIC\'s Standardized Outbreak Investigation Program',
    url: 'swinehealth.org/lessons-learned-from-shics-standardized-outbreak-investigation-program-to-date/',
    href: 'https://www.swinehealth.org/lessons-learned-from-shics-standardized-outbreak-investigation-program-to-date/',
    supports: 'Movement of cull sows and weaned pigs rated highest-risk activity for pathogen entry. Mortality removal, barn repairs, and employee entry also high-risk. Biosecurity hazards routinely overlooked when culling crews, loading crews, and transport are outsourced to providers not integrated into the farm biosecurity culture',
  },
  {
    num: 7,
    publisher: 'American Farm Bureau Federation',
    title: 'Market Basket Survey: Egg Price Tracking Data (2021-2025)',
    url: 'afbf.org/news/press-release/american-farm-bureau-federation-egg-price-survey',
    href: 'https://www.afbf.org/news/press-release/american-farm-bureau-federation-egg-price-survey',
    supports: 'US retail egg prices tracked from under $1.80/dozen (2021) to $4.95/dozen (January 2025) to $8.15/dozen (March 2025), driven by cumulative HPAI-related reductions in the national laying flock inventory. Cited in slide 3 for the egg price trajectory only.',
  },
];

export function ReferencesSlide() {
  return (
    <SharedReferencesSlide
      refs={refs}
      subtitle="All statistics cited in this presentation. Numbers correspond to superscripts throughout the deck. Sources accessed May 2026."
    />
  );
}
