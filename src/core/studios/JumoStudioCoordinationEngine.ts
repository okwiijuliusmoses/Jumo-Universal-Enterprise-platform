/**
 * JUMO UEOS — Unified Studio Coordination Engine
 *
 * Shared coordination boundary for:
 * Specification
 * Architecture
 * Engineering
 * Build
 * Manufacturing
 * Verification
 * Deployment
 * Registry
 *
 * Studios are control surfaces over one lifecycle,
 * not independent applications.
 */

export type JumoStudioId =
  | "SPECIFICATION"
  | "ARCHITECTURE"
  | "ENGINEERING"
  | "BUILD"
  | "MANUFACTURING"
  | "VERIFICATION"
  | "DEPLOYMENT"
  | "REGISTRY";

export type JumoStudioEventType =
  | "SPECIFICATION_CREATED"
  | "SPECIFICATION_UPDATED"
  | "SPECIFICATION_APPROVED"
  | "ARCHITECTURE_REQUESTED"
  | "ARCHITECTURE_APPROVED"
  | "ARCHITECTURE_CHANGED"
  | "ENGINEERING_TASK_CREATED"
  | "ENGINEER_ASSIGNED"
  | "ENGINEERING_COMPLETED"
  | "BUILD_REQUESTED"
  | "BUILD_COMPLETED"
  | "BUILD_FAILED"
  | "MANUFACTURING_STARTED"
  | "MANUFACTURING_COMPLETED"
  | "VERIFICATION_STARTED"
  | "VERIFICATION_FAILED"
  | "VERIFICATION_PASSED"
  | "REMEDIATION_REQUIRED"
  | "REGRESSION_REQUIRED"
  | "ACCEPTANCE_REQUESTED"
  | "ACCEPTANCE_PASSED"
  | "ACCEPTANCE_FAILED"
  | "DEPLOYMENT_REQUESTED"
  | "DEPLOYMENT_COMPLETED"
  | "REGISTRY_ACTIVATION_REQUESTED"
  | "REGISTRY_ACTIVATED";

export interface JumoStudioEvent<T = unknown> {
  id: string;
  type: JumoStudioEventType;
  source: JumoStudioId;
  target?: JumoStudioId;
  timestamp: string;
  correlationId: string;
  causationId?: string;
  payload: T;
}

export interface JumoStudioWorkItem {
  id: string;
  title: string;
  source: JumoStudioId;
  target: JumoStudioId;
  status: "PENDING" | "RUNNING" | "BLOCKED" | "COMPLETED" | "FAILED";
  priority: "LOW" | "NORMAL" | "HIGH" | "CRITICAL";
  correlationId: string;
  createdAt: string;
  updatedAt: string;
  payload?: unknown;
}

export interface JumoStudioState {
  activeStudio?: JumoStudioId;
  lifecycleStage:
    | "SPECIFICATION"
    | "ARCHITECTURE"
    | "ENGINEERING"
    | "BUILD"
    | "MANUFACTURING"
    | "VERIFICATION"
    | "ACCEPTANCE"
    | "DEPLOYMENT"
    | "REGISTRY";
  events: JumoStudioEvent[];
  workItems: JumoStudioWorkItem[];
  blockers: string[];
  lastUpdated: string;
}

type EventHandler = (event: JumoStudioEvent) => void | Promise<void>;

export class JumoStudioCoordinationEngine {
  private static instance: JumoStudioCoordinationEngine;

  private readonly events: JumoStudioEvent[] = [];
  private readonly workItems: JumoStudioWorkItem[] = [];
  private readonly handlers = new Map<JumoStudioEventType, Set<EventHandler>>();

  private constructor() {}

  public static getInstance(): JumoStudioCoordinationEngine {
    if (!JumoStudioCoordinationEngine.instance) {
      JumoStudioCoordinationEngine.instance =
        new JumoStudioCoordinationEngine();
    }

    return JumoStudioCoordinationEngine.instance;
  }

  public subscribe(
    type: JumoStudioEventType,
    handler: EventHandler,
  ): () => void {
    let handlers = this.handlers.get(type);

    if (!handlers) {
      handlers = new Set<EventHandler>();
      this.handlers.set(type, handlers);
    }

    handlers.add(handler);

    return () => handlers?.delete(handler);
  }

  public async publish<T>(
    type: JumoStudioEventType,
    source: JumoStudioId,
    payload: T,
    options?: {
      target?: JumoStudioId;
      correlationId?: string;
      causationId?: string;
    },
  ): Promise<JumoStudioEvent<T>> {
    const event: JumoStudioEvent<T> = {
      id: crypto.randomUUID(),
      type,
      source,
      target: options?.target,
      timestamp: new Date().toISOString(),
      correlationId:
        options?.correlationId ?? crypto.randomUUID(),
      causationId: options?.causationId,
      payload,
    };

    this.events.push(event);

    const handlers = this.handlers.get(type);

    if (handlers) {
      await Promise.all(
        [...handlers].map((handler) =>
          Promise.resolve(handler(event)),
        ),
      );
    }

    return event;
  }

  public createWorkItem(
    title: string,
    source: JumoStudioId,
    target: JumoStudioId,
    payload?: unknown,
    priority: JumoStudioWorkItem["priority"] = "NORMAL",
    correlationId = crypto.randomUUID(),
  ): JumoStudioWorkItem {
    const now = new Date().toISOString();

    const item: JumoStudioWorkItem = {
      id: crypto.randomUUID(),
      title,
      source,
      target,
      status: "PENDING",
      priority,
      correlationId,
      createdAt: now,
      updatedAt: now,
      payload,
    };

    this.workItems.push(item);

    return item;
  }

  public updateWorkItem(
    id: string,
    status: JumoStudioWorkItem["status"],
  ): JumoStudioWorkItem | undefined {
    const item = this.workItems.find((entry) => entry.id === id);

    if (!item) {
      return undefined;
    }

    item.status = status;
    item.updatedAt = new Date().toISOString();

    return item;
  }

  public getState(activeStudio?: JumoStudioId): JumoStudioState {
    return {
      activeStudio,
      lifecycleStage: this.resolveLifecycleStage(),
      events: [...this.events],
      workItems: [...this.workItems],
      blockers: this.workItems
        .filter((item) => item.status === "BLOCKED")
        .map((item) => item.title),
      lastUpdated: new Date().toISOString(),
    };
  }

  public clearRuntimeState(): void {
    this.events.length = 0;
    this.workItems.length = 0;
  }

  private resolveLifecycleStage(): JumoStudioState["lifecycleStage"] {
    const latest = this.events[this.events.length - 1];

    if (!latest) {
      return "SPECIFICATION";
    }

    const stageMap: Partial<
      Record<JumoStudioEventType, JumoStudioState["lifecycleStage"]>
    > = {
      SPECIFICATION_CREATED: "SPECIFICATION",
      SPECIFICATION_UPDATED: "SPECIFICATION",
      SPECIFICATION_APPROVED: "ARCHITECTURE",
      ARCHITECTURE_REQUESTED: "ARCHITECTURE",
      ARCHITECTURE_APPROVED: "ENGINEERING",
      ARCHITECTURE_CHANGED: "ARCHITECTURE",
      ENGINEERING_TASK_CREATED: "ENGINEERING",
      ENGINEER_ASSIGNED: "ENGINEERING",
      ENGINEERING_COMPLETED: "BUILD",
      BUILD_REQUESTED: "BUILD",
      BUILD_COMPLETED: "MANUFACTURING",
      BUILD_FAILED: "BUILD",
      MANUFACTURING_STARTED: "MANUFACTURING",
      MANUFACTURING_COMPLETED: "VERIFICATION",
      VERIFICATION_STARTED: "VERIFICATION",
      VERIFICATION_FAILED: "ENGINEERING",
      VERIFICATION_PASSED: "ACCEPTANCE",
      REMEDIATION_REQUIRED: "ENGINEERING",
      REGRESSION_REQUIRED: "VERIFICATION",
      ACCEPTANCE_REQUESTED: "ACCEPTANCE",
      ACCEPTANCE_PASSED: "DEPLOYMENT",
      ACCEPTANCE_FAILED: "ENGINEERING",
      DEPLOYMENT_REQUESTED: "DEPLOYMENT",
      DEPLOYMENT_COMPLETED: "REGISTRY",
      REGISTRY_ACTIVATION_REQUESTED: "REGISTRY",
      REGISTRY_ACTIVATED: "REGISTRY",
    };

    return stageMap[latest.type] ?? "SPECIFICATION";
  }
}

export const jumoStudioCoordination =
  JumoStudioCoordinationEngine.getInstance();

export default JumoStudioCoordinationEngine;
