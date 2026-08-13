import express from "express";
import path from "path";
import { SovereignOperatingStateService } from "./src/core/runtime/sovereignState";
import { JumoInstitutionalDomainEngine } from "./src/core/tenant/JumoInstitutionalDomainEngine";
import { JumoAIGatewayEngine } from "./src/core/ai/JumoAIGatewayEngine";
import { JumoProviderQuotaManager } from "./src/core/ai/JumoProviderQuotaManager";
import { JumoModelEvolutionEngine } from "./src/core/ai/JumoModelEvolutionEngine";
import { JumoAgentContractRegistry } from "./src/core/ai/JumoAgentContractRegistry";
import { JumoAutonomousMaintenanceEngine } from "./src/core/maintenance/JumoAutonomousMaintenanceEngine";
import { JumoMaintenanceManufacturingPipeline } from "./src/core/maintenance/JumoMaintenanceManufacturingPipeline";
import { JumoInstitutionalLifecycleEngine } from "./src/core/platform/JumoInstitutionalLifecycleEngine";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Sovereign State Endpoints
  app.get("/api/v1/ueos/state", (req, res) => {
    try {
      const state = SovereignOperatingStateService.getState();
      res.json(state);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/v1/ueos/state/update", (req, res) => {
    try {
      const updates = req.body;
      SovereignOperatingStateService.updateState(draft => {
        Object.assign(draft, updates);
      });
      res.json({ success: true, state: SovereignOperatingStateService.getState() });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Institutional Domain Engine API
  app.post("/api/v1/ueos/domain/provision", (req, res) => {
    try {
      const config = JumoInstitutionalDomainEngine.provisionInstitutionalTenant(req.body);
      res.json({ success: true, domainConfig: config });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/v1/ueos/domain/verify", (req, res) => {
    try {
      const { token } = req.body;
      const verified = JumoInstitutionalDomainEngine.verifyDomain(token);
      res.json({ verified, domainConfig: JumoInstitutionalDomainEngine.getDomainConfig() });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // AI Gateway & Reasoning APIs
  app.get("/api/v1/ueos/ai/gateway", (req, res) => {
    try {
      res.json(JumoAIGatewayEngine.getGatewayState());
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/v1/ueos/ai/reasoning", (req, res) => {
    try {
      const response = JumoAIGatewayEngine.processReasoningRequest(req.body);
      res.json(response);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/v1/ueos/ai/quotas", (req, res) => {
    try {
      res.json(JumoProviderQuotaManager.getQuotas());
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/v1/ueos/ai/contracts", (req, res) => {
    try {
      res.json(JumoAgentContractRegistry.getContracts());
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/v1/ueos/ai/discover-model", (req, res) => {
    try {
      const { provider, modelName, releaseDate } = req.body;
      const record = JumoModelEvolutionEngine.discoverAndEvaluateModel(provider, modelName, releaseDate);
      res.json(record);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/v1/ueos/ai/promote-model", (req, res) => {
    try {
      const { id } = req.body;
      const success = JumoModelEvolutionEngine.promoteModelToProduction(id);
      res.json({ success });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Maintenance & Repair Pipeline APIs
  app.get("/api/v1/ueos/maintenance/sessions", (req, res) => {
    try {
      res.json(JumoAutonomousMaintenanceEngine.getSessions());
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/v1/ueos/maintenance/initiate", (req, res) => {
    try {
      const session = JumoAutonomousMaintenanceEngine.initiateMaintenanceSession(req.body);
      res.json(session);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/v1/ueos/maintenance/execute-pipeline", (req, res) => {
    try {
      const { component, errorMessage } = req.body;
      const session = JumoMaintenanceManufacturingPipeline.executePipeline(component, errorMessage);
      res.json(session);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Product Version Control
  app.get("/api/v1/ueos/lifecycle/version", (req, res) => {
    try {
      res.json(JumoInstitutionalLifecycleEngine.getVersionControl());
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Vite Middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[JUMO UEOS SERVER] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
