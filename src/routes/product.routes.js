import { Router } from 'express';
import { listProducts, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = Router();

// Rutas públicas
router.get('/', listProducts);
router.get('/:pid', async (req, res) => res.send('producto por id - puedes implementar'));

// Rutas solo admin
router.post('/', requireAuth, authorizeRoles('admin'), createProduct);
router.put('/:pid', requireAuth, authorizeRoles('admin'), updateProduct);
router.delete('/:pid', requireAuth, authorizeRoles('admin'), deleteProduct);

export default router;
