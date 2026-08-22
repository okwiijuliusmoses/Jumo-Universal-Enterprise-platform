import React, { useState } from 'react';
import { 
  DollarSign, Heart, Award, Plus, CheckCircle, 
  TrendingUp, Users, ShieldCheck, ArrowRight
} from 'lucide-react';
import { AlumniErpService } from '../../domain/AlumniErpService';
import { GivingCampaign } from '../../domain/types';

export const AlumniGivingModule: React.FC = () => {
  const service = AlumniErpService.getInstance();
  const [campaigns, setCampaigns] = useState<GivingCampaign[]>(service.getCampaigns());
  const [selectedCampaign, setSelectedCampaign] = useState<GivingCampaign | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(100);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampaign || donationAmount <= 0) return;

    service.recordDonation(selectedCampaign.id, donationAmount);
    setCampaigns(service.getCampaigns());
    setSuccessMessage(`Thank you for your generous gift of $${donationAmount.toLocaleString()} to "${selectedCampaign.title}"!`);
    setTimeout(() => {
      setSelectedCampaign(null);
      setSuccessMessage('');
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Endowments, Giving & Class Gifts</h2>
          <p className="text-slate-500 text-xs mt-0.5">Capital endowment funds, student scholarship drives, and legacy infrastructure projects.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Launch Campaign</span>
          </button>
        </div>
      </div>

      {/* Campaign Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map(camp => {
          const progress = Math.min(100, Math.round((camp.currentAmountUSD / camp.targetAmountUSD) * 100));
          return (
            <div key={camp.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 uppercase">
                    {camp.category.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {camp.status}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 mb-1">{camp.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-4">{camp.description}</p>

                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Raised:</span>
                    <span className="font-bold text-slate-900">${camp.currentAmountUSD.toLocaleString()} of ${camp.targetAmountUSD.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-rose-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{progress}% funded</span>
                    <span>{camp.donorCount} donors</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedCampaign(camp)}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>Pledge or Donate</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Donation Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            {successMessage ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Donation Recorded</h3>
                <p className="text-xs text-slate-600">{successMessage}</p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                  <h3 className="text-base font-bold text-slate-900">Alumni Contribution</h3>
                  <button 
                    onClick={() => setSelectedCampaign(null)}
                    className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-xs text-slate-600 mb-4">
                  Contributing to <strong className="text-slate-900">{selectedCampaign.title}</strong>
                </p>

                <form onSubmit={handleDonate} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Select Amount (USD)</label>
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      {[50, 100, 250, 500].map(amt => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setDonationAmount(amt)}
                          className={`py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                            donationAmount === amt 
                              ? 'bg-rose-50 border-rose-600 text-rose-700' 
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      min="5"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(parseInt(e.target.value) || 0)}
                      className="w-full p-2 text-xs border border-slate-200 rounded-lg"
                      placeholder="Custom amount"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setSelectedCampaign(null)}
                      className="px-4 py-2 text-slate-600 text-xs font-semibold hover:bg-slate-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-lg hover:bg-rose-500 transition-colors flex items-center gap-1.5"
                    >
                      <DollarSign className="w-4 h-4" />
                      <span>Confirm Pledge</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
