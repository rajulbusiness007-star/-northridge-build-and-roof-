import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  FileCheck, 
  Scale, 
  ExternalLink, 
  Copy, 
  Check, 
  HardHat, 
  Sparkles,
  ShieldAlert,
  Building
} from 'lucide-react';
import { BusinessConfig } from '../../data/businessConfig';

interface TrustBadgeItem {
  id: string;
  name: string;
  credentialLevel: string;
  issuedBy: string;
  badgeCode: string;
  description: string;
  warrantyBenefit: string;
  category: 'manufacturer' | 'industry' | 'safety' | 'legal';
  icon: 'shield' | 'award' | 'hardhat' | 'file' | 'scale';
  accentColor: string;
}

const trustBadgesList: TrustBadgeItem[] = [
  {
    id: 'gaf-master-elite',
    name: 'GAF Master Elite® Certified',
    credentialLevel: 'Top 2% of Roofing Contractors in North America',
    issuedBy: 'GAF Materials Corporation',
    badgeCode: 'ID #ME-TX-84920',
    description: 'Awarded only after continuous manufacturer factory training, flawless financial stability, and strict quality verification.',
    warrantyBenefit: 'Authorizes 50-Year Golden Pledge® non-prorated system warranty.',
    category: 'manufacturer',
    icon: 'shield',
    accentColor: 'border-orange-500/30 bg-orange-50/50 text-orange-700'
  },
  {
    id: 'bbb-aplus',
    name: 'BBB Accredited Business (A+)',
    credentialLevel: 'A+ Highest Integrity & Trust Grade',
    issuedBy: 'Better Business Bureau of North Central Texas',
    badgeCode: 'Accredited Since 2018',
    description: 'Exemplary consumer transparency record with zero unresolved homeowner or commercial warranty complaints.',
    warrantyBenefit: 'BBB Standards for Trust compliance & ethical dispute arbitration.',
    category: 'industry',
    icon: 'award',
    accentColor: 'border-emerald-500/30 bg-emerald-50/50 text-emerald-700'
  },
  {
    id: 'certainteed-5star',
    name: 'CertainTeed 5-Star Select ShingleMaster™',
    credentialLevel: 'Top 1% CertainTeed Credential',
    issuedBy: 'CertainTeed Saint-Gobain',
    badgeCode: 'ID #SSM-54910',
    description: 'Requires Master Shingle Applicators on every crew and passing rigorous CertainTeed business integrity audits.',
    warrantyBenefit: 'Enables 50-Year 5-Star SureStart™ PLUS non-prorated warranty coverage.',
    category: 'manufacturer',
    icon: 'shield',
    accentColor: 'border-blue-500/30 bg-blue-50/50 text-blue-700'
  },
  {
    id: 'haag-certified',
    name: 'Haag Certified Roof Inspector (HCI-R)',
    credentialLevel: 'Forensic Damage Assessment Expert',
    issuedBy: 'Haag Engineering Global',
    badgeCode: 'HCI #2024-8190',
    description: 'Mathematically trained to verify hail vs. mechanical impact and wind crease patterns accepted by all major insurance carriers.',
    warrantyBenefit: 'Court-admissible damage verification reports for insurance claims.',
    category: 'industry',
    icon: 'scale',
    accentColor: 'border-amber-500/30 bg-amber-50/50 text-amber-700'
  },
  {
    id: 'tx-licensed-insured',
    name: 'Texas Licensed & $2M Insured',
    credentialLevel: 'Fully Compliant Contractor',
    issuedBy: 'State of Texas / Underwriters',
    badgeCode: 'Lic #TX-RC-84920',
    description: '$2,000,000 General Liability policy and full Workers’ Compensation for 100% of crew members on your property.',
    warrantyBenefit: 'Zero homeowner liability risk for property damage or crew injuries.',
    category: 'legal',
    icon: 'file',
    accentColor: 'border-teal-500/30 bg-teal-50/50 text-teal-700'
  },
  {
    id: 'nrca-member',
    name: 'NRCA Sustaining Member',
    credentialLevel: 'National Technical Standard Compliant',
    issuedBy: 'National Roofing Contractors Association',
    badgeCode: 'Member ID #NRCA-74291',
    description: 'Commitment to the NRCA Roofing Manual specifications, IRC 2024 Texas building codes, and continuing roofing education.',
    warrantyBenefit: 'Adherence to rigorous ASTM steep-slope & low-slope codes.',
    category: 'industry',
    icon: 'award',
    accentColor: 'border-indigo-500/30 bg-indigo-50/50 text-indigo-700'
  },
  {
    id: 'osha-compliant',
    name: 'OSHA 30 Safety Certified Crews',
    credentialLevel: 'Zero-Accident Safety Protocol',
    issuedBy: 'U.S. Dept of Labor OSHA',
    badgeCode: 'OSHA-30 Construction',
    description: 'Full fall arrest compliance, 5,000 lb anchor tie-offs, eye and hearing PPE, and weekly pre-shift jobsite safety briefings.',
    warrantyBenefit: 'Safe, disciplined worksite management around your family and pets.',
    category: 'safety',
    icon: 'hardhat',
    accentColor: 'border-red-500/30 bg-red-50/50 text-red-700'
  },
  {
    id: 'owens-corning',
    name: 'Owens Corning Preferred Contractor',
    credentialLevel: 'Factory Certified Installer',
    issuedBy: 'Owens Corning Roofing',
    badgeCode: 'OC-Preferred #39102',
    description: 'Trained in Total Protection Roofing System® installation, TruDefinition Duration® shingles, and intake/exhaust ventilation.',
    warrantyBenefit: 'Access to Preferred Protection System warranties with workmanship.',
    category: 'manufacturer',
    icon: 'shield',
    accentColor: 'border-rose-500/30 bg-rose-50/50 text-rose-700'
  }
];

interface TrustBadgesProps {
  business?: BusinessConfig;
  className?: string;
  variant?: 'full' | 'compact';
}

export const TrustBadges: React.FC<TrustBadgesProps> = ({
  business,
  className = '',
  variant = 'full'
}) => {
  const [copiedLicense, setCopiedLicense] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'manufacturer' | 'industry' | 'safety' | 'legal'>('all');

  const filteredBadges = activeCategory === 'all' 
    ? trustBadgesList 
    : trustBadgesList.filter((b) => b.category === activeCategory);

  const handleCopyLicense = () => {
    const lic = business?.credentials.licenseNumber || 'TX-RC-84920';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(lic);
      setCopiedLicense(true);
      setTimeout(() => setCopiedLicense(false), 2000);
    }
  };

  const renderIcon = (type: TrustBadgeItem['icon']) => {
    switch (type) {
      case 'shield':
        return <ShieldCheck className="w-5 h-5 shrink-0" />;
      case 'award':
        return <Award className="w-5 h-5 shrink-0" />;
      case 'hardhat':
        return <HardHat className="w-5 h-5 shrink-0" />;
      case 'file':
        return <FileCheck className="w-5 h-5 shrink-0" />;
      case 'scale':
        return <Scale className="w-5 h-5 shrink-0" />;
      default:
        return <ShieldCheck className="w-5 h-5 shrink-0" />;
    }
  };

  return (
    <section className={`bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8 ${className}`}>
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/60 text-orange-700 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Industry Accreditations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Factory Master Certifications &amp; Trust Badges
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Fewer than 2% of roofing contractors in Texas meet the strict financial, quality, and training standards required for factory master status. Our active credentials protect your home and guarantee warranty enforceability.
          </p>
        </div>

        {/* Verification Action / Copy License */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleCopyLicense}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer border border-slate-200"
            title="Copy Texas Roofing License Number"
          >
            {copiedLicense ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">License Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Lic: {business?.credentials.licenseNumber || 'TX-RC-84920'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filter Category Pills */}
      {variant === 'full' && (
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All 8 Accreditations' },
            { id: 'manufacturer', label: 'Manufacturer Master Elite' },
            { id: 'industry', label: 'Consumer & Industry (BBB/NRCA)' },
            { id: 'legal', label: 'Licensing & Insurance' },
            { id: 'safety', label: 'OSHA Safety Standards' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {filteredBadges.map((badge) => (
          <div
            key={badge.id}
            className={`rounded-2xl border p-5 transition-all hover:shadow-sm flex flex-col justify-between bg-white space-y-4 ${
              badge.accentColor.split(' ')[0]
            }`}
          >
            <div className="space-y-3">
              {/* Badge Top Header */}
              <div className="flex items-start justify-between gap-3">
                <div className={`p-2 rounded-xl border ${badge.accentColor}`}>
                  {renderIcon(badge.icon)}
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  {badge.badgeCode}
                </span>
              </div>

              {/* Title & Level */}
              <div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {badge.name}
                </h3>
                <div className="text-[11px] font-medium text-orange-600 mt-0.5">
                  {badge.credentialLevel}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  Issued by: {badge.issuedBy}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed">
                {badge.description}
              </p>
            </div>

            {/* Bottom Warranty Benefit */}
            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-700 bg-slate-50/80 -mx-5 -mb-5 p-3.5 rounded-b-2xl flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="font-medium leading-tight">
                {badge.warrantyBenefit}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Assurance Banner */}
      <div className="rounded-2xl bg-slate-900 text-white p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-600/20 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm text-white">
              Insurance Adjuster &amp; City Permit Packets Ready
            </div>
            <div className="text-xs text-slate-300 mt-0.5">
              Certificates of insurance naming your property or HOA as additional insured are provided prior to work commencement.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 text-xs font-mono text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>100% Active Texas Standing</span>
        </div>
      </div>
    </section>
  );
};
