import { Lightbulb, UserCheck, Wrench, ClipboardCheck, Coins, ArrowRight } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

const stages = [
  {
    Icon: Lightbulb,
    name: 'Propose',
    description: 'Initiative or workstream identified, scoped, and put to the collective for approval',
    partners: ['Core team', 'Working groups', 'Community members'],
  },
  {
    Icon: UserCheck,
    name: 'Commit',
    description: 'Work allocated or self-assigned by contributors across the network',
    partners: ['Contributors', 'Subgroups', 'External bounties'],
  },
  {
    Icon: Wrench,
    name: 'Execute',
    description: 'Async, distributed delivery across time zones, disciplines, and boundaries',
    partners: ['Contributors', 'Multisig signers', 'Specialists'],
  },
  {
    Icon: ClipboardCheck,
    name: 'Review',
    description: 'Output assessed, progress confirmed, and quality verified before advancement',
    partners: ['Reviewers', 'Working groups', 'Governance bodies'],
  },
  {
    Icon: Coins,
    name: 'Distribute',
    description: 'Rewards, tokens, or equity allocated based on assessed contribution',
    partners: ['Treasury', 'DAO governance', 'Comp. committee'],
  },
];

export function WorkflowSlide() {
  return (
    <SlideLayout
      title="How Decentralised Organisations Deliver"
      subtitle="Five stages. Distributed contributors. No consistent record of who did what."
    >
      {/* Stage cards */}
      <div className="flex-1 min-h-0 flex items-stretch gap-2">
        {stages.map((stage, i) => (
          <div key={stage.name} className="flex items-stretch gap-2 flex-1 min-w-0">
            <div
              className="flex-1 min-w-0 bg-white rounded-lg border flex flex-col p-4 shadow-sm"
              style={{ borderColor: 'var(--slide-border)', borderTop: '3px solid var(--slide-primary)' }}
            >
              {/* Stage header */}
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-md shrink-0" style={{ backgroundColor: 'var(--slide-bg-primary-muted)' }}>
                  <stage.Icon className="w-3.5 h-3.5" style={{ color: 'var(--slide-primary)' }} />
                </div>
                <span className="text-sm font-bold leading-tight" style={{ color: 'var(--slide-primary)' }}>
                  {stage.name}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
                {stage.description}
              </p>

              {/* Partners */}
              <div className="mt-auto">
                <div className="text-xs font-semibold mb-1.5 tracking-wide" style={{ color: 'var(--slide-primary)', opacity: 0.55 }}>
                  PARTICIPANTS
                </div>
                <div className="flex flex-col gap-1">
                  {stage.partners.map((p) => (
                    <span
                      key={p}
                      className="rounded px-1.5 py-0.5 text-xs"
                      style={{ backgroundColor: 'var(--slide-bg)', color: '#5a6a75', border: '1px solid #dde4e8' }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Connector arrow */}
            {i < stages.length - 1 && (
              <div className="shrink-0 flex items-center justify-center" style={{ width: '20px' }}>
                <ArrowRight className="w-4 h-4" style={{ color: 'var(--slide-primary)', opacity: 0.3 }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Insight callout */}
      <div
        className="shrink-0 mt-4 rounded-lg p-3"
        style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}
      >
        <p className="text-xs font-medium" style={{ color: 'var(--slide-primary)' }}>
          <span style={{ color: 'var(--slide-accent)', fontWeight: 700 }}>The contribution gap: </span>
          Work happens across every stage, often asynchronously and without a central record. When reward time comes, allocation is based on visibility and relationships, not what was actually delivered. The organisation resets with every cohort change.
        </p>
      </div>
    </SlideLayout>
  );
}
