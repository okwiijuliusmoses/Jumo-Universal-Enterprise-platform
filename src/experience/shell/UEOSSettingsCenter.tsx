// JUMO UEOS — Consolidated Settings Center Component
// Governs platform preferences, UI density, notification filters, security policy, and offline sync schedules.

import React, { useState, useEffect } from "react";
import { 
  X, Settings, Eye, Sliders, Shield, Bell, Network, HelpCircle, Check, Key
} from "lucide-react";

export interface UEOSSettings {
  // Appearance
  lightTheme: boolean;
  uiDensity: "compact" | "comfortable";
  animationsEnabled: boolean;
  // Navigation
  sidebarDefaultState: "expanded" | "collapsed";
  defaultLandingWorkspace: string;
  rememberLastWorkspace: boolean;
  // Workspace
  tableDensity: "dense" | "comfortable";
  rememberedTabs: string[];
  inspectorPosition: "side" | "drawer";
  // Notifications
  notifyOps: boolean;
  notifySecurity: boolean;
  notifyDeploy: boolean;
  notifyAI: boolean;
  notifyMigration: boolean;
  // Security
  sessionTimeoutMinutes: number;
  rbacVisibility: boolean;
  requireSignatureKey: boolean;
  operatorIdentityName: string;
  // Runtime
  refreshStrategy: "polling" | "manual";
  realtimeConnectionEnabled: boolean;
  offlineSyncSchedule: "instant" | "batch_5m" | "manual";
  // Accessibility
  keyboardNavActive: boolean;
  reducedMotion: boolean;
  focusIndicatorsEnabled: boolean;
}

const DEFAULT_SETTINGS: UEOSSettings = {
  lightTheme: true,
  uiDensity: "comfortable",
  animationsEnabled: true,
  sidebarDefaultState: "expanded",
  defaultLandingWorkspace: "command",
  rememberLastWorkspace: true,
  tableDensity: "comfortable",
  rememberedTabs: ["command"],
  inspectorPosition: "side",
  notifyOps: true,
  notifySecurity: true,
  notifyDeploy: true,
  notifyAI: true,
  notifyMigration: true,
  sessionTimeoutMinutes: 60,
  rbacVisibility: true,
  requireSignatureKey: false,
  operatorIdentityName: "Sovereign Operator Alpha",
  refreshStrategy: "polling",
  realtimeConnectionEnabled: true,
  offlineSyncSchedule: "instant",
  keyboardNavActive: true,
  reducedMotion: false,
  focusIndicatorsEnabled: true
};

interface UEOSSettingsCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: UEOSSettings) => void;
  settings?: UEOSSettings;
}

export function UEOSSettingsCenter({ isOpen, onClose, onSave, settings: initialSettings }: UEOSSettingsCenterProps) {
  const [settings, setSettings] = useState<UEOSSettings>(initialSettings || DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState<"appearance" | "navigation" | "workspace" | "notifications" | "security" | "runtime" | "accessibility">("appearance");
  const [saveConfirmation, setSaveConfirmation] = useState(false);

  useEffect(() => {
    let saved = null;
    try { saved = localStorage.getItem("jumo_ueos_settings_v1"); } catch(e) {}
    if (saved) {
      try {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(saved) });
      } catch (err) {
        console.error("Failed to parse JUMO settings, using defaults.", err);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUpdate = <K extends keyof UEOSSettings>(key: K, value: UEOSSettings[K]) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveAll = () => {
    try { localStorage.setItem("jumo_ueos_settings_v1", JSON.stringify(settings)); } catch (e) {}
    onSave(settings);
    setSaveConfirmation(true);
    setTimeout(() => {
      setSaveConfirmation(false);
      onClose();
    }, 1000);
  };

  const tabs = [
    { id: "appearance" as const, label: "Appearance", icon: Eye },
    { id: "navigation" as const, label: "Navigation", icon: Sliders },
    { id: "workspace" as const, label: "Workspace", icon: Settings },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "security" as const, label: "Security & Keys", icon: Shield },
    { id: "runtime" as const, label: "Runtime & Sync", icon: Network },
    { id: "accessibility" as const, label: "Accessibility", icon: HelpCircle }
  ];

  return (
    <div 
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-[100] p-4"
      id="ueos-settings-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl max-w-4xl w-full h-[600px] flex flex-col overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-800 animate-spin-slow" />
            <div>
              <h2 id="settings-title" className="text-sm font-extrabold text-slate-900">UEOS Platform Settings Center</h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Sovereign Administration Console</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            aria-label="Close settings"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content body split into left list, right details */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Tabs Sidebar */}
          <div className="w-48 bg-slate-50/40 border-r border-slate-100 py-4 px-2 space-y-1">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                    isSelected 
                      ? "bg-slate-100 text-slate-900" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  <TabIcon className={`w-4 h-4 shrink-0 ${isSelected ? "text-blue-600" : "text-slate-400"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Configuration Panel */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-700">
            
            {/* 1. Appearance settings */}
            {activeTab === "appearance" && (
              <div className="space-y-4 animate-in fade-in-50 duration-150">
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Visual Identity Preferences</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <div>
                      <label className="font-extrabold text-xs text-slate-900 block">Sovereign Light Scheme</label>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Enforces the pristine white/light theme. Disable for standard dark.</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={settings.lightTheme}
                      onChange={(e) => handleUpdate("lightTheme", e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <div>
                      <label className="font-extrabold text-xs text-slate-900 block">UI Density Scale</label>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Compact reduces spacing and fonts for maximum data density.</span>
                    </div>
                    <select
                      value={settings.uiDensity}
                      onChange={(e) => handleUpdate("uiDensity", e.target.value as any)}
                      className="bg-white border border-slate-200 rounded-lg text-xs font-bold py-1.5 px-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="comfortable">Comfortable (OS Standard)</option>
                      <option value="compact">Compact (High density)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <div>
                      <label className="font-extrabold text-xs text-slate-900 block">Motion Canvas Transitions</label>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Renders responsive micro-animations on workspace switching.</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={settings.animationsEnabled}
                      onChange={(e) => handleUpdate("animationsEnabled", e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2. Navigation settings */}
            {activeTab === "navigation" && (
              <div className="space-y-4 animate-in fade-in-50 duration-150">
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Sidebar & Shell Navigation</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <div>
                      <label className="font-extrabold text-xs text-slate-900 block">Left Rail Default State</label>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Sets if the rail starts fully expanded or collapsed on boot.</span>
                    </div>
                    <select
                      value={settings.sidebarDefaultState}
                      onChange={(e) => handleUpdate("sidebarDefaultState", e.target.value as any)}
                      className="bg-white border border-slate-200 rounded-lg text-xs font-bold py-1.5 px-2.5 text-slate-800"
                    >
                      <option value="expanded">Expanded (Labels + Icons)</option>
                      <option value="collapsed">Collapsed (Icons only)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <div>
                      <label className="font-extrabold text-xs text-slate-900 block">Default Landing Area</label>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Primary workspace to load immediately upon signing in.</span>
                    </div>
                    <select
                      value={settings.defaultLandingWorkspace}
                      onChange={(e) => handleUpdate("defaultLandingWorkspace", e.target.value)}
                      className="bg-white border border-slate-200 rounded-lg text-xs font-bold py-1.5 px-2.5 text-slate-800"
                    >
                      <option value="overview">Kernel Telemetry</option>
                      <option value="products">Products & Platforms</option>
                      <option value="fintech">JUMO FINTECH SACCO</option>
                      <option value="faap">FAAP Double-Entry Ledger</option>
                      <option value="aegis">Aegis Zero-Trust Security</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <div>
                      <label className="font-extrabold text-xs text-slate-900 block">Restore Previous Workspace</label>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Remember which workspace tab you had active across reloads.</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={settings.rememberLastWorkspace}
                      onChange={(e) => handleUpdate("rememberLastWorkspace", e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. Workspace settings */}
            {activeTab === "workspace" && (
              <div className="space-y-4 animate-in fade-in-50 duration-150">
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Workspace Canvas Preferences</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <div>
                      <label className="font-extrabold text-xs text-slate-900 block">Table Layout Row Density</label>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Adjust vertical cell padding across all operational data tables.</span>
                    </div>
                    <select
                      value={settings.tableDensity}
                      onChange={(e) => handleUpdate("tableDensity", e.target.value as any)}
                      className="bg-white border border-slate-200 rounded-lg text-xs font-bold py-1.5 px-2.5 text-slate-800"
                    >
                      <option value="comfortable">Comfortable rows</option>
                      <option value="dense">Dense compact rows</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <div>
                      <label className="font-extrabold text-xs text-slate-900 block">Right Inspector Panel Layout</label>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Sets if inspectors open as side-by-side splits or floating panels.</span>
                    </div>
                    <select
                      value={settings.inspectorPosition}
                      onChange={(e) => handleUpdate("inspectorPosition", e.target.value as any)}
                      className="bg-white border border-slate-200 rounded-lg text-xs font-bold py-1.5 px-2.5 text-slate-800"
                    >
                      <option value="side">Side Inspector (Splitscreen)</option>
                      <option value="drawer">Right Overlay Drawer</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Notifications settings */}
            {activeTab === "notifications" && (
              <div className="space-y-4 animate-in fade-in-50 duration-150">
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Alert & Message Dispatches</h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <div>
                      <span className="font-extrabold text-xs text-slate-900 block">Operational Stream Alerts</span>
                      <span className="text-[10px] text-slate-500">Alerts on critical system transitions and operational events.</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={settings.notifyOps}
                      onChange={(e) => handleUpdate("notifyOps", e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <div>
                      <span className="font-extrabold text-xs text-slate-900 block">Sovereign Security AEGIS Alerts</span>
                      <span className="text-[10px] text-slate-500">Alerts for packet threats, drift audits, and file mutations.</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={settings.notifySecurity}
                      onChange={(e) => handleUpdate("notifySecurity", e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <div>
                      <span className="font-extrabold text-xs text-slate-900 block">Staging & Release Promotions</span>
                      <span className="text-[10px] text-slate-500">Receive system confirmations of canary promotions.</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={settings.notifyDeploy}
                      onChange={(e) => handleUpdate("notifyDeploy", e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <div>
                      <span className="font-extrabold text-xs text-slate-900 block">AI Workforce Swarm Updates</span>
                      <span className="text-[10px] text-slate-500">Updates when agents complete workspace tasks or switch roles.</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={settings.notifyAI}
                      onChange={(e) => handleUpdate("notifyAI", e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 5. Security & keys */}
            {activeTab === "security" && (
              <div className="space-y-4 animate-in fade-in-50 duration-150">
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Access Policies & Signatures</h3>

                <div className="space-y-4">
                  <div>
                    <label className="font-extrabold text-xs text-slate-900 block">Operator Identity Name</label>
                    <input 
                      type="text"
                      value={settings.operatorIdentityName}
                      onChange={(e) => handleUpdate("operatorIdentityName", e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 mt-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <div>
                      <label className="font-extrabold text-xs text-slate-900 block">Show RBAC Roles on Navigation</label>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Displays clearance clearances next to signature badges.</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={settings.rbacVisibility}
                      onChange={(e) => handleUpdate("rbacVisibility", e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <div>
                      <label className="font-extrabold text-xs text-slate-900 block">Require Cryptographic Signature Key</label>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Prevents mutations unless an operator's key is validated.</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={settings.requireSignatureKey}
                      onChange={(e) => handleUpdate("requireSignatureKey", e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 6. Runtime settings */}
            {activeTab === "runtime" && (
              <div className="space-y-4 animate-in fade-in-50 duration-150">
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Runtime & Synchroneity Engines</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <div>
                      <label className="font-extrabold text-xs text-slate-900 block">Kernel Refresh Mode</label>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Sets whether the applet polls database states automatically.</span>
                    </div>
                    <select
                      value={settings.refreshStrategy}
                      onChange={(e) => handleUpdate("refreshStrategy", e.target.value as any)}
                      className="bg-white border border-slate-200 rounded-lg text-xs font-bold py-1.5 px-2.5 text-slate-800"
                    >
                      <option value="polling">Active Polling (Every 5s)</option>
                      <option value="manual">Manual Pull (On-demand)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <div>
                      <label className="font-extrabold text-xs text-slate-900 block">Active Realtime Channels</label>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Enables immediate socket streams for incoming operations ledger.</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={settings.realtimeConnectionEnabled}
                      onChange={(e) => handleUpdate("realtimeConnectionEnabled", e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <div>
                      <label className="font-extrabold text-xs text-slate-900 block">Air-Gap Reconcile Sync Interval</label>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Sets batch synchronization schedule when reclaiming offline connections.</span>
                    </div>
                    <select
                      value={settings.offlineSyncSchedule}
                      onChange={(e) => handleUpdate("offlineSyncSchedule", e.target.value as any)}
                      className="bg-white border border-slate-200 rounded-lg text-xs font-bold py-1.5 px-2.5 text-slate-800"
                    >
                      <option value="instant">Instantaneous flush</option>
                      <option value="batch_5m">Buffered batch (5 mins)</option>
                      <option value="manual">Manual operator trigger</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* 7. Accessibility settings */}
            {activeTab === "accessibility" && (
              <div className="space-y-4 animate-in fade-in-50 duration-150">
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Sovereign Accessibility Console</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <div>
                      <label className="font-extrabold text-xs text-slate-900 block">Keyboard Controller Traps</label>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Enables alt + arrows navigation, cmd+k focus, and escape bounds.</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={settings.keyboardNavActive}
                      onChange={(e) => handleUpdate("keyboardNavActive", e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <div>
                      <label className="font-extrabold text-xs text-slate-900 block">Reduced Motion Canvas</label>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Removes sliding, scaling, or pulsing canvas animations.</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={settings.reducedMotion}
                      onChange={(e) => handleUpdate("reducedMotion", e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <div>
                      <label className="font-extrabold text-xs text-slate-900 block">High contrast focus rings</label>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Renders strong 2px solid indicators around targeted items.</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={settings.focusIndicatorsEnabled}
                      onChange={(e) => handleUpdate("focusIndicatorsEnabled", e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Footer controls */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
            Configuration version: v5.6.0
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              disabled={saveConfirmation}
              className="px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5 disabled:bg-emerald-600"
            >
              {saveConfirmation ? (
                <>
                  <Check className="w-4 h-4" />
                  Saved Cleanly!
                </>
              ) : (
                "Save Preferences"
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
