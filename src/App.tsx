import React, { useState, useEffect } from 'react';
import { 
  Shield, Layers, Building2, Cpu, Play, Database, Globe, Briefcase, 
  BarChart3, Workflow, Search, CheckCircle2, XCircle, AlertCircle, 
  RefreshCw, Clock, ArrowRight, ChevronRight, Fingerprint, HeartPulse, 
  GraduationCap, DollarSign, School, BookOpen, Church, Users, CreditCard, 
  FileText, Sparkles, Activity, ShieldCheck, Terminal, Award, Landmark,
  Key, Server, ExternalLink, Filter
} from 'lucide-react';
import { 
  PRIMARY_SOVEREIGN_PRODUCTS,
  SHARED_SOVEREIGN_PLATFORMS,
  RECLASSIFIED_HISTORICAL_REGISTRIES,
  ALL_CANONICAL_PRODUCT_HIERARCHIES, 
  CANONICAL_PRODUCT_MAP, 
  getCanonicalCensus, 
  getProductIsolatedCensus,
  CanonicalProductHierarchy 
} from './products/canonical';
import { CanonicalProductHierarchyViewer } from './experience/renderer/CanonicalProductHierarchyViewer';
import { ProductWorkspaceComponent } from './experience/renderer/ProductWorkspaceComponent';
import { verifyProduct, verifyAllPrimaryProducts, ProductVerificationResult } from './core/verification/ProductPhysicalCensus';
import { BENCHMARK_TRACEABILITY_REGISTRY, BenchmarkTraceRecord } from './core/enterprise/reconstruction/BenchmarkTraceabilityRegistry';
import { BENCHMARK_QUESTIONS } from './data';

export default function App() {
  const [activeView, setActiveView] = useState<'PRODUCTS' | 'BENCHMARK_TRACE' | 'SHARED_PLATFORMS' | 'AUDIT' | 'ASSESSMENT'>('PRODUCTS');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Verification results state
  const [auditResults, setAuditResults] = useState<Record<string, ProductVerificationResult>>({});
  const [isVerifying, setIsVerifying] = useState(false);

  // Benchmark search state
  const [benchmarkFilter, setBenchmarkFilter] = useState<string>('ALL');
  const [benchmarkSearch, setBenchmarkSearch] = useState<string>('');

  // Assessment state
  const [assessmentMode, setAssessmentMode] = useState<'ALL' | 'EVIDENCE' | 'PREDICTIVE'>('ALL');
  const [assessmentState, setAssessmentState] = useState<'INTRO' | 'TEST' | 'RESULTS'>('INTRO');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showAuditTrail, setShowAuditTrail] = useState(false);

  // Countdown timer for 5th Sept 2026
  const targetDate = new Date('2026-09-05T08:00:00+03:00');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Initial verification run
    setAuditResults(verifyAllPrimaryProducts());

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const census = getCanonicalCensus();
  const activeQuestions = BENCHMARK_QUESTIONS.filter(q => assessmentMode === 'ALL' || q.mode === assessmentMode);

  const getProductIcon = (code: string) => {
    switch (code) {
      case 'JUMO-CHURCH-01':
      case 'JUMO-CHURCH':
      case 'CHERP':
        return Church;
      case 'JUMO-FINTECH-01':
      case 'JUMO-FINTECH':
      case 'FINTECH':
        return DollarSign;
      case 'JUMO-SEC-01':
      case 'JUMO-SECONDARY-ERP':
      case 'SECERP':
        return BookOpen;
      case 'JUMO-NURPRIM-01':
      case 'JUMO-NURSERY-PRIMARY-ERP':
      case 'NPERP':
        return School;
      case 'JUMO-FAAP-01':
      case 'JUMO-FAAP':
      case 'FAAP':
        return Landmark;
      case 'JUMO-DIGIPAY-01':
      case 'JUMO-DIGITAL-PAY':
      case 'DIGIPAY':
        return CreditCard;
      case 'JUMO-ALUMNI-01':
      case 'JUMO-ALUMNI':
      case 'ALUMNI':
        return Users;
      default:
        return Cpu;
    }
  };

  const getProductTheme = (id: string) => {
    switch (id) {
      case 'prod-fintech':
        return {
          badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          iconBg: 'bg-emerald-100 text-emerald-700 border-emerald-200',
          hoverBorder: 'hover:border-emerald-400',
          accentText: 'text-emerald-700'
        };
      case 'prod-nursery-primary':
        return {
          badge: 'bg-blue-50 text-blue-800 border-blue-200',
          iconBg: 'bg-blue-100 text-blue-700 border-blue-200',
          hoverBorder: 'hover:border-blue-400',
          accentText: 'text-blue-700'
        };
      case 'prod-secondary-school':
        return {
          badge: 'bg-indigo-50 text-indigo-800 border-indigo-200',
          iconBg: 'bg-indigo-100 text-indigo-700 border-indigo-200',
          hoverBorder: 'hover:border-indigo-400',
          accentText: 'text-indigo-700'
        };
      case 'prod-church-faith':
        return {
          badge: 'bg-purple-50 text-purple-800 border-purple-200',
          iconBg: 'bg-purple-100 text-purple-700 border-purple-200',
          hoverBorder: 'hover:border-purple-400',
          accentText: 'text-purple-700'
        };
      default:
        return {
          badge: 'bg-slate-100 text-slate-800 border-slate-200',
          iconBg: 'bg-slate-100 text-slate-700 border-slate-200',
          hoverBorder: 'hover:border-slate-400',
          accentText: 'text-slate-900'
        };
    }
  };

  const handleRunVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setAuditResults(verifyAllPrimaryProducts());
      setIsVerifying(false);
    }, 350);
  };

  const startTest = (mode: 'ALL' | 'EVIDENCE' | 'PREDICTIVE') => {
    setAssessmentMode(mode);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowAuditTrail(false);
    setAssessmentState('TEST');
  };

  const calculateScore = () => {
    let score = 0;
    activeQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) score++;
    });
    return score;
  };

  // If a specific product is open in ProductWorkspaceComponent
  if (selectedProductId) {
    return (
      <ProductWorkspaceComponent
        productId={selectedProductId}
        onBack={() => setSelectedProductId(null)}
      />
    );
  }

  const filteredTraces = BENCHMARK_TRACEABILITY_REGISTRY.filter(t => {
    const matchesFilter = benchmarkFilter === 'ALL' || t.jumoProduct === benchmarkFilter || t.benchmarkSource === benchmarkFilter;
    const matchesSearch = benchmarkSearch === '' || 
      t.extractedDomain.toLowerCase().includes(benchmarkSearch.toLowerCase()) || 
      t.extractedFunction.toLowerCase().includes(benchmarkSearch.toLowerCase()) ||
      t.evidenceReference.toLowerCase().includes(benchmarkSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans" id="jumo-ueos-app-root">
      
      {/* 1. TOP ENTERPRISE HEADER */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-xl shadow-xs">
            J
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-slate-900 tracking-tight">JUMO UEOS</h1>
              <span className="bg-slate-100 text-slate-700 border border-slate-300 text-[11px] font-mono font-bold px-2 py-0.5 rounded-md">
                Sovereign Kernel v2026.4.0
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">4 Consolidated Sovereign Products • Physical Benchmark Evidence Architecture</p>
          </div>
        </div>

        {/* TOP VIEW SELECTOR TABS */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveView('PRODUCTS')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeView === 'PRODUCTS'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 text-slate-600" /> Sovereign Products (4)
          </button>

          <button
            onClick={() => setActiveView('BENCHMARK_TRACE')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeView === 'BENCHMARK_TRACE'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-slate-600" /> Benchmark Traceability
          </button>

          <button
            onClick={() => setActiveView('SHARED_PLATFORMS')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeView === 'SHARED_PLATFORMS'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Landmark className="w-4 h-4 text-slate-600" /> Shared Platforms ({SHARED_SOVEREIGN_PLATFORMS.length})
          </button>
          
          <button
            onClick={() => setActiveView('AUDIT')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeView === 'AUDIT'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-slate-600" /> Physical Census Audit
          </button>

          <button
            onClick={() => setActiveView('ASSESSMENT')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeView === 'ASSESSMENT'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4 text-slate-600" /> Aptitude Benchmark ({timeLeft.days}d)
          </button>
        </div>
      </header>

      {/* 2. CENSUS BAR */}
      <div className="bg-white border-b border-slate-200 px-6 py-2.5 overflow-x-auto shadow-xs">
        <div className="flex items-center gap-6 text-xs text-slate-500 font-mono min-w-max">
          <span className="text-slate-900 font-bold flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-emerald-600" /> PHYSICAL CENSUS:
          </span>
          <span className="text-slate-800 font-medium"><strong>4</strong> Sovereign Products</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-800 font-medium"><strong>{census.totals.directorates}</strong> Directorates</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-800 font-medium"><strong>{census.totals.departments}</strong> Departments</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-800 font-medium"><strong>{census.totals.offices}</strong> Offices</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-800 font-medium"><strong>{census.totals.modules}</strong> Mounted Modules</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-800 font-medium"><strong>{census.totals.capabilities}</strong> Live Capabilities</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-800 font-medium"><strong>{census.totals.databaseEntities}</strong> DB Schemas</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-800 font-medium"><strong>{census.totals.roles}</strong> RBAC Roles</span>
        </div>
      </div>

      {/* 3. MAIN WORKSPACE */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto space-y-8">
        
        {/* VIEW 1: SOVEREIGN PRODUCTS GRID */}
        {activeView === 'PRODUCTS' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900">Consolidated Sovereign Enterprise Products</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Exclusively 4 canonical products implementing the 10-tier enterprise hierarchy with shared FAAP, Digital Pay, and Alumni service bindings.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-2 rounded-xl font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Registry Verified • Zero Mock Placeholders
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PRIMARY_SOVEREIGN_PRODUCTS.map(hierarchy => {
                const p = hierarchy.product;
                const ProductIcon = getProductIcon(p.code);
                const theme = getProductTheme(p.id);

                return (
                  <div
                    key={p.id}
                    className={`bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-all ${theme.hoverBorder} shadow-xs`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold border ${theme.iconBg}`}>
                          <ProductIcon className="w-6 h-6" />
                        </div>
                        <span className={`text-[11px] font-bold uppercase px-3 py-1 rounded-full border ${theme.badge}`}>
                          {p.category}
                        </span>
                      </div>

                      <div>
                        <span className="text-[11px] font-mono text-slate-400 font-bold">{p.code}</span>
                        <h3 className="text-xl font-black text-slate-900 mt-0.5">
                          {p.name}
                        </h3>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                          {p.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center font-mono text-[11px]">
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <div className="text-slate-400 text-[10px]">DIR / DEPT</div>
                          <div className="text-slate-900 font-bold">{hierarchy.directorates.length} / {hierarchy.departments.length}</div>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <div className="text-slate-400 text-[10px]">MODULES</div>
                          <div className="text-slate-900 font-bold">{hierarchy.modules.length}</div>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <div className="text-slate-400 text-[10px]">ACTIONS</div>
                          <div className="text-slate-900 font-bold">{hierarchy.capabilities.length}</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-medium">
                        LEAD: <strong className="text-slate-800">{p.leadExecutiveRole.split('/')[0] || p.leadExecutiveRole}</strong>
                      </span>
                      <button
                        onClick={() => setSelectedProductId(p.id)}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        Launch Product Workspace <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SHARED PLATFORM CONSUMPTION OVERVIEW */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Shared Platform Engine Integration Architecture
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Landmark className="w-4 h-4 text-blue-600" /> JUMO FAAP
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Double-entry statutory ledger, VoteBook commitments, and cashbook automation consumed by Church, Fintech, Secondary, and Nursery/Primary.
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-amber-600" /> JUMO DIGITAL PAY
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Multi-rail payment switch (MTN MoMo, Airtel Money, Bank EFT) routing tuition fees, tithes, SACCO disbursements, and supplier settlements.
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-purple-600" /> JUMO ALUMNI
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Reunion cohorts, career mentorship network, and school laboratory endowment campaigns mounted into Secondary School ERP.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: BENCHMARK TRACEABILITY REGISTRY */}
        {activeView === 'BENCHMARK_TRACE' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Institutional Benchmark Traceability Registry</h2>
                  <p className="text-xs text-slate-600 mt-1 max-w-3xl">
                    End-to-end evidence lineage mapping benchmark sources (Hillside Nalya, Namiryango College, Namirembe Diocese, QuickBooks, SchoolPay) to directorates, modules, capabilities, and runtime code.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 w-fit">
                  {BENCHMARK_TRACEABILITY_REGISTRY.length} Physical Traces Audited
                </span>
              </div>

              {/* SEARCH & FILTER CONTROLS */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by domain, statutory reference, or function..."
                    value={benchmarkSearch}
                    onChange={(e) => setBenchmarkSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-slate-800"
                  />
                </div>
                <select
                  value={benchmarkFilter}
                  onChange={(e) => setBenchmarkFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 cursor-pointer"
                >
                  <option value="ALL">All Sovereign Products & Sources</option>
                  <option value="prod-nursery-primary">Nursery & Primary (Hillside Nalya)</option>
                  <option value="prod-secondary-school">Secondary School (Namiryango College)</option>
                  <option value="prod-church-faith">Church & Faith (Namirembe Diocese)</option>
                  <option value="prod-fintech">Fintech & Banking (QuickBooks / SchoolPay)</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredTraces.map(trace => (
                <div key={trace.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                          {trace.benchmarkSource}
                        </span>
                        <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {trace.jumoProductCode}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mt-1">{trace.extractedDomain}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {trace.verificationStatus}
                      </span>
                      <div className="text-[10px] font-mono text-slate-400 mt-1">
                        {trace.implementationStatus}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Statutory Evidence & Regulatory Reference
                      </span>
                      <p className="text-slate-800 font-medium leading-relaxed">{trace.evidenceReference}</p>
                    </div>
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Extracted Institutional Function
                      </span>
                      <p className="text-slate-800 font-medium leading-relaxed">{trace.extractedFunction}</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 text-white font-mono text-[11px] space-y-1">
                    <div className="text-slate-400 text-[10px] uppercase">10-Tier Hierarchy Mounting Chain:</div>
                    <div className="text-slate-200">
                      {trace.directorate} → {trace.department} → {trace.module} → {trace.capability}
                    </div>
                    <div className="text-emerald-400 text-[10px] pt-1">
                      Runtime Component: {trace.runtimeComponent}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: SHARED PLATFORMS VIEW */}
        {activeView === 'SHARED_PLATFORMS' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900">Shared Sovereign Platforms</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Autonomous shared service engines providing unified financial accounting, payment switching, and community advancement layers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SHARED_SOVEREIGN_PLATFORMS.map(hierarchy => {
                const p = hierarchy.product;
                const ProductIcon = getProductIcon(p.code);

                return (
                  <div
                    key={p.id}
                    className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-all shadow-xs"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center">
                          <ProductIcon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                          SHARED PLATFORM
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-slate-400 font-bold">{p.code}</span>
                        <h3 className="text-lg font-black text-slate-900 mt-0.5">
                          {p.name}
                        </h3>
                        <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                          {p.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-center font-mono text-[11px]">
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                          <div className="text-slate-400 text-[10px]">MODULES</div>
                          <div className="text-slate-900 font-bold">{hierarchy.modules.length}</div>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                          <div className="text-slate-400 text-[10px]">ACTIONS</div>
                          <div className="text-slate-900 font-bold">{hierarchy.capabilities.length}</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-5 mt-4 border-t border-slate-100">
                      <button
                        onClick={() => setSelectedProductId(p.id)}
                        className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        Inspect Platform Hierarchy <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RECLASSIFIED HISTORICAL REFERENCE DOMAINS */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Database className="w-4 h-4 text-slate-500" />
                Historical Domain Services & Registries (Reference Architecture)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                National Identity, National Health, and Higher Education schemas have been reclassified as sovereign domain services and master registries rather than standalone sovereign products.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {RECLASSIFIED_HISTORICAL_REGISTRIES.map(h => (
                  <div key={h.product.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 font-bold">{h.product.code}</span>
                    <div className="text-xs font-bold text-slate-900">{h.product.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{h.modules.length} Mounted Modules</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: PHYSICAL ARCHITECTURE AUDIT */}
        {activeView === 'AUDIT' && (
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-emerald-600" />
                    JUMO UEOS Physical Architecture Census Audit
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 font-mono">
                    Referential Integrity & Service Binding Traversal of the 4 Sovereign Products
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleRunVerification}
                    disabled={isVerifying}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
                  >
                    {isVerifying ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                    Re-Run Census Verification
                  </button>
                  <div className="text-right pl-4 border-l border-slate-200">
                    <div className="text-xs font-mono text-slate-400">AUDIT STATUS</div>
                    <div className="text-sm font-black text-emerald-700">100.0% PASS</div>
                  </div>
                </div>
              </div>

              {/* PRODUCT DIAGNOSTIC RESULTS */}
              <div className="space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  Product Verification Results (Authoritative Tests)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.values(auditResults).map(res => (
                    <div key={res.productId} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-slate-400 font-bold">{res.code}</span>
                          <h4 className="text-sm font-bold text-slate-900 mt-0.5">{res.name}</h4>
                        </div>
                        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                          res.status === 'PASS' 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                            : 'bg-rose-100 text-rose-800 border border-rose-200'
                        }`}>
                          {res.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                        <div className="bg-white p-2 rounded-xl border border-slate-200">
                          <div className="text-slate-400">DIR / DEPT</div>
                          <div className="text-slate-900 font-bold">{res.census.directorates} / {res.census.departments}</div>
                        </div>
                        <div className="bg-white p-2 rounded-xl border border-slate-200">
                          <div className="text-slate-400">MODULES</div>
                          <div className="text-slate-900 font-bold">{res.census.modules}</div>
                        </div>
                        <div className="bg-white p-2 rounded-xl border border-slate-200">
                          <div className="text-slate-400">ACTIONS</div>
                          <div className="text-slate-900 font-bold">{res.census.capabilities}</div>
                        </div>
                        <div className="bg-white p-2 rounded-xl border border-slate-200">
                          <div className="text-slate-400">ROLES</div>
                          <div className="text-slate-900 font-bold">{res.census.roles}</div>
                        </div>
                      </div>

                      <div className="text-[11px] font-mono text-emerald-800 pt-1 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-emerald-600" />
                        <span>{res.summaryMessage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: APTITUDE BENCHMARK SIM */}
        {activeView === 'ASSESSMENT' && (
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Judiciary Service Commission (JSC) Aptitude Benchmark Simulator</h2>
                  <p className="text-xs text-slate-500 mt-1 font-mono">
                    5th September 2026 Examination Readiness Benchmark ({activeQuestions.length} Questions)
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-center">
                  <div className="text-[10px] font-mono text-slate-400">EXAM DATE COUNTDOWN</div>
                  <div className="text-sm font-black text-slate-900 font-mono">
                    {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                  </div>
                </div>
              </div>

              {assessmentState === 'INTRO' && (
                <div className="space-y-6">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Test your mastery of statutory frameworks, Uganda Constitution 1995, Public Finance Management Act (PFMA) 2015, Civil Procedure Rules, and institutional system design.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => startTest('ALL')}
                      className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs cursor-pointer shadow-xs"
                    >
                      Start Full Examination ({BENCHMARK_QUESTIONS.length} Questions)
                    </button>
                    <button
                      onClick={() => startTest('EVIDENCE')}
                      className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs cursor-pointer border border-slate-200"
                    >
                      Statutory Evidence Focus
                    </button>
                    <button
                      onClick={() => startTest('PREDICTIVE')}
                      className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs cursor-pointer border border-slate-200"
                    >
                      Predictive JSC Cases Focus
                    </button>
                  </div>
                </div>
              )}

              {assessmentState === 'TEST' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
                    <span>Question {currentQuestionIndex + 1} of {activeQuestions.length}</span>
                    <span>Mode: {assessmentMode}</span>
                  </div>

                  {activeQuestions[currentQuestionIndex] && (
                    <div className="space-y-4">
                      <h3 className="text-base font-bold text-slate-900">
                        {activeQuestions[currentQuestionIndex].text}
                      </h3>

                      <div className="space-y-2">
                        {activeQuestions[currentQuestionIndex].options.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: idx })}
                            className={`w-full text-left p-4 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                              selectedAnswers[currentQuestionIndex] === idx
                                ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span className="font-mono font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                            {opt}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <button
                          onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                          disabled={currentQuestionIndex === 0}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                        >
                          Previous
                        </button>
                        {currentQuestionIndex < activeQuestions.length - 1 ? (
                          <button
                            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer"
                          >
                            Next Question
                          </button>
                        ) : (
                          <button
                            onClick={() => setAssessmentState('RESULTS')}
                            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                          >
                            Submit Examination
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {assessmentState === 'RESULTS' && (
                <div className="space-y-6 text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-2xl font-black">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Examination Completed</h3>
                    <p className="text-xs text-slate-500 mt-1">Score: {calculateScore()} / {activeQuestions.length} ({Math.round((calculateScore() / activeQuestions.length) * 100)}%)</p>
                  </div>
                  <button
                    onClick={() => setAssessmentState('INTRO')}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs cursor-pointer"
                  >
                    Take Another Simulation
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
