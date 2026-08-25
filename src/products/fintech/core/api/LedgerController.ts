import { PostTransactionRequest } from '../domain/LedgerEntry';
import { LedgerService } from '../services/LedgerService';

export class LedgerController {
  constructor(private ledgerService: LedgerService) {}

  async postTransaction(req: any, res: any) {
    try {
      const request: PostTransactionRequest = req.body;
      
      const transaction = await this.ledgerService.postTransaction(request);
      res.status(200).json(transaction);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
