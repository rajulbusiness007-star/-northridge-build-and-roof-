import React, { useState } from 'react';
import { CreditCard, Calculator, CheckCircle2, ShieldCheck, ArrowRight, AlertCircle, Info } from 'lucide-react';

interface FinancingPageProps {
  onApplyOrQuote: () => void;
}

export const FinancingPage: React.FC<FinancingPageProps> = ({ onApplyOrQuote }) => {
  const [projectCost, setProjectCost] = useState<number>(14000);
  const [selectedTermMonths, setSelectedTermMonths] = useState<number>(60);
  const [estimatedApr, setEstimatedApr] = useState<number>(8.99);

  // Monthly payment calculation: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
  const monthlyRate = estimatedApr / 100 / 12;
  const numPayments = selectedTermMonths;
  const monthlyPayment =
    monthlyRate > 0
      ? Math.round(
          (projectCost * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
            (Math.pow(1 + monthlyRate, numPayments) - 1)
        )
      : Math.round(projectCost / numPayments);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-2">
          Affordable Investment Options
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Flexible Residential Roofing Financing
        </h1>
        <p className="text-base text-slate-600 mt-3 leading-relaxed">
          A damaged or aged roof cannot wait. We partner with licensed home improvement lending networks to offer simple monthly installment options, subject to credit approval.
        </p>
      </div>

      {/* Financing Plans Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Plan 1 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded">
              POPULAR CASH PROMO
            </span>
            <h2 className="text-xl font-bold text-slate-900">12 Months Same-As-Cash</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              0% Interest if paid in full within 12 months. Ideal for homeowners anticipating insurance proceeds, tax refunds, or who prefer short-term liquidity.
            </p>
            <div className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero interest during initial 12-month promotional window</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>No early payoff penalties</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onApplyOrQuote}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            Check Pre-Qualification
          </button>
        </div>

        {/* Plan 2 */}
        <div className="bg-white rounded-2xl border-2 border-orange-500 p-6 md:p-8 space-y-4 shadow-md flex flex-col justify-between relative">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-white bg-orange-600 px-2.5 py-1 rounded">
              LOW MONTHLY PAYMENT
            </span>
            <h2 className="text-xl font-bold text-slate-900">60-Month Fixed Low Rate</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Predictable fixed monthly payments starting around $149/month for standard residential roofs. Terms from 36 to 84 months.
            </p>
            <div className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Fixed APR and fixed monthly payments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Soft credit check with no impact to credit score</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onApplyOrQuote}
            className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-xs"
          >
            Pre-Qualify in 60 Seconds
          </button>
        </div>

        {/* Plan 3 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
              LONG-TERM UPGRADES
            </span>
            <h2 className="text-xl font-bold text-slate-900">84 to 120 Months Extended</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Designed for luxury standing seam metal, designer tile, and full envelope restorations to keep monthly out-of-pocket costs manageable.
            </p>
            <div className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Highest purchasing power for lifetime roofs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pay off anytime with zero penalty</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onApplyOrQuote}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            Explore Extended Options
          </button>
        </div>

      </div>

      {/* Interactive Monthly Payment Calculator */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 border border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-6 h-6 text-orange-500" />
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">Interactive Monthly Payment Estimator</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <span className="text-slate-300">Total Project Estimate Amount</span>
                <span className="font-mono text-base font-bold text-white bg-slate-800 px-3 py-1 rounded">
                  ${projectCost.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="45000"
                step="500"
                value={projectCost}
                onChange={(e) => setProjectCost(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                <span>$5,000 (Repairs)</span>
                <span>$14,000 (Avg Roof)</span>
                <span>$45,000+ (Metal)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Repayment Term
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { months: 24, label: '24 Mo' },
                  { months: 48, label: '48 Mo' },
                  { months: 60, label: '60 Mo (Avg)' },
                  { months: 84, label: '84 Mo' },
                ].map((t) => (
                  <button
                    key={t.months}
                    type="button"
                    onClick={() => setSelectedTermMonths(t.months)}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      selectedTermMonths === t.months
                        ? 'border-orange-500 bg-orange-600 text-white'
                        : 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-950 p-6 rounded-xl border border-slate-800 text-center space-y-3">
            <span className="text-[11px] font-semibold text-orange-400 uppercase tracking-wider block">
              Estimated Monthly Installment
            </span>
            <div className="text-4xl md:text-5xl font-extrabold font-mono text-white">
              ${monthlyPayment}
              <span className="text-sm font-normal text-slate-400">/mo</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Based on {selectedTermMonths} months at {estimatedApr}% APR. Actual rate, term, and down payment are subject to third-party lender credit underwriting.
            </p>
            <button
              type="button"
              onClick={onApplyOrQuote}
              className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-xl transition-all shadow cursor-pointer"
            >
              Apply Financing to My Estimate
            </button>
          </div>

        </div>
      </div>

      {/* Texas HB 2102 Deductible Compliance Warning */}
      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-700">
        <div className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
          <Info className="w-4 h-4 text-orange-600" />
          <span>Texas House Bill 2102 Compliance Disclosure</span>
        </div>
        <p className="leading-relaxed">
          Under Texas law (HB 2102), it is a criminal misdemeanor for a roofing contractor to pay, waive, rebate, or provide an allowance for all or part of an insurance deductible. Apex Crest Roofing strictly adheres to state ethics laws. We do not participate in deductible schemes, protecting you from insurance fraud audits and policy cancellation.
        </p>
      </div>
    </div>
  );
};
