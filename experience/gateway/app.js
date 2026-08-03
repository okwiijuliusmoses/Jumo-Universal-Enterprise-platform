import { startupDiagnostics } from "../../kernel/runtime/startupDiagnostics.js";
import { bootOrchestrator } from "../../kernel/boot/BootOrchestrator.js";
import { BRAND_CONFIG, getOfficialLogoHtml } from "../brand/brandConfig.js";
import { publicTemplate, loginTemplate, registerTemplate, gatewayTemplate, contactTemplate } from "./index.js";
import { workspaceTemplate } from "../workspace/index.js";
import { controlCenterTemplate, controlCenterLoginTemplate } from "../control-center/index.js";
import { shellTemplate } from "../shell/index.js";
import { erpPlatformTemplate } from "../erp/index.js";
const UEOS_API = "/api/ueos";

// Global Error Protection
window.onerror = function(message, source, lineno, colno, error) {
  console.error("UEOS Runtime Error:", { message, source, lineno, colno, error });
  displayError({ message, source, lineno, colno, error });
};

window.addEventListener('unhandledrejection', function(event) {
  console.error("UEOS Unhandled Rejection:", event.reason);
  displayError({ message: "Unhandled Rejection", error: event.reason });
});

// Diagnostic/Recovery Display
function displayError(error, component = "Unknown") {
  const appElement = document.getElementById("app");
  if (!appElement) {
    document.body.innerHTML = `
      <div class="fixed inset-0 bg-slate-900 text-white flex flex-col items-center justify-center p-6 font-mono text-xs">
        <div class="max-w-md w-full bg-slate-800 p-8 rounded-2xl border border-rose-500/50">
          <h1 class="text-rose-500 font-bold text-lg mb-4">JUMO UEOS CRITICAL FAILURE</h1>
          <p class="text-rose-400 font-bold">${error.message || error}</p>
          <button onclick="window.location.reload()" class="mt-8 w-full py-3 bg-rose-600 hover:bg-rose-700 rounded-lg font-bold">Hard Reload</button>
        </div>
      </div>
    `;
    return;
  }
  
  appElement.innerHTML = `
    <div class="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 font-mono text-xs">
      <div class="max-w-2xl w-full bg-slate-800 p-8 rounded-2xl border border-rose-500/50 shadow-2xl">
        <h1 class="text-rose-500 font-bold text-lg mb-2">JUMO UEOS Runtime Recovery</h1>
        <p class="text-slate-400 mb-6">A critical failure occurred during ${component} initialization.</p>
        
        <div class="space-y-4 bg-slate-950 p-6 rounded-lg text-xs overflow-x-auto">
          <div class="grid grid-cols-2 gap-2 text-slate-500">
            <span>Timestamp:</span> <span>${new Date().toISOString()}</span>
            <span>Component:</span> <span class="text-white">${component}</span>
            <span>Route:</span> <span class="text-white">${window.state ? window.state.currentPath : 'Unknown'}</span>
          </div>
          <div class="border-t border-slate-700 pt-4">
             <p class="text-slate-500 mb-1">Boot Status:</p>
             <ul class="text-slate-300 list-disc pl-5">
               ${(window.state && window.state.bootStatus ? window.state.bootStatus : []).map(step => `<li>${step}</li>`).join('')}
             </ul>
          </div>
          <div class="border-t border-slate-700 pt-4">
             <p class="text-rose-400 font-bold">Error Trace:</p>
             <p class="text-rose-300">${error.message || error}</p>
             ${error.stack ? `<pre class="mt-2 text-[10px] text-slate-500">${error.stack}</pre>` : ''}
          </div>
        </div>
        
        <button onclick="window.location.reload()" class="mt-8 w-full py-3 bg-rose-600 hover:bg-rose-700 rounded-lg font-bold">Hard Reload Platform</button>
      </div>
    </div>
  `;
}

// Global Application State
startupDiagnostics.log("CONFIG LOADED");
window.state = {
  currentPath: window.location.pathname || "/",
  history: [],
  session: null, // Start with no session for public landing page
  activeWorkspaceTab: "org",
  activeTab: "diagnostics",
  activeTenantId: "tenant-default-001",
  activeErpId: "edu-uni",
  activeErpInstanceId: "inst-univ-01",
  deployedInstitution: {
    id: "tenant-default-001",
    name: "JUMO University",
    type: "Education ERP",
    domain: "portal.kampala.edu.ug",
    themeColor: "blue",
    portals: [
      { id: "student", name: "Student Portal" },
      { id: "faculty", name: "Faculty Portal" },
      { id: "admin", name: "Administration Portal" },
      { id: "applicant", name: "Admissions Portal" }
    ]
  },
  faapTransactions: [
    { id: "TX-99081", type: "FAAP Treasury Transfer", amount: "$150,000", status: "CONFIRMED", timestamp: "2026-05-18 10:14:02" },
    { id: "TX-99082", type: "Global Vendor Settle", amount: "$42,500", status: "CONFIRMED", timestamp: "2026-05-18 11:02:18" }
  ],
  organizations: [
    { id: "org-1", name: "JUMO University", role: "Administrator", status: "Active", badge: "Education ERP", color: "blue" },
    { id: "org-2", name: "JUMO Health Network", role: "Staff", status: "Active", badge: "Healthcare ERP", color: "emerald" },
    { id: "org-3", name: "Africa's Business Solutions Ltd", role: "Manager", status: "Pending", badge: "Corporate", color: "amber" }
  ],
  notifications: [],
  searchResults: [],
  domains: [],
  workflows: [],
  auditLogs: [],
  portalActionLogs: [],
  portalAuths: {},
  bootStatus: ["Public Gateway Loaded"],
  authError: null
};
window.appState = window.state;

// Dynamic ERP Context Resolver to prevent University structures leakage across templates
export function resolveActiveERPContext(state) {
  const controlPlane = window.ueosControlPlane;
  
  // Find currently active template ID & active instance ID
  let activeErpId = (state && state.activeErpId) || (state && state.session?.activeErpTemplate?.id) || null;
  let activeInstanceId = (state && state.activeErpInstanceId) || (state && state.session?.activeErpInstance?.instanceId) || null;
  
  let activeInstance = null;
  let activeTemplate = null;
  
  if (controlPlane) {
    if (typeof controlPlane.getDeployedERPInstances === 'function') {
      const installed = controlPlane.getDeployedERPInstances();
      if (activeInstanceId) {
        activeInstance = installed.find(i => i.instanceId === activeInstanceId);
      }
      if (!activeInstance && activeErpId) {
        activeInstance = installed.find(i => i.templateId === activeErpId);
      }
      if (!activeInstance && installed.length > 0) {
        activeInstance = installed[0];
      }
    }
    const resolvedTemplateId = activeInstance ? activeInstance.templateId : (activeErpId || (state && state.session?.activeErpTemplate?.id));
    if (resolvedTemplateId && typeof controlPlane.getERPTemplate === 'function') {
      activeTemplate = controlPlane.getERPTemplate(resolvedTemplateId);
    }
  }
  
  const name = activeInstance ? activeInstance.name : (activeTemplate ? activeTemplate.name : "Unconfigured Enterprise Platform");
  const portals = activeInstance ? (activeInstance.structure?.portals || []) : (activeTemplate ? (activeTemplate.governancePortals || []) : []);
  
  return {
    template: activeTemplate,
    instance: activeInstance,
    portals: portals,
    name: name,
    id: activeInstance ? activeInstance.tenantId : "tenant-default-001"
  };
}

if (typeof window !== 'undefined') {
  window.resolveActiveERPContext = resolveActiveERPContext;
}

function validateUEOSState() {
  if (!window.state) window.state = {};
  window.state.history = window.state.history || [];
  window.state.notifications = window.state.notifications || [];
  window.state.searchResults = window.state.searchResults || [];
  window.state.faapTransactions = window.state.faapTransactions || [];
  window.state.organizations = window.state.organizations || [];
  window.state.domains = window.state.domains || [];
  window.state.workflows = window.state.workflows || [];
  window.state.auditLogs = window.state.auditLogs || [];
  window.state.portalActionLogs = window.state.portalActionLogs || [];
  window.state.portalAuths = window.state.portalAuths || {};
  window.state.bootStatus = window.state.bootStatus || ["Public Gateway Loaded"];
  
  // Synchronize state with runtime context dynamically without forcing edu-uni
  const ctx = resolveActiveERPContext(window.state);
  if (ctx.instance) {
    window.state.activeErpId = ctx.instance.templateId;
    window.state.activeErpInstanceId = ctx.instance.instanceId;
  } else if (ctx.template) {
    window.state.activeErpId = ctx.template.id;
  }

  window.state.deployedInstitution = {
    id: ctx.id,
    name: ctx.name,
    type: ctx.template ? `${ctx.template.ecosystem} ERP` : "Enterprise ERP",
    domain: ctx.instance ? `${ctx.instance.templateId}.jumo.ueos` : "portal.jumo.ueos",
    themeColor: ctx.template?.ecosystem === "Faith-Based" ? "emerald" : "blue",
    portals: ctx.portals.map(p => ({ id: p.id, name: p.name, desc: p.desc || p.name }))
  };
}

// Router Handler
window.navigate = function(path, addToHistory = true) {
  if (addToHistory && path !== window.state.currentPath) {
    window.state.history.push(window.state.currentPath);
    window.history.pushState({ path }, "", path);
  }
  window.state.currentPath = path;
  window.render();
};

window.goBack = function() {
  if (window.state.history.length > 0) {
    const previousPath = window.state.history.pop();
    window.state.currentPath = previousPath;
    window.history.replaceState({ path: previousPath }, "", previousPath);
    window.render();
  } else {
    window.navigate("/", false);
  }
};

window.addEventListener("popstate", (event) => {
  if (event.state && event.state.path) {
    window.state.currentPath = event.state.path;
    window.render();
  }
});

// Render Dispatcher
window.render = function() {
  validateUEOSState();
  startupDiagnostics.log("WORKSPACE READY");
  try {
    const urlObj = new URL(window.state.currentPath, window.location.origin);
    const path = urlObj.pathname;
    
    // Add steps
    if (!window.state.bootStatus.includes("Authentication Engine Loaded")) {
       window.state.bootStatus.push("Authentication Engine Loaded");
    }
    
    if (urlObj.searchParams.has('portal')) {
      window.state.activePortalId = urlObj.searchParams.get('portal');
    }
    const appElement = document.getElementById("app");
    if (!appElement) return;

    if (!window.state.bootStatus.includes("UEOS Shell Loaded")) {
       window.state.bootStatus.push("UEOS Shell Loaded");
    }

    // Global window assignment for compatibility
    window.app = appElement;

    // ERP Platform Architectural Hierarchy: Public Landing -> Auth -> Portal -> Workspace
    if (path === "/" || path === "/index.html") {
      publicTemplate(window.state);
    } else if (path === "/login") {
      loginTemplate(window.state);
    } else if (path === "/control-center/login") {
      controlCenterLoginTemplate(window.state);
    } else if (path.startsWith("/control-center")) {
      controlCenterTemplate(window.state);
    } else if (window.state.session) {
      // Authenticated Portal/Office Workspace hierarchy
      if (window.state.activePortalId) {
         // Enterprise Portal Workspace
         workspaceTemplate(window.state);
      } else {
         // Portal Selection / Institutional Home
         gatewayTemplate(window.state);
      }
    } else {
      // Fallback
      publicTemplate(window.state);
    }
    
    if (!window.state.bootStatus.includes("Workspace Resolver Loaded")) {
       window.state.bootStatus.push("Workspace Resolver Loaded");
    }
    if (!window.state.bootStatus.includes("ERP Runtime Loaded")) {
       window.state.bootStatus.push("ERP Runtime Loaded");
    }
    
  } catch (e) {
    displayError(e);
  }
};

// UI Handlers

window.handleSovereignLogin = async function(e, redirectRoute = '/control-center') {
  e.preventDefault();
  
  const emailInput = document.getElementById("sov-email") || document.getElementById("login-email") || { value: "owner@jumo.enterprise" };
  const email = emailInput.value || "owner@jumo.enterprise";
  
  try {
    // Phase 1 - Authentication Validation (Simulated for frontend)
    // Send request through services/identity/identityGateway.js
    
    // Simulate successful authentication and set UEOS session
    window.state.session = {
      user: {
        name: email.split("@")[0].replace(".", " "),
        email: email,
        role: "Platform Owner",
        isAdmin: true,
        status: "Sovereign Administrator"
      },
      organization: "JUMO GLOBAL PLATFORM HQ",
      tenantId: "tenant-sovereign-000"
    };
    
    if (!window.state.bootStatus) window.state.bootStatus = [];
    if (!window.state.bootStatus.includes("Sovereign Identity Validated")) {
      window.state.bootStatus.push("Sovereign Identity Validated");
    }
    
    // Redirect to Control Center workspace
    window.navigate(redirectRoute);
    
  } catch (error) {
    console.error("[UEOS] Sovereign Authentication Failed", error);
    alert("Authentication failed. Verify credentials and permissions.");
  }
};

window.handleLoginSubmit = function(e) {
  e.preventDefault();
  const emailInput = document.getElementById("login-email");
  const email = emailInput ? emailInput.value : "admin@enterprise.com";

  const ctx = resolveActiveERPContext(window.state);

  window.state.session = {
    user: {
      name: email.split("@")[0].replace(".", " "),
      email: email,
      role: "Enterprise Administrator",
      isAdmin: true,
      status: "Verified Enterprise Account"
    },
    organization: ctx.name,
    tenantId: ctx.id,
    activeErpInstance: ctx.instance,
    activeErpTemplate: ctx.template
  };

  window.navigate("/gateway");
};

window.handleRegisterSubmit = function(e) {
  e.preventDefault();
  const nameInput = document.getElementById("reg-name");
  const typeInput = document.getElementById("reg-type");
  const emailInput = document.getElementById("reg-email");

  const newOrg = {
    id: `org-${Date.now()}`,
    name: nameInput ? nameInput.value : "New Institution",
    role: "Administrator",
    status: "Active",
    badge: typeInput ? typeInput.value : "Enterprise ERP",
    color: "blue"
  };

  window.state.organizations.unshift(newOrg);
  if (!window.state.session) {
    window.state.session = {
      user: {
        name: emailInput ? emailInput.value.split("@")[0].replace(".", " ") : "Enterprise Admin",
        email: emailInput ? emailInput.value : "admin@enterprise.com",
        role: "Enterprise Administrator",
        isAdmin: true,
        status: "Verified Enterprise Account"
      },
      organization: newOrg.name,
      tenantId: newOrg.id
    };
  }

  window.navigate("/gateway");
};

window.handleJoinSubmit = function(e) {
  e.preventDefault();
  const codeInput = document.getElementById("join-code");
  const code = codeInput ? codeInput.value : "ORG-JOINED";

  window.state.organizations.push({
    id: `org-${Date.now()}`,
    name: `Joined Org (${code})`,
    role: "Member",
    status: "Active",
    badge: "Joined Org",
    color: "emerald"
  });

  window.closeJoinModal();
  window.render();
};

window.handleLogout = function() {
  window.state.session = null;
  window.navigate("/");
};

window.toggleProfileDropdown = function() {
  const el = document.getElementById("profile-dropdown");
  if (el) el.classList.toggle("hidden");
};

window.toggleNotificationsMenu = function() {
  const el = document.getElementById("notifications-menu");
  if (el) el.classList.toggle("hidden");
};

window.toggleGatewaySidebar = function() {
  const sidebar = document.getElementById("gateway-sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  if (sidebar && overlay) {
    sidebar.classList.toggle("-translate-x-full");
    overlay.classList.toggle("hidden");
  }
};

window.togglePublicSidebar = function() {
  const sidebar = document.getElementById("public-sidebar");
  const overlay = document.getElementById("public-sidebar-overlay");
  if (sidebar && overlay) {
    sidebar.classList.toggle("-translate-x-full");
    overlay.classList.toggle("hidden");
  }
};

window.toggleChat = function() {
  const chat = document.getElementById("jumo-assistant-chat");
  if (chat) chat.classList.toggle("hidden");
};

window.openRegisterModal = function() {
  window.navigate("/register");
};

window.openJoinModal = function() {
  const modal = document.getElementById("join-modal");
  if (modal) modal.classList.remove("hidden");
};

window.closeJoinModal = function() {
  const modal = document.getElementById("join-modal");
  if (modal) modal.classList.add("hidden");
};


window.askAi = function(e, inputId, stateKey) {
  e.preventDefault();
  const input = document.getElementById(inputId);
  if (input && input.value) {
    const query = input.value;
    input.value = '';
    window.state[stateKey] = "AI Gateway Processing: Analysing your request...";
    window.render();
    
    setTimeout(() => {
      window.state[stateKey] = "UEOS AI Analysis Complete: " + query + ". (Simulated Enterprise Response)";
      window.render();
    }, 1500);
  }
};

window.recordFaapTransaction = function(e) {
  e.preventDefault();
  const amount = document.getElementById("faap-tx-amount")?.value || "10000";
  const type = document.getElementById("faap-tx-type")?.value || "FAAP Treasury Transfer";
  const curr = document.getElementById("faap-tx-currency")?.value || "USD";

  window.state.faapTransactions.unshift({
    id: `TX-${Math.floor(10000 + Math.random() * 90000)}`,
    type: type,
    amount: `${curr === 'USD' ? '$' : '€'}${Number(amount).toLocaleString()}`,
    status: "CONFIRMED",
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
  });

  window.render();
};

window.fetchAudit = function() {
  window.render();
};

window.fetchWorkflows = function() {
  window.render();
};

window.fetchRuntime = function() {
  window.render();
};

window.switchTenant = function(id, name) {
  window.state.activeTenantId = id;
  if (window.state.session) {
    window.state.session.tenantId = id;
    window.state.session.organization = name;
  }
  window.render();
};

// Initialize app on load
document.addEventListener("DOMContentLoaded", async () => {
  startupDiagnostics.log("HTML LOADED");

  if (window.state && window.state.bootComplete) {
    if (typeof window.render === 'function') window.render();
    return;
  }
  const bootProgress = document.getElementById("boot-progress");
  const bootSteps = document.getElementById("boot-steps");

  if (bootProgress && bootSteps) {
    bootProgress.classList.remove("hidden");
    requestAnimationFrame(() => {
      bootProgress.classList.remove("opacity-0");
    });
    
    // Subscribe to real orchestrator
    bootOrchestrator.onProgress((services, stage, serviceId) => {
      if (stage === 'START_CRITICAL') {
        bootSteps.innerHTML = '';
        services.critical.forEach(step => {
          const li = document.createElement("li");
          li.id = `step-${step.id}`;
          li.className = "flex items-center text-slate-400 transition-colors duration-300";
          li.innerHTML = `
            <svg class="w-4 h-4 mr-3 text-slate-300 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ${step.name}
          `;
          bootSteps.appendChild(li);
        });
      } else if (stage === 'UPDATE' && serviceId) {
        const step = services.critical.find(s => s.id === serviceId);
        if (step && step.status === 'READY') {
          const li = document.getElementById(`step-${serviceId}`);
          if (li) {
            li.classList.remove("text-slate-400");
            li.classList.add("text-slate-700");
            li.innerHTML = `
              <svg class="w-4 h-4 mr-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              ${step.name}
            `;
          }
        }
      }
    });

    // Start Boot Orchestration
    startupDiagnostics.log("KERNEL LOADED");
    await bootOrchestrator.boot(window.state);
    
    // Small pause to let user see "complete"
    // await new Promise(res => setTimeout(res, 400));
  }
  
  startupDiagnostics.log("SHELL MOUNTED");
  window.render();
});
