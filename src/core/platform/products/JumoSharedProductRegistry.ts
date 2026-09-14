import {
  JumoCommercialProductDefinition,
} from './JumoCommercialProductDefinition';

class JumoSharedProductRegistry {

  public has(productId: string): boolean {
    return this.products.has(productId);
  }


  private readonly products =
    new Map<string, JumoCommercialProductDefinition>();

  register(
    product: JumoCommercialProductDefinition
  ): JumoCommercialProductDefinition {

    if (!product.id) {
      throw new Error('Shared product requires an ID.');
    }

    if (!product.name) {
      throw new Error(
        `Shared product ${product.id} requires a name.`
      );
    }

    this.products.set(product.id, product);

    return product;
  }

  upsert(
    product: JumoCommercialProductDefinition
  ) {
    return this.register(product);
  }

  get(
    id: string
  ): JumoCommercialProductDefinition | undefined {
    return this.products.get(id);
  }

  require(
    id: string
  ): JumoCommercialProductDefinition {
    const product = this.get(id);

    if (!product) {
      throw new Error(
        `JUMO product not registered: ${id}`
      );
    }

    return product;
  }

  list(): JumoCommercialProductDefinition[] {
    return Array.from(this.products.values());
  }

  shared(): JumoCommercialProductDefinition[] {
    return this.list().filter(product => product.shared);
  }

  authoritative(): JumoCommercialProductDefinition[] {
    return this.list().filter(
      product => product.authoritative
    );
  }

  manufacturable(): JumoCommercialProductDefinition[] {
    return this.list().filter(
      product => product.manufacturable
    );
  }

  remove(id: string): boolean {
    return this.products.delete(id);
  }

  status() {
    return {
      totalProducts: this.products.size,
      sharedProducts: this.shared().length,
      authoritativeProducts:
        this.authoritative().length,
      manufacturableProducts:
        this.manufacturable().length,

      fixedProductLimit: false,
      dynamicRegistration: true,
    };
  }
}

export const JUMO_SHARED_PRODUCT_REGISTRY =
  new JumoSharedProductRegistry();

export { JumoSharedProductRegistry };
