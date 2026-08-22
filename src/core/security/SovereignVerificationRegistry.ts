export const SovereignVerificationCredentialRegistry: Record<string, { username: string; password: string }> = {
  'JUMO-FINPAY': { username: 'FAAP-CFO-001', password: 'FAAP-VERIFY-001' },
  'JUMO-EDU-ALUMNI': { username: 'UNI-ADMIN-001', password: 'UNI-VERIFY-001' },
  'JUMO-CHURCH': { username: 'CHU-BISHOP-001', password: 'CHU-VERIFY-001' },
  'JUMO-CONTROL': { username: 'ROOT-ADMIN-001', password: 'ROOT-VERIFY-001' },
  
  // Legacy Aliases for Shells
  'faap': { username: 'FAAP-CFO-001', password: 'FAAP-VERIFY-001' },
  'digital-pay': { username: 'DP-MERCHANT-001', password: 'DP-VERIFY-001' },
  'nursery-primary': { username: 'PN-ADMIN-001', password: 'PN-VERIFY-001' },
  'secondary': { username: 'SHS-ADMIN-001', password: 'SHS-VERIFY-001' },
  'university': { username: 'UNI-ADMIN-001', password: 'UNI-VERIFY-001' },
  'church': { username: 'CHU-BISHOP-001', password: 'CHU-VERIFY-001' },
  'alumni': { username: 'ALM-ADMIN-001', password: 'ALM-VERIFY-001' }
};

// Compatibility export
export const ManufacturingVerificationCredentialRegistry = SovereignVerificationCredentialRegistry;

export const SOVEREIGN_VERIFICATION_ENABLED = true;
export const MANUFACTURING_VERIFICATION_ENABLED = SOVEREIGN_VERIFICATION_ENABLED;
