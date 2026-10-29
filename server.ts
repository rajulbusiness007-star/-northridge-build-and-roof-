import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

interface StoredQuote {
  id: string;
  name: string;
  phone: string;
  email: string;
  zip: string;
  propertyType: string;
  service: string;
  notes: string;
  preferredContact: string;
  photosCount: number;
  estimateDetails?: any;
  createdAt: string;
}

interface StoredInspection {
  bookingId: string;
  inspectionType: string;
  date: string;
  timeSlot: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  zip: string;
  notes?: string;
  createdAt: string;
}

const quotesStore: StoredQuote[] = [
  {
    id: 'NR-2026-9102',
    name: 'David Sterling',
    phone: '(214) 555-8391',
    email: 'd.sterling@example.com',
    zip: '75205',
    propertyType: 'residential',
    service: 'Complete Roof Replacement',
    notes: 'Interested in Class 4 impact shingles after recent hail storm in University Park.',
    preferredContact: 'phone',
    photosCount: 2,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  }
];

const inspectionsStore: StoredInspection[] = [
  {
    bookingId: 'INS-748291',
    inspectionType: '21_point',
    date: '2026-11-03',
    timeSlot: 'morning',
    name: 'Sarah Jenkins',
    phone: '(214) 555-3920',
    email: 'sjenkins@example.com',
    address: '6810 Meadow Wood Way',
    zip: '75024',
    notes: 'Pre-purchase inspection for buyer due-diligence.',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  }
];

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const rateLimit = (req: Request, res: Response, next: () => void) => {
  const ip = req.ip || 'anonymous';
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (record && now < record.resetTime) {
    if (record.count >= 25) {
      return res.status(429).json({ error: 'Too many requests. Please wait a few moments.' });
    }
    record.count++;
  } else {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });
  }
  next();
};

app.post('/api/quotes', rateLimit, (req: Request, res: Response) => {
  const { name, phone, email, zip, propertyType, service, notes, preferredContact, photos, estimateDetails } = req.body;

  if (!name || !phone || !zip) {
    return res.status(400).json({ error: 'Name, phone number, and property ZIP are required.' });
  }

  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length < 10) {
    return res.status(400).json({ error: 'Please enter a valid 10-digit phone number.' });
  }

  const quoteId = 'NR-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
  const newQuote: StoredQuote = {
    id: quoteId,
    name: String(name).trim(),
    phone: String(phone).trim(),
    email: String(email || '').trim(),
    zip: String(zip).trim(),
    propertyType: propertyType || 'residential',
    service: service || 'Roof Replacement',
    notes: String(notes || '').trim(),
    preferredContact: preferredContact || 'phone',
    photosCount: Array.isArray(photos) ? photos.length : 0,
    estimateDetails,
    createdAt: new Date().toISOString(),
  };

  quotesStore.unshift(newQuote);
  return res.status(201).json({
    success: true,
    quoteId,
    message: 'Your roofing estimate request has been logged successfully. An estimator will contact you within 2 business hours.',
  });
});

app.get('/api/quotes', (_req: Request, res: Response) => {
  res.json({ quotes: quotesStore });
});

app.post('/api/inspections', rateLimit, (req: Request, res: Response) => {
  const { inspectionType, date, timeSlot, name, phone, email, address, zip, notes } = req.body;

  if (!name || !phone || !date || !timeSlot || !address) {
    return res.status(400).json({ error: 'Name, phone, date, arrival window, and address are required.' });
  }

  const bookingId = 'INS-' + Math.floor(100000 + Math.random() * 900000);
  const newInspection: StoredInspection = {
    bookingId,
    inspectionType: inspectionType || '21_point',
    date,
    timeSlot,
    name: String(name).trim(),
    phone: String(phone).trim(),
    email: String(email || '').trim(),
    address: String(address).trim(),
    zip: String(zip || '').trim(),
    notes: String(notes || '').trim(),
    createdAt: new Date().toISOString(),
  };

  inspectionsStore.unshift(newInspection);
  return res.status(201).json({
    success: true,
    bookingId,
    message: 'Inspection booked successfully.',
  });
});

app.get('/api/inspections', (_req: Request, res: Response) => {
  res.json({ inspections: inspectionsStore });
});

app.get('/robots.txt', (_req: Request, res: Response) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Sitemap: ${process.env.APP_URL || 'https://northridgebuildroof.com'}/sitemap.xml
`);
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Northridge Build & Roof server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
