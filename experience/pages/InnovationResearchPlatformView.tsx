import React, { useState } from 'react';
import {
  FlaskConical,
  Microscope,
  Cpu,
  Sparkles,
  Layers,
  GitBranch,
  Zap,
  Shield,
  Activity,
  FileText,
  Play,
  CheckCircle,
  AlertTriangle,
  Search,
  Plus,
  RefreshCw,
  Sliders,
  Database,
  Terminal,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Box
} from 'lucide-react';

interface InnovationResearchPlatformViewProps {
  onNavigate?: (route: string) => void;
}

export const InnovationResearchPlatformView: React.FC<InnovationResearchPlatformViewProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState<'labs' | 'digital_twin' | 'sandbox' | 'patents' | 'incubation'>('labs');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([
    '[SYSTEM] Initializing Digital Twin Sandbox Environment v14.0...',
    '[SIMULATION] Tenant ledger mirroring active for SACCO & Church ERP datasets.',
    '[VERIFICATION] Zero-Trust ABAC boundary isolation confirmed. No production leak.',
    '[SUCCESS] Digital Twin ready for synthetic transaction stress testing.'
  ]);

  const researchProjects = [
    {
      id: 'RES-101',
      title: 'Quantum-Resistant Ledger Cryptography',
      category: 'Emerging Technologies',
      status: 'Active Lab',
      progress: 78,
      lead: 'Dr. Aris Thorne',
      description: 'Developing post-quantum lattice-based encryption algorithms for FAAP settlement pipelines.'
    },
    {
      id: 'RES-102',
      title: 'Autonomous Swarm Reconciliation Engine',
      category: 'AI Research',
      status: 'Prototype Phase',
      progress: 92,
      lead: 'Elena Rostova',
      description: 'Multi-agent cooperative loops designed to self-heal general ledger discrepancies in real-time.'
    },
    {
      id: 'RES-103',
      title: 'Zero-Latency Edge Synchronization Kernel',
      category: 'Prototype Center',
      status: 'Incubation',
      progress: 64,
      lead: 'Marcus Vance',
      description: 'Offline-first CRDT synchronization protocols for rural agricultural and church ERP nodes.'
    },
    {
      id: 'RES-104',
      title: 'Predictive Tenant Churn & Resource Telemetry',
      category: 'Experiments',
      status: 'Active Lab',
      progress: 85,
      lead: 'Sovereign AI Node',
      description: 'Deep neural models analyzing tenant API utilization to dynamically scale cluster compute.'
    }
  ];

  const patentRegistry = [
    {
      code: 'PAT-EU-2026-8841',
      title: 'Sovereign Micro-Kernel Dynamic Plugin Registry',
      status: 'Granted & Certified',
      filingDate: '2026-01-15',
      jurisdiction: 'WIPO / European Patent Office',
      inventor: 'JUMO UEOS Core Architecture Board'
    },
    {
      code: 'PAT-EU-2026-9012',
      title: 'Multi-Model Cognitive AI Gateway Routing Protocol',
      status: 'Pending Verification',
      filingDate: '2026-03-22',
      jurisdiction: 'WIPO / United States Patent Office',
      inventor: 'JUMO AI Research Lab'
    },
    {
      code: 'PAT-EU-2026-9305',
      title: 'Zero-Trust Tenant Row-Level Database Segregation',
      status: 'Granted & Certified',
      filingDate: '2026-04-10',
      jurisdiction: 'Global Sovereign Standard',
      inventor: 'JUMO Aegis Security Team'
    }
  ];

  const triggerSimulation = () => {
    setIsSimulating(true);
    const newLog = `[EXACT TIME ${new Date().toLocaleTimeString()}] Triggering synthetic stress test: 50,000 concurrent ledger transactions...`;
    setSimulationLogs(prev => [newLog, ...prev]);
    
    setTimeout(() => {
      setSimulationLogs(prev => [
        `[SUCCESS ${new Date().toLocaleTimeString()}] Stress test complete. Throughput: 14,200 TPS. Parity offset: $0.00. Zero anomalies detected.`,
        ...prev
      ]);
      setIsSimulating(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white text-base">JUMO INNOVATION & RESEARCH PLATFORM</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                Sovereign Platform #7
              </span>
            </div>
            <p className="text-xs text-slate-400">Advanced R&D Labs • Synthetic Digital Twin • Patent Registry • Product Incubation</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={triggerSimulation}
            disabled={isSimulating}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50"
          >
            {isSimulating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            <span>Run Synthetic Twin Test</span>
          </button>
          {onNavigate && (
            <button
              onClick={() => onNavigate('/owner')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              <span>Return to Control Plane</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </header>

      {/* Main Workspace with Left Navigation */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation */}
        <aside className="w-64 border-r border-slate-800 bg-slate-900/40 p-4 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-2 block mb-2">
                R&D Workspaces
              </label>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveSection('labs')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    activeSection === 'labs'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Microscope className="w-4 h-4" />
                    <span>Innovation Labs & Projects</span>
                  </div>
                  <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded font-mono">4</span>
                </button>

                <button
                  onClick={() => setActiveSection('digital_twin')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    activeSection === 'digital_twin'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4" />
                    <span>Synthetic Digital Twin</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </button>

                <button
                  onClick={() => setActiveSection('sandbox')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    activeSection === 'sandbox'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Box className="w-4 h-4" />
                    <span>Experimental Sandbox</span>
                  </div>
                  <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded font-mono">Live</span>
                </button>

                <button
                  onClick={() => setActiveSection('patents')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    activeSection === 'patents'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4" />
                    <span>Sovereign Patent Registry</span>
                  </div>
                  <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded font-mono">3</span>
                </button>

                <button
                  onClick={() => setActiveSection('incubation')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    activeSection === 'incubation'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Product Incubation Center</span>
                  </div>
                </button>
              </nav>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>Twin Health Status</span>
                <span className="text-emerald-400 font-mono text-[11px]">100% PARITY</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-full"></div>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Zero-Trust sandbox mirroring active. All ledger postings simulated with $0.00 drift.
              </p>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 font-mono border-t border-slate-800/80 pt-4">
            <div className="flex justify-between">
              <span>RUNTIME:</span>
              <span className="text-slate-400">UEOS-TWIN-v14.0</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>ENCRYPTION:</span>
              <span className="text-indigo-400">PQC-LATTICE-256</span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-950/50">
          {activeSection === 'labs' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
                <div>
                  <h1 className="text-xl font-bold text-white tracking-tight">Active Innovation Labs & Research Projects</h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Discover emerging technologies, quantum-resistant algorithms, and autonomous AI swarms in development.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search R&D projects..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500 w-64"
                    />
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-semibold transition-all">
                    <Plus className="w-3.5 h-3.5" />
                    <span>New R&D Charter</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {researchProjects
                  .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(project => (
                    <div key={project.id} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition-all group flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold uppercase">
                            {project.category}
                          </span>
                          <span className="text-xs font-mono text-slate-500">{project.id}</span>
                        </div>
                        <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Lead Investigator: <strong className="text-slate-200">{project.lead}</strong></span>
                          <span className="text-indigo-400 font-mono font-semibold">{project.progress}% Complete</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-end pt-1">
                          <button className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                            <span>Open Lab Sandbox</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {activeSection === 'digital_twin' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800/80 pb-5">
                <h1 className="text-xl font-bold text-white tracking-tight">Synthetic Digital Twin & Simulation Engine</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Mirroring live enterprise tenant states in a secure, Zero-Trust sandbox to validate ledger parity and stress-test updates before production release.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
                  <div className="flex items-center gap-3 text-indigo-400 mb-2">
                    <Activity className="w-5 h-5" />
                    <span className="font-semibold text-xs uppercase tracking-wider">Simulated Throughput</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">14,200 TPS</div>
                  <p className="text-[11px] text-slate-400 mt-1">Synthetic ledger postings tested across 12 ERP domains.</p>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
                  <div className="flex items-center gap-3 text-emerald-400 mb-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold text-xs uppercase tracking-wider">Balance Parity Drift</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-emerald-400">$0.0000</div>
                  <p className="text-[11px] text-slate-400 mt-1">Absolute double-entry mathematical equilibrium verified.</p>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
                  <div className="flex items-center gap-3 text-purple-400 mb-2">
                    <Shield className="w-5 h-5" />
                    <span className="font-semibold text-xs uppercase tracking-wider">Zero-Trust Isolation</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">100% SECURE</div>
                  <p className="text-[11px] text-slate-400 mt-1">No production database rows exposed during simulation.</p>
                </div>
              </div>

              {/* Terminal Log Console */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 font-mono text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-slate-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-indigo-400" />
                    <span className="font-semibold text-slate-300">Digital Twin Real-Time Simulation Feed</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase">
                    Mirror Active
                  </span>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto pr-2 py-2">
                  {simulationLogs.map((log, idx) => (
                    <div key={idx} className="text-slate-300 hover:text-white transition-colors">
                      <span className="text-slate-600 mr-2 font-bold">{`[${simulationLogs.length - idx}]`}</span>
                      <span className={log.includes('SUCCESS') ? 'text-emerald-400 font-semibold' : log.includes('SIMULATION') ? 'text-indigo-300' : 'text-slate-300'}>
                        {log}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[11px]">
                  <span className="text-slate-500">Sandbox Target: `ueos_synthetic_mirror_db`</span>
                  <button
                    onClick={triggerSimulation}
                    disabled={isSimulating}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-sans font-semibold text-xs disabled:opacity-50"
                  >
                    {isSimulating ? 'Running Stress Test...' : 'Trigger Synthetic Injection'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'patents' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800/80 pb-5">
                <h1 className="text-xl font-bold text-white tracking-tight">Sovereign Patent & Intellectual Property Registry</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Official repository of certified algorithmic patents, architecture trademarks, and proprietary zero-trust inventions owned by JUMO UEOS.
                </p>
              </div>

              <div className="space-y-4">
                {patentRegistry.map((pat, idx) => (
                  <div key={idx} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-indigo-400">{pat.code}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                          {pat.status}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white">{pat.title}</h3>
                      <p className="text-xs text-slate-400">
                        Jurisdiction: <strong className="text-slate-300">{pat.jurisdiction}</strong> • Inventor: <strong className="text-slate-300">{pat.inventor}</strong>
                      </p>
                    </div>
                    <div className="text-right font-mono text-xs text-slate-500">
                      <div>Filing Date: <span className="text-slate-300">{pat.filingDate}</span></div>
                      <button className="mt-2 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-sans font-medium flex items-center gap-1.5 ml-auto border border-slate-700">
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Certificate</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeSection === 'sandbox' || activeSection === 'incubation') && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-white">Sovereign R&D Environment Ready</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                This dedicated laboratory allows enterprise engineers to incubate new domain templates, test experimental LLM routing protocols, and validate zero-latency offline sync engines without affecting active tenant runtimes.
              </p>
              <button
                onClick={() => setActiveSection('labs')}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/20 transition-all"
              >
                Return to Active Labs
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="h-10 border-t border-slate-800/80 bg-slate-900/90 px-6 flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <div>JUMO UEOS SOVEREIGN PLATFORM #7 — INNOVATION & RESEARCH CENTER</div>
        <div>STATUS: <span className="text-emerald-400 font-semibold">100% PARITY / ZERO DRIFT</span></div>
      </footer>
    </div>
  );
};

export default InnovationResearchPlatformView;
