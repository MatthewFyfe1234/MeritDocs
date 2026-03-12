import { ReferencesSlide as SharedReferencesSlide, Ref } from '@/components/slides/ReferencesSlide';

const refs: Ref[] = [
  {
    num: 7,
    publisher: 'PipeCloud',
    title: 'What is the ROI of implementing an MES in pipe prefabrication?',
    url: 'pipecloud.fi/what-is-the-roi-of-implementing-an-mes-in-pipe-prefabrication',
    href: 'https://pipecloud.fi/what-is-the-roi-of-implementing-an-mes-in-pipe-prefabrication/',
    supports: 'MES ROI positive within 12–18 months; 10–15% waste reduction',
  },
  {
    num: 8,
    publisher: 'Autodesk Construction Cloud',
    title: '100+ Construction Industry Statistics',
    url: 'autodesk.com/blogs/construction/construction-industry-statistics',
    href: 'https://www.autodesk.com/blogs/construction/construction-industry-statistics/',
    supports: '13 hrs/week searching for data; 52% rework from miscommunication; 14% rework from bad data',
  },
  {
    num: 9,
    publisher: 'Trimble Viewpoint (citing McKinsey)',
    title: 'The Cost of Doing Nothing: 5 Reasons Contractors Need to Modernize',
    url: 'trimble.com/viewpoint: The Cost of Doing Nothing (PDF)',
    href: 'https://assets.ctfassets.net/jnzexz4x7lkk/WtA48SOV13UPNguoR1KeO/7804b85ff9c5fba6e07186edbbd133be/the-cost-of-doing-nothing-5-reasons-contractors-need-to-modernize-their-operations-to-stay-competitive-and-profitable.pdf',
    supports: 'Digital transformation: 14–15% productivity increase; 4–6% cost reduction (McKinsey)',
  },
  {
    num: 10,
    publisher: 'KPMG (via GoCodes)',
    title: '2023 Global Construction Survey',
    url: 'gocodes.com/construction/project-management-statistics',
    href: 'https://gocodes.com/construction/project-management-statistics/',
    supports: '83% of firms say improving estimating accuracy is their biggest priority',
  },
  {
    num: 11,
    publisher: 'SketchDeck',
    title: 'The Ultimate Guide to Steel Estimating: Best Practices for Fabrication Success',
    url: 'sketchdeck.ai/blog/the-ultimate-guide-to-steel-estimating',
    href: 'https://sketchdeck.ai/blog/the-ultimate-guide-to-steel-estimating-best-practices-for-fabrication-success/',
    supports: 'AI-powered takeoff: 50–80% reduction in takeoff time; 2–3x more bids with same headcount',
  },
  {
    num: 13,
    publisher: 'McKinsey Global Institute',
    title: 'Digital America: A Tale of the Haves and Have-Mores (MGI Industry Digitization Index)',
    url: 'mckinsey.com/mgi/overview/in-the-news/which-industries-are-the-most-digital',
    href: 'https://www.mckinsey.com/mgi/overview/in-the-news/which-industries-are-the-most-digital',
    supports: 'Construction ranks 2nd lowest of all industries on the MGI Industry Digitization Index, ahead only of agriculture',
  },
  {
    num: 14,
    publisher: 'FMI Corp / Autodesk',
    title: 'Big Data and Digital Transformation in Construction',
    url: 'fmicorp.com/uploads/media/FMI_BigDataReport.pdf',
    href: 'https://fmicorp.com/uploads/media/FMI_BigDataReport.pdf',
    supports: '49% of firms forced to transfer data manually between applications; 35% of professional time lost to non-optimal activities',
  },
  {
    num: 15,
    publisher: 'Numeric / APQC',
    title: 'How Long Does Month-End Close Take? Benchmarks & Analysis',
    url: 'numeric.io/blog/how-long-does-month-end-close-take',
    href: 'https://www.numeric.io/blog/how-long-does-month-end-close-take',
    supports: 'Top performers close in 4.8 days; mid-sized non-automated firms average 14 days',
  },
  {
    num: 16,
    publisher: 'Lean Construction Institute (citing CII)',
    title: 'Lean Construction / Integrated Project Delivery',
    url: 'leanipd.com/lean-construction',
    href: 'https://leanipd.com/lean-construction/',
    supports: 'Over 50% of labor time in construction is waste; only 43% productive vs 88% in manufacturing (CII benchmark)',
  },
  {
    num: 17,
    publisher: 'Dodge Data & Analytics / Procore',
    title: 'Top Business Issues for Specialty Contractors (2022)',
    url: 'mkt-cdn.procore.com/downloads/reports/top-business-issues-SCs.pdf',
    href: 'https://mkt-cdn.procore.com/downloads/reports/top-business-issues-SCs.pdf',
    supports: '99% of specialty contractors experience margin erosion; average 5% fade; 29% cite inaccurate estimates as primary cause',
  },
];

export function ReferencesSlide() {
  return <SharedReferencesSlide refs={refs} />;
}
