import type { ImageScene } from '../../../types';
import { s, BG } from '../../styles';
import thermalBridge from '../images/thermal-bridge-Fine-Homebuilding.jpg';

export const scene: ImageScene = {
  type: 'image-text',
  duration: 11,
  backgroundColor: BG,
  backgroundImage: thermalBridge,
  transition: 'fade',
  overlays: [
    { text: '40% of those studs are in external walls.',                                                                          x: 0.1, y: 0.10, ...s.bodyMuted },
    { text: 'Each one is a thermal bridge. Unnecessary wood displacing insulation. The wall performs worse for the lifetime of the building.',
                                                                                                                                  x: 0.1, y: 0.23, ...s.body,     maxWidth: 0.65 },
    { text: 'An additional £5.1 million in heating bills.\n16,762 tonnes of CO2e.',                                               x: 0.1, y: 0.50, ...s.headline,  maxWidth: 0.65, lineHeight: 1.6 },
    { text: 'Across 60 years.',                                                                                                   x: 0.1, y: 0.70, ...s.subtle },
    { text: 'Paid by the people who live there.',                                                                                 x: 0.1, y: 0.79, ...s.accent },
    { text: 'From studs that served no structural purpose on the day they were installed.',                                       x: 0.1, y: 0.90, ...s.subtle,   maxWidth: 0.65 },
  ],
};
