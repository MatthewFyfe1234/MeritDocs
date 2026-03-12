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
    title: 'Pulse of the Profession 2017',
    url: 'pmi.org/learning/thought-leadership/pulse/pulse-of-the-profession-2017',
    href: 'https://www.pmi.org/-/media/pmi/documents/public/pdf/learning/thought-leadership/pulse/pulse-of-the-profession-2017.pdf',
    supports: '$97M wasted per $1 billion invested due to poor project performance',
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
    publisher: 'Shi & Van Triest / University of Amsterdam',
    title: 'What determines managers\' use of subjective performance information?',
    url: 'abs.uva.nl/content/sections/accounting/amsterdam-accounting-impact-centre-aaic/research-insights/how-important-is-subjectivity-in-evaluating-employees.html',
    href: 'https://abs.uva.nl/content/sections/accounting/amsterdam-accounting-impact-centre-aaic/research-insights/how-important-is-subjectivity-in-evaluating-employees.html',
    supports: '75% of evaluation weight is subjective: 47% manager impressions, 28% co-workers and clients',
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
  {
    num: 10,
    publisher: 'McKinsey & Company',
    title: 'Ahead of the Curve: The Future of Performance Management',
    url: 'mckinsey.com/capabilities/people-and-organizational-performance/our-insights/ahead-of-the-curve-the-future-of-performance-management',
    href: 'https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/ahead-of-the-curve-the-future-of-performance-management',
    supports: '"Managers and staff alike too often view performance management as time consuming, excessively subjective, demotivating, and ultimately unhelpful."',
  },
  {
    num: 11,
    publisher: 'W. Edwards Deming (citing Lloyd S. Nelson)',
    title: 'Out of the Crisis',
    url: 'deming.org/unknown-and-unknowable-data',
    href: 'https://deming.org/unknown-and-unknowable-data/',
    supports: '"The most important figures that one needs for management are unknown or unknowable, but successful management must nevertheless take account of them."',
  },
  {
    num: 12,
    publisher: 'Rob Lambert / Cultivated Management',
    title: 'Watermelon Reporting: When Project Status Hides the Truth',
    url: 'cultivatedmanagement.com/watermelon-reporting',
    href: 'https://www.cultivatedmanagement.com/watermelon-reporting/',
    supports: '"Green doesn\'t mean healthy. It means \'no one wants to say otherwise.\'"',
  },
  {
    num: 13,
    publisher: 'Peter Senge / MIT Sloan Management Review',
    title: 'The Leader\'s New Work: Building Learning Organizations',
    url: 'sloanreview.mit.edu/article/the-leaders-new-work-building-learning-organizations',
    href: 'https://sloanreview.mit.edu/article/the-leaders-new-work-building-learning-organizations/',
    supports: '"It borders on dereliction that organizations invest so few resources in studying what has succeeded and failed in past strategies, operational changes, and leadership approaches."',
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
