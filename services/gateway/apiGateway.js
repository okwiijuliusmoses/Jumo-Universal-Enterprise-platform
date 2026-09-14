export class ApiGateway {
  constructor() {
    this.routes = [
      { path: "/api/runtime", method: "GET", status: "Active" },
      { path: "/api/auth/login", method: "POST", status: "Active" },
      { path: "/api/ai/query", method: "POST", status: "Active" },
      { path: "/api/kernel/status", method: "GET", status: "Active" }
    ];
  }
  listRoutes() { return this.routes; }
}
