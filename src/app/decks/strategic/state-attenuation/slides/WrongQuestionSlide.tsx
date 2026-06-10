import { SlideLayout } from '@/components/slides/SlideLayout';
import { BlankSlide } from '@/components/slides/BlankSlide';

export function WrongQuestionSlide() {
  return (
    <SlideLayout title="The Wrong Question" subtitle="We have been optimising the firm, not questioning it">
      <BlankSlide notes={
        <>
          <p>The dominant assumption in economic organisation is that production should be arranged around the firm. We debate how to regulate firms, how to make them more competitive, how to give workers more rights within them - but rarely whether the firm is the right unit of production at all.</p>
          <br />
          <p>The firm concentrates surplus at the top. It misaligns incentives through a stack of proxy hierarchies - each layer optimising for what gets it paid rather than for the actual outcome. And it adds coordination overhead (management, recruitment, B2B marketing) that serves its own perpetuation rather than the delivery of anything.</p>
          <br />
          <p>The question this deck asks is not how to improve the firm. It is whether the firm is necessary.</p>
          <br />
          <p>Audience note: Wolff's critique centres on the firm as the site of surplus extraction. Varoufakis focuses on the post-market coordination problem. This slide sets up a frame that intersects both without belonging fully to either.</p>
        </>
      } />
    </SlideLayout>
  );
}
