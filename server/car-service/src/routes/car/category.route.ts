import { Router } from "express";
import { CategoryController } from "../../controllers/car/category.controller";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { UploadFile } from "../../middlewares/uploadFile.middleware";
import { expressValidator } from "../../middlewares/express.middleware";
import {
  validateCreateCategory,
  validateUpdateCategory,
} from "../../validations/car/category.validator";
const authMiddleware = AuthMiddleware.getInstance();
const controller = CategoryController.getInstance();
const uploadFile = UploadFile.getInstance();
const router = Router();

const authentication = [
  authMiddleware.verifyToken,
  authMiddleware.authorization(["admin", "manager"]),
];

router.post(
  "/",
  authentication,
  uploadFile.uploadSingleMulterImages("categoryImage"),
  expressValidator(validateCreateCategory),
  controller.create.bind(controller)
);

router.get("/", controller.getAll.bind(controller));

router.get("/:id", controller.getById.bind(controller));

router.put(
  "/:id",
  authentication,
  uploadFile.uploadSingleMulterImages("categoryImage"),
  expressValidator(validateUpdateCategory),
  controller.update.bind(controller)
);

router.delete("/:id", authentication, controller.delete.bind(controller));

export default router;
