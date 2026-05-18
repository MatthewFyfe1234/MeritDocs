import { MechanicsSlide as SharedMechanicsSlide } from '@/components/slides/MechanicsSlide';

export function ProcessModelSlide() {
  return (
    <SharedMechanicsSlide
      title="The Process Model"
      subtitle="The refuse round on the previous slide is a single Execution. Every job produces one. They accumulate into the operational dataset that makes every future forecast more accurate and every future contract less of a bet."
      subNodes={['Specification', 'Process', 'Vehicles & Equipment']}
      stackLabel="Execution"
      supportLabel={['Manufacturer', '']}
      datasetTitle={['Field', 'Dataset']}
      datasetDescription={['Every job.', 'Every asset.']}
      labelExecutes="executes"
      labelFeeds="feeds"
      labelInforms="informs"
      labelRefines="refines"
      labelOutput2="informs vehicle design"
      splitOutput
      viewBoxMinY={-26}
    />
  );
}
