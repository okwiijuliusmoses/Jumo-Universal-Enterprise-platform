export class StartupDiagnostics {
  constructor() {
    this.logs = [];
    this.consoleActive = true;
  }

  log(stage, details = "") {
    const timestamp = new Date().toISOString();
    const message = `[UEOS STARTUP] ${stage} ${details}`;
    this.logs.push({ timestamp, stage, details });
    if (this.consoleActive) {
      console.log(`%c${message}`, "color: #10b981; font-weight: bold;");
    }
  }

  getLogs() {
    return this.logs;
  }
}

export const startupDiagnostics = new StartupDiagnostics();
