require('express-async-errors');
import express from 'express';
import cors from 'cors';
import errorHandler from './src/middleware/ErrorHandler';
import ReportRoute from './src/routes/Report';

export const createServer = () => {
  const app = express();
  app.use(cors());
  app.use('/api/report', ReportRoute);
  app.use(errorHandler);
  return app;
};
