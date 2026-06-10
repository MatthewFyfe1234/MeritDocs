import { ReferencesSlide as SharedReferencesSlide, Ref } from '../../../../components/slides/ReferencesSlide';

const refs: Ref[] = [
  {
    num: 1,
    publisher: 'Stats NZ / Figure.NZ',
    title: 'Businesses in the prefabricated wooden building manufacturing industry in New Zealand (2000-2025)',
    url: 'figure.nz/chart/IW0xisEu03j4YW09-cLbkWHaimcW2insj',
    href: 'https://figure.nz/chart/IW0xisEu03j4YW09-cLbkWHaimcW2insj',
    supports: '120 active enterprises in ANZSIC C1491 as of 2024-2025. Average employee count (~7 per business) is comparable to Australian equivalent of 7.8 per enterprise; fine-level NZ employee data withheld under Stats NZ confidentiality protocols.',
  },
  {
    num: 2,
    publisher: 'Infrastructure New Zealand / Treasury',
    title: 'Submission on the Productivity Commission Improving Economic Resilience Issues Paper',
    url: 'treasury.govt.nz/sites/default/files/2024-05/pc-inq-ier-sub-014-infrastructure-nz.pdf',
    href: 'https://www.treasury.govt.nz/sites/default/files/2024-05/pc-inq-ier-sub-014-infrastructure-nz.pdf',
    supports: 'Building material prices in New Zealand have escalated by an average of 45% since 2021.',
  },
  {
    num: 3,
    publisher: 'BRANZ Level / WorkSafe New Zealand',
    title: 'Health and Safety — construction sector injury and fatality statistics 2024',
    url: 'level.org.nz/health-and-safety',
    href: 'https://www.level.org.nz/health-and-safety/',
    supports: '31,200 accepted ACC work-related claims in construction in 2024, representing 15% of all NZ work-related claims. 12 workplace fatalities recorded by WorkSafe (data.worksafe.govt.nz).',
  },
  {
    num: 4,
    publisher: 'BCITO',
    title: '2024 Building People Report',
    url: 'bcito.org.nz/media/documents/2024_BCITO_Building_People.pdf',
    href: 'https://bcito.org.nz/media/documents/2024_BCITO_Building_People.pdf',
    supports: '135 active apprentices enrolled in Frame and Truss qualifications as of December 2024. 32 graduates completed their qualification in 2024. Compared to 9,523 active carpentry apprentices.',
  },
  {
    num: 5,
    publisher: 'MBIE — Building Performance',
    title: 'BuiltReady modular component manufacturer scheme',
    url: 'building.govt.nz/building-code-compliance/product-assurance-and-certification-schemes/builtready',
    href: 'https://www.building.govt.nz/building-code-compliance/product-assurance-and-certification-schemes/builtready',
    supports: 'BuiltReady and NZS3604 compliance obtained independently by each manufacturer. No shared regulatory evidence base. BuiltReady is voluntary; most standard F&T operators continue under NZS3604.',
  },
  {
    num: 6,
    publisher: 'MBIE',
    title: 'National Construction Pipeline Report 2025',
    url: 'mbie.govt.nz/building-and-energy/building/supporting-a-skilled-and-productive-workforce/national-construction-pipeline-report',
    href: 'https://www.mbie.govt.nz/building-and-energy/building/supporting-a-skilled-and-productive-workforce/national-construction-pipeline-report',
    supports: 'Multi-unit dwellings accounted for 53% of building consents in 2024, projected to rise to 56% by 2030. Total of 215,000 dwellings consented over 2025-2030.',
  },
];

export function ReferencesSlide() {
  return (
    <SharedReferencesSlide
      refs={refs}
      subtitle="All statistics cited in this presentation. Numbers correspond to superscripts in the sector slide. All sources accessed June 2026."
    />
  );
}
