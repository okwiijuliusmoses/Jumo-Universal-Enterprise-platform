import { 
  FinancialModel, 
  PredictionRequest, 
  PredictionResult 
} from '../domain/FinancialModel';

export interface DataIntelligenceService {
  /**
   * Generates a prediction using a specified financial model
   */
  generatePrediction(request: PredictionRequest): Promise<PredictionResult>;

  /**
   * Retrieves details of an active financial model
   */
  getModel(modelId: string): Promise<FinancialModel | null>;

  /**
   * Triggers a retraining cycle for a specific model based on new data
   */
  retrainModel(modelId: string, dataSetId: string): Promise<FinancialModel>;
  
  /**
   * Evaluates a batch of transactions for anomalous patterns
   */
  detectAnomalies(transactionIds: string[]): Promise<Record<string, PredictionResult>>;
}
