import { ReferencesSlide as SharedReferencesSlide, Ref } from '@/components/slides/ReferencesSlide';

const refs: Ref[] = [
  {
    num: 1,
    publisher: 'Construction Industry Institute (CII)',
    title: 'The Effects of Change on Labor Productivity / RT-158 Cumulative Impact — 30% efficiency loss during change work; disruptions increase 50% on change days; 151 weeks of site data',
    url: 'construction-institute.org/the-effects-of-change-on-labor-productivity-why-and-how-much',
    href: 'https://www.construction-institute.org/the-effects-of-change-on-labor-productivity-why-and-how-much',
    supports: 'Efficiency drops to 70% of normal during change work (30% loss); disruptions increase 50% on change-work days; material and information disruptions cause 26–47% daily efficiency loss',
  },
  {
    num: 2,
    publisher: 'McKinsey Global Institute (2017)',
    title: 'Reinventing Construction: A Route to Higher Productivity — 1% annual productivity growth in construction over the past 20 years vs 3.6% in manufacturing and 2.8% for the total world economy',
    url: 'mckinsey.com/capabilities/operations/our-insights/reinventing-construction-through-a-productivity-revolution',
    href: 'https://www.mckinsey.com/capabilities/operations/our-insights/reinventing-construction-through-a-productivity-revolution',
    supports: 'Construction productivity has grown just 1% annually over the past 20 years vs 3.6% in manufacturing and 2.8% for the total world economy; adopting lean and digital tools could boost productivity by 50–60%',
  },
  {
    num: 3,
    publisher: 'UK Retention Deposit Scheme (2023)',
    title: 'Cash Flow Crunch: The Impact of Retentions on Construction Firms — 44% of contractors failed to recover retention due to upstream insolvency',
    url: 'retentiondepositscheme.org/insights/the-impact-of-retentions-on-construction-firms',
    href: 'https://www.retentiondepositscheme.org/insights/the-impact-of-retentions-on-construction-firms',
    supports: '44% of contractors surveyed have failed to recover retention money due to upstream insolvency; retention typically represents the entirety of a project\'s net profit, held by a party whose financial position the GC cannot control',
  },
  {
    num: 4,
    publisher: 'Arcadis — 15th Annual Global Construction Disputes Report (2025)',
    title: 'Construction Disputes in Motion — 12.5 months global average dispute resolution (2024); average dispute value soared by over $60M; poorly drafted claims ranked as leading cause',
    url: 'media.arcadis.com/-/media/project/arcadiscom/com/expertise/global/contract-solutions/2025/2025-15th-annual-construction-disputes-report-final-19jun25.pdf',
    href: 'https://media.arcadis.com/-/media/project/arcadiscom/com/expertise/global/contract-solutions/2025/2025-15th-annual-construction-disputes-report-final-19jun25.pdf',
    supports: 'Global average dispute resolution time in 2024: 12.5 months; average dispute value increased by over $60M in 2024; poorly drafted and unsubstantiated claims identified as the leading cause of disputes',
  },
  {
    num: 5,
    publisher: 'International Labour Organization (ILO)',
    title: 'Construction: a hazardous work — at least 108,000 workers killed on construction sites annually, representing approximately 30% of all occupational fatal injuries worldwide',
    url: 'ilo.org/resource/construction-hazardous-work',
    href: 'https://www.ilo.org/resource/construction-hazardous-work',
    supports: 'Construction workers account for approximately 30% of all occupational fatal injuries globally; workers in the sector are 3–6 times more likely to die from accidents than workers in other industries',
  },
  {
    num: 6,
    publisher: 'Kyro AI / FMI Research (2024)',
    title: 'The High Cost of Poor Document Management in Construction — 52% of rework tied to subcontractors working from outdated drawings or missing specifications',
    url: 'kyro.ai/blog/construction-document-management-issues',
    href: 'https://kyro.ai/blog/construction-document-management-issues',
    supports: '52% of rework directly linked to subcontractors working from outdated drawings or missing specifications',
  },
  {
    num: 7,
    publisher: 'FMI / Autodesk — Harnessing the Data Advantage in Engineering and Construction (2021)',
    title: 'Global E&C data strategy study — 14% of all rework caused by bad data; $88.7bn annual global cost; 96% of construction data goes unused; 3,900+ industry leaders surveyed',
    url: 'constructioncloud.autodesk.com/rs/572-JSV-775/images/harnessing_the_data_advantage_in_construction_fmi_apac.pdf',
    href: 'https://constructioncloud.autodesk.com/rs/572-JSV-775/images/harnessing_the_data_advantage_in_construction_fmi_apac.pdf',
    supports: '14% of all construction rework caused by bad data; $88.69bn annual global cost; for a $1bn contractor: $7.1M in avoidable losses per year; 96% of generated data goes unused',
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
