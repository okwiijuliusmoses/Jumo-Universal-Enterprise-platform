export * from './engine';
export * from './service';
export * from './api';
export * from './config';
export * from './security';
export * from './database';
export * from './events';
export { TreasuryEngine as treasuryEngine } from './engine';

export const TreasuryPlatform = {
  name: 'JUMO Master Treasury Platform',
  version: '1.0.0',
  description: 'Central financial coordination layer for automated revenue allocation and settlement.',
};

