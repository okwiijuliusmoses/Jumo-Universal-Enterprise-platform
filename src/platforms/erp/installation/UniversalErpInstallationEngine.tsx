import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Key, 
  Globe, 
  Palette, 
  Package, 
  Users, 
  Award, 
  Laptop,
  Check
} from 'lucide-react';

interface UniversalErpInstallationEngineProps {
  onCompleteInstallation?: (tenantData: any) => void;
  onCancel?: () => void;
}

export const ERP_FAMILIES = [
  { id: 'JUMO-FINPAY', name: 'Financial & Digital Pay Platform', desc: 'Consolidated Financial Accounting & Universal Payment Switch', icon: '🏦', modulesCount: 120 },
  { id: 'JUMO-EDU-ALUMNI', name: 'Education & Alumni ERP', desc: 'Universal Education Management & Institutional Advancement', icon: '🎓', modulesCount: 150 },
  { id: 'JUMO-CHURCH', name: 'Church & Diocese ERP', desc: 'Authoritative Faith-Based Governance & Administration', icon: '⛪', modulesCount: 80 },
  { id: 'JUMO-CONTROL', name: 'Sovereign Control Center', desc: 'AEGIS Security, AI Command & Platform Orchestration', icon: '🛡️', modulesCount: 60 },
];

export const UniversalErpInstallationEngine: React.FC<UniversalErpInstallationEngineProps> = ({
  onCompleteInstallation,
  onCancel
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedFamily, setSelectedFamily] = useState<string>('JUMO-EDU-ALUMNI');

  // Step 2: Profile
  const [institutionName, setInstitutionName] = useState<string>('JUMO International University');
  const [shortCode, setShortCode] = useState<string>('JIU');
  const [regNumber, setRegNumber] = useState<string>('REG-2026-9901');
  const [country, setCountry] = useState<string>('Kenya');
  const [region, setRegion] = useState<string>('Nairobi');
  const [address, setAddress] = useState<string>('12 Enterprise Way, Tech Campus');
  const [contactEmail, setContactEmail] = useState<string>('admin@jiu.ac.ke');
  const [contactPhone, setContactPhone] = useState<string>('+254 700 000 000');
  const [customDomain, setCustomDomain] = useState<string>('jiu.jumo.app');

  // Step 3: Branding
  const [slogan, setSlogan] = useState<string>('Excellence Through Digital Transformation');
  const [mission, setMission] = useState<string>('To empower future leaders through innovative education and technology.');
  const [vision, setVision] = useState<string>('A premier global research institution driven by digital intelligence.');
  const [primaryColor, setPrimaryColor] = useState<string>('#0078D4');
  const [secondaryColor, setSecondaryColor] = useState<string>('#107C41');
  const [logoUrl, setLogoUrl] = useState<string>('https://images.unsplash.com/photo-1562774053-701939374585?w=150&auto=format&fit=crop&q=80');

  // Step 4: Modules Activation
  const [selectedModules, setSelectedModules] = useState<Record<string, boolean>>({
    'Admissions & Student Information System': true,
    'FAAP Ledger & Fees Management': true,
    'Examinations & Automated Grading': true,
    'Digital Library & E-Learning': true,
    'Research & Grants Administration': true,
    'Hostel & Housing Allocation': true,
    'Fleet & Fleet Management': false,
    'International Student Portal': true,
  });

  // Step 5: Admin Credentials
  const [adminName, setAdminName] = useState<string>('Dr. Sarah Jenkins');
  const [adminEmail, setAdminEmail] = useState<string>('vc@jiu.ac.ke');
  const [adminRole, setAdminRole] = useState<string>('Vice Chancellor / Ring-1 Admin');

  const [isInstalling, setIsInstalling] = useState<boolean>(false);
  const [installationProgress, setInstallationProgress] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleStartProvisioning = () => {
    setIsInstalling(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setInstallationProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsInstalling(false);
        setIsCompleted(true);
      }
    }, 400);
  };

  const activeFamilyObj = ERP_FAMILIES.find(f => f.id === selectedFamily) || ERP_FAMILIES[0];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden max-w-5xl mx-auto my-4 animate-in fade-in duration-300">
      {/* Installation Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 border-b border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 font-bold text-xl shadow-inner">
            <Laptop className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-mono font-bold rounded-full mb-1">
              JUMO UEOS PHASE 14
            </div>
            <h1 className="text-xl font-black tracking-tight">Universal ERP Installation Engine</h1>
            <p className="text-xs text-slate-300">Provision & brand institutional operating environments</p>
          </div>
        </div>

        {/* Wizard Step Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-mono font-bold bg-slate-900/80 p-2 rounded-xl border border-slate-800">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition ${
                currentStep === s
                  ? 'bg-blue-600 text-white shadow-xs'
                  : currentStep > s
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-500'
              }`}
            >
              {currentStep > s ? '✓' : s}
            </div>
          ))}
        </div>
      </div>

      {/* Main Wizard Area */}
      <div className="p-8">
        {!isInstalling && !isCompleted && (
          <>
            {/* STEP 1: SELECT ERP FAMILY */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Step 1: Select ERP Family</h2>
                  <p className="text-xs text-slate-500">
                    Choose the institutional ecosystem model to install. Each family includes 100 specialized modules, FAAP financial backbone, and AEGIS security.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {ERP_FAMILIES.map((fam) => {
                    const isSelected = selectedFamily === fam.id;
                    return (
                      <button
                        key={fam.id}
                        onClick={() => setSelectedFamily(fam.id)}
                        className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between space-y-3 ${
                          isSelected
                            ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-500/30 shadow-md'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-3xl">{fam.icon}</span>
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-mono text-[10px] font-bold rounded-md">
                            {fam.modulesCount} Modules
                          </span>
                        </div>
                        <div>
                          <div className="font-extrabold text-sm text-slate-900">{fam.name}</div>
                          <div className="text-xs text-slate-500">{fam.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={onCancel}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md"
                  >
                    Next: Institution Profile
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: INSTITUTION PROFILE SETUP */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Step 2: Institution Legal Profile</h2>
                  <p className="text-xs text-slate-500">
                    Define official institutional identity parameters and custom portal domain routing.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Official Institution Legal Name *</label>
                    <input
                      type="text"
                      value={institutionName}
                      onChange={(e) => setInstitutionName(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Institution Short Code / Acronym *</label>
                    <input
                      type="text"
                      value={shortCode}
                      onChange={(e) => setShortCode(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono font-bold text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Registration / Charter Number</label>
                    <input
                      type="text"
                      value={regNumber}
                      onChange={(e) => setRegNumber(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Country & Region</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                      />
                      <input
                        type="text"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Official Contact Email</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Custom JUMO Portal Subdomain</label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={customDomain}
                        onChange={(e) => setCustomDomain(e.target.value)}
                        className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono font-bold text-blue-700"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md"
                  >
                    Next: Institutional Branding
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: BRANDING & SLOGAN */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Step 3: Institutional Branding & Slogan</h2>
                  <p className="text-xs text-slate-500">
                    Customize public web portals, headers, footers, certificates, and JUMO Institutional Assistant identity.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1 md:col-span-2">
                    <label className="font-bold text-slate-700">Official Slogan / Motto</label>
                    <input
                      type="text"
                      value={slogan}
                      onChange={(e) => setSlogan(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Mission Statement</label>
                    <textarea
                      rows={2}
                      value={mission}
                      onChange={(e) => setMission(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Vision Statement</label>
                    <textarea
                      rows={2}
                      value={vision}
                      onChange={(e) => setVision(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Primary Brand Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer border-0"
                      />
                      <input
                        type="text"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="p-2 border border-slate-300 rounded-lg font-mono text-xs w-28"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Secondary Accent Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer border-0"
                      />
                      <input
                        type="text"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="p-2 border border-slate-300 rounded-lg font-mono text-xs w-28"
                      />
                    </div>
                  </div>
                </div>

                {/* Live Banner Preview */}
                <div className="p-4 rounded-2xl text-white space-y-1 shadow-md" style={{ backgroundColor: primaryColor }}>
                  <div className="text-[10px] font-mono uppercase text-white/70 font-bold">Public Portal Header Preview</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-black text-base">{institutionName}</div>
                      <div className="text-xs text-white/90 italic">"{slogan}"</div>
                    </div>
                    <span className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold backdrop-blur-xs">
                      JUMO {activeFamilyObj.name.replace(' ERP', '')} Assistant Online
                    </span>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md"
                  >
                    Next: Module Activation
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: MODULE SELECTION */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Step 4: Module Activation & Tiers</h2>
                  <p className="text-xs text-slate-500">
                    Choose modules to activate immediately. Deactivated modules remain in storage and can be enabled anytime from Owner Control Center.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {Object.entries(selectedModules).map(([mod, active]) => (
                    <div
                      key={mod}
                      onClick={() => setSelectedModules(prev => ({ ...prev, [mod]: !prev[mod] }))}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                        active
                          ? 'bg-blue-50/70 border-blue-400 text-blue-900 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <span>{mod}</span>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center font-bold ${
                        active ? 'bg-blue-600 text-white' : 'border border-slate-300 bg-white'
                      }`}>
                        {active && '✓'}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-800">
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>FAAP Financial Backbone & AEGIS Security Included Automatically</span>
                  </div>
                  <span className="font-mono text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2.5 py-1 rounded-lg">
                    1.5% Settlement Active
                  </span>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md"
                  >
                    Next: Administrator Account
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: ADMINISTRATOR PROVISIONING */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Step 5: Administrator Provisioning & Go-Live</h2>
                  <p className="text-xs text-slate-500">
                    Assign initial institutional executive administrator credentials.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Administrator Full Name</label>
                    <input
                      type="text"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Administrator Email</label>
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>
                </div>

                <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-3 font-mono text-xs border border-slate-800">
                  <div className="flex items-center justify-between text-amber-300 font-bold border-b border-slate-800 pb-2">
                    <span>INSTITUTION PROVISIONING SUMMARY</span>
                    <span>{shortCode}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-slate-300">
                    <div>ERP Family: <span className="text-white font-bold">{activeFamilyObj.name}</span></div>
                    <div>Domain: <span className="text-blue-400 font-bold">{customDomain}</span></div>
                    <div>Active Modules: <span className="text-emerald-400 font-bold">{Object.values(selectedModules).filter(Boolean).length} Active</span></div>
                    <div>Security Engine: <span className="text-purple-400 font-bold">AEGIS Zero-Trust</span></div>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={handleStartProvisioning}
                    className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black tracking-wide transition shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    PROVISION & DEPLOY INSTITUTION ENVIRONMENT
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* INSTALLATION PROGRESS STATE */}
        {isInstalling && (
          <div className="py-12 text-center space-y-6 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center animate-spin">
              <Laptop className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-slate-900">Provisioning {institutionName}...</h3>
              <p className="text-xs text-slate-500 font-mono">
                Generating tenant workspace, registering FAAP double-entry accounts, initializing JUMO {activeFamilyObj.name.replace(' ERP', '')} Assistant...
              </p>
            </div>

            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200 p-0.5">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${installationProgress}%` }}
              ></div>
            </div>

            <div className="text-xs font-mono font-bold text-slate-600">
              {installationProgress}% Complete
            </div>
          </div>
        )}

        {/* COMPLETED SUCCESS STATE */}
        {isCompleted && (
          <div className="py-8 text-center space-y-6 max-w-xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg border-2 border-emerald-300">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-mono font-bold rounded-full">
                INSTITUTION ENVIRONMENT LIVE
              </div>
              <h2 className="text-2xl font-black text-slate-900">{institutionName}</h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Your institutional operating platform is provisioned and running on domain <span className="font-mono font-bold text-blue-600">{customDomain}</span>.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-left space-y-2 font-mono">
              <div className="flex justify-between border-b pb-1">
                <span className="text-slate-500">Public Portal Gateway:</span>
                <span className="font-bold text-blue-600">https://{customDomain}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-slate-500">Executive Admin:</span>
                <span className="font-bold text-slate-900">{adminEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Financial Ledger:</span>
                <span className="font-bold text-emerald-600">FAAP Ledger Synchronized</span>
              </div>
            </div>

            <button
              onClick={() => onCompleteInstallation?.({
                institutionName,
                shortCode,
                selectedFamily,
                customDomain,
                primaryColor,
                secondaryColor,
                slogan
              })}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg transition cursor-pointer"
            >
              Open Institutional Configuration Studio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
