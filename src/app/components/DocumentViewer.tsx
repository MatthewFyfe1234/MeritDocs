import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export interface DocumentConfig {
  title: string;
  exportFilename: string;
  pages: React.ReactNode[];
  /** Trim width in mm. Default 210 (A4). */
  trimWidthMm?: number;
  /** Trim height in mm. Default 297 (A4). */
  trimHeightMm?: number;
  /** Bleed on all sides in mm. Default 0. Adds to total page dimensions. */
  bleedMm?: number;
}

/** Crop marks drawn at trim position within the bleed area. */
function CropMarks({ totalW, totalH, bleed }: { totalW: number; totalH: number; bleed: number }) {
  const gap = 1;
  const len = 5;
  const tL = bleed;
  const tR = totalW - bleed;
  const tT = bleed;
  const tB = totalH - bleed;
  const s = '#000';
  const w = '0.25';

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={`0 0 ${totalW} ${totalH}`}
      style={{ zIndex: 50 }}
    >
      {/* Top-left */}
      <line x1={tL - gap - len} y1={tT} x2={tL - gap} y2={tT} stroke={s} strokeWidth={w} />
      <line x1={tL} y1={tT - gap - len} x2={tL} y2={tT - gap} stroke={s} strokeWidth={w} />
      {/* Top-right */}
      <line x1={tR + gap} y1={tT} x2={tR + gap + len} y2={tT} stroke={s} strokeWidth={w} />
      <line x1={tR} y1={tT - gap - len} x2={tR} y2={tT - gap} stroke={s} strokeWidth={w} />
      {/* Bottom-left */}
      <line x1={tL - gap - len} y1={tB} x2={tL - gap} y2={tB} stroke={s} strokeWidth={w} />
      <line x1={tL} y1={tB + gap} x2={tL} y2={tB + gap + len} stroke={s} strokeWidth={w} />
      {/* Bottom-right */}
      <line x1={tR + gap} y1={tB} x2={tR + gap + len} y2={tB} stroke={s} strokeWidth={w} />
      <line x1={tR} y1={tB + gap} x2={tR} y2={tB + gap + len} stroke={s} strokeWidth={w} />
    </svg>
  );
}

export function DocumentViewer({ document }: { document: DocumentConfig }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const {
    pages,
    exportFilename,
    trimWidthMm = 210,
    trimHeightMm = 297,
    bleedMm = 0,
  } = document;

  const totalW = trimWidthMm + bleedMm * 2;
  const totalH = trimHeightMm + bleedMm * 2;

  const nextPage = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const downloadPDF = async () => {
    setIsExporting(true);
    const originalPage = currentPage;

    try {
      const pageContainer = window.document.querySelector('.doc-page-container') as HTMLElement;
      if (!pageContainer) return;

      const pdf = new jsPDF({
        orientation: totalW > totalH ? 'landscape' : 'portrait',
        unit: 'mm',
        format: [totalW, totalH],
      });

      for (let i = 0; i < pages.length; i++) {
        setCurrentPage(i);
        await new Promise(resolve => setTimeout(resolve, 1200));

        const imgData = await toPng(pageContainer, {
          pixelRatio: 3,
          backgroundColor: '#ffffff',
        });

        if (i > 0) pdf.addPage([totalW, totalH], totalW > totalH ? 'landscape' : 'portrait');
        pdf.addImage(imgData, 'PNG', 0, 0, totalW, totalH, undefined, 'FAST');
      }

      pdf.save(exportFilename);
      setCurrentPage(originalPage);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(`Error generating PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setCurrentPage(originalPage);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-col"
      style={{ backgroundColor: 'var(--slide-bg)', fontFamily: '"Inter", sans-serif' }}
    >
      {/* Page container */}
      <div className="flex-1 flex items-center justify-center p-8 min-h-0 overflow-hidden">
        <div
          className="doc-page-container relative shadow-2xl overflow-hidden"
          style={{
            aspectRatio: `${totalW} / ${totalH}`,
            height: '100%',
            maxWidth: '100%',
            backgroundColor: '#ffffff',
          }}
        >
          {pages[currentPage]}
          {bleedMm > 0 && <CropMarks totalW={totalW} totalH={totalH} bleed={bleedMm} />}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-8 pb-6 shrink-0">
        <button
          onClick={prevPage}
          disabled={currentPage === 0 || isExporting}
          className="flex items-center gap-2 px-4 py-2 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
          style={{ backgroundColor: 'var(--slide-primary)', color: '#fff' }}
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        <div className="flex items-center gap-4">
          <div className="text-sm font-medium" style={{ color: 'var(--slide-text)' }}>
            Page {currentPage + 1} of {pages.length}
          </div>
          <button
            onClick={downloadPDF}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            style={{ backgroundColor: 'var(--slide-accent)', color: '#fff' }}
          >
            <Download className="w-5 h-5" />
            {isExporting ? 'Exporting...' : 'Download PDF'}
          </button>
        </div>

        <button
          onClick={nextPage}
          disabled={currentPage === pages.length - 1 || isExporting}
          className="flex items-center gap-2 px-4 py-2 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
          style={{ backgroundColor: 'var(--slide-primary)', color: '#fff' }}
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
