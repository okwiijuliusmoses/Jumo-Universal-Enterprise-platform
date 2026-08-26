
import React, { useState } from "react";
import { motion } from "motion/react";
import { Shield, Key, Globe, Layers, ArrowRight, Loader2 } from "lucide-react";

interface PlatformLoginGatewayProps {
  onLoginSuccess: (user: any) => void;
}

export function PlatformLoginGateway({ onLoginSuccess }: PlatformLoginGatewayProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/v1/ueos/identity/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password, tenant: "Global" })
      });

      const data = await response.json();
      if (data.success) {
        onLoginSuccess(data.user);
      } else {
        setError(data.error || "Authentication failed. Access Denied.");
      }
    } catch (err) {
      setError("Unable to connect to Identity Gateway. Check connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center text-white mb-6 shadow-xl shadow-blue-200"
          >
            <Shield className="w-10 h-10" />
          </motion.div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">JUMO UEOS</h1>
          <p className="text-slate-500 font-medium">Sovereign Enterprise Identity Gateway</p>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-10 border border-slate-100"
        >
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 px-1">
                Identity Profile (Email)
              </label>
              <div className="relative">
                <Globe className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@jumo.net"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 px-1">
                Access Signature (Password)
              </label>
              <div className="relative">
                <Key className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-semibold flex items-center gap-3"
              >
                <Shield className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <button
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-blue-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Verify Identity
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <div className="flex items-center justify-center gap-6 opacity-40">
              <Shield className="w-6 h-6" />
              <Globe className="w-6 h-6" />
              <Layers className="w-6 h-6" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mt-6">
              Encrypted Sovereign Runtime Authentication
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
