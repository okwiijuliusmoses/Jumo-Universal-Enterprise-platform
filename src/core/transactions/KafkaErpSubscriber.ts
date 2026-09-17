export interface PlatformLedgerEvent {
  eventId: string;
  tenantId: string;
  journalId: string;
  reference: string;
  amountMinor: number;
  currency: string;
  timestamp: string;
  partyRoutingCode: string;
}

export class KafkaErpSubscriber {
  private activeSubscribers: Map<string, (event: PlatformLedgerEvent) => Promise<void>> = new Map();
  private static processedKafkaEvents: Set<string> = new Set();

  constructor() {
    console.log("[KafkaEventSubscriber] Initializing Event Loop Listener...");
    this.registerDefaultTopics();
  }

  /**
   * Registers default internal topics for coordinating local state changes
   */
  private registerDefaultTopics() {
    this.subscribe("platform.ledger.posted", async (event) => {
      await this.coordinateDownstreamErpCache(event);
    });

    this.subscribe("platform.wallet.modified", async (event) => {
      await this.synchronizeStudentDigitalWalletCache(event);
    });
  }

  /**
   * Subscribes a callback to a specific transactional Kafka topic
   */
  public subscribe(topic: string, callback: (event: PlatformLedgerEvent) => Promise<void>): void {
    this.activeSubscribers.set(topic, callback);
    console.log(`[KafkaEventSubscriber] Succesfully subscribed callback to stream: [${topic}]`);
  }

  /**
   * Handles incoming event emissions from the Kafka cluster broker
   */
  public async handleInboundEvent(topic: string, rawPayload: string): Promise<void> {
    const callback = this.activeSubscribers.get(topic);
    if (!callback) {
      console.warn(`[KafkaEventSubscriber] Unmapped topic message received. Discarding: ${topic}`);
      return;
    }

    try {
      const event: PlatformLedgerEvent = JSON.parse(rawPayload);
      
      // Enforce strong idempotency boundary on Kafka consumer channel
      if (KafkaErpSubscriber.processedKafkaEvents.has(event.eventId)) {
        console.log(`[KafkaEventSubscriber] Idempotency hit: Event ID ${event.eventId} already processed in topic ${topic}. Bypassing.`);
        return;
      }
      KafkaErpSubscriber.processedKafkaEvents.add(event.eventId);

      console.log(`[KafkaEventSubscriber] Processing event stream [${topic}] ID: ${event.eventId}`);
      
      // Execute transaction coordination handler with robust retry strategy
      await this.executeWithRetry(async () => {
        await callback(event);
      }, 3);

    } catch (err) {
      console.error(`[KafkaEventSubscriber] Fatal exception in topic [${topic}] processing channel:`, err);
      // In production, route corrupted or failed events directly to Dead Letter Queue (DLQ)
      await this.routeToDeadLetterQueue(topic, rawPayload, String(err));
    }
  }

  /**
   * Coordinates local offline system buffers/caches on school ERP hardware devices
   */
  private async coordinateDownstreamErpCache(event: PlatformLedgerEvent): Promise<void> {
    console.log(`[ERP-Cache-Syncer] Starting state synchronization for school: Tenant [${event.tenantId}]`);
    
    // Simulate HTTPS sync payload assembly to on-premise hardware node
    const payload = {
      action: "MERGE_LEDGER_TRANSACTION",
      payload: {
        transactionId: event.journalId,
        ref: event.reference,
        valueMinor: event.amountMinor,
        currency: event.currency,
        routingCode: event.partyRoutingCode,
        synchronizedAt: new Date().toISOString()
      }
    };

    // Make authenticated secure on-premise webhook dispatch call (simulated)
    console.log(`[ERP-Cache-Syncer] Synchronization packet pushed successfully for Transaction: ${event.journalId}`);
  }

  /**
   * Coordinates S-Wallet digital pocket money caching to school kiosk devices
   */
  private async synchronizeStudentDigitalWalletCache(event: PlatformLedgerEvent): Promise<void> {
    console.log(`[S-Wallet-Syncer] Syncing digital wallet payload to campus cafeteria terminal caches...`);
    console.log(`[S-Wallet-Syncer] Updated offline credentials for Routing Code: ${event.partyRoutingCode}`);
  }

  /**
   * Exponential backoff handler protecting against downstream connection timeouts
   */
  private async executeWithRetry(action: () => Promise<void>, maxAttempts: number): Promise<void> {
    let attempts = 0;
    while (attempts < maxAttempts) {
      try {
        await action();
        return;
      } catch (err) {
        attempts++;
        if (attempts >= maxAttempts) throw err;
        const delay = Math.pow(2, attempts) * 100;
        await new Promise((res) => setTimeout(res, delay));
      }
    }
  }

  /**
   * Routes corrupted event payloads safely to Dead Letter Queues for forensic review
   */
  private async routeToDeadLetterQueue(topic: string, payload: string, errorMessage: string): Promise<void> {
    console.error(`[DLQ-Router] STAGING TRANSACTION TO DEAD-LETTER-QUEUE: Topic [${topic}]. Error: ${errorMessage}`);
  }
}
