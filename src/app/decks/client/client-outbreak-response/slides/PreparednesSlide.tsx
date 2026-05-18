import { FolderCheck, RefreshCw } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

const docControls = [
  { label: 'Farm layout', detail: 'Current site map, building locations, and access points' },
  { label: 'Animal inventory', detail: 'Current count, species, age cohorts, and housing locations' },
  { label: 'Biosecurity protocol', detail: 'Current version, last reviewed, sign-off recorded' },
  { label: 'Personnel certifications', detail: 'Expiry dates tracked; renewal gates built into the system' },
  { label: 'Third-party access records', detail: 'Contractor visit logs, delivery records, equipment movements' },
];

const iterationSteps = [
  { label: 'Response runs against the current playbook', detail: 'Every stage gate executed and timestamped against the live process version' },
  { label: 'Gaps and delays are recorded in context', detail: 'Where a stage stalled, why, and what was missing - captured at the point of occurrence, not reconstructed after' },
  { label: 'Changes reviewed and committed', detail: 'The association updates the playbook based on what the response surfaced; version history is maintained' },
  { label: 'Next response runs against an improved version', detail: 'Each outbreak improves the protocol for the next. Knowledge is institutional, not individual' },
];

export function PreparednesSlide() {
  return (
    <SlideLayout
      title="Preparedness Is Always Current"
      subtitle="Document control keeps the supporting records current. The master process keeps the playbook current. The system enforces both."
    >
      <div className="flex-1 min-h-0 grid grid-cols-2 gap-6">

        {/* Left: Document control */}
        <div className="flex flex-col gap-3 min-h-0">
          <div className="flex items-center gap-2 shrink-0">
            <div className="p-1.5 rounded-md" style={{ backgroundColor: 'var(--slide-bg-primary-muted)' }}>
              <FolderCheck className="w-4 h-4" style={{ color: 'var(--slide-primary)' }} />
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: 'var(--slide-primary)' }}>Document Control at the Org Level</div>
              <div className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>Quarterly or bi-annual reconfirmation required before records remain valid</div>
            </div>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-2">
            {docControls.map((item) => (
              <div
                key={item.label}
                className="rounded-lg px-3 py-2.5 flex items-start gap-3 bg-white border shadow-sm"
                style={{ borderColor: 'var(--slide-border)', borderLeft: '3px solid var(--slide-primary)' }}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold" style={{ color: 'var(--slide-primary)' }}>{item.label}</div>
                  <div className="text-xs mt-0.5 leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Process iteration */}
        <div className="flex flex-col gap-3 min-h-0">
          <div className="flex items-center gap-2 shrink-0">
            <div className="p-1.5 rounded-md" style={{ backgroundColor: 'var(--slide-bg-primary-muted)' }}>
              <RefreshCw className="w-4 h-4" style={{ color: 'var(--slide-primary)' }} />
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: 'var(--slide-primary)' }}>The Improvement Loop</div>
              <div className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>Each response improves the playbook for the next; the process is never static</div>
            </div>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-2">
            {iterationSteps.map((item, i) => (
              <div
                key={item.label}
                className="rounded-lg px-3 py-2.5 flex items-start gap-3 bg-white border shadow-sm"
                style={{ borderColor: 'var(--slide-border)', borderLeft: '3px solid var(--slide-accent)' }}
              >
                <span
                  className="shrink-0 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5"
                  style={{ backgroundColor: 'var(--slide-bg-accent-muted)', color: 'var(--slide-accent)', fontSize: '0.6rem' }}
                >
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold" style={{ color: 'var(--slide-primary)' }}>{item.label}</div>
                  <div className="text-xs mt-0.5 leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div
        className="shrink-0 mt-4 rounded-lg p-3"
        style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}
      >
        <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--slide-primary)' }}>
          <span style={{ color: 'var(--slide-accent)', fontWeight: 700 }}>When an outbreak hits: </span>
          the appraisal already has current inventory, the auditor already has a current protocol, and indemnity eligibility is established before the first phone call is made. The 67 US premises infected twice under the old indemnity rules (2022-2025) shared one thing in common - their preparedness layer was not verified.
        </p>
      </div>
    </SlideLayout>
  );
}
