export class EventBus {
  constructor() {
    this.events = {};
  }

  subscribe(event, handler) {
    this.events[event] ||= [];
    this.events[event].push(handler);
  }

  publish(event, payload) {
    (this.events[event] || []).forEach(handler => handler(payload));
  }
}
