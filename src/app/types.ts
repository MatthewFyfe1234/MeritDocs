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
