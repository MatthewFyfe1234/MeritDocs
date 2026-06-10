import type { ImageScene } from '../../../types';
import { s, BG } from '../../styles';

export const scene: ImageScene = {
  type: 'image-text',
  duration: 8,
  backgroundColor: BG,
  transition: 'fade',
  overlays: [
    { text: '£237 million. 48,417 tonnes of CO2e.',                              x: 0.5, y: 0.20, ...s.bodyMuted, textAlign: 'center' as const },
    { text: 'From one button. On one platform. In one year.',                    x: 0.5, y: 0.34, ...s.bodyBold,  textAlign: 'center' as const },
    { text: 'You\'re thinking about how to fix that button, aren\'t you?',       x: 0.5, y: 0.60, ...s.accentVar, textAlign: 'center' as const, maxWidth: 0.6 },
  ],
};
