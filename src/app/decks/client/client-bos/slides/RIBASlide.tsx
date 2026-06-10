import { SlideLayout } from '@/components/slides/SlideLayout';

const shortcomings = [
  {
    heading: 'No feedback loop',
    body: 'Stage M - Feedback was removed from the Plan of Works in 1972. Only 19% of practices now offer post-occupancy evaluation. RIBA\'s own president stated in 2019 that housing development takes place "largely in the absence of a comprehensive system for establishing performance in terms of standard setting, testing or feedback in use."',
  },
  {
    heading: 'Adopted in aspiration, not in practice',
    body: 'Six months after the 2013 update, only 46% of professionals had adopted it and 70% were not being asked to use it when bidding for projects. Practitioners were direct: "The Plan of Work is not on the radar of our typical client." A 2017 ACA survey found 52% had more problems with the updated version than the original.',
  },
  {
    heading: 'Specialists engaged too late',
    body: 'Stage 4 is repeatedly identified as a bottleneck. Technical design only commences at this stage, and the people involved earlier are unlikely to have done preliminary technical design - they don\'t go on to participate in the subsequent detailing. By the time a manufacturer is consulted, it may be too late for them to offer a solution that the project would benefit from.',
  },
  {
    heading: 'Project-bound',
    body: 'As Sam Hayes noted commenting on the RIBA Engagement Overlay, "the Plan of Works has its limitations, it is project bound." There is no mechanism to aggregate learning across projects. Without structured post-occupancy data, the RIBA itself acknowledged, the industry has been "lagging far behind almost all other aspects of consumption."',
  },
];

export function RIBASlide() {
  return (
    <SlideLayout title="A Foundation for Transparency" subtitle="RIBA laid the groundwork. The build was abandoned at Stage M.">
      <div className="flex-1 min-h-0 flex flex-col gap-4">

        <div
          className="shrink-0 rounded-lg px-5 py-4"
          style={{ backgroundColor: 'var(--slide-bg-muted)', borderLeft: '4px solid var(--slide-border)' }}
        >
          <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
            The RIBA Plan of Works gave construction a shared framework for governing projects. NHS England calls it an industry-standard methodology. Every professional in the room knows it. As an analog for what a process standard can achieve, it is the right reference point, but it has structural limitations that Merit is positioned to resolve.
          </p>
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-3">
          {shortcomings.map((s) => (
            <div
              key={s.heading}
              className="bg-white rounded-lg border p-4 flex flex-col shadow-sm"
              style={{ borderColor: 'var(--slide-border)' }}
            >
              <p className="text-sm font-bold mb-2" style={{ color: 'var(--slide-primary)' }}>{s.heading}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>{s.body}</p>
            </div>
          ))}
        </div>

      </div>
    </SlideLayout>
  );
}
