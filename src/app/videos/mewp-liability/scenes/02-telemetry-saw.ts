import type { ImageScene } from '../../../types';
import { s, BG } from '../../styles';

export const scene: ImageScene = {
  type: 'image-text',
  duration: 8,
  backgroundColor: BG,
  transition: 'cut',
  overlays: [
    { text: 'WHAT TELEMETRY SAW',                                                                                                      x: 0.1, y: 0.1,  ...s.label },
    { text: 'The secondary boom angle sensor reported a safe elevation. The boom was actually six degrees lower.',                      x: 0.1, y: 0.2,  ...s.headline,  maxWidth: 0.55 },
    { text: 'When extension was selected, the boom extended beyond its physical limit. The centre of gravity shifted outside the stability footprint. The machine toppled.', x: 0.1, y: 0.44, ...s.bodyMuted, maxWidth: 0.55 },
    { text: 'Telemetry tells you what the machine did.',                                                                               x: 0.1, y: 0.70, ...s.bodyBold,  maxWidth: 0.55 },
    { text: 'It does not tell you why. Or when it went wrong. Or who made it wrong.',                                                  x: 0.1, y: 0.79, ...s.subtle,   maxWidth: 0.5 },
  ],
};
