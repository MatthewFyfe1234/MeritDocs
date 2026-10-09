import { SlideLayout } from '@/components/slides/SlideLayout';

const notClaims = [
  'Not the end of game theory as a discipline. If anything, you need it explicitly to explain why this works.',
  'Not the end of strategic behaviour. Choosing how to act well is still strategy.',
  'Not the end of self-interest, or of competing interests. People still want more for themselves than for others.',
];

export function CloseSlide() {
  return (
    <SlideLayout
      title="The End of This Game"
      subtitle="A precise claim, not a sweeping one. Worth being exact about what it is and isn't."
    >
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-3">
        {notClaims.map((body) => (
          <div
            key={body}
            className="rounded-lg px-5 py-3.5"
            style={{ backgroundColor: 'var(--slide-bg-card)' }}
          >
            <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
              {body}
            </p>
          </div>
        ))}

        <div
          className="rounded-lg px-5 py-4 mt-2"
          style={{ backgroundColor: 'var(--slide-bg-accent-muted)', border: '1.5px solid var(--slide-accent)' }}
        >
          <p className="text-sm leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.9 }}>
            It is the end of one specific game: the one where misrepresentation, concealment, or manipulation had a
            payoff.
          </p>
        </div>

        <p className="text-base leading-relaxed text-center mt-2" style={{ color: 'var(--slide-accent)' }}>
          Wanting to win and telling the truth stop being in tension. That's the end of the game.
        </p>
      </div>
    </SlideLayout>
  );
}
