import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

interface DeckConfig {
  title: string;
  exportFilename: string;
  slides: React.ReactNode[];
}

export function PresentationDeck({ deck }: { deck: DeckConfig }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const { slides, exportFilename } = deck;

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
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

          // Wait for slide to render completely
          await new Promise(resolve => setTimeout(resolve, 1200));

          const imgData = await toPng(slideContainer, {
            pixelRatio: 2,
            backgroundColor: '#ffffff',
          });

          // Scale element to fill the PDF page, preserving aspect ratio
          const elemRatio = slideContainer.offsetWidth / slideContainer.offsetHeight;
          const pageRatio = targetWidth / targetHeight;

          let imgWidth = targetWidth;
          let imgHeight = targetHeight;
          let xOffset = 0;
          let yOffset = 0;

          if (elemRatio > pageRatio) {
            imgHeight = targetWidth / elemRatio;
          } else {
            imgWidth = targetHeight * elemRatio;
          }

          // Scale to 86% of the page and center
          imgWidth  = imgWidth  * 0.86;
          imgHeight = imgHeight * 0.86;
          xOffset = (targetWidth  - imgWidth)  / 2;
          yOffset = (targetHeight - imgHeight) / 2;

          if (i > 0) {
            pdf.addPage([targetWidth, targetHeight], 'landscape');
          }

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
      style={{
        backgroundColor: 'var(--slide-bg)',
        fontFamily: '"Inter", sans-serif'
      }}
    >
      {/* Slide Container */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div
          className="slide-container w-full max-w-7xl aspect-[16/9] shadow-2xl overflow-hidden"
          style={{ backgroundColor: 'var(--slide-bg-card)' }}
        >
          {slides[currentSlide]}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-8 pb-6">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0 || isExporting}
          className="flex items-center gap-2 px-4 py-2 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
          style={{
            backgroundColor: 'var(--slide-primary)',
            color: '#fff'
          }}
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        <div className="flex items-center gap-4">
          <div
            className="text-sm font-medium"
            style={{ color: 'var(--slide-text)' }}
          >
            Slide {currentSlide + 1} of {slides.length}
          </div>

          <button
            onClick={downloadPDF}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'var(--slide-accent)',
              color: '#fff'
            }}
          >
            <Download className="w-5 h-5" />
            {isExporting ? 'Exporting...' : 'Download PDF'}
          </button>
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1 || isExporting}
          className="flex items-center gap-2 px-4 py-2 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
          style={{
            backgroundColor: 'var(--slide-primary)',
            color: '#fff'
          }}
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
