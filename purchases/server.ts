require('express-async-errors');
import express from 'express';
import cors from 'cors';
import errorHandler from './src/middleware/ErrorHandler';
import PurchaseRoute from './src/routes/Purchase';

export const createServer = () => {
  const app = express();
  app.use(express.static('../frontend/build'));
  app.use(express.json({ limit: '8mb' }));
  app.use(cors());
  app.use('/api/purchase', PurchaseRoute);
  app.use(errorHandler);
  return app;
};
