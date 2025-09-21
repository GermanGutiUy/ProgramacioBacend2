import { Router } from 'express';
import { checkout } from '../controllers/ticket.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = Router();

router.post('/checkout', requireAuth, authorizeRoles('user'), checkout);

export default router;
