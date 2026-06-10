import type { ImageScene } from '../../../types';
import { s, BG } from '../../styles';

export const scene: ImageScene = {
  type: 'image-text',
  duration: 12,
  backgroundColor: BG,
  transition: 'fade',
  overlays: [
    { text: 'THE FULL CASCADE  -  one platform, one year', x: 0.1,  y: 0.06, ...s.label },
    { text: 'ANNUAL COST',                                 x: 0.62, y: 0.06, ...s.colHeader },
    { text: 'ANNUAL CO2e',                                 x: 0.87, y: 0.06, ...s.colHeader },

    { text: 'Factory materials and labour',                x: 0.1,  y: 0.16, ...s.tableRow },
    { text: '£69,453,417',                                 x: 0.62, y: 0.16, ...s.tableVal },
    { text: '25,305,004 kg',                               x: 0.87, y: 0.16, ...s.tableVal },

    { text: 'Freight',                                     x: 0.1,  y: 0.25, ...s.tableRow },
    { text: '£75,214',                                     x: 0.62, y: 0.25, ...s.tableVal },
    { text: '10,745 kg',                                   x: 0.87, y: 0.25, ...s.tableVal },

    { text: 'Site productivity loss',                      x: 0.1,  y: 0.34, ...s.tableRow },
    { text: '£67,155,000',                                 x: 0.62, y: 0.34, ...s.tableVal },
    { text: '-',                                           x: 0.87, y: 0.34, ...s.tableDash },

    { text: 'MEP clash remediation',                       x: 0.1,  y: 0.43, ...s.tableRow },
    { text: '£41,636,100',                                 x: 0.62, y: 0.43, ...s.tableVal },
    { text: '-',                                           x: 0.87, y: 0.43, ...s.tableDash },

    { text: 'RFI processing',                              x: 0.1,  y: 0.52, ...s.tableRow },
    { text: '£18,266,160',                                 x: 0.62, y: 0.52, ...s.tableVal },
    { text: '-',                                           x: 0.87, y: 0.52, ...s.tableDash },

    { text: 'Plastering remediation',                      x: 0.1,  y: 0.61, ...s.tableRow },
    { text: '£12,893,760',                                 x: 0.62, y: 0.61, ...s.tableVal },
    { text: '6,339,432 kg',                                x: 0.87, y: 0.61, ...s.tableVal },

    { text: 'Design office queries',                       x: 0.1,  y: 0.70, ...s.tableRow },
    { text: '£20,877,146',                                 x: 0.62, y: 0.70, ...s.tableVal },
    { text: '-',                                           x: 0.87, y: 0.70, ...s.tableDash },

    { text: 'Total',                                       x: 0.1,  y: 0.82, ...s.tableTotal },
    { text: '£232,274,405',                                x: 0.62, y: 0.82, ...s.tableTotalVal },
    { text: '31,655,181 kg',                               x: 0.87, y: 0.82, ...s.tableTotalVal },
  ],
};
