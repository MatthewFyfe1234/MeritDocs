import type { ImageScene } from '../../../types';
import { s, BG } from '../../styles';

export const scene: ImageScene = {
  type: 'image-text',
  duration: 7,
  backgroundColor: BG,
  transition: 'fade',
  overlays: [
    { text: 'Telemetry tells you what happened.',                                          x: 0.5, y: 0.3,  ...s.headlineLg, color: '#7c8a9e', textAlign: 'center' as const, maxWidth: 0.65 },
    { text: 'Merit tells you whether it was done right.',                                  x: 0.5, y: 0.48, ...s.headlineLg,                  textAlign: 'center' as const, maxWidth: 0.65 },
    { text: 'The black box records the crash. The flight management system prevents it.',  x: 0.5, y: 0.72, ...s.subtle,                       textAlign: 'center' as const, maxWidth: 0.5 },
  ],
};
