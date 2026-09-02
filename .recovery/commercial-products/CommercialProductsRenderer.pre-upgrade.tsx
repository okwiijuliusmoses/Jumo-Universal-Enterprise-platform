import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Cloud, DollarSign, Shield, BrainCircuit, Database, Cpu, Lock, Terminal, 
  Workflow, BarChart3, Globe, Sparkles, CheckCircle2, ArrowRight, Server, Zap, CreditCard, Activity, Layers
} from "lucide-react";

export function CommercialProductsRenderer() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const products = [
    {
      id: "prod-factory",
      name: "JUMO Universal Manufacturing Factory",
      category: "Platform Creation",
      icon: Cpu,
      color: "indigo",
      tagline: "Autonomous enterprise platform manufacturing and blueprint compilation",
      description: "Generates type-safe commercial enterprise platforms, governance models, portals, digital forms, and workflows on demand.",
      capabilities: [
        "Platform Architecture Scaffolding",
        "Governance & Department Matrix Generator",
        "Digital Form & Workflow Compiler",
        "Live Upgrade & Migration Engine"
      ],
      status: "Installed & Operational",
      version: "v13.4.0",
      priceModel: "Included in UEOS Kernel"
    },
    {
      id: "prod-cloud",
      name: "JUMO Cloud",
      category: "Infrastructure & Compute",
      icon: Cloud,
      color: "blue",
      tagline: "Sovereign hybrid cloud compute, storage, and container hosting",
      description: "Sovereign containerized Cloud Run environment supporting zero-cold-start isolation, edge replication, and multi-region deployment.",
      capabilities: [
        "Distributed Container Runtime",
        "Zero-Trust Network Mesh",
        "Auto-scaling Compute Infrastructure",
        "Isolated Tenant Data Encryption at Rest"
      ],
      status: "Active - 99.99% Uptime",
      version: "v4.2.1",
      priceModel: "Pay-as-you-Scale"
    },
    {
      id: "prod-auditor",
      name: "JUMO Digital Auditor",
      category: "Compliance & Audit",
      icon: Shield,
      color: "purple",
      tagline: "Continuous AI-powered financial, security, and operational audit engine",
      description: "Automated real-time compliance checks across financial ledgers, system logs, user access permissions, and regulatory standards.",
      capabilities: [
        "Double-Entry Ledger Parity Audit",
        "RBAC & ABAC Access Audit",
        "Automated Anti-Money Laundering Sweeps",
        "Real-time Fraud Anomaly Detection"
      ],
      status: "Active & Monitoring",
      version: "v2.8.0",
      priceModel: "Enterprise Subscripton"
    },
    {
      id: "prod-faap",
      name: "JUMO FAAP",
      category: "Financial Core",
      icon: DollarSign,
      color: "emerald",
      tagline: "Financial Accounting and Allocation Platform ledger backbone",
      description: "Immutable double-entry multi-currency accounting engine supporting treasury management, budget control, payroll, and revenue distribution.",
      capabilities: [
        "Immutable Double-Entry Ledger",
        "Automated 1.5% Settlement Clearing Fee Router",
        "Multi-Currency & Treasury Management",
        "Automated Tax & Budget Control Engine"
      ],
      status: "Active Ledger Engine",
      version: "v12.0.0",
      priceModel: "1.5% Transaction Fee"
    },
    {
      id: "prod-pay",
      name: "JUMO DIGITAL PAY",
      category: "Payments & Gateway",
      icon: CreditCard,
      color: "amber",
      tagline: "Universal payment orchestration across Mobile Money, Cards, and Banking APIs",
      description: "Unified payment gateway supporting M-Pesa, Airtel Money, Visa/Mastercard, SWIFT, and regional instant payment rails.",
      capabilities: [
        "Multi-Rail Payment Routing",
        "Instant Mobile Money Settlements",
        "Automated Webhook & Reconciliation",
        "Cryptographically Signed Payment Tokens"
      ],
      status: "Connected - 14 Gateway Rails",
      version: "v5.1.0",
      priceModel: "0.5% Settlement Fee"
    },
    {
      id: "prod-fintech",
      name: "JUMO FINTECH",
      category: "Banking & Credit",
      icon: Zap,
      color: "cyan",
      tagline: "Complete banking, SACCO, and microfinance operational ecosystem",
      description: "Core banking platform managing savings accounts, fixed deposits, credit scoring, automated loan disbursements, and dividend allocation.",
      capabilities: [
        "Automated Credit Risk Engine",
        "SACCO Dividend & Share Capital Ledger",
        "Mobile App & USSD Integration",
        "Regulatory Returns Reporting"
      ],
      status: "Operational",
      version: "v8.3.0",
      priceModel: "Sovereign License"
    },
    {
      id: "prod-aegis",
      name: "JUMO AEGIS",
      category: "Security & Intelligence",
      icon: Lock,
      color: "red",
      tagline: "Autonomous Zero-Trust security intelligence and threat firewall",
      description: "Next-generation security platform providing real-time threat detection, cryptographic key rotation, and administrative MFA gates.",
      capabilities: [
        "Real-Time Penetration & Intrusion Defense",
        "AEGIS Security Intelligence Engine",
        "Cryptographic Key Vault & HSM Integration",
        "Admin MFA Wall & Session Gatekeeper"
      ],
      status: "Protection Active",
      version: "v6.0.0",
      priceModel: "Enterprise Core"
    },
    {
      id: "prod-aicore",
      name: "JUMO AI CORE",
      category: "Cognitive Infrastructure",
      icon: BrainCircuit,
      color: "rose",
      tagline: "Sovereign multi-model cognitive routing gateway and agent swarm",
      description: "Abstract AI gateway connecting Gemini models, specialized reasoning agents, RAG vector memory, and autonomous task execution loops.",
      capabilities: [
        "Multi-Model Cognitive Router",
        "200+ Domain Specialized Agents",
        "Semantic Vector RAG Knowledge Base",
        "Autonomous Decision Engine"
      ],
      status: "247 Agents Online",
      version: "v3.6.0",
      priceModel: "Usage Tokens / Tier"
    },
    {
      id: "prod-datamesh",
      name: "JUMO Data Mesh",
      category: "Data & Analytics",
      icon: Database,
      color: "teal",
      tagline: "National enterprise data sharing and federated query mesh",
      description: "Federated data infrastructure allowing secure cross-departmental data queries, privacy-preserving analytics, and national indicators.",
      capabilities: [
        "Federated SQL Query Engine",
        "Anonymized Data Sharing Pipelines",
        "Real-time ETL Data Sync",
        "National Key Performance Indicators"
      ],
      status: "Operational",
      version: "v2.1.0",
      priceModel: "Sovereign License"
    },
    {
      id: "prod-identity",
      name: "JUMO Identity",
      category: "Identity & Access",
      icon: Server,
      color: "orange",
      tagline: "National digital identity, Single Sign-On, and biometric verification",
      description: "Zero-Trust Identity Provider supporting multi-tenant SSO, biometrics, OAuth2/OIDC, and national ID registry integration.",
      capabilities: [
        "Unified National SSO",
        "Role-Based & Attribute-Based Access Control",
        "Biometric Authentication Bridge",
        "Device & Session Risk Scoring"
      ],
      status: "Operational",
      version: "v4.0.0",
      priceModel: "Included in UEOS"
    },
    {
      id: "prod-workflow",
      name: "JUMO Workflow Engine",
      category: "Automation",
      icon: Workflow,
      color: "violet",
      tagline: "Enterprise business process automation and approval orchestrator",
      description: "BPMN-compliant workflow engine managing multi-step approvals, conditional branching, SLA monitoring, and notification triggers.",
      capabilities: [
        "Visual BPMN Process Designer",
        "SLA Tracking & Escalation Rules",
        "Multi-Party Digital Approvals",
        "AI Process Bottleneck Optimization"
      ],
      status: "Operational",
      version: "v5.2.0",
      priceModel: "Included in UEOS"
    },
    {
      id: "prod-analytics",
      name: "JUMO Analytics",
      category: "Business Intelligence",
      icon: BarChart3,
      color: "sky",
      tagline: "Real-time executive dashboards and predictive enterprise reporting",
      description: "Advanced data visualization suite rendering executive cockpits, automated PDF reports, trend forecasting, and interactive charts.",
      capabilities: [
        "Interactive Executive Cockpits",
        "Automated Scheduled PDF/Excel Export",
        "Predictive Machine Learning Forecasting",
        "Custom KPI & Alerting Studio"
      ],
      status: "Operational",
      version: "v3.0.0",
      priceModel: "Included in UEOS"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-widest">
              Sovereign Product Suite
            </span>
            <span className="text-xs font-bold text-slate-400">Independent Installable Enterprise Platforms</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">JUMO Independent Commercial Platforms</h2>
          <p className="text-slate-500 font-medium mt-1">
            Standalone enterprise products built on the UEOS Kernel, providing national infrastructure capabilities.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900 text-white px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-bold shadow-md">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>12 Core Platforms Ready</span>
          </div>
        </div>
      </div>

      {/* Grid of Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((prod) => (
          <motion.div
            key={prod.id}
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-gradient-to-br from-slate-50 to-white">
              <div className={`w-12 h-12 bg-${prod.color}-50 text-${prod.color}-600 rounded-2xl flex items-center justify-center font-bold shadow-inner`}>
                <prod.icon className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider rounded-full">
                {prod.status}
              </span>
            </div>

            <div className="p-6 flex-1 space-y-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{prod.category}</span>
              <h3 className="text-xl font-black text-slate-900 leading-snug">{prod.name}</h3>
              <p className="text-xs font-semibold text-slate-600 line-clamp-2">{prod.tagline}</p>
              
              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                {prod.capabilities.slice(0, 3).map((cap, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">{prod.version}</span>
              <button
                onClick={() => setSelectedProduct(prod)}
                className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-1"
              >
                Inspect Platform <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Details */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden"
            >
              <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center`}>
                    <selectedProduct.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black">{selectedProduct.name}</h3>
                    <span className="text-xs font-bold text-blue-400">{selectedProduct.category}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedProduct(null)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <div className="p-6 space-y-6">
                <p className="text-sm font-medium text-slate-700 leading-relaxed">{selectedProduct.description}</p>

                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Capabilities & Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProduct.capabilities.map((c: string, idx: number) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> {c}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-blue-700 block">Pricing & Licensing</span>
                    <span className="text-sm font-bold text-slate-900">{selectedProduct.priceModel}</span>
                  </div>
                  <button onClick={() => setSelectedProduct(null)} className="px-5 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700">
                    Deploy Platform
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
