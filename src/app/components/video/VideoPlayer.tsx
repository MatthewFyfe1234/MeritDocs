import { useRef, useState, useEffect } from 'react';
import type { VideoScene, VideoConfig, VideoLogo } from '../../types';
import { Play, Pause, RotateCcw } from 'lucide-react';

const W = 1920;
const H = 1080;
const FADE_SECS = 0.5;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sceneDuration(scene: VideoScene): number {
  if (scene.type === 'image-text') return scene.duration;
  if (scene.endTime != null && scene.startTime != null) return scene.endTime - scene.startTime;
  return 5;
}

function totalDuration(scenes: VideoScene[]): number {
  return scenes.reduce((s, sc) => s + sceneDuration(sc), 0);
}

function globalToLocal(scenes: VideoScene[], t: number): { idx: number; elapsed: number } {
  for (let i = 0; i < scenes.length; i++) {
    const d = sceneDuration(scenes[i]);
    if (t < d || i === scenes.length - 1) return { idx: i, elapsed: Math.min(t, d) };
    t -= d;
  }
  const last = scenes.length - 1;
  return { idx: last, elapsed: sceneDuration(scenes[last]) };
}

function localToGlobal(scenes: VideoScene[], idx: number, elapsed: number): number {
  return scenes.slice(0, idx).reduce((s, sc) => s + sceneDuration(sc), 0) + elapsed;
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxPx: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width > maxPx && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
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
  const h = cfg.size ?? 60;
  const w = (img.naturalWidth / img.naturalHeight) * h;
  const pad = cfg.padding ?? 40;
  const corner = cfg.corner ?? 'br';

  const x = corner.endsWith('r') ? W - pad - w : pad;
  const y = corner.startsWith('b') ? H - pad - h : pad;

  ctx.save();
  ctx.globalAlpha = cfg.opacity ?? 1;
  ctx.drawImage(img, x, y, w, h);
  ctx.restore();
}

function paintScene(ctx: CanvasRenderingContext2D, scene: VideoScene, logo?: { img: HTMLImageElement; cfg: VideoLogo }, bgImages?: Map<string, HTMLImageElement>) {
  if (scene.type === 'image-text') {
    ctx.fillStyle = scene.backgroundColor ?? '#000';
    ctx.fillRect(0, 0, W, H);

    if (scene.backgroundImage) {
      const img = bgImages?.get(scene.backgroundImage);
      if (img) {
        const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
        const dw = img.naturalWidth * scale;
        const dh = img.naturalHeight * scale;
        ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
        ctx.fillStyle = 'rgba(0,0,0,0.55)';
        ctx.fillRect(0, 0, W, H);
      }
    }

    for (const ov of scene.overlays) {
      const x = ov.x * W;
      const y = ov.y * H;
      const fs = ov.fontSize;
      const maxPx = (ov.maxWidth ?? 0.8) * W;
      const lh = (ov.lineHeight ?? 1.35) * fs;
      const align = ov.textAlign ?? 'left';

      ctx.save();
      ctx.font = `${ov.fontWeight ?? 'normal'} ${fs}px Inter, -apple-system, sans-serif`;
      ctx.textAlign = align;
      ctx.textBaseline = 'top';

      const lines = wrapText(ctx, ov.text, maxPx);
      const blockH = lines.length * lh - (lh - fs); // total text block height
      const blockW = Math.max(...lines.map(l => ctx.measureText(l).width));

      // Backdrop
      if (ov.backdrop) {
        const pad = ov.backdropPadding ?? 24;
        const r = ov.backdropRadius ?? 12;
        let rx = x - pad;
        if (align === 'center') rx = x - blockW / 2 - pad;
        if (align === 'right')  rx = x - blockW - pad;
        const ry = y - pad;
        const rw = blockW + pad * 2;
        const rh = blockH + pad * 2;
        ctx.fillStyle = resolveColor(ov.backdrop);
        ctx.beginPath();
        ctx.roundRect(rx, ry, rw, rh, r);
        ctx.fill();
      }

      ctx.fillStyle = resolveColor(ov.color);
      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x, y + i * lh);
      }
      ctx.restore();
    }
  } else {
    // video-clip: placeholder until MediaRecorder/ffmpeg pipeline is wired up
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, W, H);
    ctx.save();
    ctx.fillStyle = '#555';
    ctx.font = '48px Inter, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('[video clip]', W / 2, H / 2);
    ctx.restore();
  }

  if (logo) drawLogo(ctx, logo.img, logo.cfg);
}

function fmt(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function VideoPlayer({ video }: { video: VideoConfig }) {
  const { scenes } = video;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tempCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const bgImagesRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const rafRef = useRef(0);

  // Mutable playback state - all in refs to avoid stale RAF closures
  const playingRef = useRef(false);
  const sceneIdxRef = useRef(0);
  const elapsedRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);

  // React state is display-only: buttons + progress bar
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);      // 0–1
  const [sceneIdx, setSceneIdx] = useState(0);

  const total = totalDuration(scenes);

  // Create offscreen canvas once for cross-fade compositing
  useEffect(() => {
    const temp = document.createElement('canvas');
    temp.width = W;
    temp.height = H;
    tempCanvasRef.current = temp;
  }, []);

  // Load logo image
  useEffect(() => {
    if (!video.logo?.src) return;
    const img = new Image();
    img.onload = () => { logoRef.current = img; drawRef.current(); };
    img.src = video.logo.src;
  }, [video.logo?.src]);

  // Load background images
  useEffect(() => {
    const map = bgImagesRef.current;
    for (const scene of scenes) {
      if (scene.type === 'image-text' && scene.backgroundImage) {
        const src = scene.backgroundImage;
        if (!map.has(src)) {
          const img = new Image();
          img.onload = () => { map.set(src, img); drawRef.current(); };
          img.src = src;
        }
      }
    }
  }, [scenes]);

  // ---------------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------------

  function draw() {
    const canvas = canvasRef.current;
    const temp = tempCanvasRef.current;
    if (!canvas || !temp) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const idx = sceneIdxRef.current;
    const elapsed = elapsedRef.current;
    const scene = scenes[idx];
    const next = scenes[idx + 1];
    const duration = sceneDuration(scene);

    const inFade = next && scene.transition === 'fade' && elapsed >= duration - FADE_SECS;
    const logoArg = video.logo && logoRef.current
      ? { img: logoRef.current, cfg: video.logo }
      : undefined;
    const bgImgs = bgImagesRef.current;

    if (inFade && next) {
      const alpha = (elapsed - (duration - FADE_SECS)) / FADE_SECS; // 0→1

      // Render next scene as base layer (with logo)
      paintScene(ctx, next, logoArg, bgImgs);

      // Render current scene onto temp canvas (no logo — it's on the base layer already)
      const tempCtx = temp.getContext('2d')!;
      paintScene(tempCtx, scene, undefined, bgImgs);
      ctx.globalAlpha = 1 - alpha;
      ctx.drawImage(temp, 0, 0);
      ctx.globalAlpha = 1;
    } else {
      paintScene(ctx, scene, logoArg, bgImgs);
    }
  }

  // Stable ref so the RAF tick always calls the freshest draw
  const drawRef = useRef(draw);
  drawRef.current = draw;

  // ---------------------------------------------------------------------------
  // Animation loop
  // ---------------------------------------------------------------------------

  function tick(ts: number) {
    if (!playingRef.current) return;

    if (lastTsRef.current === null) lastTsRef.current = ts;
    const delta = (ts - lastTsRef.current) / 1000;
    lastTsRef.current = ts;

    elapsedRef.current += delta;

    const duration = sceneDuration(scenes[sceneIdxRef.current]);
    if (elapsedRef.current >= duration) {
      if (sceneIdxRef.current < scenes.length - 1) {
        sceneIdxRef.current++;
        elapsedRef.current = 0;
      } else {
        elapsedRef.current = duration;
        playingRef.current = false;
        setIsPlaying(false);
      }
    }

    drawRef.current();
    const g = localToGlobal(scenes, sceneIdxRef.current, elapsedRef.current);
    setProgress(g / total);
    setSceneIdx(sceneIdxRef.current);

    if (playingRef.current) rafRef.current = requestAnimationFrame(tick);
  }

  // ---------------------------------------------------------------------------
  // Controls
  // ---------------------------------------------------------------------------

  function play() {
    const atEnd =
      sceneIdxRef.current === scenes.length - 1 &&
      elapsedRef.current >= sceneDuration(scenes[scenes.length - 1]);
    if (atEnd) {
      sceneIdxRef.current = 0;
      elapsedRef.current = 0;
    }
    playingRef.current = true;
    lastTsRef.current = null;
    setIsPlaying(true);
    rafRef.current = requestAnimationFrame(tick);
  }

  function pause() {
    playingRef.current = false;
    setIsPlaying(false);
    cancelAnimationFrame(rafRef.current);
  }

  function restart() {
    pause();
    sceneIdxRef.current = 0;
    elapsedRef.current = 0;
    setProgress(0);
    setSceneIdx(0);
    drawRef.current();
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const { idx, elapsed } = globalToLocal(scenes, ratio * total);
    sceneIdxRef.current = idx;
    elapsedRef.current = elapsed;
    setProgress(ratio);
    setSceneIdx(idx);
    drawRef.current();
  }

  // Draw first frame once temp canvas is ready
  useEffect(() => {
    const id = setTimeout(() => drawRef.current(), 0);
    return () => {
      clearTimeout(id);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Derived display values
  // ---------------------------------------------------------------------------

  const currentTime = progress * total;
  const currentScene = scenes[sceneIdx];
  const sceneLabel =
    currentScene?.type === 'image-text' && currentScene.overlays.length > 0
      ? currentScene.overlays[0].text.slice(0, 60)
      : `Scene ${sceneIdx + 1}`;

  // Scene boundary positions on the progress bar (skip index 0)
  const markers = scenes.reduce<number[]>((acc, _sc, i) => {
    if (i === 0) return acc;
    const prev = acc.length > 0 ? acc[acc.length - 1] : 0;
    return [...acc, prev + sceneDuration(scenes[i - 1]) / total];
  }, []);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="flex flex-col gap-3">
      {/* Canvas */}
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
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${progress * 100}%`, backgroundColor: 'var(--slide-accent)' }}
        />
        {markers.map((ratio, i) => (
          <div
            key={i}
            className="absolute top-1/2 -translate-y-1/2 w-px h-2.5"
            style={{ left: `${ratio * 100}%`, backgroundColor: 'var(--slide-bg)', opacity: 0.7 }}
          />
        ))}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full -ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: `${progress * 100}%`, backgroundColor: 'var(--slide-accent)', border: '2px solid var(--slide-bg)' }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={restart}
          className="p-1.5 rounded"
          style={{ color: 'var(--slide-text)', opacity: 0.45 }}
          title="Restart"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={isPlaying ? pause : play}
          className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
          style={{ backgroundColor: 'var(--slide-accent)', color: '#fff' }}
        >
          {isPlaying
            ? <Pause className="w-3.5 h-3.5" />
            : <Play className="w-3.5 h-3.5 ml-0.5" />
          }
        </button>

        <div className="flex-1 min-w-0 mx-1">
          <div className="text-xs truncate" style={{ color: 'var(--slide-text)', opacity: 0.4 }}>
            {sceneIdx + 1} / {scenes.length} - {sceneLabel}
          </div>
        </div>

        <div className="text-xs tabular-nums shrink-0" style={{ color: 'var(--slide-text)', opacity: 0.4 }}>
          {fmt(currentTime)} / {fmt(total)}
        </div>
      </div>
    </div>
  );
}
