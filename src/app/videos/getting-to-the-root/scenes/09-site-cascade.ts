import type { ImageScene } from '../../../types';
import { s, BG } from '../../styles';

export const scene: ImageScene = {
  type: 'image-text',
  duration: 12,
  backgroundColor: BG,
  transition: 'cut',
  overlays: [
    { text: 'SITE COSTS',                                           x: 0.1,  y: 0.06, ...s.label },

    { text: '15 min, 3 people at £37.50/hr',                       x: 0.1,  y: 0.15, ...s.tableRow },
    { text: '£6.25',                                               x: 0.72, y: 0.15, ...s.tableVal },

    { text: 'Designer called (31%), £850 to process',              x: 0.1,  y: 0.27, ...s.tableRow },
    { text: '£1.70',                                               x: 0.72, y: 0.27, ...s.tableVal },

    { text: 'Pipe rerouted or notched (5%)',                       x: 0.1,  y: 0.39, ...s.tableRow },
    { text: '£3.88',                                               x: 0.72, y: 0.39, ...s.tableVal },

    { text: 'Plasterboard warps, plasterer feathers skim (78%)',   x: 0.1,  y: 0.51, ...s.tableRow },
    { text: '£1.20',                                               x: 0.72, y: 0.51, ...s.tableVal },

    { text: 'Engineer confirms unnecessary, drawing revised (1.5%)', x: 0.1, y: 0.63, ...s.tableRow },
    { text: '£1.94',                                               x: 0.72, y: 0.63, ...s.tableVal },

    { text: 'Site total',                                          x: 0.1,  y: 0.76, ...s.tableTotal },
    { text: '£15.15',                                              x: 0.72, y: 0.76, ...s.tableTotalVal },
    { text: '£161,828,166 annually',                               x: 0.72, y: 0.84, ...s.tableMeta },

    { text: '*we don\'t actually measure sighs. Everything else we do.',  x: 0.1, y: 0.93, ...s.footnote },
  ],
};
