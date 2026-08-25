import React, { useState } from 'react';
import { 
  Building2, GraduationCap, Users, HeartPulse, Church, Landmark, 
  DollarSign, ShoppingBag, Cpu, CheckCircle2, ArrowRight, ShieldCheck, 
  Sparkles, Layers, Sliders, RefreshCw, Plus, PackageCheck, Download
} from 'lucide-react';
import { domainRegistryService, MASTER_DOMAIN_PACKAGES, DomainFamily, DomainPackage } from '../../../src/core/runtime/domainRegistry';

export interface MarketplaceViewProps {
  onNavigate?: (route: string) => void;
  onSelectInstall?: (packageId: string) => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ onNavigate, onSelectInstall }) => {
  const [selectedFamily, setSelectedFamily] = useState<DomainFamily | 'ALL'>('ALL');
  const [selectedPackage, setSelectedPackage] = useState<DomainPackage | null>(null);

  // Installation Wizard Modal State
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [targetPackage, setTargetPackage] = useState<DomainPackage | null>(null);
  const [selectedEdition, setSelectedEdition] = useState<string>('');
  const [tenantName, setTenantName] = useState<string>('');
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [isProvisioning, setIsProvisioning] = useState<boolean>(false);
  const [installSuccess, setInstallSuccess] = useState<boolean>(false);

  const families: { name: DomainFamily; icon: any; count: number }[] = [
    { name: 'JUMO FINTECH', icon: DollarSign, count: 1 },
    { name: 'Education & Alumni ERP', icon: GraduationCap, count: 1 },
    { name: 'Church & Diocese ERP', icon: Church, count: 1 }
  ];

  const packages = domainRegistryService.getAllPackages();

  const filteredPackages = selectedFamily === 'ALL' 
    ? packages 
    : packages.filter(p => p.family === selectedFamily);

  const handleStartWizard = (pkg: DomainPackage) => {
    setTargetPackage(pkg);
    setSelectedEdition(pkg.editions[0] || 'Standard');
    setTenantName(`${pkg.name} Sovereign Tenant`);
    setSelectedModules([...pkg.modules]);
    setWizardStep(1);
    setWizardOpen(true);
    setInstallSuccess(false);
  };

  const handleCompleteWizard = () => {
    if (!targetPackage) return;
    setIsProvisioning(true);
    setTimeout(() => {
      domainRegistryService.installPackage(targetPackage.id, tenantName, selectedEdition);
      setIsProvisioning(false);
      setInstallSuccess(true);
    }, 1500);
  };

  return (
    <div className="space-y-6 text-slate-900 font-sans p-6 max-w-7xl mx-auto">
      {/* Marketplace Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-blue-500 text-white font-mono text-[10px] font-bold rounded uppercase">
              JUMO UEOS MARKETPLACE v28.0
            </span>
            <span className="text-xs text-blue-200">Universal Enterprise Domain Registry</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            JUMO Enterprise Marketplace
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Discover, provision, and deploy enterprise domain packages across 8 industry families. Every domain package inherits Zero-Trust Security, FAAP Financial Ledger, Workflow Automation, and Gemini AI.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate && onNavigate('/platform/erp/install')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Provision Custom ERP Package
          </button>
        </div>
      </div>

      {/* Industry Categories Explorer Tabs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#0078D4]" />
            Enterprise Industry Categories
          </h3>
          <span className="text-xs text-slate-500 font-medium">{packages.length} Packages Available</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedFamily('ALL')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap border flex items-center gap-2 cursor-pointer ${
              selectedFamily === 'ALL'
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            All Enterprise Solutions ({packages.length})
          </button>

          {families.map(fam => {
            const Icon = fam.icon;
            const isSelected = selectedFamily === fam.name;
            return (
              <button
                key={fam.name}
                onClick={() => setSelectedFamily(fam.name)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap border flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0078D4] text-white border-[#0078D4] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#0078D4]'}`} />
                {fam.name} ({fam.count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Package Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPackages.map(pkg => {
          const isInstalled = pkg.status === 'installed';
          return (
            <div 
              key={pkg.id} 
              className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-5 shadow-xs flex flex-col justify-between gap-4 transition group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-800 text-[10px] font-mono font-bold rounded-md border border-slate-200">
                    {pkg.family}
                  </span>
                  {isInstalled ? (
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold rounded border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> INSTALLED
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-mono font-bold rounded border border-blue-200">
                      v{pkg.version}
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-extrabold text-base text-slate-900 group-hover:text-[#0078D4] transition">
                    {pkg.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px]">
                  <div className="flex justify-between text-slate-500">
                    <span>Editions:</span>
                    <span className="font-bold text-slate-700">{pkg.editions.length} Available</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Core Modules:</span>
                    <span className="font-bold text-slate-700">{pkg.modules.length} Modules</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>AI Assistant:</span>
                    <span className="font-bold text-blue-600">{pkg.aiAgents[0]}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                {isInstalled ? (
                  <button
                    onClick={() => onNavigate && onNavigate('/platform/erp')}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Open Installed Workspace <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleStartWizard(pkg)}
                    className="w-full py-2 bg-[#0078D4] hover:bg-blue-600 text-white rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" /> Install Package
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Installation Wizard Modal */}
      {wizardOpen && targetPackage && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden text-slate-900 font-sans">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-blue-300 font-bold block uppercase">
                  PROVISIONING WIZARD • STEP {wizardStep} OF 5
                </span>
                <h3 className="text-lg font-black">{targetPackage.name} Installation</h3>
              </div>
              <button
                onClick={() => setWizardOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {!installSuccess ? (
                <>
                  {/* Step Indicators */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 text-xs font-bold text-slate-400">
                    <span className={wizardStep === 1 ? 'text-[#0078D4]' : ''}>1. Industry</span>
                    <span>→</span>
                    <span className={wizardStep === 2 ? 'text-[#0078D4]' : ''}>2. Application</span>
                    <span>→</span>
                    <span className={wizardStep === 3 ? 'text-[#0078D4]' : ''}>3. Edition</span>
                    <span>→</span>
                    <span className={wizardStep === 4 ? 'text-[#0078D4]' : ''}>4. Modules</span>
                    <span>→</span>
                    <span className={wizardStep === 5 ? 'text-[#0078D4]' : ''}>5. Provision</span>
                  </div>

                  {wizardStep === 1 && (
                    <div className="space-y-3">
                      <h4 className="font-extrabold text-sm text-slate-900">Step 1: Confirm Industry Category</h4>
                      <p className="text-xs text-slate-600">Selected Family: <strong>{targetPackage.family}</strong></p>
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                        <div className="font-bold text-xs text-slate-800">Target Requirements:</div>
                        <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                          <li>FAAP General Ledger Integration</li>
                          <li>Zero-Trust RBAC Authentication</li>
                          <li>Gemini AI Copilot Activation</li>
                          <li>Scale-to-Zero Container Provisioning</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {wizardStep === 2 && (
                    <div className="space-y-3">
                      <h4 className="font-extrabold text-sm text-slate-900">Step 2: Tenant Name Configuration</h4>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Tenant Workspace Title</label>
                        <input
                          type="text"
                          value={tenantName}
                          onChange={(e) => setTenantName(e.target.value)}
                          className="w-full p-2.5 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}

                  {wizardStep === 3 && (
                    <div className="space-y-3">
                      <h4 className="font-extrabold text-sm text-slate-900">Step 3: Choose Enterprise Edition</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {targetPackage.editions.map(ed => (
                          <div
                            key={ed}
                            onClick={() => setSelectedEdition(ed)}
                            className={`p-3 border rounded-xl cursor-pointer transition flex items-center justify-between ${
                              selectedEdition === ed ? 'bg-blue-50 border-blue-500 font-bold' : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span className="text-xs text-slate-900">{ed}</span>
                            {selectedEdition === ed && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {wizardStep === 4 && (
                    <div className="space-y-3">
                      <h4 className="font-extrabold text-sm text-slate-900">Step 4: Select Included Domain Modules</h4>
                      <div className="max-h-48 overflow-y-auto space-y-1.5 border border-slate-200 rounded-xl p-3">
                        {targetPackage.modules.map(mod => (
                          <label key={mod} className="flex items-center gap-2 text-xs font-medium text-slate-800 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedModules.includes(mod)}
                              onChange={(e) => {
                                if (e.target.checked) setSelectedModules([...selectedModules, mod]);
                                else setSelectedModules(selectedModules.filter(m => m !== mod));
                              }}
                              className="rounded text-blue-600"
                            />
                            {mod}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {wizardStep === 5 && (
                    <div className="space-y-3">
                      <h4 className="font-extrabold text-sm text-slate-900">Step 5: Review & Provision Workspace</h4>
                      <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2 font-mono text-xs">
                        <div>Package: {targetPackage.name} v{targetPackage.version}</div>
                        <div>Tenant: {tenantName}</div>
                        <div>Edition: {selectedEdition}</div>
                        <div>Modules: {selectedModules.length} Enabled</div>
                        <div>AI Agent: {targetPackage.aiAgents[0]}</div>
                        <div className="text-emerald-400 font-bold border-t border-slate-800 pt-2 mt-2">
                          Status: Ready to initialize on JUMO UEOS Kernel
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setWizardStep(Math.max(1, wizardStep - 1))}
                      disabled={wizardStep === 1}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs disabled:opacity-50"
                    >
                      Back
                    </button>

                    {wizardStep < 5 ? (
                      <button
                        onClick={() => setWizardStep(wizardStep + 1)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs"
                      >
                        Next Step
                      </button>
                    ) : (
                      <button
                        onClick={handleCompleteWizard}
                        disabled={isProvisioning}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        {isProvisioning ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" /> Provisioning Workspace...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4" /> Provision Now
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">Enterprise Workspace Provisioned!</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    <strong>{tenantName}</strong> has been created on the JUMO UEOS Kernel. All FAAP ledger routes, RBAC permissions, and AI agent endpoints are active.
                  </p>

                  <button
                    onClick={() => {
                      setWizardOpen(false);
                      if (onNavigate) onNavigate('/platform/erp');
                    }}
                    className="px-6 py-2.5 bg-[#0078D4] text-white rounded-xl font-bold text-xs shadow-md hover:bg-blue-600 transition"
                  >
                    Launch Workspace Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketplaceView;
