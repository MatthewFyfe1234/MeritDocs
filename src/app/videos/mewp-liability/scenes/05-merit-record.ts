import type { ImageScene } from '../../../types';
import { s } from '../../styles';

export const scene: ImageScene = {
  type: 'image-text',
  duration: 10,
  backgroundColor: '#060e1a',
  transition: 'fade',
  overlays: [
    { text: 'MERIT PROCESS RECORD',                                                                                x: 0.1, y: 0.07, ...s.label,     color: 'var(--slide-accent)' },
    { text: '08:47:23  ·  Kimberly Access, Iver Depot  ·  PDI Pre-Delivery  ·  Genie Z135/70 #4471',             x: 0.1, y: 0.14, ...s.tableMeta, textAlign: 'left' as const, maxWidth: 0.8 },
    { text: 'Step 7 of 12',                                                                                       x: 0.1, y: 0.25, ...s.label },
    { text: 'Boom angle sensor calibration',                                                                      x: 0.1, y: 0.31, ...s.headline },
    { text: 'Operator: ID 0447   ·   Certification: IPAF 3b   ·   Verified via ePAL',                            x: 0.1, y: 0.44, ...s.tableMeta, textAlign: 'left' as const },
    { text: 'WebGPI parameter uploaded      −6.2°\nSpecified parameter                  0.0°\nDeviation                                    6.2°', x: 0.1, y: 0.54, ...s.bodyMuted, lineHeight: 1.9 },
    { text: 'FLAGGED',                                                                                            x: 0.1, y: 0.75, ...s.accent,    backdrop: 'rgba(232, 93, 64, 0.12)', backdropPadding: 18, backdropRadius: 8 },
    { text: 'Supervisor notified: 08:47:24. Advancement to Step 8 prevented.',                                    x: 0.1, y: 0.85, ...s.subtle,    maxWidth: 0.55 },
    { text: 'The machine did not leave the yard.',                                                                 x: 0.1, y: 0.93, ...s.accent,    color: 'var(--slide-accent)' },
  ],
};
