import { GoogleGenAI, Type } from "@google/genai";
import { LedgerRepository, AuditLogRepository } from "../../repositories/repositories";
import { faapService, FinancialTransaction } from "../../platforms/faap/faapService";
import { JumoSecretVault } from "../security/JumoSecretVault";

export interface LedgerAuditResult {
  isAuditHealthy: boolean;
  score: number;
  discrepancies: string[];
  anomalies: { txId: string; description: string; riskLevel: "Low" | "Medium" | "High" }[];
  recommendation: string;
}

export class FinancialAuditor {
  private static instance: FinancialAuditor;
  private aiInstance: GoogleGenAI | null = null;

  private constructor() {}

  public static getInstance(): FinancialAuditor {
    if (!FinancialAuditor.instance) {
      FinancialAuditor.instance = new FinancialAuditor();
    }
    return FinancialAuditor.instance;
  }

  private getAI(): GoogleGenAI {
    if (!this.aiInstance) {
      const key = JumoSecretVault.getInstance().getGeminiKey();
      if (!key) {
        throw new Error("JUMO_GEMINI_API_KEY is not defined. Please add your key in the Settings panel.");
      }
      this.aiInstance = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return this.aiInstance;
  }

  public async runCognitiveAudit(tenantId: string): Promise<LedgerAuditResult> {
    try {
      const accounts = LedgerRepository.findAllAccounts();
      const transactions = faapService.getTransactionHistory().filter(tx => tx.tenantId === tenantId || tenantId === "Global");

      const sysInfo = `You are the Supreme JUMO UEOS Cognitive FAAP Auditor.
Your job is to analyze the provided Chart of Accounts and recent transactions for mathematical and logical consistency, finding any suspicious or unbalanced transfers, potential fraudulent postings, or circular routing.

You must reply with a structured JSON response matching the requested schema.`;

      const prompt = `Please audit the following ledger configuration and operational transactions:

CHART OF ACCOUNTS:
${JSON.stringify(accounts, null, 2)}

RECENT TRANSACTIONS:
${JSON.stringify(transactions, null, 2)}

Ensure you verify standard accounting principles:
1. Double-entry consistency.
2. High-risk transaction detection (large round sums, late night posts).
3. Check if fee structures are correctly debited/credited where applicable.`;

      const ai = this.getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction: sysInfo,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              isAuditHealthy: {
                type: Type.BOOLEAN,
                description: "True if there are no major discrepancy issues or high-risk warnings.",
              },
              score: {
                type: Type.INTEGER,
                description: "The audit score from 0 (critically vulnerable) to 100 (flawless compliance).",
              },
              discrepancies: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "A list of any ledger or mathematical balance mismatches.",
              },
              anomalies: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    txId: { type: Type.STRING, description: "The transaction ID if applicable, or generic descriptor." },
                    description: { type: Type.STRING, description: "Detailed description of the flagged anomaly." },
                    riskLevel: { type: Type.STRING, description: "The risk category: Low, Medium, or High." },
                  },
                  required: ["txId", "description", "riskLevel"],
                },
                description: "List of anomalous behavior logs flagged by cognitive models.",
              },
              recommendation: {
                type: Type.STRING,
                description: "The primary high-level action-oriented recommendation to the financial controller.",
              },
            },
            required: ["isAuditHealthy", "score", "discrepancies", "anomalies", "recommendation"],
          },
        },
      });

      const parsedResult: LedgerAuditResult = JSON.parse(response.text || "{}");
      
      AuditLogRepository.log(
        "Gemini_Cognitive_Auditor",
        "COGNITIVE_AUDIT_EXEC",
        `Completed cognitive audit for tenant: ${tenantId}. Score: ${parsedResult.score}/100. Status: ${parsedResult.isAuditHealthy ? "HEALTHY" : "WARNING"}`
      );

      return parsedResult;
    } catch (error: any) {
      console.error("[AUDITOR_ERROR] Cognitive audit execution failed:", error);
      throw new Error(`Cognitive audit failed: ${error.message}`);
    }
  }
}

export const financialAuditor = FinancialAuditor.getInstance();
