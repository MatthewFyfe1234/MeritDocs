import type { ImageScene } from '../../../types';
import { s, BG } from '../../styles';

export const scene: ImageScene = {
  type: 'image-text',
  duration: 7,
  backgroundColor: BG,
  transition: 'fade',
  overlays: [
    { text: 'Typical for Jane.',                                  x: 0.1, y: 0.26, ...s.subtle },
    { text: 'Typical for her office.',                            x: 0.1, y: 0.39, ...s.subtle },
    { text: 'Typical across the 12,000 users of the platform.',  x: 0.1, y: 0.52, ...s.bodyBold, maxWidth: 0.7 },
  ],
};
