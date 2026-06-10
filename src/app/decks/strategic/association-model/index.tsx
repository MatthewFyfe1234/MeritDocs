import { SlideLayout } from '../../../components/slides/SlideLayout';
import { BlankSlide } from '../../../components/slides/BlankSlide';

function PartiesSlide() {
  return (
    <SlideLayout title="The Parties" subtitle="Five sets of interests to balance">
      <BlankSlide notes={
        <ul className="space-y-3 list-none">
          <li><strong>Matthew / Merit</strong> - ESG, primarily the E. Without transparency, ESG claims are unverifiable - greenwashing and virtue signalling are the consequence. A process decomposable to individual actions is the only credible foundation for bottom-up proof. TAM note: association model limits direct TAM; MLM/referral may be the path to scale.</li>
          <li><strong>Manufacturers</strong> - cost reduction and income growth. Value prop is clear across firm sizes.</li>
          <li><strong>Association (FTMA)</strong> - shared resources where appropriate, neutral broker, lobbying government in the industry's interest.</li>
          <li><strong>Manufacturer A vs B</strong> - competing interests within membership. Larger members may prefer to go it alone. Smaller members need the collective to access capability they cannot justify alone.</li>
          <li><strong>Government</strong> - ESG regulation, procurement standards, supply chain due diligence. An abstraction for now, but the direction of travel is clear.</li>
        </ul>
      } />
    </SlideLayout>
  );
}

function EsgDriverSlide() {
  return (
    <SlideLayout title="The E in ESG" subtitle="Matthew's primary driver">
      <BlankSlide notes={
        <ul className="space-y-3 list-none">
          <li>Without process transparency, ESG claims rest on estimation and assertion. Greenwashing is the inevitable result - not necessarily through bad faith, but through lack of verifiable foundation.</li>
          <li>A process decomposable to individual actions is the only credible basis for bottom-up ESG proof. You know what happened at each step, who did it, what material was used, where it came from.</li>
          <li>This is a fundamentally different quality of evidence from top-down carbon estimation, which is the current norm.</li>
          <li><em>[Personal backstory to be added.]</em></li>
          <li>TAM consideration: the association model does not maximise direct revenue. MLM/referral through association distribution may be the path to scale without direct sales overhead.</li>
        </ul>
      } />
    </SlideLayout>
  );
}

function ProcessInfrastructureSlide() {
  return (
    <SlideLayout title="The Process as Shared Infrastructure" subtitle="RIBA Plan of Work as 80-year precedent">
      <BlankSlide notes={
        <ul className="space-y-3 list-none">
          <li>RIBA's Plan of Work has been the shared delivery language of the construction industry since 1963. Used across thousands of projects, multiple countries, and competing firms. Never considered anti-competitive.</li>
          <li>The saw analogy: a saw manufacturer selling the same saw to two competing manufacturers is not anti-competitive. A shared process is a tool, not a coordination mechanism.</li>
          <li>The QS cost manual: shared reference rates used industry-wide. Each firm applies them independently to their own margins and decisions.</li>
          <li>The line: shared infrastructure is acceptable. Shared behaviour - pricing, wages, market allocation - is not.</li>
          <li>Training, compliance pooling, collective insurance, group procurement, and lobbying with aggregated data all fall on the acceptable side of this line.</li>
        </ul>
      } />
    </SlideLayout>
  );
}

function ChainOfCustodySlide() {
  return (
    <SlideLayout title="Chain of Custody" subtitle="The foundation for verifiable ESG">
      <BlankSlide notes={
        <ul className="space-y-3 list-none">
          <li>COC sits at the intersection of ESG and compliance - traceability of materials, labour conditions at each step, embodied carbon in components.</li>
          <li>GRI, TCFD, and procurement frameworks are increasingly requiring it. Government procurement is moving toward verifiable supply chain standards.</li>
          <li>EU CSDDD (Corporate Sustainability Due Diligence Directive) sets the global direction. NZ tends to follow. Status of NZ supply chain due diligence legislation to be confirmed.</li>
          <li>The argument for FTMA: build this infrastructure collectively now, or have it imposed on the industry badly later. Positions FTMA ahead of regulation - a strong lobbying asset.</li>
          <li>For individual manufacturers: access to contracts requiring ESG proof, better insurance terms, defensible claims to clients and specifiers.</li>
        </ul>
      } />
    </SlideLayout>
  );
}

function AssociationModelSlide() {
  return (
    <SlideLayout title="The Association Model" subtitle="What it can and cannot do">
      <BlankSlide notes={
        <ul className="space-y-3 list-none">
          <li><strong>Can:</strong> shared process model, training framework, document templates, compliance pooling, collective insurance negotiation, group procurement, lobbying with aggregated data.</li>
          <li><strong>Cannot:</strong> set wages across membership (Employment Relations Act), coordinate pricing, allocate markets between members.</li>
          <li><strong>The neutrality constraint:</strong> FTMA cannot endorse individual manufacturers over others. This limits the franchise model - a large member sponsoring the process becomes the de facto standard-setter, which FTMA cannot be seen to promote.</li>
          <li><strong>Alternative governance:</strong> FTMA commissions Merit to build and maintain the industry process model. Larger members have proportional governance input. No single member's name on it. Resolves the endorsement problem but raises a funding question.</li>
        </ul>
      } />
    </SlideLayout>
  );
}

function ManufacturerTensionSlide() {
  return (
    <SlideLayout title="Large vs Small" subtitle="The competing interest within membership">
      <BlankSlide notes={
        <ul className="space-y-3 list-none">
          <li><strong>Small member:</strong> cannot afford to carry full industry overhead alone. Needs collective infrastructure to access capability - process model, training, compliance, estimating - that a larger firm builds internally.</li>
          <li><strong>Large member:</strong> already has internal capability. Incentive to participate in the association model is weaker. May prefer Merit internally only, with no data shared.</li>
          <li><strong>The franchise model:</strong> large member sponsors the process, becomes the industry benchmark - a franchise structure. Resolves the participation incentive but creates an endorsement problem FTMA cannot resolve without compromising its neutrality.</li>
          <li><strong>What might work instead:</strong> governance input proportional to size, contribution to funding proportional to size, but no member branding on shared assets. Same saw sold to all.</li>
        </ul>
      } />
    </SlideLayout>
  );
}

function EsgFrameSlide() {
  return (
    <SlideLayout title="ESG as the Unifying Frame" subtitle="The argument that cuts across all tensions">
      <BlankSlide notes={
        <ul className="space-y-3 list-none">
          <li>ESG - and the E in particular - is neutral ground. No manufacturer can argue against traceability on competitive grounds.</li>
          <li>It serves the government interest in verifiable supply chains. It positions FTMA as a forward-looking industry body rather than a reactive lobby group.</li>
          <li>It resolves the large-vs-small tension: both benefit from defensible ESG claims, regardless of firm size.</li>
          <li>It sidesteps the ERA concern entirely: traceability of process and materials is not wage-setting.</li>
          <li>ESG may be the spine of the argument that makes the association model viable - the shared interest that overcomes the competing commercial sensitivities.</li>
        </ul>
      } />
    </SlideLayout>
  );
}

export const deck = {
  title: 'Association Model: Argument Structure',
  exportFilename: 'Association-Model-Argument.pdf',
  slides: [
    <PartiesSlide key="parties" />,
    <EsgDriverSlide key="esg-driver" />,
    <ProcessInfrastructureSlide key="process-infrastructure" />,
    <ChainOfCustodySlide key="chain-of-custody" />,
    <AssociationModelSlide key="association-model" />,
    <ManufacturerTensionSlide key="manufacturer-tension" />,
    <EsgFrameSlide key="esg-frame" />,
  ],
};
