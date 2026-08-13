import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// API Routes
app.post('/api/v1/ueos/ai/chat', (req, res) => {
  const { message, studio } = req.body;
  res.json({
    reply: `[JUMO Sovereign AI — ${studio || 'OVERVIEW'}] Acknowledged instruction: "${message || 'Status Check'}". Sovereign telemetry & compliance verification active.`
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'HEALTHY', timestamp: new Date().toISOString(), system: 'JUMO UEOS Sovereign Command' });
});

// Serve static files
const staticPath = path.join(__dirname, 'dist');
app.use(express.static(staticPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'), (err) => {
    if (err) {
      res.status(200).send(`<!DOCTYPE html><html><head><title>JUMO UEOS</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>`);
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`JUMO UEOS Sovereign Server running on http://0.0.0.0:${PORT}`);
});
