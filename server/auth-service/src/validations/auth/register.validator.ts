import { body, ValidationChain } from 'express-validator';
import { CustomError } from '@amrogamal/shared-code';
import { validateBoolean, validateString } from '../validationFunction';

export const validateRegisterEmail = (): ValidationChain[] => [
  validateString({
    field: 'email',
    isOptional: false,
    options: { isEmail: true },
  }),
  validateString({
    field: 'password',
    isOptional: false,
    options: { isPassword: true },
  }),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new CustomError(
        'BadRequest',
        400,
        'Password and confirm password not match',
        false,
      );
    }
    return true;
  }),
  validateString({
    field: 'username',
    isOptional: false,
    options: { min: 3, max: 20 },
  }),
  validateBoolean({
    field: 'terms',
    isOptional: false,
  }),
];

export const validateResendEmail = (): ValidationChain[] => [
  validateString({
    field: 'email',
    isOptional: false,
    options: { isEmail: true },
  }),
];

export const validateRegisterPhone = (): ValidationChain[] => [
  validateString({
    field: 'phoneNumber',
    isOptional: false,
    options: { isPhone: true },
  }),
  validateString({
    field: 'username',
    isOptional: false,
    options: { min: 3, max: 20 },
  }),
  validateBoolean({
    field: 'terms',
    isOptional: false,
  }),
  validateString({
    field: 'password',
    isOptional: false,
    options: { isPassword: true },
  }),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new CustomError(
        'BadRequest',
        400,
        'Password and confirm password not match',
        false,
      );
    }
    return true;
  }),
];
