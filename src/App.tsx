import React, { useState, useEffect } from "react";
import { PublicGateway } from "./experience/gateway/PublicGateway";
import { UEOSShell } from "./experience/shell/UEOSShell";

export default function App() {
  useEffect(() => {
    console.log('[JUMO BOOT 06] UEOS App render requested');
  }, []);

  const [currentUser, setCurrentUser] = useState<any>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ueos_user");
      try {
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    }
    return null;
  });
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    // Initialized from state initializer
  }, []);

  const handleLogin = (user: any) => {
    localStorage.setItem("ueos_user", JSON.stringify(user));
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("ueos_user");
    setCurrentUser(null);
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white font-black">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl animate-pulse shadow-2xl shadow-blue-500/50">
          J
        </div>
        <div className="mt-8 tracking-[0.3em] uppercase text-xs text-slate-400">Booting Kernel...</div>
      </div>
    );
  }

  if (!currentUser) {
    return <PublicGateway onLoginSuccess={handleLogin} />;
  }

  return <UEOSShell user={currentUser} onLogout={handleLogout} />;
}
