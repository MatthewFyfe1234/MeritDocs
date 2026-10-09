import { Cpu, Code2, Truck, User, Plug } from 'lucide-react';
import { SlideLayout } from '@/components/slides/SlideLayout';

type ToolType = 'hardware' | 'software' | 'vehicle';

const toolIcon: Record<ToolType, typeof Cpu> = {
  hardware: Cpu,
  software: Code2,
  vehicle: Truck,
};

const columns: { x: number; tool: ToolType }[] = [
  { x: 100, tool: 'hardware' },
  { x: 240, tool: 'software' },
  { x: 340, tool: 'vehicle' },
  { x: 440, tool: 'hardware' },
  { x: 580, tool: 'software' },
];

const personY = 34;
const toolY = 120;
const center = { x: 340, y: 218 };
const shapeHalf = 42;

export function LandscapeSlide() {
  return (
    <SlideLayout
      title="One Project, Plugged In"
      subtitle="Zoom into one project team: people operating tools, each plugged into the same structured process the rest of the ecosystem depends on."
    >
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox="0 0 680 280" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
          {/* Columns: person -> tool -> plug -> process */}
          {columns.map(({ x, tool }, i) => {
            const Icon = toolIcon[tool];
            const dx = center.x - x, dy = center.y - (toolY + 15);
            const dist = Math.sqrt(dx * dx + dy * dy);
            const ux = dx / dist, uy = dy / dist;
            const targetR = shapeHalf + 12;
            const lineEndX = center.x - ux * targetR;
            const lineEndY = center.y - uy * targetR;
            const plugR = shapeHalf + 4;
            const plugX = center.x - ux * plugR;
            const plugY = center.y - uy * plugR;
            const rotate = (Math.atan2(uy, ux) * 180) / Math.PI + 90;

            return (
              <g key={i}>
                {/* tool -> process */}
                <line x1={x} y1={toolY + 15} x2={lineEndX} y2={lineEndY} stroke="var(--slide-primary)" strokeWidth="1.5" opacity="0.4" />
                {/* person -> tool */}
                <line x1={x} y1={personY + 12} x2={x} y2={toolY - 15} stroke="var(--slide-text)" strokeWidth="1" strokeDasharray="3,2" opacity="0.35" />

                {/* Person node */}
                <circle cx={x} cy={personY} r="13" fill="var(--slide-bg-card)" stroke="var(--slide-border-primary)" strokeWidth="1.5" />
                <foreignObject x={x - 8} y={personY - 8} width="16" height="16">
                  {/* @ts-ignore */}
                  <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={13} color="var(--slide-text)" strokeWidth={2} />
                  </div>
                </foreignObject>

                {/* Tool node */}
                <circle cx={x} cy={toolY} r="15" fill="var(--slide-bg-primary-muted)" stroke="var(--slide-primary)" strokeWidth="1.5" />
                <foreignObject x={x - 9} y={toolY - 9} width="18" height="18">
                  {/* @ts-ignore */}
                  <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={15} color="var(--slide-primary)" strokeWidth={2} />
                  </div>
                </foreignObject>

                {/* Plug, where the tool meets the process */}
                <foreignObject x={plugX - 9} y={plugY - 9} width="18" height="18">
                  {/* @ts-ignore */}
                  <div xmlns="http://www.w3.org/1999/xhtml" style={{
                    width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transform: `rotate(${rotate}deg)`,
                  }}>
                    <Plug size={13} color="var(--slide-accent)" strokeWidth={2} />
                  </div>
                </foreignObject>
              </g>
            );
          })}

          {/* The structured process: the same shape as the resolved cloud, subset in use */}
          <rect x={center.x - shapeHalf} y={center.y - shapeHalf} width={shapeHalf * 2} height={shapeHalf * 2} rx="10"
            fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="2" />
          {[-1, 1].map(v => (
            <line key={`v${v}`} x1={center.x + v * (shapeHalf * 2 / 3)} y1={center.y - shapeHalf + 5}
              x2={center.x + v * (shapeHalf * 2 / 3)} y2={center.y + shapeHalf - 5}
              stroke="var(--slide-accent)" strokeWidth="1" opacity="0.25" />
          ))}
          {[-1, 1].map(v => (
            <line key={`h${v}`} x1={center.x - shapeHalf + 5} y1={center.y + v * (shapeHalf * 2 / 3)}
              x2={center.x + shapeHalf - 5} y2={center.y + v * (shapeHalf * 2 / 3)}
              stroke="var(--slide-accent)" strokeWidth="1" opacity="0.25" />
          ))}
          <text x={center.x} y={center.y + 4} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--slide-accent)">Process</text>
          <text x={center.x} y={center.y + shapeHalf + 16} textAnchor="middle" fontSize="8" fontStyle="italic" fill="var(--slide-text)" opacity="0.5">
            one project, one instance
          </text>

          <text x={20} y={personY - 22} fontSize="8" fontWeight="700" letterSpacing="1" fill="var(--slide-text)" opacity="0.35">PEOPLE</text>
          <text x={20} y={toolY - 26} fontSize="8" fontWeight="700" letterSpacing="1" fill="var(--slide-text)" opacity="0.35">TOOLS</text>
        </svg>
      </div>

      <p className="text-sm leading-relaxed text-center" style={{ color: 'var(--slide-accent)' }}>
        Every tool on this job, and the person running it, plugs into the same process the rest of the ecosystem
        depends on. This is what one project looks like, from inside the resolved cloud.
      </p>
    </SlideLayout>
  );
}
