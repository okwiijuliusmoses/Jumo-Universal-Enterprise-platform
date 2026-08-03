
import { erpInstanceRegistry } from './platform/registry/ERPInstanceRegistry.js';

console.log('Verifying ERP Instances...');

const instances = erpInstanceRegistry.list();
console.log('REGISTERED ERP COUNT:', instances.length);
console.log('ACTIVE INSTANCES:', instances.filter(i => i.status === 'ACTIVE').length);

if (instances.length >= 8) {
    console.log('SUCCESS: Minimum instances found.');
} else {
    console.log('FAILURE: Insufficient instances found.');
}
