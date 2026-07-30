import http from "http";
import { RuntimeManager } from "./kernel/runtime/runtimeManager.js";
import { ServiceRegistry } from "./kernel/registry/serviceRegistry.js";
import { EventBus } from "./kernel/events/eventBus.js";

const runtime = new RuntimeManager();
const registry = new ServiceRegistry();
const eventBus = new EventBus();

// Register core kernel event bus
registry.register("eventBus", eventBus);

// Register required enterprise services
registry.register("Identity", { status: "active", version: "1.0.0", description: "Identity & Tenant Resolution Service" });
registry.register("Workflow", { status: "active", version: "1.0.0", description: "Unified Workflow & Approval Engine" });
registry.register("AIGateway", { status: "active", version: "1.0.0", description: "AI Model Abstraction & Request Router" });
registry.register("FAAPFinance", { status: "active", version: "1.0.0", description: "FAAP Financial & Multi-Currency Ledger" });
registry.register("AEGISAudit", { status: "active", version: "1.0.0", description: "AEGIS Immutable Accountability & Compliance Ledger" });

// Register services in RuntimeManager
registry.list().forEach(serviceName => {
  runtime.register(serviceName);
});

const runtimeState = runtime.start();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (pathname === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      message: "JUMO UEOS Genesis Runtime",
      platform: "JUMO DIGITAL ENTERPRISE PLATFORM",
      system: "JUMO UNIVERSAL ENTERPRISE OPERATING SYSTEM (JUMO UEOS)",
      version: "1.0.0-genesis",
      status: "operational",
      endpoints: [
        "/health",
        "/api/runtime",
        "/api/services"
      ]
    }, null, 2));
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

  if (pathname === "/api/runtime") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      platformName: "JUMO DIGITAL ENTERPRISE PLATFORM",
      ueosVersion: "1.0.0-genesis",
      kernelStatus: runtimeState.status,
      runtimeDetails: runtimeState,
      registeredServices: registry.list(),
      availableExperienceModules: [
        "public-gateway",
        "identity-experience",
        "unified-workspace-shell"
      ]
    }, null, 2));
    return;
  }

  if (pathname === "/api/services") {
    const servicesDetail = {};
    registry.list().forEach(name => {
      servicesDetail[name] = registry.get(name);
    });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      services: servicesDetail
    }, null, 2));
    return;
  }

  // Fallback 404
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({
    error: "Not Found",
    message: `Endpoint ${pathname} not found on JUMO UEOS Genesis Runtime`
  }, null, 2));
});

server.listen(PORT, () => {
  console.log(`JUMO UEOS Genesis Runtime running on port ${PORT}`);
});
