
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Layout, 
  Shield, 
  Terminal, 
  Layers, 
  Globe, 
  Cpu, 
  Settings, 
  LogOut, 
  ChevronRight,
  Database,
  Workflow,
  Key,
  Activity,
  Menu,
  X
} from "lucide-react";

interface UEOSShellProps {
  user: any;
  onLogout: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
}

export function UEOSShell({ user, onLogout, activeTab, onTabChange, children }: UEOSShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { id: "dashboard", label: "Command Center", icon: Terminal },
    { id: "ecosystems", label: "Ecosystem Factory", icon: Globe },
    { id: "factory", label: "ERP Factory", icon: Cpu },
    { id: "templates", label: "Template Marketplace", icon: Layers },
    { id: "instances", label: "Institution Management", icon: Database },
    { id: "workflows", label: "Runtime Operations", icon: Workflow },
    { id: "security", label: "Security Operations", icon: Shield },
    { id: "settings", label: "AI Platform", icon: Cpu },
    { id: "diagnostics", label: "Analytics", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900 font-sans">
      {/* Sidebar / Navigation Rail */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 z-50 shadow-sm"
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-100 h-20">
          {isSidebarOpen ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
                J
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-800">JUMO UEOS CONTROL CENTER</span>
            </motion.div>
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold mx-auto">
              J
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-6 space-y-1 px-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all group ${
                activeTab === item.id 
                  ? "bg-blue-50 text-blue-700 font-medium shadow-sm ring-1 ring-blue-100" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${activeTab === item.id ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`} />
              {isSidebarOpen && <span className="truncate">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors group"
          >
            <LogOut className="w-5 h-5 group-hover:text-red-500" />
            {isSidebarOpen && <span className="font-medium">Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-slate-800 capitalize">{activeTab.replace("-", " ")}</h1>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                  Operational
                </span>
                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                <span>Runtime v5.0.4</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col text-right">
              <span className="font-bold text-slate-800">{user?.name || "System Administrator"}</span>
              <span className="text-xs text-slate-500">{user?.role || "Kernel Operator"} | {user?.tenantId || "Global Node"}</span>
            </div>
            <div className="w-10 h-10 bg-slate-100 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-slate-400 font-bold overflow-hidden">
               {user?.name?.[0] || <Shield className="w-5 h-5" />}
            </div>
          </div>
        </header>

        {/* Content Viewport */}
        <div className="flex-1 p-8 overflow-y-auto max-w-7xl mx-auto w-full">
           {children}
        </div>
      </main>
    </div>
  );
}
