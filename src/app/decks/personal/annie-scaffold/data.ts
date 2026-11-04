// Source of truth for the scaffold. Status/stage/attempted here are the defaults;
// clicks in the deck override them in this browser only (see store.ts).
// No dosing anywhere: agents and course type only.

export type SystemId = 'vector' | 'gut' | 'intracellular' | 'viral' | 'immune' | 'nervous' | 'endocrine';
export type Status = 'suspected' | 'confirmed' | 'ruled out';
export type Stage = 'untreated' | 'treating' | 'resolved' | 'recurred';
export type Burden = 'none' | 'low' | 'moderate' | 'high';
export type Consensus = 'guideline' | 'contested';

export const STATUSES: Status[] = ['suspected', 'confirmed', 'ruled out'];
export const STAGES: Stage[] = ['untreated', 'treating', 'resolved', 'recurred'];

export interface TreatmentOption {
  label: string;
  abx: boolean;
  consensus: Consensus;
  attempted?: boolean;
}

export interface BurdenRange {
  from: Burden;
  to?: Burden;
  note?: string;
}

export interface Infection {
  id: string;
  name: string;
  system: SystemId;
  alsoIn?: SystemId[];
  status: Status;
  stage: Stage;
  options: TreatmentOption[];
  burden: BurdenRange;
  risk: string;
  flag?: string;
}

export interface SystemInfo {
  id: SystemId;
  label: string;
  lines: string[];
  role: 'source' | 'hub' | 'downstream';
  cascade: string;
}

export const systems: SystemInfo[] = [
  { id: 'vector',        label: 'Vector-borne / blood',       lines: ['Vector-borne', '/ blood'],        role: 'source',     cascade: 'Source node. Feeds the immune hub.' },
  { id: 'gut',           label: 'Gut',                        lines: ['Gut'],                            role: 'source',     cascade: 'Source node. Bidirectional with the immune hub.' },
  { id: 'intracellular', label: 'Intracellular / respiratory', lines: ['Intracellular', '/ respiratory'], role: 'source',     cascade: 'Source node. Feeds the immune hub.' },
  { id: 'viral',         label: 'Reactivated viruses',        lines: ['Reactivated', 'viruses'],         role: 'source',     cascade: 'Source node. Feeds the immune hub.' },
  { id: 'immune',        label: 'Immune / mast cell',         lines: ['Immune / mast cell'],             role: 'hub',        cascade: 'The hub and amplifier. Stabilise first.' },
  { id: 'nervous',       label: 'Nervous system',             lines: ['Nervous system'],                 role: 'downstream', cascade: 'Downstream target of the hub and endocrine.' },
  { id: 'endocrine',     label: 'Endocrine',                  lines: ['Endocrine'],                      role: 'downstream', cascade: 'Downstream of the hub, and a modulator of the nervous system.' },
];

const o = (label: string, abx: boolean, consensus: Consensus): TreatmentOption => ({ label, abx, consensus });
const ABX = true;
const NON = false;

const base = { status: 'suspected' as Status, stage: 'untreated' as Stage };

export const infections: Infection[] = [
  // ---------------------------------------------------------------- Vector-borne / blood
  {
    ...base, id: 'borrelia', name: 'Lyme (B. burgdorferi)', system: 'vector',
    options: [
      o('Doxycycline / amoxicillin / cefuroxime, oral, defined course', ABX, 'guideline'),
      o('Ceftriaxone IV for neuro involvement', ABX, 'guideline'),
      o('ILADS long-course / combination', ABX, 'contested'),
      o('Herbal: cryptolepis, Japanese knotweed, Chinese skullcap (weak evidence)', NON, 'contested'),
    ],
    burden: { from: 'moderate' },
    risk: 'Gut disruption and Herxheimer. Guidelines advise against extended antibiotics for lingering symptoms.',
  },
  {
    ...base, id: 'miyamotoi', name: 'B. miyamotoi', system: 'vector',
    options: [
      o('Doxycycline', ABX, 'guideline'),
      o('Ceftriaxone IV for CNS involvement', ABX, 'guideline'),
    ],
    burden: { from: 'moderate', to: 'high' },
    risk: 'Very high Herxheimer risk (high bacteremia). Stabilise mast cells before starting.',
  },
  {
    ...base, id: 'babesia', name: 'Babesia', system: 'vector',
    options: [
      o('Atovaquone + azithromycin (preferred; azithromycin is an antibiotic)', ABX, 'guideline'),
      o('Clindamycin + quinine (alternative, poorly tolerated)', ABX, 'guideline'),
      o('Tafenoquine + atovaquone (emerging; G6PD test first)', NON, 'contested'),
      o('Cryptolepis (weak evidence)', NON, 'contested'),
    ],
    burden: { from: 'moderate' },
    risk: 'Quinine toxicity. Azithromycin GI cramping.',
  },
  {
    ...base, id: 'bartonella', name: 'Bartonella', system: 'vector', alsoIn: ['nervous'],
    options: [
      o('Azithromycin (cat-scratch)', ABX, 'guideline'),
      o('Doxycycline + rifampin (severe)', ABX, 'guideline'),
      o('Long "chronic Bartonella" combinations', ABX, 'contested'),
      o('Methylene blue + clarithromycin', ABX, 'contested'),
      o('Botanicals', NON, 'contested'),
    ],
    burden: { from: 'moderate', to: 'high' },
    risk: 'Avoid fluoroquinolones (direct mast-cell activation). Rifampin interacts with many drugs, incl. MCAS meds. Tick-borne transmission debated.',
  },
  {
    ...base, id: 'anaplasma', name: 'Anaplasma', system: 'vector',
    options: [
      o('Doxycycline, short course (covers Lyme too)', ABX, 'guideline'),
      o('Rifampin if doxycycline-intolerant', ABX, 'guideline'),
    ],
    burden: { from: 'low', to: 'moderate' },
    risk: 'Acute: treat promptly. Short course limits gut damage.',
  },
  {
    ...base, id: 'ehrlichia', name: 'Ehrlichia', system: 'vector',
    options: [
      o('Doxycycline (only effective first-line)', ABX, 'guideline'),
    ],
    burden: { from: 'low', to: 'moderate' },
    risk: 'Acute. Beta-lactams and macrolides are ineffective.',
  },
  {
    ...base, id: 'rickettsia', name: 'Rickettsia / spotted fever', system: 'vector',
    options: [
      o('Doxycycline, immediately if suspected', ABX, 'guideline'),
    ],
    burden: { from: 'low', to: 'moderate', note: 'short' },
    risk: 'Life-threatening: do not delay for stabilisation. Avoid fluoroquinolones.',
  },
  {
    ...base, id: 'tularemia', name: 'Tularemia', system: 'vector',
    options: [
      o('Gentamicin IV (spares gut lumen)', ABX, 'guideline'),
      o('Doxycycline or ciprofloxacin, oral', ABX, 'guideline'),
    ],
    burden: { from: 'low', to: 'moderate', note: 'low if IV gentamicin' },
    risk: 'Aminoglycoside kidney and ear toxicity. Notify lab (biohazard).',
  },
  {
    ...base, id: 'powassan', name: 'Powassan virus', system: 'vector',
    options: [
      o('Supportive care (no antiviral)', NON, 'guideline'),
      o('IVIG, off-label', NON, 'contested'),
      o('PEA + luteolin adjunct', NON, 'contested'),
    ],
    burden: { from: 'none' },
    risk: 'Neuro-inflammation.',
  },
  {
    ...base, id: 'tbe', name: 'Tick-borne encephalitis', system: 'vector',
    options: [
      o('Supportive care', NON, 'guideline'),
      o('Vaccine, for prevention', NON, 'guideline'),
    ],
    burden: { from: 'none' },
    risk: 'Neuro. Vaccine excipients may trigger MCAS.',
  },
  {
    ...base, id: 'plasmodium', name: 'Plasmodium (confirm vs Babesia)', system: 'vector',
    options: [
      o('Artemisinin-based combination / chloroquine (region-dependent antimalarial)', NON, 'guideline'),
    ],
    burden: { from: 'none' },
    risk: 'Confirm identity first: unusual in a non-endemic setting, biologically close to Babesia. G6PD test before primaquine/tafenoquine.',
  },

  // ---------------------------------------------------------------- Gut
  {
    ...base, id: 'hpylori', name: 'H. pylori', system: 'gut',
    options: [
      o('Bismuth quadruple therapy', ABX, 'guideline'),
      o('Vonoprazan + amoxicillin dual therapy (one antibiotic, fewer side effects)', ABX, 'guideline'),
      o('S. boulardii, L. reuteri DSM 17648 (raise cure, cut side effects)', NON, 'guideline'),
      o('NAC (biofilm)', NON, 'guideline'),
      o('Mastic gum (~30% as monotherapy)', NON, 'guideline'),
    ],
    burden: { from: 'high', to: 'moderate', note: 'reducible via dual therapy + probiotic' },
    risk: 'Classic triple/quad is the heaviest antibiotic exposure on the list. Confirm cure by testing.',
    flag: 'Biggest antibiotic-sparing lever',
  },
  {
    ...base, id: 'sibo', name: 'SIBO', system: 'gut',
    options: [
      o('Rifaximin (gut-selective, spares colonic flora)', ABX, 'guideline'),
      o('+ neomycin / metronidazole for methane (IMO)', ABX, 'guideline'),
      o('Elemental diet (~80-85%, antibiotic-free)', NON, 'guideline'),
      o('Herbal antimicrobials (matched rifaximin in one trial)', NON, 'contested'),
      o('Prokinetics for relapse', NON, 'guideline'),
    ],
    burden: { from: 'none', to: 'low', note: 'can be antibiotic-free' },
    risk: 'High relapse: address motility.',
    flag: 'Best fit for Annie\'s constraint',
  },
  {
    ...base, id: 'candida', name: 'Candida / SIFO', system: 'gut',
    options: [
      o('Nystatin (non-absorbed, gut-only)', NON, 'guideline'),
      o('Fluconazole (systemic, liver monitoring)', NON, 'guideline'),
      o('S. boulardii + caprylic acid, mycobiome diet', NON, 'contested'),
    ],
    burden: { from: 'none', note: 'antifungal' },
    risk: '"Systemic candida" as a symptom driver is contested. Fluconazole: die-off and drug interactions.',
  },
  {
    ...base, id: 'parasites', name: 'Parasites (Blastocystis / Giardia)', system: 'gut',
    options: [
      o('Tinidazole, short course (high cure)', ABX, 'guideline'),
      o('Nitazoxanide (non-antibiotic antiprotozoal, better tolerated)', NON, 'guideline'),
      o('Metronidazole', ABX, 'guideline'),
      o('Berberine + S. boulardii', NON, 'contested'),
    ],
    burden: { from: 'low', to: 'moderate', note: 'none with nitazoxanide' },
    risk: 'Treat Blastocystis only if symptomatic. Metronidazole poorly tolerated.',
  },

  // ---------------------------------------------------------------- Intracellular / respiratory
  {
    ...base, id: 'mycoplasma', name: 'Mycoplasma pneumoniae', system: 'intracellular',
    options: [
      o('Azithromycin (macrolide)', ABX, 'guideline'),
      o('Doxycycline (macrolide-resistant strains)', ABX, 'guideline'),
      o('Levofloxacin (reserved)', ABX, 'guideline'),
      o('Treating chronic serology-only "infection"', ABX, 'contested'),
      o('Botanicals (weak evidence)', NON, 'contested'),
    ],
    burden: { from: 'moderate' },
    risk: 'Avoid fluoroquinolones in MCAS. Beta-lactams useless (no cell wall).',
  },
  {
    ...base, id: 'chlamydia', name: 'Chlamydia pneumoniae', system: 'intracellular',
    options: [
      o('Doxycycline or azithromycin, short course (acute)', ABX, 'guideline'),
      o('Combined Antibiotic Protocol (multi-drug, months)', ABX, 'contested'),
      o('NAC + sulforaphane + berberine adjuncts', NON, 'contested'),
    ],
    burden: { from: 'moderate', to: 'high', note: 'high only under contested CAP' },
    risk: 'Avoid long CAP in MCAS: high adverse events, major die-off risk.',
  },
  {
    ...base, id: 'ureaplasma', name: 'Ureaplasma', system: 'intracellular',
    options: [
      o('Doxycycline / azithromycin', ABX, 'guideline'),
      o('Sequential course if refractory', ABX, 'guideline'),
      o('Uva ursi / D-mannose for bladder symptoms', NON, 'contested'),
    ],
    burden: { from: 'moderate' },
    risk: 'Do not treat asymptomatic carriage (commensal in 40-80% of adults). Rule out interstitial cystitis first.',
  },

  // ---------------------------------------------------------------- Reactivated viruses
  {
    ...base, id: 'herpesviruses', name: 'EBV / CMV / HHV-6', system: 'viral',
    options: [
      o('Valganciclovir / valacyclovir: severe end-organ disease, immunocompromised only', NON, 'guideline'),
      o('Antivirals for fatigue / serological reactivation', NON, 'contested'),
      o('Monolaurin, L-lysine, quercetin adjuncts', NON, 'contested'),
    ],
    burden: { from: 'none', note: 'antiviral' },
    risk: 'Antivirals are marrow and kidney toxic. Serology interpretation is debated.',
  },

  // ---------------------------------------------------------------- Immune / mast cell (hub)
  {
    ...base, id: 'mcas', name: 'MCAS', system: 'immune',
    options: [
      o('H1 + H2 antihistamines', NON, 'guideline'),
      o('Mast-cell stabilisers (cromolyn, ketotifen)', NON, 'guideline'),
      o('Vitamin C, quercetin, luteolin', NON, 'contested'),
      o('DAO', NON, 'contested'),
      o('Trigger avoidance', NON, 'guideline'),
    ],
    burden: { from: 'none' },
    risk: 'Stabilising here makes later antimicrobials tolerable. Thin evidence base (few RCTs). Medication fillers can trigger reactions (compounding helps).',
    flag: 'Foundational: stabilise first',
  },
  {
    ...base, id: 'histamine', name: 'Histamine intolerance', system: 'immune',
    options: [
      o('Low-histamine diet', NON, 'contested'),
      o('DAO enzyme', NON, 'contested'),
      o('Treat underlying gut', NON, 'contested'),
    ],
    burden: { from: 'none' },
    risk: 'Overlaps MCAS: same cluster.',
  },

  // ---------------------------------------------------------------- Endocrine
  {
    ...base, id: 'thyroid', name: 'Thyroid', system: 'endocrine',
    options: [
      o('Levothyroxine if hypothyroid', NON, 'guideline'),
      o('Adding T3', NON, 'contested'),
      o('Monitor antibodies and levels', NON, 'guideline'),
      o('Selenium (modest effect)', NON, 'contested'),
    ],
    burden: { from: 'none' },
    risk: 'Needs labs (TSH, free T4/T3, TPO/Tg antibodies). Very treatable once defined.',
  },

  // ---------------------------------------------------------------- Nervous system
  {
    ...base, id: 'neuroborreliosis', name: 'Neuroborreliosis', system: 'nervous', alsoIn: ['vector'],
    options: [
      o('Ceftriaxone IV', ABX, 'guideline'),
      o('Doxycycline, oral', ABX, 'guideline'),
    ],
    burden: { from: 'moderate', to: 'high', note: 'IV' },
    risk: 'Overlaps the Lyme row. Symptom-driven.',
  },
  {
    ...base, id: 'parkinsonism', name: 'Parkinsonism', system: 'nervous',
    options: [
      o('Distinguish Parkinson\'s disease vs secondary parkinsonism', NON, 'guideline'),
      o('Dopaminergic meds if indicated', NON, 'guideline'),
      o('Treat underlying driver', NON, 'guideline'),
    ],
    burden: { from: 'none' },
    risk: 'The PD-vs-secondary distinction changes everything. Needs neurology input.',
  },
  {
    ...base, id: 'pandas', name: 'Strep / PANDAS-PANS', system: 'nervous',
    options: [
      o('Treat acute strep (amoxicillin / cefdinir)', ABX, 'guideline'),
      o('IVIG or plasma exchange (moderate-severe)', NON, 'guideline'),
      o('NSAIDs', NON, 'guideline'),
      o('Antibiotic prophylaxis', ABX, 'contested'),
      o('Non-histamine probiotics', NON, 'contested'),
    ],
    burden: { from: 'moderate', to: 'high', note: 'high only under contested prophylaxis' },
    risk: 'PANDAS/PANS diagnosis itself is debated. Specialist territory.',
  },
];

export const systemOf = (id: SystemId) => systems.find(s => s.id === id)!;
export const infectionsIn = (id: SystemId) => infections.filter(i => i.system === id);
