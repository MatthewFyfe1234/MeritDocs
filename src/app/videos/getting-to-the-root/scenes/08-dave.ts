import type { ImageScene } from '../../../types';
import { s, BG } from '../../styles';

export const scene: ImageScene = {
  type: 'image-text',
  duration: 10,
  backgroundColor: BG,
  transition: 'fade',
  overlays: [
    { text: 'ON THE BUILDING SITE',                                                                              x: 0.1, y: 0.08, ...s.label },
    { text: 'Dave is a site carpenter. Experienced. Good at his job.',                                           x: 0.1, y: 0.17, ...s.bodyMuted, maxWidth: 0.65 },
    { text: 'He\'s looking at a stud that\'s on the drawing, off grid, no apparent reason for it.',              x: 0.1, y: 0.30, ...s.body,     maxWidth: 0.65 },
    { text: '"What\'s this post for?"',                                                                          x: 0.1, y: 0.52, ...s.headline },
    { text: 'Dave asks Terry. Terry doesn\'t know. Terry asks the site manager. He hasn\'t got a clue but he\'s got opinions.', x: 0.1, y: 0.66, ...s.subtle,   maxWidth: 0.65 },
    { text: '*we don\'t actually measure head scratching',                                                       x: 0.1, y: 0.93, ...s.footnote },
  ],
};
