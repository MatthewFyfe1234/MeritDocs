import { useRef, useState, useEffect, useCallback } from 'react';
import type { TimelineConfig, TimelineImageOverlay, TimelineAudioClip, TimelineSpeedZone } from '../../types';
import { Film, Plus } from 'lucide-react';
import { TimelinePlayer } from './TimelinePlayer';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type DragPart = 'move' | 'left' | 'right';

type DragState = {
  track: 'image' | 'audio' | 'speed';
  index: number;
  part: DragPart;
  startX: number;
  origStart: number;
  origEnd: number;
} | null;

const SPEED_PRESETS = [0.25, 0.5, 0.75, 2, 3, 4, 5, 10];
const SPEED_COLOR   = '#e8a438';

const TRACK_H  = 44;
const RULER_H  = 28;
const HANDLE_W = 10;
const MIN_DUR  = 0.5;
const SECTION_H = 24; // section label row height

function tickInterval(scale: number): number {
  if (scale >= 40) return 1;
  if (scale >= 16) return 5;
  if (scale >= 6)  return 10;
  return 30;
}

function fmt(s: number): string {
  const m  = Math.floor(s / 60);
  const ss = Math.floor(s % 60);
  return `${m}:${ss.toString().padStart(2, '0')}`;
}

// ---------------------------------------------------------------------------
// TrackEditor
// ---------------------------------------------------------------------------

function TrackEditor({
  overlays, audioClips, audioDurations, speedZones, duration, currentTime,
  onOverlayChange, onAudioChange, onSpeedChange, onSeek,
}: {
  overlays: TimelineImageOverlay[];
  audioClips: TimelineAudioClip[];
  audioDurations: Record<string, number>;
  speedZones: TimelineSpeedZone[];
  duration: number;
  currentTime: number;
  onOverlayChange: (overlays: TimelineImageOverlay[]) => void;
  onAudioChange: (clips: TimelineAudioClip[]) => void;
  onSpeedChange: (zones: TimelineSpeedZone[]) => void;
  onSeek: (t: number) => void;
}) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [drag, setDrag]   = useState<DragState>(null);
  const [selectedSpeed, setSelectedSpeed] = useState<number | null>(null);
  const dragRef        = useRef<DragState>(null);
  const scrubRef       = useRef(false);
  const overlaysRef    = useRef(overlays);
  const audioRef       = useRef(audioClips);
  const speedRef       = useRef(speedZones);
  overlaysRef.current  = overlays;
  audioRef.current     = audioClips;
  speedRef.current     = speedZones;

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(e => setWidth(e[0].contentRect.width));
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const scale = duration > 0 && width > 0 ? width / duration : 1;
  const toX   = (t: number) => t * scale;
  const toT   = (x: number) => Math.max(0, Math.min(duration, x / scale));

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (scrubRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      onSeek(Math.max(0, Math.min(duration, (e.clientX - rect.left) / (duration > 0 && width > 0 ? width / duration : 1))));
      return;
    }
    const d = dragRef.current;
    if (!d || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dt   = (e.clientX - rect.left - d.startX) / scale;

    const clampMove = (origStart: number, origEnd: number) => {
      const dur = origEnd - origStart;
      const newStart = Math.max(0, Math.min(duration - dur, origStart + dt));
      return { newStart, newEnd: newStart + dur };
    };
    const clampResize = (origStart: number, origEnd: number) => ({
      newStart: d.part === 'left' ? Math.max(0, Math.min(origEnd - MIN_DUR, origStart + dt)) : origStart,
      newEnd:   d.part === 'right' ? Math.max(origStart + MIN_DUR, Math.min(duration, origEnd + dt)) : origEnd,
    });
    const apply = (origStart: number, origEnd: number) =>
      d.part === 'move' ? clampMove(origStart, origEnd) : clampResize(origStart, origEnd);

    if (d.track === 'image') {
      const { newStart, newEnd } = apply(d.origStart, d.origEnd);
      onOverlayChange(overlaysRef.current.map((ov, i) =>
        i === d.index ? { ...ov, startTime: +newStart.toFixed(2), endTime: +newEnd.toFixed(2) } : ov
      ));
    } else if (d.track === 'audio') {
      const clipDur  = d.origEnd - d.origStart;
      const newStart = Math.max(0, Math.min(duration - clipDur, d.origStart + dt));
      onAudioChange(audioRef.current.map((c, i) =>
        i === d.index ? { ...c, startTime: +newStart.toFixed(2) } : c
      ));
    } else {
      const { newStart, newEnd } = apply(d.origStart, d.origEnd);
      onSpeedChange(speedRef.current.map((z, i) =>
        i === d.index ? { ...z, startTime: +newStart.toFixed(2), endTime: +newEnd.toFixed(2) } : z
      ));
    }
  }, [scale, duration, onOverlayChange, onAudioChange, onSpeedChange]);

  const handleMouseUp = useCallback(() => {
    scrubRef.current = false;
    dragRef.current = null;
    setDrag(null);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup',   handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup',   handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  function startDrag(e: React.MouseEvent, track: 'image' | 'audio' | 'speed', index: number, part: DragPart, origStart: number, origEnd: number) {
    e.preventDefault();
    const rect  = containerRef.current!.getBoundingClientRect();
    const state: DragState = { track, index, part, startX: e.clientX - rect.left, origStart, origEnd };
    dragRef.current = state;
    setDrag(state);
  }

  const interval = tickInterval(scale);
  const ticks: number[] = [];
  for (let t = 0; t <= duration; t += interval) ticks.push(t);

  const hasAudio  = audioClips.length > 0;
  const totalH    = RULER_H
    + overlays.length * TRACK_H
    + (hasAudio ? SECTION_H + audioClips.length * TRACK_H : 0)
    + SECTION_H + TRACK_H; // speed row — one shared lane

  const cursor = drag
    ? (drag.part === 'move' ? 'grabbing' : 'ew-resize')
    : 'default';

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none overflow-hidden rounded-lg"
      style={{
        height: totalH,
        backgroundColor: 'var(--slide-bg-primary-muted)',
        border: '1px solid var(--slide-border-primary)',
        cursor,
      }}
    >
      {/* Ruler */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: RULER_H, borderBottom: '1px solid var(--slide-border-primary)', cursor: 'ew-resize' }}
        onMouseDown={e => {
          e.preventDefault();
          if (!containerRef.current) return;
          scrubRef.current = true;
          onSeek(toT(e.clientX - containerRef.current.getBoundingClientRect().left));
        }}
      >
        {ticks.map(t => (
          <div key={t} className="absolute top-0 flex flex-col items-start" style={{ left: toX(t) }}>
            <div style={{ width: 1, height: t % (interval * 2) === 0 ? 10 : 5, backgroundColor: 'var(--slide-border-primary)' }} />
            {t % (interval * 2) === 0 && (
              <span style={{ fontSize: 10, color: 'var(--slide-text)', opacity: 0.4, paddingLeft: 3 }}>
                {fmt(t)}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Image overlay tracks */}
      {overlays.map((ov, i) => {
        const barLeft  = toX(ov.startTime);
        const barWidth = Math.max(HANDLE_W * 2 + 2, toX(ov.endTime) - toX(ov.startTime));
        const label    = ov.src.split('/').pop()?.replace(/\.[^.]+$/, '') ?? `image ${i + 1}`;
        const active   = drag?.track === 'image' && drag.index === i;

        return (
          <div key={i} className="absolute left-0 right-0"
            style={{ top: RULER_H + i * TRACK_H, height: TRACK_H, borderBottom: '1px solid var(--slide-border-primary)' }}
          >
            <div className="absolute top-2 rounded" style={{
              left: barLeft, width: barWidth, height: TRACK_H - 16,
              backgroundColor: active ? 'var(--slide-accent)' : 'var(--slide-bg-accent-muted)',
              border: '1px solid var(--slide-accent)',
              opacity: active ? 0.9 : 0.75,
            }}>
              {/* Left handle */}
              <div className="absolute inset-y-0 left-0 flex items-center justify-center rounded-l"
                style={{ width: HANDLE_W, cursor: 'ew-resize', backgroundColor: 'var(--slide-accent)' }}
                onMouseDown={e => startDrag(e, 'image', i, 'left', ov.startTime, ov.endTime)}
              >
                <div style={{ width: 1, height: '50%', backgroundColor: 'rgba(255,255,255,0.5)' }} />
              </div>
              {/* Body */}
              <div className="absolute inset-y-0 flex items-center overflow-hidden px-1"
                style={{ left: HANDLE_W, right: HANDLE_W, cursor: 'grab' }}
                onMouseDown={e => startDrag(e, 'image', i, 'move', ov.startTime, ov.endTime)}
              >
                <span className="truncate" style={{ fontSize: 10, color: 'var(--slide-accent)', fontWeight: 500 }}>
                  {label} &nbsp; {fmt(ov.startTime)}–{fmt(ov.endTime)}
                </span>
              </div>
              {/* Right handle */}
              <div className="absolute inset-y-0 right-0 flex items-center justify-center rounded-r"
                style={{ width: HANDLE_W, cursor: 'ew-resize', backgroundColor: 'var(--slide-accent)' }}
                onMouseDown={e => startDrag(e, 'image', i, 'right', ov.startTime, ov.endTime)}
              >
                <div style={{ width: 1, height: '50%', backgroundColor: 'rgba(255,255,255,0.5)' }} />
              </div>
            </div>
          </div>
        );
      })}

      {/* Audio section */}
      {hasAudio && (() => {
        const audioTop = RULER_H + overlays.length * TRACK_H;
        return (
          <>
            {/* Section label */}
            <div className="absolute left-0 right-0 flex items-center px-3"
              style={{
                top: audioTop, height: SECTION_H,
                borderBottom: '1px solid var(--slide-border-primary)',
                borderTop: overlays.length > 0 ? '1px solid var(--slide-border)' : undefined,
                backgroundColor: 'var(--slide-bg-muted)',
              }}
            >
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--slide-text)', opacity: 0.35, textTransform: 'uppercase' }}>
                Audio
              </span>
            </div>

            {/* Audio clip tracks */}
            {audioClips.map((clip, i) => {
              const clipDur  = audioDurations[clip.src] ?? 0;
              const barLeft  = toX(clip.startTime);
              const barWidth = clipDur > 0 ? Math.max(4, toX(clipDur)) : 40;
              const label    = clip.label ?? clip.src.split('/').pop()?.replace(/\.[^.]+$/, '') ?? `clip ${i + 1}`;
              const active   = drag?.track === 'audio' && drag.index === i;
              const trackTop = audioTop + SECTION_H + i * TRACK_H;

              return (
                <div key={i} className="absolute left-0 right-0"
                  style={{ top: trackTop, height: TRACK_H, borderBottom: '1px solid var(--slide-border-primary)' }}
                >
                  <div
                    className="absolute top-2 rounded"
                    style={{
                      left: barLeft, width: barWidth, height: TRACK_H - 16,
                      backgroundColor: active ? 'var(--slide-primary)' : 'var(--slide-bg-muted)',
                      border: '1px solid var(--slide-primary)',
                      opacity: active ? 0.85 : 0.65,
                      cursor: clipDur > 0 ? 'grab' : 'default',
                    }}
                    onMouseDown={clipDur > 0 ? e => startDrag(e, 'audio', i, 'move', clip.startTime, clip.startTime + clipDur) : undefined}
                  >
                    <div className="absolute inset-y-0 inset-x-0 flex items-center overflow-hidden px-2">
                      <span className="truncate" style={{ fontSize: 10, color: 'var(--slide-primary)', fontWeight: 500 }}>
                        {label}{clipDur > 0 ? ` · ${fmt(clip.startTime)}` : ' · loading…'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        );
      })()}

      {/* Speed section */}
      {(() => {
        const sectionTop = RULER_H + overlays.length * TRACK_H + (audioClips.length > 0 ? SECTION_H + audioClips.length * TRACK_H : 0);
        const trackTop   = sectionTop + SECTION_H;
        return (
          <>
            <div className="absolute left-0 right-0 flex items-center justify-between px-3"
              style={{
                top: sectionTop, height: SECTION_H,
                borderBottom: '1px solid var(--slide-border-primary)',
                borderTop: '1px solid var(--slide-border)',
                backgroundColor: 'var(--slide-bg-muted)',
              }}
            >
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--slide-text)', opacity: 0.35, textTransform: 'uppercase' }}>
                Speed
              </span>
              <button
                className="flex items-center gap-1"
                style={{ fontSize: 9, color: SPEED_COLOR, opacity: 0.7, background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px' }}
                onClick={() => {
                  const newZone: TimelineSpeedZone = { startTime: 0, endTime: Math.min(10, duration), rate: 2 };
                  onSpeedChange([...speedZones, newZone]);
                }}
              >
                <Plus className="w-2.5 h-2.5" /> Add zone
              </button>
            </div>

            <div className="absolute left-0 right-0"
              style={{ top: trackTop, height: TRACK_H, borderBottom: '1px solid var(--slide-border-primary)' }}
              onClick={() => setSelectedSpeed(null)}
            >
              {speedZones.map((zone, i) => {
                const barLeft  = toX(zone.startTime);
                const barWidth = Math.max(HANDLE_W * 2 + 2, toX(zone.endTime) - toX(zone.startTime));
                const dragging = drag?.track === 'speed' && drag.index === i;
                const selected = selectedSpeed === i;
                const presetIdx = SPEED_PRESETS.indexOf(zone.rate);
                const canDecrease = presetIdx > 0;
                const canIncrease = presetIdx < SPEED_PRESETS.length - 1;
                const setRate = (rate: number) => onSpeedChange(speedZones.map((z, j) => j === i ? { ...z, rate } : z));
                return (
                  <div key={i} className="absolute top-2 rounded" style={{
                    left: barLeft, width: barWidth, height: TRACK_H - 16,
                    backgroundColor: dragging ? SPEED_COLOR : selected ? `${SPEED_COLOR}55` : `${SPEED_COLOR}33`,
                    border: `1px solid ${selected ? SPEED_COLOR : SPEED_COLOR}`,
                    outline: selected ? `2px solid ${SPEED_COLOR}` : 'none',
                    outlineOffset: 1,
                    opacity: dragging ? 0.95 : 0.85,
                  }}>
                    {/* Left handle */}
                    <div className="absolute inset-y-0 left-0 flex items-center justify-center rounded-l"
                      style={{ width: HANDLE_W, cursor: 'ew-resize', backgroundColor: SPEED_COLOR }}
                      onMouseDown={e => startDrag(e, 'speed', i, 'left', zone.startTime, zone.endTime)}
                    >
                      <div style={{ width: 1, height: '50%', backgroundColor: 'rgba(255,255,255,0.5)' }} />
                    </div>
                    {/* Body — click to select */}
                    <div className="absolute inset-y-0 flex items-center justify-center overflow-hidden"
                      style={{ left: HANDLE_W, right: HANDLE_W, cursor: 'grab' }}
                      onMouseDown={e => startDrag(e, 'speed', i, 'move', zone.startTime, zone.endTime)}
                      onClick={e => { e.stopPropagation(); setSelectedSpeed(i); }}
                    >
                      <span style={{ fontSize: 10, color: dragging ? '#fff' : SPEED_COLOR, fontWeight: 700, pointerEvents: 'none' }}>
                        {zone.rate}×
                      </span>
                    </div>
                    {/* Right handle */}
                    <div className="absolute inset-y-0 right-0 flex items-center justify-center rounded-r"
                      style={{ width: HANDLE_W, cursor: 'ew-resize', backgroundColor: SPEED_COLOR }}
                      onMouseDown={e => startDrag(e, 'speed', i, 'right', zone.startTime, zone.endTime)}
                    >
                      <div style={{ width: 1, height: '50%', backgroundColor: 'rgba(255,255,255,0.5)' }} />
                    </div>
                    {/* Floating toolbar above selected zone */}
                    {selected && (
                      <div
                        className="absolute flex items-center gap-1 rounded px-1.5 py-1"
                        style={{
                          bottom: '100%', left: 0, marginBottom: 6,
                          backgroundColor: 'var(--slide-bg-card)',
                          border: `1px solid ${SPEED_COLOR}`,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                          zIndex: 10,
                          whiteSpace: 'nowrap',
                        }}
                        onClick={e => e.stopPropagation()}
                        onMouseDown={e => e.stopPropagation()}
                      >
                        <button
                          disabled={!canDecrease}
                          style={{ fontSize: 12, fontWeight: 700, color: canDecrease ? SPEED_COLOR : 'var(--slide-border-primary)', background: 'none', border: 'none', cursor: canDecrease ? 'pointer' : 'default', padding: '0 2px', lineHeight: 1 }}
                          onClick={() => canDecrease && setRate(SPEED_PRESETS[presetIdx - 1])}
                        >−</button>
                        <span style={{ fontSize: 11, fontWeight: 700, color: SPEED_COLOR, minWidth: 28, textAlign: 'center' }}>
                          {zone.rate}×
                        </span>
                        <button
                          disabled={!canIncrease}
                          style={{ fontSize: 12, fontWeight: 700, color: canIncrease ? SPEED_COLOR : 'var(--slide-border-primary)', background: 'none', border: 'none', cursor: canIncrease ? 'pointer' : 'default', padding: '0 2px', lineHeight: 1 }}
                          onClick={() => canIncrease && setRate(SPEED_PRESETS[presetIdx + 1])}
                        >+</button>
                        <div style={{ width: 1, height: 14, backgroundColor: 'var(--slide-border-primary)', margin: '0 2px' }} />
                        <button
                          style={{ fontSize: 11, color: 'var(--slide-text)', opacity: 0.5, background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px', lineHeight: 1 }}
                          onClick={() => { onSpeedChange(speedZones.filter((_, j) => j !== i)); setSelectedSpeed(null); }}
                        >✕</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        );
      })()}

      {/* Playhead */}
      {duration > 0 && (
        <div className="absolute top-0 pointer-events-none"
          style={{ left: toX(currentTime), bottom: 0, width: 1, backgroundColor: 'var(--slide-accent)', opacity: 0.9 }}
        >
          {/* Grab handle */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 14,
            height: RULER_H,
            cursor: 'ew-resize',
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
            onMouseDown={e => {
              e.preventDefault();
              scrubRef.current = true;
            }}
          >
            <div style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: 'var(--slide-accent)',
              border: '2px solid var(--slide-bg)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
            }} />
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Editor shell
// ---------------------------------------------------------------------------

const STORAGE_KEY_PREFIX = 'merit-timeline-';

function readStorage(key: string) {
  try { return JSON.parse(localStorage.getItem(key) ?? 'null') ?? {}; }
  catch { return {}; }
}

// Stable filename from a Vite asset URL (strips path and cache-busting query params)
function assetFilename(src: string): string {
  return src.split('/').pop()?.split('?')[0] ?? src;
}

// Merge config items with saved timings by filename — robust to Vite URL changes
function mergeOverlays(config: TimelineImageOverlay[], saved: Array<{ filename: string; startTime: number; endTime: number }> | undefined): TimelineImageOverlay[] {
  if (!saved?.length) return config;
  return config.map(item => {
    const s = saved.find(x => x.filename === assetFilename(item.src));
    return s ? { ...item, startTime: s.startTime, endTime: s.endTime } : item;
  });
}

function mergeAudio(config: TimelineAudioClip[], saved: Array<{ filename: string; startTime: number }> | undefined): TimelineAudioClip[] {
  if (!saved?.length) return config;
  return config.map(item => {
    const s = saved.find(x => x.filename === assetFilename(item.src));
    return s ? { ...item, startTime: s.startTime } : item;
  });
}

export function TimelineEditor({ timeline: initialTimeline }: { timeline: TimelineConfig }) {
  const storageKey = STORAGE_KEY_PREFIX + initialTimeline.exportFilename;

  const [imageOverlays, setImageOverlays] = useState<TimelineImageOverlay[]>(() => {
    const saved = readStorage(storageKey);
    return mergeOverlays(initialTimeline.imageOverlays ?? [], saved.imageOverlays);
  });
  const [audioClips, setAudioClips] = useState<TimelineAudioClip[]>(() => {
    const saved = readStorage(storageKey);
    return mergeAudio(initialTimeline.audioClips ?? [], saved.audioClips);
  });
  const [speedZones, setSpeedZones] = useState<TimelineSpeedZone[]>(() => {
    const saved = readStorage(storageKey);
    return (saved.speedZones as TimelineSpeedZone[] | undefined) ?? (initialTimeline.speedZones ?? []);
  });
  const [audioDurations, setAudioDurations] = useState<Record<string, number>>({});
  const [currentTime, setCurrentTime] = useState(0);
  const [duration,    setDuration]    = useState(0);
  const [seekTarget,  setSeekTarget]  = useState<number | null>(null);

  // Persist timings to localStorage (debounced)
  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem(storageKey, JSON.stringify({
        imageOverlays: imageOverlays.map(o => ({ filename: assetFilename(o.src), startTime: o.startTime, endTime: o.endTime })),
        audioClips:    audioClips.map(c    => ({ filename: assetFilename(c.src), startTime: c.startTime })),
        speedZones,
      }));
    }, 300);
    return () => clearTimeout(id);
  }, [imageOverlays, audioClips, speedZones]);

  // Load audio durations
  useEffect(() => {
    for (const clip of audioClips) {
      if (audioDurations[clip.src] != null) continue;
      const el = new Audio(clip.src);
      el.addEventListener('loadedmetadata', () => {
        setAudioDurations(prev => ({ ...prev, [clip.src]: el.duration }));
      });
      el.load();
    }
  }, [audioClips]);

  const timeline: TimelineConfig = { ...initialTimeline, imageOverlays, audioClips, speedZones };

  function handleTimeUpdate(t: number, d: number) {
    setCurrentTime(t);
    if (d && d !== duration) setDuration(d);
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--slide-bg)', fontFamily: '"Inter", sans-serif' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button onClick={() => { window.location.search = ''; }}
            className="text-xs mb-5 flex items-center gap-1.5"
            style={{ color: 'var(--slide-text)', opacity: 0.4 }}
          >
            ← Back
          </button>
          <div className="flex items-center gap-2 mb-1">
            <Film className="w-4 h-4" style={{ color: 'var(--slide-accent)' }} />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--slide-accent)', opacity: 0.7 }}>
              Timeline
            </span>
          </div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--slide-primary)' }}>
            {timeline.title}
          </h1>
        </div>

        {/* Player */}
        <TimelinePlayer
          timeline={timeline}
          imageOverlays={imageOverlays}
          onTimeUpdate={handleTimeUpdate}
          seekTarget={seekTarget}
          onSeeked={() => setSeekTarget(null)}
        />

        {/* Track editor */}
        {duration > 0 && (
          <div className="mt-6">
            <TrackEditor
              overlays={imageOverlays}
              audioClips={audioClips}
              audioDurations={audioDurations}
              speedZones={speedZones}
              duration={duration}
              currentTime={currentTime}
              onOverlayChange={setImageOverlays}
              onAudioChange={setAudioClips}
              onSpeedChange={setSpeedZones}
              onSeek={setSeekTarget}
            />
          </div>
        )}

        {/* Timing table */}
        {(imageOverlays.length > 0 || audioClips.length > 0) && (
          <div className="mt-4 flex flex-col gap-1.5">
            {imageOverlays.map((ov, i) => (
              <div key={`img-${i}`} className="flex items-center gap-4 px-4 py-2.5 rounded-lg text-xs"
                style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}
              >
                <span className="w-5 text-center font-bold" style={{ color: 'var(--slide-accent)' }}>{i + 1}</span>
                <span className="flex-1 truncate" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
                  {ov.src.split('/').pop()}
                </span>
                <span className="tabular-nums shrink-0" style={{ color: 'var(--slide-text)', opacity: 0.4 }}>
                  {ov.startTime.toFixed(1)}s – {ov.endTime.toFixed(1)}s
                </span>
              </div>
            ))}
            {audioClips.map((clip, i) => (
              <div key={`aud-${i}`} className="flex items-center gap-4 px-4 py-2.5 rounded-lg text-xs"
                style={{ backgroundColor: 'var(--slide-bg-primary-muted)', border: '1px solid var(--slide-border-primary)' }}
              >
                <span className="w-5 text-center font-bold" style={{ color: 'var(--slide-primary)' }}>♪</span>
                <span className="flex-1 truncate" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
                  {clip.label ?? clip.src.split('/').pop()}
                </span>
                <span className="tabular-nums shrink-0" style={{ color: 'var(--slide-text)', opacity: 0.4 }}>
                  {clip.startTime.toFixed(1)}s
                  {audioDurations[clip.src] != null ? ` – ${(clip.startTime + audioDurations[clip.src]).toFixed(1)}s` : ''}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
