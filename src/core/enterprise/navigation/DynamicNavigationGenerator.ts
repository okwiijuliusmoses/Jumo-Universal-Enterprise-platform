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
import { MasterModuleRegistry, MasterModuleDefinition } from '../registry/MasterModuleRegistry';
import { ApprovedProductNavigationItem } from '../../../products/ApprovedProductRegistry';
import { OFFICE_TO_MODULE_MAP } from '../../../products/OfficeModuleMapping';

export interface DynamicNavigationItem {
  id: string;
  moduleId: string;
  label: string;
  description: string;
  icon: LucideIcon;
  category: string;
  badge?: string;
  isCore: boolean;
  version?: string;
  owner?: string;
  route?: string;
}

export interface DynamicNavigationGroup {
  id: string;
  name: string;
  icon: LucideIcon;
  badge?: string;
  items: DynamicNavigationItem[];
  count: number;
}

export interface DynamicNavigationSummary {
  productId: string;
  totalModules: number;
  totalCategories: number;
  groups: DynamicNavigationGroup[];
  flatItems: DynamicNavigationItem[];
}

/**
 * Category Icon Resolver
 */
function getCategoryIcon(categoryName: string): LucideIcon {
  const cat = categoryName.toUpperCase();
  if (cat.includes('GOVERNANCE') || cat.includes('EXECUTIVE') || cat.includes('LEADERSHIP') || cat.includes('SENATE') || cat.includes('BOARD')) return ShieldCheck;
  if (cat.includes('FAAP') || cat.includes('FINANCE') || cat.includes('TREASURY') || cat.includes('BURSAR') || cat.includes('STEWARDSHIP')) return Landmark;
  if (cat.includes('PAYMENT') || cat.includes('SWITCH') || cat.includes('MOMO')) return RefreshCw;
  if (cat.includes('BANKING') || cat.includes('SACCO') || cat.includes('LENDING')) return Building2;
  if (cat.includes('ACADEMIC') || cat.includes('CURRICULUM') || cat.includes('STUDY')) return BookOpen;
  if (cat.includes('ECD') || cat.includes('NURSERY')) return Baby;
  if (cat.includes('EXAM') || cat.includes('PLE') || cat.includes('UNEB')) return Award;
  if (cat.includes('ADMISSION') || cat.includes('SIS') || cat.includes('REGISTRAR') || cat.includes('CENSUS')) return Users;
  if (cat.includes('SACRAMENT') || cat.includes('PARISH') || cat.includes('MINISTRY')) return Heart;
  if (cat.includes('CHAPTER') || cat.includes('ALUMNI') || cat.includes('NETWORK')) return Globe;
  if (cat.includes('CAREER') || cat.includes('MENTOR')) return Briefcase;
  if (cat.includes('ENDOWMENT') || cat.includes('CAMPAIGN') || cat.includes('GIVING')) return HeartPulse;
  if (cat.includes('LAB') || cat.includes('SCIENCE')) return TestTube;
  if (cat.includes('WELFARE') || cat.includes('HEALTH') || cat.includes('CLINIC') || cat.includes('BOARDING')) return HeartPulse;
  if (cat.includes('COMPLIANCE') || cat.includes('AUDIT') || cat.includes('SECURITY')) return ShieldCheck;
  if (cat.includes('INFRA') || cat.includes('API') || cat.includes('DEV') || cat.includes('CLOUD')) return Code;
  if (cat.includes('INTELLIGENCE') || cat.includes('AI') || cat.includes('ANALYTICS')) return Sparkles;
  if (cat.includes('CATALOG') || cat.includes('STORE')) return Package;

  return LayoutGrid;
}

export class DynamicNavigationGeneratorService {
  /**
   * Generates hierarchical navigation groups for a given product ID
   */
  public generateNavigationGroups(productId: string): DynamicNavigationGroup[] {
    const modules = MasterModuleRegistry.getModulesForProduct(productId);
    const categoryMap = new Map<string, DynamicNavigationItem[]>();

    modules.forEach(mod => {
      const category = mod.category || 'General Operations';
      const navItem: DynamicNavigationItem = {
        id: mod.id,
        moduleId: mod.id,
        label: mod.name,
        description: mod.description,
        icon: mod.icon || LayoutGrid,
        category: category,
        badge: mod.badge,
        isCore: mod.isCore,
        version: mod.version,
        owner: mod.owner
      };

      const existing = categoryMap.get(category) || [];
      existing.push(navItem);
      categoryMap.set(category, existing);
    });

    const groups: DynamicNavigationGroup[] = [];
    categoryMap.forEach((items, catName) => {
      groups.push({
        id: `GROUP_${catName.replace(/\s+/g, '_').toUpperCase()}`,
        name: catName,
        icon: getCategoryIcon(catName),
        items: items,
        count: items.length
      });
    });

    // Sort groups prioritizing Governance/Executive and Core first
    return groups.sort((a, b) => {
      const aName = a.name.toUpperCase();
      const bName = b.name.toUpperCase();
      if (aName.includes('GOVERNANCE') || aName.includes('EXECUTIVE') || aName.includes('LEADERSHIP')) return -1;
      if (bName.includes('GOVERNANCE') || bName.includes('EXECUTIVE') || bName.includes('LEADERSHIP')) return 1;
      if (aName.includes('CORE') || aName.includes('FAAP') || aName.includes('ACADEMIC') || aName.includes('CENSUS')) return -1;
      if (bName.includes('CORE') || bName.includes('FAAP') || bName.includes('ACADEMIC') || bName.includes('CENSUS')) return 1;
      return a.name.localeCompare(b.name);
    });
  }

  /**
   * Generates flat navigation items compatible with ApprovedProductNavigationItem
   */
  public generateFlatNavigation(productId: string): ApprovedProductNavigationItem[] {
    const modules = MasterModuleRegistry.getModulesForProduct(productId);
    const flat: ApprovedProductNavigationItem[] = [
      {
        id: 'home',
        label: 'Home & Overview',
        icon: LayoutGrid,
        category: 'Overview'
      }
    ];

    modules.forEach(mod => {
      flat.push({
        id: mod.id,
        label: mod.name,
        icon: mod.icon || LayoutGrid,
        category: mod.category || 'General'
      });
    });

    return flat;
  }

  /**
   * Full summary of dynamic navigation for a product
   */
  public getNavigationSummary(productId: string): DynamicNavigationSummary {
    const groups = this.generateNavigationGroups(productId);
    const flatItems = groups.flatMap(g => g.items);

    return {
      productId,
      totalModules: flatItems.length,
      totalCategories: groups.length,
      groups,
      flatItems
    };
  }

  /**
   * Dynamic search and filter across product modules
   */
  public queryNavigation(productId: string, query: string, activeCategory?: string): DynamicNavigationItem[] {
    const matchingMods = MasterModuleRegistry.searchModules(productId, query, activeCategory);
    return matchingMods.map(m => ({
      id: m.id,
      moduleId: m.id,
      label: m.name,
      description: m.description,
      icon: m.icon,
      category: m.category,
      badge: m.badge,
      isCore: m.isCore,
      version: m.version,
      owner: m.owner
    }));
  }
}

export const DynamicNavigationGenerator = new DynamicNavigationGeneratorService();
