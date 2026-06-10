import { SlideLayout } from '@/components/slides/SlideLayout';
import { BlankSlide } from '@/components/slides/BlankSlide';

export function IncentiveAlignmentSlide() {
  return (
    <SlideLayout title="Incentive Alignment" subtitle="The proxy between reward and outcome disappears">
      <BlankSlide notes={
        <>
          <p>The system selects executors by their track record against the specific metrics the client has defined. Compensation is directly proportionate to performance against those metrics. There is no career ladder to climb, no subjective performance review, no managerial discretion over reward.</p>
          <br />
          <p>In current systems, money is a proxy for value - but a lossy one. Workers optimise for what gets them paid, which is rarely identical to the actual outcome. Management exists largely to close that gap. But management has the same misalignment one level up, optimising for its own position. The whole hierarchy is a stack of misaligned proxies.</p>
          <br />
          <p>This model collapses the proxy. The metric is the goal, and compensation is the metric. Workers are not incentivised by money as a primary driver - they are incentivised to deliver on the pursued metrics, in the knowledge that compensation will follow proportionately.</p>
          <br />
          <p>Research on intrinsic vs. extrinsic motivation (Deci and Ryan's self-determination theory) consistently shows that monetary incentives used as the primary driver crowd out intrinsic motivation. When people are oriented toward outcomes rather than rewards, both performance and satisfaction improve. This model does not eliminate compensation - it makes compensation a consequence of good work rather than the goal of it.</p>
          <br />
          <p>This also resolves the principal-agent problem at the heart of firm theory: the gap between what the principal wants and what the agent does. When the metric IS the goal and compensation IS the metric, the gap structurally cannot exist.</p>
        </>
      } />
    </SlideLayout>
  );
}
