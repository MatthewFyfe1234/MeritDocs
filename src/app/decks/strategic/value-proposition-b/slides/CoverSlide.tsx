import { CoverSlide as SharedCoverSlide } from '@/components/slides/CoverSlide';

export function CoverSlide() {
  return (
    <SharedCoverSlide
      title="Process-centric orchestration and optimisation"
      body="Swarm-based production and maintenance models, at any scale"
      showSiteUrl={false}
      footerNote="Modify Visual Ltd."
    />
  );
}
