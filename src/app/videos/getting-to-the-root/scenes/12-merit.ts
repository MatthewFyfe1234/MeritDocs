import type { ImageScene } from '../../../types';
import { s, BG } from '../../styles';

export const scene: ImageScene = {
  type: 'image-text',
  duration: 10,
  backgroundColor: BG,
  transition: 'fade',
  overlays: [
    { text: 'What if we could reduce it, by half?',                                                                             x: 0.5, y: 0.22, ...s.subtle,   textAlign: 'center' as const },
    { text: 'With Merit we quantify it - alongside a million other problems - so it\'s no longer speculative.',                  x: 0.5, y: 0.38, ...s.body,     textAlign: 'center' as const, maxWidth: 0.6 },
    { text: 'You\'re thinking about how to fix that button, aren\'t you?',                                                      x: 0.5, y: 0.72, ...s.accentVar, textAlign: 'center' as const, maxWidth: 0.6 },
  ],
};
