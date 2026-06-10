import { MechanicsSlide as SharedMechanicsSlide } from '@/components/slides/MechanicsSlide';

export function ProcessModelSlide() {
  return (
    <SharedMechanicsSlide
      title="The Merit Model"
      subtitle="Each job is an execution of a subset of the master specification. Every execution refines it."
      subNodes={['Specification', 'Process', 'Software Tools']}
      stackLabel="Job"
      supportLabel={['Software Vendor', '']}
      datasetTitle={['Field', 'Dataset']}
      datasetDescription={['Every job.', 'Every spec.']}
      labelExecutes="executes"
      labelFeeds="feeds"
      labelInforms="informs"
      labelRefines="refines"
      labelOutput2="informs software design"
      splitOutput
    />
  );
}
