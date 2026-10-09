import { SlideLayout } from '@/components/slides/SlideLayout';

const rows: { regulation: string; requirement: string; merit: string; highlight?: boolean }[] = [
  {
    regulation: 'CRFD / AASB S2 (Group 1 from Jan 2025)',
    requirement: 'Large clients must disclose Scope 3 supply chain emissions - cascading to SME suppliers now',
    merit: 'Carbon forecasting and embodied carbon tracked at job level, ready for supplier requests',
  },
  {
    regulation: 'WHS Act 2011 / NSW Section 26A (1 July 2026)',
    requirement: 'Codes of Practice become legally binding - auditable evidence of risk management required',
    merit: 'Certification, process, and compliance records as the audit trail',
  },
  {
    regulation: 'State MMC Strategies (NSW, Vic, Qld)',
    requirement: 'Active government strategies directing social housing and infrastructure procurement toward offsite suppliers',
    merit: 'Procurement-ready evidence of delivery performance, carbon, and workforce compliance',
  },
  {
    regulation: 'Australian Skills Guarantee (from 1 July 2024)',
    requirement: '10% of hours on Commonwealth contracts ($10m+) must be apprentices or trainees; state thresholds vary',
    merit: 'Training and certification records evidence compliance against each person and project',
  },
  {
    regulation: 'Fair Work Act - Closing Loopholes (2023-24)',
    requirement: 'Casual conversion, wage records, and right to disconnect require auditable hours and delivery records',
    merit: 'Delivery and hours data as the objective, auditable basis for employment decisions',
  },
  {
    regulation: 'NCC 2025 / NABERS Embodied Carbon',
    requirement: 'Mandatory disclosure in NSW commercial development now; national mandatory minimums under development - residential timeline paused to mid-2029',
    merit: 'Embodied carbon tracked at job and component level',
  },
];

const colStyle: React.CSSProperties = { gridTemplateColumns: '1.4fr 2fr 2fr' };

export function RegulationSlide() {
  return (
    <SlideLayout
      title="The Regulatory Moment"
      subtitle="What's changing, and how the platform responds."
    >
      <div className="flex-1 min-h-0 flex flex-col">
        <div
          className="grid gap-x-8 pb-2 mb-1"
          style={{ ...colStyle, borderBottom: '1px solid var(--slide-border-primary)' }}
        >
          {['Regulation', 'What it requires', 'Merit'].map((h) => (
            <span
              key={h}
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--slide-primary)', opacity: 0.6 }}
            >
              {h}
            </span>
          ))}
        </div>

        <div className="flex flex-col flex-1">
          {rows.map(({ regulation, requirement, merit, highlight }) => (
            <div
              key={regulation}
              className="grid gap-x-8 py-4"
              style={{ ...colStyle, borderBottom: '1px solid var(--slide-border)' }}
            >
              <span
                className="text-xs font-semibold leading-snug"
                style={{ color: 'var(--slide-primary)', opacity: 0.8 }}
              >
                {regulation}
              </span>
              <span
                className="text-xs leading-snug"
                style={highlight
                  ? { color: 'var(--slide-accent)', opacity: 0.85, fontWeight: 600 }
                  : { color: 'var(--slide-text)', opacity: 0.6 }}
              >
                {requirement}
              </span>
              <span
                className="text-xs leading-snug"
                style={{ color: 'var(--slide-text)', opacity: 0.8 }}
              >
                {merit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
