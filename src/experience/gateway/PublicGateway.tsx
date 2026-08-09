import React, { useState } from "react";
import { motion } from "motion/react";
import { Shield, Key, Cpu, Sparkles, CheckCircle2, Terminal, ChevronRight, Lock } from "lucide-react";

interface PublicGatewayProps {
  onLoginSuccess: (user: any) => void;
}

export function PublicGateway({ onLoginSuccess }: PublicGatewayProps) {
  const [selectedProfile, setSelectedProfile] = useState<string>("admin");
  const [signatureKey, setSignatureKey] = useState("JUMO-SECURE-KEY-SHA256-4BB1177");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationLogs, setVerificationLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const profiles = [
    {
      id: "admin",
      name: "Hon. Minister Julius Moses",
      clearance: "LEVEL-10-NATIONAL",
      role: "Sovereign Operator",
      avatar: "SO",
      key: "JUMO-SECURE-KEY-SHA256-5EFF844"
    },
    {
      id: "architect",
      name: "Dr. Evelyn Vance",
      clearance: "LEVEL-08-ARCHITECT",
      role: "Sovereign Lead Architect",
      avatar: "LA",
      key: "JUMO-SECURE-KEY-SHA256-4BB1177"
    },
    {
      id: "security",
      name: "Col. Marcus Thorne",
      clearance: "LEVEL-09-SECURITY",
      role: "AEGIS Security Guardian",
      avatar: "SG",
      key: "JUMO-SECURE-KEY-SHA256-2E05CE4"
    }
  ];

  const handleProfileSelect = (profileId: string) => {
    setSelectedProfile(profileId);
    const prof = profiles.find(p => p.id === profileId);
    if (prof) {
      setSignatureKey(prof.key);
    }
  };

  const handleSecureSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signatureKey.trim()) return;

    setIsVerifying(true);
    setProgress(0);
    setVerificationLogs(["[INIT] Establishing cryptographically signed terminal connection..."]);

    const steps = [
      { prg: 20, log: "[AEGIS] Resolving sovereign routing subnets..." },
      { prg: 40, log: "[KERNEL] Handshaking with JUMO security ledger core..." },
      { prg: 65, log: "[AUTH] Cryptographic token validated. Level clearance matched." },
      { prg: 85, log: "[SYSTEM] Restoring operational workspaces and cloud fabric indexes..." },
      { prg: 100, log: "[SUCCESS] Decrypted master workspace. Launching JUMO UEOS shell." }
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < steps.length) {
        const step = steps[index];
        setProgress(step.prg);
        setVerificationLogs(prev => [...prev, step.log]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          const profile = profiles.find(p => p.id === selectedProfile) || profiles[0];
          onLoginSuccess({
            name: profile.name,
            clearance: profile.clearance,
            role: profile.role,
            signatureKey: signatureKey
          });
        }, 300);
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 md:p-12 selection:bg-blue-100" id="sovereign-gateway">
      <div className="w-full max-w-4xl bg-white rounded-2xl border border-slate-200/80 shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Left column: Security Policy & Branding */}
        <div className="md:col-span-5 bg-slate-900 text-slate-300 p-8 flex flex-col justify-between border-r border-slate-200" id="gateway-branding-panel">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white text-slate-950 rounded-xl flex items-center justify-center font-black text-lg shadow-sm">
                J
              </div>
              <div>
                <span className="font-extrabold tracking-tight text-white uppercase text-xs block">JUMO UEOS</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Sovereign OS • v13</span>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h1 className="text-xl font-black text-white tracking-tight leading-snug">
                National Manufacturing Operating Environment
              </h1>
              <p className="text-xs text-slate-400 leading-relaxed">
                Authoritative terminal for compiling, validating, and deploying JUMO ecosystem-grade services. Protected by the AEGIS Zero-Trust security framework.
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t border-slate-800">
            <div className="flex items-start gap-3 text-[11px] leading-relaxed">
              <Shield className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-200 block">Sovereign Compliance</span>
                <p className="text-slate-400">All session transactions, builds, and audit entries are immutable and tracked in the national ledger.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Credentials and Launch */}
        <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-white" id="gateway-interactive-panel">
          {!isVerifying ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">Sovereign Operator Sign-In</h2>
                <p className="text-xs text-slate-500 mt-1">Select your pre-registered operator profile to access the control plane.</p>
              </div>

              {/* Profile Selector Cards */}
              <div className="space-y-3" id="profile-selector">
                {profiles.map((prof) => {
                  const isSelected = selectedProfile === prof.id;
                  return (
                    <button
                      key={prof.id}
                      type="button"
                      onClick={() => handleProfileSelect(prof.id)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/20 shadow-xs"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-xs border ${
                          isSelected ? "bg-blue-600 text-white border-blue-600" : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}>
                          {prof.avatar}
                        </div>
                        <div>
                          <span className="font-bold text-xs text-slate-800 block">{prof.name}</span>
                          <span className="text-[10px] text-slate-400 block font-semibold mt-0.5">{prof.role}</span>
                        </div>
                      </div>
                      <span className={`text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected ? "bg-blue-100/60 text-blue-800" : "bg-slate-100 text-slate-500"
                      }`}>
                        {prof.clearance}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Cryptographic Signature Key Input Form */}
              <form onSubmit={handleSecureSignIn} className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label htmlFor="signature-key" className="text-[10px] font-black uppercase text-slate-600 tracking-wider flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-blue-600" />
                    Cryptographic Signature Key
                  </label>
                  <input
                    id="signature-key"
                    type="password"
                    value={signatureKey}
                    onChange={(e) => setSignatureKey(e.target.value)}
                    placeholder="Enter SHA-256 Operator Token"
                    className="w-full bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 transition-all shadow-inner"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-black transition-all shadow-sm active:scale-98 cursor-pointer group"
                >
                  Authorize Connection
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-6" id="verification-terminal">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-blue-600 animate-pulse" />
                <div>
                  <h3 className="text-sm font-black text-slate-900">Verifying Operator Session</h3>
                  <span className="text-[10px] text-slate-400 font-bold uppercase mt-0.5 block">Clearance Enforcer</span>
                </div>
              </div>

              {/* Loading Bar */}
              <div className="space-y-2">
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-200" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="flex justify-between text-[9px] font-black uppercase text-slate-400 tracking-wider">
                  <span>Cryptographic decryption</span>
                  <span>{progress}%</span>
                </div>
              </div>

              {/* Secure Log Terminal */}
              <div className="bg-slate-950 rounded-xl p-4 font-mono text-[10px] text-emerald-400 border border-slate-800 space-y-1.5 h-44 overflow-y-auto">
                {verificationLogs.map((log, index) => (
                  <div key={index} className="flex items-start gap-1">
                    <span className="text-slate-500 mr-1 select-none">›</span>
                    <span className="break-all">{log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
