import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Cloud,
  DollarSign,
  Shield,
  BrainCircuit,
  Database,
  Cpu,
  Lock,
  Workflow,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Server,
  Zap,
  CreditCard,
  Layers,
  Network,
  Link2,
  Activity,
  RefreshCw,
  X,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  color: string;
  iconClass: string;
  bgClass: string;
  tagline: string;
  description: string;
  capabilities: string[];
  status: string;
  version: string;
  priceModel: string;
};

const products: Product[] = [
  {
    id: "prod-factory",
    name: "JUMO Universal Manufacturing Factory",
    category: "Platform Creation",
    icon: Cpu,
    color: "indigo",
    iconClass: "text-indigo-600",
    bgClass: "bg-indigo-50",
    tagline: "Autonomous enterprise platform manufacturing and blueprint compilation",
    description:
      "Commercial platform manufacturing environment for creating, configuring, upgrading, and operating enterprise applications and institutional platforms.",
    capabilities: [
      "Platform Architecture Scaffolding",
      "Governance & Department Matrix Generator",
      "Digital Form & Workflow Compiler",
      "Live Upgrade & Migration Engine",
    ],
    status: "Installed & Operational",
    version: "v13.4.0",
    priceModel: "Commercial Platform License",
  },
  {
    id: "prod-cloud",
    name: "JUMO Cloud",
    category: "Infrastructure & Compute",
    icon: Cloud,
    color: "blue",
    iconClass: "text-blue-600",
    bgClass: "bg-blue-50",
    tagline: "Sovereign hybrid cloud compute, storage, and container hosting",
    description:
      "Hybrid infrastructure product providing compute, storage, networking, deployment, replication, and infrastructure services to every participating JUMO product.",
    capabilities: [
      "Distributed Container Runtime",
      "Zero-Trust Network Mesh",
      "Auto-scaling Compute Infrastructure",
      "Isolated Tenant Data Encryption at Rest",
    ],
    status: "Operational",
    version: "v4.2.1",
    priceModel: "Pay-as-you-Scale",
  },
  {
    id: "prod-auditor",
    name: "JUMO Digital Auditor",
    category: "Compliance & Audit",
    icon: Shield,
    color: "purple",
    iconClass: "text-purple-600",
    bgClass: "bg-purple-50",
    tagline: "Continuous AI-powered financial, security, and operational audit",
    description:
      "Independent audit and assurance product that can inspect transactions, access, workflows, configurations, security events, and operational activity across participating products.",
    capabilities: [
      "Double-Entry Ledger Parity Audit",
      "RBAC & ABAC Access Audit",
      "Automated Compliance Sweeps",
      "Real-time Fraud Anomaly Detection",
    ],
    status: "Active & Monitoring",
    version: "v2.8.0",
    priceModel: "Enterprise Subscription",
  },
  {
    id: "prod-faap",
    name: "JUMO FAAP",
    category: "Financial Accounting",
    icon: DollarSign,
    color: "emerald",
    iconClass: "text-emerald-600",
    bgClass: "bg-emerald-50",
    tagline: "Financial accounting, allocation, treasury, and settlement services",
    description:
      "Independent financial product providing accounting, treasury, allocation, budgeting, settlement, payroll, and financial control services that can be consumed by any commercial product.",
    capabilities: [
      "Immutable Double-Entry Ledger",
      "Settlement & Clearing Fee Router",
      "Multi-Currency & Treasury Management",
      "Automated Tax & Budget Control",
    ],
    status: "Operational",
    version: "v12.0.0",
    priceModel: "Transaction & Enterprise Plans",
  },
  {
    id: "prod-pay",
    name: "JUMO DIGITAL PAY",
    category: "Payments & Gateway",
    icon: CreditCard,
    color: "amber",
    iconClass: "text-amber-600",
    bgClass: "bg-amber-50",
    tagline: "Universal payment orchestration across mobile, cards, and banking rails",
    description:
      "Independent payment product that provides payment initiation, routing, settlement, reconciliation, and payment-status services to every participating JUMO product.",
    capabilities: [
      "Multi-Rail Payment Routing",
      "Mobile Money Settlements",
      "Webhook & Reconciliation",
      "Cryptographically Signed Payment Tokens",
    ],
    status: "Operational",
    version: "v5.1.0",
    priceModel: "Transaction Fee / Enterprise Plan",
  },
  {
    id: "prod-fintech",
    name: "JUMO FINTECH",
    category: "Banking & Credit",
    icon: Zap,
    color: "cyan",
    iconClass: "text-cyan-600",
    bgClass: "bg-cyan-50",
    tagline: "Banking, SACCO, credit, savings, and financial-services ecosystem",
    description:
      "Independent financial-services product managing savings, credit, deposits, lending, shares, dividends, risk evaluation, and financial-service workflows.",
    capabilities: [
      "Automated Credit Risk Engine",
      "SACCO Dividend & Share Capital",
      "Mobile & USSD Integration",
      "Regulatory Returns Reporting",
    ],
    status: "Operational",
    version: "v8.3.0",
    priceModel: "Sovereign Commercial License",
  },
  {
    id: "prod-aegis",
    name: "JUMO AEGIS",
    category: "Security & Intelligence",
    icon: Lock,
    color: "red",
    iconClass: "text-red-600",
    bgClass: "bg-red-50",
    tagline: "Autonomous zero-trust security intelligence and threat defense",
    description:
      "Independent cybersecurity product providing identity protection, threat detection, security analytics, cryptographic services, and security enforcement across participating products.",
    capabilities: [
      "Real-Time Intrusion Defense",
      "Security Intelligence Engine",
      "Cryptographic Key & HSM Integration",
      "MFA & Session Protection",
    ],
    status: "Protection Active",
    version: "v6.0.0",
    priceModel: "Enterprise Security License",
  },
  {
    id: "prod-aicore",
    name: "JUMO AI",
    category: "Artificial Intelligence",
    icon: BrainCircuit,
    color: "rose",
    iconClass: "text-rose-600",
    bgClass: "bg-rose-50",
    tagline: "Multi-model cognitive routing, knowledge, and AI-agent services",
    description:
      "Independent AI product providing model routing, domain agents, knowledge retrieval, reasoning assistance, automation intelligence, and AI services to participating products.",
    capabilities: [
      "Multi-Model Cognitive Routing",
      "Domain Specialized Agents",
      "Semantic Knowledge & RAG",
      "Autonomous Task Assistance",
    ],
    status: "Operational",
    version: "v3.6.0",
    priceModel: "Usage / Enterprise Tier",
  },
  {
    id: "prod-datamesh",
    name: "JUMO Data Mesh",
    category: "Data & Analytics",
    icon: Database,
    color: "teal",
    iconClass: "text-teal-600",
    bgClass: "bg-teal-50",
    tagline: "Federated enterprise data exchange and analytical services",
    description:
      "Independent data product providing governed data exchange, federated queries, synchronization, analytical datasets, and cross-product data services.",
    capabilities: [
      "Federated Query Services",
      "Governed Data Sharing",
      "Real-time Data Synchronization",
      "Enterprise KPI Data Services",
    ],
    status: "Operational",
    version: "v2.1.0",
    priceModel: "Sovereign Commercial License",
  },
  {
    id: "prod-identity",
    name: "JUMO Identity",
    category: "Identity & Access",
    icon: Server,
    color: "orange",
    iconClass: "text-orange-600",
    bgClass: "bg-orange-50",
    tagline: "Digital identity, authentication, SSO, and access services",
    description:
      "Independent identity product providing authentication, identity verification, SSO, authorization, device trust, and identity services to participating products.",
    capabilities: [
      "Unified Identity & SSO",
      "Role & Attribute Access Control",
      "Identity Verification Bridge",
      "Device & Session Risk Scoring",
    ],
    status: "Operational",
    version: "v4.0.0",
    priceModel: "Identity Service Plans",
  },
  {
    id: "prod-workflow",
    name: "JUMO Workflow",
    category: "Automation",
    icon: Workflow,
    color: "violet",
    iconClass: "text-violet-600",
    bgClass: "bg-violet-50",
    tagline: "Business process automation and approval orchestration",
    description:
      "Independent workflow product providing process orchestration, approvals, conditional routing, SLA management, notifications, and workflow intelligence.",
    capabilities: [
      "Visual Process Designer",
      "SLA Tracking & Escalation",
      "Multi-Party Digital Approvals",
      "AI Process Optimization",
    ],
    status: "Operational",
    version: "v5.2.0",
    priceModel: "Workflow Service Plans",
  },
  {
    id: "prod-analytics",
    name: "JUMO Analytics",
    category: "Business Intelligence",
    icon: BarChart3,
    color: "sky",
    iconClass: "text-sky-600",
    bgClass: "bg-sky-50",
    tagline: "Real-time reporting, intelligence, forecasting, and enterprise analytics",
    description:
      "Independent analytics product providing reporting, visualization, forecasting, KPI management, alerts, and decision-support services across participating products.",
    capabilities: [
      "Interactive Executive Cockpits",
      "Scheduled Reports & Exports",
      "Predictive Forecasting",
      "KPI & Alerting Studio",
    ],
    status: "Operational",
    version: "v3.0.0",
    priceModel: "Analytics Service Plans",
  },
];

const productMap = new Map(products.map((product) => [product.id, product]));

function getPeerProducts(productId: string) {
  return products.filter((product) => product.id !== productId);
}

export function CommercialProductsRenderer() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showNetwork, setShowNetwork] = useState(false);

  const networkStats = useMemo(() => {
    const count = products.length;
    return {
      products: count,
      possibleConnections: count * (count - 1),
      equalPeers: count,
    };
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Commercial Product Identity */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-widest">
                JUMO Commercial Products
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-widest">
                Equal Operational Standing
              </span>
            </div>

            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              JUMO Commercial Product Ecosystem
            </h2>

            <p className="text-slate-500 font-medium mt-2 max-w-4xl">
              Independent, installable, interoperable commercial products that
              operate as equal participants in one integrated JUMO digital
              ecosystem. No commercial product is subordinate to another.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl flex items-center gap-3 shadow-md">
              <Layers className="w-4 h-4 text-blue-400" />
              <div>
                <span className="block text-lg font-black leading-none">
                  {networkStats.products}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-400">
                  Equal Products
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-sm">
              <Network className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="block text-lg font-black text-slate-900 leading-none">
                  {networkStats.possibleConnections}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-400">
                  Peer Paths
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowNetwork((value) => !value)}
              className="px-4 py-3 rounded-2xl bg-blue-600 text-white text-xs font-black uppercase tracking-wider hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Network className="w-4 h-4" />
              {showNetwork ? "Hide Network" : "View Network"}
            </button>
          </div>
        </div>
      </div>

      {/* Operating Principle */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Link2 className="w-6 h-6" />
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              Universal Product Interoperability
            </h3>
            <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
              Every product may publish services, consume services, exchange
              governed data, initiate workflows, request identity services,
              use AI capabilities, initiate payments, request financial
              services, and receive operational events from every other
              participating product.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center min-w-[320px]">
            {[
              ["Service", "Exchange"],
              ["Data", "Exchange"],
              ["Events", "Exchange"],
              ["Workflows", "Exchange"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl bg-slate-50 border border-slate-100 p-2"
              >
                <span className="block text-[9px] uppercase tracking-widest font-black text-slate-400">
                  {label}
                </span>
                <span className="block text-[10px] font-black text-slate-800 mt-1">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Network View */}
      <AnimatePresence>
        {showNetwork && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-slate-950 rounded-3xl p-6 text-white border border-slate-800">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-black text-blue-400">
                    Product Interoperability Network
                  </span>
                  <h3 className="text-xl font-black mt-1">
                    Equal Peer Connectivity
                  </h3>
                </div>
                <Activity className="w-5 h-5 text-emerald-400" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="text-left rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 p-3 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <product.icon className="w-4 h-4 text-blue-400" />
                      <span className="text-[10px] font-black truncate">
                        {product.name.replace("JUMO ", "")}
                      </span>
                    </div>
                    <span className="block text-[9px] text-emerald-400 mt-2 font-bold">
                      {products.length - 1} peer connections available
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-gradient-to-br from-slate-50 to-white">
              <div
                className={`w-12 h-12 ${product.bgClass} ${product.iconClass} rounded-2xl flex items-center justify-center font-bold shadow-inner`}
              >
                <product.icon className="w-6 h-6" />
              </div>

              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider rounded-full">
                {product.status}
              </span>
            </div>

            <div className="p-6 flex-1 space-y-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                {product.category}
              </span>

              <h3 className="text-xl font-black text-slate-900 leading-snug">
                {product.name}
              </h3>

              <p className="text-xs font-semibold text-slate-600 line-clamp-2">
                {product.tagline}
              </p>

              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                {product.capabilities.slice(0, 3).map((capability) => (
                  <div
                    key={capability}
                    className="flex items-center gap-2 text-xs font-medium text-slate-700"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{capability}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-2">
                  <span className="block text-[8px] uppercase tracking-widest font-black text-slate-400">
                    Standing
                  </span>
                  <span className="block text-[10px] font-black text-slate-800 mt-1">
                    Equal Peer
                  </span>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-100 p-2">
                  <span className="block text-[8px] uppercase tracking-widest font-black text-slate-400">
                    Connectivity
                  </span>
                  <span className="block text-[10px] font-black text-emerald-700 mt-1">
                    {products.length - 1} Peers
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">
                {product.version}
              </span>

              <button
                onClick={() => setSelectedProduct(product)}
                className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-1"
              >
                Inspect & Integrate
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Product Inspection */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 bg-slate-950 text-white flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 ${selectedProduct.bgClass} ${selectedProduct.iconClass} rounded-xl flex items-center justify-center shrink-0`}
                  >
                    <selectedProduct.icon className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xl font-black truncate">
                      {selectedProduct.name}
                    </h3>
                    <span className="text-xs font-bold text-blue-400">
                      {selectedProduct.category} · Equal Peer Product
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-slate-400 hover:text-white p-2"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <p className="text-sm font-medium text-slate-700 leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      Operational Status
                    </span>
                    <span className="block text-sm font-black text-emerald-700 mt-1">
                      {selectedProduct.status}
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      Product Version
                    </span>
                    <span className="block text-sm font-black text-slate-900 mt-1">
                      {selectedProduct.version}
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      Operational Standing
                    </span>
                    <span className="block text-sm font-black text-blue-700 mt-1">
                      Equal Peer
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                    Capabilities & Features
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProduct.capabilities.map((capability) => (
                      <div
                        key={capability}
                        className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-800"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        {capability}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                        Available Peer Integrations
                      </h4>
                      <p className="text-[10px] text-slate-500 font-medium mt-1">
                        No hierarchy. Each peer may exchange services,
                        data, events, and workflows.
                      </p>
                    </div>

                    <RefreshCw className="w-4 h-4 text-blue-600" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {getPeerProducts(selectedProduct.id).map((peer) => (
                      <button
                        key={peer.id}
                        onClick={() => setSelectedProduct(peer)}
                        className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 transition-colors text-left flex items-center gap-3"
                      >
                        <div
                          className={`w-9 h-9 ${peer.bgClass} ${peer.iconClass} rounded-lg flex items-center justify-center shrink-0`}
                        >
                          <peer.icon className="w-4 h-4" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <span className="block text-xs font-black text-slate-800 truncate">
                            {peer.name}
                          </span>
                          <span className="block text-[9px] text-emerald-700 font-bold mt-0.5">
                            Peer integration available
                          </span>
                        </div>

                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <div className="flex items-start gap-3">
                    <Network className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-black uppercase text-blue-700 block">
                        Interoperability Contract
                      </span>
                      <p className="text-xs font-medium text-slate-700 mt-1 leading-relaxed">
                        This product is independently deployable and may
                        participate in the same commercial ecosystem as every
                        other JUMO product. Integration is service-based and
                        bidirectional where supported. No product is classified
                        as the parent, subordinate, or exclusive operational
                        center of another commercial product.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 block">
                      Pricing & Licensing
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {selectedProduct.priceModel}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="px-5 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700"
                  >
                    Close Product Inspection
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
