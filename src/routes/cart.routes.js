import { Router } from 'express';
import { addToCart, getMyCart } from '../controllers/cart.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = Router();

// Only 'user' can add products to their cart
router.post('/add', requireAuth, authorizeRoles('user'), addToCart);
router.get('/me', requireAuth, authorizeRoles('user'), getMyCart);

export default router;
