import { SlideLayout } from '@/components/slides/SlideLayout';
import { BlankSlide } from '@/components/slides/BlankSlide';

export function PoliticalQuestionSlide() {
  return (
    <SlideLayout title="The Political Question" subtitle="The model answers it. The mechanism already exists.">
      <BlankSlide notes={
        <>
          <p>If the process is the value-generating mechanism - if the master process encodes the knowledge of how to deliver any product optimally - then who owns the master process is the central political question. This is more precise than "who owns the means of production." It specifies exactly what is at stake: not the factory, the land, or the equipment, but the formalised knowledge of how to use them well.</p>
          <br />
          <p>The answer is open source. A person or group decides to build a master process for a given ecosystem and releases it openly, for anyone to use and contribute to. The same model that produced Linux, Wikipedia, and OpenStreetMap. Commons-based peer production at scale is not theoretical - it is one of the most well-documented phenomena in the history of knowledge production.</p>
          <br />
          <p>This resolves the political question structurally rather than politically. It does not require a revolutionary moment, state intervention, or a prior collective decision about ownership. It requires someone to start. The commons emerges from contribution, not from mandate.</p>
          <br />
          <p>It is also resilient to capture. If a private entity attempted to enclose the master process, the community could fork it - exactly as has happened repeatedly in open source software. The enclosure strategy that makes platform capitalism extractive does not work against a commons that can reproduce itself.</p>
          <br />
          <p>Crucially, informal versions of the master process already exist. Building codes, clinical guidelines, engineering standards, ISO specifications - these are all collaborative, open definitions of best process in their domains. The model is not proposing something new. It is formalising and extending something that is already how knowledge about non-creative production actually accumulates and spreads. The infrastructure argument, not the utopian one.</p>
          <br />
          <p>If the master process is instead held by a platform or private entity, it recreates hierarchy under a different name - extracting rent from process knowledge rather than physical capital. The model makes that choice visible and names the alternative clearly. The question for the audience is not whether the commons model is possible. It is whether it will be built before the platform version captures the space.</p>
        </>
      } />
    </SlideLayout>
  );
}
