/**
 * JUMO AI DIGITAL HYBRID MESH PLATFORM
 * Multi-Model Routing, Local Offline Inference, RAG & Specialized Agent Matrix
 * Authority: JUMO UEOS Architecture V2.0
 */

export type AIModelTier =
  | "GEMINI_2_5_FLASH"
  | "GEMINI_2_5_PRO"
  | "CLAUDE_3_5_SONNET"
  | "DEEPSEEK_R1"
  | "LOCAL_ONNX_EMBEDDED";

export type AIAgentDomain =
  | "FAAP_FINANCIAL_FORENSICS"
  | "ACADEMIC_CURRICULUM_GENERATOR"
  | "CLINICAL_TRIAGE_ASSISTANT"
  | "SACCO_CREDIT_SCORING"
  | "SECURITY_ANOMALY_DETECTOR"
  | "SOVEREIGN_TRANSLATOR";

export interface AIInferenceRequest {
  id: string;
  domain: AIAgentDomain;
  prompt: string;
  contextData?: Record<string, unknown>;
  preferredModel?: AIModelTier;
  allowLocalFallback: boolean;
  timestamp: string;
}

export interface AIInferenceResponse {
  requestId: string;
  domain: AIAgentDomain;
  routedModel: AIModelTier;
  content: string;
  tokenUsage: { prompt: number; completion: number; total: number };
  latencyMs: number;
  confidenceScore: number;
  isLocalInference: boolean;
  timestamp: string;
}

export interface RAGKnowledgeVector {
  id: string;
  domain: AIAgentDomain;
  title: string;
  content: string;
  vectorEmbeddingId: string;
  statutoryCategory: string;
}
