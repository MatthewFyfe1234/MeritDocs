import { ReferencesSlide as SharedReferencesSlide, Ref } from '@/components/slides/ReferencesSlide';

const refs: Ref[] = [
  {
    num: 1,
    publisher: 'WiFiTalents / Project Control Academy',
    title: 'Project Cost Overrun: Data Reports 2026 — 85% of projects exceed budget; 28% average global overrun (70-year study, 20 countries)',
    url: 'wifitalents.com/project-cost-overrun-statistics/',
    href: 'https://wifitalents.com/project-cost-overrun-statistics/',
    supports: '85% of all construction projects fail to stay within budget; 28% average cost overrun globally',
  },
  {
    num: 2,
    publisher: 'McKinsey Global Institute',
    title: 'The Construction Productivity Imperative (2013) — 98% of megaprojects with cost overruns averaging 80% of original value',
    url: 'mckinsey.com/industries/capital-projects-and-infrastructure/...',
    href: 'https://www.mckinsey.com/~/media/McKinsey/Industries/Capital%20Projects%20and%20Infrastructure/Our%20Insights/The%20construction%20productivity%20imperative/The%20construction%20productivity%20imperative.pdf',
    supports: '98% of megaprojects suffer cost overruns; average 80% cost escalation; large projects run 20% over schedule',
  },
  {
    num: 3,
    publisher: 'KPMG Global Construction Survey (2024)',
    title: 'Global project schedule and budget performance benchmarks — 25% meet original schedule; 31% within 10% of budget',
    url: 'kpmg.com',
    href: 'https://kpmg.com',
    supports: 'Only 25% of projects are delivered on time; only 31% finish within 10% of their original budget',
  },
  {
    num: 4,
    publisher: 'JCT / RICS — Final Account Procedures',
    title: 'Standard contract close-out timelines and final account procedures — 12–24 month profitability realization window',
    url: 'rics.org/content/dam/.../final_account_procedures_1st_edition_rics.pdf',
    href: 'https://www.rics.org/content/dam/ricsglobal/documents/standards/final_account_procedures_1st_edition_rics.pdf',
    supports: 'Final profit position typically realized 12–24 months post-practical completion, driven by contractual close-out, defects liability, and retention release',
  },
  {
    num: 5,
    publisher: 'Autodesk / FMI Research',
    title: '100+ Construction Industry Statistics — coordination overhead, rework attribution, and the cost of fragmented information',
    url: 'autodesk.com/blogs/construction/construction-industry-statistics/',
    href: 'https://www.autodesk.com/blogs/construction/construction-industry-statistics/',
    supports: '70% of rework is design-induced; 14 hours/week on non-productive tasks; 52% of rework from poor data and miscommunication; 62% of contractors cite fragmented communication as top productivity barrier',
  },
  {
    num: 6,
    publisher: 'K-38 Consulting',
    title: 'Real Estate CFOs: Driving Profitable Development Strategies — 87% data collection priority stat',
    url: 'k38consulting.com/real-estate-cfo-development-strategies/',
    href: 'https://k38consulting.com/real-estate-cfo-development-strategies/',
    supports: '87% of real estate companies rank data collection as their top business priority',
  },
  {
    num: 7,
    publisher: 'MDPI Buildings',
    title: 'Bridging the Construction Productivity Gap — 10% vs 50%+ productivity divergence over two decades',
    url: 'mdpi.com/2075-5309/15/16/2899',
    href: 'https://www.mdpi.com/2075-5309/15/16/2899',
    supports: 'Construction productivity grew only 10% over two decades against 50%+ for the global economy',
  },
  {
    num: 8,
    publisher: 'Emerald Publishing — Property Management',
    title: 'Behavioural finance factors in Australasian REIT investment decisions',
    url: 'emerald.com/pm/article/42/1/124/1237375/...',
    href: 'https://www.emerald.com/pm/article/42/1/124/1237375/The-relative-significance-of-behavioural-finance',
    supports: 'Anchoring bias present in 84.6% of real estate investment decision-makers (Australasian REIT sample)',
  },
];

export function ReferencesSlide() {
  return (
    <SharedReferencesSlide
      refs={refs}
      subtitle="All statistics cited in this presentation. Numbers correspond to superscripts throughout the deck. All sources accessed February–March 2026."
    />
  );
}
