import type { VideoConfig } from '../../types';
import logo from '../../assets/Logo_secondary.webp';
import { scene as incident } from './scenes/01-incident';
import { scene as telemetrySaw } from './scenes/02-telemetry-saw';
import { scene as softwareKnew } from './scenes/03-software-knew';
import { scene as operatorGap } from './scenes/04-operator-gap';
import { scene as meritRecord } from './scenes/05-merit-record';
import { scene as distinction } from './scenes/06-distinction';
import { scene as closer } from './scenes/07-closer';

export const video: VideoConfig = {
  title: 'MEWP Liability: The Case for Merit',
  exportFilename: 'MEWP-Liability-The-Case-for-Merit.mp4',
  logo: { src: logo, corner: 'br', size: 52, opacity: 0.7, padding: 40 },
  scenes: [
    incident,
    telemetrySaw,
    softwareKnew,
    operatorGap,
    meritRecord,
    distinction,
    closer,
  ],
};
