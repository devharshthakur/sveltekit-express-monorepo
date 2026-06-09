import { Router } from 'express';
import { router as indexRouter } from './index.js';

export const router = Router();

router.use(indexRouter);
