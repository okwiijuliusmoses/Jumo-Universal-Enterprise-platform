import React, { useState } from "react";
import { UEOSShell } from "./experience/shell/UEOSShell";

export function App() {
  const [user, setUser] = useState({
    name: "Sovereign Operator Alpha",
    clearance: "LEVEL-5 SOVEREIGN",
    role: "National Enterprise Architect",
    signatureKey: "SIG-9902-JUMO-AUTH"
  });

  const handleLogout = () => {
    setUser({
      name: "",
      clearance: "GUEST",
      role: "Unauthenticated",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      <UEOSShell user={user} onLogout={handleLogout} />
    </div>
  );
}

export default App;
