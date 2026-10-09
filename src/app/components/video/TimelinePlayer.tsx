import { useRef, useState, useEffect } from 'react';
import type { TimelineConfig, TimelineImageOverlay, TimedTextOverlay, VideoLogo, TimelineTitleCard } from '../../types';
import { normalizeBg } from '../../types';
import { Play, Pause, RotateCcw, Download, Volume2, VolumeX } from 'lucide-react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

// Lazily loaded, shared across exports.
let ffmpegPromise: Promise<FFmpeg> | null = null;
function loadFFmpeg(): Promise<FFmpeg> {
  if (!ffmpegPromise) {
    ffmpegPromise = (async () => {
      const ffmpeg = new FFmpeg();
      ffmpeg.on('log', ({ message }) => console.log('[ffmpeg]', message));

      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
      console.log('[export] fetching ffmpeg-core.js...');
      const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript');
      console.log('[export] fetching ffmpeg-core.wasm (~30MB)...');
      const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm');
      console.log('[export] core fetched, loading worker...');

      const loadTimeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('ffmpeg worker did not signal ready within 30s')), 30_000));
      await Promise.race([ffmpeg.load({ coreURL, wasmURL }), loadTimeout]);
      console.log('[export] ffmpeg worker ready');
      return ffmpeg;
    })().catch(err => {
      ffmpegPromise = null; // allow retry instead of permanently caching the failure
      throw err;
    });
  }
  return ffmpegPromise;
}

const W = 1920;
const H = 1080;
const FADE_SECS = 0.4;

function fmt(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxPx: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width > maxPx && line) { lines.push(line); line = word; }
    else line = candidate;
  }
  if (line) lines.push(line);
  return lines;
}

function resolveColor(color: string): string {
  if (!color.startsWith('var(')) return color;
  const name = color.slice(4, -1).trim();
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || color;
}

function drawLogo(ctx: CanvasRenderingContext2D, img: HTMLImageElement, cfg: VideoLogo) {
  const h      = cfg.size ?? 60;
  const w      = (img.naturalWidth / img.naturalHeight) * h;
  const pad    = cfg.padding ?? 40;
  const corner = cfg.corner ?? 'br';
  const x      = corner.endsWith('r') ? W - pad - w : pad;
  const y      = corner.startsWith('b') ? H - pad - h : pad;

  const bgPad = 16;
  ctx.save();
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#9314ff';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(x - bgPad, y - bgPad, w + bgPad * 2, h + bgPad * 2, 8);
  ctx.fill();
  ctx.stroke();
  ctx.globalAlpha = cfg.opacity ?? 1;
  ctx.drawImage(img, x, y, w, h);
  ctx.restore();
}

function drawTextOverlay(ctx: CanvasRenderingContext2D, ov: TimedTextOverlay, alpha: number) {
  const x = ov.x * W;
  const y = ov.y * H;
  const fs = ov.fontSize;
  const maxPx = (ov.maxWidth ?? 0.8) * W;
  const lh = (ov.lineHeight ?? 1.35) * fs;
  const align = ov.textAlign ?? 'left';

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = `${ov.fontWeight ?? 'normal'} ${fs}px Inter, -apple-system, sans-serif`;
  ctx.textAlign = align;
  ctx.textBaseline = 'top';

  const lines = wrapText(ctx, ov.text, maxPx);
  const blockH = lines.length * lh - (lh - fs);
  const blockW = Math.max(...lines.map(l => ctx.measureText(l).width));

  if (ov.backdrop) {
    const pad = ov.backdropPadding ?? 24;
    const r = ov.backdropRadius ?? 12;
    let rx = x - pad;
    if (align === 'center') rx = x - blockW / 2 - pad;
    if (align === 'right')  rx = x - blockW - pad;
    ctx.fillStyle = resolveColor(ov.backdrop);
    ctx.beginPath();
    ctx.roundRect(rx, y - pad, blockW + pad * 2, blockH + pad * 2, r);
    ctx.fill();
  }

  ctx.fillStyle = resolveColor(ov.color);
  for (let i = 0; i < lines.length; i++) ctx.fillText(lines[i], x, y + i * lh);
  ctx.restore();
}

function overlayAlpha(t: number, ov: { startTime: number; endTime: number; transition?: 'fade' | 'cut' }): number {
  if (t < ov.startTime || t >= ov.endTime) return 0;
  if (ov.transition !== 'fade') return 1;
  const fadeIn  = Math.min(1, (t - ov.startTime) / FADE_SECS);
  const fadeOut = Math.min(1, (ov.endTime - t) / FADE_SECS);
  return Math.min(fadeIn, fadeOut);
}

// Draws an intro/outro title card. `baseFrame` (when provided) is the held last video
// frame, shown under the card for its first fraction of a second so the outro dissolves
// out of the footage instead of cutting to black first; the card itself always fades in
// and out against solid black, which is what gives the intro its "fade up" open.
function drawFadeCard(
  ctx: CanvasRenderingContext2D,
  cfg: TimelineTitleCard,
  elapsed: number,
  duration: number,
  baseFrame: HTMLCanvasElement | null,
  logoImg: HTMLImageElement | null,
) {
  const fade = Math.min(0.6, duration / 3);
  const contentAlpha = elapsed < fade
    ? elapsed / fade
    : elapsed > duration - fade
      ? Math.max(0, (duration - elapsed) / fade)
      : 1;

  if (baseFrame && elapsed < fade) {
    ctx.drawImage(baseFrame, 0, 0, W, H);
  } else {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, W, H);
  }

  if (contentAlpha <= 0) return;

  ctx.save();
  ctx.globalAlpha = contentAlpha;
  ctx.fillStyle = cfg.background ?? '#0f1117';
  ctx.fillRect(0, 0, W, H);

  // Mirrors CoverSlide's layout: logo, a brand-purple accent bar, title, dimmed subtitle.
  const BRAND_PURPLE = '#9314ff';
  const showLogo = cfg.showLogo !== false && !!logoImg;
  const hasText  = !!(cfg.title || cfg.subtitle);

  const logoH = 100;
  const logoW = logoImg ? (logoImg.naturalWidth / logoImg.naturalHeight) * logoH : 0;
  const barW = 110;
  const barH = 4;
  const titleH = cfg.title ? 62 : 0;
  const subtitleH = cfg.subtitle ? 34 : 0;
  const gapLogoToBar   = showLogo ? 28 : 0;
  const gapBarToTitle  = (showLogo && hasText) ? 26 : 0;
  const gapTitleToSub  = (cfg.title && cfg.subtitle) ? 14 : 0;

  const blockH = (showLogo ? logoH + gapLogoToBar + barH : 0) + gapBarToTitle + titleH + gapTitleToSub + subtitleH;
  let y = H / 2 - blockH / 2;

  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  if (showLogo && logoImg) {
    ctx.drawImage(logoImg, (W - logoW) / 2, y, logoW, logoH);
    y += logoH + gapLogoToBar;

    ctx.fillStyle = BRAND_PURPLE;
    ctx.fillRect(W / 2 - barW / 2, y, barW, barH);
    y += barH + gapBarToTitle;
  }

  if (cfg.title) {
    ctx.fillStyle = '#ffffff';
    ctx.font = '600 56px Inter, -apple-system, sans-serif';
    ctx.fillText(cfg.title, W / 2, y);
    y += titleH + gapTitleToSub;
  }
  if (cfg.subtitle) {
    ctx.globalAlpha = contentAlpha * 0.75;
    ctx.fillStyle = '#ffffff';
    ctx.font = '400 28px Inter, -apple-system, sans-serif';
    ctx.fillText(cfg.subtitle, W / 2, y);
  }
  ctx.restore();
}

export function TimelinePlayer({
  timeline,
  imageOverlays: overrideOverlays,
  onTimeUpdate,
  seekTarget,
  onSeeked,
}: {
  timeline: TimelineConfig;
  imageOverlays?: TimelineImageOverlay[];
  onTimeUpdate?: (time: number, duration: number) => void;
  seekTarget?: number | null;
  onSeeked?: () => void;
}) {
  const backgrounds = normalizeBg(timeline.background);

  const canvasRef         = useRef<HTMLCanvasElement>(null);
  const lastFrameRef      = useRef<HTMLCanvasElement | null>(null); // holds last frame across video transitions
  const videoRef          = useRef<HTMLVideoElement>(null);
  const logoRef           = useRef<HTMLImageElement | null>(null);
  const imgCacheRef       = useRef<Map<string, HTMLImageElement>>(new Map());
  const audioElemsRef     = useRef<Map<string, HTMLAudioElement>>(new Map());
  const audioPendingRef   = useRef<Set<string>>(new Set()); // clips with an in-flight play() promise
  const audioResyncRef    = useRef(false);
  const rafRef            = useRef(0);
  const drawRef           = useRef<() => void>(() => {});
  // Multi-video playlist state
  const bgIndexRef        = useRef(0);
  const bgDursRef         = useRef<number[]>(new Array(backgrounds.length).fill(0));
  const pendingSeekRef    = useRef<number | null>(null);
  const pendingPlayRef    = useRef(false);
  // Intro/outro title cards (no <video> element drives these — their own rAF clock does)
  const introCfg          = timeline.intro;
  const outroCfg          = timeline.outro;
  const introDur          = introCfg ? Math.max(0.1, introCfg.duration ?? 2.5) : 0;
  const outroDur          = outroCfg ? Math.max(0.1, outroCfg.duration ?? 2.5) : 0;
  const phaseRef          = useRef<'intro' | 'video' | 'outro'>(introDur > 0 ? 'intro' : 'video');
  const introElapsedRef   = useRef(0);
  const outroElapsedRef   = useRef(0);
  const clockLastTsRef    = useRef<number | null>(null);

  const [isPlaying,    setIsPlaying]    = useState(false);
  const [currentTime,  setCurrentTime]  = useState(0);
  const [duration,     setDuration]     = useState(0);
  const [isExporting,    setIsExporting]    = useState(false);
  const [isConverting,   setIsConverting]   = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportQuality,  setExportQuality]  = useState<'low' | 'medium' | 'high'>('medium');
  const [isMuted,        setIsMuted]        = useState(false);

  const activeOverlays = overrideOverlays ?? timeline.imageOverlays ?? [];
  const audioClips     = timeline.audioClips ?? [];

  function getBgStarts(): number[] {
    const starts = [0];
    for (let i = 0; i < backgrounds.length - 1; i++)
      starts.push(starts[i] + (bgDursRef.current[i] || 0));
    return starts;
  }
  // Time within the background video playlist (0 = first frame of bg video). Unaffected
  // by intro/outro — this is what image/audio/speed overlay timings are authored against.
  function getVideoRelTime(): number {
    const video = videoRef.current;
    if (!video) return 0;
    const clip = backgrounds[bgIndexRef.current];
    return (getBgStarts()[bgIndexRef.current] || 0) + (video.currentTime - clip.startTime);
  }
  function getTotalDur(): number {
    return bgDursRef.current.reduce((a, b) => a + b, 0);
  }
  // Absolute position across intro + video + outro — drives the player's own scrubber.
  function getAbsTime(): number {
    if (phaseRef.current === 'intro') return introElapsedRef.current;
    if (phaseRef.current === 'outro') return introDur + getTotalDur() + outroElapsedRef.current;
    return introDur + getVideoRelTime();
  }
  function getTotalAbsDur(): number {
    return introDur + getTotalDur() + outroDur;
  }
  function switchBg(idx: number, seekTo: number, autoPlay: boolean) {
    const video = videoRef.current;
    if (!video || idx >= backgrounds.length) return;
    const clip = backgrounds[idx];
    bgIndexRef.current = idx;
    pendingSeekRef.current = clip.startTime + seekTo;
    pendingPlayRef.current = autoPlay;
    video.src = clip.src;
    video.load();
  }
  function seekToGlobal(targetAbs: number) {
    const totalVideo = getTotalDur();
    audioResyncRef.current = true;

    if (introDur > 0 && targetAbs < introDur) {
      phaseRef.current = 'intro';
      introElapsedRef.current = Math.max(0, targetAbs);
      clockLastTsRef.current = null;
      videoRef.current?.pause();
      pauseAllAudio();
      drawRef.current();
      return;
    }
    if (outroDur > 0 && targetAbs >= introDur + totalVideo) {
      phaseRef.current = 'outro';
      outroElapsedRef.current = Math.max(0, Math.min(outroDur, targetAbs - introDur - totalVideo));
      clockLastTsRef.current = null;
      videoRef.current?.pause();
      pauseAllAudio();
      drawRef.current();
      return;
    }

    phaseRef.current = 'video';
    const targetVideoT = Math.max(0, targetAbs - introDur);
    const starts = getBgStarts();
    let targetIdx = 0;
    for (let i = starts.length - 1; i >= 0; i--) {
      if (targetVideoT >= starts[i]) { targetIdx = i; break; }
    }
    const localOffset = targetVideoT - starts[targetIdx]; // offset within the clip
    if (targetIdx !== bgIndexRef.current) {
      switchBg(targetIdx, localOffset, false);
    } else if (videoRef.current) {
      videoRef.current.currentTime = backgrounds[targetIdx].startTime + localOffset;
      drawRef.current();
    }
  }

  // Apply mute immediately to all audio elements whenever the toggle changes
  useEffect(() => {
    for (const el of audioElemsRef.current.values()) el.muted = isMuted;
  }, [isMuted]);

  // Create / sync audio elements when clip list changes
  useEffect(() => {
    const map = audioElemsRef.current;
    for (const clip of audioClips) {
      if (!map.has(clip.src)) {
        const el = new Audio(clip.src);
        el.preload = 'auto';
        map.set(clip.src, el);
      }
    }
  }, [audioClips]);

  function syncAudio(videoTime: number, playing: boolean) {
    const resync = audioResyncRef.current;
    audioResyncRef.current = false;

    for (const clip of audioClips) {
      const el = audioElemsRef.current.get(clip.src);
      if (!el) continue;
      const clipDur = isFinite(el.duration) ? el.duration : 0;
      const pastStart = clipDur > 0 && videoTime >= clip.startTime;

      if (!playing) {
        if (!el.paused) el.pause();
        continue;
      }

      if (resync) {
        // Manual seek — reposition and restart if within window
        audioPendingRef.current.delete(clip.src);
        const offset = videoTime - clip.startTime;
        if (offset >= 0 && offset < clipDur) {
          el.currentTime = offset;
          el.play().catch(() => {});
        } else {
          el.pause();
        }
        continue;
      }

      if (pastStart && el.paused && !el.ended && !audioPendingRef.current.has(clip.src)) {
        // Video has reached this clip's start — begin playback (guard prevents re-seeking while play() resolves)
        audioPendingRef.current.add(clip.src);
        el.currentTime = Math.max(0, videoTime - clip.startTime);
        el.play()
          .then(() => { audioPendingRef.current.delete(clip.src); })
          .catch(() => { audioPendingRef.current.delete(clip.src); });
      } else if (!pastStart) {
        // Video is before this clip — reset so it's ready to replay
        audioPendingRef.current.delete(clip.src);
        if (!el.paused) el.pause();
        el.currentTime = 0; // also clears el.ended
      }
      // pastStart && !el.paused: playing normally — leave it
      // pastStart && el.ended: finished naturally — leave it
    }
  }

  function pauseAllAudio() {
    for (const el of audioElemsRef.current.values()) {
      if (!el.paused) el.pause();
    }
  }

  // Seek when seekTarget changes. seekTarget is expressed relative to the background
  // video (matching the overlay/audio timing contract used by the track editor), so
  // shift it into intro-inclusive absolute time before handing it to seekToGlobal.
  useEffect(() => {
    if (seekTarget == null) return;
    seekToGlobal(introDur + seekTarget);
    onSeeked?.();
  }, [seekTarget]);

  // Load logo
  useEffect(() => {
    if (!timeline.logo?.src) return;
    const img = new Image();
    img.onload = () => { logoRef.current = img; drawRef.current(); };
    img.src = timeline.logo.src;
  }, [timeline.logo?.src]);

  // Pre-load durations of all background videos so total duration is known upfront
  useEffect(() => {
    backgrounds.forEach((clip, i) => {
      if (i === 0) return; // active video element handles index 0 via onLoadedMetadata
      if (bgDursRef.current[i]) return; // already known
      const v = document.createElement('video');
      v.preload = 'metadata';
      v.onloadedmetadata = () => {
        const end = isFinite(clip.endTime) ? clip.endTime : v.duration;
        bgDursRef.current[i] = end - clip.startTime;
        setDuration(getTotalAbsDur());
      };
      v.src = clip.src;
    });
  }, []);

  // Pre-load overlay images
  useEffect(() => {
    const map = imgCacheRef.current;
    for (const ov of activeOverlays) {
      if (!map.has(ov.src)) {
        const img = new Image();
        img.onload = () => { map.set(ov.src, img); drawRef.current(); };
        img.src = ov.src;
      }
    }
  }, [activeOverlays]);

  function drawImageOverlay(ctx: CanvasRenderingContext2D, ov: TimelineImageOverlay, t: number) {
    const alpha = overlayAlpha(t, ov);
    if (alpha === 0) return;
    const img = imgCacheRef.current.get(ov.src);
    if (!img) return;

    const canvasW = (ov.width ?? 0.45) * W;
    const canvasH = canvasW * (img.naturalHeight / img.naturalWidth);
    const anchor  = ov.anchor ?? 'tl';
    const px      = (ov.x ?? 0.05) * W;
    const py      = (ov.y ?? 0.05) * H;
    const cx      = anchor.endsWith('r') ? px - canvasW : px;
    const cy      = anchor.startsWith('b') ? py - canvasH : py;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 40;
    ctx.fillRect(cx, cy, canvasW, canvasH);
    ctx.shadowBlur = 0;
    ctx.drawImage(img, cx, cy, canvasW, canvasH);
    ctx.restore();
  }

  function draw() {
    const canvas = canvasRef.current;
    const video  = videoRef.current;
    if (!canvas || !video) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const phase = phaseRef.current;

    if (phase === 'intro' && introCfg) {
      drawFadeCard(ctx, introCfg, introElapsedRef.current, introDur, null, logoRef.current);
      setCurrentTime(getAbsTime());
      onTimeUpdate?.(0, getTotalDur());
      return;
    }
    if (phase === 'outro' && outroCfg) {
      drawFadeCard(ctx, outroCfg, outroElapsedRef.current, outroDur, lastFrameRef.current, logoRef.current);
      setCurrentTime(getAbsTime());
      onTimeUpdate?.(getTotalDur(), getTotalDur());
      return;
    }

    const t = getVideoRelTime();

    if (video.readyState >= 2) {
      ctx.drawImage(video, 0, 0, W, H);
      // Snapshot this frame so we can hold it during the next video transition
      if (!lastFrameRef.current) {
        lastFrameRef.current = document.createElement('canvas');
        lastFrameRef.current.width  = W;
        lastFrameRef.current.height = H;
      }
      lastFrameRef.current.getContext('2d')?.drawImage(canvas, 0, 0);
    } else if (lastFrameRef.current) {
      ctx.drawImage(lastFrameRef.current, 0, 0); // hold last good frame
    } else {
      ctx.fillStyle = '#0f1117';
      ctx.fillRect(0, 0, W, H);
    }

    for (const ov of activeOverlays) drawImageOverlay(ctx, ov, t);
    for (const ov of (timeline.textOverlays ?? [])) {
      const alpha = overlayAlpha(t, ov);
      if (alpha > 0) drawTextOverlay(ctx, ov, alpha);
    }
    if (timeline.logo && logoRef.current) drawLogo(ctx, logoRef.current, timeline.logo);

    setCurrentTime(getAbsTime());
    onTimeUpdate?.(t, getTotalDur());
  }

  drawRef.current = draw;

  // Advances the intro/outro rAF clock (no <video> element drives these phases).
  function introOutroTick(ts: number) {
    if (clockLastTsRef.current == null) clockLastTsRef.current = ts;
    const delta = (ts - clockLastTsRef.current) / 1000;
    clockLastTsRef.current = ts;
    const phase = phaseRef.current;

    if (phase === 'intro') {
      introElapsedRef.current = Math.min(introDur, introElapsedRef.current + delta);
      drawRef.current();
      if (introElapsedRef.current >= introDur) {
        phaseRef.current = 'video';
        clockLastTsRef.current = null;
        const video = videoRef.current;
        const startVideo = () => {
          video?.play().catch(() => {});
          rafRef.current = requestAnimationFrame(tick);
        };
        if (video && video.readyState < 2) {
          const onReady = () => { video.removeEventListener('canplay', onReady); startVideo(); };
          video.addEventListener('canplay', onReady);
        } else {
          startVideo();
        }
        return;
      }
    } else if (phase === 'outro') {
      outroElapsedRef.current = Math.min(outroDur, outroElapsedRef.current + delta);
      drawRef.current();
      if (outroElapsedRef.current >= outroDur) {
        setIsPlaying(false);
        return;
      }
    }

    rafRef.current = requestAnimationFrame(introOutroTick);
  }

  // Called once the background video playlist is exhausted, either via trim out-point
  // or natural end — moves into the outro card if configured, else stops playback.
  function advanceToOutroOrEnd() {
    if (outroDur > 0) {
      phaseRef.current = 'outro';
      outroElapsedRef.current = 0;
      clockLastTsRef.current = null;
      pauseAllAudio();
      rafRef.current = requestAnimationFrame(introOutroTick);
    } else {
      pauseAllAudio();
      setIsPlaying(false);
    }
  }

  function tick() {
    const video = videoRef.current;
    if (video) {
      const clip = backgrounds[bgIndexRef.current];
      // Advance to next clip when trim out-point is reached (before natural video end)
      if (isFinite(clip.endTime) && video.currentTime >= clip.endTime) {
        const nextIdx = bgIndexRef.current + 1;
        if (nextIdx < backgrounds.length) {
          switchBg(nextIdx, 0, true);
        } else {
          advanceToOutroOrEnd();
        }
        return;
      }
      const t = getVideoRelTime();
      const zone = (timeline.speedZones ?? []).find(z => t >= z.startTime && t < z.endTime);
      video.playbackRate = zone?.rate ?? 1;
    }
    drawRef.current();
    // Use !paused || ended so audio keeps running across natural segment transitions
    // (a naturally-ended video sets paused=true, but we don't want to kill audio mid-clip)
    if (video) syncAudio(getVideoRelTime(), !video.paused || video.ended);
    if (video && !video.paused && !video.ended) {
      rafRef.current = requestAnimationFrame(tick);
    }
    // video.ended is handled by onEnded JSX prop
  }

  function play() {
    setIsPlaying(true);
    clockLastTsRef.current = null;
    if (phaseRef.current === 'video') {
      videoRef.current?.play();
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = requestAnimationFrame(introOutroTick);
    }
  }

  function pause() {
    videoRef.current?.pause();
    pauseAllAudio();
    setIsPlaying(false);
    cancelAnimationFrame(rafRef.current);
    drawRef.current();
  }

  function restart() {
    pause();
    phaseRef.current = introDur > 0 ? 'intro' : 'video';
    introElapsedRef.current = 0;
    outroElapsedRef.current = 0;
    clockLastTsRef.current = null;
    if (bgIndexRef.current === 0) {
      if (videoRef.current) videoRef.current.currentTime = 0;
      audioResyncRef.current = true;
      setCurrentTime(0);
      drawRef.current();
    } else {
      switchBg(0, 0, false);
      setCurrentTime(0);
    }
  }

  // Deterministic, non-real-time export: seeks the video to each output frame's exact
  // timestamp and draws it, rather than recording a live playback pass. Live capture
  // (canvas.captureStream + MediaRecorder, driven by real playback) turned out to be
  // unreliable — decode pacing for a display:none video isn't guaranteed to track wall-clock
  // time, so recordings could come out truncated or frozen depending on the browser/machine.
  // Seeking frame-by-frame has no real-time dependency at all, so it can't desync.
  async function startExport() {
    const canvas = canvasRef.current;
    const video  = videoRef.current;
    if (!canvas || !video) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    pause();
    setIsExporting(true);
    setIsConverting(false);
    setExportProgress(0);

    const FPS = 24;
    const totalDur = getTotalAbsDur();

    try {
      if (!(totalDur > 0)) throw new Error('Nothing to export yet.');

      const ffmpeg = await loadFFmpeg();
      const totalVideoDur = getTotalDur();
      const totalFrames = Math.max(1, Math.round(totalDur * FPS));
      const framePad = Math.max(6, String(totalFrames).length);
      const frameName = (i: number) => `frame_${String(i).padStart(framePad, '0')}.jpg`;

      const waitOnce = (target: EventTarget, event: string) => new Promise<void>(resolve => {
        const handler = () => { target.removeEventListener(event, handler); resolve(); };
        target.addEventListener(event, handler);
      });

      async function loadClip(idx: number) {
        bgIndexRef.current = idx;
        const p = waitOnce(video, 'loadedmetadata');
        video.src = backgrounds[idx].src;
        video.load();
        await p;
      }
      async function seekTo(t: number) {
        if (Math.abs(video.currentTime - t) < 0.005) return;
        const p = waitOnce(video, 'seeked');
        video.currentTime = t;
        await p;
      }
      function captureFrame(i: number): Promise<void> {
        return new Promise((resolve, reject) => {
          canvas.toBlob(async blob => {
            if (!blob) { reject(new Error('canvas.toBlob failed')); return; }
            await ffmpeg.writeFile(frameName(i), new Uint8Array(await blob.arrayBuffer()));
            resolve();
          }, 'image/jpeg', 0.92);
        });
      }

      let loadedIdx = -1;
      await loadClip(0); // reload from a known-clean state regardless of prior playback position

      for (let i = 0; i < totalFrames; i++) {
        const tAbs = i / FPS;

        if (introDur > 0 && tAbs < introDur) {
          phaseRef.current = 'intro';
          introElapsedRef.current = tAbs;
        } else if (outroDur > 0 && tAbs >= introDur + totalVideoDur) {
          phaseRef.current = 'outro';
          outroElapsedRef.current = Math.min(outroDur, tAbs - introDur - totalVideoDur);
        } else {
          phaseRef.current = 'video';
          const targetVideoT = Math.max(0, tAbs - introDur);
          const starts = getBgStarts();
          let targetIdx = 0;
          for (let k = starts.length - 1; k >= 0; k--) {
            if (targetVideoT >= starts[k]) { targetIdx = k; break; }
          }
          if (targetIdx !== loadedIdx) {
            await loadClip(targetIdx);
            loadedIdx = targetIdx;
          }
          const localOffset = targetVideoT - starts[targetIdx];
          await seekTo(backgrounds[targetIdx].startTime + localOffset);
        }

        drawRef.current();
        await captureFrame(i);
        setExportProgress(i / totalFrames);
      }

      // Mix in audio clips (if any) directly from source files — no live playback needed.
      const hasAudio = audioClips.length > 0;
      if (hasAudio) {
        for (let idx = 0; idx < audioClips.length; idx++) {
          await ffmpeg.writeFile(`audio_${idx}.mp3`, await fetchFile(audioClips[idx].src));
        }
      }

      setIsExporting(false);
      setIsConverting(true);
      setExportProgress(0);
      const onProgressEvt = ({ progress }: { progress: number }) => setExportProgress(Math.min(1, Math.max(0, progress)));
      ffmpeg.on('progress', onProgressEvt);

      const args = ['-r', String(FPS), '-i', `frame_%0${framePad}d.jpg`];
      if (hasAudio) audioClips.forEach((_, idx) => args.push('-i', `audio_${idx}.mp3`));
      const crf = { low: 30, medium: 23, high: 18 }[exportQuality];
      args.push('-c:v', 'libx264', '-preset', 'veryfast', '-crf', String(crf), '-pix_fmt', 'yuv420p');
      if (hasAudio) {
        const filters = audioClips.map((clip, idx) => {
          const delayMs = Math.max(0, Math.round((introDur + clip.startTime) * 1000));
          return `[${idx + 1}:a]adelay=${delayMs}:all=1[a${idx}]`;
        }).join(';');
        const mixIns = audioClips.map((_, idx) => `[a${idx}]`).join('');
        args.push(
          '-filter_complex', `${filters};${mixIns}amix=inputs=${audioClips.length}:duration=first:dropout_transition=0[aout]`,
          '-map', '0:v', '-map', '[aout]', '-c:a', 'aac',
        );
      }
      args.push('-movflags', '+faststart', '-t', totalDur.toFixed(3), 'out.mp4');

      try {
        await ffmpeg.exec(args);
      } finally {
        ffmpeg.off('progress', onProgressEvt);
      }

      const data = await ffmpeg.readFile('out.mp4');
      const blob = new Blob([new Uint8Array(data as Uint8Array)], { type: 'video/mp4' });
      if (!blob.size) throw new Error('Export produced an empty file');

      const filename = timeline.exportFilename.replace(/\.[^.]+$/, '.mp4');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);

      // Clean up ffmpeg's virtual filesystem
      for (let i = 0; i < totalFrames; i++) await ffmpeg.deleteFile(frameName(i)).catch(() => {});
      if (hasAudio) for (let idx = 0; idx < audioClips.length; idx++) await ffmpeg.deleteFile(`audio_${idx}.mp3`).catch(() => {});
      await ffmpeg.deleteFile('out.mp4').catch(() => {});
    } catch (err) {
      console.error('Export failed:', err);
      alert(`Export failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      // Reset the live player back to a clean state after all the offline seeking.
      switchBg(0, 0, false);
      phaseRef.current = introDur > 0 ? 'intro' : 'video';
      introElapsedRef.current = 0;
      outroElapsedRef.current = 0;
      setCurrentTime(0);
      setIsPlaying(false);
      setIsExporting(false);
      setIsConverting(false);
      setExportProgress(0);
    }
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    seekToGlobal(ratio * duration);
  }

  useEffect(() => {
    const id = setTimeout(() => drawRef.current(), 0);
    return () => { clearTimeout(id); cancelAnimationFrame(rafRef.current); };
  }, []);

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <div className="flex flex-col gap-3">
      <video
        ref={videoRef}
        src={backgrounds[0].src}
        muted
        style={{ display: 'none' }}
        onLoadedMetadata={() => {
          const video = videoRef.current;
          if (!video) return;
          const clip = backgrounds[bgIndexRef.current];
          const end = isFinite(clip.endTime) ? clip.endTime : video.duration;
          bgDursRef.current[bgIndexRef.current] = end - clip.startTime;
          setDuration(getTotalAbsDur());
          if (pendingSeekRef.current !== null) {
            video.currentTime = pendingSeekRef.current;
            pendingSeekRef.current = null;
          }
          if (pendingPlayRef.current) {
            pendingPlayRef.current = false;
            video.play().then(() => {
              setIsPlaying(true);
              rafRef.current = requestAnimationFrame(tick);
            }).catch(() => {});
          }
          drawRef.current();
        }}
        onSeeked={() => drawRef.current()}
        onEnded={() => {
          const nextIdx = bgIndexRef.current + 1;
          if (nextIdx < backgrounds.length) {
            switchBg(nextIdx, 0, true);
          } else {
            advanceToOutroOrEnd();
          }
        }}
      />

      <div className="w-full rounded-lg overflow-hidden" style={{ aspectRatio: '16/9', backgroundColor: '#000' }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      </div>

      {/* Progress bar */}
      <div
        className="relative h-1.5 rounded-full cursor-pointer group"
        style={{ backgroundColor: 'var(--slide-border-primary)' }}
        onClick={seek}
      >
        <div className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${progress * 100}%`, backgroundColor: 'var(--slide-accent)' }} />
        <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full -ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: `${progress * 100}%`, backgroundColor: 'var(--slide-accent)', border: '2px solid var(--slide-bg)' }} />
      </div>

      {/* Export progress bar */}
      {isExporting && (
        <div className="relative h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--slide-border-primary)' }}>
          <div className="absolute inset-y-0 left-0 rounded-full transition-all"
            style={{ width: `${exportProgress * 100}%`, backgroundColor: '#e8a438' }} />
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button onClick={restart} disabled={isExporting} className="p-1.5 rounded" style={{ color: 'var(--slide-text)', opacity: isExporting ? 0.2 : 0.45 }}>
          <RotateCcw className="w-4 h-4" />
        </button>
        <button onClick={() => setIsMuted(m => !m)} className="p-1.5 rounded" style={{ color: 'var(--slide-text)', opacity: isMuted ? 1 : 0.45 }}>
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <button
          onClick={isPlaying ? pause : play}
          disabled={isExporting}
          className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
          style={{ backgroundColor: 'var(--slide-accent)', color: '#fff', opacity: isExporting ? 0.3 : 1 }}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </button>
        <div className="flex-1" />
        <div className="text-xs tabular-nums shrink-0" style={{ color: 'var(--slide-text)', opacity: 0.4 }}>
          {fmt(currentTime)} / {fmt(duration)}
        </div>
        <select
          value={exportQuality}
          disabled={isExporting}
          onChange={e => setExportQuality(e.target.value as 'low' | 'medium' | 'high')}
          className="text-xs px-2 py-1.5 rounded"
          style={{
            backgroundColor: 'var(--slide-bg-card)',
            border: '1px solid var(--slide-border-primary)',
            color: 'var(--slide-text)',
            opacity: isExporting ? 0.3 : 1,
          }}
        >
          <option value="low">Small (0.8 Mbps)</option>
          <option value="medium">Standard (1.5 Mbps)</option>
          <option value="high">High (3 Mbps)</option>
        </select>
        <button
          onClick={startExport}
          disabled={isExporting || !duration}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium"
          style={{
            backgroundColor: isExporting ? 'var(--slide-bg-muted)' : 'var(--slide-bg-card)',
            border: '1px solid var(--slide-border-primary)',
            color: isExporting ? '#e8a438' : 'var(--slide-text)',
            opacity: !duration ? 0.3 : 1,
            cursor: isExporting || !duration ? 'default' : 'pointer',
          }}
        >
          <Download className="w-3 h-3" />
          {isConverting
            ? `Converting ${Math.round(exportProgress * 100)}%`
            : isExporting
              ? `Exporting ${Math.round(exportProgress * 100)}%`
              : 'Export'}
        </button>
      </div>
    </div>
  );
}
