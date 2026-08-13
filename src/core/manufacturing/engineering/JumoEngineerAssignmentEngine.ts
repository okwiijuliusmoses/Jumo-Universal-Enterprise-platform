import {
  DetectionFinding,
  VerificationDetection,
} from '../quality/JumoVerificationDetectionRegistry';

export interface EngineerFamily {
  id: string;
  name: string;
  specializations: string[];
  enabled: boolean;
  metadata?: Record<string, unknown>;
}

export interface EngineerAssignment {
  id: string;
  detectionId: string;
  engineerFamilyId: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'PENDING' | 'ASSIGNED' | 'RESOLVED' | 'REJECTED';
  createdAt: string;
  metadata?: Record<string, unknown>;
}

export class JumoEngineerAssignmentEngine {
  private readonly engineerFamilies =
    new Map<string, EngineerFamily>();

  private readonly assignments =
    new Map<string, EngineerAssignment>();

  registerEngineerFamily(
    family: EngineerFamily,
  ): EngineerFamily {
    this.engineerFamilies.set(family.id, family);
    return family;
  }

  listEngineerFamilies(): EngineerFamily[] {
    return Array.from(this.engineerFamilies.values());
  }

  assign(
    detection: VerificationDetection,
    finding: DetectionFinding,
  ): EngineerAssignment {
    const family = this.engineerFamilies.get(
      finding.engineerFamily || detection.engineerFamily,
    );

    if (!family || !family.enabled) {
      throw new Error(
        `No enabled specialist engineer family for detection ${detection.id}.`,
      );
    }

    const priority =
      finding.status === 'FAIL' && detection.blocking
        ? 'CRITICAL'
        : finding.status === 'FAIL'
          ? 'HIGH'
          : 'MEDIUM';

    const assignment: EngineerAssignment = {
      id: `engineering-assignment-${detection.id}-${Date.now()}`,
      detectionId: detection.id,
      engineerFamilyId: family.id,
      priority,
      status: 'ASSIGNED',
      createdAt: new Date().toISOString(),
    };

    this.assignments.set(assignment.id, assignment);
    return assignment;
  }

  listAssignments(): EngineerAssignment[] {
    return Array.from(this.assignments.values());
  }
}

export const JUMO_ENGINEER_ASSIGNMENT_ENGINE =
  new JumoEngineerAssignmentEngine();
