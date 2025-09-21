import { Router } from 'express';
import { getCurrent } from '../controllers/session.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';

const router = Router();

// GET /api/sessions/current
router.get('/current', requireAuth, getCurrent);

export default router;
