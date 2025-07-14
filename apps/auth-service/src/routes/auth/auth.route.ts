import express from 'express';
import LoginRoutes from './login.route';
import RegisterRoutes from './register.route';
import SecurityRoutes from './security.route';
import { LoginController } from '../../controller/auth/login.controller';
import { userAuthorization } from '../../util/authorization.util';
import { HandleError } from '@amrogamal/shared-code';

const { handleError } = HandleError.getInstance();
const controller = LoginController.getInstance();
const router = express.Router();
router.use('/', LoginRoutes);
router.use('/', RegisterRoutes);
router.use('/', SecurityRoutes);

router.post(
  '/logout',
  userAuthorization,
  handleError(controller.logout.bind(controller)),
);

export default router;
