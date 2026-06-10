import { SlideLayout } from '@/components/slides/SlideLayout';
import { BlankSlide } from '@/components/slides/BlankSlide';

export function TransitionSlide() {
  return (
    <SlideLayout title="The Transition" subtitle="Many paths. One direction.">
      <BlankSlide notes={
        <>
          <p>The model does not require a clean break from the existing system. It grows within and alongside existing capitalist structures, using them as incubators, then superseding them. The transition is not a revolution - it is a displacement, of the kind that has happened repeatedly in the history of knowledge production.</p>
          <br />
          <p>Phase one - implementation within existing organisations. The master process is first built inside an organisation that has the expertise, the data, and the commercial incentive to formalise it. It is bounded by that organisation's ecosystem. The organisation becomes the vendor of process - offering it to downstream players and competitors as a service. This is a straightforward commercial proposition: the organisation that owns the master process has a structural advantage over those that don't.</p>
          <br />
          <p>Phase two - the monopoly. One organisation effectively monopolises process in its ecosystem. Others must either adopt its process, build their own, or operate at a disadvantage. This is not a post-capitalist phase - it is capitalism using the model for competitive advantage. But it is also the phase in which the master process gets built, refined, and proven across real projects.</p>
          <br />
          <p>Phase three - the open source disruption. A crowd-sourced version of the master process emerges - built collaboratively, accessible to anyone, ungoverned by any single entity. The proprietary advantage of the monopoly organisation collapses. It is blindsided by the same dynamic that displaced proprietary software: a commons-produced alternative that is as good or better and costs nothing to access.</p>
          <br />
          <p>Phase four - liquidation or resistance. The organisation either contributes its process knowledge and physical assets to the commons pool - effectively dissolving into the ecosystem - or resists and attempts to maintain proprietary advantage. Resistance is likely a losing position over time, for the same reason proprietary software lost ground to open source: quality, accessibility, and network effects favour the commons.</p>
          <br />
          <p>The capital question resolves through this process. Existing organisations bring physical assets - factories, equipment, infrastructure - into the ecosystem during the transition. The ecosystem levy mechanism then governs their maintenance and eventual replacement. Assets that survive the transition become commons infrastructure. Assets that don't depreciate out.</p>
          <br />
          <p>There are many paths through this transition. The sequence above is one. Others involve state actors commissioning open master processes directly, buying pools demanding process transparency from suppliers and catalysing it, or multiple organisations collaborating on a shared process from the outset. The direction is consistent across all of them. The endpoint is the same.</p>
        </>
      } />
    </SlideLayout>
  );
}
