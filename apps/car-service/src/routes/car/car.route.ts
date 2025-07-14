import { Router } from 'express';
import { HandleError } from '@amrogamal/shared-code';
import { CarController } from '../../controller/car/car.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { UploadFile } from '../../middleware/uploadFile.middleware';
import { ParserField } from '../../middleware/parser.middleware';
import {
  validateCreateCar,
  validateUpdateCar,
} from '../../validation/car/car.validator';
import {
  expressValidator,
  requiredId,
} from '../../middleware/express.middleware';
const parserField = ParserField.getInstance();
const authMiddleware = AuthMiddleware.getInstance();
const controller = CarController.getInstance();
const uploadFile = UploadFile.getInstance();
const { handleError } = HandleError.getInstance();
const router = Router();

const authentication = [
  authMiddleware.verifyToken,
  authMiddleware.authorization(['user', 'admin', 'manager']),
];

router.get('/:id', requiredId(), handleError(controller.get.bind(controller)));
router.get(
  '/count',
  authentication,
  handleError(controller.count.bind(controller)),
);

router.post(
  '/',
  authentication,
  uploadFile.prefixType('cars'),
  handleError(uploadFile.uploadListMulterS3Images('carImages', 5)),
  parserField.requiredImage('carImages'),
  parserField.parserFields(),
  parserField.parserImages(),
  expressValidator(validateCreateCar),
  handleError(controller.create.bind(controller)),
);

router.put(
  '/:id',
  authentication,
  requiredId(),
  uploadFile.prefixType('cars'),
  handleError(uploadFile.uploadListMulterImages('carImages', 5)),
  parserField.parserFields(),
  parserField.parserImages(),
  expressValidator(validateUpdateCar),
  handleError(controller.update.bind(controller)),
);

router.put(
  '/upload-image/:id',
  authentication,
  requiredId(),
  uploadFile.uploadListMulterImages('carImages', 5),
  handleError(controller.uploadNewImages.bind(controller)),
);

router.delete(
  '/remove-image/:id',
  authentication,
  requiredId(),
  handleError(controller.deleteImages.bind(controller)),
);

router.delete(
  '/:id',
  authentication,
  requiredId(),
  handleError(controller.delete.bind(controller)),
);

export default router;
