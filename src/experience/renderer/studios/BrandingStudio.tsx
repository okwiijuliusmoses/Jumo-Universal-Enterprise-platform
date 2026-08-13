import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Palette, Type, Image as ImageIcon, Layout, Eye, 
  Accessibility, Globe, Lock, Save, RefreshCw, 
  CheckCircle2, Hexagon, Fingerprint, Shield
} from 'lucide-react';

export const BrandingStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'identity' | 'theme' | 'experience'>('identity');
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setLastSaved(new Date().toLocaleTimeString());
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fadeIn" id="branding-experience-studio">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-pink-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/20">
            <Palette className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Application Branding & Experience Studio</h2>
            <p className="text-xs text-slate-500 font-semibold">Institutional Identity, Visual Language & Public Experience Control</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {lastSaved && (
            <span className="text-[10px] font-bold text-slate-400">Last deployed: {lastSaved}</span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-blue-600 transition-all flex items-center gap-2 shadow-xs disabled:opacity-50 cursor-pointer"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Deploy Branding</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {[
          { id: 'identity', label: 'Institutional Identity', icon: Hexagon },
          { id: 'theme', label: 'Visual Theme', icon: Palette },
          { id: 'experience', label: 'User Experience', icon: Layout },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === tab.id 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Control Panel */}
        <div className="lg:col-span-8 space-y-6">
          {activeTab === 'identity' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Institution Details */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                    <Hexagon className="w-4 h-4 text-pink-600" />
                    Core Identity
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Institution Name</label>
                      <input 
                        type="text" 
                        defaultValue="JUMO National Enterprise"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Slogan / Descriptor</label>
                      <input 
                        type="text" 
                        defaultValue="Sovereign Digital Infrastructure for the Future"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Logo Control */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-pink-600" />
                    Symbolism & Logos
                  </h3>
                  <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center space-y-3">
                    <div className="w-16 h-16 bg-white rounded-2xl border border-slate-200 flex items-center justify-center shadow-sm">
                      <Hexagon className="w-8 h-8 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500">SVG, PNG, or WEBP supported</p>
                      <button className="mt-2 text-xs font-black text-pink-600 hover:text-pink-700 transition-colors uppercase tracking-wider">Upload Master Emblem</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-2 mb-4">
                  <Fingerprint className="w-4 h-4 text-pink-600" />
                  Legal & Sovereignty Badges
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-900 uppercase">Seal of Origin</span>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Cryptographically signed badge verifying the sovereign origin of the instance.</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-900 uppercase">Regulatory Badge</span>
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Visible compliance mark for national data residency and privacy standards.</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 opacity-50">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-900 uppercase">Security Tier</span>
                      <Lock className="w-3 h-3" />
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Authorized security classification level indicator (Official/Secret).</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Color Palette */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                    <Palette className="w-4 h-4 text-pink-600" />
                    Enterprise Palette
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Accent</label>
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-xl bg-pink-600 border border-slate-200"></div>
                          <input type="text" defaultValue="#DB2777" className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sovereign Blue</label>
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-xl bg-blue-900 border border-slate-200"></div>
                          <input type="text" defaultValue="#1E3A8A" className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Typography */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                    <Type className="w-4 h-4 text-pink-600" />
                    Typography System
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Display Typeface</label>
                      <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all">
                        <option>Inter (Universal System)</option>
                        <option>Playfair Display (Institutional)</option>
                        <option>Plus Jakarta Sans (Modern)</option>
                        <option>Geist (Monospaced Technical)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Body Text Hierarchy</label>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-pink-600 w-3/4"></div>
                        </div>
                        <span className="text-[10px] font-black text-slate-900">1.250 Ratio</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Landing Experience */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                    <Globe className="w-4 h-4 text-pink-600" />
                    Public Landing & Login
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <div>
                        <span className="text-[10px] font-black text-slate-900 uppercase block">Public Landing Page</span>
                        <span className="text-[9px] text-slate-500 font-medium">Visible to unauthenticated users</span>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-pink-600 focus:ring-pink-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <div>
                        <span className="text-[10px] font-black text-slate-900 uppercase block">Sovereign Login Shield</span>
                        <span className="text-[9px] text-slate-500 font-medium">Enhanced institutional auth portal</span>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-pink-600 focus:ring-pink-500" />
                    </div>
                  </div>
                </div>

                {/* Accessibility & Modes */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                    <Accessibility className="w-4 h-4 text-pink-600" />
                    Inclusive Experience
                  </h3>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <div>
                        <span className="text-[10px] font-black text-slate-900 uppercase block">High Contrast Mode</span>
                        <span className="text-[9px] text-slate-500 font-medium">WCAG 2.1 Level AAA support</span>
                      </div>
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pink-600 focus:ring-pink-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <div>
                        <span className="text-[10px] font-black text-slate-900 uppercase block">Reduced Motion</span>
                        <span className="text-[9px] text-slate-500 font-medium">Minimize layout shifts & animations</span>
                      </div>
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pink-600 focus:ring-pink-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Preview & Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-[520px]">
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Eye className="w-3.5 h-3.5" />
                Live Brand Preview
              </h4>
              <span className="text-[9px] font-mono text-emerald-500 uppercase font-black">Active Stream</span>
            </div>
            
            <div className="flex-1 bg-slate-100 p-4 overflow-y-auto">
              {/* Mock Application Frame */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xl h-full overflow-hidden flex flex-col">
                <div className="h-10 bg-blue-900 flex items-center px-3 justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-pink-600 rounded-md flex items-center justify-center">
                      <Hexagon className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-[9px] font-black text-white uppercase tracking-tight">JUMO UEOS</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  <div className="space-y-1">
                    <div className="h-3 w-2/3 bg-slate-100 rounded-md"></div>
                    <div className="h-2 w-full bg-slate-50 rounded-md"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-16 bg-slate-50 rounded-lg border border-slate-100"></div>
                    <div className="h-16 bg-slate-50 rounded-lg border border-slate-100"></div>
                  </div>
                  <button className="w-full py-2 bg-pink-600 text-white rounded-lg text-[9px] font-black uppercase tracking-wider shadow-sm shadow-pink-500/20">
                    Primary Action
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <p className="text-[10px] font-black text-slate-200 uppercase tracking-wider">Sovereign Brand Lock</p>
                  <p className="text-[9px] text-slate-500 font-medium">All visual assets are hashed and stored in the secure national repository.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Deployment Status
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span className="text-slate-500">Identity Assets</span>
                <span className="text-emerald-600 uppercase">Synchronized</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span className="text-slate-500">Theme Variables</span>
                <span className="text-emerald-600 uppercase">Synchronized</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span className="text-slate-500">Public Portal</span>
                <span className="text-blue-600 uppercase">Awaiting Update</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
