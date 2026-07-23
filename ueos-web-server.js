/**
 * JUMO Universal Enterprise Operating System (UEOS)
 * Production Web Server Entrypoint for Deployed Environments (e.g., Render Web Services)
 * 
 * This file orchestrates the bootstrap pipeline:
 * 1. Checks if production build artifacts exist (Vite static build & esbuild bundled server)
 * 2. Compiles the application on-the-fly if missing or out of sync
 * 3. Launches the compiled CommonJS Sovereign Core Server
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("\n=======================================================");
console.log(" JUMO UNIVERSAL ENTERPRISE OPERATING SYSTEM (UEOS-DHP) ");
console.log("   --- SOVEREIGN HYBRID PRODUCTION STARTUP ACTIVE ---   ");
console.log("=======================================================\n");

const SERVER_BUNDLE_PATH = path.join(__dirname, "dist", "server.cjs");
const STATIC_INDEX_PATH = path.join(__dirname, "experience", "public", "index.html");

// Determine if we need to compile the production bundle
let needsBuild = false;

if (!fs.existsSync(SERVER_BUNDLE_PATH)) {
  console.log(`[BOOT] Missing compiled server bundle: ${SERVER_BUNDLE_PATH}`);
  needsBuild = true;
}

if (!fs.existsSync(STATIC_INDEX_PATH)) {
  console.log(`[BOOT] Missing compiled static assets: ${STATIC_INDEX_PATH}`);
  needsBuild = true;
}

if (needsBuild) {
  console.log("[BOOT] Initiating on-the-fly compilation of JUMO UEOS platform...");
  try {
    console.log("[BUILD] Executing: npm run build");
    execSync("npm run build", { stdio: "inherit", cwd: __dirname });
    console.log("[BUILD] Compilation completed successfully. All artifacts verified.");
  } catch (error) {
    console.error("[BUILD_ERROR] Compilation pipeline failed:", error);
    process.exit(1);
  }
} else {
  console.log("[BOOT] Verified pre-existing production build artifacts.");
}

console.log("[BOOT] Loading JUMO UEOS Sovereign Core Server...");
try {
  // Execute the compiled CommonJS server bundle
  await import("./dist/server.cjs");
} catch (error) {
  console.error("[BOOT_ERROR] Fatal crash during Sovereign Core initialization:", error);
  process.exit(1);
}
