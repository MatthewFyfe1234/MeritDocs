import { SlideLayout } from '@/components/slides/SlideLayout';
import { Formulas, SymbolKey } from '../parts';

export function GeneralFormSlide() {
  return (
    <SlideLayout
      title="The General Form"
      subtitle="Each metric is aggregated through the graph with its own operators, then a readout combines them into the answer you want."
    >
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-4" style={{ maxWidth: 1180 }}>
        <Formulas
          rows={[
            { label: "magnitude, per metric j", tex: "m_j(\\cdot) = \\sum_i f_{ij}\\bigl(d_i(\\cdot)\\bigr)", num: 8,
              note: "A member's local value for metric j: its descriptors' contributions, summed." },
            { label: "accumulate a product (one source)", tex: "X_j(p) = X_j(\\mathrm{src}\\,p)\\;\\otimes_j\\;m_j(p)", num: 9,
              note: "A product takes its source step's accumulated value, extended by the product itself." },
            { label: "accumulate a step (many incoming)", tex: "X_j(s) = \\Bigl(\\,\\bigoplus\\nolimits_{p\\,\\in\\,\\mathrm{in}(s)} X_j(p)\\Bigr)\\;\\otimes_j\\;m_j(s)", num: 10,
              note: "A step merges the values of its incoming products, then extends by the step itself." },
            { label: "read out a derived metric", tex: "y = g\\bigl(X_1,\\;\\dots,\\;X_n\\bigr)", num: 11,
              note: "Combine the accumulated metrics into the answer you want." },
          ]}
        />
      </div>

      <SymbolKey
        entries={[
          { sym: "(\\cdot)", def: 'stands for a member (a step or product)' },
          { sym: "s,\\; p", def: 'a step, a product' },
          { sym: "d_i,\\ f_{ij}", def: 'a descriptor; its contribution to metric j' },
          { sym: "\\textstyle\\sum_i", def: 'sum over the descriptors' },
          { sym: "m_j", def: "metric j's local magnitude" },
          { sym: "X_j", def: 'metric j accumulated forward, up to this point' },
          { sym: "\\mathrm{src}\\,p,\\ \\mathrm{in}(s),\\ \\in", def: 'source step; products into s; membership' },
          { sym: "\\textstyle\\bigoplus,\\ \\otimes_j", def: 'merge, extend (per metric)' },
          { sym: "g,\\ y", def: 'readout; the derived metric value' },
          { sym: "n", def: 'number of metrics' },
        ]}
      />
    </SlideLayout>
  );
}
