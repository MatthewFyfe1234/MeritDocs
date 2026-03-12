import { ReferencesSlide as SharedReferencesSlide, Ref } from '@/components/slides/ReferencesSlide';

const refs: Ref[] = [
  {
    num: 1,
    publisher: 'Harvard Business School Online',
    title: 'The Advantages of Data-Driven Decision-Making',
    url: 'online.hbs.edu/blog/post/data-driven-decision-making',
    href: 'https://online.hbs.edu/blog/post/data-driven-decision-making',
    supports: 'Data-driven organisations consistently outperform intuition-driven peers',
  },
  {
    num: 2,
    publisher: 'PMI',
    title: 'Pulse of the Profession 2025',
    url: 'pmi.org/learning/thought-leadership/boosting-business-acumen',
    href: 'https://www.pmi.org/learning/thought-leadership/boosting-business-acumen',
    supports: '"Static project plans in a dynamic system are a form of denial"; consistent failure to meet objectives',
  },
  {
    num: 3,
    publisher: 'GPM Global / Dr. Joel Carboni',
    title: 'Sustainable Project Management',
    url: 'gpm.org',
    href: 'https://www.gpm.org',
    supports: '"Static project plans in a dynamic system are a form of denial"',
  },
  {
    num: 4,
    publisher: 'Deloitte Insights',
    title: 'Build, Nurture, and Measure Stakeholder Trust',
    url: 'deloitte.com/us/en/insights/topics/leadership/build-nurture-measure-stakeholder-trust.html',
    href: 'https://www.deloitte.com/us/en/insights/topics/leadership/build-nurture-measure-stakeholder-trust.html',
    supports: 'Trustworthy, transparent organisations outperform competitors by up to 4× by market value',
  },
  {
    num: 5,
    publisher: 'Positive Results',
    title: "The Hidden Cost of Manual Tasks: Why Mid-Sized Businesses Can't Afford to Ignore AI Automation",
    url: 'positiveresults.com/blog/technology/the-hidden-cost-of-manual-tasks',
    href: 'https://positiveresults.com/blog/technology/the-hidden-cost-of-manual-tasks/',
    supports: 'Employees spend 3–4 hrs/day on repetitive, automatable manual tasks',
  },
  {
    num: 6,
    publisher: "Wolf's Edge Integrators",
    title: 'Single Points of Failure: How to Eliminate Them',
    url: 'wolfsedgeintegrators.com/single-points-of-failure',
    href: 'https://wolfsedgeintegrators.com/single-points-of-failure/',
    supports: '"Replacing a person is usually easier than replacing what they know"',
  },
  {
    num: 7,
    publisher: 'Shi & Van Triest',
    title: 'Subjectivity in performance evaluation and its consequences',
    url: 'tandfonline.com/journals/rabr20',
    href: 'https://www.tandfonline.com/journals/rabr20',
    supports: '75% average weight placed on subjective impressions in employee performance evaluations',
  },
  {
    num: 8,
    publisher: 'Cherry Bekaert (citing IDC)',
    title: 'The Cost of Data Silos: Why CRM-ERP Integration Matters',
    url: 'cbh.com/insights/articles/the-cost-of-data-silos-why-crm-erp-integration-matters',
    href: 'https://www.cbh.com/insights/articles/the-cost-of-data-silos-why-crm-erp-integration-matters/',
    supports: 'Companies lose 20–30% of revenue to inefficiencies caused by data silos (IDC)',
  },
  {
    num: 9,
    publisher: 'Initus',
    title: 'The Hidden Costs of Data Silos in Mid-Market CRMs and ERPs',
    url: 'initus.io/blog/integration/the-hidden-costs-of-data-silos-crm-erp-integration',
    href: 'https://initus.io/blog/integration/the-hidden-costs-of-data-silos-crm-erp-integration/',
    supports: '"When systems don\'t share data automatically, an employee becomes the indispensable human translator"',
  },
];

export function ReferencesSlide() {
  return (
    <SharedReferencesSlide
      refs={refs}
      subtitle="Statistics and quotes cited in this presentation. Numbers correspond to superscripts throughout the deck. All sources accessed February 2026."
      showSupports
    />
  );
}
