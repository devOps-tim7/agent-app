import { Request, Response } from 'express';
import ReportService from '../services/ReportService';

const bestSelling = async (req: Request, res: Response) => {
  const limit = +req.query.limit;
  const report = await ReportService.bestSelling(limit);
  res.status(200).send(report);
};

const mostValuable = async (req: Request, res: Response) => {
  const limit = +req.query.limit;
  const report = await ReportService.mostValuable(limit);
  res.status(200).send(report);
};

export default {
  bestSelling,
  mostValuable,
};
