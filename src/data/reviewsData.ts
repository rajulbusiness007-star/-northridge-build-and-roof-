export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  service: string;
  serviceCategory: 'residential' | 'commercial' | 'emergency' | 'metal' | 'inspection';
  rating: number;
  date: string;
  headline: string;
  content: string;
  verified: boolean;
  platform: 'Google Reviews' | 'GAF Master Elite' | 'BBB Verified' | 'HomeAdvisor';
  projectSpecs?: string;
  helpfulCount: number;
  recommended: boolean;
}

export const reviewsSummary = {
  averageRating: 4.9,
  totalReviews: 148,
  recommendationPercentage: 99,
  breakdown: [
    { stars: 5, percentage: 94, count: 139 },
    { stars: 4, percentage: 5, count: 7 },
    { stars: 3, percentage: 1, count: 2 },
    { stars: 2, percentage: 0, count: 0 },
    { stars: 1, percentage: 0, count: 0 },
  ],
  verifiedPlatforms: [
    { name: 'Google Reviews', rating: 4.9, count: 96, icon: 'google' },
    { name: 'GAF Master Elite®', rating: 5.0, count: 32, icon: 'shield' },
    { name: 'BBB A+ Accredited', rating: 4.9, count: 20, icon: 'award' }
  ]
};

export const verifiedReviewsData: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Marcus Vance',
    location: 'Frisco, TX',
    service: 'Class 4 Impact Shingle Replacement',
    serviceCategory: 'residential',
    rating: 5,
    date: 'October 12, 2026',
    headline: 'Flawless adjuster coordination and spotless yard cleanup',
    content: 'After the severe baseball-sized hailstorm swept through Stonebriar, three other roofers just gave quick ballpark numbers from their pickup trucks. Northridge brought out an inspector who walked every inch, took 42 high-res photos, and met my State Farm adjuster directly on the roof to ensure all collateral gutter and chimney flashing damage was covered. The crew completed the 3,800 sq ft tear-off and replacement in 1.5 days. They magnetically swept the lawn three separate times—I have two dogs and found zero stray nails.',
    verified: true,
    platform: 'Google Reviews',
    projectSpecs: 'GAF Timberline AS II Class 4 Shingles · 38 Squares',
    helpfulCount: 28,
    recommended: true
  },
  {
    id: 'rev-2',
    author: 'Elena & David Rostova',
    location: 'Plano, TX',
    service: 'Standing Seam Metal Roof Installation',
    serviceCategory: 'metal',
    rating: 5,
    date: 'September 28, 2026',
    headline: 'Architectural masterpiece—drastically reduced our summer AC bills',
    content: 'We wanted a permanent metal roof for our modern mid-century home remodel. Northridge\'s fabrication and installation crews are true artists. The concealed fastening clips, custom valley folds, and chimney counter-flashing are precision-engineered. Not a single exposed screw or wavy panel. Our electric utility bills dropped over $180 during peak August heat thanks to the radiant barrier underlayment.',
    verified: true,
    platform: 'GAF Master Elite',
    projectSpecs: '24-Gauge Charcoal Standing Seam · High-Temp Ice Barrier',
    helpfulCount: 19,
    recommended: true
  },
  {
    id: 'rev-3',
    author: 'Robert Sterling (Facility Director)',
    location: 'Dallas, TX',
    service: 'Commercial Flat TPO Membrane',
    serviceCategory: 'commercial',
    rating: 5,
    date: 'September 14, 2026',
    headline: '28,000 sq ft commercial facility completed with zero tenant downtime',
    content: 'We manage a multitenant medical and corporate office building in North Dallas that had recurring ponding issues. Northridge engineered a custom tapered polyiso slope system and hot-air welded a 60-mil Carlisle TPO membrane. The entire project was coordinated over an extended holiday weekend so our medical tenants experienced zero noise or parking disruption. Passed city inspections with zero citations.',
    verified: true,
    platform: 'Google Reviews',
    projectSpecs: 'Carlisle 60-mil White TPO · Tapered Polyiso Drainage System',
    helpfulCount: 34,
    recommended: true
  },
  {
    id: 'rev-4',
    author: 'Christine Holloway',
    location: 'Southlake, TX',
    service: '21-Point Pre-Purchase Drone Roof Audit',
    serviceCategory: 'inspection',
    rating: 5,
    date: 'August 30, 2026',
    headline: 'Saved us $9,400 in hidden seller credits before closing',
    content: 'During our home purchase option period, our general home inspector only looked at the roof from the ladder eaves. Northridge dispatched an inspector who flew 4K drone passes and conducted a physical crawl into the attic crawlspace. They identified dry rotted decking under the rear valley that had active moisture seepage. Their 18-page certified report allowed us to negotiate a full $9,400 credit at the closing table.',
    verified: true,
    platform: 'BBB Verified',
    projectSpecs: 'Comprehensive Drone 4K & Attic Moisture Thermal Scan',
    helpfulCount: 14,
    recommended: true
  },
  {
    id: 'rev-5',
    author: 'David Chen, P.E.',
    location: 'McKinney, TX',
    service: 'Emergency Storm Leak Repair & Tarping',
    serviceCategory: 'emergency',
    rating: 5,
    date: 'August 18, 2026',
    headline: 'Dispatched in 45 minutes during 60 mph midnight storm winds',
    content: 'A heavy oak branch broke through our master bedroom roof deck during severe squalls on a Thursday evening. Water was pouring into our ceiling drywall. Northridge\'s emergency dispatch responded within 45 minutes. They securely sandbagged and 2x4 reinforced heavy-duty 10-mil waterproof poly sheeting over the breach, completely protecting our hardwood floors and furniture until the storm passed.',
    verified: true,
    platform: 'Google Reviews',
    projectSpecs: 'Emergency Structural Tarping & Rafter Splinting',
    helpfulCount: 22,
    recommended: true
  },
  {
    id: 'rev-6',
    author: 'Sarah & Bradley Miller',
    location: 'Fort Worth, TX',
    service: 'Complete Residential Shingle Replacement',
    serviceCategory: 'residential',
    rating: 5,
    date: 'July 24, 2026',
    headline: 'GAF Golden Pledge 50-year warranty registered within 48 hours',
    content: 'Having dealt with shady fly-by-night storm chasers in past hail storms, working with Northridge was night and day. Every crew member wore branded uniforms and safety harnesses. Project manager Travis was on-site all day sending WhatsApp photo updates of the bare plywood decking before underlayment went down. Our 50-year non-prorated GAF warranty certificate arrived in our inbox two days later.',
    verified: true,
    platform: 'GAF Master Elite',
    projectSpecs: 'GAF Timberline HDZ Weathered Wood · Cobra Ridge Vents',
    helpfulCount: 17,
    recommended: true
  },
  {
    id: 'rev-7',
    author: 'Anthony Morales',
    location: 'Arlington, TX',
    service: 'Seamless Aluminum Gutters & Leaf Guards',
    serviceCategory: 'residential',
    rating: 5,
    date: 'July 9, 2026',
    headline: 'Custom 6-inch seamless gutters handle Texas downpours with ease',
    content: 'Our original builder 5-inch gutters were constantly overflowing and eroding the foundation plantings. Northridge custom roll-formed 6-inch seamless aluminum gutters on-site with oversized 3x4 downspouts and micro-mesh leaf filters. Even in 3-inch-per-hour torrential summer rains, the water flows smoothly away from the slab.',
    verified: true,
    platform: 'Google Reviews',
    projectSpecs: '240 Linear Feet 6" Seamless K-Style · Bronze Aluminum',
    helpfulCount: 11,
    recommended: true
  },
  {
    id: 'rev-8',
    author: 'Patricia Gallagher',
    location: 'Grapevine, TX',
    service: 'Hail Damage Roof Assessment & Claim Help',
    serviceCategory: 'residential',
    rating: 5,
    date: 'June 19, 2026',
    headline: 'Zero out-of-pocket stress—handled everything with the insurance company',
    content: 'As a senior living alone, handling a complex roof claim felt overwhelming. The Northridge team treated me like family. They prepared an itemized Haag engineering report, answered all questions, and guided me through each step with my insurer. The new roof looks gorgeous and gives me complete peace of mind.',
    verified: true,
    platform: 'BBB Verified',
    projectSpecs: 'CertainTeed Landmark Architectural Shingles · Moire Black',
    helpfulCount: 25,
    recommended: true
  },
  {
    id: 'rev-9',
    author: 'Kenneth & Lisa Wright',
    location: 'Denton, TX',
    service: 'Attic Ventilation & Solar Fan Installation',
    serviceCategory: 'residential',
    rating: 4,
    date: 'June 2, 2026',
    headline: 'Attic temperature dropped 22 degrees in mid-summer',
    content: 'Our second floor bedrooms used to be unbearable in July. Northridge installed dual solar-powered attic exhaust fans and cut continuous soffit intake vents. The attic dropped from 148°F down to 126°F during the hottest part of the day. Only minor delay was a one-day weather reschedule due to high wind warnings.',
    verified: true,
    platform: 'Google Reviews',
    projectSpecs: 'Dual 30W Solar Attic Fans · Continuous Soffit Intakes',
    helpfulCount: 8,
    recommended: true
  }
];
