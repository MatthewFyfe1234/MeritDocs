import { MechanicsSlide as SharedMechanicsSlide } from '@/components/slides/MechanicsSlide';

export function MechanicsSlide() {
  return (
    <SharedMechanicsSlide
      title="One Dataset"
      subtitle="Every execution contributes to a single dataset that the whole organisation reads from and improves upon."
      stackLabel="Execution"
      datasetDescription={['One shared picture', 'of the organisation']}
    />
  );
}
