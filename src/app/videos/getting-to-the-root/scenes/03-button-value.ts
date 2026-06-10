import type { ImageScene } from '../../../types';
import { s, BG } from '../../styles';

export const scene: ImageScene = {
  type: 'image-text',
  duration: 9,
  backgroundColor: BG,
  transition: 'cut',
  overlays: [
    { text: '£340,000 a year.',                                                                x: 0.1, y: 0.18, ...s.headlineXl },
    { text: 'In direct labour time. Pressing that button.',                                       x: 0.1, y: 0.38, ...s.bodyMuted },
    { text: 'Nestled neatly in the UI between a £280,000 a year button and a £2 a year button.',        x: 0.1, y: 0.52, ...s.subtle, maxWidth: 0.65 },
  ],
};
