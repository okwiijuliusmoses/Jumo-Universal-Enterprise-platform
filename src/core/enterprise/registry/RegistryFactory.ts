/**
 * JUMO Universal Enterprise Operating System (UEOS)
 * Authoritative Universal Registry Factory
 * 
 * Provides robust, non-null, immutable RegistryCollection instances for all
 * platform layers:
 * Platform Kernel → Sovereign Product → Directorate → Department → Office → Portal → Module → Capability → UI Metadata → Runtime Component
 * 
 * Guarantees:
 * 1. Zero undefined crashes across any route (including /products/nursery-primary/login).
 * 2. Every collection provides .items: [] (never undefined) + .find, .filter, .map, .some, .every, .getById.
 * 3. Defensive diagnosis for missing, malformed, or duplicate entries.
 * 4. Preserves independent product boundaries.
 */

import {
  RegistryCollection,
  RegistryDiagnostics,
  createRegistryCollection
} from './UniversalRegistryContract';

import {
  PortalRegistry,
  DirectorateRegistry,
  DepartmentRegistry,
  OfficeRegistry,
  ModuleRegistry,
  SubmoduleRegistry,
  WorkflowRegistry,
  FormRegistry,
  ReportRegistry,
  APIRegistry,
  IntegrationRegistry,
  AICapabilityRegistry,
  CredentialRegistry,
  NavigationRegistry,
  EducationTemplateRegistry,
  ChurchTemplateRegistry,
  ProductRegistry,
  TenantRegistry
} from '../../../products/registries';

import {
  ApprovedProductRegistry,
  ApprovedProductDefinition
} from '../../../products/ApprovedProductRegistry';

import { UniversalCapabilityRegistry } from './UniversalCapabilityRegistry';
import { UniversalUIMetadataRegistry } from './UniversalUIMetadataRegistry';
import { UniversalRuntimeComponentRegistry } from './UniversalRuntimeComponentRegistry';
import { UniversalTableRegistry } from './UniversalTableRegistry';
import { UniversalWorkflowRegistry } from './UniversalWorkflowRegistry';
import { UniversalReportRegistry } from './UniversalReportRegistry';
import { UniversalAIRegistry } from './UniversalAIRegistry';
import { UniversalFormRegistry } from './UniversalFormRegistry';
import { UniversalActionRegistry } from './UniversalActionRegistry';
import { UniversalDashboardRegistry } from './UniversalDashboardRegistry';
import { UniversalPermissionRegistry } from './UniversalPermissionRegistry';

class UniversalRegistryFactory {
  private cache: Map<string, RegistryCollection<any>> = new Map();
  private customRegistries: Map<string, RegistryCollection<any>> = new Map();

  /**
   * Universal factory method to create or retrieve any registry collection safely
   */
  public getRegistry<T>(
    registryKey: string,
    fallbackItems: T[] = [],
    version: string = 'v18.0.0 Sovereign LTS'
  ): RegistryCollection<T> {
    const key = registryKey.toUpperCase().trim();
    
    if (this.customRegistries.has(key)) {
      const custom = this.customRegistries.get(key);
      if (custom) return custom;
    }
    
    if (this.cache.has(key)) {
      const cached = this.cache.get(key);
      if (cached) return cached;
    }

    try {
      const resolvedCollection = this.resolveInternalRegistry<T>(key, fallbackItems, version);
      if (resolvedCollection) {
        this.cache.set(key, resolvedCollection);
        return resolvedCollection;
      }
    } catch (error) {
      console.error(`[RegistryFactory] Critical failure resolving registry ${key}:`, error);
    }

    // Ultimate Zero-Undefined Guarantee
    const ultimateFallback = createRegistryCollection<T>(fallbackItems || [], `FALLBACK_${key}`, version);
    this.cache.set(key, ultimateFallback);
    return ultimateFallback;
  }

  public get<T>(
    registryKey: string,
    fallbackItems: T[] = [],
    version: string = 'v18.0.0 Sovereign LTS'
  ): RegistryCollection<T> {
    return this.getRegistry<T>(registryKey, fallbackItems, version);
  }

  /**
   * Register a custom or dynamically discovered registry
   */
  public registerCustomRegistry<T>(
    registryKey: string,
    items: T[],
    source: string = 'CUSTOM_EXTENSION',
    version: string = 'v18.0.0'
  ): RegistryCollection<T> {
    const key = registryKey.toUpperCase().trim();
    const collection = createRegistryCollection(items, source, version);
    this.customRegistries.set(key, collection);
    return collection;
  }

  /**
   * Specific Typed Registry Accessors
   */
  public getApprovedProductRegistry(): RegistryCollection<ApprovedProductDefinition> {
    return this.getRegistry<ApprovedProductDefinition>('APPROVED_PRODUCTS', ApprovedProductRegistry);
  }

  public getProductRegistry(): RegistryCollection<any> {
    return this.getRegistry('PRODUCT_REGISTRY', ProductRegistry);
  }

  public getTenantRegistry(): RegistryCollection<any> {
    return this.getRegistry('TENANT_REGISTRY', TenantRegistry);
  }

  public getPortalRegistry(): RegistryCollection<any> {
    return this.getRegistry('PORTAL_REGISTRY', PortalRegistry);
  }

  public getDirectorateRegistry(): RegistryCollection<any> {
    return this.getRegistry('DIRECTORATE_REGISTRY', DirectorateRegistry);
  }

  public getDepartmentRegistry(): RegistryCollection<any> {
    return this.getRegistry('DEPARTMENT_REGISTRY', DepartmentRegistry);
  }

  public getOfficeRegistry(): RegistryCollection<any> {
    return this.getRegistry('OFFICE_REGISTRY', OfficeRegistry);
  }

  public getModuleRegistry(): RegistryCollection<any> {
    return this.getRegistry('MODULE_REGISTRY', ModuleRegistry);
  }

  public getSubmoduleRegistry(): RegistryCollection<any> {
    return this.getRegistry('SUBMODULE_REGISTRY', SubmoduleRegistry);
  }

  public getWorkflowRegistry(): RegistryCollection<any> {
    return this.getRegistry('WORKFLOW_REGISTRY', WorkflowRegistry);
  }

  public getFormRegistry(): RegistryCollection<any> {
    return this.getRegistry('FORM_REGISTRY', FormRegistry);
  }

  public getReportRegistry(): RegistryCollection<any> {
    return this.getRegistry('REPORT_REGISTRY', ReportRegistry);
  }

  public getAPIRegistry(): RegistryCollection<any> {
    return this.getRegistry('API_REGISTRY', APIRegistry);
  }

  public getIntegrationRegistry(): RegistryCollection<any> {
    return this.getRegistry('INTEGRATION_REGISTRY', IntegrationRegistry);
  }

  public getAICapabilityRegistry(): RegistryCollection<any> {
    return this.getRegistry('AI_CAPABILITY_REGISTRY', AICapabilityRegistry);
  }

  public getCredentialRegistry(): RegistryCollection<any> {
    return this.getRegistry('CREDENTIAL_REGISTRY', CredentialRegistry);
  }

  public getNavigationRegistry(): RegistryCollection<any> {
    return this.getRegistry('NAVIGATION_REGISTRY', NavigationRegistry);
  }

  public getEducationTemplateRegistry(): RegistryCollection<any> {
    return this.getRegistry('EDUCATION_TEMPLATE_REGISTRY', EducationTemplateRegistry);
  }

  public getChurchTemplateRegistry(): RegistryCollection<any> {
    return this.getRegistry('CHURCH_TEMPLATE_REGISTRY', ChurchTemplateRegistry);
  }

  public getUniversalCapabilityRegistry(): RegistryCollection<any> {
    return UniversalCapabilityRegistry;
  }

  public getUniversalUIMetadataRegistry(): RegistryCollection<any> {
    return UniversalUIMetadataRegistry;
  }

  public getUniversalRuntimeComponentRegistry(): RegistryCollection<any> {
    return UniversalRuntimeComponentRegistry;
  }

  public getUniversalTableRegistry(): RegistryCollection<any> {
    return UniversalTableRegistry;
  }

  public getUniversalWorkflowRegistry(): RegistryCollection<any> {
    return UniversalWorkflowRegistry;
  }

  public getUniversalReportRegistry(): RegistryCollection<any> {
    return UniversalReportRegistry;
  }

  public getUniversalAIRegistry(): RegistryCollection<any> {
    return UniversalAIRegistry;
  }

  public getUniversalFormRegistry(): RegistryCollection<any> {
    return UniversalFormRegistry;
  }

  public getUniversalActionRegistry(): RegistryCollection<any> {
    return UniversalActionRegistry;
  }

  public getUniversalDashboardRegistry(): RegistryCollection<any> {
    return UniversalDashboardRegistry;
  }

  public getUniversalPermissionRegistry(): RegistryCollection<any> {
    return UniversalPermissionRegistry;
  }

  /**
   * Internal resolver mapping key names to authoritative raw data
   */
  private resolveInternalRegistry<T>(
    key: string,
    fallbackItems: T[],
    version: string
  ): RegistryCollection<T> {
    let sourceData: any = fallbackItems;
    let sourceName = `JUMO_REGISTRY_${key}`;

    switch (key) {
      case 'APPROVED_PRODUCTS':
      case 'PRODUCTS':
        sourceData = ApprovedProductRegistry;
        sourceName = 'ApprovedProductRegistry';
        break;
      case 'PRODUCT_REGISTRY':
        sourceData = ProductRegistry;
        sourceName = 'ProductRegistry';
        break;
      case 'TENANT_REGISTRY':
      case 'TENANTS':
        sourceData = TenantRegistry;
        sourceName = 'TenantRegistry';
        break;
      case 'PORTAL_REGISTRY':
      case 'PORTALS':
        sourceData = PortalRegistry;
        sourceName = 'PortalRegistry';
        break;
      case 'DIRECTORATE_REGISTRY':
      case 'DIRECTORATES':
        sourceData = DirectorateRegistry;
        sourceName = 'DirectorateRegistry';
        break;
      case 'DEPARTMENT_REGISTRY':
      case 'DEPARTMENTS':
        sourceData = DepartmentRegistry;
        sourceName = 'DepartmentRegistry';
        break;
      case 'OFFICE_REGISTRY':
      case 'OFFICES':
        sourceData = OfficeRegistry;
        sourceName = 'OfficeRegistry';
        break;
      case 'MODULE_REGISTRY':
      case 'MODULES':
        sourceData = ModuleRegistry;
        sourceName = 'ModuleRegistry';
        break;
      case 'SUBMODULE_REGISTRY':
      case 'SUBMODULES':
        sourceData = SubmoduleRegistry;
        sourceName = 'SubmoduleRegistry';
        break;
      case 'WORKFLOW_REGISTRY':
      case 'WORKFLOWS':
        sourceData = WorkflowRegistry;
        sourceName = 'WorkflowRegistry';
        break;
      case 'FORM_REGISTRY':
      case 'FORMS':
        sourceData = FormRegistry;
        sourceName = 'FormRegistry';
        break;
      case 'REPORT_REGISTRY':
      case 'REPORTS':
        sourceData = ReportRegistry;
        sourceName = 'ReportRegistry';
        break;
      case 'API_REGISTRY':
      case 'APIS':
        sourceData = APIRegistry;
        sourceName = 'APIRegistry';
        break;
      case 'INTEGRATION_REGISTRY':
      case 'INTEGRATIONS':
        sourceData = IntegrationRegistry;
        sourceName = 'IntegrationRegistry';
        break;
      case 'AI_CAPABILITY_REGISTRY':
      case 'AI_CAPABILITIES':
        sourceData = AICapabilityRegistry;
        sourceName = 'AICapabilityRegistry';
        break;
      case 'CREDENTIAL_REGISTRY':
      case 'CREDENTIALS':
        sourceData = CredentialRegistry;
        sourceName = 'CredentialRegistry';
        break;
      case 'NAVIGATION_REGISTRY':
      case 'NAVIGATIONS':
        sourceData = NavigationRegistry;
        sourceName = 'NavigationRegistry';
        break;
      case 'EDUCATION_TEMPLATE_REGISTRY':
        sourceData = EducationTemplateRegistry;
        sourceName = 'EducationTemplateRegistry';
        break;
      case 'CHURCH_TEMPLATE_REGISTRY':
        sourceData = ChurchTemplateRegistry;
        sourceName = 'ChurchTemplateRegistry';
        break;
    }

    const items = Array.isArray(sourceData) ? sourceData : fallbackItems;
    return createRegistryCollection<T>(items, sourceName, version);
  }

  /**
   * Diagnostic Audit of all platform registries
   */
  public runDiagnosticAudit(): Record<string, RegistryDiagnostics> {
    const report: Record<string, RegistryDiagnostics> = {};
    const keys = [
      'APPROVED_PRODUCTS',
      'PRODUCT_REGISTRY',
      'TENANT_REGISTRY',
      'PORTAL_REGISTRY',
      'DIRECTORATE_REGISTRY',
      'DEPARTMENT_REGISTRY',
      'OFFICE_REGISTRY',
      'MODULE_REGISTRY',
      'SUBMODULE_REGISTRY',
      'WORKFLOW_REGISTRY',
      'FORM_REGISTRY',
      'REPORT_REGISTRY',
      'API_REGISTRY',
      'INTEGRATION_REGISTRY',
      'AI_CAPABILITY_REGISTRY',
      'CREDENTIAL_REGISTRY',
      'NAVIGATION_REGISTRY',
      'EDUCATION_TEMPLATE_REGISTRY',
      'CHURCH_TEMPLATE_REGISTRY'
    ];

    keys.forEach(k => {
      const reg = this.getRegistry(k);
      report[k] = reg.getDiagnostics();
    });

    report['UNIVERSAL_CAPABILITIES'] = this.getUniversalCapabilityRegistry().getDiagnostics();
    report['UNIVERSAL_UI_METADATA'] = this.getUniversalUIMetadataRegistry().getDiagnostics();
    report['UNIVERSAL_RUNTIME_COMPONENTS'] = this.getUniversalRuntimeComponentRegistry().getDiagnostics();

    return report;
  }
}

export const RegistryFactory = new UniversalRegistryFactory();
