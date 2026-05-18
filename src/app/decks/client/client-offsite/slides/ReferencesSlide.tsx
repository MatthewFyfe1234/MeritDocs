import { ReferencesSlide as SharedReferencesSlide, Ref } from '@/components/slides/ReferencesSlide';

const refs: Ref[] = [
  {
    num: 1,
    publisher: 'FMI Corp / Autodesk',
    title: 'Big Data and Digital Transformation in Construction',
    url: 'fmicorp.com/uploads/media/FMI_BigDataReport.pdf',
    href: 'https://fmicorp.com/uploads/media/FMI_BigDataReport.pdf',
    supports: '49% of firms forced to transfer data manually between applications; 35% of professional time lost to non-optimal activities',
  },
  {
    num: 2,
    publisher: 'Numeric / APQC',
    title: 'How Long Does Month-End Close Take? Benchmarks & Analysis',
    url: 'numeric.io/blog/how-long-does-month-end-close-take',
    href: 'https://www.numeric.io/blog/how-long-does-month-end-close-take',
    supports: 'Top performers close in 4.8 days; mid-sized non-automated firms average 14 days',
  },
  {
    num: 3,
    publisher: 'Lean Construction Institute (citing CII)',
    title: 'Lean Construction / Integrated Project Delivery',
    url: 'leanipd.com/lean-construction',
    href: 'https://leanipd.com/lean-construction/',
    supports: 'Over 50% of labor time in construction is waste; only 43% productive vs 88% in manufacturing (CII benchmark)',
  },
  {
    num: 4,
    publisher: 'Autodesk Construction Cloud',
    title: '100+ Construction Industry Statistics',
    url: 'autodesk.com/blogs/construction/construction-industry-statistics',
    href: 'https://www.autodesk.com/blogs/construction/construction-industry-statistics/',
    supports: '13 hrs/week searching for data; 52% rework from miscommunication; 14% of all rework globally caused by bad data (Autodesk/FMI primary study, 3,900+ global respondents)',
  },
  {
    num: 5,
    publisher: 'McKinsey Global Institute',
    title: 'Reinventing Construction through a Productivity Revolution',
    url: 'mckinsey.com/MGI-Reinventing-construction-Executive-summary.pdf',
    href: 'https://www.mckinsey.com/~/media/McKinsey/Industries/Capital%20Projects%20and%20Infrastructure/Our%20Insights/Reinventing%20construction%20through%20a%20productivity%20revolution/MGI-Reinventing-construction-Executive-summary.pdf',
    supports: 'Digital transformation (Technology and Innovation lever): 14–15% productivity increase; 4–6% cost reduction. MGI Construction Productivity Survey, February 2017.',
  },
  {
    num: 6,
    publisher: 'KPMG',
    title: '2023 Global Construction Survey: Familiar Challenges, New Solutions',
    url: 'assets.kpmg.com/content/dam/kpmg/br/pdf/2023/10/2023GlobalConstructionSurvey.pdf',
    href: 'https://assets.kpmg.com/content/dam/kpmg/br/pdf/2023/10/2023GlobalConstructionSurvey.pdf',
    supports: 'Improving estimating accuracy is the top-ranked priority for construction firms addressing market volatility; 78% believe project risks are increasing. KPMG 14th global E&C survey, ~300 firms.',
  },
  {
    num: 7,
    publisher: 'Dodge Data & Analytics / Procore',
    title: 'Top Business Issues for Specialty Contractors (2022)',
    url: 'mkt-cdn.procore.com/downloads/reports/top-business-issues-SCs.pdf',
    href: 'https://mkt-cdn.procore.com/downloads/reports/top-business-issues-SCs.pdf',
    supports: '99% of specialty contractors experience margin erosion during construction; average margin fade is 5% of project value',
  },
  {
    num: 8,
    publisher: 'SketchDeck',
    title: 'The Ultimate Guide to Steel Estimating: Best Practices for Fabrication Success',
    url: 'sketchdeck.ai/blog/the-ultimate-guide-to-steel-estimating',
    href: 'https://sketchdeck.ai/blog/the-ultimate-guide-to-steel-estimating-best-practices-for-fabrication-success/',
    supports: 'AI-powered takeoff: 50–80% reduction in takeoff time; 2–3x more bids with same headcount. Note: vendor blog, consistent with independent MES/AI-takeoff research.',
  },
];

export function ReferencesSlide() {
  return <SharedReferencesSlide refs={refs} />;
}
