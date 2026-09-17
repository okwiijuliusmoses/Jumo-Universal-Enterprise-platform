import { shellActivationManager } from '../runtime/ShellActivationManager.js';
import { runtimeRecoveryManager } from '../runtime/RuntimeRecoveryManager.js';
import { erpRegistry } from '../../platform/registry/ERPRegistry.js';
import { aiERPRegistry } from '../../platform/registry/ai/AIERPRegistry.js';
import { moduleRegistry } from '../../platform/registry/ModuleRegistry.js';
import { portalRegistry } from '../../platform/registry/PortalRegistry.js';
import { componentRegistry } from '../../platform/registry/componentRegistry.js';
import { workflowRegistry } from '../../platform/registry/workflowRegistry.js';
import { formRegistry } from '../../platform/registry/formRegistry.js';
import { departmentRegistry } from '../../platform/registry/departmentRegistry.js';

export class BootOrchestrator {
  constructor() {
    this.bootTimestamp = Date.now();
    this.services = {
      critical: [
        { id: 'security', name: 'Security Kernel', status: 'PENDING' },
        { id: 'identity', name: 'Identity Gateway', status: 'PENDING' },
        { id: 'session', name: 'Session Manager', status: 'PENDING' },
        { id: 'tenant', name: 'Tenant Resolver', status: 'PENDING' },
        { id: 'workspace', name: 'UEOS Shell Runtime', status: 'PENDING' }
      ],
      background: [
        { id: 'erp_registry', name: 'ERP Registry', status: 'PENDING' },
        { id: 'portal_registry', name: 'Portal Registry', status: 'PENDING' },
        { id: 'faap', name: 'FAAP Financial Engine', status: 'PENDING' },
        { id: 'workflow', name: 'Workflow Engine', status: 'PENDING' },
        { id: 'ai_gateway', name: 'AI Gateway', status: 'PENDING' },
        { id: 'aegis', name: 'AEGIS Audit Engine', status: 'PENDING' },
        { id: 'treasury', name: 'Treasury Services', status: 'PENDING' },
        { id: 'erp_factory', name: 'AI ERP Factory', status: 'PENDING' }
      ]
    };
    this.subscribers = [];
  }

  async loadRegistrySnapshots() {
  }

  onProgress(callback) {
    this.subscribers.push(callback);
  }

  _notify(stage, serviceId) {
    this.subscribers.forEach(cb => cb(this.services, stage, serviceId));
  }

  async _simulateServiceLoad(service, minTime, maxTime) {
    const delay = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Custom logic for factory and registry
    if (service.id === 'erp_factory') {
        await import('../../platform/factory/erp/ERPFactoryManager.js');
    }
    
    service.status = 'READY';
    this._notify('UPDATE', service.id);
  }

  async executeFastCoreBoot(state) {
    this._notify('START_CRITICAL');
    
    // Enterprise Error Recovery: Boot Timeout Protection
    const bootTimeout = new Promise((_, reject) => setTimeout(() => reject(new Error('CRITICAL_BOOT_TIMEOUT')), 5000));
    
    try {
      const bootProcess = async () => {
        const promises = this.services.critical.map(async (service) => {
           service.status = 'INITIALIZING';
           this._notify('UPDATE', service.id);
           await this._simulateServiceLoad(service, 100, 400);
        });
        await Promise.all(promises);
      };
      
      await Promise.race([bootProcess(), bootTimeout]);
      this._notify('CRITICAL_READY');
      
      // Critical services READY -> immediately open platform shell
      shellActivationManager.activateShell(state);
      
    } catch (error) {
      console.warn('[UEOS] Entering Degraded Mode due to critical service failure:', error);
      this.services.critical.forEach(s => {
         if (s.status === 'INITIALIZING' || s.status === 'PENDING') {
             s.status = 'DEGRADED';
             runtimeRecoveryManager.catchError(error, s.id);
         }
      });
      this._notify('DEGRADED_MODE_ACTIVE', error.message);
      runtimeRecoveryManager.displayRecoveryScreen();
    }
  }

  async executeBackgroundServices() {
    this._notify('START_BACKGROUND');
    
    const promises = this.services.background.map(async (service) => {
      service.status = 'INITIALIZING';
      this._notify('UPDATE', service.id);
      await this._simulateServiceLoad(service, 300, 1200);
    });
    await Promise.allSettled(promises);
    this._notify('BACKGROUND_READY');
  }

  async boot(state) {
    await this.executeFastCoreBoot(state);
    // Continue loading secondary services in background
    this.executeBackgroundServices().catch(console.error);
    return true; 
  }

  // Dynamic Enterprise Progressive Loading
  async loadModuleLazy(moduleId, role) {
    if (this._moduleCache && this._moduleCache[moduleId]) {
       return this._moduleCache[moduleId];
    }
    
    // Simulate dynamic module fetching
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!this._moduleCache) this._moduleCache = {};
    const mod = {
       id: moduleId,
       loadedAt: Date.now(),
       status: 'ACTIVE',
       cached: true
    };
    this._moduleCache[moduleId] = mod;
    return mod;
  }
}
export const bootOrchestrator = new BootOrchestrator();
