import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { connectMongo } from './db/mongo.js'; // si tu archivo se llama mongo.js mantenerlo
import { config } from './config/config.js';
import passport from './passport/index.js';
import { initPassport } from './passport/index.js';

import sessionRoutes from './routes/sessions.router.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import ticketRoutes from './routes/ticket.routes.js';

const app = express();

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Init passport (usa tus estrategias)
initPassport();
app.use(passport.initialize());

// Routes
app.use('/api/sessions', sessionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/tickets', ticketRoutes);

// Healthcheck
app.get('/ping', (_req, res) => res.json({ status: 'ok' }));

// Central error handler
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  const status = err.status || 500;
  res.status(status).json({ status: 'error', error: err.message || 'Internal Server Error' });
});

// Start
const start = async () => {
  await connectMongo();
  app.listen(config.PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${config.PORT}`);
  });
};

start();
