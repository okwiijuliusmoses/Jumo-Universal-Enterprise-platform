export type ModelType = 'CREDIT_SCORING' | 'FRAUD_DETECTION' | 'CHURN_PREDICTION' | 'CASHFLOW_FORECAST';
export type ModelStatus = 'TRAINING' | 'ACTIVE' | 'DEPRECATED' | 'FAILED';

export interface FinancialModel {
  id: string;
  name: string;
  type: ModelType;
  version: string;
  status: ModelStatus;
  accuracy: number;
  lastTrainedAt: string;
  features: string[]; // List of required input features
  parameters: Record<string, any>;
}

export interface PredictionRequest {
  modelId: string;
  targetId: string; // e.g., userId, transactionId
  features: Record<string, any>;
}

export interface PredictionResult {
  predictionId: string;
  modelId: string;
  score: number;
  confidence: number;
  factors: { feature: string; impact: number }[];
  timestamp: string;
}
