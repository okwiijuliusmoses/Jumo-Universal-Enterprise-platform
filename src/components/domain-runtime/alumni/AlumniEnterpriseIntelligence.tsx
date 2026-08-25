import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, Bot, Globe, TrendingUp, Cpu } from "lucide-react";

export const AlumniEnterpriseIntelligence: React.FC<{ phase: string }> = ({ phase }) => {
  const renderContent = () => {
    switch (phase) {
      case 'digital_twin':
        return (
          <div className="space-y-4">
            <h4 className="font-bold text-indigo-300 flex items-center gap-2"><Sparkles className="w-5 h-5"/> Alumni Digital Twin Engine</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <p className="text-slate-600 text-xs uppercase">Twin Health</p>
                <p className="text-xl font-bold">98.2%</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <p className="text-slate-600 text-xs uppercase">Engagement Index</p>
                <p className="text-xl font-bold">87.5</p>
              </div>
            </div>
          </div>
        );
      case 'ai_automation':
        return (
          <div className="space-y-4">
            <h4 className="font-bold text-indigo-300 flex items-center gap-2"><Bot className="w-5 h-5"/> AI Relationship Automation</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-white rounded border border-slate-200">
                <span>Engagement Agent</span>
                <span className="text-emerald-400 text-xs font-bold">ACTIVE</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded border border-slate-200">
                <span>Membership Admin Agent</span>
                <span className="text-emerald-400 text-xs font-bold">ACTIVE</span>
              </div>
            </div>
          </div>
        );
      case 'collaboration':
        return (
          <div className="space-y-4">
            <h4 className="font-bold text-indigo-300 flex items-center gap-2"><Globe className="w-5 h-5"/> Global Collaboration Hub</h4>
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <p className="text-slate-600 text-sm">Active Collaborative Projects: 124</p>
              <button className="mt-2 text-xs text-[#0078D4] font-bold hover:text-indigo-300">View Network Explorer</button>
            </div>
          </div>
        );
      case 'benchmarking':
        return (
          <div className="space-y-4">
            <h4 className="font-bold text-indigo-300 flex items-center gap-2"><TrendingUp className="w-5 h-5"/> Institutional Benchmarking</h4>
            <div className="bg-white p-4 rounded-lg border border-slate-200">
                <p className="text-slate-600 text-sm">Ranking: #4 Global Alumni Impact</p>
            </div>
          </div>
        );
      case 'autonomous':
        return (
          <div className="space-y-4">
            <h4 className="font-bold text-indigo-300 flex items-center gap-2"><Cpu className="w-5 h-5"/> Autonomous Ecosystem Status</h4>
            <div className="bg-white p-4 rounded-lg border border-slate-200">
                <p className="text-slate-600 text-sm">System Self-Optimization Active</p>
            </div>
          </div>
        );
      default:
        return <div>Select a phase to view intelligence.</div>;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl"
    >
      {renderContent()}
    </motion.div>
  );
};
