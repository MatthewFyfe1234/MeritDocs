import type { VideoConfig, VideoScene } from '../../types';
import { Film, Clock, Image, Video } from 'lucide-react';
import { VideoPlayer } from './VideoPlayer';

function sceneDuration(scene: VideoScene): number {
  if (scene.type === 'image-text') return scene.duration;
  if (scene.endTime != null && scene.startTime != null) return scene.endTime - scene.startTime;
  return 5;
}

function SceneCard({ scene, index }: { scene: VideoScene; index: number }) {
  const isClip = scene.type === 'video-clip';
  const duration = sceneDuration(scene);
  const overlayCount = scene.overlays?.length ?? 0;

  return (
    <div
      className="flex items-start gap-4 px-5 py-4 rounded-lg"
      style={{ border: '1px solid var(--slide-border-primary)', backgroundColor: 'var(--slide-bg-primary-muted)' }}
    >
      <div
        className="shrink-0 w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
        style={{ backgroundColor: 'var(--slide-bg-accent-muted)', color: 'var(--slide-accent)' }}
      >
        {index + 1}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {isClip
            ? <Video className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--slide-accent)' }} />
            : <Image className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--slide-accent)' }} />
          }
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--slide-text)', opacity: 0.5 }}>
            {isClip ? 'Video clip' : 'Image + text'}
          </span>
        </div>

        {scene.type === 'image-text' && scene.overlays.length > 0 && (
          <div className="text-sm font-medium truncate" style={{ color: 'var(--slide-text)' }}>
            {scene.overlays[0].text}
          </div>
        )}

        {isClip && (
          <div className="text-sm font-medium truncate" style={{ color: 'var(--slide-text)' }}>
            {scene.src}
          </div>
        )}

        <div className="flex items-center gap-3 mt-1.5">
          <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--slide-text)', opacity: 0.4 }}>
            <Clock className="w-3 h-3" />
            {duration}s
          </span>
          {overlayCount > 0 && (
            <span className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.4 }}>
              {overlayCount} overlay{overlayCount !== 1 ? 's' : ''}
            </span>
          )}
          {scene.transition && scene.transition !== 'cut' && (
            <span className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.4 }}>
              {scene.transition} in
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function VideoEditor({ video }: { video: VideoConfig }) {
  const total = video.scenes.reduce((s, sc) => s + sceneDuration(sc), 0);

  return (
    <div
      className="min-h-screen p-8"
      style={{ backgroundColor: 'var(--slide-bg)', fontFamily: '"Inter", sans-serif' }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => { window.location.search = ''; }}
            className="text-xs mb-5 flex items-center gap-1.5"
            style={{ color: 'var(--slide-text)', opacity: 0.4 }}
          >
            ← Back
          </button>
          <div className="flex items-center gap-2 mb-1">
            <Film className="w-4 h-4" style={{ color: 'var(--slide-accent)' }} />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--slide-accent)', opacity: 0.7 }}>
              Video project
            </span>
          </div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--slide-primary)' }}>
            {video.title}
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--slide-text)', opacity: 0.4 }}>
            {video.scenes.length} scenes - {total}s total
          </p>
        </div>

        {/* Player */}
        <div className="mb-8">
          <VideoPlayer video={video} />
        </div>

        {/* Scene list */}
        <div
          className="text-xs font-semibold uppercase tracking-widest mb-4 pb-2"
          style={{ color: 'var(--slide-primary)', opacity: 0.5, borderBottom: '1px solid var(--slide-border-primary)' }}
        >
          Scenes
        </div>
        <div className="flex flex-col gap-2">
          {video.scenes.map((scene, i) => (
            <SceneCard key={i} scene={scene} index={i} />
          ))}
        </div>

      </div>
    </div>
  );
}
