import { SlideLayout } from '@/components/slides/SlideLayout';

const rows = [
  {
    label: 'Biology',
    body: 'Hawk-dove dynamics, kin selection, Fisher’s principle on sex ratios: none of it requires anyone to think. The payoff is reproductive success, and evolution plays the strategy.',
  },
  {
    label: 'Human Society',
    body: 'Markets, elections, auctions, norms, arms races: wherever a payoff depends on what someone else does, the same structure applies.',
  },
  {
    label: 'Pre-Modern Societies',
    body: 'Common grazing land, reciprocal labour, dowry as signalling: the games are simpler and repeated with the same neighbours for generations, which is why Ostrom found them so legible.',
  },
];

export function ScopeSlide() {
  return (
    <SlideLayout
      title="What a Game Actually Is"
      subtitle="Wherever agents have interdependent payoffs, there's a game. That scope is wider than economics, and it's worth being precise about before claiming to end one."
    >
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-3">
        {rows.map(({ label, body }) => (
          <div
            key={label}
            className="rounded-lg px-5 py-4 flex flex-col gap-1.5"
            style={{ backgroundColor: 'var(--slide-bg-card)' }}
          >
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-accent)' }}>
              {label}
            </span>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>
              {body}
            </p>
          </div>
        ))}

        <p className="text-sm leading-relaxed text-center mt-1" style={{ color: 'var(--slide-accent)' }}>
          A game needs interdependence, nothing more. It stops applying only where one agent faces the world alone,
          and almost nothing social or biological is actually like that once you look closely.
        </p>
      </div>
    </SlideLayout>
  );
}
