import type { ImageScene } from '../../../types';
import { s, BG } from '../../styles';

export const scene: ImageScene = {
  type: 'image-text',
  duration: 12,
  backgroundColor: BG,
  transition: 'cut',
  overlays: [
    { text: 'IN THE FACTORY',                                    x: 0.1,  y: 0.06, ...s.label },
    { text: 'COST',                                              x: 0.63, y: 0.06, ...s.colHeader },
    { text: 'CO2e',                                              x: 0.86, y: 0.06, ...s.colHeader },

    { text: 'C24 softwood stud, 89×38mm, 2.4m long',            x: 0.1,  y: 0.16, ...s.tableRow },
    { text: '£5.26',                                             x: 0.63, y: 0.16, ...s.tableVal },
    { text: '1.68 kg',                                           x: 0.86, y: 0.16, ...s.tableVal },

    { text: 'Two cross-cuts, nesting disruption, blade wear',    x: 0.1,  y: 0.26, ...s.tableRow },
    { text: '£0.15',                                             x: 0.63, y: 0.26, ...s.tableVal },
    { text: '-',                                                 x: 0.86, y: 0.26, ...s.tableDash },

    { text: '4 ring-shank framing nails + hold labour',          x: 0.1,  y: 0.36, ...s.tableRow },
    { text: '£0.09',                                             x: 0.63, y: 0.36, ...s.tableVal },
    { text: '0.055 kg',                                          x: 0.86, y: 0.36, ...s.tableVal },

    { text: 'OSB3 sheathing, non-standard cut (48%)',            x: 0.1,  y: 0.46, ...s.tableRow },
    { text: '£0.12',                                             x: 0.63, y: 0.46, ...s.tableVal },
    { text: '0.49 kg',                                           x: 0.86, y: 0.46, ...s.tableVal },

    { text: 'VCL staples + tape over every puncture (45%)',      x: 0.1,  y: 0.56, ...s.tableRow },
    { text: '£0.25',                                             x: 0.63, y: 0.56, ...s.tableVal },
    { text: '0.13 kg',                                           x: 0.86, y: 0.56, ...s.tableVal },

    { text: 'Assembly labour + OSB waste from disrupted cutting', x: 0.1, y: 0.66, ...s.tableRow },
    { text: '£0.60',                                             x: 0.63, y: 0.66, ...s.tableVal },
    { text: '-',                                                 x: 0.86, y: 0.66, ...s.tableDash },

    { text: 'Factory total',                                     x: 0.1,  y: 0.79, ...s.tableTotal },
    { text: '£6.47',                                             x: 0.63, y: 0.79, ...s.tableTotalVal },
    { text: '2.355 kg',                                          x: 0.86, y: 0.79, ...s.tableTotalVal },
    { text: '£69,453,417 annually',                              x: 0.63, y: 0.88, ...s.tableMeta },
    { text: '25,305,004 kg annually',                            x: 0.86, y: 0.88, ...s.tableMeta },
  ],
};
