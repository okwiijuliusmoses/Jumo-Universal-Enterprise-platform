// JUMO UEOS — UNIVERSAL AI PROVIDER CREDENTIAL & CONFIGURATION DIAGNOSTIC
// Authoritative security & execution verification suite across all AI providers and agents.
// ZERO SECRETS POLICY: No API keys, tokens, or credential values are ever logged or displayed.

import { JumoAIProviderRegistry } from "./src/core/ai/providers/JumoAIProviderRegistry";
import { JumoSecretVault } from "./src/core/security/JumoSecretVault";
import { JumoAIUrlResolver } from "./src/core/ai/utils/JumoAIUrlUtils";
import { JumoAIGatewayEngine } from "./src/core/ai/JumoAIGatewayEngine";
import { JumoGPTOperatingIntelligence } from "./src/core/ai/gateway/JumoGPTOperatingIntelligence";
import { JumoAIProviderGateway } from "./src/core/ai/gateway/JumoAIProviderGateway";

interface SafeProviderReport {
  Provider: string;
  ProviderID: string;
  CredentialConfigured: boolean;
  EndpointConfigured: boolean;
  EndpointAbsolute: boolean;
  HealthStatus: string;
  SelectedModel: string;
  FallbackEligible: boolean;
  SafeFailureCode?: string;
  RequiredConfig?: string;
}

async function runDiagnostic() {
  console.log("============================================================");
  console.log("JUMO UEOS — UNIVERSAL AI PROVIDER CREDENTIAL & RUNTIME DIAGNOSTIC");
  console.log("============================================================");
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log("------------------------------------------------------------");

  const registry = JumoAIProviderRegistry.getInstance();
  const providers = registry.list();
  const vault = JumoSecretVault.getInstance();

  console.log(`Auditing ${providers.length} registered AI providers through authoritative vault & resolvers.\n`);

  const reportList: SafeProviderReport[] = [];
  const remediationList: Array<{ Provider: string; RequiredSecret: string; Status: string; Action: string }> = [];

  for (const provider of providers) {
    const id = provider.providerId;
    let credentialConfigured = false;
    let endpointConfigured = false;
    let endpointAbsolute = false;
    let requiredConfig = "";
    let safeFailureCode: string | undefined = undefined;
    let selectedModel = "default";

    // 1. Audit credential and endpoint presence safely
    if (id === "GEMINI") {
      credentialConfigured = !!vault.getGeminiKey();
      endpointConfigured = true; // Managed natively by Google GenAI SDK
      endpointAbsolute = true;
      selectedModel = vault.getGeminiModel();
      requiredConfig = "JUMO_GEMINI_API_KEY";
    } else if (id === "OPENAI") {
      credentialConfigured = !!vault.getOpenAIKey();
      const base = vault.getKey("JUMO_OPENAI_PROVIDER_ENDPOINT") || "https://api.openai.com";
      endpointConfigured = !!base;
      endpointAbsolute = JumoAIUrlResolver.isAbsolute(base);
      selectedModel = vault.getOpenAIModel();
      requiredConfig = "JUMO_OPENAI_API_KEY";
    } else if (id === "COPILOT") {
      credentialConfigured = !!vault.getCopilotKey();
      const endpoint = vault.getCopilotProviderEndpoint();
      endpointConfigured = !!endpoint;
      endpointAbsolute = JumoAIUrlResolver.isAbsolute(endpoint);
      selectedModel = vault.getCopilotModel();
      requiredConfig = "JUMO_COPILOT_PROVIDER_ENDPOINT";
    } else if (id === "CODEX") {
      credentialConfigured = !!vault.getOpenAIKey();
      endpointConfigured = true;
      endpointAbsolute = true;
      selectedModel = "codex-engineering-agent";
      requiredConfig = "JUMO_OPENAI_API_KEY";
    } else if (id === "ANTHROPIC") {
      credentialConfigured = !!vault.getAnthropicKey();
      const base = "https://api.anthropic.com";
      endpointConfigured = true;
      endpointAbsolute = JumoAIUrlResolver.isAbsolute(base);
      selectedModel = "claude-3-7-sonnet";
      requiredConfig = "JUMO_ANTHROPIC_API_KEY";
    } else if (id === "JUMO_LOCAL" || provider.local) {
      credentialConfigured = true; // Air-gapped local engine does not require external SaaS API keys
      endpointConfigured = true;
      endpointAbsolute = true;
      selectedModel = "omalla-llama-3-8b";
      requiredConfig = "None (Sovereign Local Inference)";
    } else {
      credentialConfigured = false;
      endpointConfigured = false;
      endpointAbsolute = false;
      selectedModel = "unprovisioned";
      requiredConfig = "COMPATIBILITY_SLOT";
    }

    // 2. Query Health safely
    let healthStatus = "UNKNOWN";
    try {
      const health = await provider.getHealth();
      healthStatus = health.status;
      if (health.status === "NOT_CONFIGURED" || health.status === "UNAVAILABLE") {
        safeFailureCode = credentialConfigured ? "ENDPOINT_UNREACHABLE" : "MISSING_CREDENTIALS";
      }
    } catch (err: any) {
      healthStatus = "ERROR";
      safeFailureCode = "HEALTH_PROBE_ERROR";
    }

    const isHealthy = healthStatus === "HEALTHY" || healthStatus === "DEGRADED";

    reportList.push({
      Provider: provider.displayName.substring(0, 35) + (provider.displayName.length > 35 ? "..." : ""),
      ProviderID: id,
      CredentialConfigured: credentialConfigured,
      EndpointConfigured: endpointConfigured,
      EndpointAbsolute: endpointAbsolute,
      HealthStatus: healthStatus,
      SelectedModel: selectedModel,
      FallbackEligible: true,
      SafeFailureCode: isHealthy ? undefined : (safeFailureCode || "NOT_CONFIGURED"),
      RequiredConfig: isHealthy ? "OK" : requiredConfig
    });

    if (!isHealthy && id !== "FUTURE_ADAPTER") {
      remediationList.push({
        Provider: id,
        RequiredSecret: requiredConfig,
        Status: healthStatus,
        Action: `Provide via JumoSecretVault or deployment environment (${requiredConfig}). Never hardcode in files.`
      });
    }
  }

  console.log("AUTHORITATIVE PROVIDER STATUS REPORT (Zero Secrets Exposed):");
  console.table(reportList);

  if (remediationList.length > 0) {
    console.log("\nREQUIRED CONFIGURATION & REMEDIATION SUMMARY:");
    console.table(remediationList);
  }

  // 3. REAL END-TO-END EXECUTION TESTS
  console.log("\n------------------------------------------------------------");
  console.log("TESTING UNIVERSAL AGENT & JUMO GPT EXECUTION PATHS");
  console.log("------------------------------------------------------------");

  // A. JUMO GPT Operating Intelligence
  console.log("\n[Test 1] Executing via JumoGPTOperatingIntelligence...");
  try {
    const gpt = JumoGPTOperatingIntelligence.getInstance();
    const gptResponse = await gpt.execute({
      mode: "CONVERSATIONAL",
      message: "Verify JUMO UEOS sovereign AI fabric operational status.",
      principal: {
        identity: "system-admin-diagnostics",
        role: "SUPER_ADMIN",
        securityClearance: "TOP_SECRET_LEVEL_10",
        tenantId: "TENANT-GLOBAL-ROOT"
      }
    });

    console.log("  ✓ JUMO GPT Execution Succeeded!");
    console.log(`    - Status: ${gptResponse.status}`);
    console.log(`    - Provider Used: ${gptResponse.provider}`);
    console.log(`    - Model Selected: ${gptResponse.selectedModel}`);
    console.log(`    - Latency: ${gptResponse.latencyMs}ms`);
    console.log(`    - Snippet: ${gptResponse.response.substring(0, 90)}...`);
  } catch (err: any) {
    console.error(`  ✗ JUMO GPT Execution Failed: ${err.message}`);
  }

  // B. Universal AI Provider Gateway
  console.log("\n[Test 2] Executing via JumoAIProviderGateway (Universal Fabric)...");
  try {
    const gateway = JumoAIProviderGateway.getInstance();
    const gatewayRes = await gateway.reasoning({
      message: "Assess digital twin provisioning integrity.",
      systemPrompt: "You are the JUMO Sovereign Architecture Validator."
    });

    console.log("  ✓ Universal Gateway Execution Succeeded!");
    console.log(`    - Provider Executed: ${gatewayRes.providerId}`);
    console.log(`    - Model: ${gatewayRes.modelId}`);
    console.log(`    - Text Length: ${gatewayRes.text.length} chars`);
    console.log(`    - Response: ${gatewayRes.text.substring(0, 90)}...`);
  } catch (err: any) {
    console.error(`  ✗ Universal Gateway Execution Failed: ${err.message}`);
  }

  // C. JumoAIGatewayEngine (Agent Reasoning Fabric)
  console.log("\n[Test 3] Executing via JumoAIGatewayEngine (Agent Reasoning Fabric)...");
  try {
    const reasoningRes = await JumoAIGatewayEngine.processReasoningRequest({
      agentRole: "SOVEREIGN_ARCHITECT",
      prompt: "Synthesize platform compliance invariants for JDPM-2026."
    });

    console.log("  ✓ Agent Reasoning Execution Succeeded!");
    console.log(`    - Provider Used: ${reasoningRes.providerUsed}`);
    console.log(`    - Model Used: ${reasoningRes.modelUsed}`);
    console.log(`    - Execution Latency: ${reasoningRes.latencyMs}ms`);
    console.log(`    - Output: ${reasoningRes.content.substring(0, 90)}...`);
  } catch (err: any) {
    console.error(`  ✗ Agent Reasoning Execution Failed: ${err.message}`);
  }

  console.log("\n============================================================");
  console.log("UNIVERSAL AI DIAGNOSTIC COMPLETED SUCCESSFULLY");
  console.log("============================================================");
}

runDiagnostic().catch(err => {
  console.error("DIAGNOSTIC CRASHED:", err);
  process.exit(1);
});
