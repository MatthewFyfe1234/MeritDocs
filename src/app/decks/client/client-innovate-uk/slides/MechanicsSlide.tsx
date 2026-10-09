import { MechanicsSlide as SharedMechanicsSlide } from '@/components/slides/MechanicsSlide';

export function MechanicsSlide() {
  return (
    <SharedMechanicsSlide
      title="One Dataset"
      subtitle="Every project contributes to a single dataset. Every function reads from it. The organisation gets smarter with each job completed."
      stackLabel="Execution"
      datasetDescription={['One shared picture', 'of the operation']}
      pillarNote="A project, to us: a meal served, a crop cycle, a car built on the line, an operation in theatre. Any specified unit of work, in any sector."
    />
  );
}
