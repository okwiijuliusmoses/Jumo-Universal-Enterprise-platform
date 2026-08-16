// JUMO UEOS — Studio Lifecycle Coordination Bus
// Authoritative event bus for bidirectional cross-studio lifecycle handoffs:
// Specification -> Architecture -> Factory -> Assurance -> Operations -> Governance & reverse feedback loops.

import { SovereignGovernanceRegistry } from "../../services/gov/SovereignGovernanceRegistry";
import { JDPM2608LineageEngine } from "../factory/lineage/JDPM2608LineageEngine";

export type StudioName =
  | 'specification'
  | 'architecture'
  | 'manufacturing'
  | 'engineering'
  | 'config'
  | 'verification'
  | 'certification'
  | 'deployment'
  | 'operations'
  | 'governance'
  | 'lifecycle'
  | 'overview'
  | 'control'
  | 'templates'
  | 'faap';

export type LifecycleEventType =
  | 'SPECIFICATION_SUBMITTED'
  | 'SPEC_CREATED'
  | 'SPEC_APPROVED'
  | 'ARCHITECTURE_CONTRACT_GENERATED'
  | 'ARCHITECTURE_EXPANSION_REQUESTED'
  | 'ARCH_CREATED'
  | 'ARCH_APPROVED'
  | 'BLUEPRINT_COMPILED'
  | 'BLUE_CREATED'
  | 'BLUE_APPROVED'
  | 'MANUFACTURING_RUN_STARTED'
  | 'MFG_STARTED'
  | 'APPLICATION_MANUFACTURED'
  | 'MODULE_MANUFACTURED'
  | 'PORTAL_MANUFACTURED'
  | 'AI_AGENT_MANUFACTURED'
  | 'TASK_CREATED'
  | 'TASK_ASSIGNED'
  | 'COMPONENT_CREATED'
  | 'SERVICE_CREATED'
  | 'WORKFLOW_CREATED'
  | 'DATA_CREATED'
  | 'INTEGRATION_CREATED'
  | 'CONFIG_CREATED'
  | 'TEST_STARTED'
  | 'TEST_COMPLETED'
  | 'MANUFACTURING_RUN_COMPLETED'
  | 'MFG_COMPLETED'
  | 'VER_STARTED'
  | 'VERIFICATION_GATE_PASSED'
  | 'VER_COMPLETED'
  | 'CERTIFICATE_ISSUED'
  | 'CERT_ISSUED'
  | 'PROVISION_STARTED'
  | 'HOT_DEPLOYMENT_TRIGGERED'
  | 'DEPLOYMENT_COMPLETED'
  | 'INSTALLATION_PLAN_CREATED'
  | 'INSTITUTION_GO_LIVE'
  | 'RUNTIME_STARTED'
  | 'RUNTIME_TELEMETRY_ALERT'
  | 'UPGRADE_STARTED'
  | 'UPGRADE_COMPLETED'
  | 'INSTITUTIONAL_INSTALLATION_COMMISSIONED'
  | 'INSTITUTION_GO_LIVE_COMPLETED'
  | 'INSTITUTIONAL_INCIDENT_RAISED'
  | 'INSTITUTIONAL_UPGRADE_COMPLETED'
  | 'GOVERNANCE_LEDGER_RECORDED'
  | 'OPERATIONAL_FEEDBACK_LOOP';

export interface StudioLifecycleEvent {
  eventId: string;
  sourceStudio: StudioName;
  targetStudios: StudioName[];
  eventType: LifecycleEventType;
  productName: string;
  domain: string;
  artifactJdpmId?: string;
  payload: Record<string, any>;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'EMITTED' | 'ACKNOWLEDGED' | 'PROCESSED' | 'FAILED';
  emittedByAgent: string;
  timestamp: string;
}

export type LifecycleEventListener = (event: StudioLifecycleEvent) => void;

export class StudioLifecycleCoordinationBus {
  private static instance: StudioLifecycleCoordinationBus;
  private events: StudioLifecycleEvent[] = [];
  private listeners: Map<string, LifecycleEventListener[]> = new Map();

  private constructor() {
    this.seedInitialEvents();
  }

  public static getInstance(): StudioLifecycleCoordinationBus {
    if (!StudioLifecycleCoordinationBus.instance) {
      StudioLifecycleCoordinationBus.instance = new StudioLifecycleCoordinationBus();
    }
    return StudioLifecycleCoordinationBus.instance;
  }

  public subscribe(eventType: string, listener: LifecycleEventListener): () => void {
    const list = this.listeners.get(eventType) || [];
    list.push(listener);
    this.listeners.set(eventType, list);
    return () => {
      const updated = (this.listeners.get(eventType) || []).filter(l => l !== listener);
      this.listeners.set(eventType, updated);
    };
  }

  public emit(
    sourceStudio: StudioName,
    targetStudios: StudioName[],
    eventType: LifecycleEventType,
    productName: string,
    domain: string,
    payload: Record<string, any>,
    artifactJdpmId?: string,
    emittedByAgent = 'AGENT-001',
    priority: StudioLifecycleEvent['priority'] = 'MEDIUM'
  ): StudioLifecycleEvent {
    const eventId = `EVT-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const event: StudioLifecycleEvent = {
      eventId,
      sourceStudio,
      targetStudios,
      eventType,
      productName,
      domain,
      artifactJdpmId,
      payload,
      priority,
      status: 'EMITTED',
      emittedByAgent,
      timestamp: new Date().toISOString()
    };

    this.events.unshift(event);
    if (this.events.length > 500) {
      this.events = this.events.slice(0, 500);
    }

    // Trigger listeners
    const specificListeners = this.listeners.get(eventType) || [];
    const globalListeners = this.listeners.get('*') || [];
    [...specificListeners, ...globalListeners].forEach(fn => {
      try {
        fn(event);
      } catch (err) {
        console.error(`[COORDINATION BUS] Listener error:`, err);
      }
    });

    const gov = SovereignGovernanceRegistry.getInstance();
    gov.addLedgerEntry(
      `LIFECYCLE_EVENT_${eventType}`,
      sourceStudio,
      `Event ${eventId} emitted by ${sourceStudio} targeting [${targetStudios.join(', ')}]. Product: ${productName}`
    );

    return event;
  }

  public getRecentEvents(limit = 50): StudioLifecycleEvent[] {
    return this.events.slice(0, limit);
  }

  public getEventsForStudio(studio: StudioName): StudioLifecycleEvent[] {
    return this.events.filter(e => e.sourceStudio === studio || e.targetStudios.includes(studio));
  }

  private seedInitialEvents() {
    this.events.push({
      eventId: 'EVT-INIT-001',
      sourceStudio: 'specification',
      targetStudios: ['architecture', 'manufacturing'],
      eventType: 'SPECIFICATION_SUBMITTED',
      productName: 'Universal Enterprise Operating System',
      domain: 'National Government & Sovereign Enterprise',
      artifactJdpmId: 'JDPM/SPEC2608/0001',
      payload: { specTitle: 'JUMO UEOS Core', tier: 'LEVEL-10' },
      priority: 'HIGH',
      status: 'PROCESSED',
      emittedByAgent: 'AGENT-001',
      timestamp: new Date(Date.now() - 7200000).toISOString()
    });

    this.events.push({
      eventId: 'EVT-INIT-002',
      sourceStudio: 'architecture',
      targetStudios: ['manufacturing', 'verification'],
      eventType: 'ARCHITECTURE_CONTRACT_GENERATED',
      productName: 'Universal Enterprise Operating System',
      domain: 'National Government & Sovereign Enterprise',
      artifactJdpmId: 'JDPM/ARCH2608/0001',
      payload: { layersCount: 125, contractId: 'CTR-001' },
      priority: 'HIGH',
      status: 'PROCESSED',
      emittedByAgent: 'AGENT-003',
      timestamp: new Date(Date.now() - 6400000).toISOString()
    });
  }
}
