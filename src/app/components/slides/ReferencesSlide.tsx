export interface Ref {
  num: number;
  publisher: string;
  title: string;
  url: string;
  href: string;
  supports: string;
}

interface ReferencesSlideProps {
  refs: Ref[];
  subtitle?: string;
  showSupports?: boolean;
}

export function ReferencesSlide({
  refs,
  subtitle = 'All statistics cited in this presentation. Numbers correspond to superscripts throughout the deck. All sources accessed February 2026.',
  showSupports = false,
}: ReferencesSlideProps) {
  return (
    <div className="w-full h-full p-8 flex flex-col">

      <div className="mb-3 shrink-0">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--slide-primary)' }}>
          Sources &amp; References
        </h2>
        <div className="w-20 h-1" style={{ backgroundColor: 'var(--slide-accent)' }} />
        <p className="text-xs mt-2" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
          {subtitle}
        </p>
      </div>

      <div
        className="flex-1 min-h-0"
        style={{ columns: 3, columnGap: '20px', columnFill: 'auto' }}
      >
        {refs.map((r) => (
          <div
            key={r.num}
            className="flex gap-2 rounded-md px-2 py-1 mb-1"
            style={{
              backgroundColor: '#f7f9f9',
              border: '1px solid var(--slide-border)',
              breakInside: 'avoid',
            }}
          >
            <span
              className="shrink-0 font-bold flex items-center justify-center rounded-full mt-0.5"
              style={{
                backgroundColor: 'var(--slide-primary)',
                color: '#fff',
                fontSize: '10px',
                width: '18px',
                height: '18px',
              }}
            >
              {r.num}
            </span>
            <div className="min-w-0">
              <span className="text-xs font-semibold" style={{ color: 'var(--slide-primary)' }}>
                {r.publisher}
              </span>
              <p className="text-xs leading-snug" style={{ color: 'var(--slide-text)' }}>
                {r.title}
              </p>
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="leading-snug break-all hover:underline block"
                style={{ color: 'var(--slide-primary)', opacity: 0.45, fontFamily: 'monospace', fontSize: '9px' }}
              >
                {r.url}
              </a>
              {showSupports && (
                <p className="text-xs italic mt-0.5 leading-snug" style={{ color: 'var(--slide-accent)', opacity: 0.8 }}>
                  {r.supports}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
