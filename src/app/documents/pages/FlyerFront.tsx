import heroImage from 'figma:asset/291a6661191333a833523041ed9334eb53215f95.png';
import logoImage from 'figma:asset/0c594b32138f3e526e4dd761cc7de6d470e529f6.png';

export function FlyerFront() {
  return (
    <div className="aspect-[210/297] bg-white p-12 flex flex-col relative">
      {/* Logo - absolutely positioned */}
      <div className="absolute top-6 right-12 z-10">
        <img 
          src={logoImage} 
          alt="Merit Logo" 
          className="h-48 w-auto"
        />
      </div>

      {/* Header with logo */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="bg-[#335d57] h-2 w-32"></div>
      </div>

      {/* Main title section */}
      <div className="mb-8 relative z-10">
        <div className="text-[#49494b] mb-3">
          <h1 className="text-4xl mb-3 leading-tight">
            Merit brings your entire<br />
            <span className="text-[#9314ff]">organisation into focus</span>
          </h1>
        </div>

        <div className="text-base text-[#49494b] leading-relaxed max-w-2xl">
          By connecting teams, resources and processes in a single platform, 
          leaders gain the clarity to act with confidence and everyone can see 
          how their work contributes to the bigger picture.
        </div>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-2 gap-6 mb-6 relative z-10">
        <div className="bg-[#e4e8e8] p-5 rounded-lg">
          <div className="text-5xl mb-2" style={{ color: '#eddc6d' }}>1 in 3</div>
          <div className="text-[#49494b] text-sm leading-snug">
            business leaders name organisational fragmentation their #1 strategic challenge
          </div>
        </div>
        <div className="bg-[#e4e8e8] p-5 rounded-lg">
          <div className="text-5xl mb-2" style={{ color: '#eddc6d' }}>80%</div>
          <div className="text-[#49494b] text-sm leading-snug">
            of companies struggle with process inefficiency yet lack tools that 
            provide real, actionable insight
          </div>
        </div>
      </div>

      {/* Hero image with overlay - full height */}
      <div className="flex-1 relative rounded-lg overflow-hidden">
        <img 
          src={heroImage} 
          alt="Professional workspace" 
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-40"
        />
        
        {/* How Merit Works overlay on left/top */}
        <div className="absolute inset-0 p-6">
          <div className="max-w-md">
            <h2 className="text-4xl mb-2 text-[#49494b]">
              How <span className="text-[#9314ff]">Merit</span> Works
            </h2>
            <p className="text-sm text-[#49494b]/80 mb-6 bg-white/90 inline-block px-2 py-1 rounded">
              From specification to insight, automatically.
            </p>

            <div className="grid grid-cols-1 gap-4">
              <ProcessStep 
                number="01" 
                title="Define Specifications"
                description="Configure every material, tool and resource in one place. Your single source of truth."
              />
              <ProcessStep 
                number="02" 
                title="Automated Generation"
                description="Merit instantly generates BOQ, material costs, labour estimates, time plans and cash flow projections."
              />
              <ProcessStep 
                number="03" 
                title="Smart Assignment"
                description="Each job matched to the right person based on skills, experience and availability. Automatically."
              />
              <ProcessStep 
                number="04" 
                title="Real-Time Monitoring"
                description="Track delivery times, resource utilisation and performance as work happens. Not after the fact."
              />
              <ProcessStep 
                number="05" 
                title="Actionable Intelligence"
                description="Aggregated insight across people, materials and processes gives management the clarity to optimise operations and make informed decisions with confidence."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 flex justify-between items-end relative z-10">
        <div className="text-[#49494b] text-xs">
          <div className="mb-1"><span className="font-medium">Umar Abubakar, Co-Founder</span></div>
          <div>umar@meritoi.com</div>
          <div>+234 816 693 0057</div>
        </div>
        <div className="text-[#335d57] text-sm">
          www.meritoi.com
        </div>
      </div>
    </div>
  );
}

function ProcessStep({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="bg-white/95 p-4 rounded-lg shadow-sm">
      <div className="text-2xl mb-2" style={{ color: '#eddc6d' }}>{number}</div>
      <div className="font-medium text-sm mb-2 text-[#335d57]">{title}</div>
      <div className="text-xs text-[#49494b]/80 leading-snug">{description}</div>
    </div>
  );
}