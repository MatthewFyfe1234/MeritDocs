import type { ImageScene } from '../../../types';
import { s, BG } from '../../styles';

export const scene: ImageScene = {
  type: 'image-text',
  duration: 8,
  backgroundColor: BG,
  transition: 'cut',
  overlays: [
    { text: 'WHAT THE SOFTWARE KNEW',                                                                                                                              x: 0.1, y: 0.1,  ...s.label },
    { text: 'WebGPI — Genie\'s password-protected calibration interface — was used to upload parameters to the machine\'s controller before the PDI began.',       x: 0.1, y: 0.2,  ...s.body,    maxWidth: 0.55 },
    { text: 'The upload happened.',                                                                                                                                x: 0.1, y: 0.46, ...s.bodyBold },
    { text: 'The parameter was wrong.',                                                                                                                            x: 0.1, y: 0.56, ...s.bodyBold, color: '#e85d40' },
    { text: 'There was no log of who uploaded it, when, what the specified parameter should have been, or whether the upload was a required step in the PDI procedure.', x: 0.1, y: 0.67, ...s.bodyMuted, maxWidth: 0.55 },
    { text: 'The event existed. The record didn\'t.',                                                                                                              x: 0.1, y: 0.87, ...s.subtle },
  ],
};
