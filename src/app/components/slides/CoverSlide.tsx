import logo from '@/decks/merit-oi/slides/Logo_secondary.webp';
import { SITE_URL, monthYear } from '@/constants';

interface CoverSlideProps {
  title: string;
  body: string;
}

export function CoverSlide({ title, body }: CoverSlideProps) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: 'var(--slide-border)' }}
    >
      {/* Subtle accent shape */}
      <div
        className="absolute top-0 right-0 w-1/3 h-full opacity-5"
        style={{ backgroundColor: 'var(--slide-primary)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-12">
        <img src={logo} alt="Merit Logo" className="h-42 w-auto" />

        <div
          className="w-32 h-1 mt-2 mb-4"
          style={{ backgroundColor: 'var(--slide-accent)' }}
        />

        <h2
          className="text-3xl font-light mb-4"
          style={{ color: 'var(--slide-text)' }}
        >
          {title}
        </h2>

        <p
          className="text-xl max-w-2xl leading-relaxed"
          style={{ color: 'var(--slide-text)', opacity: 0.8 }}
        >
          {body}
        </p>
      </div>

      {/* Footer */}
      <div
        className="absolute bottom-8 left-12 text-sm"
        style={{ color: 'var(--slide-text)', opacity: 0.6 }}
      >
        {SITE_URL}
      </div>
      <div
        className="absolute bottom-8 right-12 text-sm"
        style={{ color: 'var(--slide-text)', opacity: 0.6 }}
      >
        {monthYear()}
      </div>
    </div>
  );
}
