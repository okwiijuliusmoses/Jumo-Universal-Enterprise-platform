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
  private static dynamicVault: Map<string, string> = new Map();

  private constructor() {
    this.preloadDotenv();
  }

  public static getInstance(): JumoSecretVault {
    if (!JumoSecretVault.instance) {
      JumoSecretVault.instance = new JumoSecretVault();
    }
    return JumoSecretVault.instance;
  }

  public static hasKey(key: string): boolean {
    const normalizedKey = key.startsWith("JUMO_") ? key : `JUMO_${key}`;
    const altKey = key.replace(/^JUMO_/, "");
    if (this.dynamicVault.has(key) && (this.dynamicVault.get(key) || "").trim().length > 0) return true;
    if (this.dynamicVault.has(normalizedKey) && (this.dynamicVault.get(normalizedKey) || "").trim().length > 0) return true;
    if (this.dynamicVault.has(altKey) && (this.dynamicVault.get(altKey) || "").trim().length > 0) return true;
    
    const envVal = (typeof process !== "undefined" && process.env) ? (
      process.env[key] || 
      process.env[normalizedKey] || 
      process.env[altKey] || 
      process.env[`VITE_${altKey}`] || 
      process.env[`VITE_${key}`]
    ) : undefined;
    return !!envVal && envVal.trim().length > 0;
  }

  public static getKey(key: string): string {
    const normalizedKey = key.startsWith("JUMO_") ? key : `JUMO_${key}`;
    const altKey = key.replace(/^JUMO_/, "");
    if (this.dynamicVault.has(key)) return this.dynamicVault.get(key) || "";
    if (this.dynamicVault.has(normalizedKey)) return this.dynamicVault.get(normalizedKey) || "";
    if (this.dynamicVault.has(altKey)) return this.dynamicVault.get(altKey) || "";

    if (typeof process !== "undefined" && process.env) {
      return (
        process.env[key] ||
        process.env[normalizedKey] ||
        process.env[altKey] ||
        process.env[`VITE_${altKey}`] ||
        process.env[`VITE_${key}`] ||
        ""
      );
    }
    return "";
  }

  public static setKey(key: string, value: string): void {
    const normalizedKey = key.startsWith("JUMO_") ? key : `JUMO_${key}`;
    this.dynamicVault.set(key, value);
    this.dynamicVault.set(normalizedKey, value);
    if (typeof process !== "undefined" && process.env) {
      process.env[key] = value;
      process.env[normalizedKey] = value;
    }
  }

  public static getMaskedKey(key: string): string {
    const val = this.getKey(key);
    if (!val || val.length < 8) return "••••••••";
    return `${val.substring(0, 4)}••••••••${val.substring(val.length - 4)}`;
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

  public getKey(keyName: string): string {
    return JumoSecretVault.getKey(keyName);
  }

  public hasKey(keyName: string): boolean {
    return JumoSecretVault.hasKey(keyName);
  }

  public getOpenAIKey(): string {
    return (process.env.JUMO_OPENAI_API_KEY || process.env.OPENAI_API_KEY || "").trim();
  }

  public getGeminiKey(): string {
    return (process.env.JUMO_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "").trim();
  }

  public getCopilotKey(): string {
    return (process.env.JUMO_COPILOT_API_KEY || process.env.COPILOT_API_KEY || "").trim();
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

  public getDigitalPayIdentitySecret(): string {
    return process.env.JUMO_DIGITAL_PAY_IDENTITY_SECRET || process.env.DIGITAL_PAY_IDENTITY_SECRET || "JUMO-DEVELOPMENT-IDENTITY-SECRET-CHANGE-ME-32";
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

  public getUniversalAiProvider(): string {
    return process.env.JUMO_UNIVERSAL_AI_PROVIDER || "openai";
  }

  public getRepositoryRoot(): string {
    // If running in a browser environment, return a safe default.
    if (typeof window !== "undefined") {
      return "/";
    }

    // Node-only environment
    try {
      const path = require("path");
      if (typeof process !== "undefined" && typeof process.cwd === "function") {
        const cwd = process.cwd();
        return (process.env && process.env.JUMO_REPOSITORY_ROOT) || path.resolve(cwd);
      }
    } catch (e) {}
    return (typeof process !== "undefined" && process.env && process.env.JUMO_REPOSITORY_ROOT) || "/";
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
