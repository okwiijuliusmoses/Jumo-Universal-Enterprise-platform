import { Buffer } from "buffer";
import crypto from "crypto";
import { UserRepository, AuditLogRepository } from "../../repositories/repositories";
import { UserRecord } from "../../models/models";

export type RoleName = "SecOps_Administrator" | "FAAP_Controller" | "Kernel_Operator" | "Developer" | "General_User";

export interface Permission {
  action: string;
  resource: string;
  description: string;
}

export class SecurityService {
  private static instance: SecurityService;

  // Role -> Permissions mapping
  private rolePermissions: Map<RoleName, string[]> = new Map();

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

  private seedDefaultUsers() {
    const defaultUsers: UserRecord[] = [
      {
        email: "okwiijuliusmoses@gmail.com",
        name: "Julius Moses Okwi",
        role: "SecOps_Administrator",
        tenantId: "sacco-zambia-hq",
        trustLevel: "Supreme Operator"
      },
      {
        email: "controller@jumo.net",
        name: "FAAP Head Controller",
        role: "FAAP_Controller",
        tenantId: "sacco-zambia-hq",
        trustLevel: "Sovereign Ledger Officer"
      },
      {
        email: "operator@jumo.net",
        name: "Kernel Node Operator",
        role: "Kernel_Operator",
        tenantId: "church-uganda-diocese",
        trustLevel: "Infrastructure Admin"
      }
    ];

    for (const u of defaultUsers) {
      UserRepository.save(u);
    }
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
        const decodedEmail = Buffer.from(hex, "hex").toString("utf-8");
        const user = UserRepository.findByEmail(decodedEmail);
        return user;
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
      if (crypto && typeof crypto.scryptSync === "function") {
        const key = secretKeyHex ? Buffer.from(secretKeyHex, "hex") : crypto.scryptSync(process.env.JWT_SECRET || "jumo_master_default_salt_key_0123", "salt", 32);
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
        let encrypted = cipher.update(text, "utf8", "hex");
        encrypted += cipher.final("hex");
        return `${iv.toString("hex")}:${encrypted}`;
      }
    } catch {
      // Browser fallback
    }
    return `b64:${Buffer.from(text).toString("base64")}`;
  }

  /**
   * AES-256 Symmetric Secrets Decryption Wrapper
   */
  public decryptSecret(cipherText: string, secretKeyHex?: string): string {
    try {
      if (cipherText.startsWith("b64:")) {
        return Buffer.from(cipherText.slice(4), "base64").toString("utf8");
      }
      if (crypto && typeof crypto.createDecipheriv === "function") {
        const parts = cipherText.split(":");
        const iv = Buffer.from(parts[0], "hex");
        const encryptedText = parts[1];
        const key = secretKeyHex ? Buffer.from(secretKeyHex, "hex") : crypto.scryptSync(process.env.JWT_SECRET || "jumo_master_default_salt_key_0123", "salt", 32);
        const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
        let decrypted = decipher.update(encryptedText, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
      }
    } catch (err) {
      return "DECRYPTION_FAILED";
    }
    return cipherText;
  }
}

export const securityService = SecurityService.getInstance();
