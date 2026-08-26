/**
 * JUMO Universal Enterprise Operating System (UEOS)
 * Universal Registry Contract & Null-Safe Collection Specification
 * Enforces zero-undefined guarantees across all architectural levels:
 * Platform Kernel → Sovereign Product → Directorate → Department → Office → Portal → Module → Capability → UI Metadata → Runtime Component
 */

export interface RegistryDiagnostics {
  isHealthy: boolean;
  itemCount: number;
  hasDuplicates: boolean;
  duplicateKeys: string[];
  malformedCount: number;
  lastValidated: string;
  source: string;
}

export interface RegistryCollection<T> {
  readonly items: ReadonlyArray<T>;
  readonly version: string;
  readonly source: string;
  readonly totalCount: number;
  find(predicate: (item: T) => boolean): T | undefined;
  filter(predicate: (item: T) => boolean): T[];
  map<R>(mapper: (item: T, index: number) => R): R[];
  some(predicate: (item: T) => boolean): boolean;
  every(predicate: (item: T) => boolean): boolean;
  getById(id: string): T | undefined;
  getDiagnostics(): RegistryDiagnostics;
  [Symbol.iterator](): Iterator<T>;
}

class RegistryCollectionImpl<T> implements RegistryCollection<T> {
  readonly items: ReadonlyArray<T>;
  readonly version: string;
  readonly source: string;
  readonly totalCount: number;

  constructor(
    items: T[] | ReadonlyArray<T> | null | undefined,
    source: string = "JUMO_CORE_REGISTRY",
    version: string = "v18.0.0"
  ) {
    const safeItems: T[] = Array.isArray(items) 
      ? (items.filter(Boolean) as T[])
      : [];
    
    this.items = Object.freeze(safeItems);
    this.source = source || "JUMO_CORE_REGISTRY";
    this.version = version || "v18.0.0";
    this.totalCount = safeItems.length;
  }

  find(predicate: (item: T) => boolean): T | undefined {
    if (typeof predicate !== 'function') return undefined;
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item && predicate(item)) return item;
    }
    return undefined;
  }

  filter(predicate: (item: T) => boolean): T[] {
    if (typeof predicate !== 'function') return [];
    return (this.items as T[]).filter(item => item && predicate(item));
  }

  map<R>(mapper: (item: T, index: number) => R): R[] {
    if (typeof mapper !== 'function') return [];
    return (this.items as T[]).map((item, idx) => mapper(item, idx));
  }

  some(predicate: (item: T) => boolean): boolean {
    if (typeof predicate !== 'function') return false;
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item && predicate(item)) return true;
    }
    return false;
  }

  every(predicate: (item: T) => boolean): boolean {
    if (typeof predicate !== 'function') return true;
    if (this.items.length === 0) return true;
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (!item || !predicate(item)) return false;
    }
    return true;
  }

  getById(id: string): T | undefined {
    if (!id) return undefined;
    const targetId = String(id).toUpperCase();
    return this.find((item: any) => {
      if (!item) return false;
      const itemId = item.id || item.code || item.key || item.username;
      return itemId && String(itemId).toUpperCase() === targetId;
    });
  }

  getDiagnostics(): RegistryDiagnostics {
    const seen = new Set<string>();
    const duplicates: string[] = [];
    let malformed = 0;

    for (let i = 0; i < this.items.length; i++) {
      const item: any = this.items[i];
      if (!item || typeof item !== 'object') {
        malformed++;
        continue;
      }
      const key = item.id || item.code || item.username || item.key;
      if (key) {
        const kStr = String(key).toUpperCase();
        if (seen.has(kStr)) {
          duplicates.push(kStr);
        } else {
          seen.add(kStr);
        }
      }
    }

    return {
      isHealthy: malformed === 0 && duplicates.length === 0,
      itemCount: this.totalCount,
      hasDuplicates: duplicates.length > 0,
      duplicateKeys: Array.from(new Set(duplicates)),
      malformedCount: malformed,
      lastValidated: new Date().toISOString(),
      source: this.source
    };
  }

  [Symbol.iterator](): Iterator<T> {
    let index = 0;
    const items = this.items;
    return {
      next(): IteratorResult<T> {
        if (index < items.length) {
          return { value: items[index++], done: false };
        } else {
          return { value: undefined as any, done: true };
        }
      }
    };
  }
}

/**
 * Creates an immutable, null-safe RegistryCollection guaranteed to have items: []
 */
export function createRegistryCollection<T>(
  items: T[] | ReadonlyArray<T> | null | undefined = [],
  source: string = "JUMO_CORE_REGISTRY",
  version: string = "v18.0.0"
): RegistryCollection<T> {
  return new RegistryCollectionImpl<T>(items, source, version);
}

/**
 * Defensive helper functions that work on raw arrays or RegistryCollections
 */
export function safeFind<T>(
  collection: RegistryCollection<T> | T[] | undefined | null,
  predicate: (item: T) => boolean
): T | undefined {
  if (!collection) return undefined;
  if (typeof (collection as any).find === 'function') {
    return (collection as any).find(predicate);
  }
  const list = Array.isArray(collection) ? collection : (Array.isArray((collection as any).items) ? (collection as any).items : []);
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (item && predicate(item)) return item;
  }
  return undefined;
}

export function safeFilter<T>(
  collection: RegistryCollection<T> | T[] | undefined | null,
  predicate: (item: T) => boolean
): T[] {
  if (!collection) return [];
  if (typeof (collection as any).filter === 'function') {
    return (collection as any).filter(predicate);
  }
  const list = Array.isArray(collection) ? collection : (Array.isArray((collection as any).items) ? (collection as any).items : []);
  return list.filter(item => item && predicate(item));
}

export function safeMap<T, R>(
  collection: RegistryCollection<T> | T[] | undefined | null,
  mapper: (item: T, index: number) => R
): R[] {
  if (!collection) return [];
  if (typeof (collection as any).map === 'function') {
    return (collection as any).map(mapper);
  }
  const list = Array.isArray(collection) ? collection : (Array.isArray((collection as any).items) ? (collection as any).items : []);
  return list.filter(Boolean).map((item, idx) => mapper(item, idx));
}
