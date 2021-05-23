import express from 'express';
import ProductRoute from './src/routes/Products';

export const createServer = () => {
  const app = express();
  app.use('/api/products', ProductRoute);
  return app;
};
