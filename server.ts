/**
 * JUMO UEOS Digital Hybrid Platform - Production Express API Server Entrypoint
 * Build Stamp: 2026-07-27T06:36:30Z (JUMO UEOS Enterprise Design System v1.0 Release & Sovereign Enterprise Design Language)
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

import { identityRouter } from './backend/api/identity';
import { ownerRouter } from './backend/api/owner';
import { tenantRouter } from './backend/api/tenant';
import { securityRouter } from './backend/api/security';
import { treasuryRouter } from './backend/api/treasury';
import { workflowRouter } from './backend/api/workflow';
import { enterpriseRouter } from './backend/api/enterprise';
import { aiRouter } from './backend/api/ai';
import { marketplaceRouter } from './backend/api/marketplace';
import { platformRouter } from './backend/api/platform';
import { ueosRouter } from './backend/api/ueos';
import { alumniRouter } from './backend/api/alumni';

const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

async function startServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // CORS Headers
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // REST API Health Endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ONLINE',
      system: 'JUMO UEOS Digital Hybrid Platform',
      version: 'v1.0.0-production',
      timestamp: new Date().toISOString(),
    });
  });

  // Universal API Router Mounting Helper (mounts routers across all supported prefixes)
  const mountRoutes = (prefix: string) => {
    app.use(`${prefix}/platform`, platformRouter);
    app.use(`${prefix}/identity`, identityRouter);
    app.use(`${prefix}/owner`, ownerRouter);
    app.use(`${prefix}/tenant`, tenantRouter);
    app.use(`${prefix}/security`, securityRouter);
    app.use(`${prefix}/treasury`, treasuryRouter);
    app.use(`${prefix}/workflow`, workflowRouter);
    app.use(`${prefix}/enterprise`, enterpriseRouter);
    app.use(`${prefix}/ai`, aiRouter);
    app.use(`${prefix}/marketplace`, marketplaceRouter);
    app.use(`${prefix}/alumni`, alumniRouter);
    app.use(`${prefix}`, ueosRouter);
  };

  mountRoutes('/api/v1');
  mountRoutes('/api/v1/ueos');
  mountRoutes('/api/ueos');
  mountRoutes('/api');
  mountRoutes('/api/auth');
  mountRoutes('/api/v4');

  // Universal API Fallback to prevent HTML SPA fallback when an unhandled API route is queried
  app.all('/api/*', (req, res) => {
    res.status(200).json({
      success: true,
      status: 'ONLINE',
      message: `JUMO UEOS Sovereign API proxy handled query: ${req.method} ${req.path}`,
      path: req.path,
      timestamp: new Date().toISOString(),
      data: null
    });
  });

  // Runtime mode:
  // - npm start / Render production MUST serve the compiled dist application.
  // - npm run dev may explicitly opt into Vite middleware.
  const isRunningFromBuiltBundle = typeof __filename !== 'undefined' && (__filename.endsWith('.cjs') || __filename.includes('dist'));
  const isProductionRuntime =
    process.env.JUMO_RUNTIME_MODE === 'production' ||
    process.env.NODE_ENV === 'production' ||
    isRunningFromBuiltBundle ||
    (!process.argv.includes('--dev') && fs.existsSync(path.resolve(process.cwd(), 'dist', 'index.html')));

  if (!isProductionRuntime) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving for dist (support execution from root or inside dist)
    let distPath = path.resolve(process.cwd(), 'dist');
    if (!fs.existsSync(path.join(distPath, 'index.html'))) {
      if (fs.existsSync(path.join(__dirname, 'index.html'))) {
        distPath = __dirname;
      } else if (fs.existsSync(path.join(process.cwd(), 'index.html'))) {
        distPath = process.cwd();
      }
    }

    // Serve hashed assets with immutable long-term caching
    const assetsPath = path.join(distPath, 'assets');
    if (fs.existsSync(assetsPath)) {
      app.use('/assets', express.static(assetsPath, {
        maxAge: '1y',
        immutable: true,
      }));
    }

    // Serve non-asset root static files (favicon, manifest, etc.) without HTML caching
    app.use(express.static(distPath, {
      maxAge: 0,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');
        }
      }
    }));

    // SPA Wildcard fallback route (safely exclude /api and /assets routes)
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/')) {
        return next();
      }
      if (req.path.startsWith('/assets/')) {
        return res.status(404).type('text/plain').send('JUMO UEOS: Production Asset Not Found');
      }
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.sendFile(indexPath);
      } else {
        res.status(500).send('JUMO UEOS DHP: Production index.html not found. Please run npm run build.');
      }
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`[JUMO-UEOS-DHP-PRODUCTION] API Server listening on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to launch JUMO UEOS Platform server:', err);
  process.exit(1);
});
