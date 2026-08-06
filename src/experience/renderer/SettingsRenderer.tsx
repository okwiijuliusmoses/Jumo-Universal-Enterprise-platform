
import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Settings, 
  Globe, 
  Shield, 
  Bell, 
  Database, 
  Key, 
  Cpu, 
  Layout, 
  ChevronRight,
  Save,
  CheckCircle2
} from "lucide-react";

export function SettingsRenderer() {
  const [activeCategory, setActiveCategory] = useState("platform");
  const [isSaved, setIsSaved] = useState(false);

  const categories = [
    { id: "platform", label: "Platform Configuration", icon: Cpu },
    { id: "identity", label: "Identity & Access", icon: Key },
    { id: "security", label: "Security Policies", icon: Shield },
    { id: "branding", label: "Branding & UI", icon: Layout },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "storage", label: "Storage & Backups", icon: Database },
    { id: "localization", label: "Localization", icon: Globe },
  ];

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">System Settings</h2>
          <p className="text-slate-500">Global runtime configuration and enterprise defaults.</p>
        </div>
        <button 
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg ${
            isSaved ? "bg-emerald-500 text-white shadow-emerald-100" : "bg-slate-900 text-white shadow-slate-200 hover:bg-slate-800"
          }`}
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {isSaved ? "Settings Applied" : "Save Configurations"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 min-h-0">
        <div className="lg:col-span-1 space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                activeCategory === cat.id 
                  ? "bg-white border border-slate-100 text-slate-900 font-bold shadow-sm ring-1 ring-slate-50" 
                  : "text-slate-500 hover:bg-white/50 hover:text-slate-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <cat.icon className={`w-4 h-4 ${activeCategory === cat.id ? "text-blue-600" : "text-slate-400"}`} />
                <span className="text-sm truncate">{cat.label}</span>
              </div>
              {activeCategory === cat.id && <ChevronRight className="w-4 h-4 text-slate-300" />}
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-sm p-10 overflow-y-auto">
          {activeCategory === "platform" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Platform Runtime Configuration</h3>
                <p className="text-sm text-slate-500">Manage global engine parameters and kernel behavior.</p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Instance Manufacturing Engine</label>
                    <select className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100 transition-all">
                      <option>Sovereign Factory v2.4 (Active)</option>
                      <option>Legacy Blueprint Engine v1.8</option>
                      <option>Experimental Dynamic Mapper</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Registry Synchronization</label>
                    <select className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100 transition-all">
                      <option>Real-time (Recommended)</option>
                      <option>Batch (Every 60s)</option>
                      <option>Manual Only</option>
                    </select>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Advanced Telemetry</h4>
                      <p className="text-xs text-slate-500">Collect granular performance metrics for individual micro-kernel services.</p>
                    </div>
                    <div className="w-12 h-6 bg-blue-600 rounded-full relative flex items-center px-1">
                       <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Automated Garbage Collection</h4>
                      <p className="text-xs text-slate-500">Periodically clear transient registry buffers and inactive session states.</p>
                    </div>
                    <div className="w-12 h-6 bg-blue-600 rounded-full relative flex items-center px-1">
                       <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeCategory === "identity" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
               <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Identity & Access Settings</h3>
                <p className="text-sm text-slate-500">Configure global authentication providers and session policies.</p>
              </div>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <span className="text-sm font-bold text-slate-700">Enforce Multi-Factor Authentication (MFA)</span>
                    <div className="w-12 h-6 bg-blue-600 rounded-full relative flex items-center px-1">
                       <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm" />
                    </div>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <span className="text-sm font-bold text-slate-700">Session Timeout (Minutes)</span>
                    <input type="number" defaultValue={60} className="w-20 bg-white border border-slate-200 p-2 rounded-lg text-sm text-right font-bold" />
                 </div>
              </div>
            </div>
          )}

          {activeCategory === "security" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
               <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Security Enforcement Policies</h3>
                <p className="text-sm text-slate-500">Define sovereign firewall rules and Zero-Trust parameters.</p>
              </div>
              <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl">
                 <h4 className="text-sm font-bold text-amber-800 mb-2">Administrative Firewall</h4>
                 <p className="text-xs text-amber-700">Restrict access to the Kernel Control Center to authorized VPC networks only.</p>
                 <div className="mt-4 flex gap-2">
                    <input className="flex-1 bg-white border border-amber-200 p-2 rounded-lg text-xs" placeholder="0.0.0.0/0" />
                    <button className="bg-amber-600 text-white px-3 py-1 rounded-lg text-xs font-bold">Restrict</button>
                 </div>
              </div>
            </div>
          )}

          {["branding", "notifications", "storage", "localization"].includes(activeCategory) && (
            <div className="h-full flex flex-col items-center justify-center text-center p-20 animate-in fade-in duration-300">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
                  {React.createElement(categories.find(c => c.id === activeCategory)?.icon || Settings, { className: "w-10 h-10" })}
               </div>
               <h3 className="text-xl font-bold text-slate-800 mb-2">{categories.find(c => c.id === activeCategory)?.label}</h3>
               <p className="text-slate-500 max-w-sm">
                  Active configuration parameters for this domain are currently managed by the Kernel registry. 
                  Modifications are restricted to Sovereign Administrators.
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
