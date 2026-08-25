import { 
  Building2, Users, BookOpen, Clipboard, DollarSign, Activity, Zap, 
  Search, Plus, CheckCircle, Clock, ShieldAlert, ArrowRight, Save,
  Trash2, Edit, AlertCircle, HelpCircle, FileText, CheckSquare, 
  Settings, ArrowRightLeft, FileSpreadsheet, Eye, RefreshCw,
  Landmark, CreditCard, GraduationCap, Globe, ShieldCheck, 
  Briefcase, Baby, HeartPulse, Heart, Layers, TrendingUp,
  Cpu, Lock, Sparkles, Box, Mail, Gavel, LayoutGrid, Award,
  TestTube, Cloud, Send, Smartphone, BarChart2,
  Code, Package, Calendar, Hash, Utensils, Bus, Coins, Hammer,
  MapPin, Gift, Sliders, LucideIcon
} from 'lucide-react';
import { JumoModule, JumoCapability } from './types';
import { GlobalModuleRegistry, GlobalCapabilityRegistry } from './JumoGlobalRegistry';
import { ModuleRegistry } from '../../../products/registries';
import { OFFICE_TO_MODULE_MAP } from '../../../products/OfficeModuleMapping';

export interface MasterModuleDefinition extends JumoModule {
  category: string;
  badge?: string;
  department?: string;
  route?: string;
  tags?: string[];
  capabilitiesCount?: number;
}

/**
 * Helper to determine category, icon, and metadata based on module properties and domain
 */
function inferModuleCategory(mod: { id: string; productId: string; name: string; description?: string }): {
  category: string;
  icon: LucideIcon;
  badge: string;
} {
  const id = mod.id.toUpperCase();
  const name = mod.name.toUpperCase();
  const prod = mod.productId.toUpperCase();

  // --- FINTECH ---
  if (prod.includes('FINTECH') || prod.includes('FAAP') || prod.includes('PAY')) {
    if (id.includes('LEDGER') || id.includes('COA') || id.includes('JOURNAL') || id.includes('CASHBOOK') || id.includes('VOTE') || id.includes('BUDGET') || name.includes('LEDGER') || name.includes('ACCOUNT')) {
      return { category: 'FAAP & Financial Core', icon: Landmark, badge: 'FAAP CORE' };
    }
    if (id.includes('SWITCH') || id.includes('MOMO') || id.includes('GATEWAY') || id.includes('COLLECTION') || id.includes('PAYOUT') || id.includes('PRN') || name.includes('PAYMENT') || name.includes('SWITCH') || name.includes('MONEY')) {
      return { category: 'Payments & Switching', icon: RefreshCw, badge: 'PAYMENT SWITCH' };
    }
    if (id.includes('BANK') || id.includes('SACCO') || id.includes('LENDING') || id.includes('MICRO') || id.includes('SAVINGS') || id.includes('WALLET') || name.includes('BANK') || name.includes('SACCO') || name.includes('LOAN')) {
      return { category: 'Banking & Lending Core', icon: Building2, badge: 'BANKING & SACCO' };
    }
    if (id.includes('TREASURY') || id.includes('FX') || id.includes('INVEST') || id.includes('CAPITAL') || id.includes('INSURANCE') || id.includes('TRADE') || name.includes('TREASURY') || name.includes('MARKET')) {
      return { category: 'Treasury & Capital Markets', icon: BarChart2, badge: 'TREASURY' };
    }
    if (id.includes('COMPLIANCE') || id.includes('AUDIT') || id.includes('AML') || id.includes('TAX') || name.includes('AUDIT') || name.includes('COMPLIANCE') || name.includes('TAX')) {
      return { category: 'Compliance & Statutory', icon: ShieldCheck, badge: 'COMPLIANCE' };
    }
    if (id.includes('API') || id.includes('STABLECOIN') || id.includes('DEV') || id.includes('SWITCH') || name.includes('API') || name.includes('DEVELOPER')) {
      return { category: 'Infrastructure & APIs', icon: Code, badge: 'INFRA' };
    }
    return { category: 'Fintech Operations', icon: DollarSign, badge: 'FINTECH' };
  }

  // --- CHURCH ---
  if (prod.includes('CHURCH')) {
    if (id.includes('BISHOP') || id.includes('SYNOD') || id.includes('DIOCESE') || id.includes('GOVERNANCE') || name.includes('SYNOD') || name.includes('BISHOP') || name.includes('COUNCIL')) {
      return { category: 'Diocesan Governance', icon: Building2, badge: 'GOVERNANCE' };
    }
    if (id.includes('CENSUS') || id.includes('MEMBER') || id.includes('PARISH') || name.includes('PARISH') || name.includes('CENSUS') || name.includes('CHRISTIAN')) {
      return { category: 'Parish Administration', icon: Users, badge: 'PARISH' };
    }
    if (id.includes('SACRAMENT') || id.includes('BAPTISM') || id.includes('MATRIMONY') || id.includes('CONFIRMATION') || name.includes('SACRAMENT')) {
      return { category: 'Sacramental Registry', icon: Heart, badge: 'SACRAMENTS' };
    }
    if (id.includes('CLERGY') || id.includes('PASTOR') || id.includes('PRIEST') || id.includes('VOCATION') || name.includes('CLERGY') || name.includes('PASTORAL')) {
      return { category: 'Clergy & Pastoral Care', icon: ShieldCheck, badge: 'CLERGY' };
    }
    if (id.includes('FINANCE') || id.includes('TITHE') || id.includes('TREASURY') || id.includes('CONTRIB') || id.includes('OFFERING') || name.includes('TITHE') || name.includes('FINANCE')) {
      return { category: 'Parish Stewardship & FAAP', icon: Coins, badge: 'STEWARDSHIP' };
    }
    if (id.includes('PROJECT') || id.includes('BUILDING') || id.includes('ASSET') || id.includes('PROPERTY') || name.includes('PROJECT') || name.includes('ASSET')) {
      return { category: 'Church Assets & Projects', icon: Hammer, badge: 'PROJECTS' };
    }
    if (id.includes('MINISTRY') || id.includes('SCC') || id.includes('WELFARE') || id.includes('COMMUNITY') || id.includes('CHARITY') || name.includes('MINISTRY') || name.includes('COMMUNITY')) {
      return { category: 'Ministries & Outreach', icon: Gift, badge: 'OUTREACH' };
    }
    return { category: 'Ecclesiastical Operations', icon: Building2, badge: 'CHURCH' };
  }

  // --- NURSERY & PRIMARY ---
  if (prod.includes('NURSERY') || prod.includes('PRIMARY') || prod.includes('BASIC')) {
    if (id.includes('HEAD') || id.includes('SMC') || id.includes('GOVERNANCE') || id.includes('QUALITY') || name.includes('HEAD') || name.includes('GOVERNANCE') || name.includes('SMC')) {
      return { category: 'Governance & Leadership', icon: Building2, badge: 'LEADERSHIP' };
    }
    if (id.includes('ADMISSION') || id.includes('SIS') || id.includes('ENROLL') || id.includes('RECORDS') || name.includes('ADMISSION') || name.includes('REGISTRY')) {
      return { category: 'Admissions & SIS', icon: Clipboard, badge: 'ADMISSIONS' };
    }
    if (id.includes('ECD') || id.includes('NURSERY') || id.includes('BABY') || id.includes('MIDDLE') || id.includes('TOP') || id.includes('MILESTONE') || name.includes('ECD') || name.includes('NURSERY')) {
      return { category: 'ECD & Nursery Academics', icon: Baby, badge: 'ECD' };
    }
    if (id.includes('DOS') || id.includes('PRIMARY') || id.includes('CURRICULUM') || id.includes('CLASS') || id.includes('TIMETABLE') || name.includes('PRIMARY') || name.includes('ACADEMIC') || name.includes('TIMETABLE')) {
      return { category: 'Primary Academic Affairs', icon: BookOpen, badge: 'P.1-P.7' };
    }
    if (id.includes('EXAM') || id.includes('PLE') || id.includes('ASSESSMENT') || id.includes('REPORT') || name.includes('EXAM') || name.includes('PLE') || name.includes('RESULTS')) {
      return { category: 'Examinations & Standards', icon: Award, badge: 'PLE' };
    }
    if (id.includes('BURSAR') || id.includes('FINANCE') || id.includes('FEE') || id.includes('VOTE') || id.includes('STORE') || id.includes('PROC') || name.includes('BURSAR') || name.includes('FEE') || name.includes('FINANCE')) {
      return { category: 'Bursar & FAAP Finance', icon: DollarSign, badge: 'BURSAR' };
    }
    if (id.includes('CLINIC') || id.includes('HEALTH') || id.includes('HOSTEL') || id.includes('CATERING') || id.includes('MEAL') || id.includes('TRANSPORT') || id.includes('SAFEGUARD') || name.includes('HEALTH') || name.includes('WELFARE') || name.includes('TRANSPORT')) {
      return { category: 'Pupil Welfare & Operations', icon: HeartPulse, badge: 'WELFARE' };
    }
    return { category: 'Primary Operations', icon: GraduationCap, badge: 'PRIMARY' };
  }

  // --- SECONDARY ---
  if (prod.includes('SECONDARY') || prod.includes('SEC')) {
    if (id.includes('PRINCIPAL') || id.includes('SENATE') || id.includes('BOG') || id.includes('COUNCIL') || name.includes('PRINCIPAL') || name.includes('SENATE') || name.includes('GOVERNANCE')) {
      return { category: 'Executive & Senate Governance', icon: ShieldCheck, badge: 'SENATE' };
    }
    if (id.includes('REGISTRAR') || id.includes('SIS') || id.includes('ADMISSION') || id.includes('STUDENT') || name.includes('REGISTRAR') || name.includes('ADMISSION')) {
      return { category: 'Registrar & Student Records', icon: Users, badge: 'REGISTRAR' };
    }
    if (id.includes('DOS') || id.includes('ACADEMIC') || id.includes('COMBINATION') || id.includes('SUBJECT') || id.includes('TIMETABLE') || name.includes('DOS') || name.includes('ACADEMIC') || name.includes('CURRICULUM')) {
      return { category: 'Academic Affairs (O & A Level)', icon: BookOpen, badge: 'ACADEMICS' };
    }
    if (id.includes('UNEB') || id.includes('EXAM') || id.includes('CENTER') || id.includes('TRANSCRIPT') || name.includes('UNEB') || name.includes('EXAM')) {
      return { category: 'UNEB & National Examinations', icon: Award, badge: 'UNEB' };
    }
    if (id.includes('LAB') || id.includes('SCIENCE') || id.includes('LIBRARY') || id.includes('FACILITY') || name.includes('LAB') || name.includes('LIBRARY')) {
      return { category: 'Laboratories & Learning Resources', icon: TestTube, badge: 'LABS' };
    }
    if (id.includes('BURSAR') || id.includes('FINANCE') || id.includes('FEES') || id.includes('PROC') || id.includes('STORE') || name.includes('BURSAR') || name.includes('FINANCE')) {
      return { category: 'Secondary Bursar & FAAP', icon: DollarSign, badge: 'BURSAR' };
    }
    if (id.includes('BOARDING') || id.includes('DORM') || id.includes('WARDEN') || id.includes('CLINIC') || id.includes('TRANSPORT') || id.includes('WELFARE') || name.includes('BOARDING') || name.includes('WELFARE')) {
      return { category: 'Boarding & Student Welfare', icon: Building2, badge: 'BOARDING' };
    }
    return { category: 'Secondary Operations', icon: GraduationCap, badge: 'SECONDARY' };
  }

  // --- ALUMNI ---
  if (prod.includes('ALUMNI') || prod.includes('ALUM')) {
    if (id.includes('DIR') || id.includes('BOARD') || id.includes('GOVERNANCE') || name.includes('BOARD') || name.includes('EXECUTIVE') || name.includes('GOVERNANCE')) {
      return { category: 'Advancement & Board Governance', icon: ShieldCheck, badge: 'BOARD' };
    }
    if (id.includes('CENSUS') || id.includes('REGISTRAR') || id.includes('DIRECTORY') || id.includes('MEMBER') || name.includes('CENSUS') || name.includes('DIRECTORY') || name.includes('ALUMNI')) {
      return { category: 'Alumni Census & Records', icon: Users, badge: 'CENSUS' };
    }
    if (id.includes('CHAPTER') || id.includes('GLOBAL') || id.includes('NETWORK') || id.includes('BRANCH') || name.includes('CHAPTER') || name.includes('GLOBAL')) {
      return { category: 'Global Chapters & Networks', icon: Globe, badge: 'CHAPTERS' };
    }
    if (id.includes('GIVING') || id.includes('ENDOWMENT') || id.includes('FUND') || id.includes('DONATION') || id.includes('CAMPAIGN') || name.includes('GIVING') || name.includes('DONATION') || name.includes('ENDOWMENT')) {
      return { category: 'Endowment & Capital Campaigns', icon: HeartPulse, badge: 'ENDOWMENT' };
    }
    if (id.includes('CAREER') || id.includes('MENTOR') || id.includes('JOB') || id.includes('INTERN') || name.includes('CAREER') || name.includes('MENTOR')) {
      return { category: 'Career & Mentorship Hub', icon: Briefcase, badge: 'CAREERS' };
    }
    if (id.includes('EVENT') || id.includes('REUNION') || id.includes('COMM') || id.includes('ENGAGE') || name.includes('EVENT') || name.includes('REUNION')) {
      return { category: 'Reunions & Engagement', icon: Calendar, badge: 'REUNIONS' };
    }
    return { category: 'Institutional Advancement', icon: Award, badge: 'ADVANCEMENT' };
  }

  // --- SOVEREIGN CONTROL ---
  if (prod.includes('CONTROL') || prod.includes('ADMIN')) {
    if (id.includes('STORE') || name.includes('STORE')) return { category: 'Platform Store & Extensions', icon: Package, badge: 'CATALOG' };
    if (id.includes('SECURITY') || id.includes('AEGIS') || name.includes('SECURITY')) return { category: 'AEGIS Zero Trust Security', icon: ShieldCheck, badge: 'SECURITY' };
    if (id.includes('AI') || name.includes('AI')) return { category: 'AI Command Center', icon: Sparkles, badge: 'AI GATEWAY' };
    if (id.includes('CLOUD') || id.includes('COMPUTE') || name.includes('CLOUD')) return { category: 'Cloud Infrastructure', icon: Cloud, badge: 'INFRA' };
    return { category: 'System Administration', icon: Sliders, badge: 'SYSTEM' };
  }

  return { category: 'General Operations', icon: LayoutGrid, badge: 'ENTERPRISE' };
}

/**
 * Authoritative canonical MasterModuleRegistry
 * Aggregates and enriches all modules across products with unified metadata.
 */
class MasterModuleRegistryService {
  private moduleMap: Map<string, MasterModuleDefinition> = new Map();
  private productModulesMap: Map<string, MasterModuleDefinition[]> = new Map();
  private initialized: boolean = false;

  constructor() {
    // Lazy bootstrap on demand to avoid circular module evaluation stalls
  }

  private bootstrapRegistry() {
    if (this.initialized) return;

    // 1. Ingest GlobalModuleRegistry safely
    const safeGlobalMods = Array.isArray(GlobalModuleRegistry) ? GlobalModuleRegistry : [];
    safeGlobalMods.forEach(gm => {
      if (!gm || !gm.id) return;
      const { category, icon, badge } = inferModuleCategory(gm);
      const caps = Array.isArray(GlobalCapabilityRegistry) ? GlobalCapabilityRegistry.filter(c => c && c.moduleId === gm.id) : [];
      
      const masterMod: MasterModuleDefinition = {
        ...gm,
        category: category || 'Enterprise Operations',
        icon: gm.icon || icon,
        badge: badge,
        capabilitiesCount: caps.length > 0 ? caps.length : 4,
        tags: [gm.productId, category, gm.owner]
      };
      this.moduleMap.set(masterMod.id, masterMod);
    });

    // 2. Ingest ModuleRegistry from products/registries safely
    const safeProductMods = Array.isArray(ModuleRegistry) ? ModuleRegistry : [];
    safeProductMods.forEach(mr => {
      if (!mr || !mr.id) return;
      if (!this.moduleMap.has(mr.id)) {
        let mappedProductId = mr.productId;
        if (mr.productId === 'JUMO-EDU-ALUMNI') {
          // Map to specific sovereign products if appropriate
          if (mr.id.includes('NURSERY') || mr.id.includes('PRIMARY') || mr.id.includes('ECD') || mr.id.includes('PUPIL') || mr.id.includes('PLE')) {
            mappedProductId = 'JUMO-NURSERY-PRIMARY-ERP';
          } else if (mr.id.includes('SECONDARY') || mr.id.includes('UNEB') || mr.id.includes('O_LEVEL') || mr.id.includes('A_LEVEL') || mr.id.includes('SENATE')) {
            mappedProductId = 'JUMO-SECONDARY-ERP';
          } else if (mr.id.includes('ALUM')) {
            mappedProductId = 'JUMO-ALUMNI';
          } else {
            mappedProductId = 'JUMO-NURSERY-PRIMARY-ERP';
          }
        }
        const { category, icon, badge } = inferModuleCategory({
          id: mr.id,
          productId: mappedProductId,
          name: mr.displayName || mr.name,
          description: mr.description
        });

        const masterMod: MasterModuleDefinition = {
          id: mr.id,
          productId: mappedProductId,
          name: mr.displayName || mr.name,
          description: mr.description,
          icon,
          isCore: true,
          status: 'ACTIVE',
          version: 'v16.2.0 LTS',
          owner: 'JUMO Enterprise Kernel',
          category,
          badge,
          capabilitiesCount: 4,
          tags: [mappedProductId, category]
        };
        this.moduleMap.set(masterMod.id, masterMod);
      }
    });

    // 2.5 Ingest Sovereign Control Center modules
    const controlModules: MasterModuleDefinition[] = [
      {
        id: 'MOD_CTRL_STORE',
        productId: 'JUMO-CONTROL',
        name: 'Platform Store & Extensions',
        description: 'Manage, install, and configure sovereign ERP extensions and platform domains.',
        icon: Package,
        isCore: true,
        status: 'ACTIVE',
        version: 'v18.0.0 LTS',
        owner: 'JUMO Platform Engineering',
        category: 'Platform Store & Extensions',
        badge: 'CATALOG',
        capabilitiesCount: 4,
        tags: ['JUMO-CONTROL', 'Platform Store & Extensions']
      },
      {
        id: 'MOD_CTRL_SECURITY',
        productId: 'JUMO-CONTROL',
        name: 'AEGIS Zero Trust Security',
        description: 'Zero-trust RBAC/ABAC enforcement, tenant isolation, and cryptographic auditing.',
        icon: ShieldCheck,
        isCore: true,
        status: 'ACTIVE',
        version: 'v18.0.0 LTS',
        owner: 'JUMO Aegis Security Team',
        category: 'AEGIS Zero Trust Security',
        badge: 'SECURITY',
        capabilitiesCount: 4,
        tags: ['JUMO-CONTROL', 'AEGIS Zero Trust Security']
      },
      {
        id: 'MOD_CTRL_AI',
        productId: 'JUMO-CONTROL',
        name: 'AI Command Center',
        description: 'Multi-model cognitive gateway routing, agent registry, and model token metering.',
        icon: Sparkles,
        isCore: true,
        status: 'ACTIVE',
        version: 'v18.0.0 LTS',
        owner: 'JUMO AI Engineering',
        category: 'AI Command Center',
        badge: 'AI GATEWAY',
        capabilitiesCount: 4,
        tags: ['JUMO-CONTROL', 'AI Command Center']
      },
      {
        id: 'MOD_CTRL_CLOUD',
        productId: 'JUMO-CONTROL',
        name: 'Sovereign Cloud Console',
        description: 'Cluster node topology, database sync, distributed runtimes, and health diagnostics.',
        icon: Cloud,
        isCore: true,
        status: 'ACTIVE',
        version: 'v18.0.0 LTS',
        owner: 'JUMO Cloud Operations',
        category: 'Cloud Infrastructure',
        badge: 'INFRA',
        capabilitiesCount: 4,
        tags: ['JUMO-CONTROL', 'Cloud Infrastructure']
      },
      {
        id: 'MOD_CTRL_DIAG',
        productId: 'JUMO-CONTROL',
        name: 'System Diagnostics & Audit',
        description: 'Full runtime diagnostic verification, ledger integrity checks, and error boundaries.',
        icon: Sliders,
        isCore: true,
        status: 'ACTIVE',
        version: 'v18.0.0 LTS',
        owner: 'JUMO Core Kernel',
        category: 'System Administration',
        badge: 'SYSTEM',
        capabilitiesCount: 4,
        tags: ['JUMO-CONTROL', 'System Administration']
      }
    ];

    controlModules.forEach(cm => {
      if (!this.moduleMap.has(cm.id)) {
        this.moduleMap.set(cm.id, cm);
      }
    });

    // 3. Group by productId
    this.productModulesMap.clear();
    this.moduleMap.forEach(mod => {
      const list = this.productModulesMap.get(mod.productId) || [];
      list.push(mod);
      this.productModulesMap.set(mod.productId, list);
    });

    this.initialized = true;
  }

  public getAllModules(): MasterModuleDefinition[] {
    this.bootstrapRegistry();
    return Array.from(this.moduleMap.values());
  }

  public getModulesForProduct(productId: string): MasterModuleDefinition[] {
    this.bootstrapRegistry();
    const direct = this.productModulesMap.get(productId) || [];
    if (direct.length > 0) return direct;

    // Fallback normalization
    const upper = productId.toUpperCase();
    const filtered = Array.from(this.moduleMap.values()).filter(m => {
      if (m.productId.toUpperCase() === upper) return true;
      if (upper.includes('FINTECH') && m.productId.includes('FINTECH')) return true;
      if (upper.includes('CHURCH') && m.productId.includes('CHURCH')) return true;
      if (upper.includes('NURSERY') && m.productId.includes('NURSERY')) return true;
      if (upper.includes('SECONDARY') && m.productId.includes('SECONDARY')) return true;
      if (upper.includes('ALUMNI') && m.productId.includes('ALUMNI')) return true;
      return false;
    });
    return filtered;
  }

  public getModuleById(moduleId: string): MasterModuleDefinition | undefined {
    this.bootstrapRegistry();
    return this.moduleMap.get(moduleId);
  }

  public searchModules(productId: string, query: string, category?: string): MasterModuleDefinition[] {
    const list = this.getModulesForProduct(productId);
    const q = query.trim().toLowerCase();
    
    return list.filter(mod => {
      const matchCategory = !category || category === 'ALL' || mod.category.toLowerCase() === category.toLowerCase();
      if (!matchCategory) return false;
      if (!q) return true;
      return (
        mod.name.toLowerCase().includes(q) ||
        mod.id.toLowerCase().includes(q) ||
        mod.description.toLowerCase().includes(q) ||
        mod.category.toLowerCase().includes(q) ||
        (mod.badge && mod.badge.toLowerCase().includes(q))
      );
    });
  }

  public getCategoriesForProduct(productId: string): string[] {
    const mods = this.getModulesForProduct(productId);
    const catSet = new Set<string>();
    mods.forEach(m => {
      if (m.category) catSet.add(m.category);
    });
    return Array.from(catSet);
  }
}

export const MasterModuleRegistry = new MasterModuleRegistryService();
