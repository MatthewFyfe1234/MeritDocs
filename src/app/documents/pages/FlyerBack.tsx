import logoImage from 'figma:asset/0c594b32138f3e526e4dd761cc7de6d470e529f6.png';

export function FlyerBack() {
  return (
    <div className="aspect-[210/297] bg-white p-12 flex flex-col text-[#49494b]">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-5xl mb-4 leading-tight">
          One System. <span className="text-[#9314ff]">For Everyone.</span>
        </h2>
      </div>

      {/* One System features */}
      <div className="grid grid-cols-3 gap-8 mb-12">
        <FeatureCard 
          title="Shared Documents"
          description="All stakeholders access the same live documents, eliminating version confusion at every level."
        />
        <FeatureCard 
          title="Unified Platform"
          description="One system replacing fragmented tools: workforce, planning, process mapping and business intelligence."
        />
        <FeatureCard 
          title="Full Transparency"
          description="Clients, contractors, suppliers and teams collaborate in real time with complete visibility."
        />
      </div>

      {/* Tagline */}
      <div className="bg-[#335d57] text-white p-8 rounded-lg mb-12 text-center">
        <p className="text-2xl italic leading-relaxed">
          Merit is not just software. It is an operating model that changes how your 
          organisation sees itself, plans its work and delivers results.
        </p>
      </div>

      {/* Benefits grid */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-8 mb-12">
        <BenefitItem 
          title="Decisions driven by data, not instinct"
          description="Real-time visibility replaces end-of-week reporting. Leadership acts on what is happening now, not what happened last Friday."
        />
        <BenefitItem 
          title="Resources where they are needed"
          description="Automated scheduling and smart assignment eliminate guesswork and idle capacity across every project."
        />
        <BenefitItem 
          title="Every stakeholder on the same page"
          description="From the boardroom to the field, suppliers to clients, everyone works from the same live information at all times."
        />
        <BenefitItem 
          title="Problems caught before they become costly"
          description="Continuous monitoring of budgets, timelines and performance flags issues early so you can act rather than react."
        />
        <BenefitItem 
          title="A culture of accountability"
          description="When goals connect to individual tasks and everyone can see progress, ownership becomes natural and performance improves."
        />
        <BenefitItem 
          title="Continuous improvement built in"
          description="Aggregated data across every project builds an institutional knowledge base your organisation can learn from and build on."
        />
      </div>

      {/* Transformation statement */}
      <div className="bg-[#e4e8e8] p-8 rounded-lg mb-auto">
        <div className="text-center">
          <div className="text-3xl mb-4 leading-relaxed text-[#49494b]">
            Merit transforms<br />
            <span className="text-[#9314ff]">clarity into action</span>,<br />
            <span className="text-[#9314ff]">fragmentation into alignment</span>,<br />
            and <span className="text-[#9314ff]">potential into performance</span>.
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 pt-8 border-t-2 border-[#335d57] relative min-h-[200px]">
        <div className="absolute top-8 left-0 text-[#49494b]">
          <div className="text-xl text-[#335d57] mb-2">www.meritoi.com</div>
          <div className="text-sm">
            <div className="mb-1"><span className="font-medium">Umar Abubakar, Co-Founder</span></div>
            <div>umar@meritoi.com</div>
            <div>+234 816 693 0057</div>
          </div>
        </div>
        <div className="absolute top-8 right-0">
          <img 
            src={logoImage} 
            alt="Merit Logo" 
            className="h-48 w-auto"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-[#e4e8e8] p-6 rounded-lg">
      <div className="font-medium text-lg mb-3 text-[#335d57]">{title}</div>
      <div className="text-sm text-[#49494b]/80 leading-relaxed">{description}</div>
    </div>
  );
}

function BenefitItem({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <div className="font-medium text-lg mb-2 text-[#9314ff]">{title}</div>
      <div className="text-base text-[#49494b]/80 leading-relaxed">{description}</div>
    </div>
  );
}