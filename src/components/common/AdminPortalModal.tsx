import React, { useState, useEffect } from 'react';
import { Settings, Inbox, Calendar, CheckCircle2, X, RefreshCw, Edit3, ShieldAlert } from 'lucide-react';
import { BusinessConfig } from '../../data/businessConfig';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  business: BusinessConfig;
  onUpdateBusiness: (updated: BusinessConfig) => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  business,
  onUpdateBusiness,
}) => {
  const [activeTab, setActiveTab] = useState<'quotes' | 'inspections' | 'config'>('quotes');
  const [quotes, setQuotes] = useState<any[]>([]);
  const [inspections, setInspections] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editableConfig, setEditableConfig] = useState<BusinessConfig>({ ...business });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const [qRes, iRes] = await Promise.all([
        fetch('/api/quotes').catch(() => null),
        fetch('/api/inspections').catch(() => null),
      ]);
      if (qRes && qRes.ok) {
        const qData = await qRes.json();
        setQuotes(qData.quotes || []);
      }
      if (iRes && iRes.ok) {
        const iData = await iRes.json();
        setInspections(iData.inspections || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLeads();
      setEditableConfig({ ...business });
      setSavedSuccess(false);
    }
  }, [isOpen]);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBusiness(editableConfig);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-orange-400 bg-orange-950 px-2 py-0.5 rounded border border-orange-800">
                BUSINESS OWNER CONSOLE
              </span>
              <span className="text-xs text-slate-400">Live Management</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white mt-1">
              Website Leads &amp; Business Configuration
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchLeads}
              disabled={loading}
              title="Refresh Data"
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('quotes')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'quotes'
                ? 'border-orange-600 text-orange-600 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Quote Inquiries ({quotes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inspections')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'inspections'
                ? 'border-orange-600 text-orange-600 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Booked Inspections ({inspections.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'config'
                ? 'border-orange-600 text-orange-600 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Edit Business Information</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'quotes' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>Leads submitted through the online quote form</span>
                <span>Sorted newest first</span>
              </div>

              {quotes.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No quote inquiries submitted yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {quotes.map((q) => (
                    <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900">{q.id}</span>
                          <span className="font-semibold text-slate-700">{q.name}</span>
                          <span className="text-[10px] uppercase font-mono bg-orange-100 text-orange-800 px-2 py-0.5 rounded">
                            {q.service}
                          </span>
                        </div>
                        <span className="text-slate-400 text-[11px] font-mono">
                          {new Date(q.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-600">
                        <div>Phone: <strong className="text-slate-800">{q.phone}</strong></div>
                        <div>Email: <strong className="text-slate-800">{q.email || 'None'}</strong></div>
                        <div>ZIP Code: <strong className="text-slate-800">{q.zip}</strong> ({q.propertyType})</div>
                      </div>

                      {q.notes && (
                        <div className="p-2.5 bg-slate-50 rounded-lg text-slate-700 italic border border-slate-100">
                          "{q.notes}"
                        </div>
                      )}

                      {q.photosCount > 0 && (
                        <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{q.photosCount} roof photo(s) attached by homeowner</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'inspections' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>Inspections scheduled via the calendar scheduler</span>
                <span>Awaiting field technician assignment</span>
              </div>

              {inspections.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No inspection requests scheduled yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {inspections.map((ins) => (
                    <div key={ins.bookingId} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900">{ins.bookingId}</span>
                          <span className="font-semibold text-slate-700">{ins.name}</span>
                          <span className="text-[10px] uppercase font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                            {ins.inspectionType}
                          </span>
                        </div>
                        <span className="text-slate-400 text-[11px] font-mono">
                          Booked: {new Date(ins.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-600">
                        <div>Date: <strong className="text-slate-900">{ins.date}</strong></div>
                        <div>Window: <strong className="text-slate-900">{ins.timeSlot}</strong></div>
                        <div>Phone: <strong className="text-slate-900">{ins.phone}</strong></div>
                      </div>

                      <div className="text-slate-700">
                        Address: <strong>{ins.address}, {ins.zip}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'config' && (
            <form onSubmit={handleSaveConfig} className="space-y-6">
              {savedSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Business configuration updated across the entire website successfully!</span>
                </div>
              )}

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Master Configuration Notice:</strong> Updating these fields changes the business name, address, phone numbers, and license metadata throughout the entire frontend and schema structured data in real time.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Company Legal Name</label>
                  <input
                    type="text"
                    value={editableConfig.name}
                    onChange={(e) => setEditableConfig({ ...editableConfig, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Brand Short Name</label>
                  <input
                    type="text"
                    value={editableConfig.shortName}
                    onChange={(e) => setEditableConfig({ ...editableConfig, shortName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Display Phone Number</label>
                  <input
                    type="text"
                    value={editableConfig.phoneDisplay}
                    onChange={(e) => setEditableConfig({ ...editableConfig, phoneDisplay: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Estimating Email</label>
                  <input
                    type="email"
                    value={editableConfig.email}
                    onChange={(e) => setEditableConfig({ ...editableConfig, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-700 block mb-1">Full Physical Office Address</label>
                  <input
                    type="text"
                    value={editableConfig.address.full}
                    onChange={(e) => setEditableConfig({
                      ...editableConfig,
                      address: { ...editableConfig.address, full: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">State License Title / Number</label>
                  <input
                    type="text"
                    value={editableConfig.credentials.licenseTitle}
                    onChange={(e) => setEditableConfig({
                      ...editableConfig,
                      credentials: { ...editableConfig.credentials, licenseTitle: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Insurance Policy Description</label>
                  <input
                    type="text"
                    value={editableConfig.credentials.insuranceCoverage}
                    onChange={(e) => setEditableConfig({
                      ...editableConfig,
                      credentials: { ...editableConfig.credentials, insuranceCoverage: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Standard Working Hours</label>
                  <input
                    type="text"
                    value={editableConfig.workingHours.weekdays}
                    onChange={(e) => setEditableConfig({
                      ...editableConfig,
                      workingHours: { ...editableConfig.workingHours, weekdays: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Emergency Availability Text</label>
                  <input
                    type="text"
                    value={editableConfig.workingHours.emergency}
                    onChange={(e) => setEditableConfig({
                      ...editableConfig,
                      workingHours: { ...editableConfig.workingHours, emergency: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-semibold shadow"
                >
                  Save Business Details
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};