import { Clock, Wrench, CloudRain } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import offsiteImage from './offsite.jpg';

export function OffsiteConstructionSlide() {
  return (
    <div className="w-full h-full p-8 flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h2 
          className="text-3xl font-bold mb-2"
          style={{ color: 'var(--slide-primary)' }}
        >
          Offsite Construction at a Glance
        </h2>
        <div
          className="w-20 h-1"
          style={{ backgroundColor: 'var(--slide-accent)' }}
        />
        <p className="text-xs mt-2" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
          Factory-manufactured components assembled on site, blending manufacturing precision with construction flexibility
        </p>
      </div>

      {/* Content Grid */}
      <div className="flex-1 min-h-0 grid grid-cols-2 gap-6">
        {/* Left Column - Benefits */}
        <div className="flex flex-col gap-2 min-h-0">
          {/* Reduce Timeline Box with Timeline Graphic */}
          <div className="shrink-0 bg-white rounded-lg p-4 shadow-md border" style={{ borderColor: 'var(--slide-border)' }}>
            <div className="flex items-start gap-3 mb-2">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--slide-bg)' }}>
                <Clock className="w-5 h-5" style={{ color: 'var(--slide-primary)' }} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--slide-text)' }}>
                  Reduced Construction Timeline
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>
                  Parallel processing replaces linear sequencing, enabling earlier project completion.
                </p>
              </div>
            </div>

            {/* Timeline Comparison Diagram */}
            <div className="mt-2 pt-2 border-t" style={{ borderColor: 'var(--slide-border)' }}>

              {/* Traditional: sequential phases, full width */}
              <div className="mb-2">
                <p className="text-xs font-semibold mb-1.5" style={{ color: 'var(--slide-text)' }}>Traditional</p>
                <div className="flex gap-2">
                  <div style={{ width: '3rem' }} className="h-7 flex items-center">
                    <span className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>On-site</span>
                  </div>
                  <div className="flex-1 flex gap-0.5 h-7 rounded overflow-hidden">
                    <div className="flex-1 flex items-center justify-center text-xs text-white font-medium" style={{ backgroundColor: '#6b6b6e' }}>Foundation</div>
                    <div className="flex-1 flex items-center justify-center text-xs text-white font-medium" style={{ backgroundColor: '#56565a' }}>Structure</div>
                    <div className="flex-1 flex items-center justify-center text-xs text-white font-medium" style={{ backgroundColor: 'var(--slide-text)' }}>Finishing</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-0.5">
                  <div style={{ width: '3rem' }} />
                  <div className="flex-1 flex justify-end">
                    <span className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.5 }}>✓ Complete</span>
                  </div>
                </div>
              </div>

              {/* Offsite: parallel foundation/fabrication, then quick install */}
              <div>
                <p className="text-xs font-semibold mb-1.5" style={{ color: 'var(--slide-primary)' }}>Offsite Construction</p>
                <div className="flex gap-2">
                  {/* Row labels */}
                  <div style={{ width: '3rem' }} className="flex flex-col gap-1.5">
                    <div className="h-7 flex items-center">
                      <span className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>Factory</span>
                    </div>
                    <div className="h-7 flex items-center">
                      <span className="text-xs" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>On-site</span>
                    </div>
                  </div>
                  {/* Bar area */}
                  <div className="flex-1 relative flex flex-col gap-1.5">
                    {/* Dashed completion line at ~55% */}
                    <div
                      className="absolute top-0 bottom-0 z-10 pointer-events-none"
                      style={{ left: '55%', borderLeft: '2px dashed var(--slide-accent)' }}
                    />
                    
                    {/* Factory: Fabrication 0-33% (same length as foundation) */}
                    <div className="flex h-7 rounded overflow-hidden">
                      <div
                        className="flex items-center justify-center text-xs text-white font-medium"
                        style={{ width: '33.33%', backgroundColor: 'var(--slide-primary)' }}
                      >
                        Fabrication
                      </div>
                      <div style={{ width: '21.67%', backgroundColor: '#e8f0ee' }} />
                      <div style={{ width: '45%', backgroundColor: 'var(--slide-bg-accent-muted)' }} />
                    </div>
                    
                    {/* On-site: Foundation 0-33%, Install 33-55% (much shorter than traditional) */}
                    <div className="flex h-7 rounded overflow-hidden">
                      <div
                        className="flex items-center justify-center text-xs text-white font-medium"
                        style={{ width: '33.33%', backgroundColor: 'var(--slide-primary)', opacity: 0.65 }}
                      >
                        Foundation
                      </div>
                      <div
                        className="flex items-center justify-center text-xs text-white font-medium"
                        style={{ width: '21.67%', backgroundColor: 'var(--slide-primary)' }}
                      >
                        Install
                      </div>
                      <div style={{ width: '45%', backgroundColor: 'var(--slide-bg-accent-muted)' }} />
                    </div>
                  </div>
                </div>
                {/* Completion + saved annotations aligned to bar area */}
                <div className="flex gap-2 mt-1">
                  <div style={{ width: '3rem' }} />
                  <div className="flex-1 relative" style={{ height: '1.1rem' }}>
                    <span
                      className="absolute text-xs font-bold"
                      style={{ left: '55%', transform: 'translateX(-100%)', paddingRight: '3px', color: 'var(--slide-accent)', whiteSpace: 'nowrap' }}
                    >
                      ✓ Complete
                    </span>
                    <span
                      className="absolute text-xs"
                      style={{ left: 'calc(55% + 3px)', right: 0, textAlign: 'center', color: 'var(--slide-accent)', opacity: 0.65, whiteSpace: 'nowrap' }}
                    >
                      time saved
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="shrink-0 bg-white rounded-lg p-4 shadow-md border" style={{ borderColor: 'var(--slide-border)' }}>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--slide-bg)' }}>
                <Wrench className="w-5 h-5" style={{ color: 'var(--slide-primary)' }} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--slide-text)' }}>
                  Separated Skillsets
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>
                  Traditional tradespeople must master every phase on site. Offsite splits these into complementary specialists: factory fabricators who build components to tight tolerances in a controlled environment, and site crews who focus on fast, accurate installation. Both sides deepen their expertise through repetition.
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-lg p-4 shadow-md border" style={{ borderColor: 'var(--slide-border)' }}>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--slide-bg)' }}>
                <CloudRain className="w-5 h-5" style={{ color: 'var(--slide-primary)' }} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--slide-text)' }}>
                  Controlled Environment
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>
                  Factory-controlled conditions improve safety, enable precision assembly, ensure consistent quality, and eliminate weather-related delays.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Images and Crossroads */}
        <div className="flex flex-col gap-4 min-h-0">
          {/* Top Image */}
          <div className="rounded-lg overflow-hidden shadow-md" style={{ height: '200px' }}>
            <ImageWithFallback
              src={offsiteImage}
              alt="Offsite construction workflow"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 15%' }}
            />
          </div>

          {/* Bottom: Crossroads Graphic */}
          <div className="flex-1 min-h-0 bg-white rounded-lg p-6 shadow-md border flex flex-col" style={{ borderColor: 'var(--slide-border)' }}>
            <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--slide-text)' }}>
              Where Two Industries Meet
            </h3>
            <p className="text-xs mb-2" style={{ color: 'var(--slide-accent)', opacity: 0.7 }}>
              A shared beachhead into both parent industries
            </p>
            <div className="flex-1 min-h-0">
              <svg viewBox="0 0 320 180" style={{ display: 'block', width: '100%', height: '100%' }}>
                {/* Axis lines, full span */}
                <line x1="0" y1="90" x2="320" y2="90" stroke="var(--slide-primary)" strokeWidth="1" strokeOpacity="0.2" />
                <line x1="160" y1="0" x2="160" y2="180" stroke="var(--slide-primary)" strokeWidth="1" strokeOpacity="0.2" />

                {/* CONSTRUCTION: top of vertical axis */}
                <text x="160" y="16" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--slide-primary)" fillOpacity="0.7" letterSpacing="1">CONSTRUCTION</text>

                {/* MANUFACTURING: left of horizontal axis */}
                <text x="4" y="85" textAnchor="start" fontSize="9" fontWeight="600" fill="var(--slide-primary)" fillOpacity="0.7" letterSpacing="1">MANUFACTURING</text>

                {/* Badge: white fill covers the axis lines at the intersection */}
                <rect x="103" y="63" width="114" height="54" rx="8" fill="rgba(0,0,0,0.05)" />
                <rect x="101" y="61" width="114" height="54" rx="8" fill="white" stroke="var(--slide-accent)" strokeWidth="1.5" />
                <text x="158" y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--slide-accent)" letterSpacing="1">OFFSITE</text>
                <text x="158" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--slide-accent)" letterSpacing="1">CONSTRUCTION</text>
                <text x="158" y="109" textAnchor="middle" fontSize="7.5" fontWeight="600" fill="var(--slide-accent)" fillOpacity="0.55" letterSpacing="0.5">shared beachhead</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}