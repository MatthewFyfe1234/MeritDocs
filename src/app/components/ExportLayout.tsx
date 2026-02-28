interface DeckConfig {
  title: string;
  exportFilename: string;
  slides: React.ReactNode[];
}

export function ExportLayout({ deck }: { deck: DeckConfig }) {
  const { slides } = deck;

  return (
    <div>
      <style>{`
        @page { size: 1920px 1080px; margin: 0; }
        body { margin: 0; }
      `}</style>
      {slides.map((slide, i) => (
        <div
          key={i}
          style={{
            width: '1920px',
            height: '1080px',
            backgroundColor: 'var(--slide-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            breakAfter: 'page',
            fontFamily: '"Inter", sans-serif',
          }}
        >
          <div style={{
            width: '1766px',  // 92% of 1920
            height: '994px',  // 92% of 1080
            overflow: 'hidden',
            backgroundColor: 'var(--slide-bg-card)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          }}>
            {slide}
          </div>
        </div>
      ))}
    </div>
  );
}
