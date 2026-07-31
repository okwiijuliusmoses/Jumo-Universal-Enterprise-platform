export class NotificationPlatform {
  constructor() {
    this.notifications = [
      { id: "notif-1", title: "AEGIS Security Audit Passed", type: "Security", timestamp: new Date().toISOString(), read: false },
      { id: "notif-2", title: "FAAP Treasury Settlement Completed", type: "Finance", timestamp: new Date().toISOString(), read: true }
    ];
  }
  listNotifications() { return this.notifications; }
  send(notification) {
    const item = { id: "notif-" + Date.now(), timestamp: new Date().toISOString(), read: false, ...notification };
    this.notifications.unshift(item);
    return item;
  }
}
