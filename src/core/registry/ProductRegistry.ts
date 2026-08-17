export interface ProductRecord {
  id: string;
  name: string;
  version: string;
  ecosystemId: string;
  domain: string;
  lifecycleState: 'DRAFT' | 'ENGINEERING' | 'MANUFACTURING' | 'CERTIFIED' | 'DEPLOYED' | 'RETIRED';
  owner: string;
}

export class ProductRegistry {
  private static instance: ProductRegistry;
  private products: Map<string, ProductRecord> = new Map();

  private constructor() {
    this.seedDefaults();
  }

  public static getInstance(): ProductRegistry {
    if (!ProductRegistry.instance) {
      ProductRegistry.instance = new ProductRegistry();
    }
    return ProductRegistry.instance;
  }

  private seedDefaults() {
    this.register({
      id: 'PROD-FIN-01',
      name: 'Integrated Financial Management System',
      version: '1.0.0',
      ecosystemId: 'ECO-ERP-01',
      domain: 'Public Finance',
      lifecycleState: 'DEPLOYED',
      owner: 'Treasury'
    });
    this.register({
      id: 'PROD-EDU-01',
      name: 'Atutur Seed Secondary School OS',
      version: '1.2.0',
      ecosystemId: 'ECO-EDU-01',
      domain: 'Secondary Education',
      lifecycleState: 'ENGINEERING',
      owner: 'Ministry of Education'
    });
  }

  public register(product: ProductRecord) {
    this.products.set(product.id, product);
  }

  public getProduct(id: string): ProductRecord | undefined {
    return this.products.get(id);
  }

  public getProductsByEcosystem(ecosystemId: string): ProductRecord[] {
    return Array.from(this.products.values()).filter(p => p.ecosystemId === ecosystemId);
  }

  public getAllProducts(): ProductRecord[] {
    return Array.from(this.products.values());
  }
}
