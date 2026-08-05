import React, { useState } from "react";
import { 
  Building, LogOut, RefreshCw, Shield, Bell, User, Search, Globe, ChevronDown, Key
} from "lucide-react";

export interface UEOSHeaderProps {
  title?: string;
  subtitle?: string;
  user?: any;
  tenantId?: string;
  runtimeConnected?: boolean;
  onRefresh?: () => void;
  onLogout?: () => void;
  isRefreshing?: boolean;
  currentPortal?: string;
  onPortalChange?: (portal: string) => void;
  publicMode?: boolean;
  onLoginClick?: (role?: string) => void;
  onCreateAccountClick?: () => void;
}

export const UEOSHeader: React.FC<UEOSHeaderProps> = ({
  title = "JUMO UEOS",
  subtitle = "Sovereign Enterprise Operating System",
  user,
  tenantId = "CORE_SOVEREIGN",
  runtimeConnected = true,
  onRefresh,
  onLogout,
  isRefreshing = false,
  currentPortal,
  publicMode = false,
  onLoginClick,
  onCreateAccountClick,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English (US)");
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header id="ueos-header-root" className="bg-slate-900 border-b border-slate-800 text-white px-4 py-2.5 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      {/* Left Identity Area */}
      <div id="ueos-header-brand" className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-black flex items-center justify-center text-xs tracking-tighter shadow-xs">
          JU
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black tracking-tight uppercase text-white">{title}</span>
            <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-teal-400 border border-slate-700">
              Kernel v4.1
            </span>
          </div>
          <span className="text-[10px] text-slate-400 hidden sm:inline-block">{subtitle}</span>
        </div>
      </div>

      {/* Middle Experience Context (if in Portal mode) */}
      {!publicMode && currentPortal && (
        <div id="ueos-header-portal-indicator" className="hidden md:flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-3 py-1 rounded-md text-xs">
          <Building className="h-3.5 w-3.5 text-teal-400" />
          <span className="font-semibold text-slate-200">Active Portal:</span>
          <span className="font-bold text-teal-300 uppercase font-mono">{currentPortal}</span>
        </div>
      )}

      {/* Right Controls Area */}
      <div id="ueos-header-controls" className="flex items-center gap-2 sm:gap-3">
        {/* Language Selector */}
        <div className="relative">
          <button
            id="ueos-lang-selector-btn"
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="p-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs font-medium flex items-center gap-1 transition cursor-pointer"
            title="Language & Regional Settings"
          >
            <Globe className="h-3.5 w-3.5 text-teal-400" />
            <span className="hidden lg:inline text-[11px]">{selectedLang}</span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>

          {langMenuOpen && (
            <div id="ueos-lang-dropdown" className="absolute right-0 mt-1 w-40 bg-slate-800 border border-slate-700 rounded-md shadow-lg py-1 z-50 text-xs text-slate-200">
              {["English (US)", "English (UK)", "French", "Swahili", "Arabic"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLang(lang);
                    setLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-slate-700 cursor-pointer ${
                    selectedLang === lang ? "text-teal-300 font-bold" : ""
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {publicMode ? (
          <div className="flex items-center gap-2">
            <button
              id="ueos-public-login-btn"
              onClick={() => onLoginClick && onLoginClick()}
              className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded text-xs transition cursor-pointer shadow-xs"
            >
              Portal Login
            </button>
            <button
              id="ueos-public-register-btn"
              onClick={() => onCreateAccountClick && onCreateAccountClick()}
              className="hidden sm:inline-block px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-xs font-bold transition cursor-pointer"
            >
              Create Account
            </button>
          </div>
        ) : (
          <>
            {/* Live System Status Badge */}
            <div id="ueos-status-indicator" className="hidden lg:flex items-center gap-2 text-[11px] text-slate-300 font-mono bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
              <span className={`w-2 h-2 rounded-full ${runtimeConnected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`}></span>
              <span>{runtimeConnected ? "FAAP PARITY VERIFIED" : "DIAGNOSTICS"}</span>
            </div>

            {/* Notification Trigger */}
            <button
              id="ueos-notif-trigger-btn"
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs font-medium relative transition cursor-pointer"
              title="Notifications & Alerts"
            >
              <Bell className="h-3.5 w-3.5 text-slate-300" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-teal-400"></span>
            </button>

            {/* Sync Button */}
            {onRefresh && (
              <button
                id="ueos-sync-btn"
                onClick={onRefresh}
                disabled={isRefreshing}
                className="p-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
                title="Sync System State"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-teal-400" : ""}`} />
                <span className="hidden md:inline text-[11px]">Sync</span>
              </button>
            )}

            <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>

            {/* User Profile Summary */}
            <div id="ueos-user-profile-badge" className="text-right hidden sm:block text-[11px]">
              <div className="font-bold text-white leading-tight">{user?.email || "admin@jumo.net"}</div>
              <div className="text-teal-400 font-mono text-[10px]">{user?.tenantId || tenantId}</div>
            </div>

            {/* Logout Button */}
            {onLogout && (
              <button
                id="ueos-logout-btn"
                onClick={onLogout}
                className="px-2.5 py-1 bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/60 rounded text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
                title="Exit System"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline text-[11px]">Exit</span>
              </button>
            )}
          </>
        )}
      </div>
    </header>
  );
};
