import type { TimelineConfig } from '../../types';
import logo from '../../assets/Logo_secondary.webp';

// Drop a single video file into ./input — it's picked up automatically as the background clip.
const _inputModules = import.meta.glob('./input/*.{mp4,mov,webm}', { eager: true }) as Record<string, { default: string }>;
const _inputPath = Object.keys(_inputModules)[0];
const background = _inputPath ? _inputModules[_inputPath].default : '';

export const timeline: TimelineConfig = {
  title: 'Watermark',
  exportFilename: _inputPath
    ? _inputPath.split('/').pop()!.replace(/\.[^.]+$/, '-watermarked.mp4')
    : 'watermarked.mp4',
  background,
  logo: { src: logo, corner: 'br', size: 52, opacity: 0.7, padding: 40 },
  textOverlays: [{
    text: 'meritoi.com',
    x: 0.5,
    y: 0.46,
    fontSize: 150,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgba(255,255,255,0.12)',
    startTime: 0,
    endTime: Infinity,
  }],
};
