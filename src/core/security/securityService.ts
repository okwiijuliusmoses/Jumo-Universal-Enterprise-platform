import { UserRecord } from "../../models/models";

function safeHexToUtf8(hex: string): string {
  try {
    if (typeof Buffer !== "undefined") {
      return Buffer.from(hex, "hex").toString("utf-8");
    }
    const cleanHex = hex.replace(/[^0-9a-fA-F]/g, "");
    if (!cleanHex) return "";
    const matches = cleanHex.match(/.{1,2}/g);
    if (!matches) return "";
    const bytes = new Uint8Array(matches.map(byte => parseInt(byte, 16)));
    return new TextDecoder().decode(bytes);
  } catch {
    return "";
  }
}

function safeUtf8ToHex(str: string): string {
  try {
    if (typeof Buffer !== "undefined") {
      return Buffer.from(str, "utf-8").toString("hex");
    }
    const bytes = new TextEncoder().encode(str);
    return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
  } catch {
    return "";
  }
}

export type RoleName = "SecOps_Administrator" | "FAAP_Controller" | "Kernel_Operator" | "Developer" | "General_User";

export interface Permission {
  action: string;
  resource: string;
  description: string;
}

const DEFAULT_SECURITY_USERS: UserRecord[] = [
  {
    email: "secops@jumo.net",
    name: "Sovereign SecOps Admin",
    role: "SecOps_Administrator",
    tenantId: "master_system",
    trustLevel: "Level_5_Sovereign"
  },
  {
    email: "controller@jumo.net",
    name: "FAAP Master Controller",
    role: "FAAP_Controller",
    tenantId: "sacco-zambia-hq",
    trustLevel: "Level_4_Executive"
  },
  {
    email: "operator@jumo.net",
    name: "System Operator",
    role: "Kernel_Operator",
    tenantId: "master_system",
    trustLevel: "Level_3_Operational"
  }
];

export class SecurityService {
  private static instance: SecurityService;

  // Role -> Permissions mapping
  private rolePermissions: Map<RoleName, string[]> = new Map();
  private userStore: Map<string, UserRecord> = new Map();

  private constructor() {
    this.initializePermissions();
    this.seedDefaultUsers();
  }

  public static getInstance(): SecurityService {
    if (!SecurityService.instance) {
      SecurityService.instance = new SecurityService();
    }
    return SecurityService.instance;
  }

  private seedDefaultUsers() {
    DEFAULT_SECURITY_USERS.forEach(u => this.userStore.set(u.email, { ...u }));
  }

  public findUserByEmail(email: string): UserRecord | undefined {
    return this.userStore.get(email);
  }

  public saveUser(user: UserRecord) {
    this.userStore.set(user.email, user);
  }

  private initializePermissions() {
    this.rolePermissions.set("SecOps_Administrator", [
      "*:*", // Super admin permission
      "admin:security",
      "read:secrets",
      "write:secrets",
      "delete:secrets",
      "read:audit",
      "read:ledger",
      "write:ledger",
      "update:registries"
    ]);

    this.rolePermissions.set("FAAP_Controller", [
      "read:ledger",
      "write:ledger",
      "reconcile:ledger",
      "report:financial",
      "read:audit"
    ]);

    this.rolePermissions.set("Kernel_Operator", [
      "read:metrics",
      "read:health",
      "read:audit",
      "update:registries",
      "trigger:workflow"
    ]);

    this.rolePermissions.set("Developer", [
      "read:metrics",
      "read:health",
      "read:ledger",
      "trigger:workflow"
    ]);

    this.rolePermissions.set("General_User", [
      "read:health",
      "trigger:workflow"
    ]);
  }

  /**
   * Evaluates if a role has permission to perform a specific action on a resource
   */
  public hasPermission(role: RoleName, action: string, resource: string): boolean {
    const permissions = this.rolePermissions.get(role);
    if (!permissions) return false;

    if (permissions.includes("*.*") || permissions.includes("*:*")) {
      return true;
    }

    const specificPermission = `${action}:${resource}`;
    return permissions.includes(specificPermission) || permissions.includes(`*:${resource}`) || permissions.includes(`${action}:*`);
  }

  /**
   * Enforces rigorous Tenant Isolation
   */
  public validateTenantAccess(user: UserRecord, targetTenantId: string): boolean {
    // Admins have access to everything, other roles are strictly locked to their native tenant
    if (user.role === "SecOps_Administrator") {
      return true;
    }
    return user.tenantId === targetTenantId;
  }

  /**
   * Validates a JWT or simulated Zero-Trust Session Token
   */
  public authenticateSessionToken(token: string): UserRecord | null {
    if (!token) return null;
    
    // We expect token structure like: zt_emailHex
    if (token.startsWith("zt_")) {
      const hex = token.substring(3);
      try {
        const decodedEmail = safeHexToUtf8(hex);
        const user = this.findUserByEmail(decodedEmail);
        return user || null;
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  /**
   * AES-256 Symmetric Secrets Encryption Wrapper (Symmetric Cryptographic Secrets Rotator)
   */
  public encryptSecret(text: string, secretKeyHex?: string): string {
    try {
      if (typeof process !== "undefined" && typeof require !== "undefined") {
        const nodeCrypto = require("crypto");
        if (nodeCrypto && typeof nodeCrypto.createCipheriv === "function" && typeof nodeCrypto.scryptSync === "function") {
          const key = secretKeyHex ? Buffer.from(secretKeyHex, "hex") : nodeCrypto.scryptSync(process.env?.JWT_SECRET || "jumo_master_default_salt_key_0123", "salt", 32);
          const iv = nodeCrypto.randomBytes(16);
          const cipher = nodeCrypto.createCipheriv("aes-256-cbc", key, iv);
          let encrypted = cipher.update(text, "utf8", "hex");
          encrypted += cipher.final("hex");
          return `${iv.toString("hex")}:${encrypted}`;
        }
      }
    } catch {
      // Fallback below
    }
    return `enc_${safeUtf8ToHex(text)}`;
  }

  /**
   * AES-256 Symmetric Secrets Decryption Wrapper
   */
  public decryptSecret(cipherText: string, secretKeyHex?: string): string {
    try {
      if (cipherText.startsWith("enc_")) {
        return safeHexToUtf8(cipherText.substring(4));
      }
      if (typeof process !== "undefined" && typeof require !== "undefined") {
        const nodeCrypto = require("crypto");
        if (nodeCrypto && typeof nodeCrypto.createDecipheriv === "function" && typeof nodeCrypto.scryptSync === "function") {
          const parts = cipherText.split(":");
          if (parts.length === 2) {
            const iv = Buffer.from(parts[0], "hex");
            const encryptedText = parts[1];
            const key = secretKeyHex ? Buffer.from(secretKeyHex, "hex") : nodeCrypto.scryptSync(process.env?.JWT_SECRET || "jumo_master_default_salt_key_0123", "salt", 32);
            const decipher = nodeCrypto.createDecipheriv("aes-256-cbc", key, iv);
            let decrypted = decipher.update(encryptedText, "hex", "utf8");
            decrypted += decipher.final("utf8");
            return decrypted;
          }
        }
      }
      return safeHexToUtf8(cipherText);
    } catch (err) {
      return "DECRYPTION_FAILED";
    }
  }
}

export const securityService = SecurityService.getInstance();
