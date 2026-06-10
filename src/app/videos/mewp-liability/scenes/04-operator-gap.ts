import type { ImageScene } from '../../../types';
import { s, BG } from '../../styles';

export const scene: ImageScene = {
  type: 'image-text',
  duration: 7,
  backgroundColor: BG,
  transition: 'cut',
  overlays: [
    { text: 'THE OPERATOR RECORD',                                                                                                                 x: 0.1, y: 0.1,  ...s.label },
    { text: 'IPAF ePAL confirmed the operator held the correct certification for this class of machine.',                                          x: 0.1, y: 0.2,  ...s.body,    maxWidth: 0.55 },
    { text: 'What it couldn\'t show:',                                                                                                             x: 0.1, y: 0.41, ...s.subtle },
    { text: 'Which step of the PDI they were executing. Whether the calibration check was in their procedure. Whether they completed it, skipped it, or never saw it.', x: 0.1, y: 0.51, ...s.bodyMuted, maxWidth: 0.55 },
    { text: 'The certification was real.',                                                                                                         x: 0.1, y: 0.76, ...s.bodyBold },
    { text: 'The connection to the process was not.',                                                                                              x: 0.1, y: 0.86, ...s.bodyBold, color: '#e85d40' },
  ],
};
