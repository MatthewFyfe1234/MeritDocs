import { Formulas, P, SymbolKey, Tex } from '../parts';
import { SlideLayout } from '@/components/slides/SlideLayout';

export function LocalContributionSlide() {
  return (
    <SlideLayout
      title="Local Contribution"
      subtitle="How one metric's local value is computed from a member's descriptors."
    >
      <div className="flex-1 min-h-0 flex flex-row gap-10 items-center">
        <Formulas
          rows={[
            { label: "a step's magnitude", tex: "m(s) = \\sum_i f_i\\bigl(d_i(s)\\bigr)", num: 4 },
            { label: "a product's magnitude", tex: "m(p) = \\sum_i f_i\\bigl(d_i(p)\\bigr)", num: 5 },
          ]}
        />
        <div className="flex flex-col gap-3" style={{ maxWidth: 560 }}>
          <P>
            Each descriptor <Tex>{"d_i"}</Tex> feeds in through a <b>contribution function</b> <Tex>{"f_i"}</Tex>,
            and the member&rsquo;s <b>magnitude</b> <Tex>{"m"}</Tex> is their sum.
          </P>
          <P>
            This is <b>local</b>: it uses only the member&rsquo;s own descriptors, not where it sits in the graph.
          </P>
        </div>
      </div>
      <SymbolKey
        entries={[
          { sym: "m(\\cdot)", def: 'magnitude, local value for one metric' },
          { sym: "s,\\; p", def: 'a step, a product' },
          { sym: "d_i", def: 'one descriptor (slide 2)' },
          { sym: "f_i", def: 'contribution function for descriptor i' },
          { sym: "\\textstyle\\sum_i", def: 'sum over the descriptors' },
        ]}
      />
    </SlideLayout>
  );
}
