require('express-async-errors');
import express from 'express';
import cors from 'cors';
import errorHandler from './src/middleware/ErrorHandler';
import ProductRoute from './src/routes/Products';
import AuthRoute from './src/routes/Auth';
import PurchaseRoute from './src/routes/Purchase';

export const createServer = () => {
  const app = express();
  app.use(express.json({ limit: '8mb' }));
  app.use(cors());
  app.use('/api/product', ProductRoute);
  app.use('/api/purchase', PurchaseRoute);
  app.use('/api/auth', AuthRoute);
  app.use(errorHandler);
  return app;
};
