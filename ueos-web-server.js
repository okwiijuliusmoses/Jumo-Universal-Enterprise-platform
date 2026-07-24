/**
 * JUMO Universal Enterprise Operating System (UEOS) - Digital Hybrid Platform (DHP)
 * Unified Production Web Server Entrypoint
 *
 * Requirements:
 * 1. Node CommonJS & ES Module dual-compatibility.
 * 2. Runnable via: `node ueos-web-server.js`
 * 3. Serves production frontend from: `experience/public`
 * 4. Root route `/` serves JUMO UEOS Runtime experience (experience/public/index.html)
 * 5. Clean runtime without legacy Blueprint Architect or ExperienceRuntime dark demo routes
 * 6. Preserves all `/api/*` endpoints
 * 7. SPA Fallback: Unknown non-API routes resolve to experience/public/index.html
 * 8. Enabled CORS for Firebase/JUMO domains
 * 9. Health check endpoint: GET /health -> { status: "healthy", platform: "JUMO UEOS-DHP" }
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

let dirname = process.cwd();
try {
  if (typeof import.meta !== "undefined" && import.meta.url) {
    const filename = fileURLToPath(import.meta.url);
    dirname = path.dirname(filename);
  }
} catch (e) {
  dirname = __dirname;
}

const SERVER_BUNDLE_PATH = path.join(dirname, "dist", "server.cjs");
const STATIC_INDEX_PATH = path.join(dirname, "experience", "public", "index.html");

console.log("\n=======================================================");
console.log(" JUMO UNIVERSAL ENTERPRISE OPERATING SYSTEM (UEOS-DHP) ");
console.log("    --- UNIFIED PRODUCTION RUNTIME STARTUP ACTIVE ---   ");
console.log("=======================================================\n");

// 1. Verify and compile build artifacts if missing or out of date
let needsBuild = false;

if (!fs.existsSync(SERVER_BUNDLE_PATH)) {
  console.log(`[BOOT] Missing compiled server bundle: ${SERVER_BUNDLE_PATH}`);
  needsBuild = true;
}

if (!fs.existsSync(STATIC_INDEX_PATH)) {
  console.log(`[BOOT] Missing static frontend index: ${STATIC_INDEX_PATH}`);
  needsBuild = true;
}

if (needsBuild) {
  console.log("[BOOT] Building JUMO UEOS production assets...");
  try {
    execSync("npm run build", { stdio: "inherit", cwd: dirname });
    console.log("[BUILD] Build pipeline completed successfully.");
  } catch (error) {
    console.error("[BUILD_ERROR] Compilation failed:", error);
    process.exit(1);
  }
} else {
  console.log("[BOOT] Verified production build artifacts (dist/server.cjs & experience/public/index.html).");
}

console.log("[BOOT] Launching JUMO UEOS Unified Production Server...");
try {
  // Execute compiled server bundle
  await import("./dist/server.cjs");
} catch (error) {
  console.error("[BOOT_ERROR] Failed to start JUMO UEOS production runtime:", error);
  process.exit(1);
}
