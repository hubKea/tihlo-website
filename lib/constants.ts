// All site copy lives here. Edit strings here, not in components.

export const BRAND = {
  name: 'TIHLO',
  slogan: 'The eye that never misses.',
  tagline: 'Active monitoring · 24 / 7 · across Mpumalanga, Limpopo & Northern Cape',
  address: 'Mind Space Unit 301, 1122 Burnett St, Pretoria 0083',
  phone: '010 012 6094',
  email: 'info@tihlo.co.za',
  registration: 'Registration number pending',
} as const;

export const HERO = {
  eyebrow: 'Active monitoring · 24 / 7 · Mpumalanga · Limpopo · Northern Cape',
  headline: ['Movement,', 'monitored.'],
  accentWord: 'monitored.',
  lede: "TIHLO operates the active monitoring layer for mining fleets, yellow plant and weighbridges. We watch what your operation does, catch what shouldn't happen, and log the consequence — every shift, in writing.",
  cta_primary: 'Request a briefing',
  cta_secondary: 'How we operate',
} as const;

export const STATS = [
  { value: 18, prefix: 'up to ', suffix: '%', label: 'Diesel reclaimed · first 90 days' },
  { value: 38, suffix: 's', label: 'Median controller response' },
  { value: 3047, label: 'Loads under monitoring · last 24h' },
] as const;

export const UTIL_BAR = {
  left: {
    status: 'SYSTEM ON',
    corridors: 'ALL CORRIDORS NOMINAL',
    location: 'PRETORIA',
  },
  right: {
    loadsLabel: 'LOADS / 24H',
    provinces: 'MPUMALANGA · LIMPOPO · NORTHERN CAPE',
  },
} as const;

export const NAV_LINKS = [
  { label: 'Approach', href: '/how-we-operate' },
  { label: 'Services', href: '/services' },
  { label: 'Sectors', href: '/sectors' },
  { label: 'Field Notes', href: '/field-notes' },
  { label: 'Firm', href: '/about' },
] as const;

export const ACTS = [
  {
    index: '§ 01',
    label: 'Fuel & Diesel Security',
    headline: ['Diesel theft is not', 'a transport problem.'],
    accentWord: 'not',
    body: [
      "Fuel variance is the single most common source of unrecorded commodity loss in mining logistics. TIHLO's monitoring layer tracks consumption per machine, per shift, per operator — comparing actuals against learned baselines. Anomalies are flagged in real time, not discovered in month-end reports.",
      'Controllers intervene immediately. The alert has a name attached to it, and so does the response. When a fuel spike is a theft pattern, the evidence is already logged before the next shift begins.',
    ],
    stats: [
      { value: 18, suffix: '%', label: 'Typical diesel reclaimed' },
      { value: 38, suffix: 's', label: 'Median response to fuel alert' },
    ],
    image: {
      src: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?auto=format&fit=crop&w=1600&q=85',
      alt: 'Mining equipment fuel system',
    },
    flip: false,
  },
  {
    index: '§ 02',
    label: 'Asset Oversight',
    headline: ['The machine records', 'what the operator reports.'],
    accentWord: 'records',
    body: [
      'Excavators, ADTs, and dozers generate continuous telemetry — but raw telematics is not intelligence. TIHLO processes that data against operational context: site conditions, shift patterns, weather events, contractor commitments. The output is an objective record of what each asset actually did.',
      'Idling analysis, utilisation rates, on-site versus off-site time, harsh operating events — each is logged, attributed, and included in the monthly evidence pack. Contractors are held accountable to the data, not to a conversation.',
    ],
    stats: [
      { value: 100, suffix: '%', label: 'Asset utilisation visibility' },
      { value: 24, suffix: '/7', label: 'Continuous machine monitoring' },
    ],
    image: {
      src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1600&q=85',
      alt: 'Excavator on mining site',
    },
    flip: true,
  },
  {
    index: '§ 03',
    label: 'Contractor Accountability',
    headline: ['Accountability needs', 'evidence, not opinion.'],
    accentWord: 'evidence,',
    body: [
      'When a contractor underperforms, the default dispute is a conversation. TIHLO replaces that conversation with an evidence pack — timestamped, GPS-attributed, controller-signed. Every load, every deviation, every anomaly is logged and tied to a specific asset and haulier.',
      'Performance rankings are produced at month-end. Top performers are identifiable. Outliers are documented. Sanctions are applied per truck, not per conversation — creating accountability that survives personnel changes on both sides.',
    ],
    stats: [
      { value: 7, suffix: '-day', label: 'Auto-suspension on deviation' },
      { value: 100, suffix: '%', label: 'Audit-grade evidence coverage' },
    ],
    image: {
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=85',
      alt: 'Haul truck on mine road',
    },
    flip: false,
  },
] as const;

export const INTERSTITIAL = {
  quote:
    'Commodity loss is rarely a single event. It is a sequence of unverified handovers.',
  accentWord: 'unverified',
  attribution: 'TIHLO · Field Notes No. 04',
  image: {
    src: 'https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?auto=format&fit=crop&w=2400&q=85',
    alt: 'Open pit mine at dusk',
  },
} as const;

export const SECTORS = [
  { label: 'Coal', description: 'Transport & stockpile monitoring across Mpumalanga corridors.' },
  { label: 'Chrome', description: 'Weighbridge integration and load verification in Limpopo.' },
  { label: 'Manganese', description: 'Northern Cape long-haul route integrity and diesel security.' },
  { label: 'Iron Ore', description: 'Yellow plant oversight and contractor accountability.' },
  { label: 'Copper', description: 'Cross-provincial logistics monitoring and deviation control.' },
  { label: 'Agri-bulk', description: 'Seasonal fleet monitoring with dynamic route enforcement.' },
] as const;

export const FIELD_NOTES_PREVIEW = [
  {
    index: 'No. 01',
    date: 'March 2026',
    headline: 'The destination bottleneck',
    subtitle: 'How downstream congestion masquerades as transport failure',
    href: '/field-notes/the-destination-bottleneck',
  },
  {
    index: 'No. 02',
    date: 'February 2026',
    headline: 'Closing the weighbridge handshake gap',
    subtitle: 'Why a truck should never load without a 3-point verification',
    href: '/field-notes/closing-the-weighbridge-handshake-gap',
  },
  {
    index: 'No. 03',
    date: 'January 2026',
    headline: "What 'control room' should mean in 2026",
    subtitle: 'Active monitoring is not a screen wall. It\'s a decision trail with a human\'s name on it.',
    href: '/field-notes/what-control-room-should-mean',
  },
] as const;

export const FINAL_CTA = {
  eyebrow: '§ The eye that never misses',
  headline: ['Movement,', 'on the record.'],
  body: 'Engagements begin with a 30-minute briefing. We hear your current process, identify the highest-risk control gaps, and tell you whether TIHLO is the right partner for your operation.',
  cta_primary: 'Request a briefing',
  cta_secondary: 'Read field notes',
} as const;

export const HOW_WE_OPERATE = {
  eyebrow: '§ Methodology',
  headline: 'How we operate.',
  lede: 'TIHLO operates a six-stage methodology across every commodity movement we monitor. The same procedure runs in Mpumalanga as in Limpopo, on yellow plant as on transport, by day as by night. This is what each stage does, and how the evidence accrues.',
  stages: [
    {
      index: '§ 01',
      name: 'Onboard.',
      tagline: 'No asset moves without formal clearance.',
      body: [
        'Every vehicle, operator, and telematics feed is formally registered before receiving clearance. Hauliers submit a complete fleet list for review. Legal documentation — NDA and Tracking Data Consent — is signed. The telematics feed is technically integrated into the TIHLO monitoring layer and validated for accuracy.',
        'Only once all three layers are confirmed does an asset receive Free to Load status. This status is communicated directly to the weighbridge. No truck loads without it.',
      ],
      anomalies: [
        'Unregistered vehicle presenting at gate',
        'Telematics feed inactive or spoofed',
        'Documentation unsigned or expired',
        'Fleet list discrepancy between haulier and weighbridge record',
      ],
    },
    {
      index: '§ 02',
      name: 'Verify.',
      tagline: 'Three points must align before the gate opens.',
      body: [
        'Before any load is authorised, controllers independently confirm the fleet list, verify that the tracker is live and accurate, and authorise both the load and the allocated route. These three confirmations happen in sequence, with each logged under a controller name.',
        'This is not a checkbox. It is a 3-point verification that creates a named human decision trail at the moment of highest risk — the point where a commodity changes hands.',
      ],
      anomalies: [
        'Tracker offline or showing incorrect location',
        'Vehicle not matching registered fleet list entry',
        'Authorisation attempted outside designated window',
        'Route allocation discrepancy',
      ],
    },
    {
      index: '§ 03',
      name: 'Move.',
      tagline: 'Route integrity monitored continuously from load to offload.',
      body: [
        'From the moment a vehicle leaves the gate, geofenced route compliance is active. The allocated route is enforced automatically — any deviation from the authorised corridor triggers an immediate alert. Controllers review, escalate, and document every exception.',
        'Signal health, speed compliance, stop authorisation, and load integrity are all monitored in parallel. There is no gap between events on the ground and awareness in the control room.',
      ],
      anomalies: [
        'Route deviation beyond geofence boundary',
        'Unauthorised stop exceeding time threshold',
        'Speed threshold breach in sensitive zone',
        'Signal loss exceeding established baseline',
      ],
    },
    {
      index: '§ 04',
      name: 'Detect.',
      tagline: 'Variance is classified, not just flagged.',
      body: [
        'Anomalies are assessed against learned baselines — typical idle patterns for each machine class, historical fuel consumption per corridor, average transit times per route. A deviation that reads as exceptional in isolation may be normal for a specific site condition. Controllers know the difference.',
        'Classification matters: a variance is either an anomaly, an exception, or an established pattern. Each is logged differently, escalated differently, and reported differently. Flagging without classification is not intelligence — it is noise.',
      ],
      anomalies: [
        'Fuel consumption spike exceeding baseline ± 15%',
        'Idling duration abnormal for machine class and site',
        'Load weight discrepancy against weighbridge ticket',
        'Off-site activity during operational hours',
      ],
    },
    {
      index: '§ 05',
      name: 'Resolve.',
      tagline: 'Exceptions are adjudicated by a named controller.',
      body: [
        'Every exception produces a decision — and that decision is signed. First offence: written warning, logged and attributed. Subsequent offences: seven-day suspension. Sanctions are applied per truck, not per driver, ensuring that accountability follows the asset regardless of who is behind the wheel.',
        'Unauthorised route deviation is the highest severity classification. It triggers an automatic seven-day suspension with no first warning. There is no conversation that overrides this. A formal motivational letter from the haulier — outlining preventative measures — is required before any suspension is lifted.',
      ],
      anomalies: [
        'Sanction escalation without formal documentation',
        'Reinstatement without signed preventative measures letter',
        'Controller override without supervisory sign-off',
        'Pattern of first-offence warnings from the same asset',
      ],
    },
    {
      index: '§ 06',
      name: 'Prove.',
      tagline: 'Month-end evidence pack. Audit-grade. Dispute-defensible.',
      body: [
        'At month-end, every client receives a structured evidence pack. It contains total loads by haulier, tonnage by route, exception log with controller attributions, sanctions issued and resolved, fuel anomalies by machine, and a haulier performance ranking.',
        'These documents are produced at audit grade — they are admissible as evidence in formal dispute processes, usable by legal counsel, and structured for insurance purposes. We do not produce spreadsheets. We produce the record.',
      ],
      anomalies: [
        'Unsigned evidence pack issued to client',
        'Discrepancy between event log and sanction record',
        'Missing controller attribution on any exception',
        'Evidence pack issued without supervisory review',
      ],
    },
  ],
  principles: [
    'Sanctions land on the asset, not the conversation.',
    'Decisions are named. Controllers sign their work.',
    'Every load has a record. Every record has a controller.',
  ],
} as const;

export const ABOUT = {
  headline: 'We are TIHLO.',
  lede: 'An independent specialist firm operating active monitoring and verification for mining commodity movement across South Africa. We are quiet about who we work with. We are loud about what we will not tolerate on a corridor.',
  firm: [
    'TIHLO is independent — by design, not by description. We are not a subsidiary of a logistics provider, a reseller of telematics hardware, or a spin-off of a fleet management platform. We have no commercial relationship with any system we monitor. That is the precondition for the work.',
    'The firm was built to close a single gap: the distance between what fleet systems report and what is actually happening on the ground. Commodity loss lives in that gap. So does dispute, so does insurance exposure, so does counsel risk. We close it — every shift, every corridor, every record signed by a named controller.',
  ],
  principles: [
    {
      statement: 'We sit above the systems, not in place of them.',
      body: 'TIHLO integrates with existing fleet management and telematics infrastructure. We do not require replacement. We add the verification and intervention layer that existing systems cannot provide.',
    },
    {
      statement: 'We adjudicate exceptions, not just alert on them.',
      body: 'An alert without a named decision is noise. Every exception TIHLO raises is reviewed, classified, and resolved by a controller — with their name attached to the outcome.',
    },
    {
      statement: 'We sanction the asset, not the conversation.',
      body: 'Accountability that depends on a phone call does not hold. TIHLO sanctions attach to the truck — not the driver, not the haulier contact. The record follows the asset.',
    },
    {
      statement: 'We produce evidence, not opinion.',
      body: 'Month-end reporting is audit-grade: timestamped, GPS-attributed, controller-signed. Every document is structured to be defensible before auditors, insurers, and counsel.',
    },
  ],
  map: {
    headline: 'Where we operate.',
    body: 'Active monitoring corridors across Mpumalanga, Limpopo, and the Northern Cape. Headquarters in Pretoria.',
  },
  governance: {
    headline: 'Governance.',
    popia: 'POPIA contact: legal@tihlo.co.za',
    confidentiality:
      'TIHLO does not disclose client identities, site details, or operational data. All engagements are conducted under NDA as a condition of onboarding.',
    insurance: 'Professional indemnity insurance details available on request.',
  },
} as const;

export const CONTACT = {
  headline: 'Initiate.',
  sub: 'Engagements begin with a 30-minute briefing. Tell us about your operation; we will respond within one business day.',
  tiers: [
    {
      index: '§ 01',
      name: '30-minute briefing.',
      body: 'A scoped conversation. We hear your current process, identify likely control gaps, and assess whether TIHLO is the right partner. No fee.',
    },
    {
      index: '§ 02',
      name: 'Risk assessment.',
      body: 'A two-week formal review of one corridor or operation. Findings delivered as a structured evidence pack.',
    },
    {
      index: '§ 03',
      name: 'Pilot corridor.',
      body: 'A 90-day live operation. Scope, KPIs and exit conditions agreed in advance in writing.',
    },
  ],
  faq: [
    {
      q: 'What sectors do you operate in?',
      a: 'Primarily coal, chrome, manganese, iron ore, and copper across Mpumalanga, Limpopo, and the Northern Cape. We have operated in agri-bulk and fuel logistics contexts as well.',
    },
    {
      q: 'Do you replace our existing fleet management system?',
      a: 'No. TIHLO integrates above existing telematics and fleet management infrastructure. We add the verification and intervention layer — we do not require hardware replacement or system migration.',
    },
    {
      q: 'How quickly can you onboard a corridor?',
      a: 'A standard corridor onboarding takes 7–14 working days from signed NDA to first load under monitoring. Complex multi-site operations are scoped individually.',
    },
    {
      q: 'What evidence do you produce?',
      a: 'Monthly evidence packs at audit grade: load logs, exception reports, controller-signed sanction records, fuel anomaly reports, and haulier performance rankings. Structured for use by legal counsel, auditors, and insurers.',
    },
  ],
} as const;

export const SERVICES = [
  {
    index: '§ 01',
    name: 'Fuel & Diesel Security',
    headline: 'Every litre accounted for.',
    body: 'AI-driven monitoring of fuel consumption per machine, per operator, per shift. Anomalies are flagged in real time and reviewed by a named controller before the next shift begins.',
    features: [
      'Consumption baseline per machine class and site',
      'Real-time anomaly detection with controller review',
      'Refuelling event logging and cross-reference',
      'Monthly fuel anomaly report with controller attribution',
    ],
  },
  {
    index: '§ 02',
    name: 'Transport Monitoring',
    headline: 'Route integrity from gate to gate.',
    body: '24/7 active monitoring of every truck in the fleet. Geofenced route enforcement, 3-point load verification, and automated sanction protocols that follow the asset.',
    features: [
      '3-point load verification before gate clearance',
      'Geofenced route allocation and deviation detection',
      'Automated sanction protocol (7-day suspension on deviation)',
      'Weighbridge integration for load-to-ticket reconciliation',
    ],
  },
  {
    index: '§ 03',
    name: 'Yellow Plant Oversight',
    headline: 'The machine records what the operator reports.',
    body: 'Utilisation monitoring for excavators, ADTs, and dozers. Idle analysis, on-site vs off-site time, harsh operating events — all attributed to specific assets and included in the monthly evidence pack.',
    features: [
      'Machine utilisation and idle analysis',
      'On-site versus off-site time logging',
      'Harsh operation event detection and attribution',
      'Contractor performance benchmarking',
    ],
  },
] as const;
