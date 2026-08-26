import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Cloud,
  DollarSign,
  Shield,
  BrainCircuit,
  Database,
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
  GraduationCap,
  School,
  BookOpen,
  Church,
  Users,
  Landmark,
  Building2,
  Wallet
} from "lucide-react";

export type Product = {
  id: string;
  name: string;
  category: "SOVEREIGN_PRODUCT" | "SHARED_PLATFORM";
  categoryLabel: string;
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
  directoratesCount?: number;
  departmentsCount?: number;
  portalsCount?: number;
  modulesCount?: number;
};

const products: Product[] = [
  // === 6 SOVEREIGN PRODUCTS ===
  {
    id: "prod-fintech",
    name: "JUMO FINTECH",
    category: "SOVEREIGN_PRODUCT",
    categoryLabel: "Sovereign Product • Financial Services",
    icon: Zap,
    color: "cyan",
    iconClass: "text-cyan-600",
    bgClass: "bg-cyan-50",
    tagline: "SACCO, Microfinance, Credit Unions & Banking Ecosystem",
    description:
      "Full-scale sovereign financial product managing member savings, credit scoring, loan origination, share capital, dividend distribution, mobile money lending, and central bank prudential returns.",
    capabilities: [
      "SACCO Member & Share Capital Management",
      "Automated Credit Scoring & Risk Underwriting",
      "Loan Origination, Repayment & Arrears Recovery",
      "USSD / Mobile Money Self-Service Banking",
      "Regulatory Returns & Prudential Compliance"
    ],
    status: "Active & Certified",
    version: "v8.4.0",
    priceModel: "Sovereign Commercial License",
    directoratesCount: 4,
    departmentsCount: 8,
    portalsCount: 4,
    modulesCount: 32
  },
  {
    id: "prod-nursery-primary",
    name: "JUMO NURSERY & PRIMARY ERP",
    category: "SOVEREIGN_PRODUCT",
    categoryLabel: "Sovereign Product • Early Education",
    icon: School,
    color: "amber",
    iconClass: "text-amber-600",
    bgClass: "bg-amber-50",
    tagline: "Early childhood, nursery, and primary school institutional operating system",
    description:
      "Comprehensive school management system covering pupil admissions, continuous assessment tracking, CBC & standard grading, automated fee billing, parent communications, transport, and nutrition.",
    capabilities: [
      "Pupil Enrollment & Bio-Demographic Records",
      "Early Years Continuous Assessment & Competency Matrix",
      "Fee Billing, Invoicing & Direct Bank Reconciliation",
      "School Transport, Meal & Daily Attendance Tracking",
      "Parent Portal & SMS Progress Reporting"
    ],
    status: "Active & Certified",
    version: "v6.2.0",
    priceModel: "Institutional License",
    directoratesCount: 4,
    departmentsCount: 8,
    portalsCount: 4,
    modulesCount: 28
  },
  {
    id: "prod-secondary-school",
    name: "JUMO SECONDARY SCHOOL ERP",
    category: "SOVEREIGN_PRODUCT",
    categoryLabel: "Sovereign Product • Secondary Education",
    icon: BookOpen,
    color: "blue",
    iconClass: "text-blue-600",
    bgClass: "bg-blue-50",
    tagline: "Secondary education, boarding, academic departments, and national examinations",
    description:
      "End-to-end secondary school ERP managing academic departments, national exam registration, boarding house allocation, teacher workload, laboratory asset control, disciplinary records, and student billing.",
    capabilities: [
      "Curriculum & Subject Combination Timetabling",
      "National Examination Registration & Transcript Engine",
      "Boarding House & Hostels Management",
      "Science Lab & Library Inventory Control",
      "Teacher Workload & Academic Performance Analytics"
    ],
    status: "Active & Certified",
    version: "v7.1.0",
    priceModel: "Institutional License",
    directoratesCount: 5,
    departmentsCount: 10,
    portalsCount: 5,
    modulesCount: 36
  },
  {
    id: "prod-university-tertiary",
    name: "JUMO UNIVERSITY & TERTIARY ERP",
    category: "SOVEREIGN_PRODUCT",
    categoryLabel: "Sovereign Product • Higher Education",
    icon: GraduationCap,
    color: "indigo",
    iconClass: "text-indigo-600",
    bgClass: "bg-indigo-50",
    tagline: "Collegiate faculties, research grants, senate grading, and student lifecycle",
    description:
      "Enterprise collegiate operating system supporting faculty governance, credit hours, research grant allocation, senate graduation clearance, campus hostel accommodation, bursary clearing, and online course registration.",
    capabilities: [
      "Faculty & Academic Department Curriculum Engine",
      "Course Registration, Add/Drop & Credit Hour Matrix",
      "Senate Grade Approval & Graduation Clearance",
      "Research Grants & Sponsored Projects Accounting",
      "Campus Housing & Student Guild Government"
    ],
    status: "Active & Certified",
    version: "v9.3.0",
    priceModel: "University Enterprise License",
    directoratesCount: 6,
    departmentsCount: 12,
    portalsCount: 6,
    modulesCount: 44
  },
  {
    id: "prod-church-faith",
    name: "JUMO CHURCH & FAITH ERP",
    category: "SOVEREIGN_PRODUCT",
    categoryLabel: "Sovereign Product • Faith Institutions",
    icon: Church,
    color: "emerald",
    iconClass: "text-emerald-600",
    bgClass: "bg-emerald-50",
    tagline: "Diocese, parish, tithes, ministry workflows, and pastoral care operating system",
    description:
      "Specialized faith-based enterprise management system managing diocesan governance, parish memberships, electronic tithe and pledge collection, pastoral counseling schedules, sacramental registries, and community outreach.",
    capabilities: [
      "Parish & Fellowship Membership Directory",
      "Digital Tithes, Offerings & Building Pledges Ledger",
      "Sacramental Registries (Baptism, Confirmation, Marriage)",
      "Pastoral Visitation & Counseling Scheduling",
      "Diocesan Financial Consolidations & Missionary Projects"
    ],
    status: "Active & Certified",
    version: "v5.4.0",
    priceModel: "Diocesan & Community License",
    directoratesCount: 4,
    departmentsCount: 8,
    portalsCount: 4,
    modulesCount: 30
  },
  {
    id: "prod-alumni-community",
    name: "JUMO ALUMNI & COMMUNITY ERP",
    category: "SOVEREIGN_PRODUCT",
    categoryLabel: "Sovereign Product • Alumni & Association",
    icon: Users,
    color: "purple",
    iconClass: "text-purple-600",
    bgClass: "bg-purple-50",
    tagline: "Alumni network, endowment funds, career mentorship, and association governance",
    description:
      "Community engagement platform managing alumni chapters, endowment fund campaigns, professional mentorship matchmaking, reunion ticket allocations, career postings, and democratic executive elections.",
    capabilities: [
      "Alumni Chapters & Global Member Directory",
      "Endowment Fund Capital Drives & Transparent Ledger",
      "Career Mentorship & Job Board Integration",
      "Reunion Conventions & Event Ticketing",
      "Executive Council Elections & Voting Portal"
    ],
    status: "Active & Certified",
    version: "v4.8.0",
    priceModel: "Association License",
    directoratesCount: 4,
    departmentsCount: 8,
    portalsCount: 4,
    modulesCount: 26
  },

  // === 8 INDEPENDENT SHARED PLATFORMS ===
  {
    id: "plat-faap",
    name: "JUMO FAAP",
    category: "SHARED_PLATFORM",
    categoryLabel: "Shared Platform • Financial Ledger",
    icon: DollarSign,
    color: "emerald",
    iconClass: "text-emerald-600",
    bgClass: "bg-emerald-50",
    tagline: "Financial Accounting, Allocation, Treasury, and Double-Entry Settlement Platform",
    description:
      "Autonomous zero-parity multi-currency double-entry ledger platform. Provides chart of accounts, budget control, accounts payable/receivable, payroll clearing, and cryptographic audit proofs across all sovereign products.",
    capabilities: [
      "Zero-Discrepancy Double-Entry Journal Engine",
      "Multi-Currency Automated Clearing & FX Revaluation",
      "Automated Tax (VAT, WHT, PAYE) Calculation",
      "Real-time Budgetary Control & Spend Authorization",
      "Cross-Product Allocation & Revenue Sharing"
    ],
    status: "Installed & Operational",
    version: "v12.4.0",
    priceModel: "Shared Platform Infrastructure"
  },
  {
    id: "plat-digital-pay",
    name: "JUMO DIGITAL PAY",
    category: "SHARED_PLATFORM",
    categoryLabel: "Shared Platform • Payment Switch",
    icon: CreditCard,
    color: "amber",
    iconClass: "text-amber-600",
    bgClass: "bg-amber-50",
    tagline: "Universal payment orchestration across mobile money, cards, and banking rails",
    description:
      "High-throughput transaction routing switch with sub-200ms settlement. Integrates MTN Mobile Money, Airtel Money, Visa/Mastercard grids, SWIFT interbank rails, and QR merchant wallets.",
    capabilities: [
      "Sub-200ms Multi-Rail Transaction Routing",
      "Mobile Money Webhooks & Auto-Reconciliation",
      "Interbank SWIFT Settlement Integration",
      "Cryptographic Payment Tokens & Replay Defense",
      "Merchant Aggregator Fee Splits"
    ],
    status: "Installed & Operational",
    version: "v5.3.0",
    priceModel: "Shared Platform Infrastructure"
  },
  {
    id: "plat-aegis",
    name: "JUMO AEGIS",
    category: "SHARED_PLATFORM",
    categoryLabel: "Shared Platform • Zero-Trust Security",
    icon: Lock,
    color: "red",
    iconClass: "text-red-600",
    bgClass: "bg-red-50",
    tagline: "Autonomous zero-trust security intelligence, token signing, and HSM policy enforcement",
    description:
      "Enterprise security platform providing role-based and attribute-based access control (RBAC/ABAC), HSM-backed session signing, behavioral intrusion defense, API rate throttling, and cryptographic key rotation.",
    capabilities: [
      "Zero-Trust Policy Enforcement Matrix",
      "HSM Key Management & Token Signing",
      "Behavioral Anomaly & DDoS Mitigation",
      "Granular Multi-Factor Authorization Gates",
      "Real-Time Security Event Correlation (SIEM)"
    ],
    status: "Installed & Operational",
    version: "v6.1.0",
    priceModel: "Shared Platform Infrastructure"
  },
  {
    id: "plat-treasury",
    name: "JUMO TREASURY",
    category: "SHARED_PLATFORM",
    categoryLabel: "Shared Platform • Liquidity & Treasury",
    icon: Landmark,
    color: "teal",
    iconClass: "text-teal-600",
    bgClass: "bg-teal-50",
    tagline: "Enterprise liquidity forecasting, cash pool sweeping, and bank account reconciliation",
    description:
      "Platform for real-time corporate treasury operations, cash concentration, sweeping rules, multi-bank statement ingestion (MT940/CAMT), yield optimization, and counterparty credit limit monitoring.",
    capabilities: [
      "Multi-Bank Account Balance Aggregation",
      "Automated Cash Sweeping & Pooling Rules",
      "MT940 / ISO 20022 Bank Statement Parsing",
      "90-Day Cash Flow Liquidity Forecasting",
      "Foreign Exchange Exposure Hedging"
    ],
    status: "Installed & Operational",
    version: "v3.2.0",
    priceModel: "Shared Platform Infrastructure"
  },
  {
    id: "plat-digital-auditor",
    name: "JUMO DIGITAL AUDITOR",
    category: "SHARED_PLATFORM",
    categoryLabel: "Shared Platform • Compliance & Audit",
    icon: Shield,
    color: "purple",
    iconClass: "text-purple-600",
    bgClass: "bg-purple-50",
    tagline: "Continuous automated forensic financial, security, and statutory compliance audit",
    description:
      "Autonomous audit engine inspecting all ledger mutations, permission escalations, procurement approvals, and configuration changes against statutory accounting standards (IFRS/GAAP) and national regulations.",
    capabilities: [
      "Continuous Double-Entry Ledger Parity Audit",
      "Automated Fraud & Suspicious Pattern Detection",
      "Statutory Tax & Regulatory Return Verification",
      "Immutable Cryptographic Evidence Chains",
      "Executive Compliance Heatmaps & Reports"
    ],
    status: "Installed & Operational",
    version: "v2.9.0",
    priceModel: "Shared Platform Infrastructure"
  },
  {
    id: "plat-ai-hybrid",
    name: "JUMO AI DIGITAL HYBRID",
    category: "SHARED_PLATFORM",
    categoryLabel: "Shared Platform • Cognitive Routing",
    icon: BrainCircuit,
    color: "rose",
    iconClass: "text-rose-600",
    bgClass: "bg-rose-50",
    tagline: "Multi-model cognitive mesh, domain specialized agents, and semantic RAG intelligence",
    description:
      "Enterprise AI platform providing intelligent query routing between Gemini models, local fallback vectors, domain-specific assistants, institutional policy search, and workflow automation helpers.",
    capabilities: [
      "Dynamic Multi-Model Cognitive Router",
      "Domain Agents (Finance, Academic, Legal, HR)",
      "Hybrid Vector Knowledge & Semantic RAG",
      "Context-Aware Form Filling & Data Extraction",
      "Zero-Data-Exfiltration Enterprise Privacy Boundary"
    ],
    status: "Installed & Operational",
    version: "v3.8.0",
    priceModel: "Shared Platform Infrastructure"
  },
  {
    id: "plat-workflow",
    name: "JUMO WORKFLOW ENGINE",
    category: "SHARED_PLATFORM",
    categoryLabel: "Shared Platform • Process Automation",
    icon: Workflow,
    color: "violet",
    iconClass: "text-violet-600",
    bgClass: "bg-violet-50",
    tagline: "State-machine business process automation, conditional approval routing, and SLA tracking",
    description:
      "Enterprise workflow engine coordinating multi-stage human and automated approvals across departments, escalation timers, digital signatures, and cross-platform notification dispatch.",
    capabilities: [
      "Declarative BPMN State Machine Engine",
      "Multi-Tier Hierarchical Approval Hierarchies",
      "Automated SLA Timers & Escalation Alerts",
      "Cryptographically Verified Digital Signatures",
      "Event-Driven Cross-Platform Hooks"
    ],
    status: "Installed & Operational",
    version: "v5.4.0",
    priceModel: "Shared Platform Infrastructure"
  },
  {
    id: "plat-cloud-infra",
    name: "JUMO CLOUD / INFRASTRUCTURE",
    category: "SHARED_PLATFORM",
    categoryLabel: "Shared Platform • Sovereign Compute Fabric",
    icon: Cloud,
    color: "blue",
    iconClass: "text-blue-600",
    bgClass: "bg-blue-50",
    tagline: "Sovereign hybrid cloud compute, multi-tenant isolation, and container orchestration",
    description:
      "Underlying sovereign infrastructure fabric providing resilient container orchestration, tenant data isolation, encrypted backups, edge replication, and zero-downtime rolling updates.",
    capabilities: [
      "Distributed Sovereign Container Mesh",
      "Multi-Tenant Database & Storage Encryption",
      "Zero-Downtime Hot Upgrades & Rollbacks",
      "Disaster Recovery & Continuous Replication",
      "Real-Time Node Telemetry & Autoscaling"
    ],
    status: "Installed & Operational",
    version: "v4.5.0",
    priceModel: "Shared Platform Infrastructure"
  }
];

const productMap = new Map(products.map((product) => [product.id, product]));

function getPeerProducts(productId: string) {
  return products.filter((product) => product.id !== productId);
}

export function CommercialProductsRenderer({ onNavigateToProduct }: { onNavigateToProduct?: (productId: string) => void }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showNetwork, setShowNetwork] = useState(false);
  const [filterCategory, setFilterCategory] = useState<"ALL" | "SOVEREIGN_PRODUCT" | "SHARED_PLATFORM">("ALL");

  const filteredProducts = useMemo(() => {
    if (filterCategory === "ALL") return products;
    return products.filter((p) => p.category === filterCategory);
  }, [filterCategory]);

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
                        {(product.name || 'Unknown Product').replace("JUMO ", "")}
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

      {/* Filter Category Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            onClick={() => setFilterCategory("ALL")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterCategory === "ALL"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            All Ecosystem ({products.length})
          </button>
          <button
            onClick={() => setFilterCategory("SOVEREIGN_PRODUCT")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterCategory === "SOVEREIGN_PRODUCT"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            6 Sovereign Products (ERPs)
          </button>
          <button
            onClick={() => setFilterCategory("SHARED_PLATFORM")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterCategory === "SHARED_PLATFORM"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            8 Independent Platforms
          </button>
        </div>
        <span className="text-xs font-bold text-slate-400">
          Showing {filteredProducts.length} certified entities
        </span>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
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
                {product.categoryLabel}
              </span>

              <h3 className="text-xl font-black text-slate-900 leading-snug">
                {product.name}
              </h3>

              <p className="text-xs font-semibold text-slate-600 line-clamp-2">
                {product.tagline}
              </p>

              {product.directoratesCount && (
                <div className="grid grid-cols-3 gap-1.5 py-2 px-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <div>
                    <span className="block text-[8px] font-black text-slate-400 uppercase">Directorates</span>
                    <span className="block text-xs font-black text-slate-800">{product.directoratesCount}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-black text-slate-400 uppercase">Portals</span>
                    <span className="block text-xs font-black text-slate-800">{product.portalsCount}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-black text-slate-400 uppercase">Modules</span>
                    <span className="block text-xs font-black text-slate-800">{product.modulesCount}</span>
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                {(Array.isArray(product?.capabilities) ? product.capabilities : []).slice(0, 3).map((capability) => (
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

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-500">
                {product.version}
              </span>

              <div className="flex items-center gap-1.5">
                {onNavigateToProduct && (
                  <button
                    onClick={() => {
                      const targetMap: Record<string, string> = {
                        "prod-fintech": "fintech",
                        "prod-nursery-primary": "nursery-primary",
                        "prod-secondary-school": "secondary-school",
                        "prod-university-tertiary": "university",
                        "prod-church-faith": "church",
                        "prod-alumni-community": "alumni",
                        "plat-faap": "faap",
                        "plat-digital-pay": "digital-pay",
                        "plat-aegis": "aegis",
                        "plat-treasury": "treasury",
                        "plat-digital-auditor": "digital-auditor",
                        "plat-ai-hybrid": "ai-hybrid",
                        "plat-workflow": "workflow",
                        "plat-cloud-infra": "cloud"
                      };
                      const targetWs = targetMap[product.id] || "overview";
                      onNavigateToProduct(targetWs);
                    }}
                    className="px-3 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    Launch
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="px-3 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  Inspect
                </button>
              </div>
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
