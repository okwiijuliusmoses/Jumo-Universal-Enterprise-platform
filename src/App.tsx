import React, { useState, useEffect } from "react";
import { jumoFetch } from "./core/config/api";
import { 
  Sparkles, Layers, ListChecks, Cpu, MessageSquare, 
  Trash2, Download, Upload, Plus, AlertTriangle, RefreshCw, Activity, Sliders
} from "lucide-react";
import { SavedProject, SoftwareBlueprint, ChatMessage, KanbanTask } from "./types";
import RuntimeConsole from "./components/RuntimeConsole";
import ChatPanel from "./components/ChatPanel";
import PublicPortal from "./components/PublicPortal";
import OwnerControlCenter from "./components/OwnerControlCenter";
import ExperienceRuntime from "./components/ExperienceRuntime";
import { SAMPLE_BLUEPRINT } from "./mockBlueprint";
import { UEOS_BLUEPRINT } from "./ueosBlueprint";


export default function App() {
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string; role: string; tenantId: string; trustLevel: string } | null>(() => {
    const saved = localStorage.getItem("jumo_current_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });
  const [projects, setProjects] = useState<SavedProject[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"console" | "owner_center" | "runtime_os">(() => {
    const saved = localStorage.getItem("jumo_current_user");
    if (saved) {
      try {
        const u = JSON.parse(saved);
        return "runtime_os";
      } catch (e) {}
    }
    return "runtime_os";
  });

  // Transparent global fetch interceptor to inject Zero-Trust security tokens & tenant headers
  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async function (input: RequestInfo | URL, init?: RequestInit) {
      const token = localStorage.getItem("jumo_session_token");
      const userStr = localStorage.getItem("jumo_current_user");
      
      let user: any = null;
      if (userStr) {
        try {
          user = JSON.parse(userStr);
        } catch (e) {}
      }

      init = init || {};
      init.headers = init.headers || {};
      
      let targetInput = input;

      if (init.headers instanceof Headers) {
        if (token) {
          init.headers.set("Authorization", `Bearer ${token}`);
          init.headers.set("x-ueos-token", token);
        }
        if (user) {
          init.headers.set("x-ueos-user", user.email);
          init.headers.set("x-ueos-roles", user.role);
          init.headers.set("x-ueos-tenant", user.tenantId);
        }
      } else {
        const headers = init.headers as Record<string, string>;
        if (token && !headers["Authorization"] && !headers["authorization"]) {
          headers["Authorization"] = `Bearer ${token}`;
          headers["x-ueos-token"] = token;
        }
        if (user) {
          if (!headers["x-ueos-user"]) headers["x-ueos-user"] = user.email;
          if (!headers["x-ueos-roles"]) headers["x-ueos-roles"] = user.role;
          if (!headers["x-ueos-tenant"]) headers["x-ueos-tenant"] = user.tenantId;
        }
      }
      return originalFetch(targetInput, init);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [currentUser]);

  // Periodic automatic session expiration checker (60 minute lifetime)
  useEffect(() => {
    if (!currentUser) return;
    const interval = setInterval(() => {
      const expiresAt = localStorage.getItem("jumo_session_expires_at");
      if (expiresAt && Date.now() > Number(expiresAt)) {
        localStorage.removeItem("jumo_current_user");
        localStorage.removeItem("jumo_session_token");
        localStorage.removeItem("jumo_session_expires_at");
        localStorage.setItem("jumo_logout_reason", "expired");
        setCurrentUser(null);
        setActiveTab("blueprint");
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentUser]);

  // Load projects from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      
      const ueosProject: SavedProject = {
        id: "demo_ueos",
        title: "JUMO UEOS Platform",
        description: "Enterprise multi-tenant hybrid operating system kernel, dynamic module registries, AI gateway routers, and compliant financial/SACCO ledger tables.",
        createdAt: new Date().toLocaleDateString(),
        blueprint: UEOS_BLUEPRINT,
        chatHistory: []
      };

      const gymProject: SavedProject = {
        id: "demo_gym_saas",
        title: "GymSaaS Platform",
        description: "Enterprise SaaS platform for subscription management and scheduling.",
        createdAt: new Date().toLocaleDateString(),
        blueprint: SAMPLE_BLUEPRINT,
        chatHistory: []
      };

      if (stored) {
        let parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasUeos = parsed.some((p) => p.id === "demo_ueos");
          if (!hasUeos) {
            parsed = [ueosProject, ...parsed];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
          }
          setProjects(parsed);
          setActiveProjectId(hasUeos ? parsed[0].id : "demo_ueos");
          return;
        }
      }
      
      const seed = [ueosProject, gymProject];
      setProjects(seed);
      setActiveProjectId(ueosProject.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    } catch (err) {
      console.error("Failed to load local storage:", err);
    }
  }, []);

  // Sync projects state to localStorage whenever it changes
  const saveProjectsToStorage = (updated: SavedProject[]) => {
    setProjects(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to write to local storage:", err);
    }
  };

  const activeProject = projects.find((p) => p.id === activeProjectId) || null;

  // Handle generating a new blueprint from user inputs
  const handleGenerateBlueprint = async (formData: { description: string; techPreferences: string; complexity: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await jumoFetch("/api/blueprint/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const newProject: SavedProject = {
        id: `project_${Date.now()}`,
        title: data.name || "Custom Architecture",
        description: data.description || formData.description,
        createdAt: new Date().toLocaleDateString(),
        blueprint: data as SoftwareBlueprint,
        chatHistory: [],
      };

      const updated = [newProject, ...projects];
      saveProjectsToStorage(updated);
      setActiveProjectId(newProject.id);
      setActiveTab("blueprint");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred while communicating with Gemini API.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle updating tasks on active project
  const handleUpdateTasks = (updatedTasks: KanbanTask[]) => {
    if (!activeProject) return;
    const updatedProject = {
      ...activeProject,
      blueprint: {
        ...activeProject.blueprint,
        kanbanTasks: updatedTasks,
      },
    };
    const updatedProjects = projects.map((p) => (p.id === activeProjectId ? updatedProject : p));
    saveProjectsToStorage(updatedProjects);
  };

  // Handle updating chat history on active project
  const handleUpdateChatHistory = (updatedHistory: ChatMessage[]) => {
    if (!activeProject) return;
    const updatedProject = {
      ...activeProject,
      chatHistory: updatedHistory,
    };
    const updatedProjects = projects.map((p) => (p.id === activeProjectId ? updatedProject : p));
    saveProjectsToStorage(updatedProjects);
  };

  // Delete project
  const handleDeleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    saveProjectsToStorage(updated);
    if (activeProjectId === id) {
      if (updated.length > 0) {
        setActiveProjectId(updated[0].id);
      } else {
        setActiveProjectId("");
      }
    }
  };

  // Reset to default sample
  const handleLoadDemo = () => {
    const ueosProject: SavedProject = {
      id: "demo_ueos",
      title: "JUMO UEOS Platform",
      description: "Enterprise multi-tenant hybrid operating system kernel, dynamic module registries, AI gateway routers, and compliant financial/SACCO ledger tables.",
      createdAt: new Date().toLocaleDateString(),
      blueprint: UEOS_BLUEPRINT,
      chatHistory: []
    };

    const gymProject: SavedProject = {
      id: "demo_gym_saas",
      title: "GymSaaS Platform",
      description: "Enterprise SaaS platform for subscription management and scheduling.",
      createdAt: new Date().toLocaleDateString(),
      blueprint: SAMPLE_BLUEPRINT,
      chatHistory: []
    };
    
    // Filter out custom ones if you want, but here we keep custom ones and just restore/overwrite the two standard demos
    const customProjects = projects.filter((p) => p.id !== "demo_ueos" && p.id !== "demo_gym_saas");
    const updated = [ueosProject, gymProject, ...customProjects];
    saveProjectsToStorage(updated);
    setActiveProjectId(ueosProject.id);
    setActiveTab("blueprint");
  };

  // Export blueprint to JSON
  const handleExportJSON = () => {
    if (!activeProject) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeProject.blueprint, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${activeProject.title.toLowerCase().replace(/\s+/g, "_")}_blueprint.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import blueprint from JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!parsed.name || !parsed.databaseSchema || !parsed.apiContract) {
          throw new Error("Invalid file content structure. Must be a Software Blueprint object.");
        }

        const imported: SavedProject = {
          id: `imported_${Date.now()}`,
          title: parsed.name,
          description: parsed.description || "Imported Project Blueprint",
          createdAt: new Date().toLocaleDateString(),
          blueprint: parsed,
          chatHistory: [],
        };

        const updated = [imported, ...projects];
        saveProjectsToStorage(updated);
        setActiveProjectId(imported.id);
        setActiveTab("blueprint");
      } catch (err: any) {
        alert(`Import Failed: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  if (!currentUser) {
    return (
      <PublicPortal onLoginSuccess={(user, token) => {
        localStorage.setItem("jumo_current_user", JSON.stringify(user));
        // 60 minutes session validity
        localStorage.setItem("jumo_session_expires_at", (Date.now() + 60 * 60 * 1000).toString());
        localStorage.removeItem("jumo_logout_reason");
        if (token) {
          localStorage.setItem("jumo_session_token", token);
          localStorage.setItem("JUMO_SESSION", token);
        }
        setCurrentUser(user);
        setActiveTab("runtime_os");
      }} />
    );
  }

  if (activeTab === "runtime_os") {
    return (
      <ExperienceRuntime 
        currentUser={currentUser} 
        onLogout={() => {
          localStorage.removeItem("jumo_current_user");
          localStorage.removeItem("jumo_session_token");
          localStorage.removeItem("jumo_session_expires_at");
          setCurrentUser(null);
          setActiveTab("blueprint");
        }} 
        onBackToWorkbench={() => {
          setActiveTab("blueprint");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans tracking-wide">
      {/* Dynamic Top Header */}
      <header className="border-b border-slate-900 bg-slate-950/60 backdrop-blur-md sticky top-0 z-30 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Layers className="h-5 w-5 text-slate-950" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-400/90 uppercase">{currentUser.role} @ {currentUser.tenantId}</span>
              <h1 className="text-sm font-bold text-slate-100 font-sans tracking-tight">Project Blueprint Architect</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            
{/* JUMO UEOS Runtime Control Center Header */}

<div className="flex items-center gap-3">

<button
onClick={() => setActiveTab("runtime_os")}
className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-xl text-xs font-bold"
>
<Cpu className="h-4 w-4 inline mr-2"/>
UEOS Runtime
</button>

{currentUser.role === "SecOps_Administrator" && (
<button
onClick={() => setActiveTab("owner_center")}
className="bg-slate-900 border border-slate-700 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold"
>
<Sliders className="h-4 w-4 inline mr-2"/>
Owner Command Center
</button>
)}

<button
onClick={() => {
localStorage.removeItem("jumo_current_user");
localStorage.removeItem("jumo_session_token");
setCurrentUser(null);
}}
className="bg-rose-950/20 border border-rose-900 text-rose-400 px-4 py-2 rounded-xl text-xs font-bold"
>
Sign Out
</button>

</div>

</header>

<main className="flex-1 w-full px-4 py-6">

{activeTab === "runtime_os" && (
<ExperienceRuntime
currentUser={currentUser}
onLogout={()=>{
localStorage.removeItem("jumo_current_user");
localStorage.removeItem("jumo_session_token");
setCurrentUser(null);
}}
/>
)}

{activeTab === "owner_center" && currentUser.role === "SecOps_Administrator" && (
<OwnerControlCenter
currentUser={currentUser}
onLogout={()=>{
localStorage.removeItem("jumo_current_user");
localStorage.removeItem("jumo_session_token");
setCurrentUser(null);
}}
/>
)}

</main>

{/* AI Assistant Chat Sidebar Toggle button (for small displays) */}
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="md:hidden fixed bottom-6 right-6 h-12 w-12 bg-emerald-500 text-slate-950 font-bold rounded-full shadow-2xl flex items-center justify-center z-50 cursor-pointer"
            >
              <MessageSquare className="h-5 w-5" />
            </button>

            {/* Collapsible Chat Panel Sidebar */}
            <ChatPanel
              blueprint={activeProject?.blueprint || null}
              isOpen={isChatOpen}
              onClose={() => setIsChatOpen(false)}
              messages={activeProject?.chatHistory || []}
              onUpdateMessages={handleUpdateChatHistory}
            />
          </div>
        ) : null}
      </main>

      {/* Humble Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center shrink-0">
        <span className="text-[10px] font-mono text-slate-600 tracking-wider">
          PROJECT BLUEPRINT ARCHITECT — CRAFTED WITH REACT & TAILWIND CSS V4
        </span>
      </footer>
    </div>
  );
}
