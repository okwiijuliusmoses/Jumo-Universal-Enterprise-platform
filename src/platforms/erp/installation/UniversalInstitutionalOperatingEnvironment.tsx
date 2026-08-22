import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Activity, 
  Users, 
  ShieldCheck, 
  DollarSign, 
  Layers, 
  CheckSquare, 
  FileText, 
  Mail, 
  Bot, 
  Sparkles, 
  Sliders, 
  BarChart3, 
  Key, 
  Lock, 
  Grid, 
  LayoutGrid,
  Cpu, 
  ShoppingBag, 
  RefreshCw, 
  Plus, 
  CheckCircle2, 
  ArrowUpRight, 
  Award, 
  Globe, 
  Filter, 
  BookOpen, 
  Send,
  Database,
  Smartphone,
  Eye
} from 'lucide-react';

interface UniversalInstitutionalOperatingEnvironmentProps {
  institutionName?: string;
  selectedFamily?: string;
  customDomain?: string;
  onNavigateBack?: () => void;
}

export const UniversalInstitutionalOperatingEnvironment: React.FC<UniversalInstitutionalOperatingEnvironmentProps> = ({
  institutionName = 'JUMO International University',
  selectedFamily = 'education',
  customDomain = 'jiu.jumo.app',
  onNavigateBack
}) => {
  // Active Tab View State
  const [activeTab, setActiveTab] = useState<
    'command_center' | 'dash_builder' | 'rbac_studio' | 'depts' | 'workflows' | 'doc_vault' | 'search' | 'comms' | 'ai_knowledge' | 'marketplace'
  >('command_center');

  // Search State
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // RBAC Users State
  const [users, setUsers] = useState([
    { id: '1', name: 'Dr. Sarah Jenkins', email: 'vc@jiu.ac.ke', role: 'Vice Chancellor / Executive', dept: 'Executive Office', status: 'Active' },
    { id: '2', name: 'Prof. Mark Davis', email: 'dean.computing@jiu.ac.ke', role: 'Academic Dean', dept: 'Faculty of Computing', status: 'Active' },
    { id: '3', name: 'Patricia Alva', email: 'cfo@jiu.ac.ke', role: 'Finance Director', dept: 'Finance & Treasury', status: 'Active' },
    { id: '4', name: 'James Omondi', email: 'hr.head@jiu.ac.ke', role: 'HR Director', dept: 'Human Resources', status: 'Active' }
  ]);

  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Department Head');

  // Workflows Engine State
  const [workflows, setWorkflows] = useState([
    { id: 'wf-101', title: 'FAAP Purchase Request > $5,000', steps: ['Department Head', 'Finance Review', 'VC Approval', 'FAAP Disbursement'], status: 'Active' },
    { id: 'wf-102', title: 'Faculty Recruitment Contract', steps: ['HR Request', 'Academic Board Review', 'Council Clearance'], status: 'Active' },
    { id: 'wf-103', title: 'Student Tuition Waiver Request', steps: ['Dean Verification', 'Finance Clearance', 'VC Signature'], status: 'Pending Approval' }
  ]);

  // Documents State
  const [documents, setDocuments] = useState([
    { id: 'doc-001', name: '2026_Institutional_Charter_Signed.pdf', size: '4.2 MB', category: 'Legal', status: 'Verified & Encrypted' },
    { id: 'doc-002', name: 'FAAP_Q2_Audit_Report_2026.pdf', size: '12.8 MB', category: 'Finance', status: 'AEGIS Sealed' },
    { id: 'doc-003', name: 'Senate_Academic_Regulations_v4.pdf', size: '2.1 MB', category: 'Academic', status: 'Active Policy' }
  ]);

  // Comms Engine State
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastTarget, setBroadcastTarget] = useState('All Students & Staff');
  const [broadcastChannel, setBroadcastChannel] = useState('SMS & Email');
  const [broadcastSent, setBroadcastSent] = useState(false);

  // AI Knowledge Assistant Query
  const [knowledgeQuery, setKnowledgeQuery] = useState('');
  const [knowledgeResponse, setKnowledgeResponse] = useState('');

  const handleGlobalSearch = (q: string) => {
    setGlobalSearchQuery(q);
    if (!q.trim()) {
      setSearchResults([]);
      return;
    }
    const lower = q.toLowerCase();
    const results = [
      { type: 'Document', title: 'FAAP Fee Payment Policy 2026.pdf', detail: 'Financial Ledger & Treasury Guidelines' },
      { type: 'User', title: 'Patricia Alva (CFO)', detail: 'Finance & Treasury Department' },
      { type: 'Workflow', title: 'Purchase Order #8821 ($14,500)', detail: 'Pending Vice Chancellor Approval' },
      { type: 'Record', title: 'Student Transcript #JIU-88210', detail: 'Faculty of Computing & Information' }
    ].filter(r => r.title.toLowerCase().includes(lower) || r.detail.toLowerCase().includes(lower) || r.type.toLowerCase().includes(lower));
    setSearchResults(results);
  };

  const handleAddUser = () => {
    if (!newUserName.trim() || !newUserEmail.trim()) return;
    setUsers([
      ...users,
      { id: String(Date.now()), name: newUserName, email: newUserEmail, role: newUserRole, dept: 'General Staff', status: 'Active' }
    ]);
    setNewUserName('');
    setNewUserEmail('');
  };

  const handleSendBroadcast = () => {
    if (!broadcastMessage.trim()) return;
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastMessage('');
    }, 2500);
  };

  const handleQueryKnowledge = () => {
    if (!knowledgeQuery.trim()) return;
    setKnowledgeResponse(`According to ${institutionName} official policy documents (AEGIS Verified): "${knowledgeQuery}" is governed under Chapter 4 Section B of the Institutional Charter. All approvals require FAAP double-entry log recording.`);
  };

  return (
    <div className="bg-slate-50 min-h-[750px] border border-slate-200 rounded-3xl shadow-xl overflow-hidden my-4 max-w-7xl mx-auto font-sans">
      {/* Top Universal Environment Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 border-b border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 font-bold text-xl shadow-inner">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono font-bold rounded-full mb-1">
              JUMO UEOS PHASE 15
            </div>
            <h1 className="text-xl font-black tracking-tight">{institutionName}</h1>
            <p className="text-xs text-slate-300">Universal Institutional Operating Environment • Domain: <span className="text-amber-300 font-mono font-bold">{customDomain}</span></p>
          </div>
        </div>

        {/* Global Universal Search Input */}
        <div className="w-full md:w-80 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Universal Search (Docs, Users, FAAP...)"
            value={globalSearchQuery}
            onChange={(e) => handleGlobalSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-amber-400 font-medium"
          />
        </div>
      </div>

      {/* Global Search Results Dropdown Overlay */}
      {searchResults.length > 0 && (
        <div className="p-4 bg-slate-900 border-b border-slate-800 text-white animate-in fade-in duration-200 space-y-2">
          <div className="text-[10px] font-mono text-amber-300 uppercase font-bold">Universal Search Results ({searchResults.length})</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {searchResults.map((res, i) => (
              <div key={i} className="p-2.5 bg-slate-800/90 rounded-xl border border-slate-700 flex items-center justify-between">
                <div>
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded text-[10px] font-mono font-bold">{res.type}</span>
                  <div className="font-bold text-white mt-1">{res.title}</div>
                  <div className="text-[10px] text-slate-400">{res.detail}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Tabs for Phase 15 Systems */}
      <div className="flex overflow-x-auto bg-white border-b border-slate-200 px-6 gap-2 pt-2 text-xs font-extrabold">
        {[
          { id: 'command_center', label: '1. Executive Command Center', icon: Activity },
          { id: 'dash_builder', label: '2. Dashboard Builder', icon: LayoutGrid },
          { id: 'rbac_studio', label: '3. RBAC & Roles Studio', icon: Key },
          { id: 'depts', label: '4. Department Workspaces', icon: Building2 },
          { id: 'workflows', label: '5. Workflow Engine', icon: CheckSquare },
          { id: 'doc_vault', label: '6. Records & Doc Vault', icon: FileText },
          { id: 'search', label: '7. Universal Search', icon: Search },
          { id: 'comms', label: '8. Comms Hub', icon: Mail },
          { id: 'ai_knowledge', label: '9. AI Knowledge (RAG)', icon: Bot },
          { id: 'marketplace', label: '10. Marketplace & Extensions', icon: ShoppingBag }
        ].map(t => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-3 border-b-2 whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'border-indigo-600 bg-slate-50 text-indigo-700 rounded-t-xl shadow-xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Main Operating Workspace */}
      <div className="p-6 md:p-8 space-y-6">
        {/* TAB 1: EXECUTIVE COMMAND CENTER */}
        {activeTab === 'command_center' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-mono font-bold rounded-full">
                  <Activity className="w-3.5 h-3.5" /> Institutional Operating System Core
                </div>
                <h2 className="text-xl font-black">{institutionName} — Executive Command Center</h2>
                <p className="text-xs text-slate-300">Live operational telemetry across all departments, FAAP financial ledger, and AEGIS security.</p>
              </div>
              <span className="px-3 py-1.5 bg-indigo-600 text-white font-mono text-xs font-bold rounded-xl shadow-xs">
                System Health: 100% Optimal
              </span>
            </div>

            {/* Key Performance Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
                <div className="flex items-center justify-between text-slate-500 font-bold">
                  <span>Enrolled Community</span>
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">12,450</div>
                <div className="text-[10px] text-emerald-600 font-bold">↑ 8.4% YoY Growth</div>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
                <div className="flex items-center justify-between text-slate-500 font-bold">
                  <span>FAAP Treasury Cashflow</span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">$4,820,500</div>
                <div className="text-[10px] text-emerald-600 font-bold">1.5% Settlement Active</div>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
                <div className="flex items-center justify-between text-slate-500 font-bold">
                  <span>Workflow SLAs On-Time</span>
                  <CheckSquare className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">98.2%</div>
                <div className="text-[10px] text-purple-600 font-bold">42 Workflows Processed</div>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
                <div className="flex items-center justify-between text-slate-500 font-bold">
                  <span>AEGIS Security Scope</span>
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">Zero Trust</div>
                <div className="text-[10px] text-amber-600 font-bold">0 Security Breaches</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DASHBOARD BUILDER */}
        {activeTab === 'dash_builder' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-base font-black text-slate-900">Role-Based Dashboard Studio</h2>
                <p className="text-xs text-slate-500">Configure customized dashboard widgets for Executives, Deans, CFOs, and Administrators.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3">
                <div className="font-extrabold text-sm text-slate-900">Executive / Board Dashboard Widgets</div>
                <div className="space-y-2 text-slate-600">
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex justify-between">
                    <span>Institutional Revenue & FAAP Balances</span>
                    <span className="font-bold text-emerald-600">ENABLED</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex justify-between">
                    <span>AEGIS Compliance & Risk Score</span>
                    <span className="font-bold text-emerald-600">ENABLED</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3">
                <div className="font-extrabold text-sm text-slate-900">Academic Dean Dashboard Widgets</div>
                <div className="space-y-2 text-slate-600">
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex justify-between">
                    <span>Faculty Examination & Pass Rate Graph</span>
                    <span className="font-bold text-emerald-600">ENABLED</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex justify-between">
                    <span>Lecturer Attendance & LMS Activity</span>
                    <span className="font-bold text-emerald-600">ENABLED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ROLE & PERMISSION STUDIO */}
        {activeTab === 'rbac_studio' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-base font-black text-slate-900">Role-Based & Attribute Access Control (RBAC + ABAC)</h2>
                <p className="text-xs text-slate-500">Manage institutional users, department permissions, and AEGIS security profiles.</p>
              </div>
            </div>

            {/* Add User Form */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center gap-3 text-xs">
              <input
                type="text"
                placeholder="Full Name (e.g., Dr. Aaron Vance)"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="flex-1 p-2.5 bg-white border border-slate-300 rounded-xl outline-none font-bold"
              />
              <input
                type="email"
                placeholder="Email (e.g., aaron@jiu.ac.ke)"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                className="flex-1 p-2.5 bg-white border border-slate-300 rounded-xl outline-none font-mono"
              />
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value)}
                className="p-2.5 bg-white border border-slate-300 rounded-xl outline-none font-bold"
              >
                <option value="Executive Admin">Executive Admin</option>
                <option value="Academic Dean">Academic Dean</option>
                <option value="Finance Officer">Finance Officer</option>
                <option value="Department Head">Department Head</option>
              </select>
              <button
                onClick={handleAddUser}
                className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Provision User
              </button>
            </div>

            {/* Users Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs text-xs">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-100 text-slate-700 font-extrabold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">User</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Assigned Role</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-slate-50 font-medium">
                      <td className="p-3 font-bold text-slate-900">{u.name}</td>
                      <td className="p-3 font-mono text-slate-600">{u.email}</td>
                      <td className="p-3 font-bold text-blue-700">{u.role}</td>
                      <td className="p-3 text-slate-600">{u.dept}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold rounded">
                          {u.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: DEPARTMENT WORKSPACE GENERATOR */}
        {activeTab === 'depts' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-base font-black text-slate-900">Dynamic Department Workspaces</h2>
                <p className="text-xs text-slate-500">Autonomous departmental operating environments for Academic, Finance, HR, and Research.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              {[
                { name: 'Academic Affairs', head: 'Prof. Mark Davis', status: 'Active', count: '12 Faculties' },
                { name: 'Finance & Treasury', head: 'Patricia Alva', status: 'Active', count: 'FAAP Ledger' },
                { name: 'Human Resources', head: 'James Omondi', status: 'Active', count: '420 Staff' },
                { name: 'Research & Innovation', head: 'Dr. Helen Vance', status: 'Active', count: '18 Labs' }
              ].map((d, i) => (
                <div key={i} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
                  <div className="font-extrabold text-sm text-slate-900">{d.name}</div>
                  <div className="space-y-1 text-slate-500 text-[11px]">
                    <div>Head: <span className="font-bold text-slate-800">{d.head}</span></div>
                    <div>Capacity: <span className="font-mono text-blue-600 font-bold">{d.count}</span></div>
                  </div>
                  <span className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold rounded-md">
                    ✓ {d.status} Workspace
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: WORKFLOW AUTOMATION ENGINE */}
        {activeTab === 'workflows' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-base font-black text-slate-900">Workflow Automation Engine</h2>
                <p className="text-xs text-slate-500">Automated approval chains for procurement, tuition waivers, and staff hiring.</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              {workflows.map(wf => (
                <div key={wf.id} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-sm text-slate-900">{wf.title}</div>
                    <span className="px-2.5 py-1 bg-blue-100 text-blue-800 font-mono text-[10px] font-bold rounded-md">
                      {wf.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pt-2 text-[11px]">
                    {wf.steps.map((step, idx) => (
                      <React.Fragment key={idx}>
                        <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg font-bold text-slate-800 whitespace-nowrap">
                          {idx + 1}. {step}
                        </span>
                        {idx < wf.steps.length - 1 && <span className="text-slate-400 font-bold">→</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: DIGITAL RECORDS & DOCUMENT VAULT */}
        {activeTab === 'doc_vault' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-base font-black text-slate-900">Digital Document Records Center</h2>
                <p className="text-xs text-slate-500">OCR scanning, digital signatures, AEGIS encrypted document archive.</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              {documents.map(doc => (
                <div key={doc.id} className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-bold text-slate-900">{doc.name}</div>
                      <div className="text-[10px] font-mono text-slate-400">{doc.category} • {doc.size}</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold rounded-md">
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: UNIVERSAL SEARCH ENGINE */}
        {activeTab === 'search' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-base font-black text-slate-900">JUMO Universal Search Engine</h2>
                <p className="text-xs text-slate-500">Query and index documents, users, transactions, and historical policy records.</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex gap-2 text-xs">
                <input
                  type="text"
                  placeholder="Type search terms (e.g. 'payments to supplier', 'Dr. Sarah', 'charter')..."
                  value={globalSearchQuery}
                  onChange={(e) => handleGlobalSearch(e.target.value)}
                  className="flex-1 p-3 bg-slate-50 border border-slate-300 rounded-xl font-bold outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              {globalSearchQuery.trim() ? (
                <div className="space-y-3">
                  <div className="text-xs font-mono font-bold text-indigo-600">SEARCH RESULTS FOR "{globalSearchQuery.toUpperCase()}"</div>
                  {searchResults.length > 0 ? (
                    <div className="space-y-2 text-xs">
                      {searchResults.map((res, i) => (
                        <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                          <div>
                            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-800 rounded text-[9px] font-mono font-bold">{res.type}</span>
                            <div className="font-extrabold text-slate-900 mt-1">{res.title}</div>
                            <div className="text-[10px] text-slate-500">{res.detail}</div>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-slate-400" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-xl">
                      No matching records found in institutional databases. Try searching for "payments", "Sarah", or "policy".
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 border border-dashed rounded-xl space-y-2">
                  <Search className="w-8 h-8 text-slate-400 mx-auto" />
                  <div className="font-bold">Ready to search across the operating environment</div>
                  <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                    Search indexes files, SIS student directories, general ledger balances, or active administrative approval tasks instantly.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 8: COMMS HUB */}
        {activeTab === 'comms' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-base font-black text-slate-900">Institutional Communication Center</h2>
                <p className="text-xs text-slate-500">Broadcast SMS, Email, and Push notices across the institution.</p>
              </div>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Target Audience</label>
                  <select
                    value={broadcastTarget}
                    onChange={(e) => setBroadcastTarget(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-bold"
                  >
                    <option value="All Students & Staff">All Students & Staff</option>
                    <option value="Faculty Members Only">Faculty Members Only</option>
                    <option value="Finance Department">Finance Department</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Channel</label>
                  <select
                    value={broadcastChannel}
                    onChange={(e) => setBroadcastChannel(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-bold"
                  >
                    <option value="SMS & Email">SMS & Email</option>
                    <option value="Push Notification">Push Notification</option>
                    <option value="Portal Banner">Portal Banner</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Message Content</label>
                <textarea
                  rows={3}
                  placeholder="Enter official institutional broadcast message..."
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-medium outline-none"
                />
              </div>

              <button
                onClick={handleSendBroadcast}
                className={`px-6 py-2.5 rounded-xl font-bold text-white transition flex items-center gap-2 cursor-pointer ${
                  broadcastSent ? 'bg-emerald-600' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <Send className="w-4 h-4" />
                {broadcastSent ? 'Broadcast Dispatched!' : 'Send Broadcast'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 9: AI KNOWLEDGE ASSISTANT (RAG) */}
        {activeTab === 'ai_knowledge' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-base font-black text-slate-900">Institutional AI Knowledge Assistant (RAG)</h2>
                <p className="text-xs text-slate-500">Query institutional regulations, charter policies, and FAAP ledger rules.</p>
              </div>
            </div>

            <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-4 text-xs font-mono">
              <div className="text-amber-300 font-bold flex items-center gap-2">
                <Bot className="w-5 h-5" />
                JUMO UEOS INSTITUTIONAL RAG KNOWLEDGE BASE
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask policy question (e.g., What is the tuition waiver approval process?)"
                  value={knowledgeQuery}
                  onChange={(e) => setKnowledgeQuery(e.target.value)}
                  className="flex-1 p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs outline-none text-white"
                />
                <button
                  onClick={handleQueryKnowledge}
                  className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl cursor-pointer"
                >
                  Query Policy
                </button>
              </div>

              {knowledgeResponse && (
                <div className="p-4 bg-slate-800/90 border border-slate-700 rounded-xl text-slate-200 leading-relaxed font-sans">
                  {knowledgeResponse}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 10: MARKETPLACE & EXTENSIONS */}
        {activeTab === 'marketplace' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-base font-black text-slate-900">Institutional Marketplace & Extensions</h2>
                <p className="text-xs text-slate-500">Install additional specialized industry extensions, IoT integrations, and add-ons.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {[
                { name: 'Smart Campus IoT', category: 'Hardware', desc: 'Connect physical turnstiles, CCTV, and dorm locks to AEGIS' },
                { name: 'International Student Visa Portal', category: 'Compliance', desc: 'Automated embassy transcript verification' },
                { name: 'Alumni Fundraising Network', category: 'Finance', desc: 'Direct donor campaign integration with FAAP' }
              ].map((m, idx) => (
                <div key={idx} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-mono text-[10px] font-bold rounded">{m.category}</span>
                    <div className="font-extrabold text-slate-900 mt-2">{m.name}</div>
                    <div className="text-slate-500 text-[11px] mt-1">{m.desc}</div>
                  </div>
                  <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs cursor-pointer">
                    Install Extension
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
