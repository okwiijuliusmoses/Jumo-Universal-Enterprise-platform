import { RecoveredEntity } from './SixProductRecoveryTypes';
import { JUMO_ARCHITECTURE_EVIDENCE } from './JUMOArchitectureEvidenceRegistry';

function mapEvidenceToEntities(productId: string): RecoveredEntity[] {
  return JUMO_ARCHITECTURE_EVIDENCE
    .filter(e => e.productId === productId)
    .map(e => ({
      id: e.elementId,
      name: e.evidence,
      level: (e.elementType === "PRODUCT" ? "SOVEREIGN_PRODUCT" : e.elementType) as any,
      productId: e.productId,
      parentId: e.parentId,
      sourceFile: e.sourceFile,
      sourceType: e.sourceType,
      status: "VERIFIED" as const,
      metadata: { evidence: e.evidence }
    }));
}

export const SixProductEvidenceRegistry: Record<string, RecoveredEntity[]> = {
  "JUMO-FINTECH": mapEvidenceToEntities("JUMO-FINTECH"),
  "JUMO-NURSERY-PRIMARY-ERP": mapEvidenceToEntities("JUMO-NURSERY-PRIMARY-ERP"),
  "JUMO-SECONDARY-ERP": mapEvidenceToEntities("JUMO-SECONDARY-ERP"),
  "JUMO-ALUMNI-ERP": mapEvidenceToEntities("JUMO-ALUMNI-ERP"),
  "JUMO-CHURCH-ERP": mapEvidenceToEntities("JUMO-CHURCH-ERP"),
  "JUMO-OWNER-CONTROL-CENTER": mapEvidenceToEntities("JUMO-OWNER-CONTROL-CENTER"),
  // Aliases for historical compatibility
  "FINTECH": mapEvidenceToEntities("JUMO-FINTECH"),
  "NURSERY_PRIMARY_CONSOLIDATED_ERP": mapEvidenceToEntities("JUMO-NURSERY-PRIMARY-ERP"),
  "SECONDARY_SCHOOL_ERP": mapEvidenceToEntities("JUMO-SECONDARY-ERP"),
  "ALUMNI": mapEvidenceToEntities("JUMO-ALUMNI-ERP"),
  "CHURCH": mapEvidenceToEntities("JUMO-CHURCH-ERP"),
  "OWNERS_CONTROL_CENTER": mapEvidenceToEntities("JUMO-OWNER-CONTROL-CENTER")
};

export default SixProductEvidenceRegistry;
