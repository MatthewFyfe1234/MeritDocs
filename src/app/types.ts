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
