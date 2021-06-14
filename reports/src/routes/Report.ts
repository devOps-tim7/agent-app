import express from 'express';
import ReportContoller from '../controllers/ReportController';

const router = express.Router();

router.get('/bestSelling', ReportContoller.bestSelling);
router.get('/mostValuable', ReportContoller.mostValuable);

export default router;
