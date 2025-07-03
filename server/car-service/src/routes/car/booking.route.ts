import { Router } from "express";
import { BookingController } from "../../controllers/car/booking.controller";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { HandleError } from "@amrogamal/shared-code";
import {
  requiredId,
  expressValidator,
} from "../../middlewares/express.middleware";
import {
  validateCreateBooking,
  validateUpdateBooking,
  validateUpdateBookingStatus,
} from "../../validations/car/booking.validator";

const router = Router();
const controller = BookingController.getInstance();
const authMiddleware = AuthMiddleware.getInstance();
const { handleError } = HandleError.getInstance();

const authentication = [
  authMiddleware.verifyToken,
  authMiddleware.authorization(["user", "admin", "manager"]),
];

router.post(
  "/",
  authentication,
  expressValidator(validateCreateBooking),
  handleError(controller.create.bind(controller))
);

router.get(
  "/",
  authentication,
  handleError(controller.getAll.bind(controller))
);

router.get(
  "/:id",
  authentication,
  requiredId(),
  handleError(controller.get.bind(controller))
);

router.patch(
  "/:id/update-renter",
  authentication,
  requiredId(),
  expressValidator(validateUpdateBooking),
  handleError(controller.updateByRenter.bind(controller))
);

router.patch(
  "/:id/update-status",
  authentication,
  requiredId(),
  expressValidator(validateUpdateBookingStatus()),
  handleError(controller.updateStatus.bind(controller))
);

router.delete(
  "/:id",
  authentication,
  requiredId(),
  handleError(controller.delete.bind(controller))
);

export default router;
