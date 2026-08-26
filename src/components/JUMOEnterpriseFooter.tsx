/**
 * Authoritative JUMO UEOS Enterprise Footer
 * Official JUMO Enterprise Design System User Experience Standardization (Phase 2 & Phase 4)
 * Ultra-compact single system footer displaying System Status, Version, Copyright, and Quick Links.
 */

import React from 'react';
import { ShieldCheck, CheckCircle2, ExternalLink, Globe, Mail } from "lucide-react";
import { EnterpriseLogo } from './EnterpriseLogo';

export interface JUMOEnterpriseFooterProps {
  theme?: any;
  variant?: 'default' | 'minimal' | 'dark';
}

export const JUMOEnterpriseFooter: React.FC<JUMOEnterpriseFooterProps> = ({ variant = 'default' }) => {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 py-2 px-6 text-[11px] select-none mt-auto font-sans shrink-0">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        
        {/* Left: System Status & Version */}
        <div className="flex items-center gap-3">
          <EnterpriseLogo size="sm" variant="light" showText={false} />
          <span className="flex items-center gap-1.5 font-semibold text-slate-700">
            <span>JUMO UEOS</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-blue-50 text-blue-700 font-bold rounded border border-blue-200">v13.5.0</span>
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>System Status: Operational</span>
          </span>
        </div>

        {/* Center/Right: Copyright & Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-slate-500 font-medium">
          <span>&copy; {new Date().getFullYear()} JUMO UEOS. All Rights Reserved.</span>
          <span className="text-slate-300">|</span>
          <a href="/security" className="hover:text-blue-600 transition-colors flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Security</span>
          </a>
          <span className="text-slate-300">|</span>
          <a href="/documentation" className="hover:text-blue-600 transition-colors flex items-center gap-1">
            <ExternalLink className="w-3 h-3 text-blue-600" />
            <span>Docs</span>
          </a>
          <span className="text-slate-300">|</span>
          <a href="/public" className="hover:text-blue-600 transition-colors flex items-center gap-1">
            <Globe className="w-3 h-3 text-blue-600" />
            <span>Support</span>
          </a>
          <span className="text-slate-300">|</span>
          <a href="mailto:info@jumo.com" className="hover:text-blue-600 transition-colors flex items-center gap-1 font-sans">
            <Mail className="w-3 h-3 text-blue-600" />
            <span>info@jumo.com</span>
          </a>
        </div>

      </div>
    </footer>
  );
};

export default JUMOEnterpriseFooter;
