// Diagnostic script to scan for runtime parity and missing references
import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

function scanDirectory(dir: string, patterns: RegExp[]) {
  const files = readdirSync(dir);
  files.forEach(file => {
    const path = join(dir, file);
    if (existsSync(path) && readdirSync(path).length === 0) return; // Simplified check
    if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = readFileSync(path, 'utf-8');
      patterns.forEach(pattern => {
        if (pattern.test(content)) {
          console.log(`[FOUND] ${path} matches ${pattern}`);
        }
      });
    } else if (existsSync(path) && !file.includes('node_modules')) {
      try { scanDirectory(path, patterns); } catch (e) {}
    }
  });
}

const patterns = [
  /\.slice\(/,
  /\.map\(/,
  /\.join\(/,
  /ShieldCheck/
];

console.log("Starting Runtime Parity Scan...");
scanDirectory('./src', patterns);
console.log("Scan Complete.");
