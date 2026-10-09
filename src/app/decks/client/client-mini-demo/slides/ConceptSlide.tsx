import { MechanicsSlide as SharedMechanicsSlide } from '@/components/slides/MechanicsSlide';

export function ConceptSlide() {
  return (
    <SharedMechanicsSlide
      title="A Process Layer Under Your Whole Operation"
      subtitle="Every project runs against one connected model. Every support function reads from the same picture."
      subNodeSubtexts={['(may include\nsite team)', undefined, undefined]}
      supportSubtext="(Ops, HR, Stock)"
    />
  );
}
