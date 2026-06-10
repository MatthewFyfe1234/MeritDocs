import { MechanicsSlide as SharedMechanicsSlide } from '@/components/slides/MechanicsSlide';

export function ProcessModelSlide() {
  return (
    <SharedMechanicsSlide
      title="The Merit Model"
      subtitle="Each job is an execution of a subset of the master process. Every execution refines it."
      subNodes={['Specification', 'Process', 'Tools & Equipment']}
      stackLabel="Execution"
      supportLabel={['Toolmaker', '']}
      datasetTitle={['Field', 'Dataset']}
      datasetDescription={['Every job.', 'Every tool.']}
      labelExecutes="executes"
      labelFeeds="feeds"
      labelInforms="informs"
      labelRefines="refines"
      labelOutput2="informs tool design"
      splitOutput
    />
  );
}
