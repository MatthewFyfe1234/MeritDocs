import type { ImageScene } from '../../../types';
import { s, BG } from '../../styles';

export const scene: ImageScene = {
  type: 'image-text',
  duration: 8,
  backgroundColor: BG,
  transition: 'fade',
  overlays: [
    { text: '10,744,800 unnecessary studs.',               x: 0.1, y: 0.13, ...s.headline },
    { text: '£22.08 each.  £237,422,280 in total.',          x: 0.1, y: 0.29, ...s.body },
    { text: '4.50 kg CO2e each.  48,417 tonnes in total.',  x: 0.1, y: 0.42, ...s.body },
    { text: 'From one button. On one platform. In one year.', x: 0.1, y: 0.64, ...s.headline },
  ],
};
