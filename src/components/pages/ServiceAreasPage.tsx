import React, { useState } from 'react';
import { MapPin, Search, CheckCircle2, Clock, Phone, ArrowRight, AlertCircle, Shield } from 'lucide-react';
import { BusinessConfig } from '../../data/businessConfig';

interface ServiceAreasPageProps {
  business: BusinessConfig;
  onSelectQuote: () => void;
  onBookInspection: () => void;
}

export const ServiceAreasPage: React.FC<ServiceAreasPageProps> = ({
  business,
  onSelectQuote,
  onBookInspection,
}) => {
  const [zipQuery, setZipQuery] = useState('');
  const [zipResult, setZipResult] = useState<{ checked: boolean; isServed: boolean; message: string } | null>(null);

  const coverageCounties = [
    {
      county: 'Dallas County',
      cities: ['Dallas', 'Highland Park', 'University Park', 'Irving', 'Garland', 'Richardson', 'Carrollton'],
      responseTime: 'Under 90 Minutes',
      emergencyTarping: 'Available 24/7'
    },
    {
      county: 'Collin County',
      cities: ['Plano', 'Frisco', 'McKinney', 'Allen', 'Prosper', 'Celina', 'Fairview'],
      responseTime: 'Under 90 Minutes',
      emergencyTarping: 'Available 24/7'
    },
    {
      county: 'Tarrant County',
      cities: ['Fort Worth', 'Arlington', 'Southlake', 'Grapevine', 'Colleyville', 'Keller'],
      responseTime: 'Under 2 Hours',
      emergencyTarping: 'Available 24/7'
    },
    {
      county: 'Denton County',
      cities: ['Denton', 'Lewisville', 'Flower Mound', 'Highland Village', 'Roanoke'],
      responseTime: 'Under 2 Hours',
      emergencyTarping: 'Available 24/7'
    }
  ];

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = zipQuery.trim();
    if (!cleanZip) return;

    const servedZips = business.serviceArea.zipCodes;
    // Also accept any 75xxx or 76xxx within North Texas
    const isMatched = servedZips.includes(cleanZip) || (cleanZip.startsWith('75') || cleanZip.startsWith('76'));

    if (isMatched) {
      setZipResult({
        checked: true,
        isServed: true,
        message: `Yes! ZIP Code ${cleanZip} is within our primary service dispatch zone. Free 21-point on-site inspections available with guaranteed 24-hour response.`
      });
    } else {
      setZipResult({
        checked: true,
        isServed: false,
        message: `ZIP Code ${cleanZip} is outside our standard 45-mile service radius. For large commercial or complex standing seam projects, please call our office directly.`
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-2">
          Service Territory &amp; Dispatch
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Areas We Proudly Serve Across {business.serviceArea.primaryRegion}
        </h1>
        <p className="text-base text-slate-600 mt-3 leading-relaxed">
          Headquartered in Dallas, our certified crews provide rapid response residential and commercial roofing within a {business.serviceArea.radiusMiles}-mile radius.
        </p>
      </div>

      {/* Interactive ZIP Code Validator */}
      <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white border border-slate-800">
        <div className="max-w-2xl">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2">
            Instant Service Coverage Check
          </h2>
          <p className="text-xs md:text-sm text-slate-300 mb-6">
            Enter your 5-digit property ZIP code to verify immediate dispatch availability and schedule your complimentary inspection.
          </p>

          <form onSubmit={handleZipCheck} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Enter 5-Digit ZIP (e.g. 75201, 75024)"
                value={zipQuery}
                onChange={(e) => setZipQuery(e.target.value)}
                maxLength={5}
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-mono placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-xl transition-all shadow cursor-pointer shrink-0"
            >
              Check Availability
            </button>
          </form>

          {zipResult && (
            <div className={`mt-4 p-4 rounded-xl border text-xs flex items-start gap-3 ${
              zipResult.isServed
                ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-200'
                : 'bg-amber-950/70 border-amber-500/40 text-amber-200'
            }`}>
              {zipResult.isServed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-2">
                <p className="leading-relaxed">{zipResult.message}</p>
                {zipResult.isServed && (
                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={onBookInspection}
                      className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-semibold text-xs hover:bg-emerald-500"
                    >
                      Book Free Inspection Now
                    </button>
                    <button
                      type="button"
                      onClick={onSelectQuote}
                      className="px-3 py-1.5 bg-slate-800 text-slate-200 rounded-lg font-semibold text-xs hover:bg-slate-700"
                    >
                      Request Online Quote
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* County & Municipal Coverage Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coverageCounties.map((c) => (
          <div key={c.county} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">{c.county}</h3>
              <div className="flex items-center gap-1.5 text-xs text-orange-600 font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>{c.responseTime}</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Served Municipalities
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {c.cities.map((city) => (
                  <span
                    key={city}
                    className="text-xs text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md font-medium"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-xs flex items-center justify-between text-slate-500">
              <span>Emergency Tarping: <strong className="text-slate-800">{c.emergencyTarping}</strong></span>
              <button
                type="button"
                onClick={onBookInspection}
                className="text-orange-600 font-semibold hover:underline"
              >
                Schedule in {c.county.split(' ')[0]}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Regional Climate & Building Code Information */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 space-y-4 text-xs">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <Shield className="w-4 h-4 text-orange-600" />
          <span>North Texas Severe Weather &amp; Code Compliance Advisory</span>
        </div>
        <p className="text-slate-600 leading-relaxed">
          The Dallas-Fort Worth metroplex is located in Severe Hail Alley (Zone 1), experiencing severe storm convective cells from March through October. All our roof installations are engineered to meet or exceed the International Residential Code (IRC) 2021/2024 local amendments, specifying 6-nail shingle fasteners, 26-gauge corrosion-resistant drip edges along rakes and eaves, and full synthetic underlayment barriers.
        </p>
      </div>
    </div>
  );
};
