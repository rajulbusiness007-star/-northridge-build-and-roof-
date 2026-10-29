import React from 'react';
import { ShieldCheck, Award, Users, HardHat, CheckCircle2, ArrowRight } from 'lucide-react';
import { BusinessConfig } from '../../data/businessConfig';

interface AboutPageProps {
  business: BusinessConfig;
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ business, onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      <div className="max-w-3xl">
        <div className="text-xs font-semibold text-[#e05d26] uppercase tracking-wider mb-2">
          Workmanship Standards &amp; Credentials
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          About {business.name}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
          Founded on principles of engineering rigor and transparent communication, we deliver residential and commercial roofing systems built strictly to outlast Texas extreme weather.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#e05d26] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Zero-Compromise Standards</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            We never shingle over rotten plywood decking. Every roof undergoes a complete tear-off and structural substrate audit before a single new shingle or metal panel is installed.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <HardHat className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">OSHA 30 Safety Protocols</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every site foreman maintains OSHA 30 certification. Our crews utilize certified fall arrest gear, double-anchored lifelines, and eye protection on every pitch.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Top 2% Manufacturer Certifications</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            As a GAF Master Elite® and CertainTeed 5-Star contractor, our installations qualify for non-prorated 50-year manufacturer warranty backing that uncertified roofers cannot offer.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white border border-slate-800 space-y-8">
        <div>
          <div className="text-xs font-semibold text-[#e05d26] uppercase tracking-wider mb-2">
            Verified Contractor Ledger
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Official Registrations, Coverage &amp; Insurance
          </h2>
          <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl">
            We believe in complete transparency. We furnish insurance policy declarations and manufacturer licenses with every estimate.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-1">
            <div className="text-slate-400 uppercase font-mono text-[10px]">State Registration</div>
            <div className="text-white font-bold text-sm">{business.credentials.licenseTitle}</div>
            <div className="text-slate-300 text-[11px]">Active in Good Standing with Texas Secretary of State</div>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-1">
            <div className="text-slate-400 uppercase font-mono text-[10px]">Commercial Liability</div>
            <div className="text-white font-bold text-sm">$2,000,000 Aggregate Policy</div>
            <div className="text-slate-300 text-[11px]">Protects your property against accidental damage</div>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-1">
            <div className="text-slate-400 uppercase font-mono text-[10px]">Workers' Compensation</div>
            <div className="text-white font-bold text-sm">Full Statutory Coverage</div>
            <div className="text-slate-300 text-[11px]">Zero homeowner liability for on-site personnel</div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
            Accredited Industry Affiliations
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs text-slate-300">
            {business.credentials.certifications.map((c, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#e05d26] shrink-0" />
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            The Northridge 10-Year Transferable Workmanship Guarantee
          </h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            Most roofing failures stem from improper installation—such as underdriven nails, misaligned starter shingles, or missing step flashing—which manufacturer material warranties do not cover. Our proprietary 10-Year Workmanship Guarantee covers 100% of labor and materials to correct any installation defect, transferable to the next homeowner if you sell.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-900 mb-1">100% Transferable</div>
            <p className="text-slate-600">Adds concrete appraisal value and buyer confidence when listing your home.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-900 mb-1">Direct Contractor Backing</div>
            <p className="text-slate-600">No third-party call centers. We service our own installations directly.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-900 mb-1">Annual Health Checks</div>
            <p className="text-slate-600">Complimentary 2-year and 5-year checkups included to ensure enduring seal integrity.</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Need to speak directly with an estimator or project manager?
          </div>
          <button
            type="button"
            onClick={() => onNavigate('quote')}
            className="w-full sm:w-auto px-6 py-3 bg-[#e05d26] hover:bg-[#c94d1b] text-white font-semibold text-xs rounded-xl shadow cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Request Consultation &amp; Estimate</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
