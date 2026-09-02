import React from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { CanonicalProductHierarchy } from '../../products/canonical/types';
import { getCanonicalProduct, CANONICAL_PRODUCT_MAP } from '../../products/canonical';
import { getProductUIRegistry } from '../../products/ProductWorkspaceRegistry';
import { GenericMetadataWorkspace } from './GenericMetadataWorkspace';
import { CherpStandaloneApp } from '../../products/cherp/ui/CherpStandaloneApp';
import { FintechStandaloneApp } from '../../products/fintech/ui/FintechStandaloneApp';
import { SecerpStandaloneApp } from '../../products/secondary/ui/SecerpStandaloneApp';
import { NperpStandaloneApp } from '../../products/nursery-primary/ui/NperpStandaloneApp';

export interface ProductWorkspaceComponentProps {
  productId: string;
  onBack?: () => void;
  initialHierarchy?: CanonicalProductHierarchy;
}

export function ProductWorkspaceComponent({ 
  productId, 
  onBack,
  initialHierarchy 
}: ProductWorkspaceComponentProps) {
  // 1. ROUTE TO INDEPENDENT STANDALONE APPLICATION SHELLS FOR PRIMARY SOVEREIGN PRODUCTS
  if (productId === 'prod-church-faith' || productId === 'CHERP' || productId === 'JUMO-CHURCH') {
    return <CherpStandaloneApp onBackToLauncher={onBack} />;
  }
  if (productId === 'prod-fintech' || productId === 'FTERP' || productId === 'JUMO-FINTECH') {
    return <FintechStandaloneApp onBackToLauncher={onBack} />;
  }
  if (productId === 'prod-secondary-school' || productId === 'SECERP' || productId === 'JUMO-SECONDARY-ERP') {
    return <SecerpStandaloneApp onBackToLauncher={onBack} />;
  }
  if (productId === 'prod-nursery-primary' || productId === 'NPERP' || productId === 'JUMO-NURSERY-PRIMARY-ERP') {
    return <NperpStandaloneApp onBackToLauncher={onBack} />;
  }

  // 2. CONSUME PRODUCT-SPECIFIC UI REGISTRY & CANONICAL HIERARCHY
  const uiRegistry = getProductUIRegistry(productId);
  const hierarchy: CanonicalProductHierarchy | undefined = 
    initialHierarchy || getCanonicalProduct(productId) || CANONICAL_PRODUCT_MAP[productId] || CANONICAL_PRODUCT_MAP[uiRegistry.productId];

  if (!hierarchy) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 flex items-center justify-center font-sans">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-slate-900">Product Workspace Not Found</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            No canonical product hierarchy is registered for product ID <code className="bg-slate-100 px-2 py-1 rounded text-slate-800 font-mono font-bold">{productId}</code>.
          </p>
          {onBack && (
            <button
              onClick={onBack}
              className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Sovereign Products Grid
            </button>
          )}
        </div>
      </div>
    );
  }

  // 3. RENDER VIA GENERIC METADATA-DRIVEN WORKSPACE RENDERER
  return (
    <GenericMetadataWorkspace
      uiRegistry={uiRegistry}
      hierarchy={hierarchy}
      onBack={onBack}
    />
  );
}
