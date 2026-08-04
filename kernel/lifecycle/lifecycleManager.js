export class LifecycleManager {
  constructor() {
    this.state = "RUNNING";
    this.uptime = Date.now();
  }

  getStatus() {
    return {
      state: this.state,
      uptimeSeconds: Math.floor((Date.now() - this.uptime) / 1000),
      memoryUsage: process.memoryUsage(),
      pid: process.pid
    };
  }

  restart() {
    this.state = "RESTARTING";
    setTimeout(() => { this.state = "RUNNING"; }, 500);
    return { status: "Restart initiated" };
  }
}
