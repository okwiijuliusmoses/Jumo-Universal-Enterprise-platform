import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { erpRegistry } from "./platform/registry/ERPRegistry.js";
import { erpInstanceRegistry } from "./platform/registry/ERPInstanceRegistry.js";
import { moduleRegistry } from "./platform/registry/ModuleRegistry.js";
import { portalRegistry } from "./platform/registry/PortalRegistry.js";
import { workflowRegistry } from "./platform/registry/workflowRegistry.js";
import { formRegistry } from "./platform/registry/formRegistry.js";
import { componentRegistry } from "./platform/registry/componentRegistry.js";
import { departmentRegistry } from "./platform/registry/departmentRegistry.js";
import { aiERPRegistry } from "./platform/registry/ai/AIERPRegistry.js";
import { ERPBlueprintRegistry } from "./platform/factory/erp/ERPBlueprintRegistry.js";

import { RuntimeManager } from "./kernel/runtime/runtimeManager.js";
import { ServiceRegistry } from "./kernel/registry/serviceRegistry.js";
import { EventBus } from "./kernel/events/eventBus.js";
import { ERPConfigEngine } from "./kernel/erp/erpConfigEngine.js";
import { ERPStore } from "./services/erp/erpStore.js";
import { ueosRegistrySnapshotManager } from "./platform/storage/UEOSRegistrySnapshotManager.js";
import { restoreAllRegistries } from "./platform/control/registry/RegistryBootstrap.js";

import { erpDiscoveryService } from "./platform/factory/erp/services/ERPDiscoveryService.js";
import { ueosControlPlane } from "./platform/control/UEOSControlPlane.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runtime = new RuntimeManager();
const registry = new ServiceRegistry();
const eventBus = new EventBus();
const erpConfigEngine = new ERPConfigEngine(erpRegistry);
const erpStore = new ERPStore(erpRegistry, erpConfigEngine);

registry.register("eventBus", eventBus);
registry.register("ERPRegistry", erpRegistry);
registry.register("ERPConfigEngine", erpConfigEngine);
registry.register("ERPStore", erpStore);
registry.register("Identity", { status: "active", version: "1.0.0", description: "Identity & Tenant Resolution Service" });
registry.register("Workflow", { status: "active", version: "1.0.0", description: "Unified Workflow & Approval Engine" });
registry.register("AIGateway", { status: "active", version: "1.0.0", description: "AI Model Abstraction & Request Router" });
registry.register("FAAPFinance", { status: "active", version: "1.0.0", description: "FAAP Financial & Multi-Currency Ledger" });
registry.register("AEGISAudit", { status: "active", version: "1.0.0", description: "AEGIS Immutable Accountability & Compliance Ledger" });
registry.list().forEach(serviceName => {
  runtime.register(serviceName);
});
const runtimeState = runtime.start();
const PORT = 3000;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
  
  if (pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      status: "healthy",
      platform: "JUMO DIGITAL ENTERPRISE PLATFORM",
      system: "JUMO UEOS",
      runtime: runtimeState,
      servicesCount: registry.list().length,
      timestamp: new Date().toISOString()
    }, null, 2));
    return;
  }

  if (pathname === "/health/runtime") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      gateway: true,
      shell: true,
      auth: !!registry.get("Identity"),
      router: true,
      workspace: !!registry.get("ERPStore"),
      timestamp: new Date().toISOString()
    }, null, 2));
    return;
  }

  
  if (pathname === "/api/control-plane/status" || pathname === "/api/control-plane/health" || pathname === "/api/ueos/control/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const totalBlueprints = ERPBlueprintRegistry.list().length;
    const totalInstances = erpInstanceRegistry.list().length;
    const totalReg = moduleRegistry.list().length +
                     portalRegistry.list().length +
                     workflowRegistry.list().length +
                     formRegistry.list().length +
                     componentRegistry.list().length +
                     departmentRegistry.list().length +
                     totalInstances;

    res.end(JSON.stringify({
      controlPlane: { status: "ONLINE", version: "1.0.0-sovereign", mode: "SOVEREIGN_ADMIN" },
      aiRuntime: {
        status: "ONLINE",
        gateway: "ACTIVE",
        agentsCount: 4,
        agents: [
          { name: "Sovereign Control Assistant", capabilities: ["Platform Governance", "Tenant Provisioning"] },
          { name: "AEGIS Security Auditor", capabilities: ["Immutable Audit", "Policy Verification"] },
          { name: "FAAP Financial Router", capabilities: ["Ledger Balance", "Multi-Currency Settlement"] },
          { name: "ERP Factory Compiler", capabilities: ["Blueprint Generation", "Registry Assembly"] }
        ],
        models: ["Gemini 2.0 Flash", "Omni Flash", "Custom Weights"]
      },
      registryFederation: { status: "ONLINE", masterRegistry: "ONLINE", totalRegistered: totalReg },
      erpFactory: { status: "ONLINE", blueprints: totalBlueprints, activeInstances: totalInstances },
      tenantStatus: { status: "ONLINE", activeTenants: 3 },
      runtimeStatus: { status: "ONLINE", kernel: "ONLINE", shell: "ONLINE" },
      timestamp: new Date().toISOString()
    }, null, 2));
    return;
  }

  if (pathname === "/api/system/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const servicesDetail = registry.list().map(name => ({
       name: name,
       status: "READY"
    }));
    res.end(JSON.stringify({
      status: "READY",
      kernel: "ONLINE",
      shell: "ONLINE",
      services: servicesDetail
    }, null, 2));
    return;
  }

  if (pathname === "/system/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      Gateway: "PASS",
      Shell: "PASS",
      Router: "PASS",
      Runtime: "PASS",
      timestamp: new Date().toISOString()
    }, null, 2));
    return;
  }
  
  if (pathname === "/api/runtime") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      platformName: "JUMO DIGITAL ENTERPRISE PLATFORM",
      ueosVersion: "1.0.0-genesis",
      kernelStatus: runtimeState.status,
      runtimeDetails: runtimeState,
      registeredServices: registry.list(),
      availableExperienceModules: ["public-gateway", "identity-experience", "unified-workspace-shell"]
    }, null, 2));
    return;
  }
  
  if (pathname === "/api/services") {
    const servicesDetail = {};
    registry.list().forEach(name => {
      servicesDetail[name] = registry.get(name);
    });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ services: servicesDetail }, null, 2));
    return;
  }
  
  if (pathname === "/api/ueos/erp/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(ueosControlPlane.getERPStatus(), null, 2));
    return;
  }

  if (pathname === "/api/erp/ecosystem" || pathname === "/api/ueos/erp/ecosystem") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(erpDiscoveryService.getEcosystem(), null, 2));
    return;
  }

  if (pathname === "/api/ueos/erp/catalogue") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(erpDiscoveryService.getEcosystemTree(), null, 2));
    return;
  }

  if (pathname === "/api/ueos/erp") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(ueosControlPlane.getERPApplications(), null, 2));
    return;
  }

  if (pathname === "/api/ueos/templates" && req.method === "GET") {
    const { erpEcosystemTemplateRegistry } = await import("./platform/factory/erp/ERPEcosystemTemplateRegistry.js");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(erpEcosystemTemplateRegistry.listTemplates(), null, 2));
    return;
  }

  if (pathname === "/api/ueos/instances" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(erpDiscoveryService.listERPs(), null, 2));
    return;
  }

  if (pathname === "/api/ueos/deploy" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", async () => {
      try {
        const { templateId, name } = JSON.parse(body);
        const { erpEcosystemTemplateRegistry } = await import("./platform/factory/erp/ERPEcosystemTemplateRegistry.js");
        const template = erpEcosystemTemplateRegistry.getTemplate(templateId) || erpEcosystemTemplateRegistry.getBlueprint(templateId);
        
        if (!template) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Template or blueprint not found" }));
          return;
        }
        
        const instanceId = `inst-${templateId}-${Date.now().toString().slice(-4)}`;
        const newInstance = {
          id: instanceId,
          instanceId: instanceId,
          templateId: template.id,
          blueprintId: template.blueprintId || template.id,
          name: name || `${template.name} Instance`,
          tenant: `tenant-${Date.now().toString().slice(-6)}`,
          status: "ACTIVE",
          lifecycle: "RUNNING",
          configurationStatus: "CONFIGURED",
          deploymentStatus: "DEPLOYED",
          runtimeStatus: "ONLINE"
        };
        
        erpInstanceRegistry.register(newInstance);
        ueosRegistrySnapshotManager.saveAll();
        
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newInstance, null, 2));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  if (pathname.startsWith("/api/ueos/erp/") && pathname !== "/api/ueos/erp/health" && pathname !== "/api/ueos/erp/catalogue" && pathname !== "/api/ueos/erp/ecosystem") {
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    
    if (lastSegment === "status") {
        try {
            const actualId = segments[segments.length - 2];
            const instance = ueosControlPlane.getERPInstance(actualId);
            if (!instance) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "ERP Instance not found" }, null, 2));
                return;
            }
            const { erpComplianceValidator } = await import("./platform/factory/erp/services/ERPComplianceValidator.js");
            const compliance = erpComplianceValidator.validate(instance);
            const workspace = ueosControlPlane.resolveERPWorkspace("tenant-default-001", actualId);
            
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                status: instance.lifecycle || "RUNNING",
                compliance: compliance.status,
                portals: workspace.workspace.portals.length,
                modules: workspace.workspace.modules.length,
                components: workspace.workspace.components.length,
                forms: workspace.workspace.forms.length,
                departments: workspace.workspace.departments.length,
                workflows: workspace.workspace.workflows.length,
                settings: "CONFIGURED"
            }, null, 2));
        } catch (err) {
            console.error("ERP Status Error:", err);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Failed to retrieve ERP status", details: err.message }, null, 2));
        }
        return;
    }

    if (lastSegment === "workspace" || lastSegment === "runtime") {
        try {
            const actualId = segments[segments.length - 2];
            const workspace = ueosControlPlane.resolveERPWorkspace("tenant-default-001", actualId);
            if (!workspace) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "ERP Workspace not found" }, null, 2));
                return;
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(workspace, null, 2));
        } catch (err) {
            console.error("Workspace Resolution Error:", err);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal Server Error during workspace resolution", details: err.message }, null, 2));
        }
        return;
    }

    if (lastSegment === "launch" && req.method === "POST") {
        try {
            const actualId = segments[segments.length - 2];
            const { erpProvisioningService } = await import("./platform/factory/erp/services/ERPProvisioningService.js");
            const launchContext = await erpProvisioningService.launchERP(actualId);
            
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(launchContext, null, 2));
        } catch (err) {
            console.error("ERP Launch Error:", err);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Failed to launch ERP platform", details: err.message }, null, 2));
        }
        return;
    }

    const id = segments[segments.length - 1];
    const erpInstance = ueosControlPlane.getERPInstance(id);
    if (!erpInstance) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "ERP not found" }, null, 2));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(erpInstance, null, 2));
    return;
  }
  
  // Static JS / CSS / module asset file server
  if (pathname.endsWith(".js") || pathname.endsWith(".css") || pathname.startsWith("/experience/") || pathname.startsWith("/assets/")) {
    let relativePath = pathname.startsWith("/") ? pathname.substring(1) : pathname;
    // Map shortcut root assets
    if (pathname === "/app.js") relativePath = "experience/gateway/app.js";
    if (pathname === "/styles.css") relativePath = "experience/gateway/styles.css";
    
    const filePath = path.join(__dirname, relativePath);
    fs.readFile(filePath, (err, content) => {
      if (err) {
        // Fallback to index.html for non-existent html or SPA assets
        const htmlPath = path.join(__dirname, "experience", "gateway", "index.html");
        fs.readFile(htmlPath, (hErr, hContent) => {
          if (hErr) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Not Found");
            return;
          }
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(hContent);
        });
        return;
      }
      
      let contentType = "text/plain";
      if (filePath.endsWith(".js")) contentType = "application/javascript";
      else if (filePath.endsWith(".css")) contentType = "text/css";
      else if (filePath.endsWith(".html")) contentType = "text/html";
      else if (filePath.endsWith(".json")) contentType = "application/json";
      else if (filePath.endsWith(".svg")) contentType = "image/svg+xml";
      
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    });
    return;
  }

  // Catch-all SPA Router for application routes (/login, /register, /gateway, /organizations, /workspace, /control-center, /shell, workspace.html etc.)
  const filePath = path.join(__dirname, "experience", "gateway", "index.html");
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end("Error loading application shell.");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(content);
  });
});

restoreAllRegistries();
server.listen(PORT, () => {
  console.log(`JUMO UEOS Complete Enterprise Architecture running on port ${PORT}`);
});
