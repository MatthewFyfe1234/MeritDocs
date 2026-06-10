import { SlideLayout } from '@/components/slides/SlideLayout';
import { BlankSlide } from '@/components/slides/BlankSlide';

export function EconomicModelSlide() {
  return (
    <SlideLayout title="The Economic Model" subtitle="Surplus flows to executors. No organisation required.">
      <BlankSlide notes={
        <>
          <p>In this model, surplus flows to the people who execute the work - not to capital owners, managers, or intermediaries. The process coordinates. The metrics align. The track record selects. None of these functions require a persistent organisational entity to perform them.</p>
          <br />
          <p>This is not a more efficient firm. It is the replacement of the firm as the coordinating unit of production. The firm's three functions - coordination, incentive alignment, and selection - are each performed more effectively by the system.</p>
          <br />
          <p>The model is also not state planning. The desired states are set by clients and communities, not by central planners. The selection and delivery mechanisms are distributed and data-driven, not administered. It avoids the two failure modes that have defined the 20th century debate: market rent extraction on one side, planning inefficiency on the other.</p>
          <br />
          <p>The critical unresolved political question - flagged for the audience and addressed in the final slide - is who owns the master process. If the master process is held as a public good or commons, the model is genuinely post-capitalist. If it is held by a platform, it recreates hierarchy under a different name. The model makes this question unavoidable and precise.</p>
          <br />
          <p>This connects directly to Wolff: the question is not just who owns the means of production, but who owns the knowledge of how to use them optimally. The master process is that knowledge, formalised.</p>
        </>
      } />
    </SlideLayout>
  );
}
