import http from "http";
<<<<<<< HEAD
=======
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

>>>>>>> 639b91f (feat: enhance JUMO DIGITAL HYBRID PLATFORM with user profile header and public communication footer)
import { RuntimeManager } from "./kernel/runtime/runtimeManager.js";
import { ServiceRegistry } from "./kernel/registry/serviceRegistry.js";
import { EventBus } from "./kernel/events/eventBus.js";

<<<<<<< HEAD
const runtime = new RuntimeManager();
const registry = new ServiceRegistry();
const eventBus = new EventBus();

=======
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runtime = new RuntimeManager();
const registry = new ServiceRegistry();
const eventBus = new EventBus();
>>>>>>> 639b91f (feat: enhance JUMO DIGITAL HYBRID PLATFORM with user profile header and public communication footer)
registry.register("eventBus", eventBus);
registry.register("Identity", { status: "active", version: "1.0.0", description: "Identity & Tenant Resolution Service" });
registry.register("Workflow", { status: "active", version: "1.0.0", description: "Unified Workflow & Approval Engine" });
registry.register("AIGateway", { status: "active", version: "1.0.0", description: "AI Model Abstraction & Request Router" });
registry.register("FAAPFinance", { status: "active", version: "1.0.0", description: "FAAP Financial & Multi-Currency Ledger" });
registry.register("AEGISAudit", { status: "active", version: "1.0.0", description: "AEGIS Immutable Accountability & Compliance Ledger" });
<<<<<<< HEAD

registry.list().forEach(serviceName => {
  runtime.register(serviceName);
});

=======
registry.list().forEach(serviceName => {
  runtime.register(serviceName);
});
>>>>>>> 639b91f (feat: enhance JUMO DIGITAL HYBRID PLATFORM with user profile header and public communication footer)
const runtimeState = runtime.start();
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
<<<<<<< HEAD

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

=======
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
>>>>>>> 639b91f (feat: enhance JUMO DIGITAL HYBRID PLATFORM with user profile header and public communication footer)
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
<<<<<<< HEAD

  if (pathname === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      message: "JUMO UEOS Genesis Runtime",
      platform: "JUMO DIGITAL ENTERPRISE PLATFORM",
      system: "JUMO UNIVERSAL ENTERPRISE OPERATING SYSTEM (JUMO UEOS)",
      version: "1.0.0-genesis",
      status: "operational",
      endpoints: ["/health", "/api/runtime", "/api/services"]
    }, null, 2));
    return;
  }

=======
  
>>>>>>> 639b91f (feat: enhance JUMO DIGITAL HYBRID PLATFORM with user profile header and public communication footer)
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
<<<<<<< HEAD

=======
  
>>>>>>> 639b91f (feat: enhance JUMO DIGITAL HYBRID PLATFORM with user profile header and public communication footer)
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
<<<<<<< HEAD

=======
  
>>>>>>> 639b91f (feat: enhance JUMO DIGITAL HYBRID PLATFORM with user profile header and public communication footer)
  if (pathname === "/api/services") {
    const servicesDetail = {};
    registry.list().forEach(name => {
      servicesDetail[name] = registry.get(name);
    });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ services: servicesDetail }, null, 2));
    return;
  }
<<<<<<< HEAD

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found", message: `Endpoint ${pathname} not found` }, null, 2));
});

server.listen(PORT, () => {
  console.log(`JUMO UEOS Genesis Runtime running on port ${PORT}`);
});

=======
  
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

server.listen(PORT, () => {
  console.log(`JUMO UEOS Complete Enterprise Architecture running on port ${PORT}`);
});
>>>>>>> 639b91f (feat: enhance JUMO DIGITAL HYBRID PLATFORM with user profile header and public communication footer)
