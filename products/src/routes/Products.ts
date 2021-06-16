import express, { Request, Response, NextFunction } from 'express';
import ProductController from '../controllers/ProductController';
import ProductNotFoundException from '../exceptions/ProductNotFoundException';
import loggedIn from '../middleware/Auth';
import { upload } from '../middleware/FileUpload';

const router = express.Router();

router.get('/error', async (_req: Request, _res: Response, _next: NextFunction) => {
  throw new ProductNotFoundException(0);
});

router.get('/:id/image', ProductController.downloadImage);
router.patch('/:id/changeImage', ProductController.changeImage);

router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);

router.post('/', loggedIn, upload.single('image'), ProductController.create);
router.put('/:id', loggedIn, ProductController.update);

router.delete('/:id', loggedIn, ProductController.remove);

export default router;
