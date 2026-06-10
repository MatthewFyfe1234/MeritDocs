import type { ImageScene } from '../../../types';
import { s, BG } from '../../styles';

export const scene: ImageScene = {
  type: 'image-text',
  duration: 9,
  backgroundColor: BG,
  transition: 'fade',
  overlays: [
    { text: 'The product manager looked at the data.',                                                                         x: 0.1, y: 0.09, ...s.subtle },
    { text: '"2.47 seconds - that\'s well above average dwell time before activation. Let\'s look at repositioning this."',   x: 0.1, y: 0.20, ...s.body,  maxWidth: 0.62 },
    { text: '"Wait. £2 a year? This button has to go."',                                                                       x: 0.1, y: 0.58, ...s.bodyMuted, maxWidth: 0.62 },
    { text: 'He asked some designers to take a closer look.',                                                               x: 0.1, y: 0.74, ...s.accent },
  ],
};
