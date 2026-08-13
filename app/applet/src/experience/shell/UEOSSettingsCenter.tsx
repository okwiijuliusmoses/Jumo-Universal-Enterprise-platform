import React, { useState } from "react";
import { Settings, Shield, Bell, Monitor, Key, Check } from "lucide-react";

export interface UEOSSettings {
  lightTheme: boolean;
  uiDensity: string;
  animationsEnabled: boolean;
  sidebarDefaultState: string;
  defaultLandingWorkspace: string;
  rememberLastWorkspace: boolean;
  tableDensity: string;
  rememberedTabs: string[];
  inspectorPosition: string;
  notifyOps: boolean;
  notifySecurity: boolean;
  notifyDeploy: boolean;
  notifyAI: boolean;
  notifyMigration: boolean;
  sessionTimeoutMinutes: number;
  rbacVisibility: boolean;
  requireSignatureKey: boolean;
  operatorIdentityName: string;
  refreshStrategy: string;
  realtimeConnectionEnabled: boolean;
  offlineSyncSchedule: string;
  keyboardNavActive: boolean;
  reducedMotion: boolean;
  focusIndicatorsEnabled: boolean;
}

interface UEOSSettingsCenterProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UEOSSettings;
  onSave: (prefs: UEOSSettings) => void;
}

export function UEOSSettingsCenter({ isOpen, onClose, preferences, onSave }: UEOSSettingsCenterProps) {
  const [prefs, setPrefs] = useState<UEOSSettings>(preferences);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(prefs);
    localStorage.setItem("jumo_ueos_settings_v1", JSON.stringify(prefs));
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-indigo-400" />
            <div>
              <h2 className="text-lg font-black tracking-tight">UEOS Sovereign Settings Center</h2>
              <p className="text-xs text-slate-400">Configure operational parameters, notifications, and telemetry</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-sm font-bold">✕</button>
        </div>
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50">
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Operator Identification</h3>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-slate-900">Operator Name</label>
                <p className="text-[11px] text-slate-500">Name attached to sovereign manufacturing audits</p>
              </div>
              <input
                type="text"
                value={prefs.operatorIdentityName}
                onChange={e => setPrefs({ ...prefs, operatorIdentityName: e.target.value })}
                className="px-3 py-1.5 text-xs bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Interface & Theme</h3>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-slate-900">Animations Enabled</label>
                <p className="text-[11px] text-slate-500">Enable smooth UI transitions across studios</p>
              </div>
              <input
                type="checkbox"
                checked={prefs.animationsEnabled}
                onChange={e => setPrefs({ ...prefs, animationsEnabled: e.target.checked })}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
        <div className="p-4 bg-white border-t border-slate-200 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-all">Cancel</button>
          <button onClick={handleSave} className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2">
            {saved ? <Check size={14} className="text-emerald-400" /> : null}
            {saved ? "Saved Successfully" : "Save Preferences"}
          </button>
        </div>
      </div>
    </div>
  );
}
