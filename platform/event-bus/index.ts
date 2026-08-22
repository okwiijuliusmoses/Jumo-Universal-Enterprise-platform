/**
 * JUMO UEOS Event Bus Module
 */

export type PlatformEventType =
  | 'TENANT_PROVISIONED'
  | 'JOURNAL_POSTED'
  | 'TREASURY_DRAWDOWN'
  | 'CREDIT_RISK_EVALUATED'
  | 'WORKFLOW_RULE_TRIGGERED'
  | 'SECURITY_ALERT'
  | 'ENTERPRISE_HOLDING_REGISTERED'
  | 'ENTERPRISE_SUBSIDIARY_REGISTERED'
  | 'ENTERPRISE_EMPLOYEE_HIRED';

export interface PlatformEvent<T = any> {
  eventId: string;
  type: PlatformEventType;
  tenantId: string;
  timestamp: string;
  payload: T;
}

export type EventHandler<T = any> = (event: PlatformEvent<T>) => void | Promise<void>;

export class PlatformEventBus {
  private handlers: Map<PlatformEventType, EventHandler[]> = new Map();
  private eventHistory: PlatformEvent[] = [];

  public subscribe(type: PlatformEventType, handler: EventHandler): () => void {
    const existing = this.handlers.get(type) || [];
    this.handlers.set(type, [...existing, handler]);
    return () => {
      const current = this.handlers.get(type) || [];
      this.handlers.set(
        type,
        current.filter((h) => h !== handler)
      );
    };
  }

  public async publish<T = any>(
    type: PlatformEventType,
    tenantId: string,
    payload: T
  ): Promise<PlatformEvent<T>> {
    const event: PlatformEvent<T> = {
      eventId: `evt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      type,
      tenantId,
      timestamp: new Date().toISOString(),
      payload,
    };

    this.eventHistory.unshift(event);
    const subscribers = this.handlers.get(type) || [];
    for (const handler of subscribers) {
      try {
        await handler(event);
      } catch (err) {
        console.error(`Error in event handler for ${type}:`, err);
      }
    }
    return event;
  }

  public getHistory(tenantId?: string): PlatformEvent[] {
    if (!tenantId) return this.eventHistory;
    return this.eventHistory.filter((evt) => evt.tenantId === tenantId || evt.tenantId === 'tenant_owner_global');
  }
}

export const platformEventBus = new PlatformEventBus();
