import { JUMOLogo } from "../branding";
import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Shield, Terminal, Layers, Globe, Cpu, LogOut, Activity, Menu, X, BrainCircuit,
  Package, Settings, Server, Lock, BarChart3, CheckCircle2, Building2, Sparkles, ChevronRight,
  Cloud, Zap, RefreshCw, GitBranch, Layout, Clock, ShoppingBag, Network, Users, Wrench, ShoppingCart, Truck, Gavel, Fingerprint, MessageSquare, BookOpen, ShieldAlert, Leaf, ScrollText, Radio, Database, Workflow
} from "lucide-react";
import { KernelDashboard } from "../renderer/KernelDashboard";
import { EcosystemRegistryRenderer } from "../renderer/EcosystemRegistryRenderer";
import { EnterprisePlatformRegistryRenderer } from "../renderer/TemplateRegistryRenderer";
import { PlatformInstanceRenderer } from "../renderer/PlatformInstanceRenderer";
import { WorkflowRegistryRenderer } from "../renderer/WorkflowRegistryRenderer";
import { SecurityRegistryRenderer } from "../renderer/SecurityRegistryRenderer";
import { EnterpriseFactory } from "../renderer/EnterpriseFactory";
import { RuntimeWorkspaceRenderer } from "../renderer/RuntimeWorkspaceRenderer";
import { AIGatewayRenderer } from "../renderer/AIGatewayRenderer";
import { CommercialProductsRenderer } from "../renderer/CommercialProductsRenderer";
import { SettingsRenderer } from "../renderer/SettingsRenderer";
import { LifecycleManagementRenderer } from "../renderer/LifecycleManagementRenderer";
import { ProvisioningCenterRenderer } from "../renderer/ProvisioningCenterRenderer";
import { DigitalPayRenderer } from "../renderer/DigitalPayRenderer";
import { FAAPRenderer } from "../renderer/FAAPRenderer";
import { AuditRenderer } from "../renderer/AuditRenderer";
import { InfrastructureRenderer } from "../renderer/InfrastructureRenderer";
import { MarketplaceRenderer } from "../renderer/MarketplaceRenderer";
import { APIManagementRenderer } from "../renderer/APIManagementRenderer";
import { TalentRenderer } from "../renderer/TalentRenderer";
import { MaintenanceRenderer } from "../renderer/MaintenanceRenderer";
import { ProcurementRenderer } from "../renderer/ProcurementRenderer";
import { SupplyChainRenderer } from "../renderer/SupplyChainRenderer";
import { DataIntelligenceRenderer } from "../renderer/DataIntelligenceRenderer";
import { LegalComplianceRenderer } from "../renderer/LegalComplianceRenderer";
import { DigitalIdentityRenderer } from "../renderer/DigitalIdentityRenderer";
import { CommunicationRenderer } from "../renderer/CommunicationRenderer";
import { KnowledgeRAGRenderer } from "../renderer/KnowledgeRAGRenderer";
import { AutomationRenderer } from "../renderer/AutomationRenderer";
import { DisasterRecoveryRenderer } from "../renderer/DisasterRecoveryRenderer";
import { SustainabilityRenderer } from "../renderer/SustainabilityRenderer";
import { NationalRegistryRenderer } from "../renderer/NationalRegistryRenderer";
import { IoTPlatformRenderer } from "../renderer/IoTPlatformRenderer";
import { UEOSErrorBoundary } from "../components/UEOSErrorBoundary";

interface UEOSShellProps {
  user?: any;
  onLogout?: () => void;
}

export function UEOSShell({ user, onLogout }: UEOSShellProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedInstance, setSelectedInstance] = useState<any>(null);

  const navItems = [
    { id: "dashboard", label: "National Headquarters", icon: Terminal, symbol: "◉" },
    { id: "ecosystems", label: "National Governance", icon: Globe, symbol: "◌" },
    { id: "templates", label: "Platform Registry", icon: Layers, symbol: "▣" },
    { id: "lifecycle", label: "Lifecycle Center", icon: GitBranch, symbol: "⎇" },
    { id: "factory", label: "Manufacturing Engine", icon: Cpu, symbol: "⚙" },
    { id: "infrastructure", label: "National Infrastructure", icon: Cloud, symbol: "☁" },
    { id: "instances", label: "Institution Registry", icon: Database, symbol: "▤" },
    { id: "provisioning", label: "Provisioning Center", icon: Zap, symbol: "⚡" },
    { id: "workflows", label: "Workflow Runtime", icon: Workflow, symbol: "◎" },
    { id: "security", label: "AEGIS SecOps", icon: Shield, symbol: "◈" },
    { id: "ai", label: "AI Command Center", icon: BrainCircuit, symbol: "✦" },
    { id: "faap", label: "Digital Treasury (FAAP)", icon: Activity, symbol: "📈" },
    { id: "pay", label: "Digital Pay Gateway", icon: Zap, symbol: "💳" },
    { id: "audit", label: "National Auditor", icon: BarChart3, symbol: "📊" },
    { id: "products", label: "Commercial Products", icon: Package, symbol: "◫" },
    { id: "marketplace", label: "Enterprise Marketplace", icon: ShoppingBag, symbol: "🛍" },
    { id: "api", label: "API Gateway", icon: Network, symbol: "🌐" },
    { id: "talent", label: "Talent Platform", icon: Users, symbol: "👥" },
    { id: "maintenance", label: "Maintenance Platform", icon: Wrench, symbol: "🔧" },
    { id: "procurement", label: "Procurement Platform", icon: ShoppingCart, symbol: "🛒" },
    { id: "supplychain", label: "Supply Chain Platform", icon: Truck, symbol: "🚛" },
    { id: "data", label: "Data Intelligence", icon: Database, symbol: "📊" },
    { id: "legal", label: "Legal & Compliance", icon: Gavel, symbol: "⚖" },
    { id: "identity", label: "Digital Identity", icon: Fingerprint, symbol: "🆔" },
    { id: "communication", label: "Communication Platform", icon: MessageSquare, symbol: "💬" },
    { id: "knowledge", label: "Knowledge & RAG", icon: BookOpen, symbol: "🧠" },
    { id: "automation", label: "Automation Platform", icon: Workflow, symbol: "⚡" },
    { id: "recovery", label: "Disaster Recovery", icon: ShieldAlert, symbol: "🚨" },
    { id: "sustainability", label: "Sustainability", icon: Leaf, symbol: "🌿" },
    { id: "registry", label: "National Registry", icon: ScrollText, symbol: "📝" },
    { id: "iot", label: "IoT Platform", icon: Radio, symbol: "📡" },
    { id: "settings", label: "Kernel Configuration", icon: Settings, symbol: "⚙" },
  ];

  if (selectedInstance) {
    return <RuntimeWorkspaceRenderer instance={selectedInstance} onExit={() => setSelectedInstance(null)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900 font-sans">
      {/* Icon-First Enterprise Navigation Rail */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-slate-900 text-white border-r border-slate-800 flex flex-col h-screen sticky top-0 z-50 shadow-2xl transition-all"
      >
        {/* Brand Header with JUMO Sovereign Enterprise Mark */}
        <div className="p-5 flex items-center justify-between border-b border-slate-800/80 h-20 bg-slate-950/50">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("dashboard")}>
            <JUMOLogo
              size="sm"
              background="blue"
              alt="JUMO UEOS"
            />

            {isSidebarOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
                <span className="font-black text-base tracking-tight text-white leading-none">JUMO UEOS</span>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-1">Sovereign OS</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-6 space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                title={item.label}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl transition-all group ${
                  isActive
                    ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/30"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                <div className={`w-6 h-6 flex items-center justify-center shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-blue-400"}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                {isSidebarOpen && (
                  <span className="text-xs font-semibold truncate tracking-wide">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User / Sign Out Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors group"
          >
            <LogOut className="w-5 h-5 shrink-0 group-hover:text-red-400" />
            {isSidebarOpen && <span className="text-xs font-bold">Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Command Area */}
      <main className="flex-1 flex flex-col min-h-screen relative overflow-hidden bg-slate-50">
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-5">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex flex-col">
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                {navItems.find(i => i.id === activeTab)?.label}
              </h1>
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider text-[9px]">
                  Production
                </span>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <span>National Cloud</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <span>UEOS Kernel v13</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col text-right">
              <span className="font-bold text-slate-900 text-sm">{user?.name || "System Owner"}</span>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{user?.role || "Global Admin"}</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-md">
              {user?.name ? user.name[0] : "O"}
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-y-auto w-full max-w-7xl mx-auto">
          <UEOSErrorBoundary componentName={navItems.find(i => i.id === activeTab)?.label}>
            {activeTab === "dashboard" && <KernelDashboard onNavigate={setActiveTab} />}
            {activeTab === "ecosystems" && <EcosystemRegistryRenderer />}
            {activeTab === "templates" && <EnterprisePlatformRegistryRenderer />}
            {activeTab === "lifecycle" && <LifecycleManagementRenderer />}
            {activeTab === "factory" && <EnterpriseFactory />}
            {activeTab === "infrastructure" && <InfrastructureRenderer />}
            {activeTab === "instances" && <PlatformInstanceRenderer onSelectInstance={setSelectedInstance} />}
            {activeTab === "provisioning" && <ProvisioningCenterRenderer />}
            {activeTab === "workflows" && <WorkflowRegistryRenderer />}
            {activeTab === "security" && <SecurityRegistryRenderer />}
            {activeTab === "ai" && <AIGatewayRenderer />}
            {activeTab === "faap" && <FAAPRenderer />}
            {activeTab === "pay" && <DigitalPayRenderer />}
            {activeTab === "audit" && <AuditRenderer />}
            {activeTab === "marketplace" && <MarketplaceRenderer />}
            {activeTab === "api" && <APIManagementRenderer />}
            {activeTab === "talent" && <TalentRenderer />}
            {activeTab === "maintenance" && <MaintenanceRenderer />}
            {activeTab === "procurement" && <ProcurementRenderer />}
            {activeTab === "supplychain" && <SupplyChainRenderer />}
            {activeTab === "data" && <DataIntelligenceRenderer />}
            {activeTab === "legal" && <LegalComplianceRenderer />}
            {activeTab === "identity" && <DigitalIdentityRenderer />}
            {activeTab === "communication" && <CommunicationRenderer />}
            {activeTab === "knowledge" && <KnowledgeRAGRenderer />}
            {activeTab === "automation" && <AutomationRenderer />}
            {activeTab === "recovery" && <DisasterRecoveryRenderer />}
            {activeTab === "sustainability" && <SustainabilityRenderer />}
            {activeTab === "registry" && <NationalRegistryRenderer />}
            {activeTab === "iot" && <IoTPlatformRenderer />}
            {activeTab === "products" && <CommercialProductsRenderer />}
            {activeTab === "settings" && <SettingsRenderer />}
          </UEOSErrorBoundary>
        </div>
      </main>
    </div>
  );
}
