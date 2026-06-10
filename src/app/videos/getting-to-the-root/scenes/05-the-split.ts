import type { ImageScene } from '../../../types';
import { s, BG } from '../../styles';

export const scene: ImageScene = {
  type: 'image-text',
  duration: 10,
  backgroundColor: BG,
  transition: 'cut',
  overlays: [
    { text: 'WHAT THEY FOUND',                                                                 x: 0.1, y: 0.08, ...s.label },
    { text: 'Necessary 63% of the time.',                                                      x: 0.1, y: 0.18, ...s.bodyMuted },
    { text: 'In the remaining 37%, an unnecessary stud enters the model.',                     x: 0.1, y: 0.31, ...s.bodyBold, maxWidth: 0.65 },
    { text: '10,744,800 times a year.',                                                        x: 0.1, y: 0.52, ...s.accentLg },
    { text: 'With Merit, the downstream impact is already on record.',                        x: 0.1, y: 0.70, ...s.bodyMuted, maxWidth: 0.65 },
    { text: '*almost every consequence',                                                        x: 0.1, y: 0.93, ...s.footnote },
  ],
};
