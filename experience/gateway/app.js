import { BRAND_CONFIG, getOfficialLogoHtml } from "../brand/brandConfig.js";
import { publicTemplate, loginTemplate, registerTemplate, gatewayTemplate, contactTemplate } from "./index.js";
import { workspaceTemplate } from "../workspace/index.js";
import { controlCenterTemplate, controlCenterLoginTemplate } from "../control-center/index.js";
import { shellTemplate } from "../shell/index.js";
import { erpPlatformTemplate } from "../erp/index.js";

// Global Application State
window.state = {
  currentPath: window.location.pathname || "/",
  session: null, // Start with no session for public landing page
  activeWorkspaceTab: "org",
  activeTab: "diagnostics",
  activeTenantId: "tenant-default-001",
  faapTransactions: [
    { id: "TX-99081", type: "FAAP Treasury Transfer", amount: "$150,000", status: "CONFIRMED", timestamp: "2026-05-18 10:14:02" },
    { id: "TX-99082", type: "Global Vendor Settle", amount: "$42,500", status: "CONFIRMED", timestamp: "2026-05-18 11:02:18" }
  ],
  organizations: [
    // Organizations resolved dynamically through Tenant Registry
    { id: "org-3", name: "Africa's Business Solutions Ltd", role: "Manager", status: "Pending", badge: "Corporate", color: "amber" }
  ],
  authError: null
};

// Router Handler
window.navigate = function(path, params = {}) {
  window.history.pushState(params, "", path);
  window.state.currentPath = path;
  window.render();
};

window.addEventListener("popstate", () => {
  window.state.currentPath = window.location.pathname;
  window.render();
});

// Render Dispatcher
window.render = function() {
  const path = window.state.currentPath;
  const appElement = document.getElementById("app");
  if (!appElement) return;

  // Global window assignment for compatibility
  window.app = appElement;

  if (path === "/" || path === "/index.html") {
    publicTemplate(window.state);
  } else if (path === "/contact") {
    contactTemplate(window.state);
  } else if (path === "/login") {
    loginTemplate(window.state);
  } else if (path === "/register") {
    registerTemplate(window.state);
  } else if (path === "/gateway" || path.startsWith("/gateway/")) {
    gatewayTemplate(window.state);
  } else if (path === "/workspace" || path.startsWith("/workspace/")) {
    workspaceTemplate(window.state);
  } else if (path === "/control-center/login") {
    controlCenterLoginTemplate(window.state);
  } else if (path === "/control-center" || path.startsWith("/control-center/")) {
    controlCenterTemplate(window.state);
  } else if (path === "/shell" || path.startsWith("/shell/")) {
    shellTemplate(window.state);
  } else if (path === "/erp" || path.startsWith("/erp/")) {
    erpPlatformTemplate(window.state);
  } else {
    // Default fallback to Gateway or Public depending on session
    if (window.state.session) {
      gatewayTemplate(window.state);
    } else {
      publicTemplate(window.state);
    }
  }
};

// UI Handlers
window.handleLoginSubmit = function(e) {
  e.preventDefault();
  const emailInput = document.getElementById("login-email");
  const email = emailInput ? emailInput.value : "admin@enterprise.com";

  window.state.session = {
    user: {
      name: email.split("@")[0].replace(".", " "),
      email: email,
      role: "Enterprise Administrator",
      isAdmin: true,
      status: "Verified Enterprise Account"
    },
    organization: null,
    tenantId: "tenant-default-001"
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
document.addEventListener("DOMContentLoaded", () => {
  window.render();
});
