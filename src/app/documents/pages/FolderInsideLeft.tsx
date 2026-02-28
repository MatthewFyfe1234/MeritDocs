import logo from '@/decks/merit-oi/slides/Logo_secondary.webp';

/**
 * Inside left panel.
 * Mostly clear — holds documents. Pocket indicated at bottom (~90mm).
 */
export function FolderInsideLeft() {
  return (
    <div
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{ backgroundColor: '#ffffff', fontFamily: '"Inter", sans-serif' }}
    >
      {/* Main panel — clean */}
      <div className="flex-1" />

      {/* Pocket area */}
      <div
        className="relative shrink-0"
        style={{
          height: '120px',
          backgroundColor: 'var(--slide-bg-primary-muted)',
          borderTop: '1px dashed var(--slide-border-primary)',
        }}
      >
        {/* Diagonal corner cut — left pocket die-cut indicator */}
        <svg
          className="absolute top-0 right-0"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          style={{ overflow: 'visible' }}
        >
          <polygon points="0,0 32,0 32,32" fill="white" />
          <line x1="0" y1="0" x2="32" y2="32" stroke="var(--slide-border-primary)" strokeWidth="1" strokeDasharray="3 2" />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <img src={logo} alt="Merit OI" style={{ height: '28px', width: 'auto', opacity: 0.25 }} />
        </div>
      </div>
    </div>
  );
}
