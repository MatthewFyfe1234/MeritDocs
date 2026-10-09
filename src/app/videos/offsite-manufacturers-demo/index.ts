import type { TimelineConfig, TimelineAudioClip, TimelineImageOverlay } from '../../types';
import logo from '../../assets/Logo_secondary.webp';
import bg1 from './images/Spec creation 3.mp4';
import bg2 from './images/Coordination.mp4';
import bg3 from './images/BI Tools.mp4';

// Auto-discover all PNG overlays, sorted alphabetically by filename
const _imageModules = import.meta.glob('./images/*.png', { eager: true }) as Record<string, { default: string }>;

const imageOverlays: TimelineImageOverlay[] = Object.entries(_imageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, mod], i) => ({
    src: mod.default,
    startTime: i * 4,
    endTime:   i * 4 + 4,
    anchor: 'bl' as const,
    x: 0.03,
    y: 0.97,
    width: 0.28,
  }));

// Auto-discover all audio clips, sorted by numeric prefix of filename
const _audioModules = import.meta.glob('./audio/*.mp3', { eager: true }) as Record<string, { default: string }>;

function numericPrefix(path: string): number {
  const filename = path.split('/').pop() ?? '';
  return parseInt(filename.split(/[-_.]/)[0]) || 0;
}

const audioClips: TimelineAudioClip[] = Object.entries(_audioModules)
  .sort(([a], [b]) => numericPrefix(a) - numericPrefix(b))
  .map(([path, mod]) => {
    const filename = path.split('/').pop() ?? path;
    const label    = filename.replace(/^\d+[-_.]?/, '').replace(/\.[^.]+$/, '') || filename;
    return { src: mod.default, startTime: 0, label: label || filename };
  });

export const timeline: TimelineConfig = {
  title: 'Offsite Manufacturers Demo',
  exportFilename: 'Offsite-Manufacturers-Demo.mp4',
  background: [bg1, bg2, bg3],
  logo: { src: logo, corner: 'br', size: 52, opacity: 0.7, padding: 40 },
  audioClips,
  imageOverlays,
  intro: {
    duration: 3.5,
    title: 'Offsite Manufacturers Demo',
    subtitle: 'Specification, coordination and reporting in one place',
  },
  outro: {
    showLogo: true,
  },
};
