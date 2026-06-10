// Shared text style presets for video scenes.
// All fontSize values are at 1920×1080 reference resolution.
// Approximately double the original design-time sizes.

export const BG = '#0f1117';

export const s = {
  // Section headers (small-caps label style)
  label:         { fontSize: 26,  color: '#7c8a9e', fontWeight: 'bold'   as const, textAlign: 'left'   as const },
  labelAccent:   { fontSize: 26,  color: '#e85d40', fontWeight: 'bold'   as const, textAlign: 'left'   as const },
  colHeader:     { fontSize: 26,  color: '#7c8a9e', fontWeight: 'bold'   as const, textAlign: 'right'  as const },

  // Body copy
  subtle:        { fontSize: 44,  color: '#7c8a9e', fontWeight: 'normal' as const, textAlign: 'left'   as const, lineHeight: 1.5  },
  bodyMuted:     { fontSize: 50,  color: '#b0bcc8', fontWeight: 'normal' as const, textAlign: 'left'   as const, lineHeight: 1.5  },
  body:          { fontSize: 56,  color: '#ffffff', fontWeight: 'normal' as const, textAlign: 'left'   as const, lineHeight: 1.5  },
  bodyBold:      { fontSize: 56,  color: '#ffffff', fontWeight: 'bold'   as const, textAlign: 'left'   as const, lineHeight: 1.45 },
  headline:      { fontSize: 64,  color: '#ffffff', fontWeight: 'bold'   as const, textAlign: 'left'   as const, lineHeight: 1.45 },
  headlineLg:    { fontSize: 84,  color: '#ffffff', fontWeight: 'bold'   as const, textAlign: 'left'   as const },
  headlineXl:    { fontSize: 104, color: '#ffffff', fontWeight: 'bold'   as const, textAlign: 'left'   as const },

  // Accent (red / theme primary)
  accent:        { fontSize: 64,  color: '#e85d40', fontWeight: 'bold'   as const, textAlign: 'left'   as const },
  accentLg:      { fontSize: 88,  color: '#e85d40', fontWeight: 'bold'   as const, textAlign: 'left'   as const },
  accentVar:     { fontSize: 60,  color: 'var(--slide-accent)', fontWeight: 'bold' as const, textAlign: 'left' as const, lineHeight: 1.45 },

  // Footnote (*we don't actually measure...)
  footnote:      { fontSize: 28,  color: '#3d4a5e', fontWeight: 'normal' as const, textAlign: 'left'   as const },

  // Table
  tableRow:      { fontSize: 38,  color: '#b0bcc8', fontWeight: 'normal' as const, textAlign: 'left'   as const },
  tableVal:      { fontSize: 38,  color: '#ffffff', fontWeight: 'normal' as const, textAlign: 'right'  as const },
  tableDash:     { fontSize: 38,  color: '#4a5a6e', fontWeight: 'normal' as const, textAlign: 'right'  as const },
  tableTotal:    { fontSize: 48,  color: '#ffffff', fontWeight: 'bold'   as const, textAlign: 'left'   as const },
  tableTotalVal: { fontSize: 48,  color: '#e85d40', fontWeight: 'bold'   as const, textAlign: 'right'  as const },
  tableMeta:     { fontSize: 32,  color: '#4a5a6e', fontWeight: 'normal' as const, textAlign: 'right'  as const },
};
