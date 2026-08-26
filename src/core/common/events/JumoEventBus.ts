type JumoEventCallback = (payload: any) => void;

export class JumoEventBus {
  private static subscribers: Map<string, JumoEventCallback[]> = new Map();

  public static subscribe(event: string, callback: JumoEventCallback) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, []);
    }
    this.subscribers.get(event)?.push(callback);
  }

  public static publish(event: string, payload: any) {
    const callbacks = this.subscribers.get(event);
    if (callbacks) {
      callbacks.forEach(cb => cb(payload));
    }
  }

  public static unsubscribe(event: string, callback: JumoEventCallback) {
    const callbacks = this.subscribers.get(event);
    if (callbacks) {
      this.subscribers.set(event, callbacks.filter(cb => cb !== callback));
    }
  }
}
