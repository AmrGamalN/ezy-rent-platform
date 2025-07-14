import { body, ValidationChain } from 'express-validator';
import { validateString } from '../validationFunction';

export const validateLoginEmail = (): ValidationChain[] => [
  validateString({
    field: 'email',
    isOptional: false,
    options: { isEmail: true },
  }),
  validateString({
    field: 'password',
    isOptional: false,
  }),
];

export const validateLoginPhone = (): ValidationChain[] => [
  validateString({
    field: 'phoneNumber',
    isOptional: false,
    options: { isPhone: true },
  }),
];

export const validateSendResetPasswordLink = (): ValidationChain[] => [
  validateString({
    field: 'email',
    isOptional: false,
    options: { isEmail: true },
  }),
];

export const validateResetPassword = (): ValidationChain[] => [
  validateString({
    field: 'password',
    isOptional: false,
    options: { isPassword: true },
  }),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password and confirm password not match');
    }
    return true;
  }),
];

export const validateOtp = (): ValidationChain[] => [
  body('otp')
    .notEmpty()
    .withMessage('otp is required')
    .bail()
    .isNumeric()
    .withMessage('otp must be number')
    .bail()
    .isLength({
      min: 6,
      max: 6,
    })
    .withMessage('otp must be 6 digits')
    .bail(),
];
