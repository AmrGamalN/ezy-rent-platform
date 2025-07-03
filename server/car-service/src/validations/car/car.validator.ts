import {
  validateString,
  validateNumber,
  validateDate,
  validateBoolean,
  validateObject,
  validateArray,
} from "../validationFunction";
import { ValidationChain } from "express-validator";

const validateCar = (isOptional: boolean = false): ValidationChain[] => [
  validateString({
    field: "name",
    isOptional,
    options: { min: 1, max: 50 },
  }),
  validateString({
    field: "phone",
    isOptional,
    options: { isPhone: true },
  }),
  validateString({
    field: "description",
    isOptional,
    options: { min: 1, max: 500 },
  }),
  validateString({
    field: "carModel",
    isOptional,
    options: {
      min: 1,
      max: 30,
    },
  }),
  validateString({
    field: "brand",
    isOptional,
    options: {
      min: 1,
      max: 30,
    },
  }),
  validateNumber({
    field: "year",
    isOptional,
    options: { isYear: true },
  }),
  validateString({
    field: "color",
    isOptional,
    options: {
      min: 1,
      max: 20,
    },
  }),
  validateDate({
    field: "availableFrom",
    isOptional,
  }),
  validateDate({
    field: "availableTo",
    isOptional,
  }),
  validateDate({
    field: "expired_At",
    isOptional: true,
  }),
  validateBoolean({
    field: "isExpired",
    isOptional: true,
  }),
  validateNumber({
    field: "price",
    isOptional,
  }),
  validateBoolean({
    field: "allowNegotiate",
    isOptional,
  }),
  validateBoolean({
    field: "isAvailable",
    isOptional,
  }),

  ...validateArray({
    field: "carImages",
    isOptional,
  }),

  validateObject({
    field: "location",
    isOptional,
  }),
  validateString({
    field: "location.city",
    isOptional,
    options: {
      min: 1,
      max: 50,
    },
  }),
  validateString({
    field: "location.address",
    isOptional,
    options: {
      min: 1,
      max: 50,
    },
  }),
  validateNumber({
    field: "location.coordinates.lat",
    isOptional,
  }),
  validateNumber({
    field: "location.coordinates.lng",
    isOptional,
  }),

  validateObject({
    field: "guarantees",
    isOptional,
  }),
  validateString({
    field: "guarantees.insuranceDetails",
    isOptional,
    options: {
      min: 1,
      max: 100,
    },
  }),
  validateBoolean({
    field: "guarantees.licenseValid",
    isOptional,
  }),
  validateBoolean({
    field: "guarantees.requiresDeposit",
    isOptional,
  }),
  validateNumber({
    field: "guarantees.depositAmount",
    isOptional,
  }),
  validateString({
    field: "guarantees.additionalNotes",
    isOptional,
    options: {
      min: 1,
      max: 100,
    },
  }),
];

export const validateUpdateCar = validateCar(true);
export const validateCreateCar = validateCar(false);
