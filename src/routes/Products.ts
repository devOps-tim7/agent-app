import express, { Request, Response, NextFunction } from 'express';
import ProductController from '../controllers/ProductController';
import ProductNotFoundException from '../exceptions/ProductNotFoundException';
import { upload } from '../middleware/FileUpload';

const router = express.Router();

router.get(
  '/error',
  async (_req: Request, _res: Response, _next: NextFunction) => {
    throw new ProductNotFoundException(0);
  }
);

router.get('/:id/image', ProductController.downloadImage);

router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);

router.post('/', upload.single('image'), ProductController.create);
router.put('/:id', ProductController.update);

router.delete('/:id', ProductController.remove);

export default router;
