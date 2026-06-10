import type { ImageScene } from '../../../types';
import { s, BG } from '../../styles';

export const scene: ImageScene = {
  type: 'image-text',
  duration: 9,
  backgroundColor: BG,
  transition: 'fade',
  overlays: [
    { text: 'JUNE 5, 2013',                                                                                                                         x: 0.1, y: 0.1,  ...s.labelAccent },
    { text: 'Rick Jeager-Fozard was conducting a routine pre-delivery inspection on a brand new Genie Z135/70 at Kimberly Access\'s Iver depot.',    x: 0.1, y: 0.2,  ...s.body,     maxWidth: 0.55 },
    { text: 'As he elevated the platform, the machine extended to an unsafe angle and toppled over the boundary fence — onto the hard shoulder of the M25.', x: 0.1, y: 0.43, ...s.body, maxWidth: 0.55 },
    { text: 'He died from massive trauma.',                                                                                                          x: 0.1, y: 0.66, ...s.bodyBold, maxWidth: 0.55 },
    { text: 'The question the court spent nine years trying to answer: what happened between the software upload and the moment the machine moved?',  x: 0.1, y: 0.78, ...s.subtle,  maxWidth: 0.55 },
  ],
};
