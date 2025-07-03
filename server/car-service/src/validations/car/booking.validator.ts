import { validateDate, validateString } from "../validationFunction";
import { ValidationChain } from "express-validator";

const validateBooking = (isOptional: boolean = false): ValidationChain[] => [
  validateString({ field: "carId", isOptional }),
  validateDate({ field: "startDate", isOptional }),
  validateDate({ field: "endDate", isOptional }),
  validateString({ field: "deliveryLocation", isOptional }),
  validateString({ field: "returnLocation", isOptional }),
  validateString({ field: "deliveryTime", isOptional }),
  validateString({ field: "returnTime", isOptional }),
  validateString({
    field: "rentType",
    isOptional,
    options: {
      isIn: [
        "with_driver",
        "without_driver",
        "airport_delivery",
        "wedding",
        "other",
      ],
    },
  }),
  validateString({ field: "specifiedRentType", isOptional: true }),
  validateString({
    field: "insuranceType",
    isOptional,
    options: {
      isIn: ["basic", "full"],
    },
  }),
  validateString({
    field: "paymentMethod",
    isOptional,
    options: {
      isIn: ["cash", "card", "wallet", "paymob"],
    },
  }),
];

export const validateCreateBooking = validateBooking(false);
export const validateUpdateBooking = validateBooking(true);

export const validateUpdateBookingStatus = (): ValidationChain[] => [
  validateString({
    field: "status",
    isOptional: false,
    options: {
      isIn: ["pending", "confirmed", "cancelled", "completed"],
    },
  }),
];
