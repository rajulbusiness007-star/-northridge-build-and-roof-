export interface ProjectItem {
  id: string;
  title: string;
  category: 'residential' | 'commercial';
  material: 'Architectural Shingle' | 'Standing Seam Metal' | 'Commercial TPO' | 'Designer Tile';
  location: string;
  scopeSummary: string;
  durationDays: number;
  squareFootage: number;
  completionYear: number;
  beforeDescription: string;
  afterDescription: string;
  image: string;
  beforeImagePlaceholder?: string;
  keyFeatures: string[];
}

export const showcaseProjects: ProjectItem[] = [
  {
    id: 'proj-gables-luxury',
    title: 'The Highland Park Residential Estate',
    category: 'residential',
    material: 'Architectural Shingle',
    location: 'Highland Park, Dallas, TX',
    scopeSummary: 'Complete tear-off of 22-year-old hail-damaged shingles, structural decking replacement, copper valley flashings, and high-definition architectural shingles.',
    durationDays: 2,
    squareFootage: 4800,
    completionYear: 2026,
    beforeDescription: 'Severely bruised 3-tab asphalt shingles with extensive granule loss, active chimney cricket leaks, and dry-rotted plywood decking under master suite.',
    afterDescription: 'Class 4 impact-resistant architectural shingles in Charcoal Slate, custom 16-oz hand-soldered copper valleys, full ice & water shield, and continuous ridge ventilation.',
    image: '/src/assets/images/metal_roof_farmhouse.jpg',
    keyFeatures: [
      'Class 4 Impact Resistant (SBS Modified)',
      '16-oz Hand-Crafted Copper Valleys',
      '50-Year Non-Prorated Manufacturer Warranty',
      'Solar Reflective Granule Technology'
    ]
  },
  {
    id: 'proj-standing-seam-modern',
    title: 'Southlake Contemporary Standing Seam Metal',
    category: 'residential',
    material: 'Standing Seam Metal',
    location: 'Southlake, TX',
    scopeSummary: 'Architectural upgrade to 24-gauge standing seam Galvalume panels with concealed clip fasteners and integrated snow & water protection.',
    durationDays: 4,
    squareFootage: 3600,
    completionYear: 2026,
    beforeDescription: 'Warped wood shakes failing fire safety compliance with recurring water leaks around skylights and rusted valley metal.',
    afterDescription: 'Precision 16-inch wide standing seam steel with Kynar 500 Matte Charcoal finish, high-temperature underlayment, and zero exposed fastener penetrations.',
    image: '/src/assets/images/deck_construction.jpg',
    keyFeatures: [
      'Concealed Clip Expansion System',
      'Class A Fire Rating & 140 mph Wind Rating',
      'Zero Fastener Penetrations in Water Channel',
      '30-Year Paint Finish Guarantee'
    ]
  },
  {
    id: 'proj-commercial-corporate',
    title: 'Legacy Business Park Commercial Headquarters',
    category: 'commercial',
    material: 'Commercial TPO',
    location: 'Plano, TX',
    scopeSummary: 'Turnkey 42,000 sq ft single-ply TPO roof restoration with tapered polyiso insulation to eliminate chronic ponding water over corporate server rooms.',
    durationDays: 9,
    squareFootage: 42000,
    completionYear: 2026,
    beforeDescription: 'Failing 18-year-old built-up asphalt roof with ponding water up to 3 inches deep, blistered seams, and moisture-saturated perlite insulation.',
    afterDescription: 'Energy Star certified 60-mil white reflective TPO membrane, robotic hot-air welded seams, 4-way tapered insulation drainage saddles, and 25-Year NDL warranty.',
    image: '/src/assets/images/project_cabin.jpg',
    keyFeatures: [
      '60-mil White High-Reflectance TPO',
      'Precision Tapered Drainage Crickets',
      '25-Year No Dollar Limit (NDL) Warranty',
      'Completed with Zero Interruption to Business'
    ]
  },
  {
    id: 'proj-certified-restoration',
    title: 'Frisco Master-Planned Residence Storm Restoration',
    category: 'residential',
    material: 'Architectural Shingle',
    location: 'Frisco, TX',
    scopeSummary: 'Certified post-hailstorm restoration covering roof, seamless gutters, ridge cap ventilation, and lead pipe collars with full insurance settlement approval.',
    durationDays: 2,
    squareFootage: 3200,
    completionYear: 2026,
    beforeDescription: 'Golf-ball size hail damage with 34 impacts per 100 sq ft test square, punctured roof vents, and dented gutters causing siding wash-out.',
    afterDescription: 'Complete installation of designer architectural shingles, heavy-duty 6-inch seamless aluminum gutters, and hail-resistant low-profile box vents.',
    image: '/src/assets/images/project_pavers.jpg',
    keyFeatures: [
      'Insurance Claim Settled at 100% Replacement Cost',
      '6" Custom Seamless Gutter Drainage',
      'High-Flow Ridge Ventilation System',
      '10-Year Workmanship Guarantee'
    ]
  }
];
