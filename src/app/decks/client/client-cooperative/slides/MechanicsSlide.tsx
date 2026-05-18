import { MechanicsSlide as SharedMechanicsSlide } from '@/components/slides/MechanicsSlide';

export function MechanicsSlide() {
  return (
    <SharedMechanicsSlide
      subtitle="Every project contributes to a single dataset that the whole cooperative reads from and improves upon."
      stackLabel="Execution"
      datasetDescription={['One shared picture', 'of the cooperative']}
    />
  );
}
