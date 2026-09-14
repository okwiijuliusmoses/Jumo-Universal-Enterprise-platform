import { SECERP_MANIFEST } from './manifest';
import { SECONDARY_SCHOOL_HIERARCHY } from '../canonical/secondarySchool';

export function bootstrapSecerpProduct() {
  return {
    initialized: true,
    productId: SECERP_MANIFEST.productId,
    code: SECERP_MANIFEST.code,
    name: SECERP_MANIFEST.name,
    mountedModulesCount: SECONDARY_SCHOOL_HIERARCHY.modules.length,
    mountedCapabilitiesCount: SECONDARY_SCHOOL_HIERARCHY.capabilities.length,
    timestamp: new Date().toISOString(),
    isolationValidated: true
  };
}
