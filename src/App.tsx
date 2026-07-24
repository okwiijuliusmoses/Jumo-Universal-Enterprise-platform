import React, { useState, useEffect } from "react";
import { jumoFetch } from "./core/config/api";
import { 
  Sparkles, Layers, ListChecks, Cpu, MessageSquare, 
  Trash2, Download, Upload, Plus, AlertTriangle, RefreshCw, Activity, Sliders
} from "lucide-react";
import { SavedProject, SoftwareBlueprint, ChatMessage, KanbanTask } from "./types";
import ProjectWizard from "./components/ProjectWizard";
import BlueprintViewer from "./components/BlueprintViewer";
import KanbanBoard from "./components/KanbanBoard";
import BoilerplateGenerator from "./components/BoilerplateGenerator";
import RuntimeConsole from "./components/RuntimeConsole";
import ChatPanel from "./components/ChatPanel";
import PublicPortal from "./components/PublicPortal";
import OwnerControlCenter from "./components/OwnerControlCenter";
import ExperienceRuntime from "./components/ExperienceRuntime";
import { SAMPLE_BLUEPRINT } from "./mockBlueprint";
import { UEOS_BLUEPRINT } from "./ueosBlueprint";

const STORAGE_KEY = "dev_blueprint_projects";

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
  const [activeTab, setActiveTab] = useState<"blueprint" | "kanban" | "boilerplate" | "console" | "owner_center" | "runtime_os">(() => {
    const saved = localStorage.getItem("jumo_current_user");
    if (saved) {
      try {
        const u = JSON.parse(saved);
        return "runtime_os";
      } catch (e) {}
    }
    return "blueprint";
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
      const inputStr = typeof input === "string" ? input : input instanceof URL ? input.toString() : "";
      if (inputStr.startsWith("/api/")) {
        const isFirebase = window.location.hostname.includes("web.app") || window.location.hostname.includes("firebaseapp.com");
        if (isFirebase) {
          targetInput = "https://jumo-ueos-dhp-production-production.up.railway.app" + inputStr;
          init.mode = "cors";
        }
      }

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
            {/* Project Selector */}
            {projects.length > 0 && (
              <select
                value={activeProjectId}
                onChange={(e) => {
                  setActiveProjectId(e.target.value);
                  setError(null);
                }}
                className="bg-slate-900 text-slate-200 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-emerald-500/50 cursor-pointer"
              >
                <option value="" disabled>Select Blueprint...</option>
                {projects.map((proj) => (
                  <option key={proj.id} value={proj.id}>
                    {proj.title}
                  </option>
                ))}
              </select>
            )}

            {/* Clear Custom / Back to Onboarding */}
            {activeProjectId && (
              <button
                onClick={() => {
                  setActiveProjectId("");
                  setError(null);
                }}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 flex items-center gap-1.5 transition cursor-pointer"
                title="Create a new system blueprint"
              >
                <Plus className="h-3.5 w-3.5 text-emerald-400" />
                <span className="hidden sm:inline">New Project</span>
              </button>
            )}

            <button
              onClick={() => {
                localStorage.removeItem("jumo_current_user");
                localStorage.removeItem("jumo_session_token");
                localStorage.removeItem("jumo_session_expires_at");
                setCurrentUser(null);
                setActiveTab("blueprint");
              }}
              className="bg-rose-950/20 text-rose-400 hover:bg-rose-950/40 border border-rose-900/40 px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-6 min-h-0 overflow-visible">
        {/* If no project is selected and we're not loading, show the Wizard form */}
        {!activeProject && !isLoading ? (
          <div className="flex-1 flex flex-col items-center">
            <ProjectWizard 
              onGenerate={handleGenerateBlueprint} 
              isLoading={isLoading} 
            />
            {projects.length > 0 && (
              <div className="mt-8 text-center bg-slate-900/20 border border-slate-850 p-6 rounded-2xl max-w-lg w-full">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Or Resume Active Work</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {projects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setActiveProjectId(p.id)}
                      className="bg-slate-950 hover:bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 transition cursor-pointer"
                    >
                      {p.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <ProjectWizard 
              onGenerate={handleGenerateBlueprint} 
              isLoading={isLoading} 
            />
          </div>
        ) : activeProject ? (
          /* Active Project Workbench Layout */
          <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
            {/* Left Column Workbench */}
            <div className="flex-1 space-y-6 min-w-0">
              {/* Project Bar Context */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900/20 border border-slate-850 p-4 rounded-2xl gap-3">
                <div>
                  <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Active Design Context</div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    {activeProject.title}
                    <span className="text-[10px] bg-slate-800 font-normal px-2 py-0.5 rounded-full text-slate-400">
                      {activeProject.createdAt}
                    </span>
                  </h2>
                </div>

                {/* Workbench utilities */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleExportJSON}
                    className="flex-1 sm:flex-none bg-slate-900 hover:bg-slate-800 border border-slate-800 p-2 rounded-xl text-xs text-slate-300 flex items-center justify-center gap-1.5 transition cursor-pointer"
                    title="Export blueprint as JSON file"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Export</span>
                  </button>

                  <label className="flex-1 sm:flex-none bg-slate-900 hover:bg-slate-800 border border-slate-800 p-2 rounded-xl text-xs text-slate-300 flex items-center justify-center gap-1.5 transition cursor-pointer">
                    <Upload className="h-3.5 w-3.5" />
                    <span>Import</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJSON}
                      className="hidden"
                    />
                  </label>

                  {activeProject.id !== "demo_gym_saas" && activeProject.id !== "demo_ueos" ? (
                    <button
                      onClick={() => handleDeleteProject(activeProject.id)}
                      className="p-2 border border-rose-950 hover:bg-rose-950/20 text-rose-400 rounded-xl transition cursor-pointer"
                      title="Delete design"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleLoadDemo}
                      className="p-2 border border-slate-800 hover:bg-slate-850 text-slate-400 rounded-xl transition cursor-pointer"
                      title="Reset templates to default core state"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* API Key Missing Alert Callout Banner */}
              {error && (
                <div className="bg-rose-950/25 border border-rose-900/60 p-4 rounded-xl flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-rose-400 mb-1">Architecture Pipeline Interrupted</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {error}. If you don't have an API key set, you can still test full functionality by clicking the columns in the **Sprint Kanban Board**, selecting templates in the **Boilerplate Scaffolder**, or exporting files.
                    </p>
                  </div>
                </div>
              )}

              {/* View Selector Controls */}
              <div className="flex flex-wrap bg-slate-950 border border-slate-850 p-1 rounded-xl gap-1">
                <button
                  onClick={() => setActiveTab("runtime_os")}
                  className="flex-1 min-w-[140px] py-2 rounded-lg text-xs font-bold tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 text-emerald-400 hover:from-emerald-500/20 hover:to-teal-500/20 hover:border-emerald-500/50"
                >
                  <Cpu className="h-4 w-4 text-emerald-400 animate-pulse" />
                  <span>Launch Sovereign OS</span>
                </button>
                {currentUser.role === "SecOps_Administrator" && (
                  <button
                    onClick={() => setActiveTab("owner_center")}
                    className={`flex-1 min-w-[120px] py-2 rounded-lg text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeTab === "owner_center"
                        ? "bg-slate-900 text-teal-400 shadow"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Sliders className="h-4 w-4" />
                    <span>Owner Command Room</span>
                  </button>
                )}
                <button
                  onClick={() => setActiveTab("blueprint")}
                  className={`flex-1 min-w-[100px] py-2 rounded-lg text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === "blueprint"
                      ? "bg-slate-900 text-emerald-400 shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Layers className="h-4 w-4" />
                  <span>Architecture Specs</span>
                </button>
                <button
                  onClick={() => setActiveTab("kanban")}
                  className={`flex-1 min-w-[100px] py-2 rounded-lg text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === "kanban"
                      ? "bg-slate-900 text-emerald-400 shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <ListChecks className="h-4 w-4" />
                  <span>Sprint Kanban</span>
                </button>
                <button
                  onClick={() => setActiveTab("boilerplate")}
                  className={`flex-1 min-w-[100px] py-2 rounded-lg text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === "boilerplate"
                      ? "bg-slate-900 text-emerald-400 shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Cpu className="h-4 w-4" />
                  <span>Boilerplate Scaffolder</span>
                </button>
                <button
                  onClick={() => setActiveTab("console")}
                  className={`flex-1 min-w-[100px] py-2 rounded-lg text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === "console"
                      ? "bg-slate-900 text-emerald-400 shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Activity className="h-4 w-4" />
                  <span>Platform Console</span>
                </button>
              </div>

              {/* Active Tab Panel Views */}
              <div className="min-h-0">
                {activeTab === "owner_center" && currentUser.role === "SecOps_Administrator" && (
                  <OwnerControlCenter currentUser={currentUser} onLogout={() => {
                    localStorage.removeItem("jumo_current_user");
                    localStorage.removeItem("jumo_session_token");
                    setCurrentUser(null);
                    setActiveTab("blueprint");
                  }} />
                )}
                {activeTab === "blueprint" && (
                  <BlueprintViewer blueprint={activeProject.blueprint} />
                )}
                {activeTab === "kanban" && (
                  <KanbanBoard 
                    tasks={activeProject.blueprint.kanbanTasks || []} 
                    onUpdateTasks={handleUpdateTasks} 
                  />
                )}
                {activeTab === "boilerplate" && (
                  <BoilerplateGenerator blueprint={activeProject.blueprint} />
                )}
                {activeTab === "console" && (
                  <RuntimeConsole blueprintName={activeProject.title} />
                )}
              </div>
            </div>

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
