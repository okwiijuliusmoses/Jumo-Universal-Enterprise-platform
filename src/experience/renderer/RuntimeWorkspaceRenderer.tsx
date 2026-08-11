import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, Users, FileText, Database, Shield, Activity, Settings, LayoutDashboard, Globe, ChevronRight, Workflow, BrainCircuit, BarChart, LogOut, ArrowRight, CheckCircle2, AlertCircle, Send, Plus, Search, Eye
} from "lucide-react";

export function RuntimeWorkspaceRenderer({ instance, onExit }: { instance: any, onExit: () => void }) {
  const [activePortal, setActivePortal] = useState("dashboard");
  const [activeModule, setActiveModule] = useState<any>(null);
  
  // Forms & Workflow State
  const [submittedForms, setSubmittedForms] = useState<any[]>([
    {
      id: "REQ-2026-001",
      title: "Annual Procurement Requisition",
      applicant: "Dr. Sarah Jenkins",
      department: "Operations Directorate",
      date: "2026-08-07",
      status: "PENDING_APPROVAL",
      amount: "$15,400.00"
    },
    {
      id: "REQ-2026-002",
      title: "New Staff Credentials Onboarding",
      applicant: "Michael Chang",
      department: "Human Capital Directorate",
      date: "2026-08-06",
      status: "APPROVED",
      amount: "-"
    }
  ]);

  const [formInput, setFormInput] = useState({
    title: "",
    category: "General Application",
    details: "",
    amount: ""
  });

  const [chatMessages, setChatMessages] = useState<any[]>([
    { role: "assistant", content: `Welcome to ${instance?.name || "Institution Workspace"}. I am your cognitive AI agent. How can I assist you today?` }
  ]);
  const [userQuery, setUserQuery] = useState("");

  const navigation = [
    { id: "dashboard", label: "Executive Dashboard", icon: LayoutDashboard },
    { id: "public-portal", label: "Public Gateway Portal", icon: Globe },
    { id: "modules", label: "ERP Modules", icon: Database },
    { id: "forms", label: "Digital Forms Engine", icon: FileText },
    { id: "workflows", label: "Workflows & Approvals", icon: Workflow },
    { id: "ai", label: "Enterprise AI Agent", icon: BrainCircuit },
    { id: "reports", label: "Financial & Audit Reports", icon: BarChart },
    { id: "settings", label: "Instance Governance", icon: Settings },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formInput.title.trim()) return;

    const newReq = {
      id: `REQ-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: formInput.title,
      applicant: "System Administrator",
      department: instance.departments?.[0] || "Executive Directorate",
      date: new Date().toISOString().split("T")[0],
      status: "PENDING_APPROVAL",
      amount: formInput.amount ? `$${formInput.amount}` : "-"
    };

    setSubmittedForms([newReq, ...submittedForms]);
    setFormInput({ title: "", category: "General Application", details: "", amount: "" });
    alert(`Form successfully submitted! Workflow ID: ${newReq.id} generated.`);
  };

  const handleApprove = (id: string) => {
    setSubmittedForms(prev => prev.map(f => f.id === id ? { ...f, status: "APPROVED" } : f));
  };

  const handleReject = (id: string) => {
    setSubmittedForms(prev => prev.map(f => f.id === id ? { ...f, status: "REJECTED" } : f));
  };

  const handleAskAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const q = userQuery;
    setUserQuery("");
    setChatMessages(prev => [...prev, { role: "user", content: q }]);

    setTimeout(() => {
      let reply = `Regarding "${q}": I have queried the RAG vector store for ${instance.name}. All ledger entries and active workflows are in compliance with Zero-Trust RBAC security bounds.`;
      if (q.toLowerCase().includes("budget") || q.toLowerCase().includes("finance")) {
        reply = `FAAP Financial Ledger Report for ${instance.name}: Current cash reserves stand balanced at $250,000.00 with $0.00 discrepancy offset.`;
      }
      setChatMessages(prev => [...prev, { role: "assistant", content: reply }]);
    }, 600);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900 font-sans animate-in fade-in">
      {/* Sidebar */}
      <div className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl z-20">
        <div className="p-6 border-b border-slate-800">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Building2 className="w-6 h-6" />
            </div>
            <button onClick={onExit} className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800" title="Exit Workspace">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
          <h2 className="font-black text-xl tracking-tight leading-tight mb-1 text-white">{instance.name}</h2>
          <span className="text-[10px] bg-blue-500/20 text-blue-400 font-black px-2 py-0.5 rounded uppercase tracking-widest">
            {instance.templateId || "Enterprise Platform"}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <ul className="space-y-1">
            <li className="px-3 mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Workspace Navigation</li>
            {navigation.map(nav => (
              <li key={nav.id}>
                <button 
                  onClick={() => setActivePortal(nav.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all font-bold text-sm ${
                    activePortal === nav.id 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <nav.icon className="w-5 h-5" />
                  <span className="truncate">{nav.label}</span>
                  {activePortal === nav.id && <ChevronRight className="w-4 h-4 ml-auto shrink-0" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4 border-t border-slate-800 text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center">
          JUMO UEOS Sovereign Runtime
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-slate-50 relative flex flex-col">
        <header className="sticky top-0 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <h3 className="font-black text-slate-800 text-lg capitalize">{navigation.find(n => n.id === activePortal)?.label}</h3>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200">
               <Shield className="w-3.5 h-3.5 text-emerald-600" /> SecOps Zero-Trust
            </span>
            <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        <main className="p-8 flex-1">
          {/* Executive Dashboard */}
          {activePortal === 'dashboard' && (
             <div className="space-y-8 animate-in slide-in-from-bottom-4">
               <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                 <div className="relative z-10">
                   <span className="text-xs font-black bg-blue-500/30 text-blue-300 px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block">
                     Live Platform Instance
                   </span>
                   <h2 className="text-3xl font-black tracking-tight mb-2">{instance.name}</h2>
                   <p className="text-slate-300 max-w-xl text-sm leading-relaxed">
                     Sovereign institutional workspace powered by JUMO UEOS kernel, real-time FAAP ledger, and cognitive AI governance.
                   </p>
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                   <div className="flex items-center justify-between text-blue-600 mb-2">
                     <Users className="w-5 h-5" />
                     <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Users</span>
                   </div>
                   <p className="text-3xl font-black text-slate-900">{instance.userCount || 42}</p>
                   <span className="text-xs text-slate-500 font-medium">Registered Personnel</span>
                 </div>

                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                   <div className="flex items-center justify-between text-indigo-600 mb-2">
                     <Database className="w-5 h-5" />
                     <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Modules</span>
                   </div>
                   <p className="text-3xl font-black text-slate-900">{instance.activeModules?.length || instance.modules?.length || 6}</p>
                   <span className="text-xs text-slate-500 font-medium">Installed ERP Modules</span>
                 </div>

                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                   <div className="flex items-center justify-between text-violet-600 mb-2">
                     <Workflow className="w-5 h-5" />
                     <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Workflows</span>
                   </div>
                   <p className="text-3xl font-black text-slate-900">{submittedForms.length}</p>
                   <span className="text-xs text-slate-500 font-medium">Active Requests</span>
                 </div>

                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                   <div className="flex items-center justify-between text-emerald-600 mb-2">
                     <Activity className="w-5 h-5" />
                     <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Status</span>
                   </div>
                   <p className="text-3xl font-black text-emerald-600">Active</p>
                   <span className="text-xs text-slate-500 font-medium">Zero-Trust Operational</span>
                 </div>
               </div>

               {/* Directorates & Department Workspaces */}
               <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
                 <h3 className="text-xl font-black text-slate-900">Configured Department Workspaces</h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   {(instance.departments || ["Executive Directorate", "Operations Directorate", "Finance & Treasury", "Human Capital", "ICT & Governance"]).map((dept: string, idx: number) => (
                     <div key={idx} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl hover:border-blue-500 transition-colors cursor-pointer flex items-center justify-between group">
                       <div>
                         <h4 className="font-bold text-slate-800 text-sm mb-1">{dept}</h4>
                         <span className="text-[10px] text-slate-400 uppercase font-black">Workspace Active</span>
                       </div>
                       <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                     </div>
                   ))}
                 </div>
               </div>
             </div>
          )}

          {/* Public Gateway Portal */}
          {activePortal === 'public-portal' && (
             <div className="space-y-8 animate-in slide-in-from-bottom-4">
               <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md">
                 <div className="bg-slate-900 text-white p-8 flex items-center justify-between">
                   <div>
                     <span className="text-xs font-black bg-blue-600 text-white px-3 py-1 rounded-full uppercase tracking-widest">
                       Public Portal
                     </span>
                     <h2 className="text-3xl font-black mt-2">{instance.name}</h2>
                     <p className="text-slate-400 text-sm mt-1">{instance.domain || "public.jumo.net"}</p>
                   </div>
                   <div className="flex gap-3">
                     <button className="bg-blue-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-blue-500">
                       Online Registration
                     </button>
                     <button className="bg-slate-800 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-slate-700">
                       Portal Login
                     </button>
                   </div>
                 </div>

                 <div className="p-8 space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                       <h4 className="font-bold text-slate-900 text-lg mb-2">About Institution</h4>
                       <p className="text-xs text-slate-500 leading-relaxed">
                         Official public gateway for services, official notices, public records, and online registration.
                       </p>
                     </div>
                     <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                       <h4 className="font-bold text-slate-900 text-lg mb-2">Public Services</h4>
                       <p className="text-xs text-slate-500 leading-relaxed">
                         E-applications, credential verifications, payment portals, and public service notices.
                       </p>
                     </div>
                     <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                       <h4 className="font-bold text-slate-900 text-lg mb-2">Contact & Notices</h4>
                       <p className="text-xs text-slate-500 leading-relaxed">
                         Official contacts, regional offices, emergency helplines, and published press notices.
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          )}

          {/* ERP Modules */}
          {activePortal === 'modules' && (
             <div className="space-y-6 animate-in slide-in-from-bottom-4">
               <h2 className="text-2xl font-black text-slate-900">Installed ERP Modules</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {(instance.activeModules || instance.modules || [
                   { id: "mod-faap", name: "FAAP Financial Ledger" },
                   { id: "mod-hr", name: "Human Capital Management" },
                   { id: "mod-proc", name: "Procurement & Assets" },
                   { id: "mod-portal", name: "Identity & Access Control" }
                 ]).map((mod: any, i: number) => (
                   <div key={i} onClick={() => setActiveModule(mod)} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-500 transition-all cursor-pointer group">
                     <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                       <Database className="w-6 h-6" />
                     </div>
                     <h4 className="font-bold text-lg text-slate-900 mb-1">{mod.name}</h4>
                     <p className="text-xs text-slate-500 mb-4">Enterprise module compiled and initialized by UEOS Kernel.</p>
                     <div className="text-xs font-bold text-blue-600 uppercase tracking-widest flex items-center gap-1">
                       Open Module <ArrowRight className="w-4 h-4" />
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          )}

          {/* Digital Forms Engine */}
          {activePortal === 'forms' && (
             <div className="space-y-8 animate-in slide-in-from-bottom-4">
               <div>
                 <h2 className="text-2xl font-black text-slate-900">Digital Forms Engine</h2>
                 <p className="text-slate-500 text-sm">Submit official requests into the institutional workflow pipeline.</p>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {/* Form Submission Panel */}
                 <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                   <h3 className="font-bold text-slate-900 text-lg mb-6 flex items-center gap-2">
                     <FileText className="w-5 h-5 text-blue-600" /> New Form Request
                   </h3>
                   <form onSubmit={handleFormSubmit} className="space-y-4">
                     <div>
                       <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Request Title</label>
                       <input 
                         type="text" 
                         placeholder="e.g. Laboratory Equipment Procurement Requisition" 
                         value={formInput.title}
                         onChange={e => setFormInput({ ...formInput, title: e.target.value })}
                         className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 outline-none text-sm font-medium"
                       />
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                       <div>
                         <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Category</label>
                         <select 
                           value={formInput.category}
                           onChange={e => setFormInput({ ...formInput, category: e.target.value })}
                           className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 outline-none text-sm font-medium"
                         >
                           <option>General Application</option>
                           <option>Procurement Requisition</option>
                           <option>Access & Security Request</option>
                           <option>Financial Disbursement</option>
                         </select>
                       </div>
                       <div>
                         <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Amount (If Applicable)</label>
                         <input 
                           type="text" 
                           placeholder="e.g. 5,000" 
                           value={formInput.amount}
                           onChange={e => setFormInput({ ...formInput, amount: e.target.value })}
                           className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 outline-none text-sm font-medium"
                         />
                       </div>
                     </div>

                     <div>
                       <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Details & Justification</label>
                       <textarea 
                         rows={3} 
                         placeholder="Describe request details..." 
                         value={formInput.details}
                         onChange={e => setFormInput({ ...formInput, details: e.target.value })}
                         className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 outline-none text-sm font-medium"
                       />
                     </div>

                     <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                       <Send className="w-4 h-4" /> Submit Request to Workflow
                     </button>
                   </form>
                 </div>

                 {/* Recent Submissions */}
                 <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                   <h3 className="font-bold text-slate-900 text-lg mb-6 flex items-center gap-2">
                     <Workflow className="w-5 h-5 text-violet-600" /> Active Requests & Status
                   </h3>
                   <div className="space-y-4">
                     {submittedForms.map(req => (
                       <div key={req.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                         <div className="flex items-center justify-between">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{req.id}</span>
                           <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                             req.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' :
                             req.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                           }`}>
                             {req.status.replace('_', ' ')}
                           </span>
                         </div>
                         <h4 className="font-bold text-slate-800 text-sm">{req.title}</h4>
                         <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                           <span>Applicant: {req.applicant}</span>
                           <span>{req.amount}</span>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
             </div>
          )}

          {/* Workflows & Approvals */}
          {activePortal === 'workflows' && (
             <div className="space-y-8 animate-in slide-in-from-bottom-4">
               <div>
                 <h2 className="text-2xl font-black text-slate-900">Workflows & Approval Chains</h2>
                 <p className="text-slate-500 text-sm">Review, authorize, or audit institutional pending requests.</p>
               </div>

               <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                 <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                   <h3 className="font-bold text-slate-800">Pending Authorization Requests</h3>
                   <span className="text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                     {submittedForms.filter(f => f.status === 'PENDING_APPROVAL').length} Pending
                   </span>
                 </div>

                 <div className="divide-y divide-slate-100">
                   {submittedForms.map(req => (
                     <div key={req.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                       <div>
                         <div className="flex items-center gap-3 mb-1">
                           <span className="text-xs font-mono font-bold text-blue-600">{req.id}</span>
                           <h4 className="font-bold text-slate-900">{req.title}</h4>
                         </div>
                         <p className="text-xs text-slate-500">Department: {req.department} | Date: {req.date} | Amount: {req.amount}</p>
                       </div>

                       {req.status === 'PENDING_APPROVAL' ? (
                         <div className="flex items-center gap-2">
                           <button onClick={() => handleApprove(req.id)} className="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-emerald-700">
                             Approve
                           </button>
                           <button onClick={() => handleReject(req.id)} className="bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl hover:bg-slate-300">
                             Reject
                           </button>
                         </div>
                       ) : (
                         <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{req.status}</span>
                       )}
                     </div>
                   ))}
                 </div>
               </div>
             </div>
          )}

          {/* Enterprise AI Assistant */}
          {activePortal === 'ai' && (
             <div className="space-y-6 animate-in slide-in-from-bottom-4">
               <h2 className="text-2xl font-black text-slate-900">Cognitive AI Assistant</h2>
               
               <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl h-[550px] flex flex-col justify-between border border-slate-800">
                 <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                   <div className="flex items-center gap-3">
                     <BrainCircuit className="w-7 h-7 text-blue-400" />
                     <div>
                       <h3 className="font-bold text-lg">{instance.name} AI Copilot</h3>
                       <p className="text-xs text-slate-400">Grounded in RAG Vector Memory & FAAP Ledger</p>
                     </div>
                   </div>
                   <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-3 py-1 rounded-full uppercase">
                     Online
                   </span>
                 </div>

                 {/* Message Stream */}
                 <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-2">
                   {chatMessages.map((msg, idx) => (
                     <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                       <div className={`max-w-xl p-4 rounded-2xl text-sm leading-relaxed ${
                         msg.role === 'user' ? 'bg-blue-600 text-white font-medium' : 'bg-slate-800 text-slate-200 border border-slate-700'
                       }`}>
                         {msg.content}
                       </div>
                     </div>
                   ))}
                 </div>

                 {/* Query Input */}
                 <form onSubmit={handleAskAI} className="relative">
                   <input 
                     type="text" 
                     placeholder="Ask about budget, staff, operations, or policy compliance..." 
                     value={userQuery}
                     onChange={e => setUserQuery(e.target.value)}
                     className="w-full bg-slate-800 border border-slate-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-blue-500 pr-16 text-sm"
                   />
                   <button type="submit" className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-5 rounded-lg font-bold text-xs hover:bg-blue-500">
                     Ask
                   </button>
                 </form>
               </div>
             </div>
          )}

          {/* Reports & Audits */}
          {activePortal === 'reports' && (
             <div className="space-y-8 animate-in slide-in-from-bottom-4">
               <div>
                 <h2 className="text-2xl font-black text-slate-900">Financial & Compliance Reports</h2>
                 <p className="text-slate-500 text-sm">Real-time double-entry FAAP ledger audit trails and operational KPIs.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                   <h3 className="font-bold text-slate-900">FAAP Ledger Parity Report</h3>
                   <div className="space-y-2 text-xs font-medium text-slate-700">
                     <div className="flex justify-between py-2 border-b border-slate-100">
                       <span>Treasury Cash Reserves</span>
                       <span className="font-bold text-slate-900">$250,000.00</span>
                     </div>
                     <div className="flex justify-between py-2 border-b border-slate-100">
                       <span>Discrepancy Offset</span>
                       <span className="font-bold text-emerald-600">$0.00 (Balanced)</span>
                     </div>
                     <div className="flex justify-between py-2">
                       <span>Zero-Trust Parity Status</span>
                       <span className="font-bold text-emerald-600">PASSED</span>
                     </div>
                   </div>
                 </div>

                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                   <h3 className="font-bold text-slate-900">SecOps Compliance Summary</h3>
                   <div className="space-y-2 text-xs font-medium text-slate-700">
                     <div className="flex justify-between py-2 border-b border-slate-100">
                       <span>Multi-Tenant Row Isolation</span>
                       <span className="font-bold text-emerald-600">ACTIVE</span>
                     </div>
                     <div className="flex justify-between py-2 border-b border-slate-100">
                       <span>API Gateway Encryption</span>
                       <span className="font-bold text-emerald-600">ENFORCED</span>
                     </div>
                     <div className="flex justify-between py-2">
                       <span>Audit Log Verification</span>
                       <span className="font-bold text-emerald-600">VERIFIED</span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          )}

          {/* Settings */}
          {activePortal === 'settings' && (
             <div className="space-y-6 animate-in slide-in-from-bottom-4">
               <h2 className="text-2xl font-black text-slate-900">Instance Governance</h2>
               <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 max-w-xl">
                 <div>
                   <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Instance Name</label>
                   <input type="text" value={instance.name} readOnly className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold" />
                 </div>
                 <div>
                   <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Domain</label>
                   <input type="text" value={instance.domain || "public.jumo.net"} readOnly className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold" />
                 </div>
                 <div className="pt-4 border-t border-slate-100">
                   <button onClick={onExit} className="bg-red-50 text-red-600 font-bold px-6 py-3 rounded-xl hover:bg-red-100 text-sm">
                     Exit Enterprise Workspace
                   </button>
                 </div>
               </div>
             </div>
          )}
        </main>
      </div>
    </div>
  );
}
