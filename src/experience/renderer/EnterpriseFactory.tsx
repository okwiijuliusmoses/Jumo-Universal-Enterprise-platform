
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Plus, 
  Settings, 
  Shield, 
  ChevronRight, 
  Layers, 
  Database, 
  CheckCircle2,
  Loader2,
  ArrowRight,
  Globe
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function EnterpriseFactory() {
  const [step, setStep] = useState(1);
  const [ecosystems, setEcosystems] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedEcosystem, setSelectedEcosystem] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null);
  const [config, setConfig] = useState({
    name: "",
    country: "",
    region: "",
    operator: ""
  });
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      const ecoData = await UEOSRuntimeClient.fetchEcosystems();
      const templateData = await UEOSRuntimeClient.fetchTemplates();
      setEcosystems(ecoData || []);
      setTemplates(templateData || []);
    }
    loadData();
  }, []);

  const handleProvision = async () => {
    setIsProvisioning(true);
    try {
      const data = await UEOSRuntimeClient.provisionPlatform(selectedTemplate.id, config);
      setResult(data.instance);
      setStep(4);
    } catch (err) {
      alert("Manufacturing failed: Kernel rejected blueprint configuration.");
    } finally {
      setIsProvisioning(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      <div className="text-center">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Enterprise Manufacturing Engine</h2>
        <p className="text-slate-500 mt-2 font-medium">Provision sovereign institutional platforms from national blueprints.</p>
      </div>

      {/* Stepper Header */}
      <div className="flex items-center justify-center gap-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
              step === s ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : 
              step > s ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
            }`}>
              {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
            </div>
            {s < 3 && <div className={`w-12 h-0.5 rounded-full ${step > s ? "bg-emerald-200" : "bg-slate-100"}`} />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 p-10">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-slate-800">Select Enterprise Ecosystem</h3>
              <p className="text-sm text-slate-400 font-medium">Choose the national industry category for the new platform.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ecosystems.map((eco) => (
                <button
                  key={eco.id}
                  onClick={() => { setSelectedEcosystem(eco.id); setStep(2); }}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/30 transition-all text-left group"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block font-bold text-slate-800 group-hover:text-blue-700">{eco.name}</span>
                    <span className="text-xs text-slate-400 leading-tight block mt-1">{eco.description}</span>
                  </div>
                </button>
              ))}
              {ecosystems.length === 0 && (
                 <div className="col-span-full py-10 text-center text-slate-400 font-medium italic border-2 border-dashed border-slate-100 rounded-2xl">
                    Awaiting National Ecosystem Registration...
                 </div>
              )}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Select Enterprise Template</h3>
                <p className="text-sm text-slate-400 font-medium">Choose a validated blueprint for the {selectedEcosystem} ecosystem.</p>
              </div>
              <button onClick={() => setStep(1)} className="text-xs font-bold text-blue-600 hover:underline">Change Ecosystem</button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {templates.filter(t => t.ecosystemId === selectedEcosystem).map((temp) => (
                <button
                  key={temp.id}
                  onClick={() => { setSelectedTemplate(temp); setStep(3); }}
                  className="flex items-center justify-between p-6 rounded-2xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/30 transition-all text-left"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                      <Layers className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="block text-lg font-black text-slate-900 leading-tight">{temp.name}</span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{temp.version}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-slate-300" />
                </button>
              ))}
              {templates.filter(t => t.ecosystemId === selectedEcosystem).length === 0 && (
                 <div className="py-10 text-center text-slate-400 font-medium italic border-2 border-dashed border-slate-100 rounded-2xl">
                    No approved blueprints found for this ecosystem.
                 </div>
              )}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-slate-800">Institutional Configuration</h3>
              <p className="text-sm text-slate-400 font-medium">Define the sovereign identity for the new platform instance.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Institution Name</label>
                <input 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100"
                  placeholder="e.g. Sovereign University of Uganda"
                  value={config.name}
                  onChange={e => setConfig({...config, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Country / Jurisdiction</label>
                <input 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100"
                  placeholder="e.g. Uganda"
                  value={config.country}
                  onChange={e => setConfig({...config, country: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Region / Campus</label>
                <input 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100"
                  placeholder="e.g. Kampala Main Hub"
                  value={config.region}
                  onChange={e => setConfig({...config, region: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Operator Authority</label>
                <input 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100"
                  placeholder="e.g. Ministry of Education"
                  value={config.operator}
                  onChange={e => setConfig({...config, operator: e.target.value})}
                />
              </div>
            </div>

            <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
              <button onClick={() => setStep(2)} className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-2xl">Back</button>
              <button 
                onClick={handleProvision}
                disabled={isProvisioning || !config.name}
                className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-slate-200 disabled:opacity-50"
              >
                {isProvisioning ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Settings className="w-5 h-5" /> Manufacture Platform</>}
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-10">
            <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="text-3xl font-black text-slate-900">Manufacturing Successful</h3>
            <p className="text-slate-500 mt-4 max-w-md mx-auto leading-relaxed">
              The sovereign enterprise platform for <span className="text-slate-900 font-bold">{result?.name}</span> has been manufactured and deployed to the UEOS Runtime.
            </p>
            <div className="mt-10 p-6 bg-slate-50 rounded-3xl border border-slate-100 text-left max-w-sm mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-black">
                   NS
                </div>
                <div>
                   <span className="block font-bold text-slate-800">{result?.name}</span>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{result?.id}</span>
                </div>
              </div>
              <div className="space-y-2">
                 <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">Status</span>
                    <span className="text-emerald-600">Operational</span>
                 </div>
                 <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">Nodes Provisioned</span>
                    <span className="text-slate-800">14 Active Nodes</span>
                 </div>
              </div>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="mt-12 bg-blue-600 text-white px-12 py-4 rounded-2xl font-black flex items-center justify-center gap-3 mx-auto shadow-xl shadow-blue-100"
            >
              Open Platform Workspace
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
