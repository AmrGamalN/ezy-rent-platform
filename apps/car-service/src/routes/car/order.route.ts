import { Router } from 'express';
import { HandleError } from '@amrogamal/shared-code';
import { OrderController } from '../../controller/car/order.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import {
  expressValidator,
  requiredId,
} from '../../middleware/express.middleware';
import {
  validateCreateOrder,
  validateUpdateOrder,
} from '../../validation/car/order.validator';
const authMiddleware = AuthMiddleware.getInstance();
const { handleError } = HandleError.getInstance();
const controller = OrderController.getInstance();
const router = Router();
const authentication = [
  authMiddleware.verifyToken,
  authMiddleware.authorization(['user', 'admin', 'manager']),
];

router.post(
  '/',
  authentication,
  expressValidator(validateCreateOrder()),
  handleError(controller.create.bind(controller)),
);

router.get(
  '/',
  authentication,
  handleError(controller.getAll.bind(controller)),
);

router.get(
  '/:id',
  authentication,
  requiredId(),
  handleError(controller.getById.bind(controller)),
);

router.put(
  '/:id',
  authentication,
  requiredId(),
  expressValidator(validateUpdateOrder()),
  handleError(controller.updateStatus.bind(controller)),
);

router.delete(
  '/:id',
  authentication,
  requiredId(),
  handleError(controller.delete.bind(controller)),
);

export default router;
