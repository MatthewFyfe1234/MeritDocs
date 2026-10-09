import type { TimelineConfig } from '../../types';
import logo from '../../assets/Logo_secondary.webp';
import bg1 from './images/Spec creation 3.mp4';
import bg2 from './images/Coordination.mp4';
import bg3 from './images/BI Tools.mp4';

// Adjust startTime/endTime values to select the highlight window from each recording.
// Times are in seconds within the source video file.
export const overview: TimelineConfig = {
  title: 'Offsite Manufacturers Demo - Overview',
  exportFilename: 'Offsite-Manufacturers-Demo-Overview.mp4',
  background: [
    { src: bg1, startTime: 0, endTime: 60 },
    { src: bg2, startTime: 0, endTime: 60 },
    { src: bg3, startTime: 0, endTime: 60 },
  ],
  logo: { src: logo, corner: 'br', size: 52, opacity: 0.7, padding: 40 },
};
