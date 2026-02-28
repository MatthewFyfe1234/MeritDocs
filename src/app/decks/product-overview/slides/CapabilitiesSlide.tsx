export function CapabilitiesSlide() {
  // Hexagonal arrangement: 6 circles around a central point
  // R = distance from arrangement centre to each circle centre
  // r = radius of each circle
  const R = 140, r = 108;
  const cx = 400, cy = 255; // arrangement centre

  const s3 = Math.round(R * Math.sqrt(3) / 2); // 121
  const h  = Math.round(R / 2);                 // 70

  // [label, cx, cy]
  const centres = {
    erp:  [cx,      cy - R],        // top
    pm:   [cx + s3, cy - h],        // top-right
    proc: [cx + s3, cy + h],        // bottom-right
    bi:   [cx,      cy + R],        // bottom
    cpq:  [cx - s3, cy + h],        // bottom-left
    wm:   [cx - s3, cy - h],        // top-left
  } as const;

  const [, ex, ey]  = [null, centres.erp[0],  centres.erp[1]];
  const [, px, py]  = [null, centres.pm[0],   centres.pm[1]];
  const [, rx, ry]  = [null, centres.proc[0], centres.proc[1]];
  const [, bx, by]  = [null, centres.bi[0],   centres.bi[1]];
  const [, qx, qy]  = [null, centres.cpq[0],  centres.cpq[1]];
  const [, wx, wy]  = [null, centres.wm[0],   centres.wm[1]];

  const feat = { fontSize: '7.2', fill: 'var(--slide-text)', opacity: 0.6 } as const;
  const title = { fontSize: '12', fontWeight: '700', fill: 'var(--slide-primary)' } as const;

  return (
    <div className="w-full h-full p-6 flex flex-col">
      <div className="shrink-0 mb-1">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--slide-primary)' }}>One Platform</h2>
        <div className="w-16 h-1 mt-1" style={{ backgroundColor: 'var(--slide-accent)' }} />
      </div>

      <div className="flex-1 min-h-0">
        <svg viewBox="0 0 800 500" style={{ width: '100%', height: '100%' }}>

          {/* ── CIRCLE FILLS (drawn first so text renders on top) ── */}
          {Object.values(centres).map(([, x, y]) => (
            <circle key={`fill-${x}-${y}`} cx={x} cy={y} r={r}
              fill="var(--slide-bg-primary-muted)" fillOpacity="0.65"
              stroke="var(--slide-border-primary)" strokeWidth="1.5" />
          ))}

          {/* ── ERP (top) — private zone: upper arc ── */}
          <text x={ex} y={ey - 18} textAnchor="middle" {...title}>ERP</text>
          <text x={ex} y={ey - 66} textAnchor="middle" {...feat}>Finance & Accounting</text>
          <text x={ex} y={ey - 55} textAnchor="middle" {...feat}>Supply Chain Mgmt</text>
          <text x={ex} y={ey - 44} textAnchor="middle" {...feat}>Sales & Order Mgmt</text>
          <text x={ex} y={ey - 33} textAnchor="middle" {...feat}>Inventory Management</text>
          <text x={ex} y={ey - 6}  textAnchor="middle" {...feat}>Human Resources</text>

          {/* ── PROJECT MANAGEMENT (top-right) — private zone: right arc ── */}
          <text x={px + 46} y={py - 5}  textAnchor="middle" {...title}>Project</text>
          <text x={px + 46} y={py + 9}  textAnchor="middle" {...title}>Management</text>
          <text x={px + 30} y={py - 32} textAnchor="start" {...feat}>Time Tracking</text>
          <text x={px + 30} y={py - 21} textAnchor="start" {...feat}>Task Mgmt</text>
          <text x={px + 30} y={py + 22} textAnchor="start" {...feat}>Resource Mgmt</text>
          <text x={px + 30} y={py + 33} textAnchor="start" {...feat}>Document Mgmt</text>
          <text x={px + 30} y={py + 44} textAnchor="start" {...feat}>Scheduling</text>
          <text x={px + 30} y={py + 55} textAnchor="start" {...feat}>Gantt Charts</text>

          {/* ── PROCESS MAPPING (bottom-right) — private zone: lower-right arc ── */}
          <text x={rx + 46} y={ry - 5}  textAnchor="middle" {...title}>Process</text>
          <text x={rx + 46} y={ry + 9}  textAnchor="middle" {...title}>Mapping</text>
          <text x={rx + 30} y={ry - 55} textAnchor="start" {...feat}>Customisation</text>
          <text x={rx + 30} y={ry - 44} textAnchor="start" {...feat}>Cloud Storage</text>
          <text x={rx + 30} y={ry - 33} textAnchor="start" {...feat}>User Permissions</text>
          <text x={rx + 30} y={ry + 22} textAnchor="start" {...feat}>SIPOC</text>
          <text x={rx + 30} y={ry + 33} textAnchor="start" {...feat}>Process Chaining</text>
          <text x={rx + 30} y={ry + 44} textAnchor="start" {...feat}>Automated Mapping</text>
          <text x={rx + 30} y={ry + 55} textAnchor="start" {...feat}>3D Mapping</text>
          <text x={rx + 30} y={ry + 66} textAnchor="start" {...feat}>Version Control</text>

          {/* ── BUSINESS INTELLIGENCE (bottom) — private zone: lower arc ── */}
          <text x={bx} y={by + 20} textAnchor="middle" {...title}>Business</text>
          <text x={bx} y={by + 34} textAnchor="middle" {...title}>Intelligence</text>
          <text x={bx} y={by + 50} textAnchor="middle" {...feat}>Self-service BI</text>
          <text x={bx} y={by + 61} textAnchor="middle" {...feat}>Embedded Analytics</text>
          <text x={bx} y={by + 72} textAnchor="middle" {...feat}>Data Visualisation</text>
          <text x={bx} y={by + 83} textAnchor="middle" {...feat}>Automated Reporting</text>
          <text x={bx} y={by + 6}  textAnchor="middle" {...feat}>ETL</text>

          {/* ── CPQ (bottom-left) — private zone: left arc ── */}
          <text x={qx - 46} y={qy - 5}  textAnchor="middle" {...title}>CPQ</text>
          <text x={qx - 30} y={qy - 55} textAnchor="end" {...feat}>Quote Management</text>
          <text x={qx - 30} y={qy - 44} textAnchor="end" {...feat}>Product Configuration</text>
          <text x={qx - 30} y={qy - 33} textAnchor="end" {...feat}>Pricing Rules</text>
          <text x={qx - 30} y={qy + 22} textAnchor="end" {...feat}>CRM Integration</text>
          <text x={qx - 30} y={qy + 33} textAnchor="end" {...feat}>Product Validation</text>
          <text x={qx - 30} y={qy + 44} textAnchor="end" {...feat}>Analytics & Reporting</text>
          <text x={qx - 30} y={qy + 55} textAnchor="end" {...feat}>Material Req. Calc.</text>

          {/* ── WORKFORCE MANAGEMENT (top-left) — private zone: upper-left arc ── */}
          <text x={wx - 44} y={wy - 5}  textAnchor="middle" {...title}>Workforce</text>
          <text x={wx - 44} y={wy + 9}  textAnchor="middle" {...title}>Management</text>
          <text x={wx - 30} y={wy - 32} textAnchor="end" {...feat}>Payroll Processing</text>
          <text x={wx - 30} y={wy - 21} textAnchor="end" {...feat}>Leave Management</text>
          <text x={wx - 30} y={wy + 22} textAnchor="end" {...feat}>Scheduling</text>
          <text x={wx - 30} y={wy + 33} textAnchor="end" {...feat}>Compliance Mgmt</text>
          <text x={wx - 30} y={wy + 44} textAnchor="end" {...feat}>Time & Attendance</text>
          <text x={wx - 30} y={wy + 55} textAnchor="end" {...feat}>Performance Analytics</text>

          {/* ── CENTRAL OVERLAP FEATURES ── */}
          <text x={cx} y={cy - 38} textAnchor="middle" fontSize="7" fill="var(--slide-text)" opacity="0.45">Process-based File Access</text>
          <text x={cx} y={cy - 27} textAnchor="middle" fontSize="7" fill="var(--slide-text)" opacity="0.45">Automated Project Planning</text>
          <text x={cx} y={cy + 30} textAnchor="middle" fontSize="7" fill="var(--slide-text)" opacity="0.45">Executor Experience Tracking</text>
          <text x={cx} y={cy + 41} textAnchor="middle" fontSize="7" fill="var(--slide-text)" opacity="0.45">Document Control</text>

          {/* ── MERIT CENTRAL LABEL ── */}
          <text x={cx} y={cy + 10} textAnchor="middle" fontSize="30" fontWeight="800"
            fill="var(--slide-accent)">Merit</text>

        </svg>
      </div>
    </div>
  );
}
