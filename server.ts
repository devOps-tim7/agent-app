require('express-async-errors');
import express from 'express';
import errorHandler from './src/middleware/ErrorHandler';
import ProductRoute from './src/routes/Products';

export const createServer = () => {
  const app = express();
  app.use(express);
  app.use(express.json({ limit: '25mb' }));
  app.use('/api/product', ProductRoute);
  app.use(errorHandler);
  return app;
};
