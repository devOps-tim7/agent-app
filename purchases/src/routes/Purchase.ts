import express from 'express';
import PurchaseController from '../controllers/PurchaseController';

const router = express.Router();

router.post('/', PurchaseController.create);

export default router;
