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
    publisher: 'Socio-Economic Review — Vallas & Schor (2024)',
    title: 'Silicon law of oligarchy: patterns of member participation in platform cooperatives',
    url: 'research-portal.uu.nl/ws/files/236328782/mwad058.pdf',
    href: 'https://research-portal.uu.nl/ws/files/236328782/mwad058.pdf',
    supports: 'Platform cooperative research: only 19.1% of members participate in any governance decision; affective commitment is the primary driver (2.2% at low commitment to 50% at high); size alone does not determine oligarchy. Note: findings are platform-cooperative specific and may not transfer directly to traditional worker cooperatives',
  },
  {
    num: 3,
    publisher: 'Robin Dunbar, British Journal of Social Psychology',
    title: 'Neocortex size as a constraint on group size in primates - and the derived model of human social group structure',
    url: 'bps.org.uk/publications/british-journal-social-psychology',
    href: 'https://doi.org/10.1111/j.2044-8309.1992.tb00984.x',
    supports: 'The sympathy group - typically 12-15 people - represents the upper limit of close mutual accountability sustained by informal social ties alone. Beyond it, formal structure is required to replace what relationships can no longer carry',
  },
  {
    num: 4,
    publisher: 'Economic and Industrial Democracy — Cornforth (1995)',
    title: 'Patterns of cooperative management: beyond the degeneration thesis',
    url: 'journals.sagepub.com/doi/10.1177/0143831X9501600304',
    href: 'https://doi.org/10.1177/0143831X9501600304',
    supports: 'Case study of the Suma cooperative: democratic participation and decision quality measurably declined beyond 15-20 members. Case-based finding rather than large-sample, consistent with the broader literature on group cognitive limits',
  },
  {
    num: 5,
    publisher: 'Journal of Agricultural and Resource Economics — Giannakas, Fulton & Sesmero (2016)',
    title: 'Horizon and Free-Rider Problems in Cooperative Organizations',
    url: 'ageconsearch.umn.edu/record/246170/files/JARE_September2016__2_Giannakis_372-392.pdf',
    href: 'https://ageconsearch.umn.edu/record/246170/files/JARE_September2016__2_Giannakis_372-392.pdf',
    supports: 'Horizon problem: members underinvest in long-term projects whose returns fall outside their expected tenure; portfolio problem: wealth concentrated in one firm drives conservative strategy; surplus distribution disputes accelerate both',
  },
  {
    num: 6,
    publisher: 'Business Ethics Quarterly — Frémeaux, Mercier & Grevin (2024)',
    title: 'The Free-Riding Issue in Contemporary Organizations: Lessons from the Common Good Perspective',
    url: 'researchgate.net/publication/379273968_The_Free-Riding_Issue_in_Contemporary_Organizations',
    href: 'https://www.researchgate.net/publication/379273968_The_Free-Riding_Issue_in_Contemporary_Organizations_Lessons_from_the_Common_Good_Perspective',
    supports: 'Free-riding increases with group size; individuals reduce effort when contribution visibility is low and mutual obligation is unclear; diffusion of responsibility replaces the informal social pressure that sustains accountability in small groups',
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
