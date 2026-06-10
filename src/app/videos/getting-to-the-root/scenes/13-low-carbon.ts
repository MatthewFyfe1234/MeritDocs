import type { ImageScene } from '../../../types';
import { s, BG } from '../../styles';

export const scene: ImageScene = {
  type: 'image-text',
  duration: 7,
  backgroundColor: BG,
  transition: 'fade',
  overlays: [
    { text: 'Offsite construction is supposed to be the low-carbon alternative.',  x: 0.5, y: 0.30, ...s.bodyMuted, textAlign: 'center' as const, maxWidth: 0.65 },
    { text: 'With Merit, it can prove it.',                                        x: 0.5, y: 0.58, ...s.accentVar, textAlign: 'center' as const },
  ],
};
