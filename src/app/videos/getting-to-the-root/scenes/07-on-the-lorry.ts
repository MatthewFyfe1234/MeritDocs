import type { ImageScene } from '../../../types';
import { s, BG } from '../../styles';

export const scene: ImageScene = {
  type: 'image-text',
  duration: 8,
  backgroundColor: BG,
  transition: 'cut',
  overlays: [
    { text: 'ON THE LORRY',                                                                          x: 0.1, y: 0.09, ...s.label },
    { text: '39,219 tonnes of timber that shouldn\'t be there. On lorries that burn diesel.',        x: 0.1, y: 0.20, ...s.body,      maxWidth: 0.65 },
    { text: '3.65 kg per stud. 161 kilometres. 10,744,800 studs.',                                  x: 0.1, y: 0.43, ...s.bodyMuted },
    { text: '£75,214. Not huge.',                                                                    x: 0.1, y: 0.57, ...s.subtle },
    { text: '0.001 kg CO2e per stud. 10,745 kg CO2e annually.',                                     x: 0.1, y: 0.69, ...s.subtle },
    { text: 'To move wood that serves no structural purpose to buildings that didn\'t need it.',     x: 0.1, y: 0.82, ...s.subtle,    maxWidth: 0.65 },
  ],
};
