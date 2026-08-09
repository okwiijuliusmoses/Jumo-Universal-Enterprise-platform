/**
 * JUMO UEOS
 * Digital Hybrid Architecture Layer Registry
 *
 * This registry defines the authoritative architectural capabilities
 * exposed to the JUMO Engineering / Manufacturing Hub.
 *
 * These are architectural responsibilities, NOT simulated features.
 */

export type JumoLayerStatus =
  | 'FOUNDATION'
  | 'ACTIVE'
  | 'PLANNED'
  | 'INTEGRATION'
  | 'GOVERNED';

export interface JumoArchitectureLayer {
  id: string;
  family: string;
  name: string;
  responsibility: string;
  studio: string;
  status: JumoLayerStatus;
  dependencies: string[];
  humanFacing: boolean;
  executable: boolean;
}

const L = (
  id: string,
  family: string,
  name: string,
  responsibility: string,
  studio: string,
  dependencies: string[] = [],
  status: JumoLayerStatus = 'PLANNED',
  humanFacing = false,
  executable = false
): JumoArchitectureLayer => ({
  id,
  family,
  name,
  responsibility,
  studio,
  status,
  dependencies,
  humanFacing,
  executable,
});

const INITIAL_JUMO_HYBRID_ARCHITECTURE_LAYERS: JumoArchitectureLayer[] = [

/* ============================================================
 * 001–010 — HUMAN / REASONING FOUNDATION
 * ============================================================ */
L('L001','REASONING','Conversational Reasoning','Human-facing general-purpose conversation and broad reasoning.','JUMO Conversational Reasoning Studio',[], 'FOUNDATION',true),
L('L002','REASONING','Instruction Interpretation','Convert natural-language instructions into structured intent.','JUMO Conversational Reasoning Studio',['L001'],'FOUNDATION',true),
L('L003','REASONING','Architecture Planning','Plan systems, platforms, products and architectural changes.','JUMO Conversational Reasoning Studio',['L001','L002'],'ACTIVE',true),
L('L004','REASONING','Requirement Extraction','Extract explicit and implicit requirements.','JUMO Conversational Reasoning Studio',['L002']),
L('L005','REASONING','Constraint Analysis','Identify technical, governance and business constraints.','JUMO Conversational Reasoning Studio',['L002']),
L('L006','REASONING','Dependency Reasoning','Determine architectural dependencies.','JUMO Conversational Reasoning Studio',['L003']),
L('L007','REASONING','Risk Reasoning','Identify implementation and operational risks.','JUMO Conversational Reasoning Studio',['L003']),
L('L008','REASONING','Decision Support','Compare alternatives and recommend decisions.','JUMO Conversational Reasoning Studio',['L003']),
L('L009','REASONING','Architecture Memory','Maintain approved architectural decisions and context.','JUMO Conversational Reasoning Studio',['L001']),
L('L010','REASONING','Human Approval Boundary','Identify decisions requiring human authority.','JUMO Conversational Reasoning Studio',['L008']),

/* ============================================================
 * 011–020 — AI GATEWAY / MODEL ORCHESTRATION
 * ============================================================ */
L('L011','AI','JUMO AI Gateway','Authoritative gateway between UEOS and AI providers.','JUMO Intelligence Studio',['L001'],'FOUNDATION'),
L('L012','AI','Model Registry','Register approved AI models and capabilities.','JUMO Intelligence Studio',['L011']),
L('L013','AI','Provider Registry','Register external and sovereign providers.','JUMO Intelligence Studio',['L011']),
L('L014','AI','Model Routing','Select models according to task requirements.','JUMO Intelligence Studio',['L012','L013']),
L('L015','AI','Reasoning Routing','Route broad reasoning to the approved reasoning model.','JUMO Intelligence Studio',['L014']),
L('L016','AI','Agent Routing','Route specialized work to appropriate agents.','JUMO Intelligence Studio',['L014']),
L('L017','AI','Context Injection','Supply authorized UEOS context to AI.','JUMO Intelligence Studio',['L009','L011']),
L('L018','AI','Prompt Policy','Govern system instructions and model contracts.','JUMO Intelligence Studio',['L011']),
L('L019','AI','AI Safety Boundary','Prevent unauthorized AI execution.','JUMO Intelligence Studio',['L018']),
L('L020','AI','AI Evaluation','Measure quality, reliability and policy compliance.','JUMO Intelligence Studio',['L012']),

/* ============================================================
 * 021–030 — AGENT WORKFORCE
 * ============================================================ */
L('L021','AGENTS','Agent Registry','Authoritative registry of JUMO specialized agents.','JUMO Agent Workforce Studio',['L016']),
L('L022','AGENTS','Agent Identity','Identity and credentials for agents.','JUMO Agent Workforce Studio',['L021']),
L('L023','AGENTS','Agent Skills','Declare agent capabilities.','JUMO Agent Workforce Studio',['L021']),
L('L024','AGENTS','Agent Delegation','Delegate tasks from reasoning to agents.','JUMO Agent Workforce Studio',['L016','L021']),
L('L025','AGENTS','Agent Supervision','Monitor delegated agent work.','JUMO Agent Workforce Studio',['L024']),
L('L026','AGENTS','Agent Scheduling','Schedule agent workloads.','JUMO Agent Workforce Studio',['L024']),
L('L027','AGENTS','Agent Collaboration','Coordinate multiple agents.','JUMO Agent Workforce Studio',['L025']),
L('L028','AGENTS','Agent Evidence','Capture evidence produced by agents.','JUMO Agent Workforce Studio',['L025']),
L('L029','AGENTS','Agent Failure Recovery','Recover failed agent tasks.','JUMO Agent Workforce Studio',['L025']),
L('L030','AGENTS','Agent Retirement','Deactivate and retire obsolete agents.','JUMO Agent Workforce Studio',['L021']),

/* ============================================================
 * 031–040 — ARCHITECTURE
 * ============================================================ */
L('L031','ARCHITECTURE','Architecture Registry','Authoritative architecture repository.','JUMO Architecture & Systems Studio',['L003']),
L('L032','ARCHITECTURE','System Model','Model complete JUMO systems.','JUMO Architecture & Systems Studio',['L031']),
L('L033','ARCHITECTURE','Component Model','Model reusable components.','JUMO Architecture & Systems Studio',['L032']),
L('L034','ARCHITECTURE','Service Model','Model services and APIs.','JUMO Architecture & Systems Studio',['L032']),
L('L035','ARCHITECTURE','Domain Model','Model bounded enterprise domains.','JUMO Architecture & Systems Studio',['L032']),
L('L036','ARCHITECTURE','Dependency Graph','Visualize system dependencies.','JUMO Architecture & Systems Studio',['L033','L034']),
L('L037','ARCHITECTURE','Boundary Enforcement','Prevent domain and runtime boundary violations.','JUMO Architecture & Systems Studio',['L035']),
L('L038','ARCHITECTURE','Architecture Contracts','Create enforceable architecture contracts.','JUMO Architecture & Systems Studio',['L031']),
L('L039','ARCHITECTURE','Architecture Validation','Validate designs before implementation.','JUMO Architecture & Systems Studio',['L038']),
L('L040','ARCHITECTURE','Architecture Diff','Compare architecture versions.','JUMO Architecture & Systems Studio',['L031']),

/* ============================================================
 * 041–050 — PRODUCT / ECOSYSTEM FACTORY
 * ============================================================ */
L('L041','PRODUCT','Product Registry','Register JUMO products.','JUMO Product & Ecosystem Studio',['L031']),
L('L042','PRODUCT','Ecosystem Registry','Register enterprise ecosystems.','JUMO Product & Ecosystem Studio',['L041']),
L('L043','PRODUCT','Application Factory','Create application definitions.','JUMO Product & Ecosystem Studio',['L041']),
L('L044','PRODUCT','ERP Factory','Create governed ERP products.','JUMO Product & Ecosystem Studio',['L042']),
L('L045','PRODUCT','Module Factory','Create reusable modules.','JUMO Product & Ecosystem Studio',['L043']),
L('L046','PRODUCT','Workflow Factory','Create business workflows.','JUMO Product & Ecosystem Studio',['L045']),
L('L047','PRODUCT','Form Factory','Create executable forms.','JUMO Product & Ecosystem Studio',['L045']),
L('L048','PRODUCT','Report Factory','Create reports and analytical views.','JUMO Product & Ecosystem Studio',['L045']),
L('L049','PRODUCT','Integration Factory','Create governed integrations.','JUMO Product & Ecosystem Studio',['L043']),
L('L050','PRODUCT','Product Packaging','Package complete products for deployment.','JUMO Product & Ecosystem Studio',['L041','L049']),

/* ============================================================
 * 051–060 — DATA / KNOWLEDGE
 * ============================================================ */
L('L051','DATA','Data Registry','Register authoritative data resources.','JUMO Data & Knowledge Studio',['L031']),
L('L052','DATA','Schema Registry','Register schemas.','JUMO Data & Knowledge Studio',['L051']),
L('L053','DATA','Data Mesh','Coordinate distributed enterprise data.','JUMO Data & Knowledge Studio',['L051','L052']),
L('L054','DATA','Ontology Registry','Define enterprise concepts.','JUMO Data & Knowledge Studio',['L051']),
L('L055','DATA','Knowledge Graph','Connect enterprise knowledge.','JUMO Data & Knowledge Studio',['L054']),
L('L056','DATA','Knowledge Retrieval','Retrieve authorized knowledge for AI.','JUMO Data & Knowledge Studio',['L055','L017']),
L('L057','DATA','Data Lineage','Track data origin and transformation.','JUMO Data & Knowledge Studio',['L053']),
L('L058','DATA','Data Quality','Validate data quality.','JUMO Data & Knowledge Studio',['L053']),
L('L059','DATA','Data Governance','Control data access and ownership.','JUMO Data & Knowledge Studio',['L053']),
L('L060','DATA','Data Lifecycle','Archive and retire data safely.','JUMO Data & Knowledge Studio',['L059']),

/* ============================================================
 * 061–070 — SOFTWARE ENGINEERING
 * ============================================================ */
L('L061','ENGINEERING','Source Registry','Authoritative source-code registry.','JUMO Software Engineering Studio',['L041']),
L('L062','ENGINEERING','Component Engineering','Build reusable software components.','JUMO Software Engineering Studio',['L033','L061']),
L('L063','ENGINEERING','API Engineering','Build and validate APIs.','JUMO Software Engineering Studio',['L034','L061']),
L('L064','ENGINEERING','Test Engineering','Create automated tests.','JUMO Software Engineering Studio',['L061']),
L('L065','ENGINEERING','Static Analysis','Analyse source and architecture.','JUMO Software Engineering Studio',['L061']),
L('L066','ENGINEERING','Build Pipeline','Compile software artifacts.','JUMO Software Engineering Studio',['L061','L064']),
L('L067','ENGINEERING','Artifact Registry','Register immutable build artifacts.','JUMO Software Engineering Studio',['L066']),
L('L068','ENGINEERING','Dependency Management','Track software dependencies.','JUMO Software Engineering Studio',['L061']),
L('L069','ENGINEERING','Version Control','Manage product versions.','JUMO Software Engineering Studio',['L061']),
L('L070','ENGINEERING','Release Candidate','Prepare validated releases.','JUMO Software Engineering Studio',['L066','L067']),

/* ============================================================
 * 071–080 — MANUFACTURING
 * ============================================================ */
L('L071','MANUFACTURING','Production Registry','Register production programs.','JUMO Manufacturing Studio',['L041']),
L('L072','MANUFACTURING','Manufacturing Planning','Plan production workloads.','JUMO Manufacturing Studio',['L071']),
L('L073','MANUFACTURING','Production Jobs','Manage manufacturing jobs.','JUMO Manufacturing Studio',['L072']),
L('L074','MANUFACTURING','Resource Planning','Allocate production resources.','JUMO Manufacturing Studio',['L072']),
L('L075','MANUFACTURING','Engineering Tasks','Coordinate engineering tasks.','JUMO Manufacturing Studio',['L073']),
L('L076','MANUFACTURING','Workforce Allocation','Assign engineering workforce.','JUMO Manufacturing Studio',['L074']),
L('L077','MANUFACTURING','Production Scheduling','Schedule production activities.','JUMO Manufacturing Studio',['L073']),
L('L078','MANUFACTURING','Manufacturing Evidence','Capture production evidence.','JUMO Manufacturing Studio',['L073']),
L('L079','MANUFACTURING','Production Quality','Validate production quality.','JUMO Manufacturing Studio',['L078']),
L('L080','MANUFACTURING','Production Completion','Close production jobs.','JUMO Manufacturing Studio',['L079']),

/* ============================================================
 * 081–090 — HYBRID INFRASTRUCTURE
 * ============================================================ */
L('L081','HYBRID','JUMO Local Runtime','Local execution runtime.','JUMO Infrastructure & Hybrid Runtime Studio',[],'FOUNDATION'),
L('L082','HYBRID','JUMO Sovereign Runtime','Sovereign controlled runtime.','JUMO Infrastructure & Hybrid Runtime Studio',['L081']),
L('L083','HYBRID','JUMO Cloud Runtime','JUMO-controlled cloud execution.','JUMO Infrastructure & Hybrid Runtime Studio',['L082']),
L('L084','HYBRID','Hybrid Runtime Router','Route workloads between runtimes.','JUMO Infrastructure & Hybrid Runtime Studio',['L081','L082','L083']),
L('L085','HYBRID','Offline Runtime','Maintain operation without Internet.','JUMO Infrastructure & Hybrid Runtime Studio',['L081']),
L('L086','HYBRID','Synchronization Engine','Synchronize offline and connected state.','JUMO Infrastructure & Hybrid Runtime Studio',['L085','L084']),
L('L087','HYBRID','Runtime Health','Monitor runtime health.','JUMO Infrastructure & Hybrid Runtime Studio',['L084']),
L('L088','HYBRID','Runtime Provisioning','Provision execution environments.','JUMO Infrastructure & Hybrid Runtime Studio',['L084']),
L('L089','HYBRID','Runtime Isolation','Isolate tenants and workloads.','JUMO Infrastructure & Hybrid Runtime Studio',['L088']),
L('L090','HYBRID','Runtime Recovery','Recover failed runtimes.','JUMO Infrastructure & Hybrid Runtime Studio',['L087']),

/* ============================================================
 * 091–100 — DEPLOYMENT / OPERATIONS
 * ============================================================ */
L('L091','OPERATIONS','Environment Registry','Register runtime environments.','JUMO Deployment & Operations Studio',['L088']),
L('L092','OPERATIONS','Release Management','Manage releases.','JUMO Deployment & Operations Studio',['L070']),
L('L093','OPERATIONS','Deployment Orchestration','Deploy approved artifacts.','JUMO Deployment & Operations Studio',['L092']),
L('L094','OPERATIONS','Rollback Engine','Rollback failed releases.','JUMO Deployment & Operations Studio',['L093']),
L('L095','OPERATIONS','Telemetry','Collect runtime telemetry.','JUMO Deployment & Operations Studio',['L087']),
L('L096','OPERATIONS','Observability','Analyse system behaviour.','JUMO Deployment & Operations Studio',['L095']),
L('L097','OPERATIONS','Incident Management','Manage operational incidents.','JUMO Deployment & Operations Studio',['L096']),
L('L098','OPERATIONS','Capacity Management','Manage compute capacity.','JUMO Deployment & Operations Studio',['L096']),
L('L099','OPERATIONS','Performance Engineering','Analyse performance.','JUMO Deployment & Operations Studio',['L096']),
L('L100','OPERATIONS','Service Reliability','Maintain service reliability.','JUMO Deployment & Operations Studio',['L097','L099']),

/* ============================================================
 * 101–110 — SECURITY / TRUST
 * ============================================================ */
L('L101','SECURITY','Identity Gateway','Authenticate JUMO users and workloads.','JUMO Security & Trust Studio',['L011'],'FOUNDATION'),
L('L102','SECURITY','Authorization','Enforce permissions.','JUMO Security & Trust Studio',['L101']),
L('L103','SECURITY','Tenant Isolation','Enforce tenant boundaries.','JUMO Security & Trust Studio',['L102']),
L('L104','SECURITY','Secrets Management','Protect secrets and credentials.','JUMO Security & Trust Studio',['L101']),
L('L105','SECURITY','Key Management','Manage cryptographic keys.','JUMO Security & Trust Studio',['L104']),
L('L106','SECURITY','Certificate Authority','Manage runtime certificates.','JUMO Security & Trust Studio',['L105']),
L('L107','SECURITY','Zero Trust Policy','Apply zero-trust controls.','JUMO Security & Trust Studio',['L102','L105']),
L('L108','SECURITY','Security Audit','Record security events.','JUMO Security & Trust Studio',['L107']),
L('L109','SECURITY','Threat Detection','Detect suspicious activity.','JUMO Security & Trust Studio',['L108']),
L('L110','SECURITY','Emergency Control','Provide governed emergency controls.','JUMO Security & Trust Studio',['L109']),

/* ============================================================
 * 111–120 — VERIFICATION / GOVERNANCE / LIFECYCLE
 * ============================================================ */
L('L111','ASSURANCE','Verification Engine','Execute verification suites.','JUMO Verification & Assurance Studio',['L064']),
L('L112','ASSURANCE','Architecture Verification','Verify architecture contracts.','JUMO Verification & Assurance Studio',['L039','L111']),
L('L113','ASSURANCE','Security Verification','Verify security controls.','JUMO Verification & Assurance Studio',['L108','L111']),
L('L114','ASSURANCE','Runtime Verification','Verify deployed runtime.','JUMO Verification & Assurance Studio',['L093','L111']),
L('L115','ASSURANCE','Certification Engine','Issue governed certification evidence.','JUMO Verification & Assurance Studio',['L112','L113','L114']),
L('L116','GOVERNANCE','Policy Registry','Register governance policies.','JUMO Governance Studio',['L038']),
L('L117','GOVERNANCE','Approval Workflow','Manage human approvals.','JUMO Governance Studio',['L010','L116']),
L('L118','GOVERNANCE','Audit Evidence','Maintain authoritative evidence.','JUMO Governance Studio',['L108','L115']),
L('L119','LIFECYCLE','Upgrade Manager','Manage platform and product upgrades.','JUMO Lifecycle & Retirement Studio',['L069','L092']),
L('L120','LIFECYCLE','Retirement Manager','Safely retire products, services and runtimes.','JUMO Lifecycle & Retirement Studio',['L119']),

/* ============================================================
 * 121–130 — COMMERCIAL / MARKETPLACE
 * ============================================================ */
L('L121','COMMERCIAL','Product Marketplace','Discover approved JUMO products.','JUMO Marketplace & Commercialization Studio',['L041']),
L('L122','COMMERCIAL','Product Installation','Install products into authorized environments.','JUMO Marketplace & Commercialization Studio',['L121','L088']),
L('L123','COMMERCIAL','Product Configuration','Configure installed products.','JUMO Marketplace & Commercialization Studio',['L122']),
L('L124','COMMERCIAL','Provisioning','Provision product resources.','JUMO Marketplace & Commercialization Studio',['L122','L088']),
L('L125','COMMERCIAL','Licensing','Govern product licensing.','JUMO Marketplace & Commercialization Studio',['L121']),
L('L126','COMMERCIAL','Subscription Governance','Govern service subscriptions.','JUMO Marketplace & Commercialization Studio',['L125']),
L('L127','COMMERCIAL','Commercial Analytics','Analyse product usage.','JUMO Marketplace & Commercialization Studio',['L126']),
L('L128','COMMERCIAL','Product Updates','Distribute governed updates.','JUMO Marketplace & Commercialization Studio',['L119']),
L('L129','COMMERCIAL','Product Support','Coordinate support workflows.','JUMO Marketplace & Commercialization Studio',['L121']),
L('L130','COMMERCIAL','Product Retirement','Retire commercial products.','JUMO Marketplace & Commercialization Studio',['L120','L121']),

];



/**
 * Extensible JUMO architecture registry.
 *
 * The 130 initial layers are a baseline, NOT a maximum.
 *
 * New layers may be registered by future studios, domains,
 * products, platform upgrades and architecture packs.
 */
class JumoHybridArchitectureRegistry {
  private readonly layers = new Map<string, JumoArchitectureLayer>();

  constructor(initialLayers: JumoArchitectureLayer[]) {
    for (const layer of initialLayers) {
      this.register(layer);
    }
  }

  register(layer: JumoArchitectureLayer): void {
    if (!layer.id.trim()) {
      throw new Error('JUMO architecture layer requires an ID.');
    }

    if (this.layers.has(layer.id)) {
      throw new Error(
        `JUMO architecture layer already registered: ${layer.id}`
      );
    }

    this.layers.set(layer.id, {
      ...layer,
      dependencies: [...layer.dependencies],
    });
  }

  registerMany(layers: JumoArchitectureLayer[]): void {
    for (const layer of layers) {
      this.register(layer);
    }
  }

  upsert(layer: JumoArchitectureLayer): void {
    this.layers.set(layer.id, {
      ...layer,
      dependencies: [...layer.dependencies],
    });
  }

  remove(id: string): boolean {
    return this.layers.delete(id);
  }

  get(id: string): JumoArchitectureLayer | undefined {
    return this.layers.get(id);
  }

  all(): JumoArchitectureLayer[] {
    return Array.from(this.layers.values());
  }

  count(): number {
    return this.layers.size;
  }

  byFamily(family: string): JumoArchitectureLayer[] {
    return this.all().filter(
      layer => layer.family.toLowerCase() === family.toLowerCase()
    );
  }

  byStudio(studio: string): JumoArchitectureLayer[] {
    return this.all().filter(
      layer => layer.studio.toLowerCase() === studio.toLowerCase()
    );
  }

  listLayers(): JumoArchitectureLayer[] {
    return Array.from(this.layers.values());
  }

  active(): JumoArchitectureLayer[] {
    return this.all().filter(
      layer =>
        layer.status === 'ACTIVE' ||
        layer.status === 'FOUNDATION' ||
        layer.status === 'GOVERNED'
    );
  }

  executable(): JumoArchitectureLayer[] {
    return this.all().filter(layer => layer.executable);
  }

  humanFacing(): JumoArchitectureLayer[] {
    return this.all().filter(layer => layer.humanFacing);
  }

  families(): string[] {
    return [
      ...new Set(this.all().map(layer => layer.family))
    ];
  }

  studios(): string[] {
    return [
      ...new Set(this.all().map(layer => layer.studio))
    ];
  }

  dependenciesOf(id: string): JumoArchitectureLayer[] {
    const layer = this.get(id);

    if (!layer) {
      return [];
    }

    return layer.dependencies
      .map(dependencyId => this.get(dependencyId))
      .filter(
        (dependency): dependency is JumoArchitectureLayer =>
          Boolean(dependency)
      );
  }

  validateDependencies(): {
    valid: boolean;
    missing: Array<{
      layerId: string;
      dependencyId: string;
    }>;
  } {
    const missing: Array<{
      layerId: string;
      dependencyId: string;
    }> = [];

    for (const layer of this.all()) {
      for (const dependencyId of layer.dependencies) {
        if (!this.layers.has(dependencyId)) {
          missing.push({
            layerId: layer.id,
            dependencyId,
          });
        }
      }
    }

    return {
      valid: missing.length === 0,
      missing,
    };
  }
}

/**
 * Singleton authoritative registry.
 *
 * This starts with the current baseline but remains open-ended.
 */
export const JUMO_HYBRID_ARCHITECTURE_REGISTRY =
  new JumoHybridArchitectureRegistry(
    INITIAL_JUMO_HYBRID_ARCHITECTURE_LAYERS
  );

/**
 * Backwards-compatible read-only-style accessor.
 *
 * Existing code can continue calling this while the underlying
 * architecture remains dynamically extensible.
 */
export function getJumoArchitectureLayers(): JumoArchitectureLayer[] {
  return JUMO_HYBRID_ARCHITECTURE_REGISTRY.all();
}

export function getJumoArchitectureLayer(
  id: string
): JumoArchitectureLayer | undefined {
  return JUMO_HYBRID_ARCHITECTURE_REGISTRY.get(id);
}

export function registerJumoArchitectureLayer(
  layer: JumoArchitectureLayer
): void {
  JUMO_HYBRID_ARCHITECTURE_REGISTRY.register(layer);
}

export function registerJumoArchitectureLayers(
  layers: JumoArchitectureLayer[]
): void {
  JUMO_HYBRID_ARCHITECTURE_REGISTRY.registerMany(layers);
}

export function getJumoArchitectureFamilies(): string[] {
  return JUMO_HYBRID_ARCHITECTURE_REGISTRY.families();
}

export function getJumoArchitectureStudios(): string[] {
  return JUMO_HYBRID_ARCHITECTURE_REGISTRY.studios();
}

export function getJumoStudioLayerMap(): Record<
  string,
  JumoArchitectureLayer[]
> {
  return JUMO_HYBRID_ARCHITECTURE_REGISTRY
    .studios()
    .reduce(
      (map, studio) => {
        map[studio] =
          JUMO_HYBRID_ARCHITECTURE_REGISTRY.byStudio(studio);

        return map;
      },
      {} as Record<string, JumoArchitectureLayer[]>
    );
}

/**
 * Architecture health check.
 */
export function validateJumoArchitectureRegistry() {
  return JUMO_HYBRID_ARCHITECTURE_REGISTRY.validateDependencies();
}

/**
 * Runtime architecture statistics.
 */
export function getJumoArchitectureStatistics() {
  const layers = JUMO_HYBRID_ARCHITECTURE_REGISTRY.all();

  return {
    totalLayers: layers.length,
    totalFamilies:
      JUMO_HYBRID_ARCHITECTURE_REGISTRY.families().length,
    totalStudios:
      JUMO_HYBRID_ARCHITECTURE_REGISTRY.studios().length,
    activeLayers:
      JUMO_HYBRID_ARCHITECTURE_REGISTRY.active().length,
    executableLayers:
      JUMO_HYBRID_ARCHITECTURE_REGISTRY.executable().length,
    humanFacingLayers:
      JUMO_HYBRID_ARCHITECTURE_REGISTRY.humanFacing().length,
    dependencyValidation:
      JUMO_HYBRID_ARCHITECTURE_REGISTRY.validateDependencies(),
  };
}
