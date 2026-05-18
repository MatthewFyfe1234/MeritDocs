import { MechanicsSlide as SharedMechanicsSlide } from '@/components/slides/MechanicsSlide';

export function MechanicsSlide() {
  return (
    <SharedMechanicsSlide
      title="One Dataset"
      subtitle="Every project contributes to a single dataset. Every function reads from it. The organisation gets smarter with each job completed."
      stackLabel="Execution"
      datasetDescription={['One shared picture', 'of the operation']}
    />
  );
}
