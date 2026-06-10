import { SlideLayout } from '@/components/slides/SlideLayout';
import { BlankSlide } from '@/components/slides/BlankSlide';

export function WhoSetsGoalsSlide() {
  return (
    <SlideLayout title="Who Sets the Goals" subtitle="The client defines the desired state and its priority ordering">
      <BlankSlide notes={
        <>
          <p>The client - whether an individual, a business, or a pool of community buyers - defines the desired state and specifies their priority ordering across available metrics: speed, quality, carbon, cost, or any other measurable dimension.</p>
          <br />
          <p>This is a richer signal than price alone. Price reveals only willingness-to-pay. A metric priority ordering reveals what the client actually cares about and in what sequence. A client who says "I want a house, and my priorities are carbon first, then quality, then cost" has communicated something that market pricing alone cannot capture.</p>
          <br />
          <p>The pool mechanism extends this to public and collective goods. A community that wants a hospital can form a buying pool and collectively define what the hospital must deliver and in what priority order. No state planning apparatus is required; no market pricing alone either. The preference aggregation happens directly.</p>
          <br />
          <p>This is where the model answers the question Varoufakis always asks of market mechanisms: what about things markets cannot price? The answer is that the metric system allows any dimension of value - including carbon, social equity, or ecological impact - to be named as a priority by the buyer. The market signal is not replaced; it is enriched.</p>
          <br />
          <p>The three-way distinction that the audience will use to locate this model ideologically: if metrics are set by individual clients, the model resembles market socialism - demand-driven, distributed, no central planner. If metrics are set by community pools, it resembles democratic planning - collective preference aggregation without a state apparatus. If metrics are set or controlled by the platform that owns the master process, hierarchy is recreated under a different name and rent extraction returns. Which of these the model becomes depends entirely on who governs the master process - which is why that question is the political question, addressed in the final slide.</p>
          <br />
          <p>The alignment persists through the entire ecosystem, from client spec through process selection through execution and measurement.</p>
          <br />
          <p>Audience note - Richard Murphy: Murphy's entry point is not surplus or coordination but transparency and accountability of flows. His tax justice work is built on the argument that opacity is the mechanism through which value is extracted from communities - and that making flows visible is the structural prerequisite for accountability. The metric and pool system is the same argument applied to production. He will also push back from a statist position: his "Courageous State" argument holds that active public institutions are necessary where communities cannot self-organise. The answer is that the state and the pool mechanism are not mutually exclusive - the state can act as pool organiser for cases where community self-organisation fails or is too slow. This should be acknowledged explicitly rather than left as a gap.</p>
        </>
      } />
    </SlideLayout>
  );
}
