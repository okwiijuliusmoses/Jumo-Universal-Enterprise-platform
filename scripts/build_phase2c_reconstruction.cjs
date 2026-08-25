const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const CORE_REG_DIR = path.join(ROOT_DIR, "src/core/enterprise/registry");
const UI_RECOVERY_DIR = path.join(ROOT_DIR, "src/recovery/ui");
const REPORTS_DIR = path.join(ROOT_DIR, "src/recovery/reports");
const TESTS_DIR = path.join(ROOT_DIR, "tests/recovery");

fs.mkdirSync(CORE_REG_DIR, { recursive: true });
fs.mkdirSync(UI_RECOVERY_DIR, { recursive: true });
fs.mkdirSync(REPORTS_DIR, { recursive: true });
fs.mkdirSync(TESTS_DIR, { recursive: true });

console.log("[Phase 2C Builder] Generating Universal Registry Contracts & UI Metadata Engine...");

// 1. UniversalRegistryContract.ts
const contractContent = `/**
 * JUMO Universal Enterprise Operating System (UEOS)
 * Universal Registry Contract & Null-Safe Collection Specification
 * Enforces zero-undefined guarantees across all 10 architectural levels.
 */

export interface RegistryCollection<T> {
  readonly items: ReadonlyArray<T>;
  readonly version: string;
  readonly source: string;
  readonly totalCount: number;
}

export function createRegistryCollection<T>(
  items: T[] = [],
  source: string = "JUMO_CORE_REGISTRY",
  version: string = "v18.0.0"
): RegistryCollection<T> {
  const safeItems = Array.isArray(items) ? items.filter(Boolean) : [];
  return {
    items: Object.freeze(safeItems),
    version,
    source,
    totalCount: safeItems.length
  };
}

export function safeFind<T>(
  collection: RegistryCollection<T> | T[] | undefined | null,
  predicate: (item: T) => boolean
): T | undefined {
  if (!collection) return undefined;
  const list = Array.isArray(collection) ? collection : (Array.isArray(collection.items) ? collection.items : []);
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
  const list = Array.isArray(collection) ? collection : (Array.isArray(collection.items) ? collection.items : []);
  return list.filter(item => item && predicate(item));
}

export function safeMap<T, R>(
  collection: RegistryCollection<T> | T[] | undefined | null,
  mapper: (item: T, index: number) => R
): R[] {
  if (!collection) return [];
  const list = Array.isArray(collection) ? collection : (Array.isArray(collection.items) ? collection.items : []);
  return list.filter(Boolean).map((item, idx) => mapper(item, idx));
}
`;

fs.writeFileSync(path.join(CORE_REG_DIR, "UniversalRegistryContract.ts"), contractContent, "utf8");
console.log("✓ Created UniversalRegistryContract.ts");

