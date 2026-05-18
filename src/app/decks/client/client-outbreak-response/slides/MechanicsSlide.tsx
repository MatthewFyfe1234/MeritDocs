import { MechanicsSlide as SharedMechanicsSlide } from '@/components/slides/MechanicsSlide';

export function MechanicsSlide() {
  return (
    <SharedMechanicsSlide
      title="How the Network Is Organised"
      subtitle="Associate organisations execute the process. Every response feeds a shared record. The association refines the playbook from it."
      subNodes={['Response Network', 'Resources', 'Protocol']}
      subNodeSubtexts={['Farm · FADD\nContractors · Lab', undefined, undefined]}
      stackLabel="Outbreak Response"
      supportLabel={['Industry', 'Association']}
      datasetDescription={['Every outbreak,', 'every step, every metric.']}
    />
  );
}
