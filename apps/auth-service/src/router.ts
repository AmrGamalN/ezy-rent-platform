import AuthRoutes from './routes/auth/auth.route';
import { Request, Response } from 'express';
import express from 'express';
const router = express.Router();

router.get('/health-check', (req: Request, res: Response) => {
  res.send('Server is running');
});

router.use('/auth', AuthRoutes);

export default router;
