export type DetectionSeverity =
  | 'INFO'
  | 'WARNING'
  | 'ERROR'
  | 'BLOCKING';

export type DetectionFamily =
  | 'SPECIFICATION'
  | 'ARCHITECTURE'
  | 'LAYERS'
  | 'COMPONENTS'
  | 'MODULES'
  | 'NAVIGATION'
  | 'CONFIGURATION'
  | 'LAYOUT'
  | 'DESIGN'
  | 'BRANDING'
  | 'PUBLIC_PLATFORM'
  | 'INTEGRATION'
  | 'BACKEND'
  | 'FRONTEND'
  | 'DATA'
  | 'SECURITY'
  | 'AI'
  | 'PERFORMANCE'
  | 'COMPLIANCE'
  | 'TESTING'
  | 'PROVISIONING'
  | 'LIFECYCLE';

export interface VerificationDetection {
  id: string;
  family: DetectionFamily;
  name: string;
  description: string;
  severity: DetectionSeverity;
  blocking: boolean;
  evidenceType: string;
  engineerFamily: string;
  automated: boolean;
  enabled: boolean;
  metadata?: Record<string, unknown>;
}

export interface DetectionFinding {
  detectionId: string;
  status: 'PASS' | 'FAIL' | 'WARNING' | 'NOT_APPLICABLE';
  message: string;
  evidence: unknown[];
  recommendations: string[];
  engineerFamily?: string;
}

export class JumoVerificationDetectionRegistry {
  private readonly detections =
    new Map<string, VerificationDetection>();

  register(detection: VerificationDetection): VerificationDetection {
    if (!detection.id) {
      throw new Error('Verification detection requires an ID.');
    }

    this.detections.set(detection.id, detection);
    return detection;
  }

  registerMany(
    detections: VerificationDetection[],
  ): VerificationDetection[] {
    return detections.map(detection => this.register(detection));
  }

  get(id: string): VerificationDetection | undefined {
    return this.detections.get(id);
  }

  list(): VerificationDetection[] {
    return Array.from(this.detections.values());
  }

  byFamily(family: DetectionFamily): VerificationDetection[] {
    return this.list().filter(detection => detection.family === family);
  }

  blocking(): VerificationDetection[] {
    return this.list().filter(detection => detection.blocking);
  }

  automated(): VerificationDetection[] {
    return this.list().filter(detection => detection.automated);
  }

  enabled(): VerificationDetection[] {
    return this.list().filter(detection => detection.enabled);
  }

  count(): number {
    return this.detections.size;
  }
}

export const JUMO_VERIFICATION_DETECTION_REGISTRY =
  new JumoVerificationDetectionRegistry();
