import type { ImageScene } from '../../../types';
import { s, BG } from '../../styles';

export const scene: ImageScene = {
  type: 'image-text',
  duration: 6,
  backgroundColor: BG,
  transition: 'fade',
  overlays: [
    { text: 'In this case, the deviation was visible before the incident.',  x: 0.5, y: 0.33, ...s.bodyMuted, textAlign: 'center' as const, maxWidth: 0.55 },
    { text: 'Nobody was looking.',                                           x: 0.5, y: 0.50, ...s.bodyBold,  textAlign: 'center' as const },
    { text: 'Merit is the system that looks.',                               x: 0.5, y: 0.65, ...s.accentVar, textAlign: 'center' as const },
  ],
};
