/**
 * Platform Metadata Registry
 * Central service for storing platform configurations, domain templates, and module settings.
 */

import { UEOSGovernanceState } from './ueosState';
import { DomainTemplateLibrary } from './templates';
import { DomainDefinition } from '../types';
import { AppRegistryService } from '../../core/application-runtime/registry';

export const PlatformRegistry = {
  // --- Domain Loading Service ---
  getDomainDefinitions(): DomainDefinition[] {
    const templates = Object.entries(DomainTemplateLibrary).map(([id, t]) => ({ id, ...t }));
    const allApps = AppRegistryService.getAllApps();
    
    // Add any app from AppRegistryService that isn't already in DomainTemplateLibrary
    allApps.forEach(app => {
      if (!templates.find(t => t.id === app.id)) {
        // Smart matching to rich templates if id/name matches known categories
        const lowerName = app.name.toLowerCase() + ' ' + app.id.toLowerCase();
        let matchedTpl = undefined;
        if (lowerName.includes('church') || lowerName.includes('faith') || lowerName.includes('diocesan') || lowerName.includes('ministr')) {
          matchedTpl = DomainTemplateLibrary['church'];
        } else if (lowerName.includes('edu') || lowerName.includes('univ') || lowerName.includes('school') || lowerName.includes('college') || lowerName.includes('alumni')) {
          matchedTpl = DomainTemplateLibrary['edu-alumni'];
        } else if (lowerName.includes('bank') || lowerName.includes('finan') || lowerName.includes('treas') || lowerName.includes('faap') || lowerName.includes('pay') || lowerName.includes('wallet') || lowerName.includes('digital-pay')) {
          matchedTpl = DomainTemplateLibrary['finpay'];
        } else if (lowerName.includes('cloud') || lowerName.includes('serv') || lowerName.includes('infr') || lowerName.includes('control')) {
          matchedTpl = DomainTemplateLibrary['control'];
        }

        const fallbackModules = ['General Ledger & Accounts', 'Operations Management', 'User & Tenant Administration', 'Reporting & Compliance AI'];
        const baseModules = matchedTpl ? (matchedTpl.erpModules ?? []) : (app.modules ?? fallbackModules).map((mod: any, idx: number) => ({
          id: `${app.id}_mod_${idx}`,
          name: typeof mod === 'string' ? mod : (mod?.name || `Module ${idx + 1}`),
          description: typeof mod === 'string' ? `${mod} operational and governance engine for ${app.name}` : (mod?.description || `Operational module`),
          status: 'ACTIVE' as const,
          config: mod?.config || {}
        }));

        templates.push({
          id: app.id,
          name: app.name,
          displayName: `${app.name} Workspace`,
          icon: app.icon,
          status: 'AVAILABLE',
          config: {
            onboardingPolicy: 'Auto-approve',
            approvalPolicy: 'Strict Single Owner',
            securityIsolation: 'Schema-Level'
          },
          aiProfile: matchedTpl ? matchedTpl.aiProfile : {
            agentId: `${app.id}-ai`,
            modelName: 'JUMO AI Enterprise Engine',
            promptTemplate: `System prompt for ${app.name} enterprise intelligence agent.`
          },
          erpModules: baseModules
        });
      }
    });

    return templates;
  },

  getDomainById(id: string): DomainDefinition | undefined {
    const all = this.getDomainDefinitions();
    const cleanId = id.toLowerCase().trim();
    
    // Direct or exact match
    let found = all.find(d => d.id.toLowerCase() === cleanId || d.name.toLowerCase() === cleanId);
    if (found) return found;

    // Alias mappings
    const aliasMap: Record<string, string> = {
      'faap_product': 'finpay',
      'faap': 'finpay',
      'digital_pay': 'finpay',
      'digital-pay': 'finpay',
      'school': 'edu-alumni',
      'education': 'edu-alumni',
      'edu': 'edu-alumni',
      'alumni': 'edu-alumni',
      'alumni_erp': 'edu-alumni',
      'university': 'edu-alumni',
      'diocesan': 'church',
      'faith': 'church',
      'control': 'control',
      'jumo-cloud': 'control'
    };

    const targetId = aliasMap[cleanId] || cleanId;
    found = all.find(d => d.id.toLowerCase() === targetId);
    if (found) return found;

    // Substring or display name matching
    return all.find(d => 
      d.id.toLowerCase().includes(targetId) || 
      targetId.includes(d.id.toLowerCase()) ||
      d.name.toLowerCase().includes(targetId) ||
      (d.displayName && d.displayName.toLowerCase().includes(targetId))
    ) || all[0]; // Fallback to safe first domain (sacco or banking) if completely unmatched
  },

  // --- Legacy/Existing Accessors ---
  getNavigation: () => UEOSGovernanceState.getNavigation(),
  getPlatformConfig: () => UEOSGovernanceState.getPlatformConfig(),
  getComponents: () => UEOSGovernanceState.getComponents(),
  getDomains: () => UEOSGovernanceState.getDomains(),
  getFactories: () => UEOSGovernanceState.getFactories(),
  getTenants: () => UEOSGovernanceState.getTenants(),
};
