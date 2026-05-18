import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import type { DeckConfig } from '../types';
import { resolveSlides } from '../types';

export function PresentationDeck({
  deck,
  variantConfig = {},
  variationName,
}: {
  deck: DeckConfig;
  variantConfig?: Record<string, string>;
  variationName?: string;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const slides = resolveSlides(deck, variantConfig);
  const exportFilename = variationName
    ? deck.exportFilename.replace('.pdf', `-${variationName.replace(/\s+/g, '-')}.pdf`)
    : deck.exportFilename;

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const downloadPDF = async () => {
    setIsExporting(true);
    const originalSlide = currentSlide;

    try {
      const slideContainer = document.querySelector('.slide-container') as HTMLElement;

      if (slideContainer) {
        const targetWidth = 1920;
        const targetHeight = 1080;

        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [targetWidth, targetHeight]
        });

        for (let i = 0; i < slides.length; i++) {
          setCurrentSlide(i);
          await new Promise(resolve => setTimeout(resolve, 1200));

          const imgData = await toPng(slideContainer, {
            pixelRatio: 2,
            backgroundColor: '#ffffff',
          });

          const elemRatio = slideContainer.offsetWidth / slideContainer.offsetHeight;
          const pageRatio = targetWidth / targetHeight;

          let imgWidth = targetWidth;
          let imgHeight = targetHeight;

          if (elemRatio > pageRatio) {
            imgHeight = targetWidth / elemRatio;
          } else {
            imgWidth = targetHeight * elemRatio;
          }

          imgWidth  = imgWidth  * 0.86;
          imgHeight = imgHeight * 0.86;
          const xOffset = (targetWidth  - imgWidth)  / 2;
          const yOffset = (targetHeight - imgHeight) / 2;

          if (i > 0) pdf.addPage([targetWidth, targetHeight], 'landscape');

          pdf.setFillColor(255, 255, 255);
          pdf.rect(0, 0, targetWidth, targetHeight, 'F');
          pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight, undefined, 'FAST');
        }

        pdf.save(exportFilename);
        setCurrentSlide(originalSlide);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(`Error generating PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setCurrentSlide(originalSlide);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-col"
      style={{ backgroundColor: 'var(--slide-bg)', fontFamily: '"Inter", sans-serif' }}
    >
      <div className="flex-1 relative flex items-center justify-center p-8">
        <button
          onClick={() => { window.location.search = ''; }}
          className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs z-10"
          style={{ color: 'var(--slide-text)', opacity: 0.45, border: '1px solid var(--slide-border)' }}
        >
          <ChevronLeft className="w-3.5 h-3.5" /> All decks
        </button>
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0 || isExporting}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-opacity z-10"
          style={{ backgroundColor: 'var(--slide-primary)', color: '#fff' }}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div
          className="slide-container w-full max-w-7xl aspect-[16/9] shadow-2xl overflow-hidden"
          style={{ backgroundColor: 'var(--slide-bg-card)' }}
        >
          {slides[currentSlide]}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1 || isExporting}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-opacity z-10"
          style={{ backgroundColor: 'var(--slide-primary)', color: '#fff' }}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-3 pb-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            disabled={isExporting}
            className="w-7 h-7 rounded-full text-xs font-semibold transition-all disabled:cursor-not-allowed"
            style={{
              backgroundColor: i === currentSlide ? 'var(--slide-primary)' : 'transparent',
              color: i === currentSlide ? '#fff' : 'var(--slide-text)',
              border: `1.5px solid ${i === currentSlide ? 'var(--slide-primary)' : 'var(--slide-border)'}`,
              opacity: isExporting ? 0.4 : 1,
            }}
          >
            {i + 1}
          </button>
        ))}

        <div className="w-px self-stretch mx-1" style={{ backgroundColor: 'var(--slide-border)' }} />

        <div className="text-sm font-medium" style={{ color: 'var(--slide-text)' }}>
          {variationName && (
            <span className="mr-3 opacity-50">{variationName}</span>
          )}
          Slide {currentSlide + 1} of {slides.length}
        </div>

        <button
          onClick={downloadPDF}
          disabled={isExporting}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: 'var(--slide-accent)', color: '#fff' }}
        >
          <Download className="w-5 h-5" />
          {isExporting ? 'Exporting...' : 'Download PDF'}
        </button>
      </div>
    </div>
  );
}
