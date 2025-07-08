import { Router } from 'express';
import { CategoryController } from '../../controllers/car/category.controller';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { UploadFile } from '../../middlewares/uploadFile.middleware';
import {
  expressValidator,
  requiredId,
} from '../../middlewares/express.middleware';
import {
  validateCreateCategory,
  validateUpdateCategory,
} from '../../validations/car/category.validator';
import { HandleError } from '@amrogamal/shared-code';
const { handleError } = HandleError.getInstance();
const authMiddleware = AuthMiddleware.getInstance();
const controller = CategoryController.getInstance();
const uploadFile = UploadFile.getInstance();
const router = Router();

const authentication = [
  authMiddleware.verifyToken,
  authMiddleware.authorization(['admin', 'manager']),
];

router.post(
  '/',
  authentication,
  handleError(uploadFile.uploadSingleMulterImages('categoryImage')),
  expressValidator(validateCreateCategory),
  handleError(controller.create.bind(controller)),
);

router.get('/', handleError(controller.getAll.bind(controller)));

router.get(
  '/:id',
  requiredId(),
  handleError(controller.getById.bind(controller)),
);

router.put(
  '/:id',
  authentication,
  requiredId(),
  handleError(uploadFile.uploadSingleMulterImages('categoryImage')),
  expressValidator(validateUpdateCategory),
  handleError(controller.update.bind(controller)),
);

router.delete(
  '/:id',
  authentication,
  handleError(controller.delete.bind(controller)),
);

export default router;
