
/**
 * JUMO SOVEREIGN DATA SERVICE
 * Authoritative service for record persistence and retrieval.
 */

export interface SovereignRecord {
  id: string;
  schemaId: string;
  data: any;
  status: string;
  createdAt: string;
  updatedAt: string;
}

class SovereignDataService {
  private static instance: SovereignDataService;
  private storage: Map<string, SovereignRecord[]> = new Map();

  private constructor() {
    this.loadFromLocal();
  }

  public static getInstance(): SovereignDataService {
    if (!SovereignDataService.instance) {
      SovereignDataService.instance = new SovereignDataService();
    }
    return SovereignDataService.instance;
  }

  private loadFromLocal() {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
    try {
      const saved = localStorage.getItem('JUMO_SOVEREIGN_LEDGER');
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.keys(parsed).forEach(key => {
          this.storage.set(key, parsed[key]);
        });
      }
    } catch (e) {
      console.error('Failed to load sovereign ledger from storage', e);
    }
  }

  private syncToLocal() {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
    try {
      const obj: any = {};
      this.storage.forEach((value, key) => {
        obj[key] = value;
      });
      localStorage.setItem('JUMO_SOVEREIGN_LEDGER', JSON.stringify(obj));
    } catch (e) {
      console.error('Failed to sync sovereign ledger to storage', e);
    }
  }

  public saveRecord(schemaId: string, data: any, id?: string): SovereignRecord {
    const records = this.storage.get(schemaId) || [];
    const now = new Date().toISOString();
    
    if (id) {
      // Update existing
      const index = records.findIndex(r => r.id === id);
      if (index !== -1) {
        records[index] = {
          ...records[index],
          data,
          updatedAt: now
        };
      } else {
        throw new Error(`Record ${id} not found in ${schemaId}`);
      }
    } else {
      // Create new
      const newRecord: SovereignRecord = {
        id: `${schemaId.split('_').pop()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        schemaId,
        data,
        status: 'ACTIVE',
        createdAt: now,
        updatedAt: now
      };
      records.push(newRecord);
    }

    this.storage.set(schemaId, records);
    this.syncToLocal();
    return records[records.length - 1];
  }

  public getRecords(schemaId: string): SovereignRecord[] {
    return this.storage.get(schemaId) || [];
  }

  public getRecord(schemaId: string, id: string): SovereignRecord | undefined {
    return this.getRecords(schemaId).find(r => r.id === id);
  }

  public deleteRecord(schemaId: string, id: string) {
    const records = this.storage.get(schemaId) || [];
    const filtered = records.filter(r => r.id !== id);
    this.storage.set(schemaId, filtered);
    this.syncToLocal();
  }
}

export const SovereignData = SovereignDataService.getInstance();

export const resolveModuleDataSummary = (moduleId: string) => {
  return {
    activeRecords: 0,
    pendingWorkflows: 0,
    lastUpdate: new Date().toISOString()
  };
};
