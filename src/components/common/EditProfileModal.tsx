import React, { useState, useEffect } from 'react';
import { User, Building, Briefcase, MapPin, X, Check, Shield } from 'lucide-react';

export interface EditProfileData {
  employer: string;
  jobTitle: string;
  locationCity: string;
}

export interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EditProfileData) => void;
  initialData?: Partial<EditProfileData>;
  userName?: string;
  credentialTitle?: string;
  accentColor?: 'rose' | 'emerald' | 'amber' | 'indigo' | 'blue' | 'purple';
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  userName = 'Member Profile',
  credentialTitle = 'Digital Identity Card',
  accentColor = 'rose'
}) => {
  const [employer, setEmployer] = useState(initialData?.employer || '');
  const [jobTitle, setJobTitle] = useState(initialData?.jobTitle || '');
  const [locationCity, setLocationCity] = useState(initialData?.locationCity || '');
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEmployer(initialData?.employer || '');
      setJobTitle(initialData?.jobTitle || '');
      setLocationCity(initialData?.locationCity || '');
      setSavedToast(false);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      employer: employer.trim(),
      jobTitle: jobTitle.trim(),
      locationCity: locationCity.trim()
    });
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 600);
  };

  const getAccentBg = () => {
    switch (accentColor) {
      case 'emerald': return 'bg-emerald-600 hover:bg-emerald-700 text-white';
      case 'amber': return 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold';
      case 'indigo': return 'bg-indigo-600 hover:bg-indigo-700 text-white';
      case 'blue': return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'purple': return 'bg-purple-600 hover:bg-purple-700 text-white';
      default: return 'bg-rose-600 hover:bg-rose-700 text-white';
    }
  };

  const getAccentBadge = () => {
    switch (accentColor) {
      case 'emerald': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'amber': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'indigo': return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
      case 'blue': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'purple': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      default: return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg border ${getAccentBadge()}`}>
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 id="edit-profile-title" className="text-sm font-bold text-white">Edit Profile</h2>
              <p className="text-[11px] text-slate-400">{userName} • {credentialTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>Current Employer / Organization</span>
            </label>
            <input
              type="text"
              value={employer}
              onChange={(e) => setEmployer(e.target.value)}
              placeholder="e.g. Oxford Fellows / Tech Hospital / JUMO Enterprise"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
              <span>Job Title / Professional Role</span>
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Principal Counsel / Senior Architect / Dean"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Location City</span>
            </label>
            <input
              type="text"
              value={locationCity}
              onChange={(e) => setLocationCity(e.target.value)}
              placeholder="e.g. Kampala, London, Nairobi, New York"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
              required
            />
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-[11px] text-slate-400">
            <div className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sovereign Identity Signed</span>
            </div>
            {savedToast && (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Saved!
              </span>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-colors shadow-lg ${getAccentBg()}`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
