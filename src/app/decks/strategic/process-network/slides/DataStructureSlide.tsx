import { SlideLayout } from '@/components/slides/SlideLayout';
import { Formulas, SymbolKey, Tex } from '../parts';

export function DataStructureSlide() {
  return (
    <SlideLayout
      title="A Member's Data"
      subtitle="The static structure: what each step or product carries, before any calculation."
    >
      <div className="flex-1 min-h-0 flex flex-col justify-center" style={{ maxWidth: 1180 }}>
        <Formulas
          rows={[
            { label: "descriptors: properties of what is delivered", tex: "d_1,\\ \\ldots,\\ d_k", num: 2,
              note: <>A member&rsquo;s descriptors <Tex>{"d_i"}</Tex> are describable properties of the thing the process delivers.</> },
            { label: "metrics, recorded against the member", tex: "m(\\cdot) = \\bigl(m_1,\\;\\dots,\\;m_n\\bigr)", num: 3,
              note: <>Any number of metrics can be recorded against the member; <Tex>{"m_j"}</Tex> is one metric&rsquo;s value for it.</> },
          ]}
        />
      </div>

      <SymbolKey
        entries={[
          { sym: "(\\cdot)", def: 'stands for a member: a step s or a product p' },
          { sym: "d_1,\\ \\ldots,\\ d_k", def: "a member's descriptors: properties of what is delivered" },
          { sym: "d_i", def: 'one descriptor' },
          { sym: "m(\\cdot)", def: 'the metrics recorded against a member' },
          { sym: "m_j", def: "metric j's value for the member" },
          { sym: "k,\\ n", def: 'number of descriptors; number of metrics' },
        ]}
      />
    </SlideLayout>
  );
}
