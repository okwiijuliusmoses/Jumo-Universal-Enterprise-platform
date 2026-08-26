import { 
  SovereignState, 
  ApplicationBranding, 
  InstallationConfig,
  DatabaseVolume,
  LifecycleAsset,
  SchemaMigration
} from "./sovereignState.types";
export * from './sovereignState.types';

export class SovereignOperatingStateService {
  private static currentState: SovereignState = {
    branding: {
      name: "JUMO UEOS",
      productIdentity: "Jumo Sovereign Identity",
      institutionIdentity: "JUMO National Enterprise",
      logo: "/jumo-logo.svg",
      favicon: "/favicon.ico",
      colors: {
        primary: "#1A365D",
        secondary: "#2B6CB0",
        accent: "#ED8936",
        background: "#F7FAFC",
        surface: "#FFFFFF",
        text: "#1A202C"
      },
      typography: {
        fontFamily: "Inter, sans-serif",
        baseSize: "16px"
      },
      theme: "light",
      density: "comfortable",
      publicLoginEnabled: true,
      publicLandingEnabled: true,
      portalAppearance: "default",
      navigationAppearance: "sidebar",
      footerLegalIdentity: "JUMO Operating System",
      emailBranding: "standard"
    },
    installation: {
      institution: {
        name: "Sovereign Authority",
        legalName: "Sovereign Authority of JUMO",
        acronym: "SAJ",
        country: "Jumo",
        region: "Global",
        administrativeHierarchy: "National",
        type: "Enterprise",
        ownership: "Private",
        operatingModel: "Distributed"
      },
      application: {
        product: "JUMO UEOS",
        ecosystem: "Sovereign",
        edition: "Enterprise",
        grade: "Production",
        capacity: "Unlimited",
        deploymentProfile: "Cloud",
        tenant: "Primary",
        environment: "Production"
      },
      enabledModules: ["Identity", "Core Architecture", "FAAP"],
      enabledPortals: ["Sovereign Control", "Registry Fabric"],
      enabledServices: ["JUMO GPT", "Audit System"],
      navigation: {
        hierarchy: [],
        roleBasedAccess: {
          "SUPREME_OPERATOR": ["*"],
          "AUDITOR": ["Audit", "Sovereign Control"],
          "ENGINEER": ["Registry Fabric"]
        },
        featureFlags: {
          "ZERO_TRUST": true
        }
      },
      systemDefaults: {
        workflow: "AUTHORITATIVE_APPROVAL",
        security: "ZERO_TRUST_ENFORCED",
        notifications: "REAL_TIME_ONLY",
        dataPolicy: "STRICT_SOVEREIGNTY",
        localization: "en-US"
      }
    },
    blueprints: [],
    incidents: [],
    cloudSlots: [],
    auditEvents: [],
    verificationGates: [],
    databaseVolumes: [],
    migrations: [],
    assets: [],
    counters: {
      audit: 0,
      event: 0
    },
    cryptographicKeys: {
      primaryKey: "dev-key-1",
      backupKey: "dev-key-2",
      algorithm: "AES-256-GCM",
      lastRotation: new Date().toISOString()
    },
    emergencyMode: false
  };

  public static saveState() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem("jumo_sovereign_state", JSON.stringify(this.currentState));
      } catch (e) {
        console.error("Failed to save Sovereign State", e);
      }
    }
  }

  public static getState(): SovereignState {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem("jumo_sovereign_state");
        if (stored) {
          const parsed = JSON.parse(stored);
          this.currentState = { ...this.currentState, ...parsed };
        }
      } catch (e) {
        console.error("Failed to load Sovereign State", e);
      }
    }
    return this.currentState;
  }

  public static updateBranding(branding: Partial<ApplicationBranding>, actor: string) {
    this.currentState.branding = { ...this.currentState.branding, ...branding };
    this.logAudit(actor, "UPDATE_BRANDING", "Updated application branding");
    this.saveState();
  }

  public static updateInstallation(config: Partial<InstallationConfig>, actor: string) {
    this.currentState.installation = { ...this.currentState.installation, ...config };
    this.logAudit(actor, "UPDATE_INSTALLATION", "Updated installation configuration");
    this.saveState();
  }

  public static logAudit(actor: string, operation: string, details: string) {
    const event = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      actor,
      operation,
      details,
      timestamp: new Date().toISOString()
    };
    this.currentState.auditEvents.push(event);
    this.currentState.counters.audit++;
    this.saveState();
  }

  public static scaleCloudSlot(slotId: string, cpu: number, memory: number, actor: string) {
    const slot = this.currentState.cloudSlots.find(s => s.id === slotId);
    if (slot) {
      slot.cpu = cpu;
      slot.memory = memory;
      this.logAudit(actor, "SCALE_CLOUD_SLOT", `Scaled slot ${slotId} to CPU:${cpu} MEM:${memory}`);
      this.saveState();
    }
  }

  public static toggleCloudSlotPower(slotId: string, actor: string) {
    const slot = this.currentState.cloudSlots.find(s => s.id === slotId);
    if (slot) {
      slot.health = slot.health === 'OFFLINE' ? 'HEALTHY' : 'OFFLINE';
      this.logAudit(actor, "TOGGLE_CLOUD_SLOT", `Toggled slot ${slotId} to ${slot.health}`);
      this.saveState();
    }
  }

  public static provisionDatabaseVolume(vol: Omit<DatabaseVolume, 'status'>, actor: string) {
    this.currentState.databaseVolumes.push({ ...vol, status: 'HEALTHY' });
    this.logAudit(actor, "PROVISION_DB", `Provisioned database volume ${vol.name}`);
    this.saveState();
  }

  public static executeMigration(migId: string, actor: string, logCallback: (log: string) => void) {
    const migration = this.currentState.migrations.find(m => m.id === migId);
    if (migration) {
      migration.status = 'COMPLETED';
      migration.progress = 100;
      logCallback(`Migration ${migId} executed successfully.`);
      this.logAudit(actor, "EXECUTE_MIGRATION", `Executed migration ${migId}`);
      this.saveState();
    }
  }

  public static registerLifecycleAsset(asset: Omit<LifecycleAsset, 'status' | 'step'>, actor: string) {
    this.currentState.assets.push({ ...asset, status: 'ACTIVE', step: 'REGISTERED' });
    this.logAudit(actor, "REGISTER_ASSET", `Registered lifecycle asset ${asset.name}`);
    this.saveState();
  }

  public static transitionLifecycleAsset(index: number, actor: string) {
    if (this.currentState.assets[index]) {
      this.currentState.assets[index].step = 'TRANSITIONED';
      this.logAudit(actor, "TRANSITION_ASSET", `Transitioned lifecycle asset at index ${index}`);
      this.saveState();
    }
  }

  public static archiveLifecycleAsset(index: number, actor: string) {
    if (this.currentState.assets[index]) {
      this.currentState.assets[index].status = 'ARCHIVED';
      this.logAudit(actor, "ARCHIVE_ASSET", `Archived lifecycle asset at index ${index}`);
      this.saveState();
    }
  }

  public static rotateKeys(actor: string) {
    this.currentState.cryptographicKeys.lastRotation = new Date().toISOString();
    this.logAudit(actor, "ROTATE_KEYS", "Rotated cryptographic keys");
    this.saveState();
  }

  public static toggleEmergencyMode(actor: string) {
    this.currentState.emergencyMode = !this.currentState.emergencyMode;
    this.logAudit(actor, "TOGGLE_EMERGENCY_MODE", `Emergency mode set to ${this.currentState.emergencyMode}`);
    this.saveState();
  }

  public static logAgentWork(log: any, actor: string) {
    this.logAudit(actor, "LOG_AGENT_WORK", "Agent work logged");
  }

  public static proposeArchitectureExpansion(trace: any, actor: string) {
    this.logAudit(actor, "PROPOSE_ARCH_EXPANSION", "Architecture expansion proposed");
  }

  public static recordBuildArtifact(jobId: string, hash: string, size: number, actor: string) {
    this.logAudit(actor, "RECORD_BUILD_ARTIFACT", "Build artifact recorded");
  }
}
