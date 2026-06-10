import { SlideLayout } from '@/components/slides/SlideLayout';
import { BlankSlide } from '@/components/slides/BlankSlide';

export function ScaleSlide() {
  return (
    <SlideLayout title="Scale" subtitle="A meal. A heart operation. A forest fire. A city.">
      <BlankSlide notes={
        <>
          <p>The structure holds at every scale. The parameters change; the logic does not.</p>
          <br />
          <p>A meal: spec is the order, process is the kitchen ecosystem, completion is service. The restaurant itself runs as a parallel maintenance model.</p>
          <br />
          <p>A heart operation: spec is the clinical assessment, process is the surgical and anaesthetic ecosystem, the patient is both the client and the maintained system. Post-operative care is the maintenance model.</p>
          <br />
          <p>A forest fire: desired state is a functioning ecosystem, current state is fire damage, the intervention is the delivery model, ongoing forest management is the maintenance model.</p>
          <br />
          <p>A hospital commissioned by a community pool: the community defines the desired state and priority metrics, the master process for healthcare facility construction is applied against the spec, delivery and ongoing maintenance are both handled within the same framework.</p>
          <br />
          <p>A city's road network: continuous maintenance model, with periodic delivery projects (new roads, major restorations) running within it.</p>
          <br />
          <p>This slide should be visually arresting - a range of examples that demonstrates the scope of the claim without belaboring it. The point is that this is not a construction industry idea or a healthcare idea. It is a universal framework for non-creative product delivery and state maintenance.</p>
        </>
      } />
    </SlideLayout>
  );
}
