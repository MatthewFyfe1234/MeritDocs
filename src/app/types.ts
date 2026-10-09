import type React from 'react';

export interface DeckVariantOption {
  value: string;
  label: string;
}

export interface DeckVariantSlot {
  label: string;
  options: DeckVariantOption[];
}

export interface DeckConfig {
  title: string;
  exportFilename: string;
  variantSlots?: Record<string, DeckVariantSlot>;
  slides: React.ReactNode[] | ((config: Record<string, string>) => React.ReactNode[]);
}

export interface NamedVariation {
  id: string;
  deckKey: string;
  name: string;
  config: Record<string, string>;
  createdAt: number;
}

export function resolveSlides(deck: DeckConfig, config: Record<string, string>): React.ReactNode[] {
  return typeof deck.slides === 'function' ? deck.slides(config) : deck.slides;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// ---------------------------------------------------------------------------
// Sticknotes types
// ---------------------------------------------------------------------------

export interface StickNotesConfig {
  title: string;
  cards: React.ReactNode[];
}

// ---------------------------------------------------------------------------
// Video types
// ---------------------------------------------------------------------------

export interface TextOverlay {
  text: string;
  x: number;          // 0–1, relative to canvas width (left anchor of text box)
  y: number;          // 0–1, relative to canvas height (top anchor of text box)
  fontSize: number;   // px at 1920×1080 reference resolution
  color: string;
  fontWeight?: 'normal' | 'bold';
  textAlign?: 'left' | 'center' | 'right';
  maxWidth?: number;  // 0–1 relative to canvas width; defaults to 0.8
  lineHeight?: number; // multiplier; defaults to 1.35
  backdrop?: string;        // e.g. 'rgba(0,0,0,0.55)' — rounded rect drawn behind the text block
  backdropPadding?: number; // px padding around the text block at 1920×1080; defaults to 24
  backdropRadius?: number;  // corner radius in px at 1920×1080; defaults to 12
}

export interface ImageScene {
  type: 'image-text';
  duration: number;          // seconds
  backgroundImage?: string;  // imported asset or URL
  backgroundColor?: string;
  backgroundOverlay?: string; // rgba color drawn over backgroundImage; defaults to 'rgba(0,0,0,0.55)'
  overlays: TextOverlay[];
  transition?: 'fade' | 'cut';
}

export interface VideoClipScene {
  type: 'video-clip';
  src: string;               // imported asset or URL
  startTime?: number;        // seconds into source clip
  endTime?: number;          // seconds into source clip
  overlays?: TextOverlay[];
  transition?: 'fade' | 'cut';
}

export type VideoScene = ImageScene | VideoClipScene;

export interface VideoLogo {
  src: string;
  corner?: 'tl' | 'tr' | 'bl' | 'br'; // defaults to 'br'
  size?: number;    // logo height in px at 1920×1080; width scales proportionally; defaults to 60
  opacity?: number; // 0–1; defaults to 1
  padding?: number; // px from the corner edges; defaults to 40
}

export interface VideoConfig {
  title: string;
  exportFilename: string;
  logo?: VideoLogo;  // shown on every scene
  scenes: VideoScene[];
}

// ---------------------------------------------------------------------------
// Timeline types — compositor model: background video + timed image/text overlays
// ---------------------------------------------------------------------------

export interface TimelineImageOverlay {
  src: string;           // imported image asset
  startTime: number;     // seconds from start of background video
  endTime: number;
  x?: number;            // 0–1 horizontal position; default 0.05
  y?: number;            // 0–1 vertical position; default 0.05
  anchor?: 'tl' | 'tr' | 'bl' | 'br'; // which corner x/y refers to; default 'tl'
  width?: number;        // 0–1 of canvas width; default 0.45
  transition?: 'fade' | 'cut'; // default 'cut'
}

export interface TimedTextOverlay extends TextOverlay {
  startTime: number;
  endTime: number;
}

export interface TimelineAudioClip {
  src: string;       // imported audio asset
  startTime: number; // seconds into the timeline when this clip begins
  label?: string;    // display name (defaults to filename)
}

export interface TimelineSpeedZone {
  startTime: number;
  endTime: number;
  rate: number;      // playback multiplier — e.g. 3 = 3× faster
}

export interface TimelineBackgroundClip {
  src: string;
  startTime?: number; // trim in-point within the source video; default 0
  endTime?: number;   // trim out-point; default = full video duration
}

export interface TimelineTitleCard {
  duration?: number;   // seconds; default 2.5
  title?: string;
  subtitle?: string;
  showLogo?: boolean;  // default true
  background?: string; // card background color; default '#0f1117'
}

// A background can be a single src, a clip with in/out points, or an array of either
export type TimelineBackground = string | TimelineBackgroundClip;

export function normalizeBg(bg: TimelineBackground | TimelineBackground[]): Required<TimelineBackgroundClip>[] {
  const arr = Array.isArray(bg) ? bg : [bg];
  return arr.map(b => typeof b === 'string'
    ? { src: b, startTime: 0, endTime: Infinity }
    : { src: b.src, startTime: b.startTime ?? 0, endTime: b.endTime ?? Infinity }
  );
}

export interface TimelineConfig {
  title: string;
  exportFilename: string;
  background: TimelineBackground | TimelineBackground[]; // single video, playlist, or trimmed clips
  logo?: VideoLogo;
  imageOverlays?: TimelineImageOverlay[];
  audioClips?: TimelineAudioClip[];
  speedZones?: TimelineSpeedZone[];
  textOverlays?: TimedTextOverlay[];
  intro?: TimelineTitleCard; // fade-in title card played before the background video
  outro?: TimelineTitleCard; // fade-out card played after the background video ends
}
