import { Router } from 'express';
import { router as healthRouter } from '$routes/health.js';

export const router = Router();

router.use(healthRouter);
