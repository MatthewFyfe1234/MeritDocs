import { useEffect, useRef, useCallback } from 'react';
import type { StickNotesConfig } from '../types';

export function NotesDeck({ sticknotes }: { sticknotes: StickNotesConfig }) {
  const cards = sticknotes.cards;
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const locked = useRef(false);
  const currentRef = useRef(0);

  const goTo = useCallback((index: number) => {
    if (locked.current) return;
    const clamped = Math.max(0, Math.min(index, cards.length - 1));
    if (clamped === currentRef.current) return;
    currentRef.current = clamped;
    const card = cardRefs.current[clamped];
    if (card && containerRef.current) {
      containerRef.current.scrollTo({ top: card.offsetTop, behavior: 'instant' });
    }
    locked.current = true;
  }, [cards.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let unlockTimer: ReturnType<typeof setTimeout> | null = null;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      goTo(currentRef.current + (e.deltaY > 0 ? 1 : -1));
      // Reset the unlock timer on every wheel event so the lock holds
      // for the full 200ms after the gesture stops, not after it starts.
      if (unlockTimer) clearTimeout(unlockTimer);
      unlockTimer = setTimeout(() => { locked.current = false; }, 300);
    };
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (unlockTimer) clearTimeout(unlockTimer);
    };
  }, [goTo]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goTo(currentRef.current + 1);
      if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  goTo(currentRef.current - 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goTo]);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-y-scroll"
      style={{ backgroundColor: 'var(--slide-bg)', fontFamily: '"Inter", sans-serif' }}
    >
      {cards.map((card, i) => (
        <div
          key={i}
          ref={el => { cardRefs.current[i] = el; }}
          style={{ minHeight: '100svh' }}
        >
          {card}
        </div>
      ))}
    </div>
  );
}
