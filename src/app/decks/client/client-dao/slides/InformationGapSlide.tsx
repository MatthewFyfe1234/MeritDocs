import { GitBranch, Users, Package } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

const domains = [
  { Icon: GitBranch, label: 'Process', detail: 'Stage gates define completion. No judgment call required.' },
  { Icon: Users, label: 'People', detail: 'Every output attributed to the member who produced it.' },
  { Icon: Package, label: 'Inventory', detail: 'Materials and resources recorded at point of use.' },
];

export function InformationGapSlide() {
  return (
    <SlideLayout>

      {/* Main statement */}
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-6 px-4">
        <div>
          <p className="text-3xl font-bold leading-tight mb-3" style={{ color: 'var(--slide-primary)' }}>
            The cooperative model has always had the right principles.
          </p>
          <p className="text-3xl font-bold leading-tight" style={{ color: 'var(--slide-primary)', opacity: 0.45 }}>
            It has never had a data layer that operates them without management overhead.
          </p>
        </div>

        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
          When every stage, every contribution, and every material is recorded against the project model, outcomes become derivable rather than estimated. The next project's cost is built from actuals, not assumptions. When the number is wrong, you can show exactly why. So can every member.
        </p>
      </div>

      {/* Recording axes */}
      <div
        className="shrink-0 flex items-stretch gap-px rounded-lg overflow-hidden"
        style={{ border: '1px solid var(--slide-border-primary)' }}
      >
        {domains.map((d, i) => (
          <div
            key={d.label}
            className="flex-1 flex items-center gap-3 px-5 py-3"
            style={{
              backgroundColor: 'var(--slide-bg-primary-muted)',
              borderLeft: i > 0 ? '1px solid var(--slide-border-primary)' : 'none',
            }}
          >
            <d.Icon className="w-4 h-4 shrink-0" style={{ color: 'var(--slide-primary)', opacity: 0.6 }} />
            <div>
              <div className="text-xs font-semibold" style={{ color: 'var(--slide-primary)' }}>{d.label}</div>
              <div className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.55 }}>{d.detail}</div>
            </div>
          </div>
        ))}
      </div>

    </SlideLayout>
  );
}
