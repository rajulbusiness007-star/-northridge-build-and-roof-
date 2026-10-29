import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  Star,
  Check,
  ChevronDown,
  HelpCircle,
  ThumbsUp,
  Award,
  Sparkles,
  Layers,
  Clock,
  ShieldCheck,
  FileCheck,
  Home,
  Building2,
  Wrench
} from 'lucide-react';
import { BusinessConfig } from '../../data/businessConfig';
import { FAQSchema } from '../common/FAQSchema';

// Import local photography matching template
import heroRooferDrillImg from '../../assets/images/hero_roofer_drill.jpg';
import timberFramingImg from '../../assets/images/timber_framing.jpg';
import metalRoofFarmhouseImg from '../../assets/images/metal_roof_farmhouse.jpg';
import deckConstructionImg from '../../assets/images/deck_construction.jpg';
import treeRemovalImg from '../../assets/images/tree_removal.jpg';
import treeTrimmingImg from '../../assets/images/tree_trimming.jpg';
import stumpGrindingImg from '../../assets/images/stump_grinding.jpg';
import landClearingImg from '../../assets/images/land_clearing.jpg';
import projectPaversImg from '../../assets/images/project_pavers.jpg';
import projectCabinImg from '../../assets/images/project_cabin.jpg';

interface HomePageProps {
  business: BusinessConfig;
  onNavigate: (tab: string, serviceId?: string) => void;
  onOpenEstimator: () => void;
  onOpenInspection: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  business,
  onNavigate,
  onOpenEstimator,
  onOpenInspection,
}) => {
  // Recent projects carousel index
  const [projectIndex, setProjectIndex] = useState(0);

  // Form submission state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Helpful votes state for review cards
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({
    'rev-1': 28,
    'rev-2': 19,
    'rev-3': 14,
  });
  const [votedMap, setVotedMap] = useState<Record<string, boolean>>({});

  const handleVoteHelpful = (id: string) => {
    if (votedMap[id]) return;
    setHelpfulVotes((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    setVotedMap((prev) => ({ ...prev, [id]: true }));
  };

  // Project cards for the RECENT PROJECTS carousel
  const recentProjects = [
    {
      id: 1,
      title: 'Architectural Standing Seam Roof',
      category: 'Roofing',
      image: metalRoofFarmhouseImg,
    },
    {
      id: 2,
      title: 'Cedar Pergola & Timber Deck',
      category: 'Construction',
      image: deckConstructionImg,
    },
    {
      id: 3,
      title: 'Flagstone Patio & Driveway Pavers',
      category: 'Outdoor Hardscape',
      image: projectPaversImg,
    },
    {
      id: 4,
      title: 'Custom Modern Timber Pavilion',
      category: 'Exterior Builds',
      image: projectCabinImg,
    },
  ];

  // FAQ items for the accessible accordion and schema
  const faqs = [
    {
      q: 'Do you provide completely free roof estimates?',
      a: 'Yes. For homeowners and commercial property owners within our Dallas-Fort Worth service area, we provide 100% complimentary on-site physical inspections, drone surveys, and written itemized estimates with zero obligation.',
    },
    {
      q: 'How quickly can you respond to active roof leaks or storm damage?',
      a: 'Our emergency leak response and tarping crew is dispatched within 2 hours during active weather events to stabilize the roof and stop water intrusion. Permanent restoration work begins promptly once weather clears.',
    },
    {
      q: 'What warranties do your roof installations carry?',
      a: 'Every full roof replacement comes with our 10-Year Transferable Workmanship Guarantee plus full manufacturer lifetime material warranties (up to 50 years non-prorated) as a GAF Master Elite® and CertainTeed 5-Star contractor.',
    },
    {
      q: 'Can you assist with insurance claims for wind and hail damage?',
      a: 'Yes. Our inspectors are HAAG forensic certified. We document shingle mat fractures, soft-metal collateral dents, and internal attic moisture to provide your insurance adjuster with the complete itemized scope of loss.',
    },
    {
      q: 'What outdoor and construction services do you provide beyond roofing?',
      a: 'In addition to residential and commercial roofing, we build custom cedar timber decks, pergolas, fencing, and exterior renovations, as well as outdoor property services including tree removal, tree trimming, stump grinding, and land clearing.',
    },
    {
      q: 'How long does a standard residential roof replacement take?',
      a: 'The majority of residential replacements (2,000 to 4,000 sq ft) are executed in 1 to 2 days from initial tear-off to final magnetic nail sweeping.',
    },
    {
      q: 'What financing options or flexible payment plans are available?',
      a: 'We offer flexible 0% APR promotional financing for 12 to 24 months, as well as low-interest long-term financing options with fast pre-qualification that does not impact your credit score.',
    },
    {
      q: 'What is the difference between architectural and Class 4 impact shingles?',
      a: 'Class 4 shingles (such as GAF Timberline AS II or CertainTeed NorthGate) undergo UL 2218 steel-ball drop tests to withstand 2-inch hail stones without mat ruptures, qualifying Texas homeowners for up to a 28% insurance premium discount.',
    },
  ];

  const handleNextProject = () => {
    setProjectIndex((prev) => (prev + 1) % recentProjects.length);
  };

  const handlePrevProject = () => {
    setProjectIndex((prev) => (prev - 1 + recentProjects.length) % recentProjects.length);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setSubmitError('Please enter your name and phone number.');
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          zip: '75201',
          service: 'General Project Request',
          notes: formData.message,
          propertyType: 'residential',
        }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitSuccess(`Thank you! Request ${data.quoteId} received. An estimator will reach out within 2 hours.`);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitError(data.error || 'Failed to submit request.');
      }
    } catch (err: any) {
      setSubmitError('Network error. Please call our direct line: ' + business.phoneDisplay);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToQuote = () => {
    const el = document.getElementById('start-project-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('roofing-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#faf8f5] overflow-hidden">
      {/* Google-compliant FAQ Schema injected into <head> */}
      <FAQSchema faqs={faqs} pageContext="Northridge Build & Roof" showInspectorBadge={false} />

      {/* 1. HERO SECTION: EXACT MATCH TO USER'S REFERENCE TEMPLATE */}
      <section className="relative bg-[#0d1b2a] text-white pt-6 pb-16 md:pt-10 md:pb-24 overflow-hidden">
        
        {/* Full-bleed background texture & subtle ambient lighting */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#091522] via-[#0d1b2a] to-[#0d1b2a] z-0 opacity-95"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center min-h-[540px] lg:min-h-[580px]">
            
            {/* Left Headline, Subtitle, Buttons, and 4 Service Cards */}
            <div className="lg:col-span-6 space-y-6 py-2">
              
              {/* Top Pill Badge matching template */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-slate-700/80 bg-[#132334]/80 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-200 w-fit">
                <Home className="w-3.5 h-3.5 text-[#e05d26] stroke-[2.2]" />
                <span>ROOFING BUILT TO LAST</span>
              </div>

              {/* Exact Main Headline from template */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black tracking-tight text-white uppercase leading-[1.06]">
                PROTECT YOUR<br />
                HOME WITH<br />
                <span className="text-[#e05d26]">EXPERT ROOFING</span>
              </h1>

              {/* Subtitle from template */}
              <p className="text-sm sm:text-base text-slate-300 font-normal max-w-xl leading-relaxed">
                Reliable roofing solutions for homes and businesses. From repairs to full replacements, we deliver quality workmanship, durable materials and lasting protection — because your property matters.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                <button
                  type="button"
                  onClick={scrollToQuote}
                  className="px-7 py-3.5 bg-[#e05d26] hover:bg-[#c94d1b] text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>GET A FREE QUOTE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={scrollToServices}
                  className="px-7 py-3.5 bg-transparent hover:bg-white/10 text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all border border-slate-500/80 hover:border-white flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>OUR SERVICES</span>
                </button>
              </div>

              {/* 4 Feature Cards from User's Template */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-6 border-t border-slate-800">
                {/* Card 1: Residential Roofing */}
                <div 
                  onClick={() => onNavigate('roofing')} 
                  className="bg-[#112336]/80 hover:bg-[#162c44] border border-slate-800/90 hover:border-slate-700 rounded-xl p-3 sm:p-3.5 flex flex-col justify-between transition-all group cursor-pointer"
                >
                  <div className="space-y-2">
                    <Home className="w-5 h-5 text-slate-300 stroke-[1.8] group-hover:text-[#e05d26] transition-colors" />
                    <h3 className="text-[11px] font-bold text-white uppercase tracking-wider leading-tight">
                      RESIDENTIAL<br />ROOFING
                    </h3>
                    <p className="text-[10px] text-slate-400 font-normal leading-snug">
                      Safe, durable, beautiful roofs for your home.
                    </p>
                  </div>
                </div>

                {/* Card 2: Commercial Roofing */}
                <div 
                  onClick={() => onNavigate('roofing')} 
                  className="bg-[#112336]/80 hover:bg-[#162c44] border border-slate-800/90 hover:border-slate-700 rounded-xl p-3 sm:p-3.5 flex flex-col justify-between transition-all group cursor-pointer"
                >
                  <div className="space-y-2">
                    <Building2 className="w-5 h-5 text-slate-300 stroke-[1.8] group-hover:text-[#e05d26] transition-colors" />
                    <h3 className="text-[11px] font-bold text-white uppercase tracking-wider leading-tight">
                      COMMERCIAL<br />ROOFING
                    </h3>
                    <p className="text-[10px] text-slate-400 font-normal leading-snug">
                      Strong roofing solutions for your business.
                    </p>
                  </div>
                </div>

                {/* Card 3: Roof Repair & Replacement */}
                <div 
                  onClick={() => onNavigate('roofing')} 
                  className="bg-[#112336]/80 hover:bg-[#162c44] border border-slate-800/90 hover:border-slate-700 rounded-xl p-3 sm:p-3.5 flex flex-col justify-between transition-all group cursor-pointer"
                >
                  <div className="space-y-2">
                    <ShieldCheck className="w-5 h-5 text-slate-300 stroke-[1.8] group-hover:text-[#e05d26] transition-colors" />
                    <h3 className="text-[11px] font-bold text-white uppercase tracking-wider leading-tight">
                      ROOF REPAIR<br />&amp; REPLACEMENT
                    </h3>
                    <p className="text-[10px] text-slate-400 font-normal leading-snug">
                      Fast, reliable, long-lasting protection.
                    </p>
                  </div>
                </div>

                {/* Card 4: Inspections & Maintenance */}
                <div 
                  onClick={onOpenInspection} 
                  className="bg-[#112336]/80 hover:bg-[#162c44] border border-slate-800/90 hover:border-slate-700 rounded-xl p-3 sm:p-3.5 flex flex-col justify-between transition-all group cursor-pointer"
                >
                  <div className="space-y-2">
                    <Wrench className="w-5 h-5 text-slate-300 stroke-[1.8] group-hover:text-[#e05d26] transition-colors" />
                    <h3 className="text-[11px] font-bold text-white uppercase tracking-wider leading-tight">
                      INSPECTIONS<br />&amp; MAINTENANCE
                    </h3>
                    <p className="text-[10px] text-slate-400 font-normal leading-snug">
                      Find issues early. Save money later.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Side: Exact Photo from User's Reference Template */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-tl-[40px] rounded-tr-2xl rounded-b-2xl overflow-hidden shadow-2xl border border-slate-800 bg-[#0d1b2a] aspect-[16/11] sm:aspect-[16/10] lg:aspect-auto lg:h-[530px] group">
                <img
                  src={heroRooferDrillImg}
                  alt="Professional roofing contractor with cordless drill installing terracotta clay tiles under a blue sky"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="eager"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Angular diagonal bottom transition */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 translate-y-1">
          <svg viewBox="0 0 1200 45" preserveAspectRatio="none" className="relative block w-full h-8 sm:h-12 md:h-16 text-[#faf8f5] fill-current">
            <path d="M0 45 L1200 0 L1200 45 Z" />
          </svg>
        </div>
      </section>

      {/* 2. POST-HERO PROVEN PROCESS & PROOF CARD (From User's Attached Template) */}
      <section className="relative -mt-10 sm:-mt-14 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-stone-200/90">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Rating Summary */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-stone-200 pb-6 lg:pb-0 lg:pr-8 space-y-2 text-center lg:text-left">
              <div className="text-xs font-bold uppercase tracking-wider text-[#c86438]">
                Proven Quality
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#16222f] leading-snug">
                Roofing Built to Protect What Matters
              </h3>
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
                <div className="text-3xl font-black text-[#16222f]">4.9</div>
                <div>
                  <div className="flex text-amber-400 text-sm">★★★★★</div>
                  <div className="text-[11px] text-slate-500 font-semibold">148+ Verified Reviews</div>
                </div>
              </div>
            </div>

            {/* Right 4-Step Process Badges */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              {/* Step 1 */}
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#16222f] text-white flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Free Inspection
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Certified 4K drone scan and attic crawl with zero obligation.
                </p>
              </div>

              {/* Step 2 */}
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#c86438] text-white flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Itemized Scope
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Transparent written estimates with fixed pricing and code compliance.
                </p>
              </div>

              {/* Step 3 */}
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#16222f] text-white flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Master Install
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Executed in 1–2 days with triple magnetic nail sweep.
                </p>
              </div>

              {/* Step 4 */}
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#c86438] text-white flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Lifetime Warranty
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  10-year workmanship guarantee + non-prorated manufacturer coverage.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. SECTION: "Built for Every Season" */}
      <section className="relative bg-[#faf8f5] py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-7">
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3] group border border-stone-200/90">
                <img
                  src={timberFramingImg}
                  alt="Modern timber framing and roof trusses under clear blue sky"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="md:col-span-5 space-y-3 md:pl-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#16222f] tracking-tight leading-tight">
                Built for<br />
                Every Season
              </h2>
              <div className="w-12 h-1 bg-[#c86438]"></div>
              <p className="text-base sm:text-lg text-slate-700 font-semibold pt-1">
                Strong structures. Safer tomorrows.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                Whether facing severe Texas hail storms, 100°+ summer heat, or winter freezes, our engineered architectural roofing systems deliver unmatched durability.
              </p>
            </div>

          </div>
        </div>

        <div className="w-full overflow-hidden leading-none translate-y-1 mt-8">
          <svg viewBox="0 0 1200 45" preserveAspectRatio="none" className="relative block w-full h-6 sm:h-10 md:h-14 text-[#16222f] fill-current">
            <path d="M0 0 L1200 45 L0 45 Z" />
          </svg>
        </div>
      </section>

      {/* 4. ROOFING SERVICE PILLAR */}
      <section id="roofing-section" className="relative bg-[#16222f] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-5 space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
                  ROOFING
                </h3>
                <div className="w-12 h-1 bg-[#c86438] mt-2"></div>
              </div>

              <ul className="space-y-4 text-sm sm:text-base text-slate-200 font-semibold">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#c86438] stroke-[3]" />
                  <span>Roof Repair</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#c86438] stroke-[3]" />
                  <span>New Roofing</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#c86438] stroke-[3]" />
                  <span>Metal Roofing</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#c86438] stroke-[3]" />
                  <span>Storm Damage</span>
                </li>
              </ul>
            </div>

            <div className="md:col-span-7">
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] border border-slate-700/80 group">
                <img
                  src={metalRoofFarmhouseImg}
                  alt="Modern white farmhouse with black standing seam metal roof"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>

        <div className="w-full overflow-hidden leading-none translate-y-1 mt-10">
          <svg viewBox="0 0 1200 45" preserveAspectRatio="none" className="relative block w-full h-6 sm:h-10 md:h-14 text-[#faf8f5] fill-current">
            <path d="M0 45 L1200 0 L1200 45 Z" />
          </svg>
        </div>
      </section>

      {/* 5. OUTDOOR SERVICES */}
      <section id="outdoor-services-section" className="relative bg-[#faf8f5] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-[#16222f]">
              OUTDOOR SERVICES
            </h3>
            <div className="w-14 h-1 bg-[#c86438] mt-2"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="space-y-3 group text-center">
              <div className="rounded-2xl overflow-hidden shadow-sm aspect-square border border-stone-300/80">
                <img
                  src={treeRemovalImg}
                  alt="Tree Removal arborist"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#16222f] tracking-wide">
                Tree Removal
              </div>
            </div>

            <div className="space-y-3 group text-center">
              <div className="rounded-2xl overflow-hidden shadow-sm aspect-square border border-stone-300/80">
                <img
                  src={treeTrimmingImg}
                  alt="Tree Trimming arborist"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#16222f] tracking-wide">
                Tree Trimming
              </div>
            </div>

            <div className="space-y-3 group text-center">
              <div className="rounded-2xl overflow-hidden shadow-sm aspect-square border border-stone-300/80">
                <img
                  src={stumpGrindingImg}
                  alt="Stump Grinding machine"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#16222f] tracking-wide">
                Stump Grinding
              </div>
            </div>

            <div className="space-y-3 group text-center">
              <div className="rounded-2xl overflow-hidden shadow-sm aspect-square border border-stone-300/80">
                <img
                  src={landClearingImg}
                  alt="Land Clearing excavator equipment"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#16222f] tracking-wide">
                Land Clearing
              </div>
            </div>
          </div>
        </div>

        <div className="w-full overflow-hidden leading-none translate-y-1 mt-10">
          <svg viewBox="0 0 1200 45" preserveAspectRatio="none" className="relative block w-full h-6 sm:h-10 md:h-14 text-[#16222f] fill-current">
            <path d="M0 0 L1200 45 L0 45 Z" />
          </svg>
        </div>
      </section>

      {/* 6. CONSTRUCTION */}
      <section id="construction-section" className="relative bg-[#16222f] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-7 order-2 md:order-1">
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] border border-slate-700/80 group">
                <img
                  src={deckConstructionImg}
                  alt="Luxury timber deck, patio seating and modern pergola"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="md:col-span-5 space-y-6 order-1 md:order-2 md:pl-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
                  CONSTRUCTION
                </h3>
                <div className="w-12 h-1 bg-[#c86438] mt-2"></div>
              </div>

              <ul className="space-y-4 text-sm sm:text-base text-slate-200 font-semibold">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#c86438] stroke-[3]" />
                  <span>Decks</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#c86438] stroke-[3]" />
                  <span>Fencing</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#c86438] stroke-[3]" />
                  <span>Renovations</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#c86438] stroke-[3]" />
                  <span>Exterior Builds</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        <div className="w-full overflow-hidden leading-none translate-y-1 mt-10">
          <svg viewBox="0 0 1200 45" preserveAspectRatio="none" className="relative block w-full h-6 sm:h-10 md:h-14 text-[#faf8f5] fill-current">
            <path d="M0 45 L1200 0 L1200 45 Z" />
          </svg>
        </div>
      </section>

      {/* 7. RECENT PROJECTS GALLERY */}
      <section id="recent-projects-section" className="relative bg-[#faf8f5] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-[#16222f]">
                RECENT PROJECTS
              </h3>
              <div className="w-14 h-1 bg-[#c86438] mt-2"></div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevProject}
                aria-label="Previous project"
                className="w-9 h-9 rounded-full border border-stone-300 flex items-center justify-center text-slate-700 hover:bg-stone-200 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextProject}
                aria-label="Next project"
                className="w-9 h-9 rounded-full border border-stone-300 flex items-center justify-center text-slate-700 hover:bg-stone-200 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {recentProjects.map((p, idx) => (
              <div 
                key={p.id}
                className={`rounded-2xl overflow-hidden shadow-sm border border-stone-200 group bg-white transition-all ${
                  idx === projectIndex ? 'ring-2 ring-[#c86438]' : ''
                }`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>

        <div className="w-full overflow-hidden leading-none translate-y-1 mt-10">
          <svg viewBox="0 0 1200 45" preserveAspectRatio="none" className="relative block w-full h-6 sm:h-10 md:h-14 text-[#1a2a34] fill-current">
            <path d="M0 0 L1200 45 L0 45 Z" />
          </svg>
        </div>
      </section>

      {/* 8. CLIENT STORIES */}
      <section className="relative bg-[#1a2a34] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
              CLIENT STORIES
            </h3>
            <div className="w-14 h-1 bg-[#c86438] mt-2 mx-auto sm:mx-0"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-[#15232c] rounded-2xl p-6 border border-slate-700/60 flex items-center gap-4 shadow-md">
              <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-[#c86438]">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                  alt="Customer 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs sm:text-sm font-semibold text-slate-100 leading-snug">
                  &ldquo;Great work and professional team!&rdquo;
                </p>
                <div className="flex text-amber-400 text-xs">
                  {'★★★★★'}
                </div>
              </div>
            </div>

            <div className="bg-[#15232c] rounded-2xl p-6 border border-slate-700/60 flex items-center gap-4 shadow-md">
              <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-[#c86438]">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
                  alt="Customer 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs sm:text-sm font-semibold text-slate-100 leading-snug">
                  &ldquo;Our new roof looks amazing!&rdquo;
                </p>
                <div className="flex text-amber-400 text-xs">
                  {'★★★★★'}
                </div>
              </div>
            </div>

            <div className="bg-[#15232c] rounded-2xl p-6 border border-slate-700/60 flex items-center gap-4 shadow-md">
              <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-[#c86438]">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
                  alt="Customer 3"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs sm:text-sm font-semibold text-slate-100 leading-snug">
                  &ldquo;Reliable, efficient and easy to work with.&rdquo;
                </p>
                <div className="flex text-amber-400 text-xs">
                  {'★★★★★'}
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="w-full overflow-hidden leading-none translate-y-1 mt-10">
          <svg viewBox="0 0 1200 45" preserveAspectRatio="none" className="relative block w-full h-6 sm:h-10 md:h-14 text-[#faf8f5] fill-current">
            <path d="M0 45 L1200 0 L1200 45 Z" />
          </svg>
        </div>
      </section>

      {/* 9. VERIFIED CUSTOMER REVIEWS SECTION */}
      <section id="reviews-section" className="relative bg-[#faf8f5] py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c86438] mb-1">
                <Star className="w-4 h-4 fill-[#c86438] text-[#c86438]" />
                <span>Verified Client Feedback</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-[#16222f]">
                CUSTOMER REVIEWS &amp; RATINGS
              </h3>
              <div className="w-14 h-1 bg-[#c86438] mt-2"></div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-sm flex items-center gap-5 shrink-0">
              <div className="text-center border-r border-stone-200 pr-5">
                <div className="text-3xl font-black text-[#16222f] leading-none">4.9</div>
                <div className="flex text-amber-400 text-xs mt-1">★★★★★</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">148+ Reviews</div>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>99% Recommendation</span>
                </div>
                <div className="text-[11px] text-slate-500">Google Verified · GAF Master Elite®</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 text-xs">★★★★★</div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Verified Owner
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#16222f] leading-snug">
                  Flawless adjuster coordination and spotless yard cleanup
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  &ldquo;Apex Crest brought out an inspector who walked every inch, took 42 high-res photos, and met my State Farm adjuster directly on the roof to ensure all hail collateral was approved. The crew completed our 3,800 sq ft roof replacement in 1.5 days. They magnetically swept the yard three times—I found zero stray nails.&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px]">
                <div>
                  <div className="font-bold text-slate-900">Marcus Vance</div>
                  <div className="text-slate-500">Frisco, TX · Class 4 Shingles</div>
                </div>
                <button
                  onClick={() => handleVoteHelpful('rev-1')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    votedMap['rev-1']
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{helpfulVotes['rev-1']}</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 text-xs">★★★★★</div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Verified Owner
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#16222f] leading-snug">
                  Architectural masterpiece—drastically reduced our summer AC bills
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  &ldquo;We wanted a permanent metal roof for our modern remodel. The fabrication and installation crews are true artists. The concealed fasteners, valley folds, and custom flashing are precision-engineered. Not a single exposed screw or wavy panel. Electric bills dropped noticeably.&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px]">
                <div>
                  <div className="font-bold text-slate-900">Elena &amp; David Rostova</div>
                  <div className="text-slate-500">Plano, TX · Standing Seam Metal</div>
                </div>
                <button
                  onClick={() => handleVoteHelpful('rev-2')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    votedMap['rev-2']
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{helpfulVotes['rev-2']}</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 text-xs">★★★★★</div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Verified Owner
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#16222f] leading-snug">
                  Saved us $9,400 in hidden seller credits before closing
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  &ldquo;During our option period, our general home inspector only looked from the eaves. Apex Crest flew 4K drone passes and conducted a physical attic crawl. They identified rotted decking under the rear valley with active moisture. Their 18-page certified report secured us a $9,400 closing credit!&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px]">
                <div>
                  <div className="font-bold text-slate-900">Christine Holloway</div>
                  <div className="text-slate-500">Southlake, TX · 21-Point Audit</div>
                </div>
                <button
                  onClick={() => handleVoteHelpful('rev-3')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    votedMap['rev-3']
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{helpfulVotes['rev-3']}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('reviews')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c86438] hover:text-[#b3532b] transition-colors cursor-pointer"
            >
              <span>Explore All 148+ Verified Reviews &amp; Filter By Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="w-full overflow-hidden leading-none translate-y-1 mt-10">
          <svg viewBox="0 0 1200 45" preserveAspectRatio="none" className="relative block w-full h-6 sm:h-10 md:h-14 text-[#16222f] fill-current">
            <path d="M0 0 L1200 45 L0 45 Z" />
          </svg>
        </div>
      </section>

      {/* 10. FREQUENTLY ASKED QUESTIONS SECTION */}
      <section id="faq-section" className="relative bg-[#16222f] text-white py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c86438]">
              <HelpCircle className="w-4 h-4" />
              <span>Got Questions? We Have Answers</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
              FREQUENTLY ASKED QUESTIONS
            </h3>
            <div className="w-14 h-1 bg-[#c86438] mx-auto mt-2"></div>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl mx-auto pt-1">
              Everything you need to know about our warranties, emergency dispatch, insurance claims, and pricing.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                name="northridge-faq"
                className="group bg-[#1e2d3c] rounded-xl border border-slate-700/80 p-4 sm:p-5 transition-colors open:border-[#c86438] open:bg-[#1a2733]"
              >
                <summary className="flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white cursor-pointer list-none select-none">
                  <span>{faq.q}</span>
                  <div className="w-7 h-7 rounded-full bg-[#16222f] flex items-center justify-center shrink-0 border border-slate-700 group-open:bg-[#c86438] transition-colors">
                    <ChevronDown className="w-4 h-4 text-slate-300 group-open:text-white transition-transform duration-300 group-open:rotate-180" />
                  </div>
                </summary>
                <div className="pt-3 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-700/60 mt-3 font-normal">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 p-6 bg-[#1a2734] rounded-2xl border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <div className="text-sm font-bold text-white">Have a specific question about your roof or property?</div>
              <div className="text-xs text-slate-300 mt-0.5">Our senior estimators are available for immediate consultation.</div>
            </div>
            <a
              href={business.phone}
              className="px-5 py-2.5 bg-[#c86438] hover:bg-[#b3532b] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors whitespace-nowrap flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call {business.phoneDisplay}</span>
            </a>
          </div>

        </div>

        <div className="w-full overflow-hidden leading-none translate-y-1 mt-10">
          <svg viewBox="0 0 1200 45" preserveAspectRatio="none" className="relative block w-full h-6 sm:h-10 md:h-14 text-[#ede7dc] fill-current">
            <path d="M0 45 L1200 0 L1200 45 Z" />
          </svg>
        </div>
      </section>

      {/* 11. START YOUR PROJECT (Form Section) */}
      <section id="start-project-form" className="relative bg-[#ede7dc] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-7">
                    <path d="M18 4L34 28H22L18 20L14 28H2L18 4Z" fill="#16222f" />
                    <path d="M30 10L46 32H34L30 25L26 32H16L30 10Z" fill="#c86438" />
                  </svg>
                </div>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#16222f] uppercase tracking-tight leading-tight">
                START YOUR<br />
                PROJECT
              </h3>
              
              <p className="text-sm sm:text-base text-slate-700 font-semibold">
                Let&apos;s build something great together.
              </p>
            </div>

            <div className="lg:col-span-7">
              {submitSuccess ? (
                <div className="p-6 bg-white rounded-xl border border-emerald-300 text-center space-y-3 shadow-md">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <div className="text-base font-bold text-emerald-950">Thank You!</div>
                  <p className="text-xs text-emerald-800">{submitSuccess}</p>
                  <button
                    onClick={() => setSubmitSuccess(null)}
                    className="mt-2 text-xs font-semibold text-emerald-700 underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitForm} className="space-y-3">
                  {submitError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                      {submitError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/95 border border-stone-300 rounded-md text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#c86438] focus:border-[#c86438] shadow-xs"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/95 border border-stone-300 rounded-md text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#c86438] focus:border-[#c86438] shadow-xs"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white/95 border border-stone-300 rounded-md text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#c86438] focus:border-[#c86438] shadow-xs"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={4}
                      placeholder="Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white/95 border border-stone-300 rounded-md text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#c86438] focus:border-[#c86438] shadow-xs"
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-10 py-3.5 bg-[#c86438] hover:bg-[#b3532b] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'SENDING...' : 'SEND'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
