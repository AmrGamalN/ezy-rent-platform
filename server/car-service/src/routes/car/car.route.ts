import { Router } from "express";
import { HandleError } from "@amrogamal/shared-code";
import { CarController } from "../../controllers/car/car.controller";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
const authMiddleware = AuthMiddleware.getInstance();
const controller = CarController.getInstance();
const { handleError } = HandleError.getInstance();
const router = Router();

const authentication = [
  authMiddleware.authorization(["user", "admin", "manager"]),
  authMiddleware.verifyToken,
];

router.get("/:id", handleError(controller.getCar.bind(controller)));
router.get(
  "/count",
  authentication,
  handleError(controller.countCar.bind(controller))
);
router.post(
  "/create",
  authentication,
  handleError(controller.createCar.bind(controller))
);
router.put(
  "/update/:id",
  authentication,
  handleError(controller.updateCar.bind(controller))
);
router.delete(
  "/delete/:id",
  authentication,
  handleError(controller.deleteCar.bind(controller))
);
export default router;
