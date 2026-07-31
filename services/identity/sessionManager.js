export class SessionManager {
  constructor() {
    this.activeSessions = new Map();
  }

  createSession(userId, metadata = {}) {
    const sessionId = "sess_" + Math.random().toString(36).substring(2) + Date.now();
    const session = {
      sessionId,
      userId,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 8 * 3600 * 1000).toISOString(),
      ...metadata
    };
    this.activeSessions.set(sessionId, session);
    return session;
  }

  getSession(sessionId) {
    return this.activeSessions.get(sessionId) || null;
  }

  terminateSession(sessionId) {
    return this.activeSessions.delete(sessionId);
  }
}
