export interface ServiceSeoMeta {
  metaTitle: string;
  metaDescription: string;
  canonicalSlug: string;
  schemaServiceType: string;
  keywords: string[];
  serviceAudience: string;
}

export interface RoofingService {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'specialty' | 'emergency';
  tagline: string;
  description: string;
  highlights: string[];
  processSteps: { title: string; desc: string }[];
  materialsSupported: string[];
  warrantyInfo: string;
  turnaroundTime: string;
  faqs: { q: string; a: string }[];
  seo: ServiceSeoMeta;
}

export const roofingServices: RoofingService[] = [
  {
    id: 'roof-replacement',
    title: 'Complete Roof Replacement',
    category: 'residential',
    tagline: 'Engineered tear-off and replacement built to withstand 130 mph winds and hail.',
    description: 'When an aging roof reaches the end of its useful lifespan, a complete replacement provides unmatched security, energy efficiency, and curb appeal. We strip your old roof down to the bare wooden decking, replace rotted boards, install high-performance synthetic underlayment, and lay premium architectural roofing backed by 50-year manufacturer warranties.',
    highlights: [
      'Complete tear-off of old asphalt layers down to structural decking',
      'Plywood decking inspection & complimentary 2 sheets replacement included',
      'Ice & Water Shield installed on all eaves, valleys, and rakes',
      'Continuous ridge ventilation system for balanced attic airflow'
    ],
    processSteps: [
      { title: 'Site Protection & Tear-Off', desc: 'Plywood shields protect your landscaping and windows as old shingles are removed.' },
      { title: 'Decking Structural Audit', desc: 'Every square foot of wooden decking is inspected; rotted or sagging sheets are replaced.' },
      { title: 'Underlayment & Drip Edge', desc: 'Class A synthetic barrier and heavy-duty 26-gauge drip edge prevent water back-flow.' },
      { title: 'Architectural Shingle Install', desc: 'Hand-installed using corrosion-resistant ring-shank nails to manufacturer specifications.' },
      { title: 'Magnetic Sweeping & Final Audit', desc: 'Triple magnetic sweep of your lawn, driveway, and flowerbeds to eliminate stray nails.' }
    ],
    materialsSupported: ['GAF Timberline HDZ', 'CertainTeed Landmark', 'Owens Corning TruDefinition', 'Standing Seam Metal'],
    warrantyInfo: 'Lifetime Manufacturer Warranty + 10-Year Transferable Workmanship Guarantee',
    turnaroundTime: '1 to 2 days for standard single-family homes',
    faqs: [
      {
        q: 'How long does a full roof replacement take in Dallas-Fort Worth?',
        a: 'Most single-family residential replacements (2,000–3,500 sq ft) are completed in 1 to 2 days, weather permitting.'
      },
      {
        q: 'Do you haul away old debris and clean up nails?',
        a: 'Yes, we provide our own mobile debris trailers and conduct magnetic sweeps across your entire property to ensure zero leftover nails.'
      }
    ],
    seo: {
      metaTitle: 'Roof Replacement Dallas TX | 50-Yr Warranty | Apex Crest',
      metaDescription: 'Certified residential and commercial roof replacement in Dallas-Fort Worth. Full tear-off, synthetic barriers, Class 4 shingles, and 10-year workmanship guarantee.',
      canonicalSlug: 'roof-replacement',
      schemaServiceType: 'RoofReplacement',
      keywords: ['roof replacement dallas', 'new roof installation dallas', 'residential reroofing tx', 'architectural shingle replacement'],
      serviceAudience: 'Residential Homeowners & Property Investors'
    }
  },
  {
    id: 'roof-repair',
    title: 'Precision Roof Repair',
    category: 'residential',
    tagline: 'Pinpoint leak detection and permanent structural repairs before moisture destroys your home.',
    description: 'A small roof leak can saturate insulation, cause toxic black mold, and rot structural roof decking within days. Our licensed technicians perform thermal leak tracing, inspect chimney and wall flashing, replace degraded pipe boots, and repair cracked shingles with exact color-matched materials.',
    highlights: [
      'Thermal camera moisture tracing to locate invisible entry points',
      'Full replacement of compromised synthetic underlayment & decking',
      'Custom lead or aluminum pipe jack boot re-flashing',
      '100% leak-free warranty on all repaired roof penetrations'
    ],
    processSteps: [
      { title: 'Thermal & Physical Inspection', desc: 'We inspect the roof exterior and attic substrate to track moisture paths.' },
      { title: 'Source Isolation', desc: 'Damaged shingles, rusted flashing, and rotted plywood are removed clean.' },
      { title: 'Waterproof Membrane Application', desc: 'Self-adhering ice & water shield is applied around all vulnerable joints.' },
      { title: 'Matching Shingle Interlock', desc: 'Precision color-matched shingles are re-nailed using code-compliant 6-nail pattern.' }
    ],
    materialsSupported: ['Architectural Shingles', 'Standing Seam Metal', 'Modified Bitumen', 'Clay Tile'],
    warrantyInfo: '2-Year Workmanship Warranty on all point-repairs',
    turnaroundTime: 'Same-day to 48 hours for standard residential repairs',
    faqs: [
      {
        q: 'How do I know if my roof can be repaired versus replaced?',
        a: 'If damage is isolated to under 20% of your total roof surface and your shingles have not lost their protective mineral granules, a targeted repair is often the most cost-effective solution.'
      },
      {
        q: 'Do you offer emergency leak tarping?',
        a: 'Yes, our emergency response crew provides heavy-duty 24/7 tarping to prevent water intrusion until permanent weather-safe repairs are executed.'
      }
    ],
    seo: {
      metaTitle: 'Roof Repair Dallas TX | Emergency Leak Fix | Apex Crest',
      metaDescription: 'Fast, certified roof leak repairs and flashing fixes across Dallas-Fort Worth. Thermal moisture detection, pipe boot resealing, and 2-year leak-free warranty.',
      canonicalSlug: 'roof-repair',
      schemaServiceType: 'RoofRepair',
      keywords: ['roof repair dallas', 'roof leak repair tx', 'chimney flashing repair', 'pipe boot repair dallas'],
      serviceAudience: 'Homeowners with active leaks, flashing rot, or storm punctures'
    }
  },
  {
    id: 'new-roof-installation',
    title: 'New Roof Installation',
    category: 'residential',
    tagline: 'Custom engineered roof construction for custom home builders and structural additions.',
    description: 'Constructing a new luxury home or structural addition demands uncompromising architectural precision. We engineer complete new roof truss assemblies, synthetic waterproof membranes, and designer roofing systems configured to exceed IRC 2024 building codes with high-flow balanced attic ventilation.',
    highlights: [
      'Direct coordination with general contractors, architects, and structural engineers',
      'Custom fabricated copper or pre-painted 24-gauge Galvalume metal flashings',
      'Engineered intake soffit and continuous mechanical ridge cap airflow systems',
      'Full factory-certified manufacturer non-prorated system warranty registration'
    ],
    processSteps: [
      { title: 'Blueprint & Rafter Audit', desc: 'Reviewing slope specifications, dead loads, and ventilation calculations.' },
      { title: 'Solid Decking & Vapor Barrier', desc: 'Installing 5/8" CDX plywood and high-temperature synthetic underlayment.' },
      { title: 'Architectural System Layup', desc: 'Precision hand-nailing of premium shingles, slate, or standing seam panels.' },
      { title: 'Code Compliance Certification', desc: 'Final walkthrough with local municipal inspector and owner delivery.' }
    ],
    materialsSupported: ['Architectural Shingles', 'Standing Seam Metal', 'Composite Slate', 'Concrete Tile'],
    warrantyInfo: '50-Year Non-Prorated Manufacturer Warranty + 10-Year Workmanship Guarantee',
    turnaroundTime: '2 to 5 days depending on square footage and roof complexity',
    faqs: [
      {
        q: 'Do you work directly with custom home builders and architects?',
        a: 'Yes, our commercial and residential estimating engineers coordinate directly from CAD plans to ensure all code, drainage, and ventilation requirements are met.'
      }
    ],
    seo: {
      metaTitle: 'New Roof Installation Dallas TX | Custom Home Roofing',
      metaDescription: 'Engineered new construction roof installations in Dallas-Fort Worth. Architectural shingles, standing seam metal, and composite slate with 50-year warranty.',
      canonicalSlug: 'new-roof-installation',
      schemaServiceType: 'RoofInstallation',
      keywords: ['new roof installation dallas', 'new construction roofing tx', 'architectural roofing contractors', 'custom home roof installation'],
      serviceAudience: 'Custom Home Builders, Architects & Property Developers'
    }
  },
  {
    id: 'roof-inspections',
    title: 'Certified 21-Point Roof Inspections',
    category: 'specialty',
    tagline: 'Comprehensive physical, attic, and 4K aerial diagnostics with photographic proof.',
    description: 'Whether you are preparing for real estate closing, evaluating post-storm insurance eligibility, or checking annual preventative maintenance, our 21-point certified roof inspection provides an unbiased, highly detailed condition report with clear photo documentation and repair estimates.',
    highlights: [
      'High-resolution 4K drone photography for steep and multi-story roofs',
      'Interior attic crawl to inspect rafter integrity, moisture, and ventilation',
      'Flashing, valley, pipe collar, and chimney cricket assessment',
      'Detailed PDF report accepted by all major insurance carriers'
    ],
    processSteps: [
      { title: 'Ground & Perimeter Survey', desc: 'Inspecting gutter lines, fascia boards, and downspout drainage patterns.' },
      { title: 'Roof Decking & Shingle Walk', desc: 'Checking for granule loss, thermal cracking, nail pops, and mechanical damage.' },
      { title: 'Attic Substrate Inspection', desc: 'Assessing plywood condition, intake airflow, baffles, and moisture signs.' },
      { title: 'Written Report Delivery', desc: 'Itemized findings, estimated remaining lifespan, and prioritized recommendations.' }
    ],
    materialsSupported: ['All Residential & Commercial Roof Assemblies'],
    warrantyInfo: 'Certified Inspection Certificate valid for real estate & insurance',
    turnaroundTime: 'Report delivered within 24 hours of inspection',
    faqs: [
      {
        q: 'Is there a cost for a roof inspection in Dallas?',
        a: 'We provide complimentary 21-point inspections for homeowners within our 45-mile service radius requesting replacement quotes or storm evaluations.'
      },
      {
        q: 'Will your inspection report help with my insurance claim?',
        a: 'Yes. Our inspectors document damage according to HAAG-certified forensic standards that insurance adjusters require.'
      }
    ],
    seo: {
      metaTitle: 'Roof Inspection Dallas TX | 21-Point Drone Audit',
      metaDescription: 'Free certified 21-point physical, attic, and 4K drone roof inspection in Dallas-Fort Worth. Forensic insurance reports delivered within 24 hours.',
      canonicalSlug: 'roof-inspections',
      schemaServiceType: 'RoofInspection',
      keywords: ['roof inspection dallas', 'drone roof inspection tx', 'haag certified roof inspection', 'pre-purchase roof audit'],
      serviceAudience: 'Homebuyers, Sellers, Real Estate Agents & Insured Homeowners'
    }
  },
  {
    id: 'storm-damage',
    title: 'Storm & Wind Damage Repairs',
    category: 'emergency',
    tagline: 'Rapid emergency response and certified storm damage mitigation for sudden weather events.',
    description: 'Severe straight-line winds, microbursts, and fallen tree limbs can tear off shingles and expose your building envelope to torrential rainfall. We arrive quickly with emergency tarping gear, stabilize the roof structure, and formulate a detailed repair plan to restore your home to pre-storm condition.',
    highlights: [
      '24/7 priority emergency dispatch during severe weather outbreaks',
      'Commercial-grade UV-resistant woven tarps secured with wood furring strips',
      'Direct assistance with storm insurance claim documentation',
      'Structural rafter and truss stabilization if impact occurred'
    ],
    processSteps: [
      { title: 'Emergency Tarping & Drying', desc: 'Immediate water containment to stop active ceiling leaks and drywall collapse.' },
      { title: 'Forensic Damage Audit', desc: 'Cataloging wind-lifted tabs, torn seal strips, and perimeter flashing damage.' },
      { title: 'Insurance Scope Preparation', desc: 'Preparing an itemized Xactimate-compatible scope of loss for your adjuster.' },
      { title: 'Permanent Storm Restoration', desc: 'Installing new storm-resistant shingles rated up to 130 mph wind resistance.' }
    ],
    materialsSupported: ['Class 4 Impact Resistant Shingles', 'Standing Seam Metal', 'Reinforced TPO'],
    warrantyInfo: 'Up to 130 mph wind warranty with Class 4 impact shingles',
    turnaroundTime: 'Immediate emergency tarping; 2–5 days for full storm restoration',
    faqs: [
      {
        q: 'What should I do immediately after a severe roof storm leak?',
        a: 'Place buckets under the drip, move furniture away, take clear photos of interior damage, and call our 24/7 emergency dispatch immediately. Never climb onto a wet roof yourself.'
      }
    ],
    seo: {
      metaTitle: 'Storm Damage Roof Repair Dallas TX | Wind & Tree Damage',
      metaDescription: 'Rapid response storm damage roof repair and emergency tarping across Dallas-Fort Worth. High wind restoration, insurance claim scoping, and 130 mph shingles.',
      canonicalSlug: 'storm-damage',
      schemaServiceType: 'StormDamageRestoration',
      keywords: ['storm damage roof repair dallas', 'wind damaged shingles tx', 'emergency roof tarping dallas', 'roof storm restoration'],
      serviceAudience: 'Property owners affected by high winds, fallen limbs, or torrential rain'
    }
  },
  {
    id: 'hail-damage',
    title: 'Hail Damage Assessment & Restoration',
    category: 'specialty',
    tagline: 'Certified detection of shingle bruising, fractured fiberglass mats, and granule loss.',
    description: 'Hail damage is often invisible from the ground. Hailstones as small as 1 inch can fracture the asphalt shingle mat, dislodge protective mineral granules, and expose the underlying bitumen to rapid ultraviolet degradation. Our certified technicians detect subtle hail bruising and document claims with macro photography.',
    highlights: [
      '10x10 foot test square methodology required by insurance carriers',
      'Assessment of soft metal vents, gutters, and AC condenser fins for hail collateral',
      'Class 4 Impact Shingle upgrades eligible for up to 30% homeowner insurance discounts',
      'Turnkey insurance claim management with your adjuster on site'
    ],
    processSteps: [
      { title: 'Test Square Marking', desc: 'Chalk-marking 100 sq ft quadrants to count discrete hail impacts per slope.' },
      { title: 'Collateral Damage Check', desc: 'Documenting dents on metal vents, gutters, window screens, and siding.' },
      { title: 'Adjuster Meeting On-Site', desc: 'Our licensed master contractor walks the roof alongside your insurance adjuster.' },
      { title: 'Re-Roof with Impact Shingles', desc: 'Installation of Class 4 impact shingles resistant to 2-inch steel ball drops.' }
    ],
    materialsSupported: ['Class 4 SBS-Modified Shingles', 'Standing Seam Steel', 'Stone-Coated Steel'],
    warrantyInfo: 'Lifetime Shingle Warranty + Class 4 Impact Hail Resistance Certification',
    turnaroundTime: '1 to 3 days depending on roof pitch and insurance approval',
    faqs: [
      {
        q: 'Why does hail damage matter if my roof is not leaking yet?',
        a: 'Hail knocks loose the UV-protective mineral granules. Without granules, sun exposure degrades the exposed asphalt in 6 to 12 months, leading to widespread cracking, leaks, and uninsurable damage.'
      }
    ],
    seo: {
      metaTitle: 'Hail Damage Roof Inspection Dallas TX | Insurance Claims',
      metaDescription: 'HAAG certified hail damage roof inspections in Dallas-Fort Worth. Test square impact audits, adjuster walkthrough representation, and Class 4 impact replacements.',
      canonicalSlug: 'hail-damage',
      schemaServiceType: 'HailDamageRestoration',
      keywords: ['hail damage roof inspection dallas', 'roof insurance claim hail tx', 'class 4 impact shingles dallas', 'hail bruised shingles'],
      serviceAudience: 'Homeowners in hail-impacted ZIP codes seeking insurance claim approval'
    }
  },
  {
    id: 'emergency-roof-repair',
    title: '24/7 Emergency Roof Tarping & Repair',
    category: 'emergency',
    tagline: 'Rapid 2-hour dispatch for severe leaks, active ceiling collapses, and storm damage.',
    description: 'When torrential storms strike in the middle of the night, water intrusion can ruin structural ceilings, floors, and electrical systems in hours. Our 24/7 emergency dispatch team arrives with commercial heavy-duty woven tarps, secured with wood battens, to seal your building envelope immediately.',
    highlights: [
      'Guaranteed 2-hour emergency dispatch during active severe weather',
      'Heavy-duty 12-mil UV resistant poly tarps secured to structural framing',
      'Zero nail penetration through undamaged shingle zones',
      'Complete emergency invoice recognized by insurance carriers for reimbursement'
    ],
    processSteps: [
      { title: 'Immediate Triage & Arrival', desc: 'Emergency crew deploys on site with protective water containment gear.' },
      { title: 'Safe Ground & Ridge Anchor', desc: 'Tarp secured from roof ridge over damaged slope with batten strips.' },
      { title: 'Moisture Barrier Seal', desc: 'Sealing perimeter edges to prevent driving rain from getting under the tarp.' },
      { title: 'Next-Day Permanent Scope', desc: 'Scheduling permanent restoration as soon as outdoor conditions clear.' }
    ],
    materialsSupported: ['Commercial UV-Treated Tarps', 'Furring Battens', 'Emergency Waterproof Sealants'],
    warrantyInfo: 'Emergency leak-free seal guaranteed until permanent repairs begin',
    turnaroundTime: 'Within 2 hours of emergency call',
    faqs: [
      {
        q: 'Does insurance cover the cost of emergency tarping?',
        a: 'Yes, emergency tarping is classified as "reasonable and necessary mitigation of loss" under standard homeowner and commercial property policies.'
      }
    ],
    seo: {
      metaTitle: '24/7 Emergency Roof Repair Dallas TX | 2-Hr Tarping',
      metaDescription: '24/7 emergency roof tarping and active leak dispatch in Dallas-Fort Worth. Stop interior water damage fast with professional batten-secured storm tarps.',
      canonicalSlug: 'emergency-roof-repair',
      schemaServiceType: 'EmergencyRoofRepair',
      keywords: ['emergency roof repair dallas', '24 hour roof tarping tx', 'emergency leak repair dallas', 'storm damage tarping'],
      serviceAudience: 'Property owners facing active water intrusion and ceiling leaks'
    }
  },
  {
    id: 'commercial-roofing',
    title: 'Commercial Roofing Systems',
    category: 'commercial',
    tagline: 'Energy-efficient TPO, EPDM, and flat roof systems for offices, warehouses, and retail plazas.',
    description: 'Commercial facilities demand ultra-reliable roofing with zero disruption to tenants and business operations. We install premium thermofused single-ply TPO, EPDM rubber membranes, and elastomeric coating systems engineered for maximum solar reflectance, leak resistance, and ponding water prevention.',
    highlights: [
      'Heat-welded 60-mil and 80-mil TPO single-ply reflective membranes',
      'Tapered polyisocyanurate (Polyiso) insulation for positive roof slope drainage',
      'Custom fabricated 24-gauge commercial parapet coping and edge metals',
      'NRCA compliant with minimal downtime to building tenants and HVAC equipment'
    ],
    processSteps: [
      { title: 'Core Cut & Moisture Scan', desc: 'Taking test cores to determine moisture levels in underlying insulation.' },
      { title: 'Substrate & Insulation Design', desc: 'Installing high-R value rigid polyiso insulation with crickets for positive water flow.' },
      { title: 'Robotic Hot-Air Seam Welding', desc: 'Seaming 10-foot wide TPO rolls with computer-controlled robotic hot air welders.' },
      { title: 'Flashing & Drain Sumps', desc: 'Reinforcing internal scuppers, roof drains, and curb penetration flashing.' }
    ],
    materialsSupported: ['Carlisle SynTec TPO', 'Firestone UltraPly', 'EPDM Rubber', 'Silicone Coatings'],
    warrantyInfo: 'Up to 30-Year NDL (No Dollar Limit) Manufacturer Warranties',
    turnaroundTime: '3 to 14 days depending on square footage and roof complexity',
    faqs: [
      {
        q: 'Can a commercial roof be restored with coatings instead of full tear-off?',
        a: 'Yes, if the existing roof membrane is intact and underlying insulation is dry, a high-solids silicone roof coating can extend roof life by 15–20 years at roughly half the replacement cost.'
      }
    ],
    seo: {
      metaTitle: 'Commercial Roofing Contractors Dallas TX | TPO & Flat',
      metaDescription: 'Commercial roofing contractor in Dallas-Fort Worth. Single-ply TPO, EPDM rubber, tapered polyiso insulation, and 30-year No Dollar Limit (NDL) warranties.',
      canonicalSlug: 'commercial-roofing',
      schemaServiceType: 'CommercialRoofing',
      keywords: ['commercial roofing dallas', 'tpo roofing contractors dallas', 'commercial flat roof repair tx', 'industrial roof replacement'],
      serviceAudience: 'Commercial Building Owners, Facility Managers & Real Estate Portfolios'
    }
  },
  {
    id: 'flat-roofing',
    title: 'Flat & Low-Slope Roofing',
    category: 'commercial',
    tagline: 'Ponding water elimination, tapered drainage systems, and reflective cool membranes.',
    description: 'Flat roofs on commercial properties and modern low-slope residential extensions face unique water drainage challenges. We design positive slope drainage crickets, install heat-welded thermoplastic membranes, and seal all HVAC penetrations to eliminate recurring leaks permanently.',
    highlights: [
      'Engineered slope correction with custom CNC tapered polyiso insulation boards',
      'Reflective white cool roof membranes that cut air conditioning costs up to 30%',
      'Heavy-duty termination bars, scuppers, and overflow emergency scupper boxes',
      'Walkway safety pads protecting high-traffic mechanical maintenance zones'
    ],
    processSteps: [
      { title: 'Slope & Drainage Analysis', desc: 'Measuring existing ponding depth and calculating required slope pitch.' },
      { title: 'Tapered Insulation Layering', desc: 'Fastening high-density polyiso insulation boards to steel or wood deck.' },
      { title: 'Continuous Membrane Heat-Weld', desc: 'Thermal seam welding creating a continuous monolithic waterproof barrier.' },
      { title: '24-Hour Water Ponding Test', desc: 'Inspecting seams and scuppers to certify zero water penetration.' }
    ],
    materialsSupported: ['60-mil & 80-mil TPO', 'EPDM Rubber', 'Modified Bitumen Multi-Ply'],
    warrantyInfo: '20 to 30-Year Manufacturer NDL Warranties',
    turnaroundTime: '2 to 7 days',
    faqs: [
      {
        q: 'How do you fix flat roofs that collect standing water?',
        a: 'We install tapered polyisocyanurate insulation crickets that build a 1/4" per-foot slope toward existing roof drains or exterior scupper openings.'
      }
    ],
    seo: {
      metaTitle: 'Flat Roofing Contractors Dallas TX | TPO & Drainage',
      metaDescription: 'Engineered flat and low-slope roofing in Dallas-Fort Worth. Eliminate ponding water with tapered polyiso insulation and heat-welded TPO membranes.',
      canonicalSlug: 'flat-roofing',
      schemaServiceType: 'FlatRoofing',
      keywords: ['flat roofing dallas', 'low slope roof replacement', 'tapered roof insulation dallas', 'ponding water repair flat roof'],
      serviceAudience: 'Commercial Facility Directors & Modern Low-Slope Homeowners'
    }
  },
  {
    id: 'metal-roofing',
    title: 'Standing Seam Metal Roofing',
    category: 'specialty',
    tagline: 'The ultimate in lifetime durability, architectural beauty, and fire resistance.',
    description: 'Engineered for homeowners and commercial owners seeking a 50+ year permanent roofing solution. Our standing seam panels feature concealed mechanical fasteners that allow natural thermal expansion without backing out screws. Available in 24-gauge Galvalume steel with Kynar 500 architectural finishes.',
    highlights: [
      'Concealed clip fastener system prevents leaking screw holes',
      'Class 4 impact resistance & Class A fire rating (highest possible)',
      'Solar reflective Kynar 500 paint reduces summer cooling bills by up to 25%',
      '50+ year design lifespan with minimal maintenance required'
    ],
    processSteps: [
      { title: 'High-Temp Underlayment', desc: 'Installing self-adhering 250°F rated HT underlayment over entire wooden deck.' },
      { title: 'Custom On-Site Panel Rollforming', desc: 'Panels are precision roll-formed to exact eave-to-ridge continuous lengths.' },
      { title: 'Concealed Fastening', desc: 'Heavy-duty stainless steel clips are secured with zero exposed penetrations.' },
      { title: 'Mechanical Seaming', desc: 'Double-lock mechanical seams locked at 180° for hurricane-rated water tightness.' }
    ],
    materialsSupported: ['24-Gauge Galvalume Steel', 'Standing Seam Aluminum', 'Architectural Copper'],
    warrantyInfo: '30-Year Kynar Paint Finish Warranty + 50-Year Substrate Warranty',
    turnaroundTime: '3 to 5 days for typical residential installations',
    faqs: [
      {
        q: 'Is a metal roof noisier during rain storms?',
        a: 'No. When installed over solid plywood decking and high-density synthetic underlayment, modern standing seam metal roofs are just as quiet as asphalt shingle roofs.'
      }
    ],
    seo: {
      metaTitle: 'Standing Seam Metal Roof Dallas TX | 50+ Yr Lifespan',
      metaDescription: 'Custom 24-gauge standing seam metal roofing in Dallas-Fort Worth. Concealed clips, Class 4 hail resistance, Class A fire rating, and Kynar 500 finishes.',
      canonicalSlug: 'metal-roofing',
      schemaServiceType: 'MetalRoofing',
      keywords: ['standing seam metal roof dallas', 'metal roofing contractors dallas', 'galvalume standing seam tx', 'lifetime residential metal roof'],
      serviceAudience: 'Luxury Homeowners, Modern Architects & Energy-Conscious Buyers'
    }
  },
  {
    id: 'shingle-roofing',
    title: 'Architectural Shingle Roofing',
    category: 'residential',
    tagline: 'Dimensional luxury shingles combining timeless aesthetics with heavy-duty weather performance.',
    description: 'Dimensional architectural shingles are the most popular choice for modern residences. Unlike flat 3-tab shingles, multi-layered architectural shingles provide deep shadow lines, rich texture, and enhanced wind resistance up to 130 mph, protecting against uplift and driving rains.',
    highlights: [
      'Multi-layered fiberglass asphalt construction for rich dimensional depth',
      'Advanced algae-resistant mineral granules to prevent black streak discoloration',
      'LayerLock® technology for ultra-wide mechanical nailing zones',
      'Available in 12+ designer color blends matching brick, stone, and siding'
    ],
    processSteps: [
      { title: 'Deck Surface Prep', desc: 'Checking decking flatness and installing drip edge around all borders.' },
      { title: 'Starter Strip Alignment', desc: 'Adhering factory-seal starter shingles along eaves to prevent wind blow-off.' },
      { title: 'Staggered Step Layering', desc: 'Installing shingle courses with exact 5-5/8" exposure and 6-nail securement.' },
      { title: 'Ridge Cap Ventilation', desc: 'Topping hips and ridges with matching high-profile architectural ridge caps.' }
    ],
    materialsSupported: ['GAF Timberline HDZ', 'CertainTeed Landmark Pro', 'Owens Corning Duration'],
    warrantyInfo: 'Lifetime Limited Shingle Warranty with 10-Year 100% Non-Prorated Coverage',
    turnaroundTime: '1 to 2 days',
    faqs: [
      {
        q: 'What is the difference between 3-tab and architectural shingles?',
        a: 'Architectural shingles are roughly 50% heavier, feature laminated layers for rich 3D appearance, are rated for 130 mph winds (vs 60 mph for 3-tab), and last 30+ years compared to 15–20 for 3-tab.'
      }
    ],
    seo: {
      metaTitle: 'Architectural Shingles Dallas TX | Class 4 Hail Shingles',
      metaDescription: 'High-definition architectural shingles installed in Dallas-Fort Worth. 130 mph wind resistance, GAF Timberline HDZ, CertainTeed Landmark, and lifetime warranty.',
      canonicalSlug: 'shingle-roofing',
      schemaServiceType: 'ShingleRoofing',
      keywords: ['architectural shingles dallas', 'gaf timberline hdz dallas', 'dimensional roof shingles tx', 'class 4 asphalt shingles'],
      serviceAudience: 'Single-Family Homeowners Seeking Maximum Value & Curb Appeal'
    }
  },
  {
    id: 'gutter-installation',
    title: 'Seamless Gutter Installation & Drainage',
    category: 'residential',
    tagline: 'Custom on-site extruded 6" seamless aluminum gutters and leaf protection systems.',
    description: 'A new roof is only as good as its water drainage system. Undersized or sagging gutters cause water to spill over fascia boards, rotting roof edges and flooding building foundations. We roll-form custom 6-inch seamless K-style gutters on site to the exact millimeter of your roofline.',
    highlights: [
      'Seamless on-site extrusion with zero intermediate leak-prone joints',
      'Heavy-duty hidden screw hangers placed every 24 inches into structural rafter tails',
      'Oversized 3x4 inch downspouts for 150% more water discharge capacity',
      'Micro-mesh stainless steel gutter guards to permanently block leaves and pine needles'
    ],
    processSteps: [
      { title: 'Pitch & Slope Laser Measurement', desc: 'Calibrating a 1/4" per 10-foot downward slope toward designated downspouts.' },
      { title: 'On-Site Machine Rollforming', desc: 'Continuous aluminum coils extruded into seamless runs up to 100+ feet.' },
      { title: 'Fascia Screw Securement', desc: 'Fastening through fascia boards directly into solid roof rafters with zinc screws.' },
      { title: 'Downspout & Splash Mitigation', desc: 'Installing downspout diverters and ground extensions to steer water 6+ feet away.' }
    ],
    materialsSupported: ['0.032" Heavy Gauge Aluminum', 'Seamless Copper', 'Galvalume Steel'],
    warrantyInfo: '20-Year Material Finish Warranty + 5-Year Leak-Free Workmanship',
    turnaroundTime: 'Typically completed in 1 day',
    faqs: [
      {
        q: 'Why choose 6-inch gutters instead of standard 5-inch gutters?',
        a: '6-inch gutters hold 40% more water volume, which is critical during heavy flash downpours to prevent water from splashing behind fascia boards and foundation soils.'
      }
    ],
    seo: {
      metaTitle: 'Seamless Gutters Dallas TX | 6" Custom Aluminum Gutters',
      metaDescription: 'Custom on-site extruded 6" seamless gutters and stainless micro-mesh guards in Dallas-Fort Worth. Protect your roofline, fascia boards, and foundation.',
      canonicalSlug: 'gutter-installation',
      schemaServiceType: 'GutterInstallation',
      keywords: ['seamless gutters dallas', 'gutter installation dallas tx', '6 inch k style gutters', 'gutter guards dallas'],
      serviceAudience: 'Homeowners Protecting Foundations and Roofline Fascia'
    }
  },
  {
    id: 'roof-maintenance',
    title: 'Roof Maintenance & Preventative Care',
    category: 'specialty',
    tagline: 'Semi-annual preventative tune-ups that double the effective lifespan of your roofing system.',
    description: 'Routine maintenance prevents small $150 issues from ballooning into $15,000 emergency structural replacements. Our scheduled maintenance plans include comprehensive debris removal, pipe jack collar resealing, valley clearing, attic airflow verification, and minor fastener tune-ups.',
    highlights: [
      'Complete clearing of decaying leaf mulch and debris from roof valleys and crickets',
      'High-grade polyurethane resealing of exposed flashing nails and pipe boots',
      'Tightening of loose gutter hangers and inspection of attic exhaust fans',
      'Annual documented roof health certificate for insurance records'
    ],
    processSteps: [
      { title: 'Debris & Moss Removal', desc: 'Gentle low-pressure cleaning of organic buildup from shingle keyways and valleys.' },
      { title: 'Penetration Resealing', desc: 'Applying industrial UV-stable elastomeric sealant around all vent boots.' },
      { title: 'Fastener Inspection', desc: 'Re-securing lifted shingles and replacing corroded screws on flashing and gutters.' },
      { title: 'Health Log Update', desc: 'Providing the homeowner with dated photos and an updated maintenance passport.' }
    ],
    materialsSupported: ['All Shingle, Tile, Metal, and Flat Roof Configurations'],
    warrantyInfo: '100% Satisfaction Guarantee on all seasonal tune-up services',
    turnaroundTime: '2 to 4 hour on-site service appointment',
    faqs: [
      {
        q: 'How often should a roof receive preventative maintenance in North Texas?',
        a: 'We recommend semi-annual maintenance: once in spring after freeze/thaw cycles, and once in late autumn after trees have shed their leaves.'
      }
    ],
    seo: {
      metaTitle: 'Roof Maintenance Dallas TX | Preventative Tune-Ups',
      metaDescription: 'Comprehensive seasonal roof tune-ups and preventative maintenance in Dallas-Fort Worth. Pipe boot sealing, valley clearing, and written health certificate.',
      canonicalSlug: 'roof-maintenance',
      schemaServiceType: 'RoofMaintenance',
      keywords: ['roof maintenance dallas', 'roof tune up tx', 'pipe boot resealing', 'annual roof inspection program'],
      serviceAudience: 'Proactive Homeowners & Commercial Property Managers'
    }
  }
];
