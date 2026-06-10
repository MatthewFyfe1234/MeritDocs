import type { ImageScene } from '../../../types';
import { s, BG } from '../../styles';

export const scene: ImageScene = {
  type: 'image-text',
  duration: 8,
  backgroundColor: BG,
  transition: 'fade',
  overlays: [
    { text: 'TUESDAY  9:35AM',                                          x: 0.1, y: 0.09, ...s.labelAccent },
    { text: 'Jane presses the Add Stud Override button.',               x: 0.1, y: 0.19, ...s.headline, maxWidth: 0.65 },
    { text: '2.47 seconds since her last action.',                      x: 0.1, y: 0.40, ...s.bodyMuted },
    { text: 'The 3rd of 11 times she will press it that Tuesday.',      x: 0.1, y: 0.53, ...s.subtle, maxWidth: 0.6 },
  ],
};
