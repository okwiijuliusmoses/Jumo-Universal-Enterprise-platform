import { erpProductRegistry } from './platform/registry/ERPProductRegistry.js';
console.log(erpProductRegistry.list().map(p => p.id));
