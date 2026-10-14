import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// API Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'PX CUSTON — Eventos, Carros e Experiências',
    phase: 'FASE 1 — Fundação Técnica & Identidade Visual',
    node_version: process.version,
    supabase_configured: Boolean(process.env.VITE_SUPABASE_URL && process.env.VITE_SUPABASE_ANON_KEY),
    mercado_pago_configured: Boolean(process.env.MP_ACCESS_TOKEN || process.env.MP_PUBLIC_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Events listing API
app.get('/api/events', (req: Request, res: Response) => {
  res.json({
    events: [
      {
        id: 'evt-mega-encontro-2025',
        title: 'MEGA ENCONTRO PX CUSTON',
        date: '15 NOV 2025',
        location: 'Parque de Exposições — Manhuaçu/MG',
        min_price: 40.0,
        status: 'published',
      },
      {
        id: 'evt-racha-som-2025',
        title: 'RACHA DE SOM',
        date: '06 DEZ 2025',
        location: 'Arena Automotiva — Manhuaçu/MG',
        min_price: 30.0,
        status: 'published',
      },
      {
        id: 'evt-carros-antigos-2025',
        title: 'CARROS ANTIGOS & CUSTOM',
        date: '20 DEZ 2025',
        location: 'Praça Central — Manhuaçu/MG',
        min_price: 50.0,
        status: 'published',
      },
    ],
  });
});

// Check-in Ticket validation endpoint
app.post('/api/tickets/validate', (req: Request, res: Response) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ valid: false, message: 'Código não fornecido' });
  }

  const clean = String(code).trim().toUpperCase();
  if (clean === 'PX-7AI89C10') {
    return res.json({
      valid: true,
      code: clean,
      event: 'MEGA ENCONTRO PX CUSTON',
      holder: 'Deivid J. Silva',
      batch: 'Pista (Entrada Geral)',
      status: 'success',
      timestamp: new Date().toISOString(),
    });
  }

  if (clean === 'PX-4M29L8X1') {
    return res.json({
      valid: true,
      code: clean,
      event: 'RACHA DE SOM',
      holder: 'Deivid J. Silva',
      batch: 'Pista Geral',
      status: 'success',
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(404).json({
    valid: false,
    code: clean,
    message: 'Ingresso não encontrado ou inválido para este evento.',
  });
});

// Mercado Pago Payment Preference stub for Phase 1 / Phase 2 preparation
app.post('/api/payments/create-preference', (req: Request, res: Response) => {
  const { items, buyer } = req.body;
  const preferenceId = `pref_${Date.now()}_px`;

  res.json({
    success: true,
    preference_id: preferenceId,
    init_point: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${preferenceId}`,
    sandbox_init_point: `https://sandbox.mercadopago.com.br/checkout/v1/redirect?pref_id=${preferenceId}`,
    status: 'pending',
  });
});

// Cache purge endpoint
app.post('/api/cache/purge', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Cache de páginas e assets estáticos purgado com sucesso.',
    timestamp: new Date().toISOString(),
  });
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 [PX CUSTON] Servidor rodando em http://localhost:${PORT}`);
    console.log(`📦 Modo: ${isProd ? 'Produção' : 'Desenvolvimento com Vite'}`);
  });
}

startServer().catch((err) => {
  console.error('Falha ao iniciar servidor PX CUSTON:', err);
  process.exit(1);
});
