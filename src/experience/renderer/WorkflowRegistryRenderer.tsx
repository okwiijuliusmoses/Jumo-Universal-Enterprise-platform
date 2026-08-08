import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Workflow, Play, CheckCircle, Activity, GitBranch, Settings, Users, Plus, FileText,
  ChevronRight, ShieldCheck, BrainCircuit, Clock, Sparkles, CheckSquare, Zap, X, ArrowRight
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function WorkflowRegistryRenderer() {
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [designerMode, setDesignerMode] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);

  useEffect(() => {
    async function loadWorkflows() {
      try {
        const [wfData, metricData] = await Promise.all([
          UEOSRuntimeClient.fetchWorkflows(),
          UEOSRuntimeClient.fetchDashboardMetrics()
        ]);
        setWorkflows(wfData || []);
        setMetrics(metricData);
      } catch (err) {
        console.error("Workflow loading failed", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadWorkflows();

    const handleSync = () => {
      loadWorkflows();
    };
    window.addEventListener("ueos_registry_sync", handleSync);
    return () => {
      window.removeEventListener("ueos_registry_sync", handleSync);
    };
  }, []);

  const defaultWorkflows = [
    {
      id: "WF-EDU-ADM",
      name: "University Admission & Enrollment Process",
      trigger: "Form Submission (Admission Application)",
      forms: ["Student Application Form", "Academic Record Upload", "Fee Receipt Verification"],
      departments: ["Academic Registrar", "Student Affairs", "FAAP Bursar Office"],
      roles: ["Registrar Officer", "Dean of Students", "Finance Controller"],
      approvalChain: ["Automated Document OCR Check", "Departmental Verification", "Registrar Final Approval"],
      aiAssistance: "JUMO Admission Agent (Transcripts OCR & Eligibility Check)",
      status: "Active",
      executionsToday: 4200,
      slaHours: "24 Hours",
      auditTrail: "FAAP Immutable Ledger Logged"
    },
    {
      id: "WF-HEALTH-TRI",
      name: "Hospital Clinical Triage & EMR Path",
      trigger: "Patient Registration Intake",
      forms: ["Vitals Triage Sheet", "Physician Consultation Note", "Lab Requisition Form"],
      departments: ["Emergency Intake", "Clinical Medicine", "Pharmacy & Diagnostics"],
      roles: ["Triage Nurse", "Attending Physician", "Senior Pharmacist"],
      approvalChain: ["Nurse Severity Rating", "Doctor Diagnosis & Rx Sign-off", "Pharmacy Dispense Clearance"],
      aiAssistance: "JUMO Clinical AI Agent (Drug Interaction Alerting)",
      status: "Active",
      executionsToday: 8900,
      slaHours: "1 Hour",
      auditTrail: "Cryptographic EMR Signature"
    },
    {
      id: "WF-CORP-PROC",
      name: "Enterprise Procurement & Voucher Approval",
      trigger: "Requisition Voucher Submission",
      forms: ["Purchase Requisition Voucher", "Vendor Quotation Matrix", "Budget Allocation Form"],
      departments: ["Procurement Directorate", "FAAP Treasury Office", "Executive Director"],
      roles: ["Procurement Manager", "Internal Auditor", "Chief Financial Officer"],
      approvalChain: ["Market Quotation Verification", "Budget Threshold Gate", "CFO Cryptographic Sign-off"],
      aiAssistance: "JUMO Finance Agent (Fraud Anomaly Sweep & Price Benchmarking)",
      status: "Active",
      executionsToday: 1540,
      slaHours: "12 Hours",
      auditTrail: "FAAP General Ledger Double-Entry Audit"
    }
  ];

  const displayWorkflows = workflows.length > 0 ? workflows.map(w => ({ ...defaultWorkflows[0], ...w })) : defaultWorkflows;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-800 text-[10px] font-black uppercase tracking-widest">
              Process Orchestration Core
            </span>
            <span className="text-xs font-bold text-slate-400">Enterprise Process Automation Engine</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Workflow Runtime Engine</h2>
          <p className="text-slate-500 font-medium mt-1">
            Sovereign process automation runtime connecting digital forms, approval chains, SLA tracking, and AI agents.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setDesignerMode(!designerMode)}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-600 transition-all shadow-md flex items-center gap-2"
          >
            <GitBranch className="w-4 h-4 text-blue-400" />
            {designerMode ? "Exit Process Designer" : "Open Process Designer"}
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Blueprints</span>
            <Workflow className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-3xl font-black text-slate-900">{displayWorkflows.length}</span>
          <span className="text-[10px] font-bold text-emerald-600 block mt-1">100% Operational</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Executions Today</span>
            <Play className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-3xl font-black text-slate-900">250,000</span>
          <span className="text-[10px] font-bold text-blue-600 block mt-1">+14% Growth</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Completion SLA</span>
            <CheckCircle className="w-5 h-5 text-violet-600" />
          </div>
          <span className="text-3xl font-black text-slate-900">99.8%</span>
          <span className="text-[10px] font-bold text-emerald-600 block mt-1">On-Time Approvals</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Assisted Steps</span>
            <BrainCircuit className="w-5 h-5 text-purple-600" />
          </div>
          <span className="text-3xl font-black text-slate-900">18,400</span>
          <span className="text-[10px] font-bold text-purple-600 block mt-1">Automated OCR/Audits</span>
        </div>
      </div>

      {/* Designer Canvas */}
      {designerMode && (
        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="font-bold text-lg text-blue-400 flex items-center gap-2">
              <GitBranch className="w-5 h-5" /> Enterprise BPMN Process Canvas
            </h3>
            <span className="text-xs font-mono bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
              Live Flow Orchestration
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 overflow-x-auto">
            <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl text-center min-w-[160px]">
              <FileText className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <span className="block text-xs font-bold">1. Digital Form Event</span>
              <span className="text-[10px] text-slate-400">Trigger Requisition</span>
            </div>
            <span className="text-slate-500 font-bold hidden md:inline">→</span>
            <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl text-center min-w-[160px]">
              <BrainCircuit className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <span className="block text-xs font-bold">2. AI Validation</span>
              <span className="text-[10px] text-slate-400">Fraud & Price Check</span>
            </div>
            <span className="text-slate-500 font-bold hidden md:inline">→</span>
            <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl text-center min-w-[160px]">
              <Users className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <span className="block text-xs font-bold">3. Multi-Role Gate</span>
              <span className="text-[10px] text-slate-400">Executive Approval</span>
            </div>
            <span className="text-slate-500 font-bold hidden md:inline">→</span>
            <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl text-center min-w-[160px]">
              <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <span className="block text-xs font-bold">4. FAAP Ledger Log</span>
              <span className="text-[10px] text-slate-400">Immutable Sign-off</span>
            </div>
          </div>
        </div>
      )}

      {/* Workflow Process Cards */}
      <div className="space-y-4">
        <h3 className="text-base font-black text-slate-900 uppercase tracking-widest">
          Registered Enterprise Process Automations
        </h3>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {displayWorkflows.map((wf) => (
            <motion.div
              key={wf.id}
              whileHover={{ y: -3 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black uppercase">
                    {wf.id}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> {wf.status}
                  </span>
                </div>
                <h4 className="text-lg font-black text-slate-900 leading-snug">{wf.name}</h4>
                <p className="text-xs font-semibold text-slate-500">Trigger: {wf.trigger}</p>
              </div>

              <div className="space-y-2 text-xs font-medium text-slate-600 border-t border-b border-slate-100 py-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Approval Roles:</span>
                  <span className="font-bold text-slate-800">{wf.roles?.length || 3} Roles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">SLA Target:</span>
                  <span className="font-bold text-slate-800">{wf.slaHours || "24 Hours"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">AI Support:</span>
                  <span className="font-bold text-purple-700 truncate max-w-[180px]">{wf.aiAssistance || "Active"}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedWorkflow(wf)}
                className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-1.5"
              >
                Inspect Workflow Details <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Workflow Inspection Modal */}
      <AnimatePresence>
        {selectedWorkflow && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full border border-slate-200 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                    Process Blueprint Specification
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">{selectedWorkflow.name}</h3>
                </div>
                <button onClick={() => setSelectedWorkflow(null)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs font-semibold text-slate-700">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <span className="text-slate-400 uppercase text-[10px] font-black block">Approval Chain</span>
                  <div className="flex flex-col gap-1.5">
                    {selectedWorkflow.approvalChain?.map((step: string, idx: number) => (
                      <div key={idx} className="p-2.5 bg-white border border-slate-200 rounded-xl font-bold flex items-center gap-2">
                        <span className="w-5 h-5 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 space-y-1">
                  <span className="text-purple-800 uppercase text-[10px] font-black block">AI Agent Assistance</span>
                  <p className="text-purple-950 font-bold">{selectedWorkflow.aiAssistance}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button onClick={() => setSelectedWorkflow(null)} className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl">
                  Close Specification
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
