import { SlideLayout } from '@/components/slides/SlideLayout';

const roles: { lines: string[]; angle: number }[] = [
  { lines: ['Operations'], angle: 100 },
  { lines: ['Estimating'], angle: 132 },
  { lines: ['QA / Quality'], angle: 164 },
  { lines: ['Finance'], angle: 196 },
  { lines: ['HR / People'], angle: 228 },
  { lines: ['Execution'], angle: 260 },
];

const interests: { lines: string[]; angle: number; dy?: number }[] = [
  { lines: ['Toolmaker'], angle: 108, dy: 20 },
  { lines: ['Material', 'Manufacturers'], angle: 144 },
  { lines: ['Educator'], angle: 180 },
  { lines: ['Legislator'], angle: 216 },
  { lines: ['Insurer'], angle: 252, dy: -20 },
];

const center = { x: 300, y: 180 };
const roleRx = 150, roleRy = 70;
const interestRx = 260, interestRy = 120;
const roleR = 22, interestR = 20;

const clientPos = { x: 480, y: 180 };
const clientR = 26;

const cloudPuffs = [
  { dx: -30, dy: -8, r: 44 },
  { dx: 25, dy: -15, r: 48 },
  { dx: 0, dy: 14, r: 54 },
  { dx: -42, dy: 12, r: 36 },
  { dx: 42, dy: 9, r: 38 },
];

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function nodePos(angle: number, rx: number, ry: number) {
  return { x: center.x + rx * Math.cos(toRad(angle)), y: center.y + ry * Math.sin(toRad(angle)) };
}

export function EcosystemSlide() {
  return (
    <SlideLayout
      title="The Perspective Shift"
      headerContent={
        <p className="text-xs mt-2" style={{ color: 'var(--slide-text)', opacity: 0.65 }}>
          In any product delivery ecosystem, <strong>process</strong> sits at the centre of a swarm of actors:
          unstated, unmapped, unrecorded and ungoverned.
        </p>
      }
    >
      <div className="flex-1 min-h-0 grid grid-cols-[1fr_510px] gap-3 items-center">
        <svg viewBox="0 0 660 360" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', transform: 'translateX(30px)' }}>
          <defs>
            <filter id="eco-cloud-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="12" />
            </filter>
          </defs>

          <g transform="translate(0, -15)">

          {/* boundary foreshadowing the later organisation-wide / industry-wide distinction, not yet named as a commons */}
          <rect x={128} y={81} width={268} height={199} rx="12"
            fill="none" stroke="var(--slide-text)" strokeWidth="2.4" strokeDasharray="10 6" />

          {/* side headers */}
          <text x={138} y={97} textAnchor="start" fontSize="9" fontWeight="700" letterSpacing="0.5"
            fill="var(--slide-primary)" opacity="0.6">ORGANISATION</text>
          <text x={60} y={40} textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="0.5"
            fill="var(--slide-text)" opacity="0.5">ECOSYSTEM</text>

          {/* faint lines, roles to cloud */}
          {roles.map(({ angle }, i) => {
            const { x: nx, y: ny } = nodePos(angle, roleRx, roleRy);
            const t1 = 0.42, t2 = 0.85;
            const x1 = center.x + t1 * (nx - center.x), y1 = center.y + t1 * (ny - center.y);
            const x2 = center.x + t2 * (nx - center.x), y2 = center.y + t2 * (ny - center.y);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="var(--slide-primary)" strokeWidth="1.2" strokeDasharray="3,4" opacity="0.3" />
            );
          })}

          {/* faint lines, interests to cloud */}
          {interests.map(({ angle, dy: nodeDy }, i) => {
            const pos = nodePos(angle, interestRx, interestRy);
            const nx = pos.x, ny = pos.y + (nodeDy ?? 0);
            const t1 = 0.42, t2 = 0.85;
            const x1 = center.x + t1 * (nx - center.x), y1 = center.y + t1 * (ny - center.y);
            const x2 = center.x + t2 * (nx - center.x), y2 = center.y + t2 * (ny - center.y);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="var(--slide-text)" strokeWidth="1" strokeDasharray="3,4" opacity="0.22" />
            );
          })}

          {/* the shared, unmetered process */}
          <g filter="url(#eco-cloud-blur)">
            {cloudPuffs.map(({ dx, dy, r }, i) => (
              <circle key={i} cx={center.x + dx} cy={center.y + dy} r={r} fill="var(--slide-text)" opacity="0.14" />
            ))}
          </g>
          <text x={center.x} y={center.y - 2} textAnchor="middle" fontSize="15" fontWeight="700" fontStyle="italic" fill="var(--slide-text)" opacity="0.55">
            Process
          </text>
          <text x={center.x} y={center.y + 14} textAnchor="middle" fontSize="8" fontStyle="italic" fill="var(--slide-text)" opacity="0.4">
            shared, invisible
          </text>

          {/* left: organisation roles */}
          {roles.map(({ lines, angle }, i) => {
            const { x: nx, y: ny } = nodePos(angle, roleRx, roleRy);
            return (
              <g key={`role-${i}`}>
                <circle cx={nx} cy={ny} r={roleR} fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.5" />
                {lines.map((line, li) => (
                  <text key={li} x={nx} y={ny + (li - (lines.length - 1) / 2) * 10 + 3} textAnchor="middle"
                    fontSize="8.5" fontWeight="700" fill="var(--slide-primary)">
                    {line}
                  </text>
                ))}
              </g>
            );
          })}

          {/* right: ecosystem interests */}
          {interests.map(({ lines, angle, dy: nodeDy }, i) => {
            const pos = nodePos(angle, interestRx, interestRy);
            const nx = pos.x, ny = pos.y + (nodeDy ?? 0);
            return (
              <g key={`interest-${i}`}>
                <circle cx={nx} cy={ny} r={interestR} fill="var(--slide-bg-card)" stroke="var(--slide-border)" strokeWidth="1.4" />
                {lines.map((line, li) => (
                  <text key={li} x={nx} y={ny + (li - (lines.length - 1) / 2) * 9 + 3} textAnchor="middle"
                    fontSize="8" fontWeight="600" fill="var(--slide-text)" opacity="0.8">
                    {line}
                  </text>
                ))}
              </g>
            );
          })}

          {/* client: a critical party in outcomes like the carbon story, connected to the same process */}
          <line x1={390} y1={clientPos.y} x2={clientPos.x - clientR - 4} y2={clientPos.y}
            stroke="var(--slide-accent)" strokeWidth="1.4" strokeDasharray="3,4" opacity="0.5" />
          <circle cx={clientPos.x} cy={clientPos.y} r={clientR} fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="1.8" />
          <text x={clientPos.x} y={clientPos.y + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--slide-accent)">Client</text>

          </g>

          {/* legend */}
          <g transform="translate(57, 340)">
            <circle cx={6} cy={0} r={6} fill="var(--slide-bg-primary-muted)" stroke="var(--slide-border-primary)" strokeWidth="1.2" />
            <text x={18} y={4} fontSize="9" fill="var(--slide-text)" opacity="0.7">Organisation roles</text>
            <circle cx={150} cy={0} r={6} fill="var(--slide-bg-card)" stroke="var(--slide-border)" strokeWidth="1.2" />
            <text x={162} y={4} fontSize="9" fill="var(--slide-text)" opacity="0.7">Ecosystem interests</text>
            <circle cx={300} cy={0} r={6} fill="var(--slide-bg-accent-muted)" stroke="var(--slide-accent)" strokeWidth="1.2" />
            <text x={312} y={4} fontSize="9" fill="var(--slide-text)" opacity="0.7">Client / Consumer</text>
          </g>
        </svg>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>
            Worked Problems
          </span>

          <div className="rounded-lg px-5 py-5 flex flex-col gap-3" style={{ backgroundColor: 'var(--slide-bg-muted)' }}>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>
              Carbon
            </span>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>
              The <strong>organisation</strong> wants to show it uses less carbon. A <strong>legislator</strong> wants
              to enforce less carbon. The <strong>client</strong> wants to buy from whoever actually achieves it.
              A <strong>material manufacturer</strong> embodies carbon in the material itself, and a
              <strong> toolmaker</strong> in the energy their tools consume in use. During <strong>execution</strong>,
              the <strong>designer</strong>, <strong>machinist</strong>, <strong>fabricator</strong>, and
              <strong> installer</strong> each add their own waste.
            </p>
            <p className="text-xs leading-relaxed font-semibold" style={{ color: 'var(--slide-accent)' }}>
              The system has no way to incentivise the executor, the toolmaker, or the material manufacturer to
              reduce carbon. It rewards tangential goals instead.
            </p>

            <div className="pt-3 mt-1 flex flex-col gap-3" style={{ borderTop: '1px solid var(--slide-border)' }}>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--slide-primary)', opacity: 0.6 }}>
                Safety
              </span>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--slide-text)', opacity: 0.8 }}>
                A <strong>toolmaker</strong> made the goggles. A <strong>legislator</strong> required them worn for
                the activity. An <strong>educator</strong> taught that requirement. The <strong>operations</strong> manager
                made sure the "wear goggles" sign was on the wall. An <strong>insurer</strong> priced the risk without
                being able to know whether it was actually followed. The <strong>executor</strong> wore them, or
                didn't, with no record either way.
              </p>
            </div>
            <p className="text-xs leading-relaxed font-semibold" style={{ color: 'var(--slide-accent)' }}>
              What went on in the field, no one knows.
            </p>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
