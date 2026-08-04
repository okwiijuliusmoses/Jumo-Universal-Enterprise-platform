export class AuthorizationService {
  constructor() {
    this.roles = ["Enterprise Administrator", "Tenant Admin", "Finance Officer", "Auditor", "Developer"];
  }
  listRoles() { return this.roles; }
  checkAccess(role, permission) { return true; }
}
