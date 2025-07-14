import { Router } from 'express';
import { WishlistController } from '../../controller/car/wishlist.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { HandleError } from '@amrogamal/shared-code';
import { requiredId } from '../../middleware/express.middleware';
const authMiddleware = AuthMiddleware.getInstance();
const controller = WishlistController.getInstance();
const { handleError } = HandleError.getInstance();
const router = Router();

const authentication = [
  authMiddleware.verifyToken,
  authMiddleware.authorization(['user', 'admin', 'manager']),
];

router.post(
  '/',
  authentication,
  handleError(controller.create.bind(controller)),
);
router.get(
  '/:id',
  authentication,
  requiredId(),
  handleError(controller.create.bind(controller)),
);
router.get(
  '/',
  authentication,
  handleError(controller.create.bind(controller)),
);
router.delete(
  '/:id',
  authentication,
  requiredId(),
  handleError(controller.create.bind(controller)),
);

export default router;
