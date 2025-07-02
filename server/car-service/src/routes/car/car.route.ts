import { Router } from "express";
import { HandleError } from "@amrogamal/shared-code";
import { CarController } from "../../controllers/car/car.controller";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { UploadFile } from "../../middlewares/uploadFile.middleware";
import { ParserField } from "../../middlewares/parser.middleware";
import {
  validateCreateCar,
  validateUpdateCar,
} from "../../validations/car/car.validator";
import { expressValidator } from "../../middlewares/express.middleware";
const parserField = ParserField.getInstance();
const authMiddleware = AuthMiddleware.getInstance();
const controller = CarController.getInstance();
const uploadFile = UploadFile.getInstance();
const { handleError } = HandleError.getInstance();
const router = Router();

const authentication = [
  authMiddleware.verifyToken,
  authMiddleware.authorization(["user", "admin", "manager"]),
];

router.get("/:id", handleError(controller.get.bind(controller)));
router.get(
  "/count",
  authentication,
  handleError(controller.count.bind(controller))
);

router.post(
  "/create",
  authentication,
  uploadFile.prefixType("cars"),
  uploadFile.uploadListMulterS3Images("carImages", 5),
  parserField.requiredImage("carImages"),
  parserField.parserFields(),
  parserField.parserImages(),
  expressValidator(validateCreateCar),
  handleError(controller.create.bind(controller))
);

router.put(
  "/update/:id",
  authentication,
  uploadFile.prefixType("cars"),
  uploadFile.uploadListMulterImages("carImages", 5),
  parserField.parserFields(),
  parserField.parserImages(),
  expressValidator(validateUpdateCar),
  handleError(controller.update.bind(controller))
);

router.put(
  "/image/upload/:id",
  authentication,
  uploadFile.uploadListMulterImages("carImages", 5),
  handleError(controller.uploadNewImages.bind(controller))
);

router.delete(
  "/image/remove/:id",
  authentication,
  handleError(controller.deleteImages.bind(controller))
);

router.delete(
  "/delete/:id",
  authentication,
  handleError(controller.delete.bind(controller))
);

export default router;
