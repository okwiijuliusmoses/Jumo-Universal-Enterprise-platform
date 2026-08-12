// JUMO UEOS — Centralized Secret Configuration/Vault Layer
// Central adapter managing all external AI credentials and sensitive runtime secrets.
// Aligned with the JUMO digital hybrid platform architecture.
// Prevents secret leakages, enforces startup validation, and manages provider states.

import { SovereignOperatingStateService } from "../runtime/sovereignState";

export type ConfigState =
  | "NOT_CONFIGURED"
  | "CONFIGURED"
  | "AUTHENTICATION_FAILED"
  | "UNREACHABLE"
  | "READY"
  | "FAILED";

export interface VaultStartupReport {
  timestamp: string;
  secrets: Record<string, { configured: boolean; state: ConfigState }>;
  configurations: Record<string, string | number | boolean>;
  isValid: boolean;
  errors: string[];
  warnings: string[];
  validatedVariables: string[];
  status: string;
}

export class JumoSecretVault {
  private static instance: JumoSecretVault;

  private constructor() {
    this.preloadDotenv();
  }

  public static getInstance(): JumoSecretVault {
    if (!JumoSecretVault.instance) {
      JumoSecretVault.instance = new JumoSecretVault();
    }
    return JumoSecretVault.instance;
  }

  private preloadDotenv(): void {
    try {
      // Lazy load dotenv if required, but process.env is usually pre-populated
      const dotenv = require("dotenv");
      dotenv.config();
    } catch (e) {
      // Suppress when running in contexts where dotenv is not needed/present as a CJS module
    }
  }

  // ==========================================
  // SECRETS ACCESSORS (NEVER exposed to Client)
  // ==========================================

  public getOpenAIKey(): string {
    return process.env.JUMO_OPENAI_API_KEY || "";
  }

  public getGeminiKey(): string {
    return process.env.JUMO_GEMINI_API_KEY || "";
  }

  public getCopilotKey(): string {
    return process.env.JUMO_COPILOT_API_KEY || "";
  }

  public getSecretEncryptionKey(): string {
    return process.env.JUMO_SECRET_ENCRYPTION_KEY || "";
  }

  public getSessionSecret(): string {
    return process.env.JUMO_SESSION_SECRET || "";
  }

  public getJwtSecret(): string {
    return process.env.JUMO_JWT_SECRET || "";
  }

  public getInternalServiceSecret(): string {
    return process.env.JUMO_INTERNAL_SERVICE_SECRET || "";
  }

  public getProviderRequestSigningSecret(): string {
    return process.env.JUMO_PROVIDER_REQUEST_SIGNING_SECRET || "";
  }

  public getProviderWebhookSecret(): string {
    return process.env.JUMO_PROVIDER_WEBHOOK_SECRET || "";
  }

  // ==========================================
  // CONFIGURATIONS ACCESSORS
  // ==========================================

  public getAIProviderMode(): "LIVE" | "HYBRID" | "AIR-GAP" {
    const val = process.env.JUMO_AI_PROVIDER_MODE || "HYBRID";
    if (val === "LIVE" || val === "HYBRID" || val === "AIR-GAP") {
      return val;
    }
    return "HYBRID";
  }

  public getAIReasoningPolicy(): "CRITICAL_ARCH_PREFER_OPENAI" | "COST_SENSITIVE" | "BALANCED" {
    const val = process.env.JUMO_AI_REASONING_POLICY || "BALANCED";
    if (val === "CRITICAL_ARCH_PREFER_OPENAI" || val === "COST_SENSITIVE" || val === "BALANCED") {
      return val;
    }
    return "BALANCED";
  }

  public getOpenAIModel(): string {
    return process.env.JUMO_OPENAI_MODEL || "gpt-5.6-sol";
  }

  public getGeminiModel(): string {
    return process.env.JUMO_GEMINI_MODEL || "gemini-3.6-flash";
  }

  public getCopilotProviderEndpoint(): string {
    return process.env.JUMO_COPILOT_PROVIDER_ENDPOINT || "";
  }

  public getCopilotModel(): string {
    return process.env.JUMO_COPILOT_MODEL || "copilot-intelligent-mesh";
  }

  public getAITimeoutMs(): number {
    const val = process.env.JUMO_AI_TIMEOUT_MS || "30000";
    return parseInt(val, 10) || 30000;
  }

  public getAIMaxRetries(): number {
    const val = process.env.JUMO_AI_MAX_RETRIES || "3";
    return parseInt(val, 10) || 3;
  }

  public getAIMaxConcurrency(): number {
    const val = process.env.JUMO_AI_MAX_CONCURRENCY || "5";
    return parseInt(val, 10) || 5;
  }

  public getAIFallbackEnabled(): boolean {
    const val = process.env.JUMO_AI_FALLBACK_ENABLED;
    if (val === undefined) return true;
    return val === "true";
  }

  public getAIExternalProviderRequired(): boolean {
    const val = process.env.JUMO_AI_EXTERNAL_PROVIDER_REQUIRED;
    if (val === undefined) return false;
    return val === "true";
  }

  public getAIProviderHealthCheckEnabled(): boolean {
    const val = process.env.JUMO_AI_PROVIDER_HEALTH_CHECK_ENABLED;
    if (val === undefined) return true;
    return val === "true";
  }

  public getManufacturingAutoTransition(): boolean {
    const val = process.env.JUMO_MANUFACTURING_AUTO_TRANSITION;
    if (val === undefined) return true;
    return val === "true";
  }

  public getManufacturingHumanGatesEnforced(): boolean {
    const val = process.env.JUMO_MANUFACTURING_HUMAN_GATES_ENFORCED;
    if (val === undefined) return true;
    return val === "true";
  }

  public getSovereignLedgerEnabled(): boolean {
    const val = process.env.JUMO_SOVEREIGN_LEDGER_ENABLED;
    if (val === undefined) return true;
    return val === "true";
  }

  public getArchitectureExpansionLevel(): "MIN" | "BALANCED" | "MAX" {
    const val = process.env.JUMO_ARCHITECTURE_EXPANSION_LEVEL || "MAX";
    if (val === "MIN" || val === "BALANCED" || val === "MAX") {
      return val;
    }
    return "MAX";
  }

  // ==========================================
  // STARTUP VALIDATION & UTILITIES
  // ==========================================

  public validateStartup(): VaultStartupReport {
    const errors: string[] = [];
    const secretsList = {
      JUMO_OPENAI_API_KEY: this.getOpenAIKey(),
      JUMO_GEMINI_API_KEY: this.getGeminiKey(),
      JUMO_COPILOT_API_KEY: this.getCopilotKey(),
      JUMO_SECRET_ENCRYPTION_KEY: this.getSecretEncryptionKey(),
      JUMO_SESSION_SECRET: this.getSessionSecret(),
      JUMO_JWT_SECRET: this.getJwtSecret(),
      JUMO_INTERNAL_SERVICE_SECRET: this.getInternalServiceSecret(),
      JUMO_PROVIDER_REQUEST_SIGNING_SECRET: this.getProviderRequestSigningSecret(),
      JUMO_PROVIDER_WEBHOOK_SECRET: this.getProviderWebhookSecret(),
    };

    const secretStates: Record<string, { configured: boolean; state: ConfigState }> = {};

    for (const [key, value] of Object.entries(secretsList)) {
      const isConfigured = value.trim().length > 0;
      secretStates[key] = {
        configured: isConfigured,
        state: isConfigured ? "CONFIGURED" : "NOT_CONFIGURED",
      };

      // Critical internal platform secrets warnings
      if (!isConfigured && ["JUMO_SECRET_ENCRYPTION_KEY", "JUMO_SESSION_SECRET", "JUMO_JWT_SECRET"].includes(key)) {
        errors.push(`Critical variable missing: ${key} is required for secure state-management.`);
      }
    }

    const configurations = {
      JUMO_AI_PROVIDER_MODE: this.getAIProviderMode(),
      JUMO_AI_REASONING_POLICY: this.getAIReasoningPolicy(),
      JUMO_OPENAI_MODEL: this.getOpenAIModel(),
      JUMO_GEMINI_MODEL: this.getGeminiModel(),
      JUMO_COPILOT_PROVIDER_ENDPOINT: this.getCopilotProviderEndpoint(),
      JUMO_COPILOT_MODEL: this.getCopilotModel(),
      JUMO_AI_TIMEOUT_MS: this.getAITimeoutMs(),
      JUMO_AI_MAX_RETRIES: this.getAIMaxRetries(),
      JUMO_AI_MAX_CONCURRENCY: this.getAIMaxConcurrency(),
      JUMO_AI_FALLBACK_ENABLED: this.getAIFallbackEnabled(),
      JUMO_AI_EXTERNAL_PROVIDER_REQUIRED: this.getAIExternalProviderRequired(),
      JUMO_AI_PROVIDER_HEALTH_CHECK_ENABLED: this.getAIProviderHealthCheckEnabled(),
      JUMO_MANUFACTURING_AUTO_TRANSITION: this.getManufacturingAutoTransition(),
      JUMO_MANUFACTURING_HUMAN_GATES_ENFORCED: this.getManufacturingHumanGatesEnforced(),
      JUMO_SOVEREIGN_LEDGER_ENABLED: this.getSovereignLedgerEnabled(),
      JUMO_ARCHITECTURE_EXPANSION_LEVEL: this.getArchitectureExpansionLevel(),
    };

    const warnings: string[] = [];
    if (!secretStates.JUMO_OPENAI_API_KEY.configured) {
      warnings.push("JUMO_OPENAI_API_KEY is not configured. Defaulting to local/fallback pathways.");
    }
    if (!secretStates.JUMO_GEMINI_API_KEY.configured) {
      warnings.push("JUMO_GEMINI_API_KEY is not configured. JUMO engineering workspace may be restricted.");
    }

    const validatedVariables = [
      ...Object.keys(secretsList),
      ...Object.keys(configurations),
    ];

    const report: VaultStartupReport = {
      timestamp: new Date().toISOString(),
      secrets: secretStates,
      configurations,
      isValid: errors.length === 0,
      errors,
      warnings,
      validatedVariables,
      status: errors.length === 0 ? "READY" : "FAILED",
    };

    // Log the validation check to Sovereign State Audit safely (redacted, no keys displayed)
    SovereignOperatingStateService.logAudit(
      "JUMO_SECRET_VAULT",
      "STARTUP_VALIDATION",
      `JUMO Secret Configuration/Vault initialized. Status: ${report.status}. Validity: ${report.isValid}. Configured secrets: ${Object.keys(report.secrets).filter(k => report.secrets[k].configured).join(", ") || "None"}`
    );

    return report;
  }
}
