import { SlideLayout } from '@/components/slides/SlideLayout';
import { BlankSlide } from '@/components/slides/BlankSlide';

export function WhatDisappearsSlide() {
  return (
    <SlideLayout title="What the Process Replaces" subtitle="Overhead that exists to close gaps the process eliminates">
      <BlankSlide notes={
        <>
          <p>Management exists to coordinate behaviour and align incentives in the presence of information gaps and misaligned proxies. The process and metric system eliminate both. The point is not just that management disappears - it is that the reason management exists disappears. This is the precise argument: the process removes the conditions that made management necessary, not just the management layer itself. That distinction matters for the audience, because it means the removal is structural, not ideological.</p>
          <br />
          <p>Recruitment exists because the right people are hard to find and their capability is hard to verify in advance. Track records against defined metrics remove the opacity. The system knows who has delivered against which metrics across the entire ecosystem. Selection becomes a query, not a process.</p>
          <br />
          <p>B2B marketing exists because buyers cannot objectively evaluate sellers. The information asymmetry is the product marketing is selling. The selection mechanism - based on verified ecosystem performance data - makes it redundant. There is nothing to market because there is nothing to obscure.</p>
          <br />
          <p>Greenwashing exists because there is no transparency around where carbon actually goes. It is not primarily a moral failure - it is an information failure. Producers cannot be held to carbon claims they make because no system exists to verify them at the level of individual projects, materials, and processes. The master process eliminates that condition: carbon is a measured metric at every execution step, not a headline figure applied retrospectively. A producer cannot claim carbon performance they have not delivered, because the delivery is the record. This matters beyond commercial fairness - it is one of the few concrete mechanisms by which systemic carbon accountability becomes possible.</p>
          <br />
          <p>The brand premium, the relationship premium, the management premium, the recruitment premium - these are all rents extracted from information asymmetry. The process, the master process, and the ecosystem data remove the asymmetry. The rents disappear with it.</p>
          <br />
          <p>This is not just an efficiency argument. It is a political economy argument: the surplus currently captured by these functions flows instead to the people who do the actual work.</p>
          <br />
          <p>The unifying thread across all of this is transparency of delivery. Every redundancy in the current system - management, recruitment, B2B marketing, greenwashing - exists because delivery is opaque. Nobody can see clearly what was done, by whom, to what standard, at what carbon cost. The system exploits that opacity. The master process removes it: delivery is recorded, measurable, and visible at every step. You cannot extract rent from a gap that does not exist. This is the argument that connects most directly to Richard Murphy - who has spent his career making the same case about financial flows.</p>
        </>
      } />
    </SlideLayout>
  );
}
