import logo from '@/decks/merit-oi/slides/Logo_secondary.webp';

/**
 * Inside right panel.
 * Branded accent column on left spine edge. Pocket at bottom.
 */
export function FolderInsideRight() {
  return (
    <div
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{ backgroundColor: '#ffffff', fontFamily: '"Inter", sans-serif' }}
    >
      {/* Left spine accent strip */}
      <div
        className="absolute top-0 left-0 h-full"
        style={{ width: '4px', backgroundColor: 'var(--slide-primary)', opacity: 0.15 }}
      />

      {/* Main panel content */}
      <div className="flex-1 flex flex-col justify-start px-10 pt-12">
        <p
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: 'var(--slide-primary)', opacity: 0.3 }}
        >
          Merit Operational Intelligence
        </p>
      </div>

      {/* Pocket area */}
      <div
        className="relative shrink-0"
        style={{
          height: '120px',
          backgroundColor: 'var(--slide-bg-primary-muted)',
          borderTop: '1px dashed var(--slide-border-primary)',
        }}
      >
        {/* Diagonal corner cut — right pocket */}
        <svg
          className="absolute top-0 left-0"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <polygon points="32,0 0,0 0,32" fill="white" />
          <line x1="32" y1="0" x2="0" y2="32" stroke="var(--slide-border-primary)" strokeWidth="1" strokeDasharray="3 2" />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <img src={logo} alt="Merit OI" style={{ height: '28px', width: 'auto', opacity: 0.25 }} />
        </div>
      </div>
    </div>
  );
}
