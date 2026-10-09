import { SlideLayout } from '@/components/slides/SlideLayout';

const groups: { label: string; items: string[]; note?: string }[] = [
  {
    label: 'Leave',
    items: [
      'Leave requests and approvals tracked against capacity',
      'Conflicts with project commitments surfaced before they become a problem',
    ],
    note: 'Employment Leave Bill (introduced 2026): switches to hours-based accrual from day one. The platform tracks leave against actual hours worked.',
  },
  {
    label: 'Training',
    items: [
      'Training materials anchored to the relevant process or task',
      'Employees can request training against a specific gap or certification',
      'Certification and compliance deadlines tracked per person',
      'Training schedules planned without creating capacity gaps',
    ],
    note: 'Identifies where people need support - creating a record of development, not a case for dismissal. Directly supports ERA good faith obligations around performance management.',
  },
  {
    label: 'Resource Allocation',
    items: [
      'People, tools, and materials allocated to jobs from a single view',
      'Availability calendar across the whole workforce',
      'Allocation conflicts surfaced before they affect delivery',
    ],
  },
  {
    label: 'Document Management',
    items: [
      'Employee records: qualifications, certifications, history',
      'Tool records: service history, calibration, ownership',
      'Material records: datasheets, compliance, supplier',
      'Process and project documents: procedures, specs, sign-offs',
    ],
    note: 'HSWA Amendment Act (Nov 2026): critical risk governance requires auditable records of training, certification, and safety procedures for scheduled hazards.',
  },
];

export function WorkforceSlide() {
  return (
    <SlideLayout
      title="Workforce Management"
      subtitle="Operational tools for running the organisation day-to-day"
    >
      <div
        className="flex-1 min-h-0 grid gap-x-8 gap-y-5"
        style={{ gridTemplateColumns: '1fr 1fr', alignContent: 'start' }}
      >
        {groups.map(({ label, items, note }) => (
          <div key={label} className="flex flex-col gap-2">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--slide-primary)', opacity: 0.7 }}
            >
              {label}
            </span>
            <div
              className="flex flex-col gap-1.5"
              style={{ borderTop: '1px solid var(--slide-border-primary)', paddingTop: '0.5rem' }}
            >
              {items.map((item) => (
                <div key={item} className="flex gap-2 items-start">
                  <span
                    className="shrink-0 mt-1"
                    style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'var(--slide-accent)', opacity: 0.6, display: 'inline-block' }}
                  />
                  <span className="text-xs leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.7 }}>
                    {item}
                  </span>
                </div>
              ))}
              {note && (
                <p className="text-xs leading-snug italic mt-1" style={{ color: 'var(--slide-text)', opacity: 0.45 }}>
                  {note}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
