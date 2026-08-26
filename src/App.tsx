import React, { useState, useEffect } from "react";
import { PublicGateway } from "./experience/gateway/PublicGateway";
import { FintechApplicationShell } from "./experience/renderer/shells/FintechApplicationShell";
import { NurseryPrimaryApplicationShell } from "./experience/renderer/shells/NurseryPrimaryApplicationShell";
import { SecondarySchoolApplicationShell } from "./experience/renderer/shells/SecondarySchoolApplicationShell";
import { UniversityTertiaryApplicationShell } from "./experience/renderer/shells/UniversityTertiaryApplicationShell";
import { ChurchFaithApplicationShell } from "./experience/renderer/shells/ChurchFaithApplicationShell";
import { AlumniCommunityApplicationShell } from "./experience/renderer/shells/AlumniCommunityApplicationShell";
import { UEOSShell } from "./experience/shell/UEOSShell";

export default function App() {
  const [currentUser, setCurrentUser] = useState<any>(() => {
    if (typeof window !== "undefined") {
      let stored = null;
      try { stored = localStorage.getItem("ueos_user"); } catch (e) {}
      try {
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    }
    return null;
  });

  const [path, setPath] = useState(typeof window !== "undefined" ? window.location.pathname : "/");

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const handleLogin = (user: any) => {
    try { localStorage.setItem("ueos_user", JSON.stringify(user)); } catch (e) {}
    setCurrentUser(user);
  };

  const handleLogout = () => {
    try { localStorage.removeItem("ueos_user"); } catch (e) {}
    setCurrentUser(null);
    window.location.href = "/";
  };

  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
    setPath(to);
  };

  if (!currentUser) {
    return <PublicGateway onLoginSuccess={handleLogin} />;
  }

  // Direct Routing for Product Independence
  if (path === "/fintech") {
    return <FintechApplicationShell onBack={() => navigate("/")} />;
  }
  if (path === "/nursery-primary") {
    return <NurseryPrimaryApplicationShell onBack={() => navigate("/")} />;
  }
  if (path === "/secondary-school") {
    return <SecondarySchoolApplicationShell onBack={() => navigate("/")} />;
  }
  if (path === "/university") {
    return <UniversityTertiaryApplicationShell onBack={() => navigate("/")} />;
  }
  if (path === "/church") {
    return <ChurchFaithApplicationShell onBack={() => navigate("/")} />;
  }
  if (path === "/alumni") {
    return <AlumniCommunityApplicationShell onBack={() => navigate("/")} />;
  }

  // Fallback to the Hub/Shell (Launcher)
  return <UEOSShell user={currentUser} onLogout={handleLogout} />;
}
// JUMO UEOS Operating Environment Operationalized
