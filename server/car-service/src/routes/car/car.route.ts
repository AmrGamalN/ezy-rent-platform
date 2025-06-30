import { Router } from "express";
import { CarController } from "../../controllers/car/car.controller";
import { HandleError } from "@amrogamal/shared-code";
const controller = CarController.getInstance();
const { handleError } = HandleError.getInstance();
const router = Router();

router.get("/:id", handleError(controller.getCar.bind(controller)));
router.get("/count", handleError(controller.countCar.bind(controller)));
router.post("/create", handleError(controller.createCar.bind(controller)));
router.put("/update/:id", handleError(controller.updateCar.bind(controller)));
router.delete(
  "/delete/:id",
  handleError(controller.deleteCar.bind(controller))
);
export default router;
